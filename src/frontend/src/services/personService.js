import {
  getTMDBImage,
  ImageSize,
  fetchPersonTMDB,
  getTMDBPersonDetails,
} from '@/services';
import { ApiClient } from '@/utils';

const BASE_PATH = '/api/persons/';

const enhancePersonWithImage = async (person, imgSize = ImageSize.Normal) => {
  try {
    const imageUrl = await getTMDBImage(person.imdbId, imgSize);
    person.pictureUri = imageUrl;
  } catch (error) {
    console.error(
      `Failed to fetch image for person with ID ${person.imdbId}:`,
      error,
    );
    person.pictureUri = null;
  }
  return person;
};

export const fetchPersons = async (query) => {
  const api = new ApiClient();
  const queryParams = [];
  try {
    if (query) queryParams.push({ key: 'page', value: page });
    if (query) queryParams.push({ key: 'count', value: count });
    if (query) queryParams.push({ key: 'name', value: name });

    const response = await api.Get(BASE_PATH, queryParams);

    if (!response.ok) {
      throw new Error('Failed to fetch persons.');
    }

    const result = response.value;
    result.items = await Promise.all(
      response.value.items.map((person) => enhancePersonWithImage(person)),
    );

    return result;
  } catch (error) {
    console.error('Error fetching persons:', error);
    throw error;
  }
};

export const fetchPersonById = async (id) => {
  const api = new ApiClient();
  try {
    let response = await api.Get(`${BASE_PATH}${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch person with ID ${id}.`);
    }

    let imageUrl = null;
    let tmdbId = null;
    let knownFor = [];

    try {
      imageUrl = await getTMDBImage(response.value.imdbId, ImageSize.Normal);
    } catch (imageError) {
      console.error(`No image found for person with ID ${id}:`, imageError);
    }

    try {
      const tmdbDetails = await getTMDBPersonDetails(response.value.imdbId);
      tmdbId = tmdbDetails.tmdbId;
      knownFor = tmdbDetails.knownFor;
    } catch (detailsError) {
      console.error(`No details found for person with ID ${id}:`, detailsError);
    }

    response.value.pictureUri = imageUrl;
    const tmdbData = tmdbId ? await fetchPersonTMDB(tmdbId) : {};

    // Map the known_for movie data
    const knownForMedia = knownFor?.map((media) => ({
      id: media.id,
      title: media.title,
      backdropPath: media.backdrop_path,
      originalTitle: media.original_title,
      overview: media.overview,
      posterPath: media.poster_path,
      mediaType: media.media_type,
      adult: media.adult,
      originalLanguage: media.original_language,
      genreIds: media.genre_ids,
      popularity: media.popularity,
      releaseDate: media.release_date,
      video: media.video,
      voteAverage: media.vote_average,
      voteCount: media.vote_count,
    }));

    return mergePersonData(
      { ...response.value, tmdbId, knownForMedia },
      tmdbData,
    );
  } catch (error) {
    console.error(`Error fetching person by ID (${id}):`, error);
    throw error;
  }
};

export const fetchPersonMedia = async (id, page, count) => {
  const api = new ApiClient();
  const queryParams = new URLSearchParams();

  if (page) queryParams.append('page', page);
  if (count) queryParams.append('count', count);

  try {
    const response = await api.Get(
      `${BASE_PATH}${id}/media?${queryParams.toString()}`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch media for person with ID ${id}.`);
    }

    return response.value;
  } catch (error) {
    console.error(`Error fetching person media for ID (${id}):`, error);
    throw error;
  }
};

export const fetchPersonCoactors = async ({ id, page, count }) => {
  const api = new ApiClient();
  const queryParams = [
    { key: 'page', value: page },
    { key: 'count', value: count },
  ];

  const path = `${BASE_PATH}${id}/coactors`;
  try {
    const response = await api.Get(path, queryParams);

    if (!response.ok) {
      throw new Error(`Failed to fetch coactors for person with ID ${id}.`);
    }

    const coactors = response.value?.items || [];

    const detailedCoactors = await Promise.all(
      coactors.map(async (coactor) => {
        try {
          const coactorDetails = await fetchPersonById(coactor.id);
          return {
            ...coactor,
            ...coactorDetails,
          };
        } catch (error) {
          console.error(
            `Error fetching details for coactor with ID ${coactor.id}:`,
            error,
          );
          return coactor;
        }
      }),
    );

    return {
      ...response.value,
      items: detailedCoactors,
    };
  } catch (error) {
    console.error(`Error fetching coactors for ID (${id}):`, error);
    throw error;
  }
};

function mergePersonData(originalData, tmdbData) {
  return {
    id: originalData.id || tmdbData.id,
    tmdbId: originalData.tmdbId || tmdbData.id,
    name: tmdbData.name || originalData.name,
    description: tmdbData.biography || originalData.description,
    score: originalData.score,
    nameRating: originalData.nameRating,
    birthDate: tmdbData.birthday || originalData.birthDate,
    deathDate: tmdbData.deathday || originalData.deathDate,
    imdbId: originalData.imdbId || tmdbData.imdb_id,
    links: originalData.links,
    pictureUri:
      originalData.pictureUri ||
      (tmdbData.profile_path
        ? `https://image.tmdb.org/t/p/w500${tmdbData.profile_path}`
        : null),
    alsoKnownAs: Array.from(
      new Set([
        ...(originalData.alsoKnownAs || []),
        ...(tmdbData.also_known_as || []),
      ]),
    ),
    homepage: tmdbData.homepage || null,
    placeOfBirth: tmdbData.place_of_birth || null,
    popularity: tmdbData.popularity || null,
    knownForDepartment: tmdbData.known_for_department || null,
    knownForMedia:
      originalData.knownForMedia ||
      tmdbData.known_for?.map((media) => ({
        id: media.id,
        title: media.title,
        backdropPath: media.backdrop_path,
        originalTitle: media.original_title,
        overview: media.overview,
        posterPath: media.poster_path,
        mediaType: media.media_type,
        adult: media.adult,
        originalLanguage: media.original_language,
        genreIds: media.genre_ids,
        popularity: media.popularity,
        releaseDate: media.release_date,
        video: media.video,
        voteAverage: media.vote_average,
        voteCount: media.vote_count,
      })) ||
      [],
  };
}
