import projectConfig from './project.config.js'

const {
  html: { isMinify }
} = projectConfig

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
