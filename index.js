// hold colors
buttonColours = ["red","blue","green","yellow"];

// game pattern
gamePattern = [];
userClickPattern = []
var started = false;
level = 0

// Start the game
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

// User click
$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id");
    userClickPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickPattern.length-1);
});

// Check Answer
function checkAnswer(CurrentLevel){
    if(gamePattern[CurrentLevel] === userClickPattern[CurrentLevel]){
        console.log("success");
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// Make function next secquence
function nextSequence(){
    level += 1;
    $("#level-title").text("level" + level);

    userClickPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    
    $("#" + randomChoosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
}

// play sound when click
function playSound(name){
    var Soundcolor = new Audio("sounds/" + name + ".mp3");
    Soundcolor.play();
}

// give animate when press
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    $("#level-title").text("Game Over! Press any key!");
    gamePattern = [];
    started = false;
    userClickPattern = [];
}

/*

$(".btn").click(function(event){
    userChoosenColor = event.target.id;
    userClickPattern.push(userChoosenColor);
});

nextSequence();

*/