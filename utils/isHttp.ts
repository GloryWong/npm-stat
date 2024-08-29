export function isHttp(str: string) {
  return /^https?:\/\/.+/.test(str)
}
