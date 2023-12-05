import projectConfig from './project.config.js'

const {
  images: { optimizationLevel }
} = projectConfig

const imageMinConfig = {
  optimizationLevel: optimizationLevel ?? 3,
  interlaced: true,
  svgoPlugins: [
    {
      removeViewBox: false
    }
  ]
}

export default imageMinConfig
