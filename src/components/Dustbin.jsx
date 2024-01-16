import { ItemTypes } from "./Constants";
import { useDrop } from "react-dnd";

export default function Dustbin() {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: () => alert("dropped!"),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    // dependency array
    []
  );

  return (
    <div
      ref={drop}
      style={{
        border: "1px dashed gray",
        backgroundColor: "lightgray",
        padding: "1rem",
        marginRight: "0.5rem",
        marginBottom: "0.5rem",
        width: "150px",
        height: "150px",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        color: isOver ? "yellow" : "red",
      }}
    >
      DROP HERE
    </div>
  );
}
