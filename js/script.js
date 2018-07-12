$(document).ready(function(){

    let but = null;

    // click on checkers
    addDynamicEventListener(document.body, 'click', '.piece', function (e) {
        but = e.target;

        $(".piece").removeClass("active");
        $(e.target).addClass("active");
    });

    // click on cell
    addDynamicEventListener(document.body, 'click', '.rank__check', function (event) {
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