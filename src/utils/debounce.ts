/* eslint-disable */
export default function debounce<T extends Function>(
  func: T,
  wait: number,
  immediate: boolean = false,
): T {
  let timeout: ReturnType<typeof setTimeout> | null;
  const fn = function() {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
  return fn as any;
}
