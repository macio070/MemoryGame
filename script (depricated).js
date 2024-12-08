$(document).ready(function () {

    //set-up for difficulty levels (instead of 16 it's a variable 
    //that checks how many cards are in a container)
    const cards = $(".card-container").children().length;

    /* ANIMATIONS */
    $(".card, .card-inner").css("animation", "startGame 5s forwards")
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
    $(".card").css("pointer-events", "none");
    setTimeout(() => {
        $(".card").css("pointer-events", "auto");
    }, 5000); 
    
    /* REMOVING CARDS */
    let storedClass = null; // Store the class of the first clicked card
    let firstElement = null; // Store the first clicked card
    let isAnimating = false; // To prevent clicking during animations

    $(".card").click(function () {
        if (isAnimating || $(this).hasClass("matched")) return; // Prevent clicking during animation or on already matched cards

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

        if (matchedClass) {
            console.log(`Matched class: ${matchedClass}`);

            // Flip the clicked card
            $(this).find(".card-inner").css("animation", "toBack 0.6s forwards");

            // Compare with storedClass
            if (storedClass) {
                isAnimating = true; // Prevent further clicks during comparison

                if (storedClass === matchedClass) {
                    console.log("The classes match!");

                    // Add a "matched" class to both cards to prevent future interaction
                    setTimeout(() => {
                        $(this).addClass("matched").css("visibility", "hidden");
                        firstElement.addClass("matched").css("visibility", "hidden");
                        isAnimating = false; // Re-enable clicking
                    }, 1000); // Match animation duration
                } else {
                    console.log("The classes don't match.");

                    // Flip both cards back after a delay
                    setTimeout(() => {
                        $(this).find(".card-inner").css("animation", "toFront 0.6s forwards");
                        firstElement.find(".card-inner").css("animation", "toFront 0.6s forwards");
                        isAnimating = false; // Re-enable clicking
                    }, 1000); // Flip-back animation duration
                }

                // Reset for the next pair
                storedClass = null;
                firstElement = null;
            } else {
                // Save the matched class and element for the next click
                storedClass = matchedClass;
                firstElement = $(this);
            }
        }
    });
});