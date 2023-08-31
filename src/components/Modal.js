import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './Modal.css';
import { useNavigate } from 'react-router-dom';

export default function Modal({setmodal}) {
    const navigate = useNavigate()
  return (
    <div className='centered' >
        <div className='darkBg centered'onClick={()=> {setmodal(false)}}>
      <div className='modal'>
        <div className='modalHeader'>
          <h5 className='heading'>Confirm</h5>
        </div>
        <button className='closeBtn' onClick={()=> {setmodal(false)}}>
          <AiOutlineClose></AiOutlineClose>
        </button>
        <div className='modalContent'>Do you want to log out?</div>
        <div className='modalActions'>
          <div className='actionsContainer'>
            <button className='logOutBtn' onClick={()=> 
                {setmodal(false) 
                localStorage.clear()
                navigate("/signin")
                }}>
            Log out</button>
            <button className='cancelBtn' onClick={()=> {setmodal(false)}}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}
