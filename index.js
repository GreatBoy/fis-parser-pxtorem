/*
 * fis-pxtorem
 */

'use strict';


var regPx = /url\((.*?\d+px.*?)*\)|(\d+)\s*?(px).*?(\)?)/ig;
/**
 * 按照16px=1rem做转换
*/
var pxToRem = function(data){
    return data.replace(regPx, function(){
        try{
            var pxValue = arguments[2];
            if(pxValue === undefined) 
                return arguments[0];
            var px = arguments[3];
            var rem;
            if(px == 'px'){
                rem = (Number(pxValue)/16).toFixed(4,10);
                rem = parseIntNum(rem);
                return rem + 'rem';
            }else {
                return arguments[0];
            }          
        } catch(e){
            console.log(e.message);
        }
    })
};

/**
 *  去掉浮点数的0
*/
var parseIntNum = function(num){
    try{
        var strNum = num + '';
        strNum = strNum.split('.');
        if(strNum[1]){
            strNum[1] = strNum[1].replace(/0{0,}$/ig,'');
            if(strNum[1]){
                return Number(strNum.join('.'));
            }
            return strNum[0];
        }
        return num;
    } catch(e){
        console.log(e.message);
    }
};

module.exports = function(content, file, conf){
    try{
	 	if (file.isCssLike) {
            if(content.indexOf('px')){
                content = pxToRem(content);
            }
	    }
	    return content;
    } catch(e){
        console.dir(e.message);
    }
};


