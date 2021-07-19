import { ChatMessageTypes } from '../../../types/chatMessage';
import React from '../../../util/react';

import './index.css';

type ChatType = 'MINE' | 'PARTNERS';

export default class ChatMessage extends React {
  private chatMessage: ChatMessageTypes;

  constructor($target: HTMLElement, chatMessage: ChatMessageTypes, userId: string) {
    super($target, 'ChatMessage');
    this.chatMessage = chatMessage;

    if (chatMessage.userId !== userId) {
      this.$outer.classList.add('PartnersMessage');
    } else {
      this.$outer.classList.add('MyMessage')
    }


    this.render();
  }

  render(): void {
    this.$outer.innerHTML = `
      <div class="ChatMessage">
        ${this.chatMessage.content}
      </div>
    `
  }
}