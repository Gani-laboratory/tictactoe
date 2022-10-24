// tentukan bilangan genap % 1
// x%2+(y*2)*2 utk index 6
// (x-1)%2+(y+1)*2 utk index 7

const line = Array(3).fill(null)
const lines = Array(8).fill(null)
const test = lines.map((_, x) => {
  return line.map((_, y) => {
    if (x < 3) {
      return 3*x+y
    } else if (x < 6) {
      if (x !== 3) {
        return (3*y)+(x === 4 ? 1 : 2)
      }
      return 3*y
    } else if (x < 7) {
      return x%2+(y*2)*2
    }
    return (x-1)%2+(y+1)*2
  })
})

console.log(test);

// example result:
// [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6]
// ]