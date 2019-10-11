// console.log('Thisisjquery',$)
// click button add todo list item

function addItem(){
  //get input
  let input = $('input')
  console.log('input',input)
//get value of input
let inputVal = input.val()
console.log('inputVal',inputVal)
//add value to list of item
let list = $('.todo-list')
// create element to appent to list
let listItem = $("<li>Hi</li>")
//add inputVal to ListItem

let listItemVal = listItem.text(inputVal)

//add list Item to List
list.append(listItemVal)
// clear input
input.val('')
}
