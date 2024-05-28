var core = core || {};
(function () {

    core.ui.setBusy = function (element, text, freezeDelay) {
        FreezeUI({ element: element, text: text ? text : ' ', freezeDelay: freezeDelay });
    };

    core.ui.clearBusy = function (element, freezeDelay) {
        UnFreezeUI({ element: element,freezeDelay: freezeDelay });
    };

})();
