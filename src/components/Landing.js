import React from 'react';
import firebase from '../firebase.js';

import AudioManager from '../audio/audio';

import './Landing.css';

class Landing extends React.Component {
    async componentDidMount() {
        this.AudioManager = new AudioManager();
        this.AudioManager.initialize();
    }

    render() {
        return (
            <div className='landing'>
                <h4>Meetings demand your undivided attention, but...</h4>
                <h3>SlackR gives you your life back!</h3>
                <p>You will not be trapped on a chair in online meetings anymore.</p>
                <p>You can even accidentally fall asleep during online voice meetings, and that's fine!</p> 
                <p>SlackR will summarize meeting transcripts and will notify you when people call your name.</p>
            </div>
        );
    }
}

export { Landing as default };