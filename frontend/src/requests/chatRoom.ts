import fetchThen from '../util/api'

export const fetchChatRoom = (id: number): Promise<any> => {
  return fetchThen(`/api/chat-room/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImppbnUiLCJpYXQiOjE2MjY1NzIyOTQsImV4cCI6MTYyNjc0NTA5NCwiaXNzIjoid29vd2FoYW4iLCJzdWIiOiJ0b2tlbiJ9.QdmgwBXJPrvbpiK2Atj78I7H96Vz9Q43tGYiVwi3zxk',
    }
  });
}

export const leaveChatRoom = (id: number): Promise<any> => {
  return fetchThen(`/api/chat-room/leave/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImppbnUiLCJpYXQiOjE2MjY1NzIyOTQsImV4cCI6MTYyNjc0NTA5NCwiaXNzIjoid29vd2FoYW4iLCJzdWIiOiJ0b2tlbiJ9.QdmgwBXJPrvbpiK2Atj78I7H96Vz9Q43tGYiVwi3zxk',
    },
  });
}