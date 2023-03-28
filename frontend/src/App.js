import "./App.css";
import { useEffect, useRef } from "react";
import Report from "./components/Report";
import ReportInput from "./components/ReportInput";
import { GetWithoutAuth } from "./services/HttpService";
import Laboratorian from "./components/Laboratorian";
import { useGlobalContext } from "./context";
import LaboratorianInput from "./components/LaboratorianInput";
import ReportBar from "./components/ReportBar";

function App() {
  const isInitialMount = useRef(true);
  const {
    refresh,
    setRefresh,
    reportList,
    setReportList,
    laboratorianList,
    setLaboratorianList,
  } = useGlobalContext();

  useEffect(() => {
    setRefresh(true);
  }, []);

  const refreshReports = () => {
    GetWithoutAuth("/reports").then((result) => {
      setReportList(result);
    });
    GetWithoutAuth("/laboratorians").then((result) => {
      setLaboratorianList(result);
      
    });
    setRefresh(false);
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshReports();
  }, [refresh]);

  const rowStyle = { display: "flex", flexDirection: "row" };

  return (
    <div className="App">
      <div className="wrapper">
        <div style={rowStyle}>
          <div className="content">
            <div className="listDiv reportListDiv">
              <ReportBar />
              <div style={{ height: "45px" }} />

              {reportList.map((report) => {
                return <Report report={report} key={report.id} />;
              })}
            </div>

            <div className="listDiv laboratorianListDiv" style={{ marginTop: "0px" }}>
              {laboratorianList.map((laboratorian) => {
                return (
                  <Laboratorian
                    laboratorian={laboratorian}
                    key={laboratorian.id}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <ReportInput />
            <LaboratorianInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
