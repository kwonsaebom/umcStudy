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
const MenuToggleButton = styled.button`
  border: none;
  color: white;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
  margin-left: auto; /* 메뉴 토글 버튼이 네비게이션 바의 오른쪽에 위치하도록 함 */
  margin-right: 20px;

  &:hover {
    color: gold;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 20px;
  right: ${({ showMenu }) => (showMenu ? "0" : "-250px")};
  width: 250px;
  height: 100%;
  background-color: rgb(22, 18, 81, 0.8); /* Navbar의 배경색과 동일 */
  color: white; /* Navbar의 텍스트 색상과 동일 */
  transition: right 0.3s ease;
  z-index: 1000;
`;

const SidebarMenu = styled(NavbarMenu)`
  display: block;
  padding: 15px 20px;
  &:hover {
    color: gold;
    font-weight: bold;
    font-size: 16px;
  }
`;

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const SidebarNav = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };

    const closeMenu = () => {
      setShowMenu(false);
    };

    return (
      <>
        <Navbar>
          <Sidebar showMenu={showMenu}>
            <UmcNavbarMenu to={"/umc"} onClick={closeMenu}>
              UMC Movie
            </UmcNavbarMenu>
            {isLoggedIn ? (
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            ) : (
              <>
                <SidebarMenu to={"/login"} onClick={closeMenu}>
                  로그인
                </SidebarMenu>
                <SidebarMenu to={"/signUp"} onClick={closeMenu}>
                  회원가입
                </SidebarMenu>
              </>
            )}
            <SidebarMenu to={"/popular"} onClick={closeMenu}>
              Popular
            </SidebarMenu>
            <SidebarMenu to={"/nowPlaying"} onClick={closeMenu}>
              Now Playing
            </SidebarMenu>
            <SidebarMenu to={"/topRated"} onClick={closeMenu}>
              Top Rated
            </SidebarMenu>
            <SidebarMenu to={"/upcoming"} onClick={closeMenu}>
              Upcoming
            </SidebarMenu>
          </Sidebar>
          <MenuToggleButton onClick={toggleMenu}>☰</MenuToggleButton>
        </Navbar>
      </>
    );
  };

  return (
    <>
      {windowWidth > 600 ? (
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
      ) : (
        <SidebarNav />
      )}
    </>
  );
}

export default Nav;
