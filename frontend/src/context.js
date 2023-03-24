import React, {useState, useContext, useEffect} from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [reportList, setReportList] = useState([]);
    const [editableReportId,setEditableReportId] = useState();
    const [laboratorianList, setLaboratorianList] = useState([]);
    const [refresh,setRefresh] = useState(false);
    
    return (
      <AppContext.Provider
        value={{
            reportList,
            setReportList,
            editableReportId,
            setEditableReportId,
            laboratorianList,
            setLaboratorianList,
            refresh,
            setRefresh
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