class AudioManager {
    interval = null;

    audioBlob = null;
    audioChunks = [];

    async initialize() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.addEventListener("dataavailable", event => {
            this.audioChunks.push(event.data);
        });

        mediaRecorder.start();

        mediaRecorder.addEventListener("stop", () => {
            this.audioBlob = new Blob(this.audioChunks);

            const audioUrl = URL.createObjectURL(this.audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        });

        this._setupUpload(mediaRecorder);
        this._setupVolume(stream);
    }

    _setupUpload(mediaRecorder) {
        this.interval = setInterval(async () => {
            mediaRecorder.stop();

            this.audioChunks = [];

            if (this.audioBlob !== null) {
                const arrayBuffer = await this.audioBlob.arrayBuffer();
                const audioBlob = new Buffer(arrayBuffer, 'binary' ).toString('base64');
                // firebase.firestore().collection('audio_blobs').doc('blob').set({ blob: audioBlob });
            }

            mediaRecorder.start();
        }, 3000);
    }

    _setupVolume(stream) {
        // const getAverageVolume = array => {
        //     const length = array.length;
        //     let values = 0;
        //     let i = 0;
        
        //     for (; i < length; i++) {
        //         values += array[i];
        //     }
        
        //     return values / length;
        // }

        // const audioContext = new AudioContext();
        // const input = audioContext.createMediaStreamSource(stream);
        // const analyser = audioContext.createAnalyser();
        // const scriptProcessor = audioContext.createScriptProcessor();
    
        // // Some analyser setup
        // analyser.smoothingTimeConstant = 0.3;
        // analyser.fftSize = 1024;
        
        // input.connect(analyser);
        // analyser.connect(scriptProcessor);
        // scriptProcessor.connect(audioContext.destination);

        // const bars = [];

        // scriptProcessor.onaudioprocess = audioProcessingEvent => {
        //     const tempArray = new Uint8Array(analyser.frequencyBinCount);
        
        //     analyser.getByteFrequencyData(tempArray);
        //     bars.push(getAverageVolume(tempArray));
    }

    async remove() {
        clearInterval(this.interval);
    }
}

export { AudioManager as default };