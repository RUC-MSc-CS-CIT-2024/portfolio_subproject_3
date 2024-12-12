import { ApiClient } from '@/utils';
import { fetchPersonById } from '@/services';

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

export const fetchMediaCrew = async ({ id, page, count }) => {
  const api = new ApiClient();
  const queryParams = [
    { key: 'page', value: page },
    { key: 'count', value: count },
  ];

  const path = `/api/media/${id}/crew`;
  try {
    const response = await api.Get(path, queryParams);
    if (!response.ok) {
      throw new Error(`Failed to fetch crew for media ID ${id}.`);
    }

    const crewData = response.value.items;

    const crewWithImages = await Promise.all(
      crewData.map(async (member) => {
        const personDetails = await fetchPersonById(member.personId);
        return { ...member, pictureUri: personDetails.pictureUri };
      }),
    );

    const finalResponse = { ...response.value, items: crewWithImages };

    return finalResponse;
  } catch (error) {
    console.error('Failed to fetch media crew:', error);
    throw error;
  }
};

export const fetchMediaCast = async ({ id, page, count }) => {
  const api = new ApiClient();
  const queryParams = [
    { key: 'page', value: page },
    { key: 'count', value: count },
  ];

  const path = `/api/media/${id}/cast`;
  try {
    const response = await api.Get(path, queryParams);
    if (!response.ok) {
      throw new Error(`Failed to fetch cast for media ID ${id}.`);
    }

    const castData = response.value.items;

    const castWithImages = await Promise.all(
      castData.map(async (member) => {
        const personDetails = await fetchPersonById(member.personId);
        return { ...member, pictureUri: personDetails.pictureUri };
      }),
    );

    const finalResponse = { ...response.value, items: castWithImages };

    return finalResponse;
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
  count,
  query = '',
  queryType = 'Simple',
  keywords = [],
  title = '',
  plot = '',
  character = '',
  person = '',
  type = null,
  year = null,
}) => {
  const api = new ApiClient();

  const queryParams = [
    { key: 'page', value: page },
    { key: 'count', value: count },
    { key: 'query_type', value: queryType },
  ];
  if (queryType === 'Simple') {
    if (query) {
      queryParams.push({ key: 'query', value: query });
    }
  } else if (queryType === 'ExactMatch' || queryType === 'BestMatch') {
    const lowercasedKeywords = keywords.map((kw) => kw.toLowerCase());
    lowercasedKeywords.forEach((kw) => {
      queryParams.push({ key: 'keywords', value: kw });
    });
  } else if (queryType === 'Structured') {
    if (title) queryParams.push({ key: 'title', value: title });
    if (plot) queryParams.push({ key: 'plot', value: plot });
    if (character) queryParams.push({ key: 'character', value: character });
    if (person) queryParams.push({ key: 'person', value: person });
  }
  if (type) queryParams.push({ key: 'type', value: type });
  if (year) queryParams.push({ key: 'year', value: year });

  const path = '/api/media';
  try {
    const response = await api.Get(path, queryParams);
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusCode}`);
    }
    //console.log('response:', response);
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
