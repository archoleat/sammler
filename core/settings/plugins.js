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

import { argv } from 'node:process'
import { join } from 'path'

import { deleteAsync } from 'del'
import { onError } from 'gulp-notify'

import autoPrefixer from 'gulp-autoprefixer'
import chalk from 'chalk'
import cleanCss from 'gulp-clean-css'
import CopyPlugin from 'copy-webpack-plugin'
import cssComb from 'gulp-csscomb'
import fonter from 'gulp-fonter-fix'
import fs from 'fs'
import groupCssMediaQueries from 'gulp-group-css-media-queries'
import gulp from 'gulp'
import htmlMin from 'gulp-htmlmin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ifPlugin from 'gulp-if'
import imageMin from 'gulp-imagemin'
import newer from 'gulp-newer'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import svgSprite from 'gulp-svg-sprite'
import TerserPlugin from 'terser-webpack-plugin'
import ttf2woff2 from 'gulp-ttf2woff2'
import typograf from 'gulp-typograf'
import versionNumber from 'gulp-version-number'
import webp from 'gulp-webp'
import webpack from 'webpack-stream'
import webpCss from 'gulp-webpcss'
import webpHtmlNoSvg from 'gulp-webp-html-nosvg'
import zipPlugin from 'gulp-zip'

const PLUGINS = {
  argv,
  autoPrefixer,
  chalk,
  cleanCss,
  CopyPlugin,
  cssComb,
  deleteAsync,
  fonter,
  fs,
  groupCssMediaQueries,
  gulp,
  htmlMin,
  HtmlWebpackPlugin,
  imageMin,
  join,
  newer,
  onError,
  plumber,
  rename,
  svgSprite,
  TerserPlugin,
  ttf2woff2,
  typograf,
  versionNumber,
  webp,
  webpack,
  webpCss,
  webpHtmlNoSvg,
  zipPlugin,
  when: ifPlugin,
}

export default PLUGINS
