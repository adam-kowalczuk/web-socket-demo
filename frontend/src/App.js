import React from "react";
import QueueList from "./components/QueueList";
// import Form from "./components/Form";

const App = () => {
  const players = [
    {
      id: 1,
      name: "Scootch Bootem",
      table_id: 1,
      is_admin: false
    },
    {
      id: 2,
      name: "Bootch Scootem",
      table_id: 1,
      is_admin: false
    },
    {
      id: 3,
      name: "Donkey Kong",
      table_id: 1,
      is_admin: false
    }
  ];

  return (
    <>
      <div>
        <QueueList users={players} />
      </div>
      {/* <div>
        <Form queue={mockQueue} />
      </div> */}
    </>
  );
};
export default App;
