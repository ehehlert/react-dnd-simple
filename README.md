1. **Create a new vite app**
   
   ```bash
   $ npm create vite@latest
   ```
   
   Followed by `npm install`

2. **Delete all of the boilerplate and set up components file**
   
   Remove everything except for main.jsx and App.jsx, and clear out everything but return statement in App.jsx. (You may need to remove certain lines from main.jsx related to index.css as well). Next, create a folder called 'components' within src.

3. **Create a box component (drag)**
   
   Create a new file Box.jsx in the components folder
   
   ```jsx
   export default function Box() {
     return (
       <div
         style={{
           border: "1px solid gray",
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
           color: "blue",
         }}
       >
         DRAG ME
       </div>
     );
   }
   ```

4. **Create a dustbin component (drop)**
   
   Create a new file Dustbin.jsx in the components folder
   
   ```jsx
   export default function Dustbin() {
     return (
       <div
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
           color: "red",
         }}
       >
         DROP HERE
       </div>
     );
   }
   ```

5. **Render them next to each other on the screen**
   
   In App.jsx, import and render the two components, and modify the style property of the enclosing div to utilize flexbox
   
   ```jsx
   import Box from "./components/Box";
   import Dustbin from "./components/Dustbin";
   
   function App() {
     return (
       <div style={{ display: "flex" }}>
         <Box />
         <Dustbin />
       </div>
     );
   }
   
   export default App;
   ```

6. **Install react-dnd and react-dnd-html5-backend**
   
   react-dnd handles the dragging and dropping logic and state management, html5-backend handles the browser interaction
   
   ```bash
   $ npm install react-dnd react-dnd-html5-backend
   ```

7. **Set up the Drag and Drop context**
   
   In App.jsx (or wherever you need to utilize Drag and Drop) import DndProvider and HTML5Backend, and wrap the necessary components in the `<DnDProvider>` tags with `backend` prop set to `HTML5Backend`. This is called 'setting up the context'.
   
   ```jsx
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
   ```

8. **Define the Drag Types**
   
   Create a new file 'Constants.js' and add the following:
   
   ```js
   export const ItemTypes = {
       BOX: 'box'
   }
   ```
   
   In this case, there is only one ('BOX'), but this is useful if there are various types of draggable items in an application and you only want certain drop zones to accept certain types.

9. **Make the box draggable**
   
   Modify the Box.jsx component like so:
   
   ```jsx
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
   ```
   
   The main things to look at:
   
   - Imported ItemTypes from Constants.js and useDrag hook from react-dnd
   
   - Added the useDrag hook to the top of the component
     
     - The important part is to specify the type, referencing ItemTypes. The rest is react-dnd boilerplate.
   
   - Added the `ref={drag}` property to the box's `div` component. It doesn't work without this. 
   
   - Added some conditional css to change the appearance of the box while it's being dragged, referencing the `isDragging` prop from the useDrag hook.

10. **Make the dustbin droppable**
    
    Modify the Dustbin.jsx component like so:
    
    ```jsx
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
    ```
    
    The main things to look at:
    
    - Imported ItemTypes from Constants.js and useDrop hook from react-dnd
    
    - Added the useDrop hook to the top of the component
      
      - The first important part is to specify the `accept` property, which references ItemTypes. Only draggable elements of the specified type(s) are accepted.
      - The second important part is the `drop` property, which is where you define the function that should be executed upon accepted drop (in this case, a simple alert).
      - The third important part is the dependency array (line 14). This array is intended to list all the dependencies of the hook — that is, the variables or values that, if changed, should cause the hook to re-run or re-evaluate its logic.
    
    - Added the `ref={drop}` property to the dustbin's `div` component. It doesn't work without this.
    
    - Added some conditional css to change the appearance of the dustbin while it's being hovered over with the dragged object, referencing the `isOver` prop from the useDrop hook.

11. ```jsx
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
    ```



## Understanding the useDrag Hook

When the useDrag hook is called at the top of a component, it returns an array. 

- The first element in the array is an object containing the `isDragging` state, among various other state flags (hence the need for the `{}` to unpack it), which will be `true` when the element is currently being dragged, and `false` otherwise.

- The second element in the array, `drag`, is a connector function used to assign the drag source role to a DOM element

Using array destructuring, we unpack each of those elements into the variables `isDragging` and `drag` respectively.

```jsx
const [{ isDragging }, drag] = useDrag(...)
```

The argument that is passed into useDrag is a **configuration object**, or, more accurately, a function that returns a configuration object. Important point about this hook, and about hooks in general: *Exactly when and how a hook's arguments are used is determiend by the internal logic of the hook.*

The configuration object contains two properties:

- `type`: This specifies the type of the draggable item covered by this hook. It should reference an `ItemTypes` object, usually stored in a `Constants.js` file somewhere else in the app directory.

- `collect`: This is a function that defines and exposes properties from the useDrop hook for use in our components. It receives an instance of `DragSourceMonitor` as its argument, usually written as `monitor`, and returns an object. The properties of this object are up to us, and should represent the state or functions we need from the drag-and-drop operation.
  
  - In my case, I want to get the drag state, supplied by the `DragSourceMonitor`, and add it as a property called `isDragging`. This `isDragging` property can be accessed elsewhere to modify styling and/or behavior. (The `!!` just forces a Boolean result and could maybe be ommitted)

```jsx
const [{ isDragging }, drag] = useDrag(() => ({
  type: ItemTypes.BOX,
  collect: monitor => ({
    isDragging: !!monitor.isDragging(),
  }),
}));
```

Finally, remember that in order to fully link the drag functionality to the DOM element, a `ref={drag}` property must be placed in the appropriate location. Otherwise it will not work!
