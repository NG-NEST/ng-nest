/**
 * @zh_CN 延迟时间
 * @en_US Delayed sleep
 */
export function XSleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
