export function toggleClass(element: HTMLElement, className: string): void {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}
