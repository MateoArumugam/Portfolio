function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }

  document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const catcher = document.getElementById('catcher');
    const fallingObjectsContainer = document.getElementById('falling-objects');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
  
    function createFallingObject() {
      const fallingObject = document.createElement('div');
      fallingObject.classList.add('falling-object');
      fallingObject.style.left = Math.random() * (gameContainer.offsetWidth - 50) + 'px';
      fallingObjectsContainer.appendChild(fallingObject);
      
      fallingObject.addEventListener('click', () => {
        fallingObject.remove();
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
      });
  
      let fallInterval = setInterval(() => {
        let top = parseFloat(fallingObject.style.top || '0');
        if (top + 50 >= gameContainer.offsetHeight) {
          fallingObject.remove();
          clearInterval(fallInterval);
        } else {
          fallingObject.style.top = top + 5 + 'px';
        }
      }, 50);
    }
  
    setInterval(createFallingObject, 1000);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const dog = document.getElementById('dog');
    const pawPrintsContainer = document.getElementById('paw-prints-container');
    const barkSound = document.getElementById('bark-sound');
    let lastPawPrintTime = 0;
    let mouseX = 0;
    let mouseY = 0;
  
    // Function to make the dog follow the cursor
    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX - dog.width / 2;
      mouseY = event.clientY - dog.height / 2;
    });
  
    // Function to leave paw prints at intervals
    document.addEventListener('mousemove', (event) => {
      const currentTime = Date.now();
      if (currentTime - lastPawPrintTime > 30) { // Adjust interval as needed
        lastPawPrintTime = currentTime;
  
        const pawPrint = document.createElement('div');
        pawPrint.className = 'paw-print';
        pawPrint.style.left = `${event.clientX}px`;
        pawPrint.style.top = `${event.clientY}px`;
        pawPrintsContainer.appendChild(pawPrint);
  
        // Remove paw print after some time
        setTimeout(() => {
          pawPrint.remove();
        }, 2000);
      }
    });
  
    // Function to make the dog bark when clicked
    dog.addEventListener('click', () => {
      barkSound.play();
    });
  
    // Function to smoothly move the dog
    function animateDog() {
      dog.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      requestAnimationFrame(animateDog);
    }
  
    animateDog();
  });
   // Function to hide popup message when scrolling down
   window.addEventListener('scroll', () => {
    if (window.scrollY > 100) { // Adjust scroll threshold as needed
      popupMessage.classList.add('hidden');
    }
  });

  const character = document.getElementById('character');
const waveSound = document.getElementById('wave-sound');

// Function to play the sound
function playWaveSound() {
  waveSound.play();
}

// Add click event listener to the character
character.addEventListener('click', playWaveSound);

// Function to make the character jump
function jumpCharacter() {
  character.style.transform = 'translateY(-50px)';
  setTimeout(() => {
    character.style.transform = 'translateY(0)';
  }, 300); // Duration of the jump animation
}

// Trigger the jump animation on click
character.addEventListener('click', jumpCharacter);

// Function to show the speech bubble
function showSpeechBubble() {
  const speechBubble = document.querySelector('.speech-bubble');
  speechBubble.classList.add('show');
  
  // Hide the speech bubble after 3 seconds
  setTimeout(() => {
    speechBubble.classList.remove('show');
  }, 3000);
}

// Add click event listener to show the speech bubble
character.addEventListener('click', showSpeechBubble);


// Throttle function to limit the rate at which the handleMouseMove function is called
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
          func.apply(context, args);
          lastRan = Date.now();
      } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(function() {
              if ((Date.now() - lastRan) >= limit) {
                  func.apply(context, args);
                  lastRan = Date.now();
              }
          }, limit - (Date.now() - lastRan));
      }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const eye = document.getElementById('eye');
  const contactSection = document.getElementById('contact');

  function checkSectionInView() {
      const rect = contactSection.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (inView) {
          eye.classList.remove('hidden');
          eye.style.display = 'block';
      } else {
          eye.classList.add('hidden');
          eye.style.display = 'none';
      }
  }

  function handleMouseMove(event) {
      if (!eye.classList.contains('hidden')) {
          const eyeRect = eye.getBoundingClientRect();
          const eyeCenterX = eyeRect.left + eyeRect.width / 2;
          const eyeCenterY = eyeRect.top + eyeRect.height / 2;

          const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
          const degrees = angle * (180 / Math.PI) + 90;
          eye.querySelector('img').style.transform = `rotate(${degrees}deg)`;
      }
  }

  window.addEventListener('scroll', checkSectionInView);
  document.addEventListener('mousemove', throttle(handleMouseMove, 30)); // Throttled at 30ms
});

