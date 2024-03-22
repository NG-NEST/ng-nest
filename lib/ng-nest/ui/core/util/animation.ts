// tslint:disable:no-any typedef no-invalid-this
const availablePrefixes = ['moz', 'ms', 'webkit'];

function requestAnimationFramePolyfill(): typeof requestAnimationFrame {
  let lastTime = 0;
  return function (callback: FrameRequestCallback): any {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

function getRequestAnimationFrame(): typeof requestAnimationFrame {
  if (typeof window === 'undefined') {
    return () => 0;
  }
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame.bind(window);
  }

  const prefix = availablePrefixes.filter((key) => `${key}RequestAnimationFrame` in window)[0];

  return prefix ? (window as any)[`${prefix}RequestAnimationFrame`] : requestAnimationFramePolyfill();
}

export const reqAnimFrame = getRequestAnimationFrame();
