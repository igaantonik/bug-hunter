import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import OnboardingPage from './screens/OnboardingPage';
import ReviewPage from './screens/ReviewPage';
import './App.css';
import NotFoundPage from './screens/NotFoundPage';
import useUserStore from './store/useUserStore';

function App() {
    const { isOnboarded } = useUserStore();

    return (
        <Routes>
            {isOnboarded ? (
                <>
                    <Route path="" element={<LandingPage />} />
                    <Route path="review" element={<ReviewPage />} />
                </>
            ) : (
                <Route path="" element={<OnboardingPage />} />
            )}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
