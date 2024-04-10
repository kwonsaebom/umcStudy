import { useState } from 'react';
import './style.css';

function App() {
  const [inputText, setInputText] = useState(''); // 입력된 텍스트를 상태로 관리
  const [todos, setTodos] = useState([]); // '해야 할 일' 목록을 관리
  const [completedTodos, setCompletedTodos] = useState([]); // '해낸 일' 목록을 관리

  // 입력된 텍스트를 상태로 업데이트하는 함수
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // 입력 필드에서 엔터 키를 누를 때마다 텍스트를 추가
  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // 텍스트를 추가하고 입력 필드를 비움
  const addTodo = () => {
    if (inputText.trim() !== '') {
      setTodos([...todos, inputText]); // 새로운 텍스트를 '해야 할 일' 목록에 추가
      setInputText(''); // 입력 필드를 비움
    }
  };

  // 특정 텍스트를 '해낸 일' 목록으로 이동하고 '해야 할 일' 목록에서 제거
  const moveTodoToCompleted = (index) => {
    const completedTodo = todos[index];
    setCompletedTodos([...completedTodos, completedTodo]); // 텍스트를 '해낸 일' 목록에 추가
    const updatedTodos = todos.filter((_, i) => i !== index); // '해야 할 일' 목록에서 해당 텍스트를 제거
    setTodos(updatedTodos);
  };

  // 특정 텍스트를 '해낸 일' 목록에서 제거
  const removeCompletedTodo = (index) => {
    const updatedCompletedTodos = completedTodos.filter((_, i) => i !== index);
    setCompletedTodos(updatedCompletedTodos);
  };

  return (
    <div className="App">
      <h1>UMC Study Plan</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label></label>
            {/* 입력 필드를 제어 가능하도록 value와 onChange를 추가하고, 엔터 키를 감지할 수 있도록 onKeyPress를 추가 */}
            <input
              type="text"
              className="input-text"
              placeholder="   UMC 스터디 계획을 작성해보세요!"
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
            />
          </div>
        </div>
        <div className="todo-title-wrapper">
          <div className="todo-title">
            <b>해야 할 일</b>
            <div className="todo-list">
              {/* '해야 할 일' 목록을 매핑하여 동적으로 텍스트와 이동 버튼을 표시 */}
              {todos.map((todo, index) => (
              <div key={index} className="todo-list-item">
                    <p>{todo}</p>
                <div className="button-container">
                  <button onClick={() => moveTodoToCompleted(index)}>완료</button>
                </div>
              </div>
              ))}
            </div>
          </div>
          <div className="todo-title">
            <b>해낸 일</b>
            <div className="todo-list">
              {/* '해낸 일' 목록을 매핑하여 동적으로 텍스트와 삭제 버튼을 표시 */}
              {completedTodos.map((completedTodo, index) => (
              <div key={index} className="todo-list-item">
                <p>{completedTodo}</p>
                <button onClick={() => removeCompletedTodo(index)}>삭제</button>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
