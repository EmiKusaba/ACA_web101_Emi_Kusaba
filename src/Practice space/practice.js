let previousGamePiece = null
function addGamePiece(selectedElement) {
  //create new element
  let newElement = document.createElement('h1')
  if (previousGamePiece === 'x') {
    // add text to element
    newElement.innerHTML = 'o'
    // set previousGamePiece
    previousGamePiece = 'o'
  } else {
    // add text to element
    newElement.innerHTML = 'x'
    // set previousGamePiece
    previousGamePiece = 'x'
  }
  // add element with text to selectedElement on page
  selectedElement.appendChild(newElement)
  console.log('show clicked div', selectedElement)
}