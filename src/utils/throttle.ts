type ThrottleFuction = (...args: any[]) => void;

export const throttle = (func: ThrottleFuction, limit: number): ThrottleFuction => {
  let lastFunc: number | undefined;
  let lastRan: number | undefined;

  return (...args: any[]) => {
    if(!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      if(lastFunc) {
        clearTimeout(lastFunc);
      }
      lastFunc = window.setTimeout(() => {
        if(lastRan !== undefined && (Date.now() - lastRan) >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan!));
    }
  }
}