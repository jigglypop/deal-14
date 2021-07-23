import { redux } from '..';
import { TownTypes } from '../types/town';
import cache from '../util/cache';

export default function () {
  let currentTown: TownTypes | null = null;

  return {
    setCurrentTown(town: TownTypes | null) {
      currentTown = town;
      if (town !== null) {
        cache.set('town', town);
      } else {
        cache.remove('town');
      }

      redux.instance.getInstance('header')?.init();
      redux.instance.getInstance('categorycontainer')?.init();
      redux.instance.getInstance('products')?.init();
      redux.instance.getInstance('writecontainer')?.init();
      redux.instance.getInstance('categorypage')?.init();
    },
    getCurrentTown() {
      return currentTown;
    },
    clear() {
      this.setCurrentTown(null);
    }
  }
}