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

var hiFive,
testAudio;


$(".seekBar").rangeinput();


testAudio = function() {
    try {
        if (document.createElement('audio').canPlayType('audio/mpeg')) {
            this.mp3 = "true";
            return this.mp3;
        } else {
            this.mp3 = "false";
            return this.mp3;
        }
    } catch(error) {
        this.mp3 = "false";
        return this.mp3;
    }
};

if (testAudio() === "true") {
    hiFive = {
        mp3: $("a.playPause").attr("href"),
        audio: new Audio(),
        init: function() {
            hiFive.audio.src = hiFive.mp3;
            return hiFive.audio.src;
        },
        formatTime: function(seconds) {
            var minutes;
            seconds = Math.round(seconds);
            minutes = Math.floor(seconds / 60);
            if (minutes < 10) minutes = "0" + minutes;
            seconds = seconds - (minutes * 60);
            if (seconds < 10) seconds = "0" + seconds;
            return minutes + ":" + seconds;
        },
        getDuration: function(myAudio) {
            var duration;
            duration = hiFive.formatTime(myAudio.duration);
            return $("span.duration").text(duration);
        },
        update: function(myAudio) {
            var time;
            time = hiFive.formatTime(myAudio.currentTime);
            $("span.time").text(time);
        },
        updateSeekbar: function(myAudio) {
         	var percent;
		    percent = (myAudio.currentTime / myAudio.duration) * 100;
		    $(".seekBar").val(percent);      
        },

        moveHandle : function (myAudio) {
	         var percent,px;
             percent = (myAudio.currentTime / myAudio.duration) * 100;
	         px = (percent * 250) / 100;  // bar is 250px 
	        px = px - 20; // handle is 20px
	          console.log(px);
	          if (px > 0) {
	              $(".handle").css("left" , px +"px")	
           }
        },

        scrubAudio: function(myAudio, value) {
            var newtime;
            var duration = myAudio.duration;
            newtime = (value * duration) / 100;
          myAudio.pause();
          myAudio.currentTime = newtime;
           myAudio.play();
                   
        },


        playPause: function(audio) {
            if (hiFive.audio.paused) {
                return hiFive.audio.play();
            } else {
                return hiFive.audio.pause();
            }
        }
    };


    hiFive.init();



    $("a.playPause").on("click",
    function() {
        $(this).toggleClass("pause");
        hiFive.playPause(hiFive.audio);
        return false;
    });


    $(":range").bind("change",
    function(event, value) {
        hiFive.scrubAudio(hiFive.audio, value);
    });


    $(hiFive.audio).bind('timeupdate',
    function() {
	    hiFive.update(hiFive.audio);
	     hiFive.moveHandle(hiFive.audio);
       hiFive.getDuration(hiFive.audio);

    });



    $(hiFive.audio).on('play',
    function(evt) {
        $("a.playPause").removeClass("play");
        $("a.playPause").addClass("pause");

    });

    $(hiFive.audio).on('pause',
    function(evt) {

        $("a.playPause").removeClass("pause");
        $("a.playPause").addClass("play");
    });

   $(hiFive.audio).on('loadstart',
    function() {
        $("span.indicator").addClass("loader");
    

    });

   $(hiFive.audio).on('loadeddata',
    function(evt) {
        $("span.indicator").removeClass("loader");
    });

    $(hiFive.audio).on('loadedmetadata',
    function(evt) {

         hiFive.getDuration(hiFive.audio);

    });
  

 
}

 else {

    /*  Flash library
*****************************************************/
    var myListener = {};

    var myobject = '<object class="playerpreview" id="myFlash" type="application/x-shockwave-flash" data="/player_mp3_js.swf" width="1" height="1"><param name="movie" value="/player_mp3_js.swf" /><param name="AllowScriptAccess" value="always" /><param name="FlashVars" value="listener=myListener&amp;interval=500" /><param name="useexternalinterface" value="1" /></object>';

    $(".audio").apppend(myobject);

    myListener.onInit = function()
    {
        this.position = 0;
    };


    var flashy = {

        mp3: $("a.playPause").attr("href"),


        flashObject: $("#myFlash")[0],
        /* could be a function that returns flash object so we can set it in init */
        formatTime: function(seconds) {
            var minutes;
            seconds = Math.round(seconds);
            seconds = seconds / 1000;
            minutes = Math.floor(seconds / 60);
            minutes = (minutes >= 10) ? minutes: "0" + minutes;
            seconds = Math.floor(seconds % 60);
            seconds = (seconds >= 10) ? seconds: "0" + seconds;
            return minutes + ":" + seconds;
        },



        play: function(mp3, flash) {

            if (myListener.position === 0) {
                flashy.flashObject.SetVariable("method:setUrl", flashy.mp3);
            }

            flashy.flashObject.SetVariable("method:play", "");
            flashy.flashObject.SetVariable("enabled", "true");

            $("a.playPause").removeClass("play");
            $("a.playPause").addClass("pause");
        },

        pause: function() {
            flashy.flashObject.SetVariable("method:pause", "");
            $("a.playPause").removeClass("pause");
            $("a.playPause").addClass("play");
        },

        playPause: function() {

            if (myListener.isPlaying === "true")

            {

                flashy.pause();

            }

            else {
                flashy.play();
            }

        },

        setTime: function(newtime) {
            var time = flashy.formatTime(newtime);
            $(".time").html(time);

        },

        setDuration: function(percentLoaded, duration) {
            if (percentLoaded < 100) {
               $(".duration").html(percentLoaded +" % ");
               $("span.indicator").addClass("loader");
                $(".progress").css({width: percentLoaded + '%'});
            }
            else {
	            duration = flashy.formatTime(duration);
                $(".duration").html(duration);
                $("span.indicator").removeClass("loader");
            }

        },

   
        updateSeekbar: function(position) {
            var duration = myListener.duration;
            var percent = (position / duration) * 100;

            if (myListener.bytesPercent === "100") {
                $(".handle").css("left", percent + "%");
            }
        },

        stop: function() {
            flashy.flashObject.SetVariable("method:stop", "");
        },

        scrubAudio: function(value) {
            var duration = myListener.duration;
            var newtime = (value * duration) / 100;

            flashy.flashObject.SetVariable("method:setPosition", newtime);

        },

        setPosition: function() {
            var position = document.getElementById("inputPosition").value;
            flashy.flashObject.SetVariable("method:setPosition", position);
        }



    };

    myListener.onUpdate = function() {
        flashy.setTime(this.position);
        flashy.setDuration(this.bytesPercent, this.duration);
        flashy.updateSeekbar(this.position);

    };

    /* Flash Audio Events
******************************/
    $("a.playPause").bind("click",
    function() {
        $(this).toggleClass("pause");
        flashy.playPause();
        return false;
    });

    $(":range").change(function(event, value) {

        flashy.scrubAudio(value);
    });

}

