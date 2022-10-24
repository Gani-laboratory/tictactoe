function Square(props) {
  return (
    <button
      className={`bg-white border border-solid border-[#999] float-left text-[24px] font-bold leading-[34px] h-[34px] w-[34px] mr-[-1] mt-[-1] p-0 text-center focus:outline-none${props.winner ? " bg-green-300" : ""}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
