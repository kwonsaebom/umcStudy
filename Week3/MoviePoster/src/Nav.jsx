import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.div`
  width: 100%;
  background-color: rgb(22, 18, 81);
  padding: 15px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarMenu = styled(Link)`
  color: white;
  margin: 8px;
  text-decoration: none;

  &:hover {
    color: yellow;
    font-weight: bold;
    font-size: 16px;
  }
`;

const UmcNavbarMenu = styled(NavbarMenu)`
    margin-left: 20px;

`;

const UpcomingMenu = styled(NavbarMenu)`
  margin-right: 20px;
`;

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  return (
    <Navbar>
      <div>
        <UmcNavbarMenu to={'/umc'}>UMC Movie</UmcNavbarMenu>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <NavbarMenu to={'/'} onClick={handleLogoutClick}>로그아웃</NavbarMenu>
          </>
        ) : (
          <>
            <NavbarMenu to={'/'} onClick={handleLoginClick}>로그인</NavbarMenu>
          </>
        )}
        <NavbarMenu to={'/popular'}>Polular</NavbarMenu>
        <NavbarMenu to={'/nowPlaying'}>Now Playing</NavbarMenu>
        <NavbarMenu to={'/topRated'}>Top Rated</NavbarMenu>
        <UpcomingMenu to={'/upcoming'}>UpComing</UpcomingMenu>
      </div>
    </Navbar>
  );
}

export default Nav;
