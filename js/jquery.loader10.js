/*
 * jQuery.range - A tiny, easily styleable range selector
 * Tom Moor, http://tommoor.com
 * Copyright (c) 2011 Tom Moor
 * MIT Licensed
 * @version 1.0
 */

(function($){

  var TinyRange = function(){
    // locals
    var options;
    var $input;
    var $rail;
    var $handle;
    var $handle2;
    var $selection;
    var $dragging;
    var $original;
    var jump;
    var size;
    var defaults = {
      orientation: 'horizontal', // todo
      range: true,
      values: false,
      snap: false,
      change: function(){},
      blur: function(){}
    };
    
    var jumpHandle = function(ev) {
      ev.pageX = ev.pageX - $input.offset().left;
      
      // get closest handle
      var x1 = $handle.position().left;
      var dist = ev.pageX - x1;
      
      if($handle2){
        var x2 = $handle2.position().left;
        var dist2 = ev.pageX - x2;
      }

      // move towards click
      if(!$handle2 || Math.abs(dist) < Math.abs(dist2) ){
        if(dist > 0) moveHandle($handle, valueToPx(jump)+x1);
        if(dist < 0) moveHandle($handle, -valueToPx(jump)+x1);
      } else {
        if(dist2 > 0) moveHandle($handle2, valueToPx(jump)+x2);
        if(dist2 < 0) moveHandle($handle2, -valueToPx(jump)+x2);
      }
    }
    
    var moveHandle = function($h, p, update){

      var boundR = $input.width()-size;
      var boundL = 0;

      if(options.range){
        if($h[0] === $handle[0]){
          boundR = $handle2.position().left;
        } else {
          boundL = $handle.position().left;
        }
      }
      
      if(p >= boundR){
        p = boundR;
      } else if(p <= boundL){
        p = boundL;
      }
      
      if(options.snap && p !== boundR){
        var snapPx = valueToPx(options.snap);
        p = Math.round(p/snapPx) * snapPx;
      }
      
      $h.css({'left': p, 'position': 'absolute'});
      if(options.range) updateSelection();
      if(update !== false) updateValues();
    }
    
    var dragStart = function(ev){
      ev.stopPropagation();
      ev.preventDefault();
      
      $dragging = $(this);
    };
    
    var drag = function(ev){
     
      if($dragging){
        ev.preventDefault();
        var pos = ev.pageX - $input.offset().left;
        
        moveHandle($dragging, pos);
      }
    };
    
    var updateSelection = function(){
    
      var p = $handle.position().left;
      var w = $handle2.position().left-p;
      $selection.css({
        'left': p, 
        'width': w,
        'position': 'absolute'
      });
    };
    
    var dragEnd = function(ev){
      if($dragging){
        $dragging = null;
        options.blur(options.values);
      }
    };
    
    var updateValues = function(){

      var prev;
      if(options.range){
      
        prev = options.values.slice(); // clone
        options.values[0] = pxToValue($handle);
        options.values[1] = pxToValue($handle2);
        
        // set value on original element
        $original.val(options.values[0] +','+options.values[1]);
      } else {
      
        prev = options.values;
        options.values = pxToValue($handle);
        
        // set value on original element
        $original.val(options.values);
      }

      if(options.values !== prev) options.change(options.values);
    };
    
    var updateHandles = function(){

      if (options.values){
        if (options.range){
          moveHandle($handle2, valueToPx(options.values[1]), false);
          moveHandle($handle, valueToPx(options.values[0]), false);
        } else {
          moveHandle($handle, valueToPx(options.values), false);
        }
      }
      
      updateValues();
    };
    
    var pxToValue = function($h){
      var w = $input.width()-size;
      var p = $h.position().left;
      var v = (p/(w/(options.max-options.min)))+options.min;

      if(options.snap) return Math.floor(v/options.snap) * options.snap;

      return Math.round(v);
    };
    
    var valueToPx = function(val){
      var w = $input.width();
      var v = (val*(w/(options.max-options.min)))-options.min;
      
      return v;
    };
        
    var bound = function(input){
      return Math.max(Math.min(input, options.max), options.min);
    };
    
    var methods = {
      init : function(o){
        
        // element already replaced
        if($(this).data('TinyRange')) return this;
        
        // options 
        defaults.min = parseFloat($(this).attr('min'));
        defaults.max = parseFloat($(this).attr('max'));
        defaults.snap = parseFloat($(this).attr('step'));

        // options passed into plugin override input attributes
        options = $.extend(defaults, o);
        
        if(options.values){
          //
        } else if(options.range){
          options.values = [0, options.max];
        } else {
          options.values = parseFloat($(this).attr('value'));
        }
 
        // how far do handles jump on click, default to step value
        jump = options.snap ? options.snap : options.max/10;

        // create dom elements
        $input  = $('<div/>', {'class': 'range-input'}).mousedown(jumpHandle);
        $rail   = $('<div/>', {'class': 'range-rail'}).appendTo($input);
        if(options.range) $selection = $('<div/>', {'class': 'range-selection'}).appendTo($input); 
        $handle = $('<a/>', {'class': 'range-handle'}).appendTo($input).mousedown(dragStart);
        if(options.range) $handle2 = $handle.clone(true).appendTo($input);
        
        // replace dom element
        $(this).after($input);
        $(this).hide();
        $original = $(this);
        
        // attach events
        $(document).bind('mouseup', dragEnd);
        $(document).bind('mousemove', drag);
        
        // position handles
        size = $handle.width();
        updateHandles();
        
        return this;
      },
      set: function(input){

        if(typeof input === 'string'){
          options.values = bound(input); 
        } else if(typeof input === 'object' && input.length === 2){
          options.values[0] = bound(input[0]);
          options.values[1] = bound(input[1]);
        }
        
        updateHandles();
      },
      destroy : function(){
        
        $input.remove();
        $(this).show().data('TinyRange', false);
        $(document).unbind('mouseup', dragEnd);
        $(document).unbind('mousemove', drag);
        
        return this;
      }
    };

    return methods;
  };

  $.fn.range = function(method) {
  
    // so that arguments are accessible within each closure
    var args = arguments;

    return this.each(function(){
      var state = $(this).data('TinyRange');

      // Method calling logic
      if (state && state[method] ) {
        state[ method ].apply( this, Array.prototype.slice.call( args, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
      
        // create new tinyrange
        var tr = (new TinyRange(this));
        tr.init.apply( this, args );
        
        // save state in jquery data
        $(this).data('TinyRange', tr);
        
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.range' );
      }    
    });
  };
})(jQuery);




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

$('.seekBar').range({
      range: false,
      change: function(value){
       hiFive.scrubAudio(hiFive.audio,value);
			}
      });


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
		    return percent;    
        },

        moveHandle : function (myAudio) {
	         var percent,px;
             percent = (myAudio.currentTime / myAudio.duration) * 100;
	         px = (percent * 250) / 100;  // bar is 250px 
	        px = px - 20; // handle is 20px
	          if (px > 0) {
	              $(".range-handle").css("left" , px +"px")	
           }
        },

        scrubAudio: function(myAudio, value) {
            var newtime;
           hiFive.playPause(myAudio);
            var duration = myAudio.duration;
            newtime = (value * duration) / 100;
      
          myAudio.currentTime = newtime;
     
           hiFive.playPause(myAudio);
                   
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

   $(hiFive.audio).on('progress',
    function() {
       // $("span.indicator").addClass("loader");
    

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

	$('.seekBar').range({
	      range: false,
	      change: function(value){
        
		}		
	      });

    var myListener = {};

    var myobject = '<object class="playerpreview" id="myFlash" type="application/x-shockwave-flash" data="/wp-content/themes/storynory/js/player_mp3_js.swf" width="1" height="1"><param name="movie" value="/wp-content/themes/storynory/js/player_mp3_js.swf" /><param name="AllowScriptAccess" value="always" /><param name="FlashVars" value="listener=myListener&amp;interval=500" /></object>';

    $(".audio").append(myobject);

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
                $(".range-handle").css("left", percent + "%");
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

// AUTOLOAD CODE BLOCK (MAY BE CHANGED OR REMOVED)
if (!/android|iphone|ipod|series60|symbian|windows ce|blackberry/i.test(navigator.userAgent)) {
	jQuery(function($) {
		$("a[href]").filter(function() {
			return /\.(jpg|png|gif)$/i.test(this.href);
		}).slimbox({}, null, function(el) {
			return (this == el) || (this.parentNode && (this.parentNode == el.parentNode));
		});
	});
}