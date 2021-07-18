import { SpecificChatRoomTypes } from '../../../types/chatRoom';
import React from '../../../util/react';

import './index.css';

export default class ChatProduct extends React {
  private chatRoom: SpecificChatRoomTypes;

  constructor($target: HTMLElement, chatRoom: any) {
    super($target, 'ChatProduct');
    this.chatRoom = chatRoom;
    console.log(chatRoom);

    this.render();
  }

  render(): void {
    const { productImages } = this.chatRoom;
    const filePath = productImages.length > 0 ? productImages[0].filePath : '';

    this.$outer.innerHTML = `
    <div class="ChatProduct">
      <div class="ChatProduct-Product">
        <img src="${filePath}" />
        <div class="ChatProduct-Info">
          <span class="ChatProduct-Title">${this.chatRoom.product.title}</span>
          <span class="ChatProduct-Price">${this.chatRoom.product.price}</span>
        </div>
      </div>

      <div class="ChatProduct-Status">${this.chatRoom.product.isSoldOut ? '판매완료' : '판매중'}</div>
    </div>
    `
  }

}