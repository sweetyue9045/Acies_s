const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

export function preventDefault(e) {
  e.preventDefault();
}

export function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

export function supportsPassive() {
  let supports = false;
  try {
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get: () => (supports = true),
      })
    );
  } catch (e) { }
  return supports;
}

const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
const wheelOpt = supportsPassive ? { passive: false } : false;

export function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

export function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}