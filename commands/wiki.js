const wiki = require('wikipediajs')
const Markup = require('telegraf/markup')
const memoize = require('memoizee')

/* maxAge = one week (7 days)
 * 3600 * 1000 = one hour in miliseconds
 * a day has 24 hours
 * and a week has 7 days
 * which gives 3600 * 100 * 24 * 7
 * to get 1 week of caching
 */
const maxAge = 3600 * 1000 * 24 * 7

const _searchWiki = async word => {
  return wiki.search(word, 'es')
}

const searchWiki = memoize(_searchWiki, { promise: true, maxAge })

const executeCommand = async ctx => {
  const {
    message: { text }
  } = ctx
  const word = text.substr(text.indexOf(' '))
  let pages
  try {
    const { query } = await searchWiki(word)
    pages = query.pages
  } catch (error) {
    ctx.reply(
      'oops..Ha habido un error buscando la información. Por favor intenta en unos minutos'
    )
    throw error
  }
  if (!pages) return ctx.reply('no hay resultados para esa búsqueda')

  const keys = Object.keys(pages)
  if (keys.length === 1) {
    ctx.reply(pages[keys[0]].fullurl)
  } else if (keys.length > 1) {
    const buttons = keys.map(key => {
      const data = `wiki:${pages[key].title.replace(/\s/g, '_')}`
      const text = pages[key].title
      return [Markup.callbackButton(text, data)]
    })
    const keyboard = Markup.inlineKeyboard(buttons)
    ctx.reply('encontre varios, cual de estos?', keyboard.resize().extra())
  }
}

const getWikiArticles = bot => {
  bot.command('wiki', executeCommand)

  bot.action(/wiki:([a-zA-Z0-9_.()áéíóú]+)/gi, async ctx => {
    const article = ctx.match[1]
    try {
      await ctx.deleteMessage()
    } catch (error) {
      console.log('error deleting wiki artcile message')
    }
    await ctx.reply(`https://es.wikipedia.org/wiki/${article}`)
  })
}

module.exports = {
  getWikiArticles
}
