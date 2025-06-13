import styled from 'styled-components';
import { useJoinTaskGroupMutation } from "../../hooks/api/mutations/useJoinTaskGroupMutation"
import useUserStore from '../../store/useUserStore';

const Header = styled.header`
    width: calc(80% - 20px);
    margin: 0 auto;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

function LandingPageHeader() {
    const joinTaskGroupMutation = useJoinTaskGroupMutation();
    const { username } = useUserStore();

    const handleJoinGroup = () => {
        const accessCode = prompt('Enter access code:');
        if (!accessCode) return;

        if (!username) {
            alert('You must be logged in to join a group.');
            return;
        }

        joinTaskGroupMutation.mutate(
            { accessCode, username },
            {
                onSuccess: () => {
                    alert('Successfully joined the group!');
                },
                onError: (error: any) => {
                    alert('Failed to join the group: ' + error.message);
                },
            }
        );
    };

    return (
        <Header>
            <Nav>
                <h1>Sharpen Your Code Review Skills!</h1>
                <button onClick={handleJoinGroup}>Join group</button>
            </Nav>
            <p>
                Practise your code review abilities by identifying hidden bugs
                in pre-selected code snippets. Get instant feedback and track
                your progress.
            </p>
        </Header>
    );
}

export default LandingPageHeader;
