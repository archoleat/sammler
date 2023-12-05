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

import PLUGINS from '../settings/plugins.js'

import projectConfig from '../configs/project.config.js'

import FormatterMessage from '../formatters/FormatterMessage.js'

const {
  notifier: { isNotify, sound }
} = projectConfig
const { onError, plumber } = PLUGINS

class Notifier extends FormatterMessage {
  #SEVERITY_LEVELS = {
    WARNING: 1,
    ERROR: 2
  }

  constructor(isEnabled = true) {
    super(isEnabled)
  }

  errorHandler = (taskName) => {
    return plumber({
      errorHandler: onError({
        title: `Error: ${taskName}`,
        message: 'Error: <%= error.message %>',
        sound: sound ?? 'Pop'
      })
    })
  }

  success = (taskName, options) => {
    return this.message(taskName, options)
  }

  warning = (taskName, options) => {
    return this.message(taskName, options, this.#SEVERITY_LEVELS.WARNING)
  }

  error = (taskName, options) => {
    return this.message(taskName, options, this.#SEVERITY_LEVELS.ERROR)
  }
}

const notifier = new Notifier(isNotify ?? true)

export default notifier
