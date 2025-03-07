export const throttle = <A extends unknown[], R>(
  func: (...args: A) => R,
  limit: number
): ((...args: A) => void) => {
  let lastFunc: ReturnType<typeof setTimeout> | undefined;
  let lastRan: number | undefined;

  return (...args: A) => {
    if(!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      if(lastFunc) {
        clearTimeout(lastFunc);
      }
      lastFunc = setTimeout(() => {
        if(lastRan !== undefined && (Date.now() - lastRan) >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan!));
    }
  }
}