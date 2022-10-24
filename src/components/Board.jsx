import Square from "./Square";

function Board(props) {
  let rows = Array.from(Array(3));
  rows = rows.map((_, x) => {
    const square = Array.from(Array(3));
    return (
      <div className="after:clear-both after:table">
        {square.map((_, y) => {
          const index = 3 * x + y;
          return <Square value={props.squares[index]} onClick={() => props.onClick(index)} winner={props.winner && props.winner.includes(index)} />;
        })}
      </div>
    );
  });

  return <div>{rows}</div>;
}

export default Board;
