class ChatMessage {
  id!: number;
  chatRoomId!: number;
  userId!: string;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export default ChatMessage;