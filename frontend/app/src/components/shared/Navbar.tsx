import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo2.png';
import { useJoinTaskGroupMutation } from "../../hooks/api/mutations/useJoinTaskGroupMutation"
import useUserStore from '../../store/useUserStore';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px 170px;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  box-shadow: 0px 4px 10px rgba(202, 0, 20, 0.23);
  border-bottom: 2px solid rgba(202, 0, 19, 0.2);

  @media (max-width: 768px) {
    padding: 16px 24px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoImg = styled.img`
  height: 4rem;

  @media (max-width: 768px) {
    height: 2.8rem;
  }
`;

const LogoText = styled(NavLink)`
  font-size: 1.75rem;
  font-family: 'Paytone One', sans-serif;
  font-weight: 700;
  color: #ca0013;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #a00010;
  }
`;

const RightLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AdminLink = styled(NavLink)`
  color: #ca0013;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
  font-family: 'Paytone One', sans-serif;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &.active {
    font-weight: 700;
  }

  &:hover {
    color: #a00010;
  }
`;

const JoinGroupButton = styled.button`
  padding: 8px 16px;
  background-color: #ca0013;
  color: white;
  font-family: 'Paytone One', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #a00010;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(202, 0, 19, 0.5);
  }
`;

const LogoutButton = styled.button`
margin-left: 100px;
  padding: 8px 16px;
  background-color: #ca0013;
  color: white;
  font-family: 'Paytone One', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #a00010;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(202, 0, 19, 0.5);
  }
`;
function Navbar() {
  const joinTaskGroupMutation = useJoinTaskGroupMutation();
  const { username,setUsername, setIsOnboarded } = useUserStore();

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

  const logout = () => {
    localStorage.removeItem("user-storage")
    localStorage.removeItem("review-storage")
    setUsername(undefined);
    setIsOnboarded(false);
    window.location.href = '/';
  }

  return (
    <NavContainer>
      <LogoWrapper>
        <LogoImg src={logo} alt="Bug Hunter Logo" />
        <LogoText to="/">Bug Hunter</LogoText>
      </LogoWrapper>
      <RightLinks>
        <AdminLink to="/admin">Admin</AdminLink>
        <JoinGroupButton onClick={handleJoinGroup}>Join group</JoinGroupButton>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </RightLinks>
    </NavContainer>
  );
}

export default Navbar;
