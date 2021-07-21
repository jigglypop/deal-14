import { redux } from '../..';
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
    if (redux.check.getCheckForm().id === '') {
      location.href = '/#';
      return;
    }

    this.$outer.innerHTML = `
    <div id="ChatRoom-Inner">
      <header class="ChatRoom-Header">
        <span class="ChatRoom-Go-Back">${LeftArrow}</span>
        <h4>채팅하기</h4>
        <div></div>
      </header>

      <div class="ChatRoomList-Wrapper">

      </div>
    </div>
    `
    this.componentWillMount();
  }

  onGoBack() {
    redux.router.goRouter();
  }

  css(): string {
    return ``;
  }

  methods(): void {
    $('.ChatRoom-Go-Back').on('click', this.onGoBack);
  }

}