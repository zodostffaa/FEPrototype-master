/**
 * Created by Administrator on 2017/2/9.
 */
var cinemaDao = require('../dao/CinameDao');
cinemaDao.getCinema(1,function (data) {

  if (data.isSuccess) {
    console.log(data.rows);
    // data.rows.forEach(function(val){
    //   ;console.log(val.cinema_name);
    // });
  }

});