
// FIREWORKS ANIMATION
const canvas = document.createElement("canvas");
canvas.id = "fireworks";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const canvasStyle = document.createElement("style");
canvasStyle.textContent = `
#fireworks {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
}
`;
document.head.appendChild(canvasStyle);

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.55;
    const colors = ["#ffd700", "#ff5e5e", "#ffffff", "#ff9f1c"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 45; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;

        particles.push({
            x, y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            life: 65,
            color
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
        p.x += p.dx;
        p.y += p.dy;
        p.dy += 0.025;
        p.life--;

        ctx.globalAlpha = p.life / 65;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) particles.splice(index, 1);
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}

setInterval(createFirework, 900);
animate();

// REAL DIWALI MP3 MUSIC
const song = document.getElementById("diwaliSong");
const musicBtn = document.getElementById("musicBtn");
const crackerBtn = document.getElementById("crackerBtn");

async function startMusic() {
    try {
        await song.play();
        musicBtn.textContent = "⏸ Stop Diwali Music";
    } catch (error) {
        musicBtn.textContent = "🎵 Tap to Start Music";
    }
}

musicBtn.addEventListener("click", async () => {
    if (!song.paused) {
        song.pause();
        musicBtn.textContent = "🎵 Play Diwali Music";
    } else {
        await startMusic();
    }
});

// Try autoplay when the website opens
window.addEventListener("load", startMusic);

// CRACKERS SOUND
let crackerAudio = new Audio("alex_jauk-firecrackers-178799.mp3");

crackerAudio.preload = "auto";
crackerAudio.volume = 0.65;
crackerBtn.addEventListener("click", () => {
    crackerAudio.currentTime = 0;
    crackerAudio.play().catch(() => {
        crackerBtn.textContent = "Tap again to play";
    });
});

/* DIWALI INVITATION OPENING ANIMATION */

const welcomeScreen = document.getElementById("welcomeScreen");
const openInvitation = document.getElementById("openInvitation");

openInvitation.addEventListener("click", async () => {

    welcomeScreen.classList.add("hide");

    // Start Diwali music after visitor clicks
    const song = document.getElementById("diwaliSong");

    if (song && song.paused) {
        try {
            await song.play();
        } catch (error) {
            console.log("Music could not start:", error);
        }
    }

});

/* PERSONALIZED WHATSAPP DIWALI WISHES */

const visitorName = document.getElementById("visitorName");
const whatsappShare = document.getElementById("whatsappShare");

whatsappShare.addEventListener("click", () => {

    const name = visitorName.value.trim();

    if (name === "") {
        alert("Please enter your name first! 🪔");
        visitorName.focus();
        return;
    }

const message = `
🪔✨ दीपावलीच्या हार्दिक शुभेच्छा! ✨🪔

प्रिय ${name} आणि परिवार,

तुमच्या आयुष्यात सुख, शांती, आनंद,
आरोग्य आणि समृद्धी नांदो.

ही दीपावली तुमच्यासाठी नवीन आशा,
नवीन स्वप्नं आणि भरपूर आनंद घेऊन येवो! ❤️

🌸 मेथे परिवाराकडून तुम्हाला व तुमच्या
संपूर्ण परिवाराला दीपावलीच्या हार्दिक शुभेच्छा! 🌸

🎆 आमच्या खास दिवाळी शुभेच्छा पाहण्यासाठी भेट द्या:
${window.location.href}

प्रेमपूर्वक,
मेथे परिवार 🪔
`;
    const whatsappURL =
        "https://wa.me/?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

});
