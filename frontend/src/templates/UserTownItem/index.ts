import CloseButton from '../../svgicon/CloseButton';
import { UserTownTypes } from '../../types/userTown';

import './index.css'

export default (userTown: UserTownTypes) => {
  return `
  <div class="Town-Item Town-Info" data-user-town-id="${userTown.id}">
    <span class="Town-Item-Name">${userTown.town.townName}</span>
    ${CloseButton}
  </div>
  `
}