import fetchThen from '../util/api'

export const fetchChatMessage = (chatRoomId: number): Promise<any> => {
  return fetchThen(`/api/chat-message/${chatRoomId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImppbnUiLCJpYXQiOjE2MjY1NzIyOTQsImV4cCI6MTYyNjc0NTA5NCwiaXNzIjoid29vd2FoYW4iLCJzdWIiOiJ0b2tlbiJ9.QdmgwBXJPrvbpiK2Atj78I7H96Vz9Q43tGYiVwi3zxk',
    },
  });
}

export const fetchMoreChatMessage = (chatRoomId: number, lastChatMessageId: number): Promise<any> => {
  return fetchThen(`/api/chat-message/${chatRoomId}?lastChatMessageId=${lastChatMessageId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImppbnUiLCJpYXQiOjE2MjY1NzIyOTQsImV4cCI6MTYyNjc0NTA5NCwiaXNzIjoid29vd2FoYW4iLCJzdWIiOiJ0b2tlbiJ9.QdmgwBXJPrvbpiK2Atj78I7H96Vz9Q43tGYiVwi3zxk',
    },
  });
}

export const sendChatMessage = (chatRoomId: number, content: string): Promise<any> => {
  return fetchThen(`/api/chat-message/${chatRoomId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImppbnUiLCJpYXQiOjE2MjY1NzIyOTQsImV4cCI6MTYyNjc0NTA5NCwiaXNzIjoid29vd2FoYW4iLCJzdWIiOiJ0b2tlbiJ9.QdmgwBXJPrvbpiK2Atj78I7H96Vz9Q43tGYiVwi3zxk',
    },
    body: JSON.stringify({
      content,
    }),
  });
}