import { React, useState } from "react";

export default function Form(props) {
  const [player, setPlayer] = useState("");
  const [queue, setQueue] = useState(props.queue);

  const savePlayer = function (name) {
    const newPlayer = {
      id: 4,
      name: name,
      table_id: null,
      is_admin: false
    };
    setQueue(() => [...queue, newPlayer]);
  };

  return (
    <>
      <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
        <input
          placeholder="Enter Your Handle"
          name="name"
          type="text"
          value={player}
          onChange={(event) => setPlayer(event.target.value)}
        />
      </form>
      <button onClick={() => savePlayer(player)}>Submit</button>
    </>
  );
}
