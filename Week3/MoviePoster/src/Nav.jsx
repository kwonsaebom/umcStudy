import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.div`
  width: 100%;
  background-color: rgb(22, 18, 81);
  padding: 15px 0px;
  display: flex;
  justify-content: space-between; /* UMC를 왼쪽 정렬하기 위해 */
  align-items: center; /* 수직 정렬을 위해 */
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
  return (
    <Navbar>
      <div> {/* 왼쪽 정렬된 부분 */}
        <UmcNavbarMenu to={'/umc'}>UMC Movie</UmcNavbarMenu>
      </div>
      <div> {/* 오른쪽 정렬된 부분 */}
        <NavbarMenu to={'/signup'}>회원가입</NavbarMenu>
        <NavbarMenu to={'/popular'}>Polular</NavbarMenu>
        <NavbarMenu to={'/nowPlaying'}>Now Playing</NavbarMenu>
        <NavbarMenu to={'/topRated'}>Top Rated</NavbarMenu>
        <UpcomingMenu to={'/upcoming'}>UpComing</UpcomingMenu>
      </div>
    </Navbar>
  );
}

export default Nav;
