export default function getCookieByName(name: string) {
  if (typeof document === 'undefined') return
  const cname = name + '='
  const cDecoded = decodeURIComponent(document.cookie) //to be careful
  const cArr = cDecoded.split('; ')
  let res
  cArr.forEach((val) => {
    if (val.indexOf(cname) === 0) res = val.substring(cname.length)
  })
  return res
}
