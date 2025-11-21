// app.js - Proyecto 001 (Brazo Hidráulico)
// Funcionalidades: pasos gamificados, progreso, galería modal, compartir, confeti

// --- Helpers confeti
function lanzarConfeti(){
  const total = 40;
  for(let i=0;i<total;i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random()*100 + 'vw';
    c.style.top = '-10vh';
    c.style.background = `hsl(${Math.random()*360},70%,50%)`;
    c.style.transform = `rotate(${Math.random()*360}deg)`;
    document.body.appendChild(c);
    c.style.transition = 'transform 1.6s linear, top 1.6s linear, opacity 1.6s linear';
    requestAnimationFrame(()=>{
      c.style.top = (80 + Math.random()*30) + 'vh';
      c.style.opacity = 0;
    });
    setTimeout(()=>c.remove(),1800);
  }
}

// --- Pasos interactivos y progreso
const steps = document.querySelectorAll('#steps li');
const progressEl = document.getElementById('progressPercent');

function actualizarProgreso(){
  const total = steps.length;
  const done = [...steps].filter(s=>s.classList.contains('completed')).length;
  const pct = Math.round((done/total)*100);
  progressEl.textContent = pct + '%';
  if(pct === 100) lanzarConfeti();
}

steps.forEach(li=>{
  li.addEventListener('click', ()=>{
    li.classList.toggle('completed');
    actualizarProgreso();
  });
});
actualizarProgreso();

// --- Galería modal
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const thumbs = document.querySelectorAll('.thumb img');
thumbs.forEach(img=>{
  img.addEventListener('click', ()=>{
    modalImg.src = img.src;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  });
});
modal.addEventListener('click', ()=>{
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
});

// --- Compartir
const shareBtn = document.getElementById('shareBtn');
const btnShareReto = document.getElementById('btnShareReto');

function compartirTexto(){
  const datos = {
    title: 'Reto: Brazo Hidráulico',
    text: 'Construye un brazo hidráulico con tu hijo hoy. Mira los pasos y comparte tu resultado en #PequeñosIngenieros',
    url: window.location.href
  };
  if(navigator.share){
    navigator.share(datos).catch(()=>{});
  } else {
    // fallback: copiar al portapapeles
    navigator.clipboard?.writeText(`${datos.title} - ${datos.url}`);
    alert('Enlace copiado al portapapeles. ¡Compártelo en tus redes!');
  }
}
shareBtn?.addEventListener('click', compartirTexto);
btnShareReto?.addEventListener('click', compartirTexto);

// --- Inicialización simple
window.addEventListener('load', ()=>{
  // accesibilidad: permitir cerrar modal con ESC
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') modal.classList.remove('show'); });
});
