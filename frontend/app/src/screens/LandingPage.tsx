import React from 'react';
import PageContainer from '../components/PageContainer';
import LandingPageHeader from '../components/landing/LandingPageHeader';
import TasksGallery from '../components/landing/TaskGallery/TasksGallery';

function LandingPage() {
    return (
        <PageContainer>
            <LandingPageHeader />
            <TasksGallery />
        </PageContainer>
    );
}

export default LandingPage;
