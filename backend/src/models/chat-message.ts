class ChatMessage {
  id!: number;
  chatroomId!: string;
  userId!: string;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export default ChatMessage;
