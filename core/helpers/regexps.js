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

const HTML_EXTENSION = '.html'
const PUG_EXTENSION = '.pug'
const SPLIT_CHARS = '(?:_|__|-|\\s)'
const REGEXPS = {
  HTML_EXTENSION,
  PUG_EXTENSION,
  FILE_EXTENSION: new RegExp('.[^.]+$'),
  ITALIC_REGEX: new RegExp(`${SPLIT_CHARS}?(italic)`, 'i'),
  JS_EXTENSION_REGEX: new RegExp('.js$'),
  NODE_MODULES_REGEX: new RegExp('node_modules'),
  PUG_EXTENSION_REGEX: new RegExp(`${PUG_EXTENSION}$`),
  SCSS_EXTENSION_REGEX: new RegExp('.s[ac]ss$'),
  VARIABLE_FONT_REGEX: new RegExp(`${SPLIT_CHARS}?(var)`, 'i')
}

export default REGEXPS
