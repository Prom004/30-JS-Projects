let time = 0;
let timer;
let running = false;
const display = document.getElementById("count");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

function updateCounter() {
   const mins = Math.floor(time / 60);
   const secs = time % 60;
   display.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
function startCounter() {
   if (!running) {
      running = true;
      time = 0;
    //   updateCounter();
      timer = setInterval(() => {
         time++;
         updateCounter();
      }, 1000);
   }
}
function stopCounter() {
    running = false;
    time = 0;
    // updateCounter();
    clearInterval(timer);
}
function resetTimer() {
    stopCounter();
    time = 0;
    updateCounter();
}

startBtn.addEventListener("click", startCounter);
stopBtn.addEventListener("click", stopCounter);
resetBtn.addEventListener("click", resetTimer);

updateCounter();