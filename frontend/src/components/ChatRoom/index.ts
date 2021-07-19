import { LeftArrow } from '../../svgicon/LeftArrow';
import React from '../../util/react';
import { $ } from '../../util/select';
import ChatRoomList from './ChatRoomList';

import './index.css';

export default class ChatRoom extends React {
  constructor($target: HTMLElement) {
    super($target, 'ChatRoom');
    this.init();
  }

  componentWillMount() {
    const $chatRoomListWrapper = $('.ChatRoomList-Wrapper').get();
    if ($chatRoomListWrapper === null) {
      return;
    }

    new ChatRoomList($chatRoomListWrapper);
  }

  render(): void {
    this.$outer.innerHTML = `
    <div id="ChatRoom-Inner">
      <header class="ChatRoom-Header">
        <div>${LeftArrow}</div>
        <h4>채팅하기</h4>
        <div></div>
      </header>

      <div class="ChatRoomList-Wrapper">

      </div>
    </div>
    `
    this.componentWillMount();
  }

  css(): string {
    return ``;
  }

  methods(): void {
  }

}