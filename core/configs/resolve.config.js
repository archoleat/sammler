import PATHS from '../settings/paths.js'
import PLUGINS from '../settings/plugins.js'

const { SCRIPTS_FOLDER, SRC_FOLDER } = PATHS
const { join } = PLUGINS

const resolveConfig = {
  alias: {
    '@js': join(SRC_FOLDER, SCRIPTS_FOLDER),
    '@scss': join(SRC_FOLDER, 'scss')
  },
  extensions: ['.js', '.scss']
}

export default resolveConfig
