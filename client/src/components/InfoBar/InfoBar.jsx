/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="info-bar">
    <h3>Room {room}</h3>
    <a href="/" className="info-button">Leave chat</a>
  </div>
);

export default InfoBar;

InfoBar.propTypes = {
  room: PropTypes.string.isRequired,
};
