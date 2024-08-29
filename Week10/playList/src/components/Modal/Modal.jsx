import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { closeModal } from "../../features/modal/modalSlice";
import { clearCart } from "../../features/cart/cartSlice";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  padding-top: 20px;

  display: flex;
`;

const Button = styled.button`
  background-color: ${(props) => props.bgColor || "#007bff"};
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#0056b3"};
  }
`;

const Modal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.showModal);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  if (!showModal) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <p>Are you sure you want to clear the cart?</p>
        <ButtonContainer>
          <Button
            bgColor="#dc3545"
            hoverColor="#c82333"
            onClick={handleClearCart}
          >
            Yes
          </Button>
          <Button onClick={handleCloseModal}>No</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
