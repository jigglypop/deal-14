import { LeftArrow } from '../../svgicon/LeftArrow';
import Logout from '../../svgicon/Logout';
import React from '../../util/react';

import '../../public/css/Chat.css';
import { $ } from '../../util/select';
import ChatProduct from './ChatProduct';
import ChatMessage from './ChatMessage';
import { fetchChatRoom } from '../../requests/chatRoom';
import { fetchChatMessage, fetchMoreChatMessage, sendChatMessage } from '../../requests/chatMessage';
import SendButton from '../../svgicon/SendButton';

export default class Chat extends React {
  private canFetchMore = true;
  private chatRoom: any = null;
  private newMessageNoticeTimeout: NodeJS.Timeout | null = null;
  private chatMessages: any = [];

  constructor($target: HTMLElement) {
    super($target, 'Chat');
    this.init();
  }

  shouldScrollToBottom() {
    const $chatList = $('.Chat-List').get();
    if ($chatList === null) {
      return;
    }

    return $chatList.clientHeight + $chatList.scrollTop >= $chatList.scrollHeight;
  }

  scrollToBottom() {
    const $chatList = $('.Chat-List').get();
    if ($chatList === null) {
      return;
    }

    $chatList.scrollTo({
      top: $chatList.scrollHeight,
    });
  }


  onSendButtonClicked = () => {
    const $chatMessageInput = ($('#Chat-Message-Input').get() as HTMLInputElement);
    const { value } = $chatMessageInput;

    if (value.trim().length <= 0) {
      return;
    }

    sendChatMessage(this.chatRoom.id, value)
      .then(() => {
        this.fetchMore();
        $chatMessageInput.value = '';
      })
  }

  onChatMessageInputKeyPressed = (e: Event) => {
    console.log((e as KeyboardEvent).key);

    if ((e as KeyboardEvent).key === 'Enter') {
      this.onSendButtonClicked();
    }
  }

  componentWillMount() {
    const $chatProduct = $('.Chat-Product').get();
    if ($chatProduct !== null) {
      new ChatProduct($chatProduct, this.chatRoom);
    }

    const $chatList = $('.Chat-List').get();

    if ($chatList !== null) {
      this.chatMessages.forEach((chatMessage: any) => {
        return new ChatMessage($chatList, chatMessage, 'jinu');
      });
    }
  }

  fetchProduct() {
    return fetchChatRoom(1)
      .then(data => {
        const { chatRoom } = data.data;
        this.chatRoom = chatRoom;

        const $chatRoomTitle = $('.ChatRoom-Title').get();
        if ($chatRoomTitle !== null) {
          $chatRoomTitle.innerText = this.chatRoom?.title;
        }

        return fetchChatMessage(chatRoom.id);
      })
      .then(data => {
        const { chatMessages } = data.data;
        this.chatMessages = chatMessages;
        this.componentWillMount();
        this.scrollToBottom();
      });
  }

  fetchMore = () => {
    let fetchMessages;

    if (this.chatMessages.length <= 0) {
      fetchMessages = fetchChatMessage(this.chatRoom.id)
    } else {
      const lastId = this.chatMessages[this.chatMessages.length - 1].id;
      fetchMessages = fetchMoreChatMessage(this.chatRoom.id, lastId)
    }

    fetchMessages
      .then((data) => {
        const { chatMessages } = data.data;
        this.chatMessages = [
          ...this.chatMessages,
          ...chatMessages,
        ];

        const shouldScrollToBottom = this.shouldScrollToBottom();
        const $chatList = $('.Chat-List').get();
        if ($chatList !== null) {
          chatMessages.forEach((chatMessage: any) => {
            return new ChatMessage($chatList, chatMessage, 'jinu');
          });
        }

        if (chatMessages.length > 0) {
          if (shouldScrollToBottom) {
            this.scrollToBottom();
          } else {
            let isAllMine = true;
            for (const chatMessage of chatMessages) {
              if ('jinu' !== chatMessage.userId) {
                isAllMine = false;
                break;
              }
            }

            if (isAllMine) {
              return;
            }

            $('.New-Chat-Notice').get()?.classList.add('appear');
            if (this.newMessageNoticeTimeout !== null) {
              clearTimeout(this.newMessageNoticeTimeout);
            }

            this.newMessageNoticeTimeout = setTimeout(() => {
              $('.New-Chat-Notice').get()?.classList.remove('appear');
            }, 3000);
          }
        }
      })
      .finally(() => {
        this.canFetchMore = true;
      })
  }

  methods() {
    $('#Send-Chat-Message-Button').on('click', this.onSendButtonClicked);
    $('#Chat-Message-Input').on('keypress', this.onChatMessageInputKeyPressed);
  }

  render(): void {
    this.$outer.innerHTML = `
      <div id="Chat-Inner">
        <header>
          <div class="Chat-Header">
            <div class="Header-Left">${LeftArrow}</div>
            <h4 class="ChatRoom-Title"></h4>
            <div class="Header-Right">${Logout}</div>
          </div>
          <div class="Chat-Product">
          </div>
        </header>
        <div class="Chat-Form">
          <div class="Chat-List-Wrapper">
            <div class="Chat-List">
            </div>
            <div class="New-Chat-Notice disappear">
              새로운 메시지가 왔습니다
            </div>
          </div>

          <div class="Send-Chat-Form">
            <input id="Chat-Message-Input" type="text" placeholder="메시지를 입력하세요.">
            <div id="Send-Chat-Message-Button">
              ${SendButton}
            </div>
          </div>
        </div>
      </div>
    `

    this.methods();
    this.fetchProduct()
      .then(() => {
        setInterval(() => {
          if (!this.canFetchMore) {
            return;
          }

          this.canFetchMore = false;
          this.fetchMore();
        }, 500);
      })
  }
}