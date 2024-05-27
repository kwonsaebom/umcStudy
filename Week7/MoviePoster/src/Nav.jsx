import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    color: gold;
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

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  margin: 8px;
  cursor: pointer;

  &:hover {
    color: gold;
    font-weight: bold;
    font-size: 16px;
  }
`;

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // 토큰이 있는 경우 로그인 상태로 설정
      setIsLoggedIn(true);
    } else {
      // 토큰이 없는 경우 로그아웃 상태로 설정
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);

    navigate("/");
  };

  return (
    <Navbar>
      <div>
        <UmcNavbarMenu to={"/umc"}>UMC Movie</UmcNavbarMenu>
      </div>
      <div>
        {isLoggedIn ? (
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        ) : (
          <>
            <NavbarMenu to={"/login"}>로그인</NavbarMenu>
            <NavbarMenu to={"/signUp"}>회원가입</NavbarMenu>
          </>
        )}
        <NavbarMenu to={"/popular"}>Popular</NavbarMenu>
        <NavbarMenu to={"/nowPlaying"}>Now Playing</NavbarMenu>
        <NavbarMenu to={"/topRated"}>Top Rated</NavbarMenu>
        <UpcomingMenu to={"/upcoming"}>Upcoming</UpcomingMenu>
      </div>
    </Navbar>
  );
}

export default Nav;
