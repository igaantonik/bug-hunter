import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import OnboardingPage from './screens/OnboardingPage';
import ReviewPage from './screens/ReviewPage';
import AdminPage from './screens/AdminPage';
import './App.css';
import NotFoundPage from './screens/NotFoundPage';
import useUserStore from './store/useUserStore';
import FeedbackPage from './screens/FeedbackPage';
import Navbar from './components/shared/Navbar';

function App() {
    const { isOnboarded } = useUserStore();

    return (
  <>
    {isOnboarded && <Navbar />}
    <div className="main-content">
      <Routes>
        {isOnboarded ? (
          <>
            <Route path="" element={<LandingPage />} />
            <Route path="review" element={<ReviewPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="admin" element={<AdminPage />} />
          </>
        ) : (
          <Route path="" element={<OnboardingPage />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </>
);
}

export default App;
