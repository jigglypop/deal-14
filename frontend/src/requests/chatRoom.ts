import fetchThen from '../util/api'

export const fetchChatRoom = (id: number): Promise<any> => {
  return fetchThen(`/api/chat-room/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    }
  });
}

export const leaveChatRoom = (id: number): Promise<any> => {
  return fetchThen(`/api/chat-room/leave/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
  });
}