import logo from "./logo.svg";
import "./App.css";
import Page from "./Component/Page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <Page />
    </div>
  );
}

export default App;