$("a.open").click(function () {
	var url =  $(this).attr("href");
	window.open(url, "unicorn", "width=500, height=100, screenX=100");
	return false;
	
});



/*
	Slimbox v2.04 - The ultimate lightweight Lightbox clone for jQuery
	(c) 2007-2010 Christophe Beyls <http://www.digitalia.be>
	MIT-style license.
*/
(function(w){var E=w(window),u,f,F=-1,n,x,D,v,y,L,r,m=!window.XMLHttpRequest,s=[],l=document.documentElement,k={},t=new Image(),J=new Image(),H,a,g,p,I,d,G,c,A,K;w(function(){w("body").append(w([H=w('<div id="lbOverlay" />')[0],a=w('<div id="lbCenter" />')[0],G=w('<div id="lbBottomContainer" />')[0]]).css("display","none"));g=w('<div id="lbImage" />').appendTo(a).append(p=w('<div style="position: relative;" />').append([I=w('<a id="lbPrevLink" href="#" />').click(B)[0],d=w('<a id="lbNextLink" href="#" />').click(e)[0]])[0])[0];c=w('<div id="lbBottom" />').appendTo(G).append([w('<a id="lbCloseLink" href="#" />').add(H).click(C)[0],A=w('<div id="lbCaption" />')[0],K=w('<div id="lbNumber" />')[0],w('<div style="clear: both;" />')[0]])[0]});w.slimbox=function(O,N,M){u=w.extend({loop:false,overlayOpacity:0.8,overlayFadeDuration:400,resizeDuration:400,resizeEasing:"swing",initialWidth:250,initialHeight:250,imageFadeDuration:400,captionAnimationDuration:400,counterText:"Image {x} of {y}",closeKeys:[27,88,67],previousKeys:[37,80],nextKeys:[39,78]},M);if(typeof O=="string"){O=[[O,N]];N=0}y=E.scrollTop()+(E.height()/2);L=u.initialWidth;r=u.initialHeight;w(a).css({top:Math.max(0,y-(r/2)),width:L,height:r,marginLeft:-L/2}).show();v=m||(H.currentStyle&&(H.currentStyle.position!="fixed"));if(v){H.style.position="absolute"}w(H).css("opacity",u.overlayOpacity).fadeIn(u.overlayFadeDuration);z();j(1);f=O;u.loop=u.loop&&(f.length>1);return b(N)};w.fn.slimbox=function(M,P,O){P=P||function(Q){return[Q.href,Q.title]};O=O||function(){return true};var N=this;return N.unbind("click").click(function(){var S=this,U=0,T,Q=0,R;T=w.grep(N,function(W,V){return O.call(S,W,V)});for(R=T.length;Q<R;++Q){if(T[Q]==S){U=Q}T[Q]=P(T[Q],Q)}return w.slimbox(T,U,M)})};function z(){var N=E.scrollLeft(),M=E.width();w([a,G]).css("left",N+(M/2));if(v){w(H).css({left:N,top:E.scrollTop(),width:M,height:E.height()})}}function j(M){if(M){w("object").add(m?"select":"embed").each(function(O,P){s[O]=[P,P.style.visibility];P.style.visibility="hidden"})}else{w.each(s,function(O,P){P[0].style.visibility=P[1]});s=[]}var N=M?"bind":"unbind";E[N]("scroll resize",z);w(document)[N]("keydown",o)}function o(O){var N=O.keyCode,M=w.inArray;return(M(N,u.closeKeys)>=0)?C():(M(N,u.nextKeys)>=0)?e():(M(N,u.previousKeys)>=0)?B():false}function B(){return b(x)}function e(){return b(D)}function b(M){if(M>=0){F=M;n=f[F][0];x=(F||(u.loop?f.length:0))-1;D=((F+1)%f.length)||(u.loop?0:-1);q();a.className="lbLoading";k=new Image();k.onload=i;k.src=n}return false}function i(){a.className="";w(g).css({backgroundImage:"url("+n+")",visibility:"hidden",display:""});w(p).width(k.width);w([p,I,d]).height(k.height);w(A).html(f[F][1]||"");w(K).html((((f.length>1)&&u.counterText)||"").replace(/{x}/,F+1).replace(/{y}/,f.length));if(x>=0){t.src=f[x][0]}if(D>=0){J.src=f[D][0]}L=g.offsetWidth;r=g.offsetHeight;var M=Math.max(0,y-(r/2));if(a.offsetHeight!=r){w(a).animate({height:r,top:M},u.resizeDuration,u.resizeEasing)}if(a.offsetWidth!=L){w(a).animate({width:L,marginLeft:-L/2},u.resizeDuration,u.resizeEasing)}w(a).queue(function(){w(G).css({width:L,top:M+r,marginLeft:-L/2,visibility:"hidden",display:""});w(g).css({display:"none",visibility:"",opacity:""}).fadeIn(u.imageFadeDuration,h)})}function h(){if(x>=0){w(I).show()}if(D>=0){w(d).show()}w(c).css("marginTop",-c.offsetHeight).animate({marginTop:0},u.captionAnimationDuration);G.style.visibility=""}function q(){k.onload=null;k.src=t.src=J.src=n;w([a,g,c]).stop(true);w([I,d,g,G]).hide()}function C(){if(F>=0){q();F=x=D=-1;w(a).hide();w(H).stop().fadeOut(u.overlayFadeDuration,j)}return false}})(jQuery);

$(document).ready(function () {
jQuery("#mylink").slimbox();
});