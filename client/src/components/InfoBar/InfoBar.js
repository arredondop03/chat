import React from 'react';
import './InfoBar.css';

const InfoBar = ({room}) => (
    <div className="info-bar">
            <h3>Room {room}</h3>
            <a href="/" className="info-button">Leave chat</a>
    </div>
);

export default InfoBar;