import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Tabbar } from "./components/Tabbar/Tabbar";
import HomePage from './pages/HomePage/HomePage';
import TipsPage from './pages/TipsPage/TipsPage';
import SearchPage from './pages/SearchPage/SearchPage';
import TradingPage from './pages/TradingPage/TradingPage';

function App() {
    return (
        <Router>
            <main className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tips" element={<TipsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
                <Tabbar />
            </main>
        </Router>
    );
}

export default App;