/**
 * UserName 및 채팅방 정보를 실제 데이터로 대치하는 작업 필요
 */

import { LeftArrow } from '../../svgicon/LeftArrow';
import Logout from '../../svgicon/Logout';
import React from '../../util/react';
import { $ } from '../../util/select';
import ChatProduct from './ChatProduct';
import ChatMessage from './ChatMessage';
import { fetchChatRoom, leaveChatRoom } from '../../requests/chatRoom';
import { fetchChatMessage, fetchMoreChatMessage, sendChatMessage } from '../../requests/chatMessage';
import SendButton from '../../svgicon/SendButton';
import { SpecificChatRoomTypes } from '../../types/chatRoom';

import '../../public/css/Chat.css';
import { ChatMessageTypes } from '../../types/chatMessage';
import LeaveChatModal from './LeaveChatModal';

const NEW_CHAT_NOTICE_SHOWING_TIME = 5000;

export default class Chat extends React {
  private leaveChatModal: LeaveChatModal;
  private canFetchMore = true;
  private chatRoom!: SpecificChatRoomTypes;
  private newMessageNoticeTimeout: NodeJS.Timeout | null = null;
  private fetchTimer: NodeJS.Timeout | null = null;
  private chatMessages: ChatMessageTypes[] = [];

  constructor($target: HTMLElement) {
    super($target, 'Chat');
    this.leaveChatModal = new LeaveChatModal($target, this.onLeaveButtonClicked);
    this.init();
  }

  shouldScrollToBottom() {
    const $chatList = $('.Chat-List').get();
    if ($chatList === null) {
      return;
    }

    return $chatList.clientHeight + $chatList.scrollTop >= $chatList.scrollHeight;
  }

  scrollToBottom(initialScroll?: boolean) {
    const $chatList = $('.Chat-List').get();
    if ($chatList === null) {
      return;
    }

    $chatList.scrollTo({
      top: $chatList.scrollHeight,
      behavior: initialScroll ? 'auto' : 'smooth',
    });
  }

  onWindowHashChanged = () => {
    if (this.fetchTimer !== null) {
      clearTimeout(this.fetchTimer);
    }
  }

  onLeaveButtonClicked = () => {
    // 현재 채팅방 조회로 대치
    leaveChatRoom(8)
      .then(() => {
        // 홈으로 돌아가기
      })
      .catch(error => {
        // error handling
      })
      .finally(() => {
        this.leaveChatModal.close();
      })
  }

  onSendButtonClicked = () => {
    const $chatMessageInput = ($('#Chat-Message-Input').get() as HTMLInputElement);
    const { value } = $chatMessageInput;

    if (value.trim().length <= 0) {
      return;
    }

    sendChatMessage(this.chatRoom.id, value)
      .then(() => {
        $chatMessageInput.value = '';
        this.fetchMore();
      })
      .catch(error => {
        // error handling
      })
  }

  onChatMessageInputKeyPressed = (e: Event) => {
    if ((e as KeyboardEvent).key === 'Enter') {
      this.onSendButtonClicked();
    }
  }

  onOpenLeaveChatModalButtonClicked = () => {
    this.leaveChatModal.open();
  }

  onNewChatNoticeClicked = () => {
    this.scrollToBottom();
    $('.New-Chat-Notice').get()?.classList.remove('appear');
    if (this.newMessageNoticeTimeout !== null) {
      clearTimeout(this.newMessageNoticeTimeout);
    }
  }

  componentWillMount() {
    const $chatProduct = $('.Chat-Product').get();
    if ($chatProduct !== null) {
      new ChatProduct($chatProduct, this.chatRoom);
    }

    const $chatList = $('.Chat-List').get();

    if ($chatList !== null) {
      this.chatMessages.forEach(chatMessage => {
        return new ChatMessage($chatList, chatMessage, 'jinu');
      });
    }
  }

  fetchData() {
    // 현재 채팅방 조회로 변경 필요
    return fetchChatRoom(8)
      .then(data => {
        const { chatRoom } = data.data;
        this.chatRoom = chatRoom;

        const $chatRoomTitle = $('.ChatRoom-Title').get();
        if ($chatRoomTitle !== null) {
          $chatRoomTitle.innerText = this.chatRoom.partnerId;
        }

        return fetchChatMessage(chatRoom.id);
      })
      .then(data => {
        const { chatMessages } = data.data;
        this.chatMessages = chatMessages;
        this.componentWillMount();
        this.scrollToBottom(true);
      })
      .catch(error => {

      });
  }

  fetchMore = () => {
    if (!this.canFetchMore) {
      return;
    }

    this.canFetchMore = false;
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
            }, NEW_CHAT_NOTICE_SHOWING_TIME);
          }
        }
      })
      .catch(error => {
        // error handling
      })
      .finally(() => {
        this.canFetchMore = true;
      })
  }

  methods() {
    window.addEventListener('hashchange', this.onWindowHashChanged);
    $('#Send-Chat-Message-Button').on('click', this.onSendButtonClicked);
    $('#Chat-Message-Input').on('keypress', this.onChatMessageInputKeyPressed);
    $('#Open-Leave-Chat-Modal-Button').on('click', this.onOpenLeaveChatModalButtonClicked);
    $('.New-Chat-Notice').on('click', this.onNewChatNoticeClicked);
  }

  render(): void {
    this.$outer.innerHTML = `
      <div id="Chat-Inner">
        <header>
          <div class="Chat-Header">
            <div class="Header-Left">${LeftArrow}</div>
            <h4 class="ChatRoom-Title"></h4>
            <div class="Header-Right" id="Open-Leave-Chat-Modal-Button">${Logout}</div>
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
    this.fetchData()
      .then(() => {
        // 데이터 Fetch 후 타이버 등록
        this.fetchTimer = setInterval(() => {
          this.fetchMore();
        }, 500);
      });
  }
}