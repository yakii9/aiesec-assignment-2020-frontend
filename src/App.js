import React from "react";
import SearchPage from "./modules/SearchPage";
import { token } from "./config";
import apiClient from "./utils/apiClient";
import "./App.css";

function App() {
  apiClient.setToken(token);

  return (
    <div className="App">
      <SearchPage />
    </div>
  );
}

export default App;
