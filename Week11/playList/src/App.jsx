// /src/App.js
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header";
import CartItem from "./components/Cart/CartItem";
import CartSummary from "./components/Cart/CartSummary";

const App = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Main>
        <CartContainer>
          {cartItems?.length === 0 ? (
            <div>장바구니가 비었습니다.</div>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} {...item} />)
          )}
        </CartContainer>
        <CartSummary />
      </Main>
    </>
  );
};

const Main = styled.main`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const CartContainer = styled.div`
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 1rem;
`;

export default App;
