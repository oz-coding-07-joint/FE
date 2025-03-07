type ThrottleFunction<T extends (...args: unknown[]) => void> = (...args: Parameters<T>) => void;

export const throttle = <T extends (...args: unknown[]) => void>(func: T, limit: number): ThrottleFunction<T> => {
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