import Modal from '../Modal';
import { $ } from '../../util/select';

import './index.css';

export default class ErrorModal {
  private modal: Modal;

  constructor($target: HTMLElement) {
    this.modal = new Modal($target, '');
  }

  open(errorMessage: string) {
    this.modal.setInner(`
      <div class="Error-Modal-Content">
        <span class="Error-Modal-Desc">${errorMessage}</span>
        <div class="Error-Button-Wrapper">
          <button id="Close-Error-Modal">닫기</button>
        </div>
      </div>
    `);

    $('#Close-Error-Modal').on('click', this.close.bind(this));
    this.modal.open();
  }

  close() {
    this.modal.close();
  }
}