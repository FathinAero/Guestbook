import React, { useEffect, useState } from "react";
import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import axios from "axios";

const Home = () => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    try {
      const response = await axios.get("/entries");
      setEntries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div>
      <EntryForm fetchEntries={fetchEntries} />
      <EntryList fetchEntries={fetchEntries} entries={entries} />
    </div>
  );
};

export default Home;
