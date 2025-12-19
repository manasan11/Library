import { createContext, useState, useCallback, useEffect } from "react";
import {api} from "../utils/api";

const IssueContext = createContext();

const IssueProvider = ({ children }) => {
  const [issued, setIssued] = useState([]);

  const fetchIssued = useCallback(async () => {
    const res = await api.get("/issued");
    setIssued(res.data);
  }, []);

  const addIssue = async (book) => {
    await api.post("/issued", book);
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
    const fetchIssued = async () => {
      const res = await api.get("/issued");
      setIssued(res.data);
    };

    fetchIssued();
  },[]);
  return (
    <IssueContext.Provider value={{ issued, addIssue, updateIssue, deleteIssue }}>
      {children}
    </IssueContext.Provider>
  );
};

export { IssueContext, IssueProvider };



