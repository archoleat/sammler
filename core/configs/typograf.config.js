import projectConfig from './project.config.js'

const { language } = projectConfig

const typografConfig = {
  locale: language ?? 'en-US' === 'ru' ? ['ru', 'en-US'] : ['en-US'],
  enableRule: [
    'common/html/e-mail',
    'common/html/p',
    'common/html/processingAttrs',
    'common/html/url',
    'common/other/repeatWord',
    'common/other/replaceNbsp',
    'common/space/delLeadingBlanks',
    'ru/dash/de',
    'ru/money/ruble',
    'ru/optalign/bracket',
    'ru/optalign/comma',
    'ru/optalign/quote',
    'ru/other/accent'
  ]
}

export default typografConfig
