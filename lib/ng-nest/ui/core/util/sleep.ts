/**
 * @zh_CN ÑÓÊ±ÐÝÃß
 * @en_US Delayed sleep
 */
export function XSleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
