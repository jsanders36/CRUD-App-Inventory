import { UserContext } from "./App";
import { useState, useEffect, useContext } from "react";
import { TextInput } from "react-native";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [fetchTime, setFetchTime] = useState(false);
  const [globalEditMode, setGlobalEditMode] = useState(false);
  const [filter, setFilter] = useState(true);
  const [nextItemId, setNextItemId] = useState(0);
  const [darkMode, setDarkMode] = useState(false); // Add dark mode state

  useEffect(() => {
    setFetchTime(false);
    fetch("http://localhost:8080/inventory")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((e) => (e.editMode = false));
        data = data.sort((a, b) => a.id - b.id);
        if (filter && user) {
          data = data.filter((e) => e.user_id === user.id);
        }
        setItems(data);
      });
  }, [fetchTime, filter]);

  useEffect(() => {
    fetch("http://localhost:8080/inventory")
      .then((res) => res.json())
      .then((data) => {
        const existingItemIds = data.map((item) => item.id);
        const maxId = Math.max(...existingItemIds);
        const nextAvailableId = maxId + 1;
        console.log("inventory data: ", data);
        setNextItemId(nextAvailableId);
      });
  }, []);

  const deleteItem = (item) => {
    fetch("http://localhost:8080/inventory", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFetchTime(true);
      });
  };

  const handleChange = (key, value, index) => {
    let mutableItems = [...items];
    mutableItems[index][key] = value;
    setItems(mutableItems);
  };

  const updateItem = (item) => {
    let sentItem = { ...item };
    delete sentItem.editMode;
    fetch("http://localhost:8080/inventory", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sentItem),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGlobalEditMode(false);
        setFetchTime(true);
      });
  };

  const createItem = () => {
    setGlobalEditMode(true);
    let item = {
      id: nextItemId,
      user_id: user.id,
      item_name: "FILL ME IN",
      description: "FILL ME IN",
      quantity: 0,
      editMode: true,
      initialCreate: true,
    };
    let mutableItems = [...items];
    mutableItems.unshift(item);
    setItems(mutableItems);
    setNextItemId(nextItemId+1);
  };

  const submitItem = (item) => {
    let sentItem = { ...item };
    delete sentItem.editMode;
    delete sentItem.initialCreate;
    delete sentItem.id;
    fetch("http://localhost:8080/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sentItem),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGlobalEditMode(false);
        setFetchTime(true);
        setNextItemId(nextItemId)
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: darkMode ? "#333" : "white", // Apply dark mode background color
        color: darkMode ? "white" : "black", // Apply dark mode text color
      }}
      className="header"
    >
      {/* Dark Mode Toggle */}
      <button
        style={{ backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}
        className="button"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {user ? (
        <>
          <button
            style={{ backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}
            className="button"
            onClick={() => createItem()}
            disabled={globalEditMode}
          >
            Create Item
          </button>
          <button
            style={{ backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}
            className="button"
            onClick={() => setFilter(!filter)}
            disabled={globalEditMode}
          >
            {filter ? <>See all items</> : <>See my items</>}
          </button>
        </>
      ) : (
        <></>
      )}

      <table className="table" style={{ backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>
        <thead style={{ backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>
          <tr style={{ backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>
            <th scope="col" style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>Item #</th>
            <th scope="col" style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>Name</th>
            <th scope="col" style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>Description</th>
            <th scope="col" style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>Quantity</th>
            <th scope="col" style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>Manager ID</th>
            <th scope="col" style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>Edit/Delete</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>
          {console.log(items)}
          {items ? (
            <>
              {items?.map((e, i) => (
                <tr key={i} style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>
                  <th scope="col" style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>{e.id}</th>
                  <td style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>
                    <input
                      style={{ width: "50%", height: 50, backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}
                      className="input"
                      type="text"
                      onChange={(e) =>
                        handleChange("item_name", e.target.value, i)
                      }
                      value={e.item_name}
                      disabled={!e.editMode}
                    />
                  </td>
                  <td className="header" style={{ backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>
                    <TextInput
                      className="container"
                      style={{ width: '100%', backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}
                      maxLength={100}
                      multiline
                      onChange={(e) =>
                        handleChange("description", e.target.value, i)
                      }
                      value={e.description}
                      disabled={!e.editMode}
                    />
                  </td>
                  <td style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>
                    <input
                      style={{ backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}
                      className="input"
                      type="number"
                      onChange={(e) =>
                        handleChange("quantity", e.target.value, i)
                      }
                      value={e.quantity}
                      min={0}
                      disabled={!e.editMode}
                    />
                  </td>
                  <td style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>{e.user_id}</td>
                  <td style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}>
                    {e.editMode ? (
                      <>
                        <button
                          style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}
                          className="button"
                          onClick={() => {
                            e.initialCreate
                              ? submitItem(e)
                              : updateItem(e);
                            setFetchTime(true);
                            setNextItemId(nextItemId+1)
                          }}
                        >
                          Submit
                        </button>
                        <button style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }} className="button" disabled>
                          Delete
                        </button>
                        <button
                          style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}
                          className="button"
                          onClick={() => {
                            setFilter(true);
                            setGlobalEditMode(false);
                            setFetchTime(true);
                            setNextItemId(nextItemId-1)
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                          <button
                          style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}
                          className="button"
                          onClick={() => {
                            setGlobalEditMode(true);
                            handleChange("editMode", true, i);
                          }}
                          disabled={globalEditMode || !user || !filter}
                        >
                          Edit
                        </button>
                          <button
                          style={{ height: "20%", backgroundColor: darkMode ? "#333" : "white", color: darkMode ? "white" : "black" }}
                          className="button"
                          onClick={() => deleteItem(e)}
                          disabled={globalEditMode || !user || !filter}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;