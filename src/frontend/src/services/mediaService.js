import { ApiClient } from '../utils/apiClient';

const api = new ApiClient();

export const fetchMedia = async ({
  page = 1,
  pageCount = 18,
  query = '',
  queryType = 'All',
}) => {
  const queryParams = [
    { key: 'Page.page', value: page },
    { key: 'Page.count', value: pageCount },
    { key: 'query_type', value: queryType },
    { key: 'query', value: query },
  ];

  const path = '/api/media';
  try {
    const response = await api.Get(path, queryParams);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    console.log('response:', response);

    const transformedResults = response.value.map((media) => ({
      id: media.id,
      title: media.title,
      type: media.type,
      imageUri: media.posterUri,
      releaseYear: new Date(media.releaseDate).toLocaleDateString(),
    }));

    return transformedResults;
  } catch (error) {
    console.error('Error fetching media:', error);
    throw error;
  }
};

/*

export const fetchMediaById = async (id) => {};

export const fetchSimilarMedia = async (id) => {};

export const fetchRelatedMedia = async (id) => {};

export const fetchMediaCrew = async (id) => {};

export const fetchMediaCast = async (id) => {};

export const fetchPromotionalMedia = async (mediaId) => {};

export const fetchReleasePromotionalMedia = async (mediaId, releaseId) => {};

export const createReleasePromotionalMedia = async (
  mediaId,
  releaseId,
  data,
) => {};

export const fetchReleasePromotionalMediaById = async (
  mediaId,
  releaseId,
  id,
) => {};

export const deleteReleasePromotionalMediaById = async (
  mediaId,
  releaseId,
  id,
) => {};

export const fetchReleases = async (mediaId) => {};

export const createRelease = async (mediaId, data) => {};

export const fetchReleaseById = async (mediaId, id) => {};

export const deleteReleaseById = async (mediaId, id) => {};

export const updateReleaseById = async (mediaId, id, data) => {};

export const fetchTitles = async (mediaId) => {};

export const createTitle = async (mediaId, data) => {};

export const fetchTitleById = async (mediaId, titleId) => {};

export const deleteTitleById = async (mediaId, titleId) => {};
 */
