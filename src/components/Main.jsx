import React, { useEffect, useState } from "react";

const MainTemp = () => {
  const [apiTasks, setApiTasks] = useState([]);
  const [addtask, setAddTask] = useState("");
  const [editTask, setEditTask] = useState({ id: null, title: "" });

  useEffect(() => {
    const fetchingAPI = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const actualdata = await response.json();
        setApiTasks(actualdata);
      } catch (error) {
        console.log("error in fetching: ", error);
      }
    };
    fetchingAPI();
  }, []);

  const addTaskFunc = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            title: addtask,
            completed: false,
          }),
        }
      );
      const newTask = await response.json();
      setApiTasks([...apiTasks, newTask]);
      setAddTask("");
    } catch (error) {
      console.log("not ad becauase: ", error);
    }
  };

  const deleteTaskfunc = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });
      const updatedTask = apiTasks.filter((task) => task.id !== id);
      setApiTasks(updatedTask);
    } catch (error) {
      console.log("Error in deletingTask: ", error);
    }
  };

  const updateTaskFunc = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            title: editTask.title,
          }),
        }
      );
      const updatedTask = await response.json();
      const updatedTasks = apiTasks.map((task) =>
        task.id === id ? { ...task, title: updatedTask.title } : task
      );
      setApiTasks(updatedTasks);
      setEditTask({ id: null, title: "" });
    } catch (error) {
      console.log("Error in updatingTask: ", error);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          style={{ padding: "10px 20px" }}
          value={addtask}
          onChange={(e) => setAddTask(e.target.value)}
        />
        <button
          onClick={addTaskFunc}
          style={{ padding: "10px 20px", marginLeft: "20px" }}
        >
          ADD
        </button>
      </div>
      {apiTasks?.map((eachTask) => {
        return (
          <div
            key={eachTask.id}
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          >
            {/* <p>{eachTask.id}</p> */}
            {editTask.id === eachTask.id ? (
              <>
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) =>
                    setEditTask({ ...editTask, title: e.target.value })
                  }
                />
                <button onClick={() => updateTaskFunc(eachTask.id)}>
                  Update
                </button>
              </>
            ) : (
              <p>{eachTask.title}</p>
            )}
            <button
              onClick={() => deleteTaskfunc(eachTask.id)}
              style={{ height: "20px" }}
            >
              Delete
            </button>
            <button
              onClick={() =>
                setEditTask({ id: eachTask.id, title: eachTask.title })
              }
            >
              Edit
            </button>
          </div>
        );
      })}
    </>
  );
};

export default MainTemp;
