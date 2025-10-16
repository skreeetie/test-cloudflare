import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  useAddMatchGameMutation,
  useDeleteMatchGameMutation,
  useGetMatchGamesQuery,
  useUpdateMatchGameMutation,
} from "./shared/api/matchGamesApi";

function App() {
  const [count, setCount] = useState(0);
  const { data: matchGamesList = [] } = useGetMatchGamesQuery();
  const [addNewGame] = useAddMatchGameMutation();
  const [deleteGame] = useDeleteMatchGameMutation();
  const [updateGame] = useUpdateMatchGameMutation();

  const handlePost = async () => {
    await addNewGame({
      id: matchGamesList.length,
      left: "Лошадь",
      right: "horse",
    }).unwrap();
  };

  const handleDelete = async () => {
    await deleteGame(matchGamesList.length - 1).unwrap();
  };

  const handleUpdate = async () => {
    await updateGame({
      id: matchGamesList.length - 1,
      left: "Жопа",
      right: "Ass",
    }).unwrap();
  };

  useEffect(() => {
    console.log(matchGamesList);
  }, [matchGamesList]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button style={{ marginLeft: "9px" }} onClick={handlePost}>
          post
        </button>
        <button style={{ marginLeft: "9px" }} onClick={handleDelete}>
          delete last item
        </button>
        <button style={{ marginLeft: "9px" }} onClick={handleUpdate}>
          change inputs for last item
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
