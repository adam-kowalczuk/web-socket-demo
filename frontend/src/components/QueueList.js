import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import QueueListItem from "./QueueListItem";

export default function QueueList(props) {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState();
  // const [name, setName] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:8080");
    setSocket(socket);

    socket.on("connect", () => console.log("Connected", socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("public", (data) => {
      console.log(data);
      const name = data;
      setPlayers((prev) => [...prev, name]);
    });
    // Cleanup function
    return () => socket.disconnect();
  }, []);

  // Players list
  const listQueue = props.users.map((player) => (
    <QueueListItem key={player.id} name={player.name} />
  ));

  const send = function () {
    socket.emit("name", props.users[0].name);
  };

  //Players in queue
  const queue = players.map((player, i) => {
    return <li key={i}>{player}</li>;
  });

  return (
    <>
      <ul>{listQueue}</ul>

      {/* <div>
        <textarea
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div> */}

      <button onClick={send}>Send</button>
      <button onClick={() => setPlayers([])}>Clear</button>
      <ul>{queue}</ul>
    </>
  );
}
