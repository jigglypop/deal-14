import { fetchChatRoomList } from '../../../requests/chatRoom';
import { ChatRoomTypes } from '../../../types/chatRoom';
import React from '../../../util/react';
import { $ } from '../../../util/select';
import ChatRoomItem from '../ChatRoomItem';

import './index.css';

export default class ChatRoomList extends React {
  private chatRoomList: ChatRoomTypes[] = [];

  constructor($target: HTMLElement) {
    super($target, 'ChatRoomList');
    this.init();
  }

  onChatRoomListClicked = (e: Event) => {
    const { chatRoomId } = (e.target as HTMLElement).dataset;
    if (!chatRoomId) {
      return;
    }

    location.href = `/#chat/${chatRoomId}`;
  }

  componentWillMount() {
    const $chatRoomList = $('.ChatRoomList').get();
    if ($chatRoomList === null) {
      return;
    }

    this.chatRoomList.forEach(chatRoom => {
      new ChatRoomItem($chatRoomList, chatRoom);
    });
  }

  fetchData() {
    fetchChatRoomList()
      .then(data => {
        const { chatRooms } = data.data;
        this.chatRoomList = chatRooms;
        this.componentWillMount();
      })
      .catch(error => {
        // error handling
      })
  }

  render(): void {
    this.$outer.innerHTML = `
      <div class="ChatRoomList">
      </div>
    `

    this.fetchData();
  }

  css() {
    return ``
  }

  methods() {
    $('.ChatRoomList').on('click', this.onChatRoomListClicked);
  }
}