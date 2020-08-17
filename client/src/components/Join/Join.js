import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css'

import youthIlustration from '../../assets/friends.svg';
import shape from '../../assets/shape-1.svg';
// <a href='https://www.freepik.com/vectors/social-media'>Social media vector created by stories - www.freepik.com</a> 
// abstract <a href='https://www.freepik.com/vectors/banner'>Banner vector created by freepik - www.freepik.com</a>
const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="join-container">
            <img src={shape} className="shape shape-right" alt="decorative shape"/>
            <img src={shape} className="shape shape-left" alt="decorative shape"/>
            <div className="join-right-container">
                <img alt="people texting each other" src={youthIlustration} />
            </div>
            <div className="join-left-container">
                <h1 className="join-header">Start chatting!</h1>
                <input placeholder="Username" className="join-input" type="text" onChange={(event) => setName(event.target.value)} />
                <input placeholder="Room" className="join-input" type="text" onChange={(event) => setRoom(event.target.value)} />
                <Link className="button-outline" onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="join-button" type="submit"> Sign in </button>
                </Link>
            </div>


        </div>
    )
}

export default Join;