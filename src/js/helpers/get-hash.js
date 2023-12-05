const getHash = () => {
  return location.hash?.replace('#', '')
}

export { getHash }
