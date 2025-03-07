type ThrottleFuction<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

export const throttle = <T extends (...args: any[]) => void>(func: T, limit: number): ThrottleFuction<T> => {
  let lastFunc: number | undefined;
  let lastRan: number | undefined;

  return (...args: Parameters<T>) => {
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