"use strict";

var workerUtils = require('../common/worker.js')

global.addEventListener('message', function(e){
    var packet = e.data;
    workerUtils.dispatchHandlers(packet, obj => postMessage(obj))
})

exports.getLanguageData = require('./lang.js')

exports.getCore = function(req, res){
    if(!global.TesseractCore){
        res.progress({ status: 'loading tesseract core' })
        importScripts(req.workerOptions.tesseractPath)
        res.progress({ status: 'loaded tesseract core' })
    }
    return TesseractCore
}

workerUtils.setAdapter(module.exports);
