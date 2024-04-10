// TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onComplete, onDelete }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={() => onComplete(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
