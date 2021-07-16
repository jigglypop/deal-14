import './index.css';

export default () => {
  return `
    <div class="Town-Add-Modal-Content">
      <span class="Town-Add-Modal-Desc">현재 위치를 입력하세요</span>
      <input type="text" placeholder="시.구 제외, 동만 입력" id="Add-Town-Input"/>
      <div class="Town-Add-Button-Wrapper">
        <button id="Close-Add-Town-Modal">취소</button>
        <button id="Add-Town-Button" disabled>확인</button>
      </div>
    </div>
  `
}