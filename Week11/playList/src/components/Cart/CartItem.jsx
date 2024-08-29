import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ChevronUp, ChevronDown } from "../../constants/icons";
import { increase, decrease, removeItem } from "../../features/cart/cartSlice";

const CartItem = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  const handleDecrease = () => {
    if (amount === 1) {
      dispatch(removeItem(id));
    } else {
      dispatch(decrease(id));
    }
  };

  const handleIncrease = () => {
    dispatch(increase(id));
    console.log(`Item ${id} increased`); // 클릭 시 로그 출력
  };

  return (
    <Item>
      <Image src={img} alt={title} />
      <Info>
        <Title>{title}</Title>
        <Singer>{singer}</Singer>
        <Price>₩{price}</Price>
      </Info>
      <Amount>
        <Button onClick={handleIncrease}>
          <ChevronUp />
        </Button>
        <span>{amount}</span>
        <Button onClick={handleDecrease}>
          <ChevronDown />
        </Button>
      </Amount>
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 1rem;
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  margin-bottom: 0.5rem;
`;

const Singer = styled.p`
  margin-bottom: 0.5rem;
  color: #6c757d;
`;

const Price = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Amount = styled.div`
  display: flex;
  align-items: center;

  span {
    margin: 0 0.5rem;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default CartItem;
