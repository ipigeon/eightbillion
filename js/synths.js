
Tone = require('tone');

let unid = new Tone.Sampler({
    urls: {
        C2: "singing_bowl.wav"
    },
    baseUrl: "/samples/singingbowl/",
    attack: 1,
    release: 1,
    curve: "linear",
    volume: -14,
}).toDestination();

unid.name = "Unidades";

let dece = new Tone.Synth({
    oscillator: {
        detune: 0,
        type: "sine",
        phase: 0,
    },
    envelope: {
        attack: 0.2,
        decay: 0.05,
        sustain: 0.2,
        release: 0.1,
    }
});
dece.name = "Decenas";

let cent= new Tone.Synth({
    oscillator: {
        type: "sine"
    },
}).toDestination();
cent.name = "Centenas";

let hydro = new Tone.Sampler({
    urls: {
        G3: "piano_G3_pp_RR2.wav",
        G4: "piano_G4_pp_RR2.wav",
    },
    baseUrl: "/samples/piano/",
});
hydro.name = "Hydro";

let mils = new Tone.Sampler({
    urls: {
        C3: "cello_C3_short.mp3",
        D4: "cello_D4_short.mp3",
    },
    baseUrl: "/samples/cello/",
    curve: "linear",
    attack: 0.1,
});
mils.name = "Miles";

let dmil = new Tone.FMSynth({
    harmonicity: 2,
});
dmil.name = "Diezmiles";

let cmil = new Tone.Sampler({
    urls: {
        C1: "MOHorn_sus_C1_v1_1.wav",
        A2: "MOHorn_sus_A2_v2_1.wav",
        C3: "MOHorn_sus_C3_v1_1.wav",
        D4: "MOHorn_sus_D4_v1_1.wav",
    },
    baseUrl: "/samples/frenchhorn/",
    curve: "linear",
    attack: 0.1,
});
cmil.name = "Cienmiles";


// Effects rack

const compressor = new Tone.Compressor(-50, 1);
const pingpongDelay = new Tone.PingPongDelay("8n", 0.5);
const chorus = new Tone.Chorus(4, 2.5, 0.5);
const distortion = new Tone.Distortion(0.1)

wind.chain(pingpongDelay, Tone.Destination);
coal.chain(Tone.Destination);
gas.chain(chorus, Tone.Destination);
hydro.chain(chorus, Tone.Destination);
battery.chain(Tone.Destination);
solar.chain(Tone.Destination);
compressor.toDestination();
