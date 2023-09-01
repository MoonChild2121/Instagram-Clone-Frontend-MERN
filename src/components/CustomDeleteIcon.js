import React from "react";
import { AiFillDelete } from 'react-icons/ai';

export function CustomDeleteIcon({ onClick }) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <AiFillDelete style={{ fontSize: '24px' }} />
      </div>
    );
  }