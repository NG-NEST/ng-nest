/**
 * @zh_CN ��ʱ����
 * @en_US Delayed sleep
 */
export function XSleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
