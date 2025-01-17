import fetchThen from '../util/api'
import cache from '../util/cache';

export const fetchChatRoom = (id: number): Promise<any> => {
  return fetchThen(`/api/chat-room/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cache.get('token').value}`,
    }
  });
}

export const fetchChatRoomList = (): Promise<any> => {
  return fetchThen(`/api/chat-room/my`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cache.get('token').value}`,
    },
  })
}

export const leaveChatRoom = (id: number): Promise<any> => {
  return fetchThen(`/api/chat-room/leave/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cache.get('token').value}`,
    },
  });
}

export const joinChatRoom = (productId: number): Promise<any> => {
  return fetchThen(`/api/chat-room/join/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cache.get('token').value}`,
    },
  });
}