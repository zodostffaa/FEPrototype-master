
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
    getCinemaInfomation();

    // 加载flag
    var loading = false;

    $$('.infinite-scroll').on('infinite', function () {
        console.log('进入事件');
        // 如果正在加载，则退出
        if (loading) return;

        // 设置flag
        loading = true;
        getCinemaInfomation();

    });
    console.log('cinema page initialized');
    getCinemaInfomation();

    // 加载flag
    var loading = false;

    $$('.infinite-scroll').on('infinite', function () {
        console.log('进入事件');
        // 如果正在加载，则退出
        if (loading) return;

        // 设置flag
        loading = true;
        getCinemaInfomation();

    });

    function getCinemaInfomation() {

        $$.post('/cinemainfo',
            {
                param_pageSize: $$("#pageSize").val(),
                totalPage: $$("#totalPage").val()
            },
            function(data){
                var data = JSON.parse(data);
                var _totalPage = parseInt(data.totalPage);
                $$("#totalPage").val(_totalPage);
                var _pageSize = parseInt($$("#pageSize").val());
                $$("#pageSize").val(_pageSize+1);
                if(_pageSize < _totalPage){
                    setCinemaForm(data.data);
                }else{
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    myApp.detachInfiniteScroll($$('.infinite-scroll'));
                    // 删除加载提示符
                    $$('.infinite-scroll-preloader').remove();
                }

            });
    }

    function setCinemaForm(cinemaData){

        loading = false;

        // 生成新条目的HTML
        var html = '';

        $$.each(cinemaData,function(i, v){
            html += '<li>';
            html += '<a href="cinemadetail?cinemaid='+v["cinemaId"]+'">';//暂留跳转
            html += '<div class="item-content">';
            html += '<div class="item-media radius"><img src="img/i-f7-ios.png" width="77"></div>';
            html += '<div class="item-inner">';
            html += '<div class="item-title-row">';
            html += '<div class="item-title">'+v["cinemaName"]+'</div>';
            html += '</div>';
            html += '<div class="item-subtitle">';
            html += '<div class="row">';
            html += '<div class="item-text">'+v["cinemaAddress"]+'</div>';
            html += '<div class="item-after">'+v["distance"]+'</div>';
            html += '</div></div></div></div></a></li>';
        });

        $$('.cinema-group ul').append(html);

    }

});
// the first page to load
/*mainView.router.reloadContent($$('cinema').html());*/
myApp.init();
// Later we can cancel/remove this callback:
//contactsCallback.remove();
// Or we can trigger it manually:
//contactsCallback.trigger();