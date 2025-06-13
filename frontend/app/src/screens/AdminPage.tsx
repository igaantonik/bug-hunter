import Accordion from '../components/admin/Accordion';
import SmellsSection from '../components/admin/smell/SmellsSection';
import FilesSection from '../components/admin/file/FilesSection';
import TasksSection from '../components/admin/task/TaskSection';
import PageContainer from '../components/shared/PageContainer';
import AdminPageHeader from '../components/admin/AdminPageHeader';
import SuspenseWithErrorBoundary from '../components/shared/SuspenseWithErrorBoundary';

function AdminPage() {
    return (
        <PageContainer>
            <AdminPageHeader />
            <Accordion title="Manage Smells">
                <SuspenseWithErrorBoundary>
                    <SmellsSection />
                </SuspenseWithErrorBoundary>
            </Accordion>
            <Accordion title="Manage Files">
                <SuspenseWithErrorBoundary>
                    <FilesSection />
                </SuspenseWithErrorBoundary>
            </Accordion>
            <Accordion title="Manage Tasks">
                <SuspenseWithErrorBoundary>
                    <TasksSection />
                </SuspenseWithErrorBoundary>
            </Accordion>
        </PageContainer>
    );
}

export default AdminPage;
