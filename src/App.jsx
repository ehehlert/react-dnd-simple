import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Box from "./components/Box";
import Dustbin from "./components/Dustbin";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <Box />
        <Dustbin />
      </div>
    </DndProvider>
  );
}

export default App;
