$(document).ready(function () {

    //set-up for difficulty levels (instead of 16 it's a variable 
    //that checks how many cards are in a container)
    const cards = $(".card-container").children().length;

    /* ANIMATIONS */
    $(".card, .card-inner").css("animation", "toFront 5s forwards")
    $(".card").click(function () {
        $(this).find(".card-inner").css("animation", "toBack .6s forwards");
    });

    /* -END- ANIMATIONS */


    /* RANDOM CARDS PLACEMENT */
    // Array to store used card indices to avoid duplicates
    const usedCards = new Set();

    // Function to generate a unique random number between 0 and 15
    function generateUniqueCardIndex() {
        let rand;
        do {
            rand = Math.floor(Math.random() * cards);
        } while (usedCards.has(rand));
        usedCards.add(rand);
        return rand;
    }

    // Function to assign backgrounds to random pairs of cards
    function setupGame() {
        const totalPairs = cards / 2;

        for (let i = 1; i <= totalPairs; i++) {
            // Select two unique cards
            const cardIndex1 = generateUniqueCardIndex();
            const cardIndex2 = generateUniqueCardIndex();

            // Assign the same background to the back of both cards
            const backgroundClass = `bg0${i}`;
            $(`.card:eq(${cardIndex1}) .back`).addClass(backgroundClass);
            $(`.card:eq(${cardIndex2}) .back`).addClass(backgroundClass);
        }
    }
    /* -END- RANDOM CARDS PLACEMENT */

    // Initialize the game
    setupGame();


    /* REMOVING CARDS */
    let storedClass = null;
    $(".card").click(function () {
        let matchedClass = null;
        let $back = $(this).find(".back"); // Find the .back element inside the clicked .card
        let classes = $back.attr("class").split(" "); // Get all the classes of the back element
    
        // Loop through the classes and check for any class starting with "bg"
        for (let cls of classes) {
            if (cls.startsWith("bg")) {
                matchedClass = cls; // Store the matched background class
                break; // Exit loop once a match is found
            }
        }
        //matchedClass contains the bg class of clicked element
        if (matchedClass) {
            console.log(`Matched class: ${matchedClass}`);
            
            // Compare with storedClass
            if (storedClass) {
                if (storedClass === matchedClass) {
                    console.log("The classes match!");
                } else {
                    console.log("The classes don't match.");
                }
            }
    
            // Save the matched class for future comparisons
            storedClass = matchedClass;
            //TODO
                //remove cards with the same background
        } else {
            console.log("No background class found.");
        }
    })
});