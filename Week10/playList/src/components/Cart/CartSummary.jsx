import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { calculateTotals } from "../../features/cart/cartSlice";
import { openModal } from "../../features/modal/modalSlice";
import Modal from "../Modal/Modal";

const CartSummary = () => {
  const { totalAmount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <Summary>
      <h3>Total: ₩{totalAmount}</h3>
      <Button onClick={handleOpenModal}>Clear Cart</Button>
      <Modal />
    </Summary>
  );
};

const Summary = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #dee2e6;
`;

const Button = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export default CartSummary;
