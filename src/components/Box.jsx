import { ItemTypes } from "./Constants";
import { useDrag } from "react-dnd";

export default function Box() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        border: isDragging ? "1px dashed gray" : "1px solid gray",
        backgroundColor: "lightblue",
        padding: "1rem",
        marginRight: "0.5rem",
        marginBottom: "0.5rem",
        width: "100px",
        height: "100px",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        color: isDragging ? "red" : "blue",
      }}
    >
      {isDragging ? "IM BEING DRAGGED" : "DRAG ME"}
    </div>
  );
}
