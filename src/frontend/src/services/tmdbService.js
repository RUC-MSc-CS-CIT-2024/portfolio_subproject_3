import { ApiClient } from '../utils/apiClient';

const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_UR;
const accessKey = import.meta.env.VITE_TMDB_READ_TOKEN;
const client = new ApiClient(baseUrl, accessKey);

export const ImageSize = Object.freeze({
  VerySmall: 'w92', // Used on lists
  Small: 'w185', // Used for cards
  Normal: 'w500', // Used on the detailed pages
  Original: 'original',
});

export async function getTMDBImage(imdb_id, size) {
  size = size ?? ImageSize.Normal;
  const resp = await client.Get(`/find/${imdb_id}?external_source=imdb_id`);
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
