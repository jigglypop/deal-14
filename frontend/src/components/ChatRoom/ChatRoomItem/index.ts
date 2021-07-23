import { productApi } from '../../../requests/product';
import { ChatRoomTypes } from '../../../types/chatRoom';
import React from '../../../util/react';

import './index.css';

export default class ChatRoomItem extends React {
  private chatRoom: ChatRoomTypes;
  private data: any;

  constructor($target: HTMLElement, chatRoom: ChatRoomTypes) {
    super($target, 'ChatRoomItem');
    this.chatRoom = chatRoom;
    this.ProductApi();
  }
  
  ProductApi() {
    productApi(this.chatRoom.productId + "")
        .then((data) => {
            if (!data.hasOwnProperty('status')) {
              this.data = data.data.product
            } 
        }).then(() => {
          this.render()
        })
  }


  render(): void {
    const { recentMessage } = this.chatRoom;
    const productImages  = this.data.productImages
    const filePath = productImages.length > 0 ? productImages[0].filePath : '';

    this.$outer.innerHTML = `
      <div class="ChatRoomItem" data-chat-room-id="${this.chatRoom.id}">
        <div  class="ChatRoomItem-Info">
          <div class="ChatRoomItem-BasicInfo">
            <span class="ChatRoomItem-Partner">${this.chatRoom.partnerId}</span>
            <span class="ChatRoomItem-RecentMessage">${recentMessage.content ?? ''}</span>
          </div>

          <div class="ChatRoomItem-RecentMessage-Info">
            <span class="RecentMessage-Time">${recentMessage.createdAt !== null ? getTimes().getTime(recentMessage.createdAt) : ''}</span>
            ${this.chatRoom.newMessageCount > 0 ? `<div class="RecentMessage-Count">${this.chatRoom.newMessageCount}</div>` : ''}
          </div>
        </div>

        <div class="ChatRoomItem-Image-Wrapper">
          <img src="${filePath}" />
        </div>
      </div>
    `;
  }
  css() {
    return ``
  }

  methods() { }
}