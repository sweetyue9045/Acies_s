// 滾動事件的按鍵代碼
const SCROLL_KEYS = { 37: true, 38: true, 39: true, 40: true };

// 預防預設行為的工具函數
function preventDefault(e) {
  e.preventDefault();
}

// 針對滾動按鍵的預防預設行為
function preventDefaultForScrollKeys(e) {
  if (SCROLL_KEYS[e.keyCode]) {
    preventDefault(e);
  }
}

// 檢測是否支持 passive 事件監聽器
function supportsPassive() {
  let isSupported = false;
  try {
    const options = Object.defineProperty({}, 'passive', {
      get: () => (isSupported = true)
    });
    window.addEventListener('test', null, options);
  } catch (e) { }
  return isSupported;
}

// 確定適當的滾輪事件及選項
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
const wheelOptions = supportsPassive() ? { passive: false } : false;

// 禁用滾動功能
export function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // 舊版 Firefox
  window.addEventListener(wheelEvent, preventDefault, wheelOptions); // 現代瀏覽器
  window.addEventListener('touchmove', preventDefault, wheelOptions); // 手機設備
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// 啟用滾動功能
export function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOptions);
  window.removeEventListener('touchmove', preventDefault, wheelOptions);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
