export default <T extends HTMLElement>(target: EventTarget | null): T => {
  return target as T;
}