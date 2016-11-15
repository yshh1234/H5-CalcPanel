/**
 * Created by Evonnehui on 2016/11/9.
 * based on jquery/zepto
 * css based on resize.js
 * @params option
 * @params input
 * @params reg[option:default /^\d{0,7}(?:\.\d{0,2})?$/]
 * @params delay[option:default 300]
 */
function calcInput(option) {
    var _this = this;
    _this.init(option);
}
calcInput.prototype={
    _input:null,
    _delay:0,
    _value1:'',
    _value2:'',
    status:0,
    isFloat:false,
    _reg:'',
    init:function (option) {
        this._input = option.input;
        this._delay = option.delay||300;
        this._reg = option._reg||/^\d{0,7}(?:\.\d{0,2})?$/;
        this.bindClick();
    },
    bindClick:function () {
        var _this = this;
        $('.'+this._input).parent().on('click',"."+this._input,function () {
            _this.showPage();
        });

    },
    bindKey:function () {
        var _this = this;
        /**
         * 取消按钮
         */
        this.getKey('取消').on('click',function () {
            _this._value1 = '';
            _this._value2 = '';
            _this.status = 0;
            _this.closePage();
            $('.mask').hide();
        });
        /**
         * 遮罩层
         */
         $('.mask').on('click',function () {
            _this._value1 = '';
            _this._value2 = '';
            _this.status = 0;
            _this.closePage();
             $('.mask').hide();
        });
        /**
         * 数字键
         */
        for(var i = 0;i<10;i++){
            this.bindNumKey(i);
        }
        /**
         * 小数点
         */
        this.getKey('.').on('click',function () {
               _this.showInputValue('.');
        });
        /**
         * 退格
         */
        this.getKey('Del').on('click',function () {
            if(_this._value2===''){
                _this._value1 = _this._value1.substring(0,_this._value1.length-1);
                $('.calcResult').find('input').val(_this._value1);
            }else{
                _this._value2 = _this._value2.substring(0,_this._value2.length-1);
                $('.calcResult').find('input').val(_this._value2);
            }
        });
        /**
         * +-*%
         */
        this.getKey('+').on('click',function () {
            if(this.status!==0&&_this._value2!==''&&this.status!==5){
                _this.calc();
            }
            _this.status = 1;
        });
        this.getKey('-').on('click',function () {
            if(this.status!==0&&_this._value2!==''&&this.status!==5){
                _this.calc();
            }
            _this.status = 2;
        });
        this.getKey('*').on('click',function () {
            if(this.status!==0&&_this._value2!==''&&this.status!==5){
                _this.calc();
            }
            _this.status = 3;
        });
        this.getKey('/').on('click',function () {
            if(this.status!==0&&_this._value2!==''&&this.status!==5){
                _this.calc();
            }
            _this.status = 4;
        });
        /**
         * =
         */
        this.getKey('=').on('click',function () {
            _this.calc();
        });
        /**
         * C
         */
        this.getKey('C').on('click',function () {
            _this._value1 = '';
            _this._value2 = '';
            _this.status = 0;
            $('.calcResult').find('input').val('');
        });
        /**
         * 确认按钮
         */
        this.getKey('确认').on('click',function () {
            var result = '';
            if(_this.status===5||_this.status===0){
                result = _this._value1;
            }else{
                _this.calc();
                result = _this._value1;
            }
            $('.'+_this._input).val(parseFloat(result).toFixed(_this._reg.toString().substring(19,20)));
            _this._value1 = '';
            _this._value2 = '';
            _this.status = 0;
            _this.closePage();
            $('.mask').hide();
        });
    },
    bindNumKey:function (key) {
        var _this = this
        this.getKey(key).on('click',function(){
            _this.showInputValue(key);
        });
    },
    showPage:function () {
        this.createPage(this._input);
        var _Page = $('.calcPage');
        var position = _Page.css('position');
        _Page.show();
        _Page.css({
            position: 'absolute',
            visibility: 'hidden'
        });
        var height = _Page.height();
        _Page.css({
            position: position,
            visibility: 'visible',
            overflow: 'hidden',
            height: 0
        });
        _Page.animate({
            height: height
        }, this._delay);
        this.bindKey();
    },
    closePage:function () {
        var _this = this;
        var _Page = $('.calcPage');
        var position = _Page.css('position');
        _Page.css({
            position: 'absolute',
            visibility: 'hidden'
        });
        var height = _Page.height();
        _Page.css({
            position: position,
            visibility: 'visible',
            overflow: 'hidden',
            height: height
        });
        _Page.animate({
            height: 0
        }, _this._delay,'linear',function () {
            _this.destroyPage();
        });
    },
    createPage:function (input) {
        var str = "<div class='calcPage'>" +
            "<div class='calcResult'>" +
            "<input type='text'readonly='readonly'>" +
            "</div>" +
            "<div class='calcBtn'>" +
            "<ul>" +
            "<li data-btn='1' class='calcBtnLi'>1</li>" +
            "<li data-btn='2' class='calcBtnLi'>2</li>" +
            "<li data-btn='3' class='calcBtnLi'>3</li>" +
            "<li data-btn='+' class='calcBtnLi'>+</li>" +
            "<li data-btn='Del' class='calcBtnLi'>Del</li>" +
            "<li data-btn='4' class='calcBtnLi'>4</li>" +
            "<li data-btn='5' class='calcBtnLi'>5</li>" +
            "<li data-btn='6' class='calcBtnLi'>6</li>" +
            "<li data-btn='-' class='calcBtnLi'>-</li>" +
            "<li data-btn='C' class='calcBtnLi'>C</li>" +
            "<li data-btn='7' class='calcBtnLi'>7</li>" +
            "<li data-btn='8' class='calcBtnLi'>8</li>" +
            "<li data-btn='9' class='calcBtnLi'>9</li>" +
            "<li data-btn='*' class='calcBtnLi'>*</li>" +
            "<li data-btn='确认' class='calcBtnLi'>确认</li>" +
            "<li data-btn='.' class='calcBtnLi'>.</li>" +
            "<li data-btn='0' class='calcBtnLi'>0</li>" +
            "<li data-btn='=' class='calcBtnLi'>=</li>" +
            "<li data-btn='/' class='calcBtnLi'>/</li>" +
            "<li data-btn='取消' class='calcBtnLi'>取消</li>" +
            "</ul>" +
            "</div>" +
            "</div>" +
            "<div class='mask'></div>" +
            "<style>"+
            ".calcPage{background-color: #7a7a7a;width: 7.5rem;height: 5rem;position: fixed;bottom: 0;left: 0;z-index: 9999;}" +
            ".calcResult{background-color: #cacaca;width: 100%;height: 20%;margin: 0;}" +
            ".calcResult input{border-radius:0;margin: 0;border: 0.02rem solid #cacaca;height: 0.96rem;width: 7.46rem;padding: 0;background-color: #7a7a7a;color: #fff;text-align: right;font-size: 0.56rem;}" +
            ".calcBtn{width: 7.5rem;height:4rem;position: relative;}" +
            ".calcBtn ul{list-style: none;width: 7.5rem;height: 4rem;padding-left: 0;margin: 0;}" +
            ".calcBtnLi{background-color: #7a7a7a;border-left: 0.04rem solid #cacaca;border-top: 0.04rem solid #cacaca;width: 1.46rem;height: 0.96rem;float: left;font-size: 0.56rem;color: #ffffff;line-height: 1rem;text-align: center;}" +
            ".calcBtnLi:active{background-color: #cacaca;}" +
            ".mask{background-color: rgba(0,0,0,0.3);position: absolute;left: 0;top:0;width: 7.5rem;height: 100%;z-index: 998;}" +
            "</style>";
        $(str).insertAfter("."+input);
        $(".calcPage").hide();
    },
    destroyPage:function () {
        $(".calcPage").remove();
    },
    getKey:function (str) {
        var key = $(".calcBtnLi[data-btn='"+str+"']")
        return key;
    },
    showInputValue:function (key) {
        if(this.status===0){
            if(this._reg.test(this._value1+key)){
                this._value1 = this._value1+key;
            }
            $('.calcResult').find('input').val(this._value1);
        }else if(this.status===5){
            this._value1 = key;
            this.status = 0;
            $('.calcResult').find('input').val(this._value1);
        }else{
            if(this._reg.test(this._value2+key)){
                this._value2 = this._value2+key;
            }
            $('.calcResult').find('input').val(this._value2);
        }
    },
    calc:function () {
        var _this = this;
        var v1 = parseFloat(this._value1);
        var v2 = parseFloat(this._value2);
        var result = 0;
        switch (this.status){
            case 1: result = _this.addFuc(v1,v2);
                break;
            case 2: result = _this.minusFuc(v1,v2);
                break;
            case 3: result = _this.plusFuc(v1,v2);
                break;
            case 4: result = _this.divideFuc(v1,v2);
                break
            default:
        }
        _this._value1 = parseFloat(result).toFixed(this._reg.toString().substring(19,20));
        _this._value2 = '';
        _this.status = 5;
        $('.calcResult').find('input').val(parseFloat(result).toFixed(this._reg.toString().substring(19,20)));
    },
    addFuc:function (arg1,arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    },
    minusFuc:function (arg1,arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        //last modify by deeka
        //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    plusFuc:function (arg1,arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        }
        catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        }
        catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    divideFuc:function (arg1,arg2) {
        var t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
        }
        with (Math) {
            r1 = Number(arg1.toString().replace(".", ""));
            r2 = Number(arg2.toString().replace(".", ""));
            return (r1 / r2) * pow(10, t2 - t1);
        }
    }
};
;(function (win) {
    "use strict";
    var timer = null;
    var rem = 12;
    var doc = win.document;
    var docEl = doc.documentElement;
    var visualWidth = 640;

    var vEl = doc.querySelector('meta[name="visual-width"]');
    if (vEl) {
        var vWidth = vEl.getAttribute('content');
        if (vWidth) {
            visualWidth = parseInt(vWidth);
        }
    }

    /**
     * 刷新页面REM值
     */
    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        width = width > 768 ? visualWidth : width;
        rem = width / (visualWidth / 100);
        docEl.style.fontSize = rem + 'px';
    }

    /**
     * 页面缩放或重载时刷新REM
     */
    win.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(refreshRem, 300);
        }
    }, false);

    // 解决font-size过大导致间距不正常，必须指定body字号为12px
    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = '12px';
    } else {
        doc.addEventListener('DOMContentLoaded', function (e) {
            doc.body.style.fontSize = '12px';
        }, false);
    }

    refreshRem();
})(window);

