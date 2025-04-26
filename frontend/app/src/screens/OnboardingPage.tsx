import React from 'react';
import PageContainer from '../components/PageContainer';
import EnterNameForm from '../components/onboarding/EnterNameForm';

function OnboardingPage() {
    return (
        <PageContainer centered>
            <h1>Enter Your Nickname</h1>
            <EnterNameForm />
        </PageContainer>
    );
}

export default OnboardingPage;
