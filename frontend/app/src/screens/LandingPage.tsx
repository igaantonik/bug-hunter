import PageContainer from '../components/shared/PageContainer';
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
