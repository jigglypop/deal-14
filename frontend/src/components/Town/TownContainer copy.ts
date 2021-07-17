import { LeftArrow } from '../../svgicon/LeftArrow';
import React from '../../util/react';
import '../../public/css/Town.css';
import { $ } from '../../util/select';
import convertElementTarget from '../../util/convertEventTarget';
import UserTownItem from '../../templates/UserTownItem';
import { UserTownTypes } from '../../types/userTown';
import OpenAddModalButton from '../../templates/Town/OpenAddModalButton';
import AddModal from '../../templates/Town/AddModal';
import RemoveModal from '../../templates/Town/RemoveModal';
import Modal from '../../templates/Modal';

export default class Town extends React {
  private addModal: Modal;
  private removeModal: Modal;

  constructor($target: HTMLElement) {
    super($target, 'Town');

    this.addModal = new Modal(this.$target, AddModal());
    this.removeModal = new Modal(this.$target, RemoveModal());

    this.state = {
      userTowns: [{
        id: 2,
        town: {
          townName: "삼성동"
        },
      },
      {
        id: 3,
        town: {
          townName: "삼성동"
        },
      }
      ],
    }

    this.init();
  }

  onOpenRemoveClicked() {
    this.removeModal.open();
  }

  onCloseRemoveButtonClicked() {
    this.removeModal.close();
  }

  onOpenAddButtonClicked() {
    this.addModal.open();
  }

  onCloseAddButtonClicked() {
    this.addModal.close();
    (($('#Add-Town-Input').get()) as HTMLInputElement).value = '';
  }

  onAddButtonClicked() {
    // todo: 추가하기
    this.addModal.close();
    (($('#Add-Town-Input').get()) as HTMLInputElement).value = '';
  }

  onTownListClicked(e: Event) {
    const $target = convertElementTarget(e.target);
    const $closest = <HTMLElement>$target.closest('.Close-Button');
    if ($closest === null) {
      return;
    }

    // 삭제 시 사용
    const userTownId = $closest.parentElement?.dataset.userTownId;
    this.onOpenRemoveClicked();
  }

  onAddTownInputChanged(e: Event) {
    const inputText = (<HTMLInputElement>convertElementTarget(e.target)).value;
    ($('#Add-Town-Button').get() as HTMLButtonElement).disabled = !(inputText.trim().length > 0);
  }

  css() {
    return ``
  }

  methods() {
    $('#Open-Add-Town-Modal').on('click', this.onOpenAddButtonClicked.bind(this));
    $('.Town-List').on('click', this.onTownListClicked.bind(this));
    $('#Add-Town-Input').on('keyup', this.onAddTownInputChanged.bind(this));
    $('#Close-Add-Town-Modal').on('click', this.onCloseAddButtonClicked.bind(this));
    $('#Close-Remove-Town-Modal').on('click', this.onCloseRemoveButtonClicked.bind(this));
    $('#Add-Town-Button').on('click', this.onAddButtonClicked.bind(this));
  }

  render() {
    this.$outer.innerHTML = `
      <div id="Town-Inner">
        <header class="Town-Header">
          <div>${LeftArrow}</div>
          <h4>내 동네 설정하기</h4>
          <div></div>
        </header>
        <div class="Town-Description">
          <p>지역은 최소 1개 이상<br>최대 2개까지 설정가능해요.</p>
        </div>
        <div class="Town-List">
          ${this.state.userTowns.map((userTown: UserTownTypes) => UserTownItem(userTown)).join('')}
          ${OpenAddModalButton()}
        </div>
      </div>
    `
  }
}
