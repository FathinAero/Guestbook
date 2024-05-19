import React, { useState } from "react";
import axios from "axios";
import "./EntryList.css"; // Import file CSS untuk styling

const EntryList = ({ fetchEntries, entries }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/entries/${id}`);
      fetchEntries();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (entry) => {
    setIsEditing(entry.id);
    setName(entry.name);
    setMessage(entry.message);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:4001/entries/${id}`, { name, message });
      fetchEntries();
      setIsEditing(null);
      setName("");
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          <div className="entry-content">
            {isEditing === entry.id ? (
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={() => handleUpdate(entry.id)}>Save</button>
                <button onClick={() => setIsEditing(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{entry.name}</strong>: {entry.message}
              </div>
            )}
          </div>
          <div className="entry-actions">
            <button onClick={() => handleEdit(entry)}>Edit</button>
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
