import { createContext, useState, useCallback, useEffect } from "react";
import {api} from "../utils/api";

const IssueContext = createContext();

const IssueProvider = ({ children }) => {
  const [issued, setIssued] = useState([]);

  const fetchIssued = useCallback(async () => {
    try {
      const res = await api.get("/issued");
      setIssued(res.data);
    } catch (err) {
      console.error("Failed to fetch issued books:", err);
    }
  }, []);

  const addIssue = async (issue) => {
    await api.post("/issued", issue);
    fetchIssued();
  };

  const updateIssue = async (id, updated) => {
    await api.put(`/issued/${id}`, updated);
    fetchIssued();
  };

  const deleteIssue = async (id) => {
    await api.delete(`/issued/${id}`);
    fetchIssued();
  };

  useEffect(() => {
    fetchIssued();
  },[fetchIssued]);
  
  return (
    <IssueContext.Provider value={{ issued, addIssue, updateIssue, deleteIssue, fetchIssued }}>
      {children}
    </IssueContext.Provider>
  );
};

export { IssueContext, IssueProvider };



