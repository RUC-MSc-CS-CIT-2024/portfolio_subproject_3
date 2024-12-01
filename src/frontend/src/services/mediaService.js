import { API_BASE_URL } from '@/utils/constants';

export const fetchMedia = async ({
  page = 1,
  pageCount = 10,
  query = '',
  queryType = 'All',
}) => {
  const response = await fetch(
    `${API_BASE_URL}/api/media?Page.page=${page}&Page.count=${pageCount}&query_type=${queryType}&query=${query}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();

  const transformedResults = data.map((media) => ({
    id: media.id,
    title: media.title,
    posterUri: media.posterUri,
    releaseDate: media.releaseDate,
  }));

  return transformedResults;
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
