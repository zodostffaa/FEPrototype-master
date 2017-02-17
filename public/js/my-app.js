// Initialize your app
var myApp = new Framework7({
    init: false, //Disable App's automatica initialization

    // Default title for modals
    modalTitle: 'My App',

    // If it is webapp, we can enable hash navigation:
    pushState: true,

    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('cinema', function (page) {
    console.log('About page initialized');

});
// the first page to load
/*mainView.router.reloadContent($$('cinema').html());*/
myApp.init();
// Later we can cancel/remove this callback:
//contactsCallback.remove();
// Or we can trigger it manually:
//contactsCallback.trigger();