import PROJECT_CONFIG from './project.config.js'

const {
  html: { isMinify }
} = PROJECT_CONFIG

const HTMLMinConfig = {
  collapseBooleanAttributes: true,
  collapseWhitespace: isMinify ?? false,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
}

export default HTMLMinConfig
