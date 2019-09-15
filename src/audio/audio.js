import { throttle } from 'lodash'

class AudioManager {
    mediaRecorder = null;

    audioBlob = null;
    audioChunks = [];

    async initialize() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.addEventListener("dataavailable", event => {
            this.audioChunks.push(event.data);
        });

        this.mediaRecorder.start();

        this.mediaRecorder.addEventListener("stop", () => {
            this.audioBlob = new Blob(this.audioChunks);

            const audioUrl = URL.createObjectURL(this.audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        });

        this._setupVolume(stream);
    }

    _upload = throttle(async (self) => {
        self.mediaRecorder.stop();

        self.audioChunks = [];

        if (self.audioBlob !== null) {
            const arrayBuffer = await self.audioBlob.arrayBuffer();
            const audioBlob = new Buffer(arrayBuffer, 'binary' ).toString('base64');
            // firebase.firestore().collection('audio_blobs').doc('blob').set({ blob: audioBlob });
        }

        self.mediaRecorder.start();
        
    }, 3000, { 'leading': true, 'trailing': false });

    _setupVolume(stream) {
        const getAverageVolume = array => {
            const length = array.length;
            let values = 0;
            let i = 0;
        
            for (; i < length; i++) {
                values += array[i];
            }
        
            return values / length;
        }

        const audioContext = new AudioContext();
        const input = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        const scriptProcessor = audioContext.createScriptProcessor();
    
        // Some analyser setup
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 1024;
        
        input.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        let bars = [];

        scriptProcessor.onaudioprocess = audioProcessingEvent => {
            const tempArray = new Uint8Array(analyser.frequencyBinCount);
        
            analyser.getByteFrequencyData(tempArray);

            const volume = getAverageVolume(tempArray);

            if (bars.length > 50) {
                const average = bars.reduce((a, b) => a + b, 0) / bars.length;
                bars = bars.slice(1);
                console.log(average, bars[bars.length - 1])
                if (volume < average) {
                    this._upload(this);
                }
            }

            bars.push(volume);
        }
    }
}

export { AudioManager as default };