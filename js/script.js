$(document).ready(function(){

    let but = null;

    // click on checkers
    addDynamicEventListener(document.body, 'click', '.piece', function (e) {
        but = e.target;

        //remove active from all pieces
        $(".piece").removeClass("active");

        // set active class to current piece
        $(e.target).addClass("active");

        let piece_x = but.parentElement.getAttribute("x");
        let piece_y = but.parentElement.getAttribute("y");

        let potencial_x = null;
        let potencial_y = null;

        let allPiece = document.querySelectorAll('.rank__check');

        for(let i = 0; i < allPiece.length; i++) {
            $(allPiece[i]).removeClass("over");

            // get rank__check without piece
            if(!allPiece[i].hasChildNodes()) {
                // if isset coordinates
                if(allPiece[i].getAttribute("x")) {
                    potencial_x = allPiece[i].getAttribute("x");
                    potencial_y = allPiece[i].getAttribute("y");

                    if(e.target.classList.contains('black')) {

                        // get next success cells
                        if ((piece_x - potencial_x === 1) && (piece_y - potencial_y === -1) ||
                            (piece_x - potencial_x === -1) && (piece_y - potencial_y === -1)
                        ) {
                            let rank_check = allPiece[i];

                            $(rank_check).addClass("over");
                        }
                    }
                    else if(e.target.classList.contains('white')) {
                        // get next success cells
                        if ((piece_x - potencial_x === -1) && (piece_y - potencial_y === 1) ||
                            (piece_x - potencial_x === 1) && (piece_y - potencial_y === 1)
                        ) {
                            let rank_check = allPiece[i];

                            $(rank_check).addClass("over");
                        }
                    }

                    console.log(potencial_x + ", " + potencial_y);
                }
            }
        }

        if(e.target.classList.contains('black')){


        }
        else {
            allPiece = document.querySelectorAll('.piece.white');
        }




    });

    // click on cell
    addDynamicEventListener(document.body, 'click', '.rank__check', function (event) {

        $('.rank__check').removeClass("over");

        console.log(event.target.getAttribute("x") + ', ' + event.target.getAttribute("y"));

        try {
            if (event.target.firstChild.classList.contains('active')) {
                // let div = document.createElement("div");
                // div.className = "piece black";
                // div.textContent = 'T';
                //
                // this.appendChild(div);
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
                        let div = document.createElement("div");
                        div.className = "piece black";
                        div.innerHTML = '&#9820;';

                        event.target.appendChild(div);

                        // removeElement
                        but.remove();

                        but = null;
                    }
                }
                else {
                    if (((but_y - current_y) === 1) && ((but_x - current_x === 1) || (but_x - current_x === -1))) {
                        $(but).removeClass("active");

                        // createElement

                        $(event.target).append('<div class="piece white">&#9814;</div>');
                        // let div = document.createElement("div");
                        // div.className = "piece white";
                        // div.innerHTML = '&#9814;';
                        //
                        // this.append(div);

                        // removeElement
                        but.remove();

                        but = null;
                    }
                }
            }
        }
    });

});