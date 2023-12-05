////////////////////////////////////////////////////////////////////////////
//
// Copyright 2023 nikkeyl.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

import PLUGINS from '../../settings/plugins.js'

import webpackConfig from '../../webpack/webpack.prod.js'

import outputConfig from '../../configs/output.config.js'
import projectConfig from '../../configs/project.config.js'

import formatterJS from '../../formatters/formatterJS.js'

const { entry } = projectConfig
const { TerserPlugin } = PLUGINS

const webPackBeautifyConfig = Object.assign({}, webpackConfig)

webPackBeautifyConfig.optimization = {
  minimizer: [
    new TerserPlugin({
      extractComments: false,
      terserOptions: {
        compress: {
          defaults: false,
          unused: true
        },
        format: {
          beautify: true
        },
        keep_classnames: true,
        keep_fnames: true,
        mangle: false
      }
    })
  ]
}
webPackBeautifyConfig.output = outputConfig(`${entry ?? 'main'}.js`)

const JSDevHandler = () => {
  return formatterJS('JSDevHandler', webPackBeautifyConfig)
}

export default JSDevHandler
