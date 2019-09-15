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
                <h4>Meetings demand your undivided attention.</h4>
                <h3>SlackR gives you your life back.</h3>

                <p>Summarize meeting transcripts and receive notifications when you people call your name.</p>
            </div>
        );
    }
}

export { Landing as default };