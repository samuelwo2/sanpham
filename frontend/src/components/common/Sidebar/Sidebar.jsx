import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="sidebar-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="sidebar-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;