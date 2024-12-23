import { ApiClient } from '@/utils';

const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const accessKey = import.meta.env.VITE_TMDB_READ_TOKEN;

export const ImageSize = Object.freeze({
  VerySmall: 'w92', // Used on lists
  Small: 'w185', // Used for cards
  Normal: 'w500', // Used on the detailed pages
  Original: 'original',
});

export async function getTMDBImage(imdb_id, size) {
  const api = new ApiClient(baseUrl, accessKey);
  size = size ?? ImageSize.Normal;
  const resp = await api.Get(`find/${imdb_id}?external_source=imdb_id`);
  if (!resp.ok) {
    throw new Error('Network response was not ok');
  }
  const val = resp.value;
  let path = '';

  if (val.movie_results.length > 0) {
    path = val.movie_results[0].poster_path;
  } else if (val.tv_results.length > 0) {
    path = val.tv_results[0].poster_path;
  } else if (val.tv_episode_results.length > 0) {
    path = val.tv_episode_results[0].still_path;
  } else if (val.person_results.length > 0) {
    path = val.person_results[0].profile_path;
  } else {
    return null;
  }

  const imageUrlWithSize = new URL(
    size + '/',
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL,
  );
  const imageUrl = new URL(path?.substring(1), imageUrlWithSize).href;
  return imageUrl;
}

export async function getTMDBPersonDetails(imdb_id) {
  const api = new ApiClient(baseUrl, accessKey);
  const resp = await api.Get(`find/${imdb_id}?external_source=imdb_id`);
  if (!resp.ok) {
    throw new Error('Network response was not ok');
  }
  const val = resp.value;
  let tmdbId = null;
  let knownFor = [];

  if (val.person_results.length > 0) {
    const person = val.person_results[0];
    tmdbId = person.id;
    knownFor = person.known_for;
  } else {
    throw new Error('No person found');
  }

  return { tmdbId, knownFor };
}

export async function fetchPersonTMDB(tmdbId) {
  const api = new ApiClient(baseUrl, accessKey);
  try {
    const resp = await api.Get(`person/${tmdbId}?language=en-US`);
    if (!resp.ok) {
      throw new Error('Failed to fetch person details from TMDB');
    }
    return resp.value;
  } catch (err) {
    console.error(`Error fetching TMDB data for TMDB ID ${tmdbId}:`, err);
    throw err;
  }
}

export async function fetchPersonImages(tmdbId, size = ImageSize.Normal) {
  const api = new ApiClient(baseUrl, accessKey);
  try {
    const resp = await api.Get(`person/${tmdbId}/images`);
    if (!resp.ok) {
      throw new Error('Failed to fetch person images from TMDB');
    }
    const images = resp.value.profiles.map((image) => {
      const imageUrlWithSize = new URL(
        size + '/',
        import.meta.env.VITE_TMDB_IMAGE_BASE_URL,
      );
      const imageUrl = new URL(image.file_path.substring(1), imageUrlWithSize)
        .href;
      return imageUrl;
    });
    return images;
  } catch (err) {
    console.error(`Error fetching images for TMDB ID ${tmdbId}:`, err);
    throw err;
  }
}
