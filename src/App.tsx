import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Tabbar } from "./components/Tabbar/Tabbar";
import HomePage from './pages/HomePage/HomePage';

function App() {
    return (
        <Router>
            <main className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
                <Tabbar />
            </main>
        </Router>
    );
}

export default App;