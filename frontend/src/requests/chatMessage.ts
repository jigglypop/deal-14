import fetchThen from '../util/api'

export const fetchChatMessage = (chatRoomId: number): Promise<any> => {
  return fetchThen(`/api/chat-message/${chatRoomId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
  });
}

export const fetchMoreChatMessage = (chatRoomId: number, lastChatMessageId: number): Promise<any> => {
  return fetchThen(`/api/chat-message/${chatRoomId}?lastChatMessageId=${lastChatMessageId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
  });
}

export const sendChatMessage = (chatRoomId: number, content: string): Promise<any> => {
  return fetchThen(`/api/chat-message/${chatRoomId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
    body: JSON.stringify({
      content,
    }),
  });
}