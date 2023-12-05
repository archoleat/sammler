const babelConfig = (api) => {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env'
    ]
  ]

  return { presets }
}

export default babelConfig
