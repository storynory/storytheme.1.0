/*!
 * jQuery Tools v1.2.6 - The missing UI library for the Web
 * 
 * rangeinput/rangeinput.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */
(function(a){a.tools=a.tools||{version:"v1.2.6"};var b;b=a.tools.rangeinput={conf:{min:0,max:100,step:"any",steps:0,value:0,precision:undefined,vertical:0,keyboard:!0,progress:!1,speed:100,css:{input:"range",slider:"slider",progress:"progress",handle:"handle"}}};var c,d;a.fn.drag=function(b){document.ondragstart=function(){return!1},b=a.extend({x:!0,y:!0,drag:!0},b),c=c||a(document).bind("mousedown mouseup",function(e){var f=a(e.target);if(e.type=="mousedown"&&f.data("drag")){var g=f.position(),h=e.pageX-g.left,i=e.pageY-g.top,j=!0;c.bind("mousemove.drag",function(a){var c=a.pageX-h,e=a.pageY-i,g={};b.x&&(g.left=c),b.y&&(g.top=e),j&&(f.trigger("dragStart"),j=!1),b.drag&&f.css(g),f.trigger("drag",[e,c]),d=f}),e.preventDefault()}else try{d&&d.trigger("dragEnd")}finally{c.unbind("mousemove.drag"),d=null}});return this.data("drag",!0)};function e(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c}function f(a,b){var c=parseInt(a.css(b),10);if(c)return c;var d=a[0].currentStyle;return d&&d.width&&parseInt(d.width,10)}function g(a){var b=a.data("events");return b&&b.onSlide}function h(b,c){var d=this,h=c.css,i=a("<div><div/><a href='#'/></div>").data("rangeinput",d),j,k,l,m,n;b.before(i);var o=i.addClass(h.slider).find("a").addClass(h.handle),p=i.find("div").addClass(h.progress);a.each("min,max,step,value".split(","),function(a,d){var e=b.attr(d);parseFloat(e)&&(c[d]=parseFloat(e,10))});var q=c.max-c.min,r=c.step=="any"?0:c.step,s=c.precision;if(s===undefined)try{s=r.toString().split(".")[1].length}catch(t){s=0}if(b.attr("type")=="range"){var u=b.clone().wrap("<div/>").parent().html(),v=a(u.replace(/type/i,"type=text data-orig-type"));v.val(c.value),b.replaceWith(v),b=v}b.addClass(h.input);var w=a(d).add(b),x=!0;function y(a,f,g,h){g===undefined?g=f/m*q:h&&(g-=c.min),r&&(g=Math.round(g/r)*r);if(f===undefined||r)f=g*m/q;if(isNaN(g))return d;f=Math.max(0,Math.min(f,m)),g=f/m*q;if(h||!j)g+=c.min;j&&(h?f=m-f:g=c.max-g),g=e(g,s);var i=a.type=="click";if(x&&k!==undefined&&!i){a.type="onSlide",w.trigger(a,[g,f]);if(a.isDefaultPrevented())return d}var l=i?c.speed:0,t=i?function(){a.type="change",w.trigger(a,[g])}:null;j?(o.animate({top:f},l,t),c.progress&&p.animate({height:m-f+o.height()/2},l)):(o.animate({left:f},l,t),c.progress&&p.animate({width:f+o.width()/2},l)),k=g,n=f,b.val(g);return d}a.extend(d,{getValue:function(){return k},setValue:function(b,c){z();return y(c||a.Event("api"),undefined,b,!0)},getConf:function(){return c},getProgress:function(){return p},getHandle:function(){return o},getInput:function(){return b},step:function(b,e){e=e||a.Event();var f=c.step=="any"?1:c.step;d.setValue(k+f*(b||1),e)},stepUp:function(a){return d.step(a||1)},stepDown:function(a){return d.step(-a||-1)}}),a.each("onSlide,change".split(","),function(b,e){a.isFunction(c[e])&&a(d).bind(e,c[e]),d[e]=function(b){b&&a(d).bind(e,b);return d}}),o.drag({drag:!1}).bind("dragStart",function(){z(),x=g(a(d))||g(b)}).bind("drag",function(a,c,d){if(b.is(":disabled"))return!1;y(a,j?c:d)}).bind("dragEnd",function(a){a.isDefaultPrevented()||(a.type="change",w.trigger(a,[k]))}).click(function(a){return a.preventDefault()}),i.click(function(a){if(b.is(":disabled")||a.target==o[0])return a.preventDefault();z();var c=j?o.height()/2:o.width()/2;y(a,j?m-l-c+a.pageY:a.pageX-l-c)}),c.keyboard&&b.keydown(function(c){if(!b.attr("readonly")){var e=c.keyCode,f=a([75,76,38,33,39]).index(e)!=-1,g=a([74,72,40,34,37]).index(e)!=-1;if((f||g)&&!(c.shiftKey||c.altKey||c.ctrlKey)){f?d.step(e==33?10:1,c):g&&d.step(e==34?-10:-1,c);return c.preventDefault()}}}),b.blur(function(b){var c=a(this).val();c!==k&&d.setValue(c,b)}),a.extend(b[0],{stepUp:d.stepUp,stepDown:d.stepDown});function z(){j=c.vertical||f(i,"height")>f(i,"width"),j?(m=f(i,"height")-f(o,"height"),l=i.offset().top+m):(m=f(i,"width")-f(o,"width"),l=i.offset().left)}function A(){z(),d.setValue(c.value!==undefined?c.value:c.min)}A(),m||a(window).load(A)}a.expr[":"].range=function(b){var c=b.getAttribute("type");return c&&c=="range"||a(b).filter("input").data("rangeinput")},a.fn.rangeinput=function(c){if(this.data("rangeinput"))return this;c=a.extend(!0,{},b.conf,c);var d;this.each(function(){var b=new h(a(this),a.extend(!0,{},c)),e=b.getInput().data("rangeinput",b);d=d?d.add(e):e});return d?d:this}})(jQuery);


