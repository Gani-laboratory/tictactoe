import Square from "./Square"

function Board(props) {
  let rows = Array.from(Array(3))
    rows = rows.map((v,i) => {
      let square = Array.from(Array(3))
      return (
        <div className='board-row'>
          {
            square.map((x,y) => {
              return <Square value={props.squares[3*i+y]} onClick={()=>props.onClick(3*i+y)} />
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