import PATHS from '../settings/paths.js'

import SVGOConfig from './SVGO.config.js'

const { spriteFile } = PATHS

const SVGSpriteConfig = {
  mode: {
    symbol: {
      sprite: spriteFile
    }
  },
  shape: {
    transform: [
      {
        svgo: SVGOConfig
      }
    ]
  },
  svg: {
    xmlDeclaration: false,
    rootAttributes: {
      style: 'display: none;',
      role: 'img',
      'aria-hidden': true
    }
  }
}

export default SVGSpriteConfig
