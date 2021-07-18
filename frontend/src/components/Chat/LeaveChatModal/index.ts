import Modal from '../../../common/Modal';
import { $ } from '../../../util/select';

import './index.css';

export default class LeaveChatModal {
  private modal: Modal;

  constructor($target: HTMLElement) {
    this.modal = new Modal($target, `
    <div class="Leave-Chat-Modal-Content">
      <span class="Leave-Chat-Modal-Desc">정말 채팅방을 나가시겠습니까?</span>
      <div class="Leave-Chat-Button-Wrapper">
        <button id="Close-Leave-Chat-Modal">취소</button>
        <button id="Leave-Chat-Button">나가기</button>
      </div>
    </div>
    `);

    $('#Close-Leave-Chat-Modal').on('click', this.close.bind(this));
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
    ($('#Add-Town-Button').get() as HTMLButtonElement).disabled = true;
  }
}