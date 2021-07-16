import { LeftArrow } from '../svgicon/LeftArrow';
import React from '../util/react';
import '../public/css/Town.css';
import { $ } from '../util/select';
import convertElementTarget from '../util/convertEventTarget';
import UserTownItem from '../templates/UserTownItem';
import { UserTownTypes } from '../types/userTown';
import OpenAddModalButton from '../templates/OpenAddModalButton';
import AddModal from '../templates/AddModal';
import RemoveModal from '../templates/RemoveModal';

export default class Town extends React {
  constructor($target: HTMLElement) {
    super($target, 'Town');
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

  onRemove() {

  }

  onOpenRemoveClicked() {
    $('.Town-Remove-Modal').get()?.classList.replace('disappear', 'appear');
    $('.Town-Remove-Modal-Container').get()?.classList.replace('disappear', 'appear');
  }

  onCloseRemoveClicked() {
    $('.Town-Remove-Modal').get()?.classList.replace('appear', 'disappear');
    $('.Town-Remove-Modal-Container').get()?.classList.replace('appear', 'disappear');
  }

  onOpenAddClicked() {
    $('.Town-Add-Modal').get()?.classList.replace('disappear', 'appear');
    $('.Town-Add-Modal-Container').get()?.classList.replace('disappear', 'appear');
  }

  onCloseAddClicked() {
    $('.Town-Add-Modal').get()?.classList.replace('appear', 'disappear');
    $('.Town-Add-Modal-Container').get()?.classList.replace('appear', 'disappear');
    (($('#Add-Town-Input').get()) as HTMLInputElement).value = '';
  }

  onAddClicked() {
    this.onCloseAddClicked();
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

  listenEvents() {
    $('#Open-Add-Town-Modal').on('click', () => this.onOpenAddClicked());
    $('.Town-List').on('click', (e) => this.onTownListClicked(e));
    $('#Add-Town-Input').on('keyup', (e) => this.onAddTownInputChanged(e));
    $('#Close-Add-Town-Modal').on('click', () => this.onCloseAddClicked());
    $('#Close-Remove-Town-Modal').on('click', () => this.onCloseRemoveClicked());
    $('#Add-Town-Button').on('click', () => this.onAddClicked());
  }

  render() {
    this.$outer.innerHTML = `
      ${AddModal()}
      ${RemoveModal()}

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

    this.listenEvents();
  }
}
