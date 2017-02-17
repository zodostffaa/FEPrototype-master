// Initialize your app
var myApp = new Framework7();
// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {});


// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('cinema', function (page) {
    console.log('cinema is open');
    // run createContentPage func after link was clicked
    // $$('.infinite-scroll').on('infinite', function () {
    //     console.log('ddddd')
    // });
});
