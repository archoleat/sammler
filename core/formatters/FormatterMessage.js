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

import typeChecker from '../helpers/typeChecker.js'

const {
  chalk: { blueBright, gray, magenta, yellow, green, red }
} = PLUGINS

class FormatterMessage {
  constructor(isEnabled) {
    this.isEnabled = isEnabled
  }

  #formatter = (scriptName, path, message) => {
    const MAX_MESSAGE_LENGTH = 85

    let messageTemplate

    if (typeof message === 'boolean') {
      messageTemplate = `File already exists, run 'npm run ${scriptName} --update'`
    }

    const messageResult =
      message.length > MAX_MESSAGE_LENGTH
        ? `The message must be no longer than ${MAX_MESSAGE_LENGTH} characters`
        : messageTemplate ?? message

    return `\n${magenta.bold('Source:')} ${gray.underline(path)}\n${blueBright.bold(
      'Message:'
    )} ${gray(messageResult)}`
  }

  message = (
    taskName,
    {
      scriptName = '',
      path = 'Please add file path',
      message = 'Please add message'
    } = {},
    severityLevel = 0
  ) => {
    if (!this.isEnabled) {
      return
    }

    if (!taskName) {
      return console.warn(yellow.bold('WARNING: Please add a task name'))
    }

    typeChecker(path, 'path', 'string')

    const info = this.#formatter(scriptName, path, message)

    switch (severityLevel) {
      case 0:
        console.info(`${green.bold('SUCCESS:')} '${taskName}' ${info}`)
        break
      case 1:
        console.warn(`${yellow.bold('WARNING:')} '${taskName}' ${info}`)
        break
      default:
        console.error(`${red.bold('ERROR:')} '${taskName}' ${info}`)
        break
    }
  }
}

export default FormatterMessage
