import { API_BASE_URL } from '@/utils/constants';

export const fetchMediaById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/media/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch media:', error);
    throw error;
  }
};

export const fetchTitles = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/media/${id}/titles`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch media titles:', error);
    throw error;
  }
};

export const fetchMediaCrew = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/media/${id}/crew`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch media crew:', error);
    throw error;
  }
};

export const fetchMediaCast = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/media/${id}/cast`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch media cast:', error);
    throw error;
  }
};

export const fetchSimilarMedia = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/media/${id}/similar_media`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch similar media:', error);
    throw error;
  }
};

export const fetchReleases = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/media/${id}/releases`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch media releases:', error);
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
