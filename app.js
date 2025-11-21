// ##############################################
// Pequeños Ingenieros - app.js final
// Render de proyectos • Buscador • Compartir
// ##############################################

const proyectos = [
  {
    id: "001",
    titulo: "Brazo Hidráulico",
    desc: "Reto familiar: construyan juntos un brazo hidráulico casero y diviértanse mientras aprenden STEM",
    link: "proyecto001/index.html"
  },{
    id: "002",
    titulo: "Puente Elevadizo",
    desc: "Mecánica simple y poleas (proximo reto)",
    link: "#"
  }
];

// Render dinámico
function cargarProyectos(){
  const cont = document.getElementById("contenedor-proyectos");
  cont.innerHTML = "";

  proyectos.forEach(p=>{
    cont.innerHTML += `
      <a href="${p.link}" class="card">
        <h3>${p.titulo}</h3>
        <p>${p.desc}</p>
      </a>
    `;
  });
}

// Buscador
document.getElementById("buscador")?.addEventListener("input", e=>{
  const q = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(c=>{
    const text = c.textContent.toLowerCase();
    c.style.display = text.includes(q) ? "block" : "none";
  });
});

// Compartir sitio
function compartirSitio(){
  if(navigator.share){
    navigator.share({
      title:"Pequeños Ingenieros",
      text:"Reto para padres: construye un proyecto STEM con tus hijos hoy.",
      url:window.location.href
    });
  } else {
    alert("Tu dispositivo no soporta compartir.");
  }
}

// Compartir reto
function compartirReto(){
  if(navigator.share){
    navigator.share({
      title:"Reto STEM — Pequeños Ingenieros",
      text:"Te reto a construir un proyecto con tus hijos. Aquí están las ideas:",
      url:window.location.href
    });
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", cargarProyectos);


