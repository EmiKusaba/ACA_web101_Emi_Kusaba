function initCubicBezier(el) {
  console.log('document', document.querySelector('.timing-component-track'))
  console.log('el', el)
  console.log('el.parentElement', el.parentElement)
  let parentWidth = el.parentElement.clientWidth
  console.log('parentWidth', parentWidth)
  let childWidth = el.clientWidth
  console.log('childWidth', childWidth)
  el.classList.toggle('active')
  let marginLeft = el.style.marginLeft = ((parentWidth - childWidth) - 12) + 'px'; 
}