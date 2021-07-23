import fetchThen from '../util/api'
import cache from '../util/cache';

export const fetchChatMessage = (chatRoomId: number): Promise<any> => {
  return fetchThen(`/api/chat-message/${chatRoomId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cache.get('token').value}`,
    },
  });
}

export const fetchMoreChatMessage = (chatRoomId: number, lastChatMessageId: number): Promise<any> => {
  return fetchThen(`/api/chat-message/${chatRoomId}?lastChatMessageId=${lastChatMessageId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cache.get('token').value}`,
    },
  });
}

export const sendChatMessage = (chatRoomId: number, content: string): Promise<any> => {
  return fetchThen(`/api/chat-message/${chatRoomId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cache.get('token').value}`,
    },
    body: JSON.stringify({
      content,
    }),
  });
}

export const readChatMessage = (chatRoomId: number, chatMessageId: number): Promise<any> => {
  return fetchThen(`/api/chat-message/read/${chatRoomId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cache.get('token').value}`,
    },
    body: JSON.stringify({
      chatMessageId,
    }),
  });
}