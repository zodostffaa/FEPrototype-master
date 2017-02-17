const NODESERVER_APIURL = 'http://runnoob.imwork.net/';
const API_cinemaInfo = NODESERVER_APIURL+'cinema';//查询影吧信息api

var myApp = new Framework7({
    pushState: true,
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
    });
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main',{
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var cinemaInfoUrl = NODESERVER_APIURL+'cinema';

mainView.router.loadPage('cinema.html');

myApp.onPageInit('cinema', function (page) {

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

        $$.post(API_cinemaInfo,
            {
                param_pageSize: $("#pageSize").val(),
                totalPage: $("#totalPage").val()
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
            html += '<a href="cinemadetail.html">';//暂留跳转
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

myApp.init();