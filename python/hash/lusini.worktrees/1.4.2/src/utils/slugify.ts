import transform from 'slugify'
import config from 'config'

export default (s: string): string =>
  s
    .split(' > ')
    .map((s) =>
      transform(s, {
        replacement: '-', // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: config.slugifyLocale, // language code of the locale to use
      })
    )
    .join('/') + '/'

export const slugifyWithSlashes = (s: string) =>
  s
    .split('/')
    .map((s) =>
      transform(s, {
        replacement: '-', // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: config.slugifyLocale, // language code of the locale to use
      })
    )
    .join('/')
