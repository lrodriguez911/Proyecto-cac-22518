/* CAMBIO DE ICONO SONIDO */
function togglePlay(video) {
    var audio = document.getElementsByTagName("audio")[0];
function togglePlay() {
    let audio = document.getElementsByTagName("audio")[0];
    if (audio) {
      if (audio.paused) {
          audio.play();
          document.getElementById("button").src = "/images/sound2.ico";
      } else {
          audio.pause();
          document.getElementById("button").src = "/images/muted.ico";
      }
    }
  }

/* Barra hamburguesa */
/* Barra */
  const nav = document.querySelector('nav')

  document.querySelector('#burger').addEventListener('click',(e) => {
    e.currentTarget.classList.toggle("active")
    nav.classList.toggle('show')
  })