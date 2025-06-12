import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo2.png';

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

const AdminLink = styled(NavLink)`
  color: #ca0013;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  font-family: 'Gudea', sans-serif;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &.active {
    font-weight: 700;
    background-color: rgba(202, 0, 19, 0.08);
  }

  &:hover {
    background-color: rgba(202, 0, 19, 0.1);
    color: #a00010;
  }
`;

function Navbar() {
  return (
    <NavContainer>
      <LogoWrapper>
        <LogoImg src={logo} alt="Bug Hunter Logo" />
        <LogoText to="/">Bug Hunter</LogoText>
      </LogoWrapper>
      <AdminLink to="/admin">Admin</AdminLink>
    </NavContainer>
  );
}

export default Navbar;
