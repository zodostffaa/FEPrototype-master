/**
 * Created by Administrator on 2017/2/13.
 */
var cinemaDao = require('../dao/CinameDao');


module.exports = {
    /**
     * 影吧菜单--页面生成
     * @param req
     * @param res
     */
    getCinemaInfoModel: function (req, res) {
        res.render('cinema', {
            title: '影吧'
        });
    },

    /**
     * 影吧菜单--影吧信息查询->反馈前台组装
     *      预定每次加载10条
     * @param req
     * @param res
     * http -- post -- ajax
     * rout:cinema
     */
    getCinemaInfoLimitModel: function (req, res) {
        var resultData = {};
        var _param_pageSize = req.body.param_pageSize; //当前页
        var _totalPage = req.body.totalPage;            //总页数

        getConutAndPage(_param_pageSize, function(data){

            if(data.isSuccess){
                _totalPage = data.totalPage
            }

            //根据_param_pageSize查询影吧
            cinemaDao.getCinema(_param_pageSize,function(data){

                var cinemaInfo =[];
                if(data.isSuccess){
                    data.rows.forEach(function(val){
                        cinemaInfo.push({
                            cinemaId : val.cinema_id,
                            cinemaName : val.cinema_name,
                            cinemaAddress:val.cinema_address,
                            cinemaPic: 'sdf',
                            distance: '6.5KM'
                        });

                    });

                    resultData = {
                        message : 'success',
                        status : 'success',
                        param_pageSize: (_param_pageSize+1),
                        totalPage :_totalPage,
                        data : cinemaInfo
                    };
                    res.json(resultData);

                }else{
                    resultData = {
                        message : 'error',
                        status : 'error',
                        data : ''
                    };
                }

            })

        });




    }

}

/**
 *  获得影吧总的加载次数 totalPage,默认 1
 * @param callBack
 */

function getConutAndPage(_param_pageSize, callBack){

    //每次加载数量
    var pageSize = 5;
    if ('0' === _param_pageSize) {

        //获得数据总条数
        cinemaDao.findCountByPage(function (data) {

            if (data.isSuccess) {
                var _total_count = data.result[0].count;//总条数
                var totalPage = Math.floor(_total_count%pageSize>0?(_total_count/pageSize+1):(_total_count/pageSize));//加载次数总和
                callBack({
                    isSuccess : true,
                    totalPage : totalPage
                });
            } else {
                callBack({
                    isSuccess : false
                });
                console.log('数据库mtsc2表app_cinema查询出错');
            }

        });

    }else{

        callBack({
            isSuccess : false,
            totalPage : 1
        });

    }
}
// getConutAndPage(3,function(data){
//     if(data.isSuccess){
//         console.log(data.totalPage);
//     }else{
//         console.log(data.totalPage);
//     }
// });
