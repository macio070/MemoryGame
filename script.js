$(document).ready(function(){
    const cards = $(".card-container").children().length; //get the card amount
    
    const usedCards = new Set();
    function randomIndex(){
        let rand;
        do{
            rand = Math.floor(Math.random() * cards);
        } while(usedCards.has(rand));
        usedCards.add(rand);
        return rand;
    }
//STEP 1. Make random sets of images
    function setupGame(){
        const totalPairs = cards/2;
        for(let i = 1; i<=totalPairs; i++){
            //generate a pair of the same cards
            const cardIndex1 = randomIndex();
            const cardIndex2 = randomIndex();
            let backgroundClass;
            //generate a background class for said cards
            if(i < 10){
                backgroundClass = (`bg0${i}`);
            }
            else{   //future-proofing when there are more than 8 backgrounds
                backgroundClass = (`bg${i}`)
            }
// ! TEMP FIX ->>> CHANGE TO .back
            $(`.card:eq(${cardIndex1}) .back`).addClass(backgroundClass);
            $(`.card:eq(${cardIndex2}) .back`).addClass(backgroundClass);

            /* START ANIMATION */
            $(".card, .card-inner").css("animation", "startGame 5s forwards")
        }
    }

    setupGame();
    $(".card").css("pointer-events", "none");
    //turns off clicking for the duration of the start animation
    setTimeout(() => {
        $(".card").css("pointer-events", "auto");
    }, 5000); 

//STEP 2. Remove pairs, flip otherwise

    //each pair has the same bg
    //if bg doesn't match flip back

    let lastBackground = null;
    let clicks = 1;
    $(".card").click(function(){
        if($(this).hasClass("selected"));   //checks if the element has already been clicked
        else{
            $(this).addClass("selected");   //adds class "selected" to differentiate between clicked and non-clicked elements
            $(this).find(".card-inner").css("animation", "toBack .5s ease-out forwards");   //animation for card flip
            
            let currentBackground;
            let $back = $(this).find(".back");  //get current clicked element
            let classes = $back.attr("class").split(" ");   //store all its classes in an array
            console.log(classes);
            for(cls of classes){    //go through all classes
                if(cls.startsWith("bg")){   //if one of them contains the bg class
                    currentBackground = cls;    //it becomes the currentBackground
                    break;
                }
            }
            console.log(currentBackground);

            if(clicks <= 2){
                console.log("last background: ", lastBackground)
                console.log(`clicks: ${clicks}`)
                if(clicks === 1){
                    //if there is only one card clicked
                    lastBackground = currentBackground;
                }
                else{
                    //check if backgrounds are matching
                    if(currentBackground === lastBackground){
                        console.log(`backgrounds match: ${currentBackground}`);
                        let selectedElements = document.getElementsByClassName(currentBackground);  //select all elements with the same bg class
                        for(let element of selectedElements){
                            //animation for card disappearing
                            //TIMEOUT FOR FLIPPING ANIMATION TO FINISH (.5s)
                            setTimeout(() => {
                                $(element).parent().parent().css("animation", "disappear .6s forwards");
                            }, 500);
                            console.log(element);
                        }
                    }
                    //backgrounds do not match
                    else{
                        let selectedElements = document.getElementsByClassName("selected");
                        for(let element of selectedElements){
                            //TIMEOUT FOR FLIPPING ANIMATION TO FINISH (.5s)
                            setTimeout(() => {
                                $(element).find(".card-inner").css("animation", "toFront 0.6s forwards");
                            }, 500);
                        }
                    }
                    //resetting after 2 clicks
                    currentBackground = null;
                    lastBackground = null;
                    clicks = 0;
                    let selectedElements = document.getElementsByClassName("selected");
                    for(let element of selectedElements){
                        $(element).removeClass("selected");
                    }
                    
                }
            }
            clicks++
        }
    })
});