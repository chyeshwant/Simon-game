var gamepattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  console.log("userClickedPattern :" + userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkanswer(userClickedPattern.length - 1);
});

function checkanswer(pos) {

  if (userClickedPattern[pos] === gamepattern[pos]) {

    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }

  else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    level=0;
    gamepattern=[];
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$("body").on("keypress", nextSequence);

function nextSequence() {
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  randomChosenColour = buttonColours[randomNumber];

  gamepattern.push(randomChosenColour); //gamepattern[(gamepattern.length)-1]=randomChosenColour;
  console.log("gamepattern :" + gamepattern);
  $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
  playSound(randomChosenColour);

  //var audio=new Audio("sounds/"+randomChosenColour+".mp3");
  //audio.play();

  //setInterval(function()
  //{
  //$("#"+randomChosenColour).fadeOut();
  //$("#"+randomChosenColour).fadeIn();
  //},500);
}
