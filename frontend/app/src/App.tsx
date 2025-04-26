import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import OnboardingPage from './screens/OnboardingPage';
import TaskPage from './screens/ReviewPage';
import './App.css';
import NotFoundPage from './screens/NotFoundPage';

function App() {
    const loggedIn = false;
    return (
        <Routes>
            {loggedIn ? (
                <>
                    <Route path="" element={<LandingPage />} />
                    <Route path="review" element={<TaskPage />} />
                </>
            ) : (
                <Route path="" element={<OnboardingPage />} />
            )}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
