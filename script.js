/* =========================
   OPEN WEBSITE
========================= */

function openWebsite() {

    document.getElementById("opening")
        .classList.add("hide");

    launchConfetti();

    playMusic();

}


/* =========================
   FLOATING HEARTS
========================= */

const hearts = document.getElementById("hearts");

const heartSymbols = [
    "♡", "♥", "💕", "🌸", "✿"
];

function createHeart() {

    const heart = document.createElement("span");

    heart.className = "heart";

    heart.innerHTML =
        heartSymbols[
            Math.floor(Math.random() * heartSymbols.length)
        ];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (15 + Math.random() * 20) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 8) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 14000);

}

setInterval(createHeart, 600);


/* =========================
   MAKE A WISH
========================= */

function makeWish() {

    const message =
        document.getElementById("wishMessage");

    message.style.display = "block";

    launchConfetti();

}


/* =========================
   OPEN GIFT
========================= */

function openGift() {

    const message =
        document.getElementById("surpriseMessage");

    if (message.style.display === "block") {
        return;
    }

    message.style.display = "block";

    launchConfetti();

    document.getElementById("gift").innerHTML = "💝";

}


/* =========================
   CONFETTI ANIMATION
========================= */

function launchConfetti() {

    const symbols = [
        "💗", "✨", "🌸", "🎀", "💕", "⭐"
    ];

    for (let i = 0; i < 45; i++) {

        const confetti =
            document.createElement("div");

        confetti.className = "confetti";

        confetti.innerHTML =
            symbols[
                Math.floor(Math.random() * symbols.length)
            ];

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.fontSize =
            (15 + Math.random() * 20) + "px";

        confetti.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);

    }

}


/* =========================
   BACKGROUND MUSIC
========================= */

let audioContext;

let musicInterval;

let noteIndex = 0;

let musicPlaying = false;

const melody = [
    523.25, 587.33, 659.25, 523.25,
    698.46, 659.25, 587.33, 523.25,
    587.33, 659.25, 783.99, 698.46
];

function playMusic() {

    if (musicPlaying) return;

    try {

        if (!audioContext) {

            audioContext = new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        musicPlaying = true;

        document.getElementById("musicBtn").innerHTML = "♫";

        musicInterval = setInterval(() => {

            const oscillator =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();

            oscillator.type = "sine";

            oscillator.frequency.value =
                melody[noteIndex % melody.length];

            gain.gain.setValueAtTime(
                0.08,
                audioContext.currentTime
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.45
            );

            oscillator.connect(gain);

            gain.connect(audioContext.destination);

            oscillator.start();

            oscillator.stop(
                audioContext.currentTime + 0.45
            );

            noteIndex++;

        }, 500);

    } catch (error) {

        console.log("Audio is not supported.");

    }

}


/* =========================
   STOP MUSIC
========================= */

function stopMusic() {

    clearInterval(musicInterval);

    musicPlaying = false;

    if (audioContext) {
        audioContext.suspend();
    }

    document.getElementById("musicBtn").innerHTML = "♪";

}


/* =========================
   TOGGLE MUSIC
========================= */

function toggleMusic() {

    if (musicPlaying) {

        stopMusic();

    } else {

        playMusic();

    }

}
