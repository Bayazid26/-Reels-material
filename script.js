const planets = [
  { name:"Mercury", img:"https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg", tilt:"0.03°", gravity:"0.38x", moons:"0" },
  { name:"Venus",   img:"https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",       tilt:"177.4°", gravity:"0.91x", moons:"0" },
  { name:"Earth",   img:"https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg", tilt:"23.4°", gravity:"1.00x", moons:"1" },
  { name:"Mars",    img:"https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg", tilt:"25.2°", gravity:"0.38x", moons:"2" },
  { name:"Jupiter", img:"https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",                 tilt:"3.1°",  gravity:"2.53x", moons:"95" },
  { name:"Saturn",  img:"https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",   tilt:"26.7°", gravity:"1.07x", moons:"146" },
  { name:"Uranus",  img:"https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",                 tilt:"97.8°", gravity:"0.89x", moons:"28" },
  { name:"Neptune", img:"https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg",            tilt:"28.3°", gravity:"1.14x", moons:"16" }
];

const planetEl  = document.getElementById("planet");
const nameEl    = document.getElementById("planetName");
const tiltEl    = document.getElementById("statTilt");
const gravEl    = document.getElementById("statGravity");
const moonEl    = document.getElementById("statMoons");
const arcLabels = document.getElementById("arcLabels");

const CX = 220, CY = 220, R = 195;
const STEP = 360 / planets.length;

let current = 3; // Mars, to match the reference shot
let autoRotate;

function normalize(a){
  a = a % 360;
  if (a > 180) a -= 360;
  if (a < -180) a += 360;
  return a;
}

function renderLabels(){
  arcLabels.innerHTML = "";

  planets.forEach((p, i) => {
    // position angle: -90 = top (12 o'clock), increases clockwise
    const posAngle = -90 + (i - current) * STEP;
    const rad = (posAngle * Math.PI) / 180;
    const x = CX + R * Math.cos(rad);
    const y = CY + R * Math.sin(rad);

    // tangent rotation, auto-flipped so the label is never upside-down
    let rot = normalize(posAngle + 90);
    if (rot > 90 || rot <= -90) rot = normalize(rot + 180);

    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", x);
    t.setAttribute("y", y);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("transform", `rotate(${rot} ${x} ${y})`);
    t.setAttribute("class", "arc-label" + (i === current ? " active" : ""));
    t.textContent = p.name;
    t.addEventListener("click", () => { selectPlanet(i); stopAuto(); });
    arcLabels.appendChild(t);
  });
}

function selectPlanet(index){
  current = index;
  const p = planets[index];

  planetEl.src = p.img;
  nameEl.textContent = p.name;
  tiltEl.textContent = p.tilt;
  gravEl.textContent = p.gravity;
  moonEl.textContent = p.moons;

  renderLabels();
}

function startAuto(){
  autoRotate = setInterval(() => {
    selectPlanet((current + 1) % planets.length);
  }, 3000);
}

function stopAuto(){
  clearInterval(autoRotate);
}

selectPlanet(current);
startAuto();