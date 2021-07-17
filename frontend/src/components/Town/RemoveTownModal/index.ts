import Modal from '../../../templates/Modal';

import './index.css';

export default class RemoveTownModal {
  private modal: Modal;

  constructor($target: HTMLElement) {
    this.modal = new Modal($target, `
    <div class="Town-Remove-Modal-Content">
      <span class="Town-Remove-Modal-Desc">정말 동네 정보를 삭제하겠습니까?</span>
      <div class="Town-Remove-Button-Wrapper">
        <button id="Close-Remove-Town-Modal">취소</button>
        <button id="Remove-Town-Button">삭제</button>
      </div>
    </div>
    `);
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }
}