import './index.css';

export default class Modal {
  private $modal: HTMLElement;
  private $modalContent: HTMLElement;

  constructor($target: HTMLElement, inner: string) {
    const $modal = document.createElement('div');
    $modal.className = 'Modal-Container disappear';

    const $modalContent = document.createElement('div');
    $modalContent.className = "Modal";
    $modalContent.innerHTML = inner;

    $modal.appendChild($modalContent);
    $target.appendChild($modal);

    this.$modal = $modal;
    this.$modalContent = $modalContent;
  }

  setInner(inner: string) {
    this.$modalContent.innerHTML = inner;
  }

  open() {
    this.$modal.classList.replace('disappear', 'appear');
  }

  close() {
    this.$modal.classList.replace('appear', 'disappear');
  }

}