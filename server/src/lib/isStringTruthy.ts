export default function isStringTruthy (str: string | null | undefined) {
  if (!str) {
    return false;
  }

  str = str.toLowerCase().trim();

  return (
    str === '1' ||
    str === 'true' ||
    str === 't'
  )
}
