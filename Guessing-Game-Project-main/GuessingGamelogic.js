// this is the implemenation of the logic behind the game.
/*
Under the box is a picture.
Guess which one is it from those visible pictures and click it
For each wrong guess, your chances reduce (From 10 to 0).
if your guess is correct, your correct number increases(from 0 to 3)
Once your chances hit 0, you'll lose the game and if your correct guess hit 3, you'll win
The show button helps uncover the black box and see the picture under it, but you can only use it once in the game
*/
/**
 * Picture under the box is hidden at first,
 * after a picture is selected, the hidden picture automatically reveals itself... for this to work the 'z-index' has to change from 1 to 0(test).
 * if the picture is not what's underneath the chances counter reduces by 1.
 * if it's the picture is what's underneath it the correct counter moves from 0 to 1.
 * when the counter for the chances hit 0, the game ends(how)?
 * when the counter for the correct hits 3, the game is won, how?
 * The 'click here to learn how to play', tab will bring up an alert to show you the rules of the game.
 * the show button shows the image, just once and you can't use it anymore.
 */


//Now implementing the game logic
let chances = 10;
let correct = 0;
let showButtonUsed = false;




//Selecting elements
const gameContainer = document.getElementById("gameContainer"); //the entire Div where the game is based
const helpButton = document.getElementById("helpButton"); // The how to play button. 
const gameCard = document.getElementById("gameCard"); // check back.
const leftPanel = document.getElementById("leftPanel"); // the left panel that houses the mystery sign
const mysteryStage = document.getElementById("mysteryStage");
const mysteryDisplay = document.getElementById("mysteryDisplay");
const hiddenPanel = document.getElementById("hiddenPanel");
const rightPanel = document.getElementById("rightPanel");
const button1 = document.getElementById("pic1"); 
const button2 = document.getElementById("pic2");
const button3 = document.getElementById("pic3");
const button4 = document.getElementById("pic4");
const button5 = document.getElementById("pic5");
const button6 = document.getElementById("pic6");
const button7 = document.getElementById("pic7");
const button8 = document.getElementById("pic8");
const button9 = document.getElementById("pic9");
// const buttons = document.getElementsByClassName("thumgImg");
const chancesCounter = document.getElementById("chances");
const correctCounter = document.getElementById("correct");
const showButton = document.getElementById("revealButton");





// A function to create images 
function createImage(button, src, altText){
    const img = document.createElement('img');
    img.src = src;
    img.alt = altText;
    img.classList.add("thumbImg");
    //adding event Listener here
    img.addEventListener("click", () => {
        handleGuess(src);
    });
    button.appendChild(img);
    return img;
}

//the show button
showButton.addEventListener("click", () => {
    if(showButtonUsed) {
        alert('You have used the Show button');
        return;
    }
    mysteryStage.style.opacity = 0;
    showButtonUsed = true;
});

//How to play
helpButton.addEventListener("click", () => {
    alert(`
        Under the box is a picture.
        
        Guess which one is it from those visible pictures and click it
        
        For each wrong guess, your chances reduce (From 10 to 0).
        
        if your guess is correct, your correct number increases(from 0 to 3)
        
        Once your chances hit 0, you'll lose the game and if your correct guess hit 3, you'll win
        
        The show button helps uncover the black box and see the picture under it, but you can only use it once in the game
        `)
})

const image1 = createImage(button1, 'images/image1.jpeg', 'choice 1 image');
const image2 = createImage(button2, 'images/image2.jpeg', 'choice 2 image');
const image3 = createImage(button3, 'images/image3.jpeg', 'choice 3 image');
const image4 = createImage(button4, 'images/image4.jpeg', 'choice 4 image');
const image5 = createImage(button5, 'images/image5.jpeg', 'choice 5 image');
const image6 = createImage(button6, 'images/image6.jpeg', 'choice 6 image');
const image7 = createImage(button7, 'images/image7.jpeg', 'choice 7 image');
const image8 = createImage(button8, 'images/image8.jpeg', 'choice 8 image');
const image9 = createImage(button9, 'images/image9.jpeg', 'choice 9 image');


//making the mystery box, div generate random pictures.
const arrayOfPictures = ['images/image1.jpeg', 'images/image2.jpeg', 'images/image3.jpeg',
                        'images/image4.jpeg', 'images/image5.jpeg', 'images/image6.jpeg',
                        'images/image7.jpeg', 'images/image8.jpeg', 'images/image9.jpeg'];
const randomPlacements = Math.floor(Math.random() * arrayOfPictures.length);
let selectAtRandom = arrayOfPictures[randomPlacements];

//after randomizing, placing the random pictures into the div
const hiddenImg = document.createElement('img');
hiddenImg.src = selectAtRandom;
hiddenImg.alt = "Random picture";
hiddenImg.classList.add("leftHiddenPanel");
hiddenPanel.appendChild(hiddenImg);

//linking the counters
function updateCounters(){
    chancesCounter.textContent = chances;
    correctCounter.textContent = correct;
}

function pickNewHiddenImage(){
    //filter out current image shown
    const possibleImages = arrayOfPictures.filter(path => path !== selectAtRandom);

    //pick from the ones left.
    const newPicturesArray = Math.floor(Math.random() * possibleImages.length);
    const newHidden = newPicturesArray[newPicturesArray];

    selectAtRandom = newHidden;
    hiddenImg.src = selectAtRandom;
}



//Logic to handle the guessing
function handleGuess(selectedPath) {
  if (selectedPath === selectAtRandom) {
    // Reveal when correct
    mysteryStage.style.zIndex = 0;

    correct++;
    chances--;
    updateCounters();

    if (correct >= 3) {
      alert("You have won the game!");
      location.reload();
      return;
    }

    setTimeout(() => {
        mysteryStage.style.zIndex = 1;
        pickNewHiddenImage();
    }, 1000);
    // After short reveal, hide and change picture
  } else {
    // Wrong guess, no reveal, just reduce chances
    chances--;
    updateCounters();

    if (chances <= 0) {
      alert("Game Over");
      location.reload();
    }
  }
}










