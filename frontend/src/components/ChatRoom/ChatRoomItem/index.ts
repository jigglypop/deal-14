import { ChatRoomTypes } from '../../../types/chatRoom';
import getTimes from '../../../util/getTimes';
import React from '../../../util/react';
import { formatCreatedAt } from '../../../util/time';

import './index.css';

export default class ChatRoomItem extends React {
  private chatRoom: ChatRoomTypes;

  constructor($target: HTMLElement, chatRoom: ChatRoomTypes) {
    super($target, 'ChatRoomItem');
    this.chatRoom = chatRoom;
    this.render();
  }

  render(): void {
    const { recentMessage, productImages } = this.chatRoom;
    const filePath = productImages.length > 0 ? productImages[0].filePath : '';

    this.$outer.innerHTML = `
      <div class="ChatRoomItem" data-chat-room-id="${this.chatRoom.id}">
        <div  class="ChatRoomItem-Info">
          <div class="ChatRoomItem-BasicInfo">
            <span class="ChatRoomItem-Partner">${this.chatRoom.partnerId}</span>
            <span class="ChatRoomItem-RecentMessage">${recentMessage.content ?? ''}</span>
          </div>

          <div class="ChatRoomItem-RecentMessage-Info">
            <span class="RecentMessage-Time">${recentMessage.createdAt && formatCreatedAt(recentMessage.createdAt)}</span>
            <div class="RecentMessage-Count">2</div>
          </div>
        </div>

        <div class="ChatRoomItem-Image-Wrapper">
          <img src="${filePath}"/>
        </div>
      </div>
    `;
  }
  css() {
    return ``
  }

  methods() { }
}