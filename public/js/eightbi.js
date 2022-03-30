/*  
 *  ::8billions::  
 *  a generative cound composition based on the realtime estimations of 
 *  the number of people on earth
 *  by .i n t e r s p e c i f i c s.
 *  
 *  
 *  code alchemy:
 *  @e at 2022.03.30
 */ 

// v0.1 chords as list in a loop based on https://github.com/nielsenjared/in-g
//    . get currentCountFloat and currentCountInt
// v0.2 trigger notes with events in object after https://glitch.com/~tone-pendulum
//    . object Instrument
//    . digit change detection
//    . event trigger



// -            -----------------------------------------------------------
var currentCountFloat = 0;
var currentCountInt = 0;
var freqUpdate = 0;
var periodUpdate = 0;
var recData = [];
let nDigits = 10;
let prevDigits = [];

// -            -----------------------------------------------------------
let masterVolume = -6; // in decibel.
let ready = false;
var instruments = [];
let scale;
let mixer;



function updateCountPeriod(){
    currentCountInt += 1;
    $("#counter-int").html(`<p><b>${currentCountInt}</b></p>`);
    // -parse digits
    var digits = currentCountInt.toFixed(0);
    $("#digits-int-list").empty();
    for (let i = 0; i < nDigits; i++) {
        cdig = digits.charAt(i);
        $("#digits-int-list").append("<li>digit at position "+(i+1).toString()+":  \t\t<b>"+cdig+"</b>"+"</li>");
    } 
}

function updateCountFreq(){
    currentCountFloat += freqUpdate;
    $("#counter-float").html(`<p><b>${currentCountFloat}</b></p>`);
    // -parse digits
    var digits = currentCountFloat.toFixed(0);
    $("#digits-float-list").empty();
    for (let i = 0; i < nDigits; i++) {
        // -update
        cdig = digits.charAt(i);
        $("#digits-float-list").append("<li>digit at position "+(i+1).toString()+":  \t\t<b>"+cdig+"</b>"+"</li>");
        // -check if different
        if (cdig!=prevDigits[i] && i>6){    // run only 4 last instruments, could trigger differently
            instruments[i].trig(cdig);
        }
        prevDigits[i] = cdig;
    }
}

// -            -----------------------------------------------------------


function initializeAudio() {
    // -set some params for mixer and effect
    Tone.Master.volume.value = masterVolume;
    mixer = new Tone.Gain();
    let reverb = new Tone.Reverb({
      wet: 0.6, // half dry, half wet mix
      decay: 30 // decay time in seconds
    });
    // -audio chain is: synth[s] -> mixer -> reverb -> Tone.Master
    mixer.connect(reverb);
    reverb.toDestination();
    
    // -scale flavours: major, minor, major pentatonic, the modes, ie dorian, phrygian.  -> Tonal.ScaleType.names() documentation
    let flavour = "minor pentatonic";
    scale = Tonal.Scale.get("C3 " + flavour).notes;
    scale = scale.concat(Tonal.Scale.get("C4 " + flavour).notes);
    scale = scale.concat(Tonal.Scale.get("C5 " + flavour).notes);
    // shuffle to mixup the notes
    Tonal.Collection.shuffle(scale);

    // create as many instruments as digits (or groups)
    for (let i=0; i<nDigits; i++){
        instruments[i] = new Instrument(i, scale[i]);
    }
}


function setup(){
    // -sync with server data
    $.get('/sync', function(data){
        recData = data;
        // -parse and update
        currentCountFloat = parseFloat(recData[0]);
        currentCountInt = parseInt(recData[0]);
        freqUpdate = parseFloat(recData[1]);
        periodUpdate = 1000 / parseFloat(recData[1]);
        console.log(data);
        $("#counter-int").html(`${currentCountInt}`);
        $("#counter-float").html(`${currentCountFloat}`);
        // -set timer functions
        setInterval(updateCountFreq, 1000);
        setInterval(updateCountPeriod, periodUpdate);   
    });
    // -set other messages
    $("#other-message").html("<br><br><br><p> .[...]. </p>");
    // -maybe a canvas
    //createCanvas(windowWidth, windowHeight);
    // -then start the audio engine
    if (!ready) {
        initializeAudio();
        ready = true;
    }
};



// -            -----------------------------------------------------------
class Instrument {
    // runs when we call "= new Pendulum()"
    constructor(id, baseNote) {
        this.id = id;
        this.baseNote = baseNote;
        this.flavour = "minor pentatonic";
        this.scale = Tonal.Scale.get(this.baseNote+ " " + this.flavour).notes;
        this.scale = this.scale.concat(Tonal.Scale.get(this.baseNote + " " + this.flavour).notes);
        //
        this.synth = new Tone.Synth();
        this.synth.connect(mixer);
    };

    trig(jScale){
        //this.synth.triggerAttackRelease(this.scale[jScale], "8n");
        this.synth.triggerAttack(this.scale[jScale], 0.9192);
    };
};



// -            -----------------------------------------------------------
function windowResized() {
    //resizeCanvas(windowWidth, windowHeight);
};
