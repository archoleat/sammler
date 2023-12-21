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

import { resolve } from 'path'

const PROJECT_CONFIG = {
  entry: 'main',
  isBabel: true,
  language: 'en-US',
  cache: {
    location: '.cache',
    settings: {
      type: 'filesystem',
      cacheDirectory: resolve('.cache'),
      // compression
      // idletimeout
      // maxAge: 86400000
      // memoryCacheUnaffected
      // store: 'pack',
    }
  },
  formatters: {
    isTypography: true,
    languages: {
      isPugPretty: true,
      sassOutputStyle: 'expanded'
    }
  },
  html: {
    hasScriptInHead: true,
    isMinify: false,
    meta: {
      description: 'Description of the page less than 150 characters',
      hasDirection: false
    },
    version: {
      assets: [],
      format: '%DT%'
    }
  },
  images: {
    extensions: ['gif'],
    isWebp: true,
    optimizationLevel: 3,
    spriteFileName: 'sprite'
  },
  notifier: {
    isNotify: true,
    sound: 'Pop'
  },
  server: {
    port: 3000,
    publicFolder: 'dist',
    publicPath: '/',
    sourceMapType: 'inline-source-map',
    stats: 'errors-warnings',
    watchFiles: []
  },
  removes: ['*.md']
}

// two files: .min.css и .css

export default PROJECT_CONFIG
