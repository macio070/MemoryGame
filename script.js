$(document).ready(function(){
    //amount of cards
    const cards = $(".card-container").children().length;
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
            $(`.card:eq(${cardIndex1}) .front`).addClass(backgroundClass);
            $(`.card:eq(${cardIndex2}) .front`).addClass(backgroundClass);
        }
    }

    setupGame();

//STEP 2. Remove pairs, flip otherwise

    //each pair has the same bg
    //if bg doesn't match flip back

    let lastBackground = null;
    let clicks = 1;
    $(".card").click(function(){
        let currentBackground;

        let $back = $(this).find(".front");
        let classes = $back.attr("class").split(" ");
        console.log(classes);
        for(cls of classes){
            if(cls.startsWith("bg")){
                currentBackground = cls;
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
                    for(let i = 0; i < selectedElements.length; i++){
                        //animation for card disappearing
                        $(selectedElements[i]).parent().parent().css("animation", "disappear 1s forwards");
                        console.log(selectedElements[i]);
                    }
                }
                currentBackground = null;
                lastBackground = null;
                clicks = 0;
                
            }
        }
        clicks++
    })
});