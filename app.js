document.addEventListener("DOMContentLoaded", function () {
  const dino = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const alert = document.getElementById("alert");
  let gravity = 0.9;
  let isJumping = false;
  let isGameOver = false;

  function control(e) {
    if (e.code === "Space") {
      if (!isJumping) {
        jump();
      }
    }
    }
    
    document.addEventListener("keydown", control);

  let position = 0;

  // Jump function
  function jump() {
    isJumping = true;
    let count = 0;
    let timerId = setInterval(function () {
      // Move down
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 5;
          count--;
          position = position * gravity;
          dino.style.bottom = position + "px";
        }, 20);
      }

      // Move Up
      position += 30;
      count++;
      position = position * gravity;
      dino.style.bottom = position + "px";
    }, 20);
  }

  // Generate Obstacles
  function generateObstacles() {
    if (!isGameOver) {
      let randomTime = (Math.random() * 2000) + 1000;
      let obstaclePosition = 2000;
      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + "px";

      let timerId = setInterval(function () {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
          clearInterval(timerId);
          alert.innerHTML = "Game Over";
          isGameOver = true;

          // Remove all children
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
          }
        }

        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + "px";
      }, 20);
        
      setTimeout(generateObstacles, randomTime);
    }
  }

  generateObstacles();

});
