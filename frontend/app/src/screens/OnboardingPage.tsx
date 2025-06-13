import styled from 'styled-components';
import PageContainer from '../components/shared/PageContainer';
import EnterNameForm from '../components/onboarding/EnterNameForm';
import logo from '../assets/logo2.png';

const Heading = styled.h1`
  font-family: 'Paytone One', sans-serif;
  font-size: 1.5rem;
  color: black;
  margin-bottom: 24px;
  text-align: center;
`;

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  img {
    height: 120px;
    margin-bottom: 12px;
  }

  h1 {
    font-family: 'Paytone One', sans-serif;
    font-size: 2rem;
    color: #ca0013;
    margin: 0;
  }
`;

const OnboardingBox = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border: 2px solid #ca001360;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(202, 0, 19, 0.08);
`;

function OnboardingPage() {
  return (
    <PageContainer>
      <CenteredWrapper>
        <AppHeader>
          <img src={logo} alt="Bug Hunter Logo" />
          <h1>Bug Hunter</h1>
        </AppHeader>

        <OnboardingBox>
          <Heading>Enter Your Nickname</Heading>
          <EnterNameForm />
        </OnboardingBox>
      </CenteredWrapper>
    </PageContainer>
  );
}

export default OnboardingPage;
