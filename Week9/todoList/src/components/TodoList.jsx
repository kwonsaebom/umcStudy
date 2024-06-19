import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, complete } from "../redux/todoSlice";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function TodoList() {
  const todolist = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const trash = <FontAwesomeIcon icon={faTrashCan} />;

  console.log(todolist);

  const todolistView = todolist.map((todo) => (
    <List key={todo.id}>
      <Checkbox
        type="checkbox"
        checked={todo.complete}
        onChange={() => dispatch(complete(todo.id))}
      />
      <TodoText complete={todo.complete}>{todo.text}</TodoText>
      <DeleteButton onClick={() => dispatch(remove(todo.id))}>
        {trash}
      </DeleteButton>
    </List>
  ));

  return <TodoListContainer>{todolistView}</TodoListContainer>;
}

const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  appearance: none;
  width: 30px;
  height: 30px;
  border: 2px solid #ccc;
  border-radius: 50%;
  cursor: pointer;

  &:checked {
    background-color: black;
    border-color: black;
  }
`;

const TodoText = styled.div`
  flex-grow: 1;
  ${(props) => (props.complete ? "text-decoration: line-through;" : "")}
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  font-size: 20px;
`;

const TodoListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;
