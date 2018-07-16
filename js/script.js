$(document).ready(function(){

    // PP - Player vs Player
    // CP - Computer vs Player
    // AUTO - Computer vs Computer
    const MODE_GAME = "CP";

    let player = "white";

    let but = null;

    function checkPlayer(object) {
        if(object.classList.contains("black")) {
            return "black";
        }
        else if(object.classList.contains("white"))
        {
            return "white";
        }
    }
    
    function atack() {
        
    }
    
    function step() {

    }

    // if cell has coordinates, then at this cell posible move
    function isMoviableCell(cell) {
        if(cell.getAttribute("x"))
            return true;
        else
            return false;
    }

    function isPotencialCellBlack(current_x, current_y, potencial_x, potencial_y) {
        if ((current_x - potencial_x === 1) && (current_y - potencial_y === -1) ||
            (current_x - potencial_x === -1) && (current_y - potencial_y === -1)
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    function isPotencialCellWhite(current_x, current_y, potencial_x, potencial_y) {
        if ((current_x - potencial_x === -1) && (current_y - potencial_y === 1) ||
            (current_x - potencial_x === 1) && (current_y - potencial_y === 1)
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    function getPosibleBlackPieces() {
        const rank__check = $(".rank__check");

        let arBlackPieces = [];

        let arEmptyPieces = [];

        let rank__check_x = null;
        let rank__check_y = null;

        rank__check.each(function(index, value) {
            if(isMoviableCell(value)){

                try {

                    rank__check_x = value.getAttribute("x");
                    rank__check_y = value.getAttribute("y");

                    //get empty
                    if(value.hasChildNodes() === false) {
                        arEmptyPieces.push({
                            rank__check_x : rank__check_x,
                            rank__check_y : rank__check_y,
                            type : "empty",
                        });
                    }

                    //get black
                    if(value.firstElementChild.classList.contains("black")){
                        arBlackPieces.push({
                            rank__check_x : rank__check_x,
                            rank__check_y : rank__check_y,
                            type : "black",
                        });
                    }
                }
                catch (e){}
            }
        });

        let black_x = null;
        let black_y = null;

        let empty_x = null;
        let empty_y = null;

        // get good coord for next step without loose checkers
        let arGoodEmptyForNextStep = [];

        arBlackPieces.forEach(function (value_b, index_b) {
            black_x = value_b.rank__check_x;
            black_y = value_b.rank__check_y;

            arEmptyPieces.forEach(function (value_e, index_e) {
                empty_x = value_e.rank__check_x;
                empty_y = value_e.rank__check_y;

                if(isPotencialCellBlack(black_x, black_y, empty_x, empty_y)) {
                    arGoodEmptyForNextStep.push({
                        empty_x : empty_x,
                        empty_y : empty_y,
                        x: black_x,
                        y : black_y
                    })
                }
            })
        });

        return arGoodEmptyForNextStep;

    }

    function getPosibleWhitePieces() {
        const rank__check = $(".rank__check");

        let arWhitePieces = [];

        let arEmptyPieces = [];

        let rank__check_x = null;
        let rank__check_y = null;

        rank__check.each(function(index, value) {
            if(isMoviableCell(value)){

                try {

                    rank__check_x = value.getAttribute("x");
                    rank__check_y = value.getAttribute("y");

                    //get empty
                    if(value.hasChildNodes() === false) {
                        arEmptyPieces.push({
                            rank__check_x : rank__check_x,
                            rank__check_y : rank__check_y,
                            type : "empty",
                        });
                    }

                    //get white
                    else if(value.firstElementChild.classList.contains("white")) {
                        arWhitePieces.push({
                            rank__check_x : rank__check_x,
                            rank__check_y : rank__check_y,
                            type : "white",
                        });
                    }

                }
                catch (e){}

            }
        });

        let white_x = null;
        let white_y = null;

        let empty_x = null;
        let empty_y = null;

        // get good coord for next step without loose checkers
        let arGoodEmptyForNextStep = [];

        arWhitePieces.forEach(function (value_b, index_b) {
            white_x = value_b.rank__check_x;
            white_y = value_b.rank__check_y;

            arEmptyPieces.forEach(function (value_e, index_e) {
                empty_x = value_e.rank__check_x;
                empty_y = value_e.rank__check_y;

                if(isPotencialCellWhite(white_x, white_y, empty_x, empty_y)) {
                    arGoodEmptyForNextStep.push({
                        empty_x : empty_x,
                        empty_y : empty_y,
                        x: white_x,
                        y : white_y
                    })
                }
            })
        });

        return arGoodEmptyForNextStep;


    }


    // getPosibleBlackPieces();
    // getPosibleWhitePieces();

    // click on checkers
    addDynamicEventListener(document.body, 'click', '.piece', function (e) {
        // current piece
        but = e.target;

        // check player
        let currentPlayer = checkPlayer(e.target);
        if(player !== currentPlayer) {
            alert("Сейчас ходит " + player);
            return false;
        }

        //remove active from all pieces
        $(".piece").removeClass("active");

        // get current coordinates
        let piece_x = but.parentElement.getAttribute("x");
        let piece_y = but.parentElement.getAttribute("y");

        let potencial_x = null;
        let potencial_y = null;

        // get all pieces
        let allPiece = document.querySelectorAll('.rank__check');

        for(let i = 0; i < allPiece.length; i++) {
            // remove from all pieces potencial style cell
            $(allPiece[i]).removeClass("over");

            // get rank__check without piece
            if(!allPiece[i].hasChildNodes()) {
                // if isset coordinates
                if(allPiece[i].getAttribute("x")) {
                    potencial_x = allPiece[i].getAttribute("x");
                    potencial_y = allPiece[i].getAttribute("y");

                    if(e.target.classList.contains('black')) {

                        // get next success cells
                        if (isPotencialCellBlack(piece_x, piece_y, potencial_x, potencial_y)) {

                            // set active class to current piece
                            $(e.target).addClass("active");

                            let rank_check = allPiece[i];

                            $(rank_check).addClass("over");
                        }
                    }
                    else if(e.target.classList.contains('white')) {
                        // get next success cells
                        if (isPotencialCellWhite(piece_x, piece_y, potencial_x, potencial_y)) {
                            // set active class to current piece
                            $(e.target).addClass("active");

                            let rank_check = allPiece[i];

                            $(rank_check).addClass("over");
                        }
                    }

                    // console.log(potencial_x + ", " + potencial_y);
                }
            }
        }

    });

    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    function stepComputer() {
        console.log("stepComputer");

        let arGoodEmptyForNextStep = getPosibleBlackPieces();
        let countGoodStep = arGoodEmptyForNextStep.length - 1;
        let nextStepComputer = randomInteger(0, countGoodStep);

        let x = arGoodEmptyForNextStep[nextStepComputer]["x"];
        let y = arGoodEmptyForNextStep[nextStepComputer]["y"];

        let next_x = arGoodEmptyForNextStep[nextStepComputer]["empty_x"];
        let next_y = arGoodEmptyForNextStep[nextStepComputer]["empty_y"];


        let current_cell = $(".rank__check[x="+ x +"][y=" + y +"]");
        let next_cell = $(".rank__check[x="+ next_x +"][y=" + next_y +"]");

        // remove current piece
        current_cell[0].firstElementChild.remove();

        // add new piece
        next_cell.append('<div class="piece black">&#9820;</div>');



    }
    
    function atackComputer() {

    }
    
    // click on cell
    addDynamicEventListener(document.body, 'click', '.rank__check', function (event) {

        //remove active from all pieces
        $(".piece").removeClass("active");
        $('.rank__check').removeClass("over");

        try {
            if (event.target.firstChild.classList.contains('active')) {

            }
        }catch (e) {
            if(but){
                let but_x = but.parentElement.getAttribute("x");
                let but_y = but.parentElement.getAttribute("y");

                let current_x = event.target.getAttribute("x");
                let current_y = event.target.getAttribute("y");

                let currentColor = null;
                if(but.classList.contains("black")) {
                    currentColor = "black";
                }
                else if(but.classList.contains("white")) {
                    currentColor = "white";
                }

                if(currentColor === "black") {
                    if (((but_y - current_y) === -1) && ((but_x - current_x === 1) || (but_x - current_x === -1))) {
                        $(but).removeClass("active");

                        // createElement
                        $(event.target).append('<div class="piece black">&#9820;</div>');

                        // removeElement
                        $(but).remove();
                        but = null;

                        // change player
                        player = "white";

                    }
                }
                else {
                    if (((but_y - current_y) === 1) && ((but_x - current_x === 1) || (but_x - current_x === -1))) {
                        // createElement
                        $(event.target).append('<div class="piece white">&#9814;</div>');

                        // removeElement
                        $(but).remove();
                        but = null;

                        stepComputer();

                        // // change player
                        // player = "black";
                    }
                }



            }
        }
    });

});