import Square from "./Square"

function Board(props) {
  let rows = Array.from(Array(3))
    rows = rows.map((v,i) => {
      const square = Array.from(Array(3))
      return (
        <div className='board-row'>
          {
            square.map((x,y) => {
              const index = 3*i+y
              return <Square value={props.squares[index]} onClick={()=>props.onClick(index)} winner={props.winner && props.winner.includes(index)} />
            })
          }
        </div>
      )
    })

  return (
    <div>
      {rows}
    </div>
  )
}

export default Board