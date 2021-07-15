import { LeftArrow } from '../svgicon/LeftArrow';
import React from '../util/react';
import '../public/css/Town.css';
import CloseButton from '../svgicon/CloseButton';
import PlusButton from '../svgicon/PlusButton';
import { $ } from '../util/select';
import convertElementTarget from '../util/convertEventTarget';
import UserTownItem from '../templates/UserTownItem';
import { UserTownTypes } from '../types/userTown';
import OpenAddModalButton from '../templates/OpenAddModalButton';

export default class Town extends React {
  constructor($target: HTMLElement) {
    super($target, 'Town');
    this.state = {
      isShowAddModal: false,
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

  onOpenAddClicked() {
    this.setState({
      ...this.state,
      isShowAddModal: true,
    });
  }

  onCloseAddClicked() {
    this.setState({
      ...this.state,
      isShowAddModal: false,
    });
  }

  onAddClicked() {
    this.setState({
      ...this.state,
      isShowAddModal: false,
      userTowns: [
        ...this.state.userTowns,
        {
          id: 3,
          town: {
            townName: "범물동"
          },
        },
      ],
    })
  }

  onTownListClicked(e: Event) {
    console.log('pass');
    const $target = convertElementTarget(e.target);
    const $closest = <HTMLElement>$target.closest('.Close-Button');
    if ($closest === null) {
      return;
    }

    const userTownId = $closest.parentElement?.dataset.userTownId;
    alert(userTownId);
  }

  onAddTownInputChanged(e: Event) {
    const inputText = (<HTMLInputElement>convertElementTarget(e.target)).value;
    ($('#Add-Town-Button').get() as HTMLButtonElement).disabled = !(inputText.trim().length > 0);
  }

  listenEvents() {
    $('#Open-Add-Town-Modal').on('click', () => this.onOpenAddClicked());
    // $('.Town-List').on('click', (e) => this.onTownListClicked(e));
    document.querySelector('.Town-List')?.addEventListener('click', (e) => this.onTownListClicked(e));
    // $('#Add-Town-Input').on('keyup', (e) => this.onAddTownInputChanged(e));
    $('#Add-Town-Input').get()?.addEventListener('keyup', (e) => this.onAddTownInputChanged(e));
    $('#Close-Add-Town-Modal').on('click', () => this.onCloseAddClicked());
    $('#Add-Town-Button').on('click', () => this.onAddClicked());
  }

  townItem() {
    return this.state.userTowns.map((userTown: any) => {
      return `
      <div class="Town-Item Town-Info" data-user-town-id="${userTown.id}">
        <span class="Town-Item-Name">${userTown.town.townName}</span>
        ${CloseButton}
      </div>
      `
    }).join('');
  }

  render() {
    this.$outer.innerHTML = `
    <div  ${this.state.isShowAddModal ? '' : 'hidden'}>
      <div class="Town-Add-Modal-Wrapper">
        <div class="Town-Add-Modal">
          <div class="Town-Add-Modal-Content">
            <span class="Town-Add-Modal-Desc">현재 위치를 입력하세요</span>
            <input type="text" placeholder="시.구 제외, 동만 입력" id="Add-Town-Input"/>
            <div class="Town-Add-Button-Wrapper">
              <button id="Close-Add-Town-Modal">취소</button>
              <button id="Add-Town-Button" disabled>확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>

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
