import { useState } from 'react';
import Modal from './components/Modal.jsx';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  //const openModal = () => setModalOpen(true);
  //const closeModal = () => setModalOpen(false);

  return (
    <div className="Main">
      <h1>안녕하세요!</h1>
      <p>내용내용내용</p>

      <div>
        <button onClick= { () => { setModalOpen(true) }}>버튼 열기</button><br/>
        { modalOpen === true ? <Modal /> : null}
      </div>
    </div>
  )
}

export default App;

