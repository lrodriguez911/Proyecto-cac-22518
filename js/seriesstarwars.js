/* CAMBIO DE ICONO SONIDO */

function togglePlay(video) {
    let audio = document.getElementsByTagName("audio")[0];
    if (audio) {
      if (audio.paused) {
          audio.play();
          document.getElementById("button").src = "../images/sound2.ico";
      } else {
          audio.pause();
          document.getElementById("button").src = "../images/muted.ico";
      }
    }
  }

