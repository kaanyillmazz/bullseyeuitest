import React from 'react';
import './App.css';
import MainPage from "./Pages/MainPage";
import PageHeader from "./components/PageHeader";

function App() {
    return (
        <div className="App">
            <PageHeader/>
            <MainPage/>
        </div>
    );
}

export default App;
