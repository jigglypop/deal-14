import fetchThen from '../util/api';

export const fetchMyTowns = (): Promise<any> => {
  return fetchThen('/api/town/my', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
  });
}

type AddTownRequest = {
  townName: string;
}

export const addMyTown = (addTownRequest: AddTownRequest): Promise<any> => {
  return fetchThen('/api/town/my', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
    body: JSON.stringify({
      ...addTownRequest,
    }),
  });
}

export const removeMyTown = (userTownId: number): Promise<any> => {
  return fetchThen(`/api/town/my/${userTownId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
  });
}