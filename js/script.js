$(document).ready(function(){

    // PP - Player vs Player
    // CP - Computer vs Player
    // AUTO - Computer vs Computer
    const MODE_GAME = "CP";

    let player = "white";

    let current_piece = null;
    let nextAttack = null;
    let nextStep = null;
    let nextTarget = null;

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

    function isNextCellWhite(array) {


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


    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    function stepComputer() {
        try {
            console.log("stepComputer");

            let arGoodEmptyForNextStep = getPosibleBlackPieces();
            let countGoodStep = arGoodEmptyForNextStep.length - 1;
            let nextStepComputer = randomInteger(0, countGoodStep);

            let x = arGoodEmptyForNextStep[nextStepComputer]["x"];
            let y = arGoodEmptyForNextStep[nextStepComputer]["y"];

            let next_x = arGoodEmptyForNextStep[nextStepComputer]["empty_x"];
            let next_y = arGoodEmptyForNextStep[nextStepComputer]["empty_y"];


            let current_cell = $(".rank__check[x=" + x + "][y=" + y + "]");
            let next_cell = $(".rank__check[x=" + next_x + "][y=" + next_y + "]");

            // remove current piece
            current_cell[0].firstElementChild.remove();

            // add new piece
            next_cell.append('<div class="piece black">&#9820;</div>');
        }
        catch(e_comp){}



    }

    function atackComputer() {

    }

    // click on checkers
    addDynamicEventListener(document.body, 'click', '.piece', function (e) {
        // current piece
        current_piece = e.target;

        // check player
        let currentPlayer = checkPlayer(e.target);
        if(player !== currentPlayer) {
            alert("Сейчас ходит " + player);
            return false;
        }

        //remove active from all pieces
        $(".piece").removeClass("active");
        $(".piece").removeClass("potencial_dead");

        // get current coordinates
        let piece_x = current_piece.parentElement.getAttribute("x");
        let piece_y = current_piece.parentElement.getAttribute("y");

        let potencial_right_x = null;
        let potencial_right_y = null;
        let potencial_left_x = null;
        let potencial_left_y = null;

        // get all pieces
        let allPiece = document.querySelectorAll('.rank__check');

        let arPotencialWhite = [];
        let isWhiteNeedAttack = [];

        let arPotencialBlack = [];
        let isBlackNeedAttack = [];

        for(let i = 0; i < allPiece.length; i++) {
            // remove from all pieces potencial style cell
            $(allPiece[i]).removeClass("over");

            if(isMoviableCell(allPiece[i])){

                // get for white next step
                if(current_piece.classList.contains("white")) {
                    potencial_right_x = parseInt(piece_x) + 1;
                    potencial_right_y = parseInt(piece_y) - 1;

                    if ((potencial_right_x === parseInt(allPiece[i].getAttribute("x"))) && (potencial_right_y === parseInt(allPiece[i].getAttribute("y")))) {
                        if (allPiece[i].hasChildNodes()) {
                            if (allPiece[i].firstElementChild.classList.contains("black")) {

                                potencial_right_x = parseInt(piece_x) + 2;
                                potencial_right_y = parseInt(piece_y) - 2;

                                try {

                                    let piece_for_attack = $('.rank__check[x=' + potencial_right_x + '][y=' + potencial_right_y + ']')[0];

                                    if (!piece_for_attack.hasChildNodes()) {
                                        // get next step
                                        // arPotencialWhite.push(piece_for_attack);

                                        isWhiteNeedAttack.push({
                                            enemy: allPiece[i],
                                            target: piece_for_attack,
                                            isAttack: true
                                        });
                                    }
                                }
                                catch(piece_for_e) {}
                            }
                        }
                        else {
                            arPotencialWhite.push(allPiece[i]);
                        }
                    }

                    potencial_left_x = parseInt(piece_x) - 1;
                    potencial_left_y = parseInt(piece_y) - 1;

                    if ((potencial_left_x === parseInt(allPiece[i].getAttribute("x"))) && (potencial_left_y === parseInt(allPiece[i].getAttribute("y")))) {
                        if (allPiece[i].hasChildNodes()) {
                            if (allPiece[i].firstElementChild.classList.contains("black")) {

                                potencial_left_x = parseInt(piece_x) - 2;
                                potencial_left_y = parseInt(piece_y) - 2;

                                try {
                                    let piece_for_attack = $('.rank__check[x=' + potencial_left_x + '][y=' + potencial_left_y + ']')[0];

                                    if (!piece_for_attack.hasChildNodes()) {
                                        // get next step
                                        // arPotencialWhite.push(piece_for_attack);

                                        isWhiteNeedAttack.push({
                                            enemy: allPiece[i],
                                            target: piece_for_attack,
                                            isAttack: true
                                        });
                                    }
                                }
                                catch(piece_for_e) {}

                            }
                        }
                        else {
                            arPotencialWhite.push(allPiece[i]);
                        }
                    }
                }

                if(current_piece.classList.contains("black")) {
                    potencial_right_x = parseInt(piece_x) - 1;
                    potencial_right_y = parseInt(piece_y) + 1;

                    if ((potencial_right_x === parseInt(allPiece[i].getAttribute("x"))) && (potencial_right_y === parseInt(allPiece[i].getAttribute("y")))) {
                        if (allPiece[i].hasChildNodes()) {
                            if (allPiece[i].firstElementChild.classList.contains("white")) {

                                potencial_right_x = parseInt(piece_x) - 2;
                                potencial_right_y = parseInt(piece_y) + 2;

                                try {
                                    let piece_for_attack = $('.rank__check[x=' + potencial_right_x + '][y=' + potencial_right_y + ']')[0];

                                    if (!piece_for_attack.hasChildNodes()) {
                                        // get next step
                                        // arPotencialWhite.push(piece_for_attack);

                                        isBlackNeedAttack.push({
                                            enemy: allPiece[i],
                                            target: piece_for_attack,
                                            isAttack: true
                                        });
                                    }
                                }
                                catch(piece_for_e){}
                            }
                        }
                        else {
                            arPotencialBlack.push(allPiece[i]);
                        }
                    }

                    potencial_left_x = parseInt(piece_x) + 1;
                    potencial_left_y = parseInt(piece_y) + 1;

                    if ((potencial_left_x === parseInt(allPiece[i].getAttribute("x"))) && (potencial_left_y === parseInt(allPiece[i].getAttribute("y")))) {
                        if (allPiece[i].hasChildNodes()) {
                            if (allPiece[i].firstElementChild.classList.contains("white")) {

                                potencial_left_x = parseInt(piece_x) + 2;
                                potencial_left_y = parseInt(piece_y) + 2;

                                try {

                                    let piece_for_attack = $('.rank__check[x=' + potencial_left_x + '][y=' + potencial_left_y + ']')[0];

                                    if (!piece_for_attack.hasChildNodes()) {
                                        // get next step
                                        // arPotencialWhite.push(piece_for_attack);

                                        isBlackNeedAttack.push({
                                            enemy: allPiece[i],
                                            target: piece_for_attack,
                                            isAttack: true
                                        });
                                    }
                                }
                                catch(piece_for_e){}

                            }
                        }
                        else {
                            arPotencialBlack.push(allPiece[i]);
                        }
                    }
                }


            }


            // get rank__check without piece
            // if(!allPiece[i].hasChildNodes()) {
            //     // if isset coordinates
            //     if(allPiece[i].getAttribute("x")) {
            //         potencial_x = allPiece[i].getAttribute("x");
            //         potencial_y = allPiece[i].getAttribute("y");
            //
            //         if(e.target.classList.contains('black')) {
            //
            //             // get next success cells
            //             if (isPotencialCellBlack(piece_x, piece_y, potencial_x, potencial_y)) {
            //
            //                 // set active class to current piece
            //                 $(e.target).addClass("active");
            //
            //                 let rank_check = allPiece[i];
            //
            //                 $(rank_check).addClass("over");
            //             }
            //         }
            //         else if(e.target.classList.contains('white')) {
            //
            //             // get next success cells
            //             if (isPotencialCellWhite(piece_x, piece_y, potencial_x, potencial_y)) {
            //                 // set active class to current piece
            //                 $(e.target).addClass("active");
            //
            //                 let rank_check = allPiece[i];
            //
            //                 $(rank_check).addClass("over");
            //             }
            //         }
            //
            //         // console.log(potencial_x + ", " + potencial_y);
            //     }
            // }
        }

        if(current_piece.classList.contains("white")) {
            // set for white next step

            // if next cell has enemy then attack
            if(isWhiteNeedAttack.length > 0) {
                let jumping = isWhiteNeedAttack[0].target;
                let enemy = isWhiteNeedAttack[0].enemy;

                nextTarget = enemy;

                $(current_piece).addClass("active");
                $($(enemy)[0].firstElementChild).addClass("potencial_dead");
                $(jumping).addClass("over");

                nextAttack = jumping;

            }
            else {

                $(current_piece).addClass("active");

                arPotencialWhite.forEach(function (value, index) {
                    $(value).addClass("over");
                });

                nextStep = arPotencialWhite;
            }
        }
        else if(current_piece.classList.contains("black")) {
            // set for black next step

            // if next cell has enemy then attack
            if(isBlackNeedAttack.length > 0) {
                let jumping = isBlackNeedAttack[0].target;
                let enemy = isBlackNeedAttack[0].enemy;

                nextTarget = enemy;

                $(current_piece).addClass("active");
                $($(enemy)[0].firstElementChild).addClass("potencial_dead");
                $(jumping).addClass("over");

                nextAttack = jumping;

            }
            else {

                $(current_piece).addClass("active");

                arPotencialBlack.forEach(function (value, index) {
                    $(value).addClass("over");
                });

                nextStep = arPotencialBlack;
            }
        }



    });

    
    // click on cell
    addDynamicEventListener(document.body, 'click', '.rank__check', function (event) {

        //remove active from all pieces

        try {
            if (event.target.firstChild.classList.contains('active')) {

            }
        }catch (e) {
            if(current_piece){
                let but_x = current_piece.parentElement.getAttribute("x");
                let but_y = current_piece.parentElement.getAttribute("y");

                let current_x = event.target.getAttribute("x");
                let current_y = event.target.getAttribute("y");

                let currentColor = null;
                if(current_piece.classList.contains("black")) {
                    currentColor = "black";
                }
                else if(current_piece.classList.contains("white")) {
                    currentColor = "white";
                }


                //attack
                if(nextAttack !== null) {

                    // createElement
                    if(currentColor === "white") {
                        $(event.target).append('<div class="piece white">&#9814;</div>');
                    }
                    else if(currentColor === "black") {
                        $(event.target).append('<div class="piece black">&#9820;</div>');
                    }

                    $(current_piece).remove();
                    current_piece = null;

                    let kill_target = nextTarget.firstElementChild;
                    $(kill_target).remove();

                    // more attack must can do it...
                    //...
                    //...

                    if(MODE_GAME === "CP") {
                        stepComputer();
                    }
                    else if(MODE_GAME === "PP") {
                        // change player
                        if(currentColor === "white") {
                            player = "black";
                        }
                        else if(currentColor === "black") {
                            player = "white";
                        }

                    }

                }
                //step
                else if(nextStep !== null) {
                    nextStep.forEach(function (value, index) {
                        if((value.getAttribute("x") === current_x) && (value.getAttribute("y") === current_y)) {

                            if(currentColor === "white") {
                                $(event.target).append('<div class="piece white">&#9814;</div>');
                            }
                            else if(currentColor === "black") {
                                $(event.target).append('<div class="piece black">&#9820;</div>');
                            }

                            $(current_piece).remove();
                            current_piece = null;

                            if(MODE_GAME === "CP") {
                                stepComputer();
                            }
                            else if(MODE_GAME === "PP") {
                                // change player
                                if(currentColor === "white") {
                                    player = "black";
                                }
                                else if(currentColor === "black") {
                                    player = "white";
                                }
                            }
                        }
                    });

                }

                nextStep = null;
                nextTarget = null;
                nextAttack = null;


                // if(currentColor === "black") {
                //
                //     if (((but_y - current_y) === -1) && ((but_x - current_x === 1) || (but_x - current_x === -1))) {
                //         $(current_piece).removeClass("active");
                //
                //         // createElement
                //         $(event.target).append('<div class="piece black">&#9820;</div>');
                //
                //         // removeElement
                //         $(current_piece).remove();
                //         current_piece = null;
                //
                //         // change player
                //         player = "white";
                //
                //     }
                // }
                // else if(currentColor === "white") {
                //
                // }



            }
        }

        $(".piece").removeClass("active");
        $(".piece").removeClass("potencial_dead");
        $('.rank__check').removeClass("over");

    });

});