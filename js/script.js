window.onload = function () {
    let movedPiece = null;

    document.addEventListener('dragstart', function (event) {
        if (event.target.classList.contains('piece')) {
            movedPiece = event.target;

            // временно удалит фон из родительского элемента, поэтому изображение-призрак не будет иметь его, а затем перетащит его
            const originalColor = movedPiece.parentElement.style.backgroundColor;
            movedPiece.parentElement.style.backgroundColor = 'transparent';
            // скрыть исходный фрагмент, чтобы он не влиял на изображение-призрак
            setTimeout(function () {
                movedPiece.parentElement.style.backgroundColor = originalColor;
                movedPiece.classList.add('hide');
            });

            // может не работать без этого
            event.dataTransfer.setData('text', '');
        }
    });

    document.addEventListener('dragover', function (event) {

        try{
            console.log("dragover: " + event.target.draggable);
            if (event.target.classList.contains('rank__check')) {
                event.preventDefault();
                event.target.classList.add('over');
            }
        }
        catch (e) {}
    });

    document.addEventListener('dragleave', function (event) {
        try{
            console.log("dragleave: " + event.target.draggable);
            if (event.target.classList.contains('rank__check')) {
                event.target.classList.remove('over');
            }

        }
        catch (e) {}
    });

    document.addEventListener('drop', function (event) {
        if (event.target.classList.contains('rank__check')) {
            event.target.appendChild(movedPiece);
            event.target.classList.remove('over');
        }
    });

    document.addEventListener('dragend', function (event) {
        if (event.target.classList.contains('piece')) {
            movedPiece.classList.remove('hide');
        }
    });

    document.addEventListener('dragenter', function (event) {
        if (event.preventDefault)
            event.preventDefault();

        // const data = event.childNodes[0].nodeValue;
        // console.log('Drag enter: "' + data + '"');
        return false;
    });

    document.addEventListener('touchmove', function(event) {
        var touch = event.targetTouches[0];

        // Place element where the finger is
        event.style.left = touch.pageX-25 + 'px';
        event.style.top = touch.pageY-25 + 'px';
        event.preventDefault();
    }, false);
};
