import { ApiClient } from '@/utils';

export const fetchMediaById = async (id) => {
  const api = new ApiClient();
  const path = `/api/media/${id}`;
  try {
    const response = await api.Get(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch media by ID ${id}.`);
    }
    return response.value;
  } catch (error) {
    console.error('Failed to fetch media:', error);
    throw error;
  }
};

export const fetchTitles = async (id) => {
  const api = new ApiClient();
  const path = `/api/media/${id}/titles`;
  try {
    const response = await api.Get(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch titles for media ID ${id}.`);
    }
    return response.value;
  } catch (error) {
    console.error('Failed to fetch media titles:', error);
    throw error;
  }
};

export const fetchMediaCrew = async (id) => {
  const api = new ApiClient();
  const path = `/api/media/${id}/crew`;
  try {
    const response = await api.Get(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch crew for media ID ${id}.`);
    }
    return response.value;
  } catch (error) {
    console.error('Failed to fetch media crew:', error);
    throw error;
  }
};

export const fetchMediaCast = async (id) => {
  const api = new ApiClient();
  const path = `/api/media/${id}/cast`;
  try {
    const response = await api.Get(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch cast for media ID ${id}.`);
    }
    return response.value;
  } catch (error) {
    console.error('Failed to fetch media cast:', error);
    throw error;
  }
};

export const fetchSimilarMedia = async ({ id, page, count }) => {
  const api = new ApiClient();
  const queryParams = [
    { key: 'page', value: page },
    { key: 'count', value: count },
  ];

  const path = `/api/media/${id}/similar_media`;
  try {
    const response = await api.Get(path, queryParams);
    if (!response.ok) {
      throw new Error(`Failed to fetch similar media for ID ${id}.`);
    }
    return response.value;
  } catch (error) {
    console.error('Failed to fetch similar media:', error);
    throw error;
  }
};

export const fetchReleases = async (id) => {
  const api = new ApiClient();
  const path = `/api/media/${id}/releases`;
  try {
    const response = await api.Get(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch releases for media ID ${id}.`);
    }
    return response.value;
  } catch (error) {
    console.error('Failed to fetch media releases:', error);
    throw error;
  }
};

export const fetchMedia = async ({
  page,
  pageCount,
  query = '',
  queryType = 'All',
}) => {
  const api = new ApiClient();
  const queryParams = [
    { key: 'page', value: page },
    { key: 'count', value: count },
    { key: 'query_type', value: queryType },
    { key: 'query', value: query },
  ];

  const path = '/api/media';
  try {
    const response = await api.Get(path, queryParams);

    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusCode}`);
    }

    console.log('response:', response.value);

    return response.value;
  } catch (error) {
    console.error('Error fetching media:', error);
    throw error;
  }
};
/*
 export const fetchMedia = async () => {};

export const fetchSimilarMedia = async (id) => {};

export const fetchRelatedMedia = async (id) => {};


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
