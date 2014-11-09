(function () {
    var startPos = {
        x: 0,
        y: 0
    };
    var offsetPos = {
        x: 0,
        y: 0
    };
    var _dragElement;

    var onMouseDown = function (e) {

        if (e == null)
            e = window.event;

        var target = e.target != null ? e.target : e.srcElement;
        target = target._parent;

        if ((e.button == 1 && window.event != null || e.button == 0) && target.classList.contains('draggable')) {

            startPos.x = e.clientX;
            startPos.y = e.clientY;

            offsetPos.x = ExtractNumber(target.style.left);
            offsetPos.y = ExtractNumber(target.style.top);


            _dragElement = target;

            document.onmousemove = onMouseMove;
            document.body.focus();

            document.onselectstart = function () {
                return false;
            };

            target.ondragstart = function () {
                return false;
            };

            return false;
        }
    };

    var onMouseMove = function (e) {
        if (e == null)
            e = window.event;
        _dragElement.style.left = (offsetPos.x + e.clientX - startPos.x) + 'px';
        _dragElement.style.top = (offsetPos.y + e.clientY - startPos.y) + 'px';
    };


    var onMouseUp = function () {
        if (_dragElement != null) {
            document.onmousemove = null;
            document.onselectstart = null;
            _dragElement.ondragstart = null;
            _dragElement = null;
        }
    };

    var ExtractNumber = function (value) {
        var n = parseInt(value);
        return n == null || isNaN(n) ? 0 : n;
    };

    if (!document.onmouseup) {
        document.onmouseup = onMouseUp;
    }

    var makeMovable = function (targetElement, attachEventToElement) {
        targetElement.classList.add("draggable");
        attachEventToElement._parent = targetElement;
        attachEventToElement.onmousedown = onMouseDown;
    };

    if (!window.movable) {
        window.movable = {
            make: makeMovable
        }
    }

})();