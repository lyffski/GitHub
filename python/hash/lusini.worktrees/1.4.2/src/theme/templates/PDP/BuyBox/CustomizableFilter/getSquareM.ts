export default function getSquareM(form, size): number {
  let SquareM = 1
  if (form === 'square' || form === 'round') {
    SquareM = size.width * size.width
  } else if (form === 'rectangular' || form === 'oval') {
    SquareM = size.width * size.length
  }

  return SquareM / 10000
}
