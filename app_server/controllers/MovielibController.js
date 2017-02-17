/**
 * Created by fupeng on 17/2/17.
 */
var request = require('request');
var movielibModel = require('../models/MovielibModel');
module.exports.getMovielib = function (req,res){
    movielibModel.getMovielibInfoModel(req,res);
}

