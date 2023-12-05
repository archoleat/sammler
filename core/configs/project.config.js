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

const projectConfig = {
  entry: 'main',
  isBabel: true,
  language: 'en-US',
  cache: {
    location: '.cache',
    settings: {
      type: 'filesystem'
    }
  },
  formatters: {
    languages: {
      isPugPretty: true,
      sassOutputStyle: 'expanded'
    }
  },
  html: {
    accessibilityLevel: 'WCAG2AAA',
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

// typograf
// two files: .min.css и .css

export default projectConfig