/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
 (function($) {
    $.cookie = function(key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
        options = $.extend({},
        options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires,
            t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
        encodeURIComponent(key), '=', options.raw ? value: encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '',
        // use expires attribute, max-age is not supported by IE
        options.path ? '; path=' + options.path: '',
        options.domain ? '; domain=' + options.domain: '',
        options.secure ? '; secure': ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var decode = options.raw ?
    function(s) {
        return s;
    }: decodeURIComponent;

    var pairs = document.cookie.split('; ');
    for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
        if (decode(pair[0]) === key) return decode(pair[1] || '');
        // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
    }
    return null;
};


// get languages available and put them inside form for user to select


 

// set cookie on form's change event
$("#lingo").change(function() {
    var lingo = $(this).val();
    $.cookie('lingo', lingo, {
        expires: 30,
        path : '/'
    });

});

// select individual words
select = function() {
    var sel = (document.selection && document.selection.createRange().text) ||
    (window.getSelection && window.getSelection().toString());
    return sel;
};


// populate the form with languages available for user to select
populate = function(data) {
    result = data.data.languages;
    $.each(result,
    function() {
	  if (this.language === $.cookie('lingo')) {
		 $("#lingo").prepend("<option  value = '" + this.language + "'> " + this.name + "</option>");		
	}
	else {
        $("#lingo").append("<option value = '" + this.language + "'> " + this.name + "</option>");

    }
    });
};


// ajax get languages available and fire the populate function
$.ajax({
    type: "GET",
    url: "https://www.googleapis.com/language/translate/v2/languages",
    data: {
        key: "AIzaSyDaEpKloVPE1ok5qGAxyQbLkD9fAMpvFu0",
        target: "en"
    },
    dataType: 'jsonp',
    success: function(data) {
       populate(data);
    },
    error: function(data) {
        alert('sorry, language not available');
    }
});



// call google's api using the word found in the select function and the language selected in the form
translate = function() {

    if ($.cookie('lingo') === null) {
        lingo = "af";
    }
    else {
        lingo = $.cookie('lingo');
    };


    $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/language/translate/v2",
        data: {
            key: "AIzaSyDaEpKloVPE1ok5qGAxyQbLkD9fAMpvFu0",
            source: "en",
            target: lingo,
            q: select()
        },
        dataType: 'jsonp',
        success: function(data) {
            $("#tooltip").html(data.data.translations[0].translatedText);
        },
        error: function(data) {
            alert('sorry, translation did not work');
        }
    });
};



	// activate on double click and add tool tip
	$(document).dblclick(function(e) {
	    translate();
	    $("#tooltip").css("left", e.pageX);
	    $("#tooltip").css("top", (e.pageY-60));
	});
	
	
	
})(jQuery);

