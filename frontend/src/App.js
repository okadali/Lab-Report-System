import "./App.css";
import { useState, useEffect } from "react";
import Report from "./components/Report";
import ReportInput from "./components/ReportInput";
import { GetWithoutAuth } from "./services/HttpService";
import Laboratorian from "./components/Laboratorian";
import { useGlobalContext } from "./context";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { reportList, setReportList, laboratorianList, setLaboratorianList } =
    useGlobalContext();

  useEffect(() => {
    GetWithoutAuth("/reports").then(
      (result) => {
        setReportList(result);
      },
      (error) => {
        setError(error);
      }
    );

    GetWithoutAuth("/laboratorians").then(
      (result) => {
        setLaboratorianList(result);
      },
      (error) => {
        setError(error);
      }
    );
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <ReportInput />

        {reportList.map((report) => {
          return <Report report={report} key={report.id} />;
        })}
        {laboratorianList.map((laboratorian) => {
          return (
            <Laboratorian laboratorian={laboratorian} key={laboratorian.id} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
