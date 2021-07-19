import CloseButton from '../../../svgicon/CloseButton';
import { UserTownTypes } from '../../../types/userTown';
import React from '../../../util/react';

import './index.css';

export default class UserTownItem extends React {
  private userTown: UserTownTypes;

  constructor($target: HTMLElement, userTown: UserTownTypes) {
    super($target, 'UserTownItem');
    this.userTown = userTown;
    this.render();
  }

  render() {
    this.$outer.innerHTML = `
      <div class="Town-Item Town-Info" data-user-town-id="${this.userTown.id}">
        <span class="Town-Item-Name">${this.userTown.town.townName}</span>
        ${CloseButton}
      </div>
    `
  }
  css() {
    return ``
  }

  methods() {}
}