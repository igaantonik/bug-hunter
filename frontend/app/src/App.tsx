import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import OnboardingPage from './screens/OnboardingPage';
import TaskPage from './screens/TaskPage';
import './App.css';
import NotFoundPage from './screens/NotFoundPage';

function App() {
    const loggedIn = false;
    return (
        <Routes>
            <Route
                path=""
                element={loggedIn ? <LandingPage /> : <OnboardingPage />}
            />
            <Route path="task/:taskId" element={<TaskPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
