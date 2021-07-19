class ChatMessage {
  id!: number;
  chatRoomId!: string;
  userId!: string;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export default ChatMessage;