/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function ($) {

    // Detect touch support
    $.support.touch = 'ontouchend' in document;

    // Ignore browsers without touch support
    if (!$.support.touch) {
        return;
    }

    var mouseProto = $.ui.mouse.prototype,
        _mouseInit = mouseProto._mouseInit,
        _mouseDestroy = mouseProto._mouseDestroy,
        touchHandled;

    /**
     * Simulate a mouse event based on a corresponding touch event
     * @param {Object} event A touch event
     * @param {String} simulatedType The corresponding mouse event
     */
    function simulateMouseEvent (event, simulatedType) {

        // Ignore multi-touch events
        if (event.originalEvent.touches.length > 1) {
            return;
        }

        event.preventDefault();

        var touch = event.originalEvent.changedTouches[0],
            simulatedEvent = document.createEvent('MouseEvents');

        // Initialize the simulated mouse event using the touch event's coordinates
        simulatedEvent.initMouseEvent(
            simulatedType,    // type
            true,             // bubbles
            true,             // cancelable
            window,           // view
            1,                // detail
            touch.screenX,    // screenX
            touch.screenY,    // screenY
            touch.clientX,    // clientX
            touch.clientY,    // clientY
            false,            // ctrlKey
            false,            // altKey
            false,            // shiftKey
            false,            // metaKey
            0,                // button
            null              // relatedTarget
        );

        // Dispatch the simulated event to the target element
        event.target.dispatchEvent(simulatedEvent);
    }

    /**
     * Handle the jQuery UI widget's touchstart events
     * @param {Object} event The widget element's touchstart event
     */
    mouseProto._touchStart = function (event) {

        var self = this;

        // Ignore the event if another widget is already being handled
        if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
            return;
        }

        // Set the flag to prevent other widgets from inheriting the touch event
        touchHandled = true;

        // Track movement to determine if interaction was a click
        self._touchMoved = false;

        // Simulate the mouseover event
        simulateMouseEvent(event, 'mouseover');

        // Simulate the mousemove event
        simulateMouseEvent(event, 'mousemove');

        // Simulate the mousedown event
        simulateMouseEvent(event, 'mousedown');
    };

    /**
     * Handle the jQuery UI widget's touchmove events
     * @param {Object} event The document's touchmove event
     */
    mouseProto._touchMove = function (event) {

        // Ignore event if not handled
        if (!touchHandled) {
            return;
        }

        // Interaction was not a click
        this._touchMoved = true;

        // Simulate the mousemove event
        simulateMouseEvent(event, 'mousemove');
    };

    /**
     * Handle the jQuery UI widget's touchend events
     * @param {Object} event The document's touchend event
     */
    mouseProto._touchEnd = function (event) {

        // Ignore event if not handled
        if (!touchHandled) {
            return;
        }

        // Simulate the mouseup event
        simulateMouseEvent(event, 'mouseup');

        // Simulate the mouseout event
        simulateMouseEvent(event, 'mouseout');

        // If the touch interaction did not move, it should trigger a click
        if (!this._touchMoved) {

            // Simulate the click event
            simulateMouseEvent(event, 'click');
        }

        // Unset the flag to allow other widgets to inherit the touch event
        touchHandled = false;
    };

    /**
     * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
     * This method extends the widget with bound touch event handlers that
     * translate touch events to mouse events and pass them to the widget's
     * original mouse event handling methods.
     */
    mouseProto._mouseInit = function () {

        var self = this;

        // Delegate the touch handlers to the widget's element
        self.element.bind({
            touchstart: $.proxy(self, '_touchStart'),
            touchmove: $.proxy(self, '_touchMove'),
            touchend: $.proxy(self, '_touchEnd')
        });

        // Call the original $.ui.mouse init method
        _mouseInit.call(self);
    };

    /**
     * Remove the touch event handlers
     */
    mouseProto._mouseDestroy = function () {

        var self = this;

        // Delegate the touch handlers to the widget's element
        self.element.unbind({
            touchstart: $.proxy(self, '_touchStart'),
            touchmove: $.proxy(self, '_touchMove'),
            touchend: $.proxy(self, '_touchEnd')
        });

        // Call the original $.ui.mouse destroy method
        _mouseDestroy.call(self);
    };

})(jQuery);

window.onload = function () {
    let movedPiece = null;

    // document.addEventListener('dragstart', function (event) {
    //     if (event.target.classList.contains('piece')) {
    //         movedPiece = event.target;
    //
    //         // временно удалит фон из родительского элемента, поэтому изображение-призрак не будет иметь его, а затем перетащит его
    //         const originalColor = movedPiece.parentElement.style.backgroundColor;
    //         movedPiece.parentElement.style.backgroundColor = 'transparent';
    //         // скрыть исходный фрагмент, чтобы он не влиял на изображение-призрак
    //         setTimeout(function () {
    //             movedPiece.parentElement.style.backgroundColor = originalColor;
    //             movedPiece.classList.add('hide');
    //         });
    //
    //         // может не работать без этого
    //         event.dataTransfer.setData('text', '');
    //     }
    // });
    //
    // document.addEventListener('dragover', function (event) {
    //
    //     try{
    //         console.log("dragover: " + event.target.draggable);
    //         if (event.target.classList.contains('rank__check')) {
    //             event.preventDefault();
    //             event.target.classList.add('over');
    //         }
    //     }
    //     catch (e) {}
    // });
    //
    // document.addEventListener('dragleave', function (event) {
    //     try{
    //         console.log("dragleave: " + event.target.draggable);
    //         if (event.target.classList.contains('rank__check')) {
    //             event.target.classList.remove('over');
    //         }
    //
    //     }
    //     catch (e) {}
    // });
    //
    // document.addEventListener('drop', function (event) {
    //     if (event.target.classList.contains('rank__check')) {
    //         event.target.appendChild(movedPiece);
    //         event.target.classList.remove('over');
    //     }
    // });
    //
    // document.addEventListener('dragend', function (event) {
    //     if (event.target.classList.contains('piece')) {
    //         movedPiece.classList.remove('hide');
    //     }
    // });
    //
    // document.addEventListener('dragenter', function (event) {
    //     if (event.preventDefault)
    //         event.preventDefault();
    //
    //     // const data = event.childNodes[0].nodeValue;
    //     // console.log('Drag enter: "' + data + '"');
    //     return false;
    // });
    //
    // document.addEventListener('touchmove', function(event) {
    //     var touch = event.targetTouches[0];
    //
    //     // Place element where the finger is
    //     event.style.left = touch.pageX-25 + 'px';
    //     event.style.top = touch.pageY-25 + 'px';
    //     event.preventDefault();
    // }, false);

    $( ".piece" ).draggable({
        grid: [ 80, 80 ],
    });

};
