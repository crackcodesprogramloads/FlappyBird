export default function Bird(props) {
  return (
    <div
      className="bird"
      style={{
        width: `${props.size}px`,
        height: `${props.size}px`,
        top: `${props.top}px`,
        left: `${props.left}px`,
      }}
    ></div>
  );
}
