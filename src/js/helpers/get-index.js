const getIndex = (el) => {
  return Array.from(el.parentNode.children).indexOf(el)
}

export { getIndex }
