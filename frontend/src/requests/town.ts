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
  })
    .catch(error => {
      switch (error.status) {
        case 400:
          throw new Error('2개 이상의 동네를 설정할 수 없습니다');

        case 409:
          throw new Error('이미 같은 동네가 설정되어있습니다');

        default:
          throw new Error('다시 시도해주세요');
      }
    });
}

export const removeMyTown = (userTownId: number): Promise<any> => {
  return fetchThen(`/api/town/my/${userTownId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
  })
    .catch(error => {
      switch (error.status) {
        case 400:
          throw new Error('1개 이하의 동네를 설정할 수 없습니다');

        default:
          throw new Error('다시 시도해주세요');
      }
    });
}