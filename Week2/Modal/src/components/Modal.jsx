import { useState } from 'react';
import './Modal.css';


function Modal() {
    const [modalOpen, setModalOpen] = useState(true); // 모달의 초기 상태를 열린 상태로 설정합니다.

    const closeModal = () => {
        setModalOpen(false); // 모달을 닫는 함수를 정의하고, 상태를 false로 업데이트합니다.
    };

    return (
        <>
            {modalOpen && ( // 모달이 열려있을 때만 모달을 렌더링합니다.
                <div className="modal-wrapper">
                    <div className='modal'>
                        <h2>안녕하세요</h2><br/>
                        <p>모달 내용은 어쩌고 저쩌고..</p>
                        <button id = "close" onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal;

