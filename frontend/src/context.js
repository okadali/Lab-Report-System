import React, {useState, useContext, useEffect} from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [constReportList,setConstReportList] = useState([]);
    const [reportList, setReportList] = useState([]);
    const [editableReportId,setEditableReportId] = useState();
    const [laboratorianList, setLaboratorianList] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState("");
    
    return (
      <AppContext.Provider
        value={{
            constReportList,
            setConstReportList,
            reportList,
            setReportList,
            editableReportId,
            setEditableReportId,
            laboratorianList,
            setLaboratorianList,
            refresh,
            setRefresh,
            error,
            setError
        }}
      >
        {children}
      </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
  
export { AppContext, AppProvider };