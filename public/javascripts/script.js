$(document).ready(function(){

    let current_script = document.querySelector('script[src*="script.js"]');

    // PP - Player vs Player
    // CP - Computer vs Player
    // AUTO - Computer vs Computer
    const MODE_GAME = current_script.getAttribute("mode-game");

    // LOW
    // MEDIUM
    // HARD
    const COMPUTER_LEVEL = current_script.getAttribute("game-level");

    let player = "white"; //the first player
    let isHasEnemy = false;

    let current_piece = null; // global last click piece
    let nextAttack = null; // global next cell for player attack
    let nextStep = null; // global next cell for player step
    let nextTarget = null; // global next enemy of player

    function checkPlayer(object) {
        if(object.classList.contains("black")) {
            return "black";
        }
        else if(object.classList.contains("white"))
        {
            return "white";
        }
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

    // COMPUTER LOGIC
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
                            value : value,
                            rank__check_x : rank__check_x,
                            rank__check_y : rank__check_y,
                            type : "empty",
                        });
                    }

                    //get black
                    if(value.firstElementChild.classList.contains("black")){
                        arBlackPieces.push({
                            value : value,
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
                        current_piece : value_b.value,
                        next_piece : value_e.value,
                    })
                }
            })
        });

        return arGoodEmptyForNextStep;

    }

    // COMPUTER LOGIC

    function getNeighborCell() {
        const rank__check = $(".rank__check");

        let arBlackPieces = [];
        let arWhitePieces = [];
        let arEmptyPieces = [];

        rank__check.each(function(index, value) {
            if(isMoviableCell(value)){
                if(value.hasChildNodes()) {
                    if(value.firstElementChild.classList.contains("black")) {
                        arBlackPieces.push(value);
                    }
                    else if(value.firstElementChild.classList.contains("white")) {
                        arWhitePieces.push(value);
                    }
                }
                else {
                    arEmptyPieces.push(value);
                }
            }
        });

        let arPotencialEnemy = [];

        let black_x = null;
        let black_y = null;

        let pot_enemy_bottom_left_x = null;
        let pot_enemy_bottom_left_y = null;

        let pot_enemy_bottom_right_x = null;
        let pot_enemy_bottom_right_y = null;

        let pot_enemy_up_left_x = null;
        let pot_enemy_up_left_y = null;

        let pot_enemy_up_right_x = null;
        let pot_enemy_up_right_y = null;

        let white_x = null;
        let white_y = null;

        let empty_x = null;
        let empty_y = null;

        // смотрим в глубину = 2 MEDIUM

        if(COMPUTER_LEVEL === "medium") {
            // medium
        }

        // medium
        arBlackPieces.forEach(function (value_b, index_b) {
            black_x = value_b.getAttribute("x");
            black_y = value_b.getAttribute("y");

            pot_enemy_bottom_left_x = parseInt(black_x) - 1;
            pot_enemy_bottom_left_y = parseInt(black_y) + 1;

            pot_enemy_bottom_right_x = parseInt(black_x) + 1;
            pot_enemy_bottom_right_y = parseInt(black_y) + 1;

            pot_enemy_up_left_x = parseInt(black_x) - 1;
            pot_enemy_up_left_y = parseInt(black_y) - 1;

            pot_enemy_up_right_x = parseInt(black_x) + 1;
            pot_enemy_up_right_y = parseInt(black_y) - 1;

            let potencial_enemy_bottom_left = $(".rank__check[x=" + pot_enemy_bottom_left_x + "][y=" + pot_enemy_bottom_left_y + "]");
            let potencial_enemy_bottom_right = $(".rank__check[x=" + pot_enemy_bottom_right_x + "][y=" + pot_enemy_bottom_right_y + "]");
            let potencial_enemy_up_left = $(".rank__check[x=" + pot_enemy_up_left_x + "][y=" + pot_enemy_up_left_y + "]");
            let potencial_enemy_up_right = $(".rank__check[x=" + pot_enemy_up_right_x + "][y=" + pot_enemy_up_right_y + "]");

            arPotencialEnemy[index_b] = {
                current_piece : value_b,
                potencial_enemy_bottom_left : potencial_enemy_bottom_left[0],
                potencial_enemy_bottom_right : potencial_enemy_bottom_right[0],
                potencial_enemy_up_left : potencial_enemy_up_left[0],
                potencial_enemy_up_right : potencial_enemy_up_right[0]
            }

        });

        return arPotencialEnemy;
    }

    // computer logic (есть ли поблизости враги)
    function isEnemyForBlack(value) {

        let pot_x = null;
        let pot_y = null;

        let needAttack = null;

        let potencial_enemy_bottom_left = value.potencial_enemy_bottom_left;
        if(typeof potencial_enemy_bottom_left !== 'undefined') {

            if (potencial_enemy_bottom_left.hasChildNodes()) {
                if (potencial_enemy_bottom_left.firstElementChild.classList.contains("white")) {

                    pot_x = parseInt(potencial_enemy_bottom_left.getAttribute("x")) - 1;
                    pot_y = parseInt(potencial_enemy_bottom_left.getAttribute("y")) + 1;

                    needAttack = $(".rank__check[x=" + pot_x + "][y=" + pot_y + "]");

                    try {
                        if (needAttack[0].hasChildNodes()) {
                            if (needAttack[0].firstElementChild.classList.contains("white")) {
                                return {
                                    enemy: potencial_enemy_bottom_left,
                                    value: value.current_piece,
                                    needAttack: false,
                                };
                            }
                            else if (needAttack[0].firstElementChild.classList.contains("black")) {
                                return {
                                    enemy: potencial_enemy_bottom_left,
                                    value: value.current_piece,
                                    needAttack: false
                                };
                            }
                        }
                        else {
                            return {
                                enemy: potencial_enemy_bottom_left,
                                value: value.current_piece,
                                needAttack: true,
                                targetAttack: needAttack
                            };
                        }
                    }catch(e) {}

                }
                else {
                    return false;
                }
            }
        }

        let potencial_enemy_bottom_right = value.potencial_enemy_bottom_right;

        if(typeof potencial_enemy_bottom_right !== 'undefined') {

            if (potencial_enemy_bottom_right.hasChildNodes()) {
                if (potencial_enemy_bottom_right.firstElementChild.classList.contains("white")) {
                    pot_x = parseInt(potencial_enemy_bottom_right.getAttribute("x")) + 1;
                    pot_y = parseInt(potencial_enemy_bottom_right.getAttribute("y")) + 1;

                    needAttack = $(".rank__check[x=" + pot_x + "][y=" + pot_y + "]");

                    try {
                        if (needAttack[0].hasChildNodes()) {
                            if (needAttack[0].firstElementChild.classList.contains("white")) {
                                return {
                                    enemy: potencial_enemy_bottom_right,
                                    value: value.current_piece,
                                    needAttack: false,
                                };
                            }
                            else if (needAttack[0].firstElementChild.classList.contains("black")) {
                                return {
                                    enemy: potencial_enemy_bottom_right,
                                    value: value.current_piece,
                                    needAttack: false
                                };
                            }
                        }
                        else {
                            return {
                                enemy: potencial_enemy_bottom_right,
                                value: value.current_piece,
                                needAttack: true,
                                targetAttack: needAttack
                            };
                        }
                    }catch (e) {}
                }
                else {
                    return false;
                }
            }
        }


        let potencial_enemy_up_left = value.potencial_enemy_up_left;
        if(typeof potencial_enemy_up_left !== 'undefined') {

            if (potencial_enemy_up_left.hasChildNodes()) {
                if (potencial_enemy_up_left.firstElementChild.classList.contains("white")) {
                    pot_x = parseInt(potencial_enemy_up_left.getAttribute("x")) - 1;
                    pot_y = parseInt(potencial_enemy_up_left.getAttribute("y")) - 1;

                    needAttack = $(".rank__check[x=" + pot_x + "][y=" + pot_y + "]");

                    try {
                        if (needAttack[0].hasChildNodes()) {
                            if (needAttack[0].firstElementChild.classList.contains("white")) {
                                return {
                                    enemy: potencial_enemy_up_left,
                                    value: value.current_piece,
                                    needAttack: false,
                                };
                            }
                            else if (needAttack[0].firstElementChild.classList.contains("black")) {
                                return {
                                    enemy: potencial_enemy_up_left,
                                    value: value.current_piece,
                                    needAttack: false
                                };
                            }
                        }
                        else {
                            return {
                                enemy: potencial_enemy_up_left,
                                value: value.current_piece,
                                needAttack: true,
                                targetAttack: needAttack
                            };
                        }
                    }catch (e) {}
                }
                else {
                    return false;
                }
            }

        }

        let potencial_enemy_up_right = value.potencial_enemy_up_right;

        if(typeof potencial_enemy_up_right !== 'undefined') {

            if (potencial_enemy_up_right.hasChildNodes()) {
                if (potencial_enemy_up_right.firstElementChild.classList.contains("white")) {
                    pot_x = parseInt(potencial_enemy_up_right.getAttribute("x")) + 1;
                    pot_y = parseInt(potencial_enemy_up_right.getAttribute("y")) - 1;

                    needAttack = $(".rank__check[x=" + pot_x + "][y=" + pot_y + "]");

                    try {
                        if (needAttack[0].hasChildNodes()) {
                            if (needAttack[0].firstElementChild.classList.contains("white")) {
                                return {
                                    enemy: potencial_enemy_up_right,
                                    value: value.current_piece,
                                    needAttack: false,
                                };
                            }
                            else if (needAttack[0].firstElementChild.classList.contains("black")) {
                                return {
                                    enemy: potencial_enemy_up_right,
                                    value: value.current_piece,
                                    needAttack: false
                                };
                            }
                        }
                        else {
                            return {
                                enemy: potencial_enemy_up_right,
                                value: value.current_piece,
                                needAttack: true,
                                targetAttack: needAttack
                            };
                        }
                    } catch (e) {}
                }
                else {
                    return false;
                }
            }
        }

        return false;
    }

    function isFriendForBlack(value) {

        let potencial_friend_bottom_left = value.potencial_enemy_bottom_left;
        if(typeof potencial_friend_bottom_left !== 'undefined') {

            if (potencial_friend_bottom_left.hasChildNodes()) {
                if (potencial_friend_bottom_left.firstElementChild.classList.contains("black")) {
                    return potencial_friend_bottom_left;
                }
                else {
                    return false;
                }
            }
        }

        let potencial_friend_bottom_right = value.potencial_enemy_bottom_right;

        if(typeof potencial_friend_bottom_right !== 'undefined') {

            if (potencial_friend_bottom_right.hasChildNodes()) {
                if (potencial_friend_bottom_right.firstElementChild.classList.contains("black")) {
                    return potencial_friend_bottom_right;
                }
                else {
                    return false;
                }
            }
        }


        let potencial_friend_up_left = value.potencial_enemy_up_left;
        if(typeof potencial_friend_up_left !== 'undefined') {

            if (potencial_friend_up_left.hasChildNodes()) {
                if (potencial_friend_up_left.firstElementChild.classList.contains("black")) {
                    return potencial_friend_up_left;
                }
                else {
                    return false;
                }
            }

        }

        let potencial_friend_up_right = value.potencial_enemy_up_right;

        if(typeof potencial_friend_up_right !== 'undefined') {

            if (potencial_friend_up_right.hasChildNodes()) {
                if (potencial_friend_up_right.firstElementChild.classList.contains("black")) {
                    return potencial_friend_up_right;
                }
                else {
                    return false;
                }
            }
        }

        return false;
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

        let arPotencialEnemy = getNeighborCell();

        let arNeedAtack = [];

        arPotencialEnemy.forEach(function (value, index) {
            let isEnemy = isEnemyForBlack(value);
            let isFriend = isFriendForBlack(value);



            if(isEnemy) {
                // проверить, можно ли ее рубить
                // или нет
                if(isEnemy.needAttack) {
                    // attack
                    arNeedAtack.push(isEnemy);
                }
                else {

                }

            }
        });


        // компьютер атакует
        if(arNeedAtack.length > 0) {
            let nextAttack = randomInteger(0, arNeedAtack.length - 1);
            // прыжок (рубит)
            $(arNeedAtack[nextAttack].targetAttack).append('<div class="piece black">&#9820;</div>');

            // удаляет срубленную шашку и саму себя на предыдущем месте
            $(arNeedAtack[nextAttack].enemy.firstElementChild).remove();
            $(arNeedAtack[nextAttack].value.firstElementChild).remove()
        }
        // иначе ходи
        else {
            // если легкий уровень, то потенциальная клетка для след хода
            // если средний уровень, то проверить на наличие врага
            // если высокий уровень, то проверить все варианты

            let arGoodEmptyForNextStep = getPosibleBlackPieces();

            if(COMPUTER_LEVEL === "low") {
                let next_cell = randomInteger(0, arGoodEmptyForNextStep.length - 1);

                //step

                $(arGoodEmptyForNextStep[next_cell].next_piece).append('<div class="piece black">&#9820;</div>');
                $(arGoodEmptyForNextStep[next_cell].current_piece.firstElementChild).remove();

            }
        }


        // try {
        //     console.log("stepComputer");
        //
        //     let arGoodEmptyForNextStep = getPosibleBlackPieces();
        //     let countGoodStep = arGoodEmptyForNextStep.length - 1;
        //     let nextStepComputer = randomInteger(0, countGoodStep);
        //
        //     let x = arGoodEmptyForNextStep[nextStepComputer]["x"];
        //     let y = arGoodEmptyForNextStep[nextStepComputer]["y"];
        //
        //     let next_x = arGoodEmptyForNextStep[nextStepComputer]["empty_x"];
        //     let next_y = arGoodEmptyForNextStep[nextStepComputer]["empty_y"];
        //
        //     let current_cell = $(".rank__check[x=" + x + "][y=" + y + "]");
        //     let next_cell = $(".rank__check[x=" + next_x + "][y=" + next_y + "]");
        //
        //     // remove current piece
        //     current_cell[0].firstElementChild.remove();
        //
        //     // add new piece
        //     next_cell.append('<div class="piece black">&#9820;</div>');
        // }
        // catch(e_comp){}



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

                                        isHasEnemy = true;
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

                                        isHasEnemy = true;
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

                                        isHasEnemy = true;
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

                                        isHasEnemy = true;
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

        // attack
        if(isHasEnemy) {
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
                    isHasEnemy = true;

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
                    isHasEnemy = true;

                }
            }
        }
        // step
        else {
            if(current_piece.classList.contains("white")) {

                $(current_piece).addClass("active");

                arPotencialWhite.forEach(function (value, index) {
                    $(value).addClass("over");
                });

                nextStep = arPotencialWhite;

            }
            else if(current_piece.classList.contains("black")) {

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

                    if((nextAttack.getAttribute("x") === event.target.getAttribute("x")) && (nextAttack.getAttribute("y") === event.target.getAttribute("y"))) {

                        // createElement
                        if (currentColor === "white") {
                            $(event.target).append('<div class="piece white">&#9814;</div>');
                        }
                        else if (currentColor === "black") {
                            $(event.target).append('<div class="piece black">&#9820;</div>');
                        }

                        $(current_piece).remove();
                        current_piece = null;

                        let kill_target = nextTarget.firstElementChild;
                        $(kill_target).remove();

                        // kill enemy
                        isHasEnemy = false;

                        // more attack must can do it...
                        //...
                        //...

                        if (MODE_GAME === "CP") {
                            stepComputer();
                        }
                        else if (MODE_GAME === "PP") {
                            // change player
                            if (currentColor === "white") {
                                player = "black";
                            }
                            else if (currentColor === "black") {
                                player = "white";
                            }

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

            }
        }

        $(".piece").removeClass("active");
        $(".piece").removeClass("potencial_dead");
        $('.rank__check').removeClass("over");

    });

});