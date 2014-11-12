define([
    'views/IconView'
], function (IconView) {
    var initialize = function () {

        document.body.style.height = window.innerHeight - 20 + 'px';
        document.body.style.backgroundSize = window.innerWidth + "px " + window.innerHeight + "px";
        var icon = new IconView("text.txt", "doc");
        var icon1 = new IconView("img.png", "img");
        var icon2 = new IconView("MyPdf.pdf", "pdf");
    };

    initialize();
});
