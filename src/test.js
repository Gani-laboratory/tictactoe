const line = Array(3).fill(null)
const lines = Array(8).fill(null)
const test = lines.map((_, x) => {
  return line.map((_, y) => {
    if (x < 3) {
      return 3*x+y
    } else if (x < 6) {
      return 3*y+x
    }
    return x%3*y
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