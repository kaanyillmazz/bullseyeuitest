import React from 'react';
import logo from './logo.svg';
import './App.css';
import DenseTable from "./components/DenseTable";
import {Grid} from "@mui/material";
import MainPage from "./Pages/MainPage";
import PageHeader from "./components/PageHeader";

function App() {
  return (
    <div className="App">
      <PageHeader title={""}/>
  <MainPage/>

    </div>
  );
}

export default App;
