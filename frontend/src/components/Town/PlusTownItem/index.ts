import PlusButton from '../../../svgicon/PlusButton';
import React from '../../../util/react';

import './index.css';

export default class PlusTownItem extends React {
  constructor($target: HTMLElement) {
    super($target, 'PlusTownItem');
    this.render();
  }

  render() {
    this.$outer.innerHTML = `
    <div class="Town-Item PlusTownItem">
      ${PlusButton}
    </div>
    `
  }
  css() {
    return ``
  }

  methods() {}
}