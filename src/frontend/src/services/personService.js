import { ApiClient } from '@/utils/apiClient';
import { getTMDBImage, ImageSize, fetchPersonTMDB } from './tmdbService';

const BASE_PATH = '/api/persons/';

const enhancePersonWithImage = async (person, imgSize = ImageSize) => {
  try {
    person.pictureUri = await getTMDBImage(person.imdbId, imgSize);
  } catch (error) {
    console.error(
      `Failed to fetch image for person with ID ${person.imdbId}:`,
      error,
    );
    person.pictureUri = null;
    console.log('No pictureUri for person: ', person);
  }
  console.log('Picture were found for person: ', person);
  return person;
};

export const fetchPersons = async (page, count) => {
  const api = new ApiClient();
  try {
    const queryParams = [];
    if (page) queryParams.push({ key: 'page', value: page });
    if (count) queryParams.push({ key: 'count', value: count });

    const response = await api.Get(BASE_PATH, queryParams);

    if (!response.ok) {
      throw new Error('Failed to fetch persons.');
    }

    const persons = response.value.items;
    await Promise.all(persons.map(enhancePersonWithImage));

    return persons;
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
    const { imageUrl, tmdbId } = await getTMDBImage(
      response.value.imdbId,
      ImageSize.Normal,
    );
    response.value.pictureUri = imageUrl;
    const tmdbData = await fetchPersonTMDB(tmdbId);
    return mergePersonData({ ...response.value, tmdbId }, tmdbData);
  } catch (error) {
    console.error(`Error fetching person by ID (${id}):`, error);
    throw error;
  }
};

export const fetchPersonMedia = async (id) => {
  const api = new ApiClient();
  try {
    const response = await api.Get(`${BASE_PATH}${id}/media`);

    if (!response.ok) {
      throw new Error(`Failed to fetch media for person with ID ${id}.`);
    }

    return response.value;
  } catch (error) {
    console.error(`Error fetching person media for ID (${id}):`, error);
    throw error;
  }
};

export const fetchPersonCoactors = async (id) => {
  const api = new ApiClient();
  try {
    const response = await api.Get(`${BASE_PATH}${id}/coactors`);

    if (!response.ok) {
      throw new Error(`Failed to fetch coactors for person with ID ${id}.`);
    }

    const coactors = response.value.items;
    await Promise.all(coactors.map(enhancePersonWithImage));

    return coactors;
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
      `https://image.tmdb.org/t/p/w500${tmdbData.profile_path}`,
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
  };
}
