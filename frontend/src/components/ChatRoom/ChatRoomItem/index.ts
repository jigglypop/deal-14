import { ChatRoomTypes } from '../../../types/chatRoom';
import React from '../../../util/react';

import './index.css';

export default class ChatRoomItem extends React {

  constructor($target: HTMLElement, chatRoom: ChatRoomTypes) {
    super($target, 'ChatRoomItem');
    this.render();
  }

  render(): void {
    this.$outer.innerHTML = `
      <div class="ChatRoomItem">
        <div  class="ChatRoomItem-Info">
          <div class="ChatRoomItem-BasicInfo">
            <span class="ChatRoomItem-Partner">ChoiJinwoo</span>
            <span class="ChatRoomItem-RecentMessage">감사합니다</span>
          </div>

          <div class="ChatRoomItem-RecentMessage-Info">
            <span class="RecentMessage-Time">2분 전</span>
            <div class="RecentMessage-Count">2</div>
          </div>
        </div>

        <div class="ChatRoomItem-Image-Wrapper">
          <img src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile7.uf.tistory.com%2Fimage%2F24283C3858F778CA2EFABE"/>
        </div>
      </div>
    `;
  }

}