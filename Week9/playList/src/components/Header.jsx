// /src/components/Header.js
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { CartIcon } from "../constants/icons"; // 아이콘 import 추가

const Header = () => {
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <Container>
      <h1>UMC PlayList</h1>
      <Cart>
        <CartIcon />
        <span>{totalItems}</span>
      </Cart>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #c5c6c7;
  color: #fff;
`;

const Cart = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.3rem;
    width: 30px;
    height: 30px;
  }
`;

export default Header;
