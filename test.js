function numberOfItems(arr, item) {
  const flatedArr = arr
  console.log(flatedArr)
  const filteredItem = flatedArr.filter((value) => value === item).length
  console.log(filteredItem)
}

var arr = [25, 'apple', ['banana', 'strawberry', 'apple', 25]]
console.log(numberOfItems(arr, 25))
console.log(numberOfItems(arr, 'apple'))
