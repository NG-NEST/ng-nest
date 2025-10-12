/**
 * @zh_CN 将字节大小转换为人类可读的文件大小格式
 * @en_US Convert byte size to a human-readable file size format
 * @param bytes - 文件大小的字节数，可以是数字或字符串类型
 * @param options - 配置选项对象
 * @param options.precision - 转换后数值的小数位数，默认为2位
 * @returns 格式化后的文件大小字符串，如 "1.25 MB"，如果输入无效则返回 "Invalid size"
 */
export function XFileSize(
  bytes: number | string,
  options: {
    precision?: number;
  } = {}
) {
  const { precision = 2 } = options;

  const byteUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

  if (!bytes || bytes === 0) {
    return `0 ${'B'}`;
  }

  const bytesValue = typeof bytes === 'string' ? parseFloat(bytes) : bytes;

  if (isNaN(bytesValue) || bytesValue < 0) {
    return 'Invalid size';
  }

  const value = bytesValue;
  const base = 1024;
  const units = byteUnits;
  const i = Math.floor(Math.log(value) / Math.log(base));
  const unitIndex = Math.min(Math.max(i, 0), units.length - 1);
  const formattedValue = (value / Math.pow(base, unitIndex)).toFixed(precision);
  const cleanValue = parseFloat(formattedValue).toString();

  return `${cleanValue} ${units[unitIndex]}`;
}
