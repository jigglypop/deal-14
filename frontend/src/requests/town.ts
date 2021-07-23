import fetchThen, { API_ENDPOINT } from '../util/api';
import cache from '../util/cache';
import xhr from '../util/xhr';

export const fetchMyTowns = (): Promise<any> => {
  const token = cache.get('token')

  return xhr(`${API_ENDPOINT}/api/town/my`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })
    .then(res => {
      return JSON.parse(res.response);
    });
}

type AddTownRequest = {
  townName: string;
}

export const addMyTown = (addTownRequest: AddTownRequest): Promise<any> => {
  const token = cache.get('token')

  return fetchThen('/api/town/my', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
    body: JSON.stringify({
      ...addTownRequest,
    }),
  });
}

export const removeMyTown = (userTownId: number): Promise<any> => {
  const token = cache.get('token')

  return fetchThen(`/api/town/my/${userTownId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
  });
}