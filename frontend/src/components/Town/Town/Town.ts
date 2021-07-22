import { LeftArrow } from '../../../svgicon/LeftArrow';
import React from '../../../util/react';
import './Town.css';
import { $ } from '../../../util/select';
import convertElementTarget from '../../../util/convertEventTarget';
import { UserTownTypes } from '../../../types/userTown';
import UserTownItem from '../UserTownItem';
import PlusTownItem from '../PlusTownItem';
import { addMyTown, fetchMyTowns, removeMyTown } from '../../../requests/town';
import AddTownModal from '../AddTownModal';
import RemoveTownModal from '../RemoveTownModal';
import ErrorModal from '../../../common/ErrorModal';
import { redux } from '../../..';
import { createToast } from '../../../util/createToast';

export default class Town extends React {
  private addTownModal: AddTownModal;
  private removeTownModal: RemoveTownModal;
  private errorModal: ErrorModal;

  private userTowns: UserTownTypes[] = [];
  private removeUserTownId: number | null = null;

  constructor($target: HTMLElement) {
    super($target, 'Town');
    this.addTownModal = new AddTownModal(this.$target);
    this.removeTownModal = new RemoveTownModal(this.$target, this.onRemoveButtonClicked);
    this.errorModal = new ErrorModal(this.$target);
    this.init();
  }

  openRemoveModal() {
    this.removeTownModal.open();
  }

  onCloseRemoveButtonClicked = () => {
    this.removeTownModal.close();
  }

  onOpenAddButtonClicked = () => {
    this.addTownModal.open();
  }

  onCloseAddButtonClicked = () => {
    this.addTownModal.close();
    (($('#Add-Town-Input').get()) as HTMLInputElement).value = '';
  }

  onAddButtonClicked = () => {
    const $addTownInput = $('#Add-Town-Input').get() as HTMLInputElement;
    const townName = $addTownInput.value;

    addMyTown({
      townName,
    })
      .then((data) => {
        if (data.status) {
          createToast('2개 이상의 동네를 설정할 수 없습니다');
        } else {
          this.fetchUserTowns();
        }
      })
      .finally(() => {
        this.addTownModal.close();
      });
  }

  onTownListClicked = (e: Event) => {
    const $target = convertElementTarget(e.target);
    const $closest = <HTMLElement>$target.closest('.Close-Button');
    if ($closest === null) {
      return;
    }


    this.removeUserTownId = Number($closest.parentElement?.dataset.userTownId ?? null);
    this.openRemoveModal();
  }

  onRemoveButtonClicked = () => {
    if (this.removeUserTownId === null) {
      return;
    }

    removeMyTown(this.removeUserTownId)
      .then((data) => {
        if (data.status) {
          createToast('1개 이하의 동네를 설정할 수 없습니다');
        } else {
          this.fetchUserTowns();
        }
      })
      .finally(() => {
        this.removeTownModal.close();
        this.removeUserTownId = null;
      });
  }

  onAddTownInputChanged(e: Event) {
    const inputText = (<HTMLInputElement>convertElementTarget(e.target)).value;
    ($('#Add-Town-Button').get() as HTMLButtonElement).disabled = !(inputText.trim().length > 0);
  }

  goBack() {
    redux.router.goRouter()
  }

  methods() {
    $('.PlusTownItem').get()?.removeEventListener('click', this.onOpenAddButtonClicked);
    $('.Town-List').get()?.removeEventListener('click', this.onTownListClicked);
    $('#Add-Town-Input').get()?.removeEventListener('keyup', this.onAddTownInputChanged);
    $('#Close-Add-Town-Modal').get()?.removeEventListener('click', this.onCloseAddButtonClicked);
    $('#Close-Remove-Town-Modal').get()?.removeEventListener('click', this.onCloseRemoveButtonClicked);
    $('#Add-Town-Button').get()?.removeEventListener('click', this.onAddButtonClicked);

    $('.PlusTownItem').on('click', this.onOpenAddButtonClicked);
    $('.Town-List').on('click', this.onTownListClicked);
    $('#Add-Town-Input').on('keyup', this.onAddTownInputChanged);
    $('#Close-Add-Town-Modal').on('click', this.onCloseAddButtonClicked);
    $('#Close-Remove-Town-Modal').on('click', this.onCloseRemoveButtonClicked);
    $('#Add-Town-Button').on('click', this.onAddButtonClicked);
    $('#Town-Go-Back').on("click", this.goBack)
  }

  fetchUserTowns() {
    fetchMyTowns()
      .then(data => {
        const { userTowns } = data.data;
        this.userTowns = userTowns;
        this.componentWillMount();
      })
  }

  componentWillMount() {
    const $townList = $('.Town-List').get();
    if ($townList === null) {
      return;
    }

    // BaseResponse 개발 시 제거
    $townList.innerHTML = '';
    this.userTowns.forEach((userTown: UserTownTypes) => {
      new UserTownItem($townList, userTown);
    });
    new PlusTownItem($townList);

    this.methods();
  }

  render() {
    this.$outer.innerHTML = `
      <div id="Town-Inner">
        <header class="Town-Header">
          <div id="Town-Go-Back" >${LeftArrow}</div>
          <h4>내 동네 설정하기</h4>
          <div></div>
        </header>
        <div class="Town-Description">
          <p>지역은 최소 1개 이상<br>최대 2개까지 설정가능해요.</p>
        </div>
        <div class="Town-List">
        </div>
      </div>
    `

    this.fetchUserTowns();
  }

  css() {
    return ``
  }

}