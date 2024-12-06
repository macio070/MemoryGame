$(document).ready(function(){
    /* ANIMATIONS */
    $(".card, .card-inner").css("animation", "toFront 5s forwards")
    $(".card").click(function () {
        $(this).find(".card-inner").css("animation", "toBack .6s forwards");
    });
    
    /* -END- ANIMATIONS */

        // Array to store used card indices to avoid duplicates
        const usedCards = new Set();
    
        // Function to generate a unique random number between 0 and 15
        function generateUniqueCardIndex() {
            let index;
            do {
                index = Math.floor(Math.random() * 16);
            } while (usedCards.has(index));
            usedCards.add(index);
            return index;
        }
    
        // Function to assign backgrounds to random pairs of cards
        function setupGame() {
            const totalPairs = 8;
    
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
    
        // Initialize the game
        setupGame();
    
});