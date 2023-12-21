import PROJECT_CONFIG from './project.config.js'

const {
  images: { optimizationLevel }
} = PROJECT_CONFIG

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
