import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../redux/todoSlice";
import styled, { createGlobalStyle } from "styled-components";
import TodoList from "./TodoList.jsx";

export default function InputTodo() {
  const dispatch = useDispatch();

  const [todolist, setTodolist] = useState({
    id: 0,
    text: "",
  });

  function handleText(e) {
    setTodolist({ ...todolist, text: e.target.value });
  }

  function onReset() {
    setTodolist({ ...todolist, text: "" });
  }

  return (
    <InputTodoContainer>
      <Title>To Do List</Title>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (todolist.text !== "") {
            dispatch(add(todolist.text));
          } else {
            alert("할 일을 입력해주세요!");
          }
          onReset();
        }}
      >
        <InputText type="text" value={todolist.text} onChange={handleText} />
        <SubmitButton type="submit" value="+" />
      </Form>
      <TodoList />
    </InputTodoContainer>
  );
}

const InputTodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2.5rem;
`;

const InputText = styled.input`
  padding: 10px;
  margin: 25px;
  width: 60%;
  border: 2px solid grey;
  border-radius: 14px;
  outline: none;
`;

const SubmitButton = styled.input`
  padding: 10px 14px;
  margin: 5px;
  color: white;
  background-color: grey;
  border: 2px solid grey;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #d7d7d7;
  }
`;
