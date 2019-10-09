//find location of click and add x or o
//dertermine player1 or 2
//keep scare
//find a winner via 3 in a row
// 
console.log('hey tic here')

function addGamePiece(selectedElement) {
  
  //create new element
  let newElement = document.createElement('h1')
  //add text to element
  newElement.innerHTML = 'x'
  
  //add element with text to selentedElement on page
  selectedElement.appendChild(newElement)
  console.log('show clicked div', selectedElement)

}
//if statement
if (player ='x'){
  newElement.innerHTML = 'o'
} else {
  newElement.innerHTML ='x'
}
