import { ApiClient } from '@/utils/apiClient';
import { getTMDBImage, ImageSize } from './tmdbService';

const BASE_PATH = '/api/persons/';

const enhancePersonWithImage = async (person) => {
  try {
    person.pictureUri = await getTMDBImage(person.imdbId, ImageSize.VerySmall);
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
    const response = await api.Get(`${BASE_PATH}${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch person with ID ${id}.`);
    }

    return await enhancePersonWithImage(response.value);
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
