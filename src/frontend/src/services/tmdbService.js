import { ApiClient } from '../utils/apiClient';

const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_UR;
const accessKey = import.meta.env.VITE_TMDB_READ_TOKEN;
const client = new ApiClient(baseUrl, accessKey);

export const ImageSize = Object.freeze({
  VerySmall: 'w92',
  Small: 'w158',
  Normal: 'w500',
  Original: 'original',
});

export async function getTMDBPersonImage(person_imdb_id, size) {
  const resp = await client.Get(`/person/${person_imdb_id}`);
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
    throw new Error('No image found');
  }
  return new URL(path, `${imageBaseUrl}/${size}`).href;
}
