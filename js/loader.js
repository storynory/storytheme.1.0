(function($) {
	var TinyRange = function() {
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
				orientation: 'horizontal',
				range: true,
				values: false,
				snap: false,
				change: function() {},
				blur: function() {}
			};
			var jumpHandle = function(ev) {
					ev.pageX = ev.pageX - $input.offset().left;
					var x1 = $handle.position().left;
					var dist = ev.pageX - x1;
					if($handle2) {
						var x2 = $handle2.position().left;
						var dist2 = ev.pageX - x2;
					}
					if(!$handle2 || Math.abs(dist) < Math.abs(dist2)) {
						if(dist > 0) moveHandle($handle, valueToPx(jump) + x1);
						if(dist < 0) moveHandle($handle, -valueToPx(jump) + x1);
					} else {
						if(dist2 > 0) moveHandle($handle2, valueToPx(jump) + x2);
						if(dist2 < 0) moveHandle($handle2, -valueToPx(jump) + x2);
					}
				}
			var moveHandle = function($h, p, update) {
					var boundR = $input.width() - size;
					var boundL = 0;
					if(options.range) {
						if($h[0] === $handle[0]) {
							boundR = $handle2.position().left;
						} else {
							boundL = $handle.position().left;
						}
					}
					if(p >= boundR) {
						p = boundR;
					} else if(p <= boundL) {
						p = boundL;
					}
					if(options.snap && p !== boundR) {
						var snapPx = valueToPx(options.snap);
						p = Math.round(p / snapPx) * snapPx;
					}
					$h.css({
						'left': p,
						'position': 'absolute'
					});
					if(options.range) updateSelection();
					if(update !== false) updateValues();
				}
			var dragStart = function(ev) {
					ev.stopPropagation();
					ev.preventDefault();
					$dragging = $(this);
				};
			var drag = function(ev) {
					if($dragging) {
						ev.preventDefault();
						var pos = ev.pageX - $input.offset().left;
						moveHandle($dragging, pos);
					}
				};
			var updateSelection = function() {
					var p = $handle.position().left;
					var w = $handle2.position().left - p;
					$selection.css({
						'left': p,
						'width': w,
						'position': 'absolute'
					});
				};
			var dragEnd = function(ev) {
					if($dragging) {
						$dragging = null;
						options.blur(options.values);
					}
				};
			var updateValues = function() {
					var prev;
					if(options.range) {
						prev = options.values.slice();
						options.values[0] = pxToValue($handle);
						options.values[1] = pxToValue($handle2);
						$original.val(options.values[0] + ',' + options.values[1]);
					} else {
						prev = options.values;
						options.values = pxToValue($handle);
						$original.val(options.values);
					}
					if(options.values !== prev) options.change(options.values);
				};
			var updateHandles = function() {
					if(options.values) {
						if(options.range) {
							moveHandle($handle2, valueToPx(options.values[1]), false);
							moveHandle($handle, valueToPx(options.values[0]), false);
						} else {
							moveHandle($handle, valueToPx(options.values), false);
						}
					}
					updateValues();
				};
			var pxToValue = function($h) {
					var w = $input.width() - size;
					var p = $h.position().left;
					var v = (p / (w / (options.max - options.min))) + options.min;
					if(options.snap) return Math.floor(v / options.snap) * options.snap;
					return Math.round(v);
				};
			var valueToPx = function(val) {
					var w = $input.width();
					var v = (val * (w / (options.max - options.min))) - options.min;
					return v;
				};
			var bound = function(input) {
					return Math.max(Math.min(input, options.max), options.min);
				};
			var methods = {
				init: function(o) {
					if($(this).data('TinyRange')) return this;
					defaults.min = parseFloat($(this).attr('min'));
					defaults.max = parseFloat($(this).attr('max'));
					defaults.snap = parseFloat($(this).attr('step'));
					options = $.extend(defaults, o);
					if(options.values) {} else if(options.range) {
						options.values = [0, options.max];
					} else {
						options.values = parseFloat($(this).attr('value'));
					}
					jump = options.snap ? options.snap : options.max / 10;
					$input = $('<div/>', {
						'class': 'range-input'
					}).mousedown(jumpHandle);
					$rail = $('<div/>', {
						'class': 'range-rail'
					}).appendTo($input);
					if(options.range) $selection = $('<div/>', {
						'class': 'range-selection'
					}).appendTo($input);
					$handle = $('<a/>', {
						'class': 'range-handle'
					}).appendTo($input).mousedown(dragStart);
					if(options.range) $handle2 = $handle.clone(true).appendTo($input);
					$(this).after($input);
					$(this).hide();
					$original = $(this);
					$(document).bind('mouseup', dragEnd);
					$(document).bind('mousemove', drag);
					size = $handle.width();
					updateHandles();
					return this;
				},
				set: function(input) {
					if(typeof input === 'string') {
						options.values = bound(input);
					} else if(typeof input === 'object' && input.length === 2) {
						options.values[0] = bound(input[0]);
						options.values[1] = bound(input[1]);
					}
					updateHandles();
				},
				destroy: function() {
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
		var args = arguments;
		return this.each(function() {
			var state = $(this).data('TinyRange');
			if(state && state[method]) {
				state[method].apply(this, Array.prototype.slice.call(args, 1));
			} else if(typeof method === 'object' || !method) {
				var tr = (new TinyRange(this));
				tr.init.apply(this, args);
				$(this).data('TinyRange', tr);
			} else {
				$.error('Method ' + method + ' does not exist on jQuery.range');
			}
		});
	};
})(jQuery);
(function($) {
	$.cookie = function(key, value, options) {
		if(arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
			options = $.extend({}, options);
			if(value === null || value === undefined) {
				options.expires = -1;
			}
			if(typeof options.expires === 'number') {
				var days = options.expires,
					t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
			value = String(value);
			return(document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
		}
		options = value || {};
		var decode = options.raw ?
		function(s) {
			return s;
		} : decodeURIComponent;
		var pairs = document.cookie.split('; ');
		for(var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
			if(decode(pair[0]) === key) return decode(pair[1] || '');
		}
		return null;
	};
	$("#lingo").change(function() {
		var lingo = $(this).val();
		$.cookie('lingo', lingo, {
			expires: 30,
			path: '/'
		});
	});
	select = function() {
		var sel = (document.selection && document.selection.createRange().text) || (window.getSelection && window.getSelection().toString());
		return sel;
	};
	populate = function(data) {
		result = data.data.languages;
		$.each(result, function() {
			if(this.language === $.cookie('lingo')) {
				$("#lingo").prepend("<option  value = '" + this.language + "'> " + this.name + "</option>");
			} else {
				$("#lingo").append("<option value = '" + this.language + "'> " + this.name + "</option>");
			}
		});
	};
	$.ajax({
		type: "GET",
		url: "https://www.googleapis.com/language/translate/v2/languages",
		data: {
			key: "AIzaSyAK2TFz5S4WzzgG0lsUGT8yUt1SIkwz_yU",
			target: "en"
		},
		dataType: 'jsonp',
		success: function(data) {
			populate(data);
		},
		error: function(data) {}
	});
	translate = function() {
		if($.cookie('lingo') === null) {
			lingo = "af";
		} else {
			lingo = $.cookie('lingo');
		};
		$.ajax({
			type: "GET",
			url: "https://www.googleapis.com/language/translate/v2",
			data: {
				key: "AIzaSyAK2TFz5S4WzzgG0lsUGT8yUt1SIkwz_yU",
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
	$(document).dblclick(function(e) {
		translate();
		$("#tooltip").css("left", e.pageX);
		$("#tooltip").css("top", (e.pageY - 60)).fadeIn("fast");
		e.preventDefault();
	});
	$("a.tooltip").on("hover", function(e) {
		var tip = this.title;
		this.title = "";
		if(tip !== "") {
			$("#tooltip").html(tip);
			$("#tooltip").css("left", e.pageX);
			$("#tooltip").css("top", (e.pageY - 60)).fadeIn("fast");
			$(this).on("mouseout", function(e) {
				$("#tooltip").fadeOut("slow");
				this.title = tip;
			});
		}
	});
})(jQuery);
var hiFive, testAudio;
testAudio = function() {
	try {
		var canplay = document.createElement('audio').canPlayType('audio/mpeg');
		var chromium = /chromium/.test(navigator.userAgent.toLowerCase())
		console.log(chromium);
		if(document.createElement('audio').canPlayType('audio/mpeg') && chromium === false) {
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
if(testAudio() === "true") {
	$('.seekBar').range({
		range: false,
		change: function(value) {
			hiFive.scrubAudio(hiFive.audio, value);
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
			if(minutes < 10) minutes = "0" + minutes;
			seconds = seconds - (minutes * 60);
			if(seconds < 10) seconds = "0" + seconds;
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
		moveHandle: function(myAudio) {
			var percent, px;
			percent = (myAudio.currentTime / myAudio.duration) * 100;
			px = (percent * 250) / 100;
			px = px - 20;
			if(px > 0) {
				$(".range-handle").css("left", px + "px")
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
			if(hiFive.audio.paused) {
				return hiFive.audio.play();
			} else {
				return hiFive.audio.pause();
			}
		}
	};
	hiFive.init();
	$("a.playPause").on("click", function() {
		$(this).toggleClass("pause");
		hiFive.playPause(hiFive.audio);
		return false;
	});
	$(hiFive.audio).bind('timeupdate', function() {
		hiFive.update(hiFive.audio);
		hiFive.moveHandle(hiFive.audio);
		hiFive.getDuration(hiFive.audio);
	});
	$(hiFive.audio).on('play', function(evt) {
		$("a.playPause").removeClass("play");
		$("a.playPause").addClass("pause");
	});
	$(hiFive.audio).on('pause', function(evt) {
		$("a.playPause").removeClass("pause");
		$("a.playPause").addClass("play");
	});
	$(hiFive.audio).on('progress', function() {});
	$(hiFive.audio).on('loadeddata', function(evt) {
		$("span.indicator").removeClass("loader");
	});
	$(hiFive.audio).on('loadedmetadata', function(evt) {
		hiFive.getDuration(hiFive.audio);
	});
} else {
	$('.seekBar').range({
		range: false,
		change: function(value) {}
	});
	var myListener = {};
	var myobject = '<object class="playerpreview" id="myFlash" type="application/x-shockwave-flash" data="/wp-content/themes/storynory/js/player_mp3_js.swf" width="1" height="1"><param name="movie" value="/wp-content/themes/storynory/js/player_mp3_js.swf" /><param name="AllowScriptAccess" value="always" /><param name="FlashVars" value="listener=myListener&amp;interval=500" /></object>';
	$(".audio").append(myobject);
	myListener.onInit = function() {
		this.position = 0;
	};
	var flashy = {
		mp3: $("a.playPause").attr("href"),
		flashObject: $("#myFlash")[0],
		formatTime: function(seconds) {
			var minutes;
			seconds = Math.round(seconds);
			seconds = seconds / 1000;
			minutes = Math.floor(seconds / 60);
			minutes = (minutes >= 10) ? minutes : "0" + minutes;
			seconds = Math.floor(seconds % 60);
			seconds = (seconds >= 10) ? seconds : "0" + seconds;
			return minutes + ":" + seconds;
		},
		play: function(mp3, flash) {
			if(myListener.position === 0) {
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
			if(myListener.isPlaying === "true") {
				flashy.pause();
			} else {
				flashy.play();
			}
		},
		setTime: function(newtime) {
			var time = flashy.formatTime(newtime);
			$(".time").html(time);
		},
		setDuration: function(percentLoaded, duration) {
			if(percentLoaded < 100) {
				$(".duration").html(percentLoaded + " % ");
				$("span.indicator").addClass("loader");
				$(".progress").css({
					width: percentLoaded + '%'
				});
			} else {
				duration = flashy.formatTime(duration);
				$(".duration").html(duration);
				$("span.indicator").removeClass("loader");
			}
		},
		updateSeekbar: function(position) {
			var duration = myListener.duration;
			var percent = (position / duration) * 100;
			if(myListener.bytesPercent === "100") {
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
	$("a.playPause").bind("click", function() {
		$(this).toggleClass("pause");
		flashy.playPause();
		return false;
	});
}
$("a.open").click(function() {
	var url = $(this).attr("href");
	window.open(url, "unicorn", "width=500, height=100, screenX=100");
	return false;
});
(function($) {
	$.fn.simpleSprite = function(options) {
		var that = this;
		var defaults = {
			numberOfSprites: 3,
			framesPerSection: 9
		};
		options = $.extend(defaults, options);
		return this.each(function() {
			var positionArray = [];
			var timeOuts = [];
			var makePositionArray = function() {
					var number = options.numberOfSprites;
					var position = 0;
					var width = that.width();
					number = number - 1;
					positionArray.push(0);
					while(number--) {
						position = position + width;
						positionArray.push(position);
					}
					return positionArray;
				};
			var positions = makePositionArray();
			var backgroundPosition = function(position, time) {
					setTimeout(function() {
						that.css('background-position', (parseInt(position)) + 'px 0');
					}, time);
				}
			var myTimeout;
			var myTimeout2;
			var setTimes = function() {
					number = options.numberOfSprites;
					time = 0;
					frame = 1000 / options.framesPerSection;
					while(number--) {
						var time = time + frame;
						backgroundPosition(positions[number], time);
					}
					myTimeout = setTimeout(setTimes, (frame * options.numberOfSprites));
				};
			setTimes();
		});
	};
})(jQuery);
$("#icarus").simpleSprite({
	numberOfSprites: 3,
	framesPerSection: 9
});
(function($) {
	$.fn.toClick = function(options) {
		var that = this;
		var off = that.parent().offset();
		var pos = that.position();
		var defaults = {
			canvas: $(".ocean")
		};
		options = $.extend(defaults, options);
		return this.each(function() {
			$(defaults.canvas).on("click", function(e) {
				var left = e.pageX - off.left - (that.width() / 2);
				var top = e.pageY - off.top - (that.height() / 2);;
				that.animate({
					left: left,
					top: top
				}, 1000, function() {});
			});
		});
	};
})(jQuery);
$(".ocean p.info").show(4000).delay(4000).hide(4000);
$("#icarus").toClick();
$(function() {
	var coord = function(el) {
			var width = el.width();
			var height = el.height();
			var pos = el.position();
			var x = pos.left;
			var y = pos.top;
			var stats = {
				height: height,
				width: width,
				x: x,
				y: y
			};
			return stats;
		}
	var icarus = $("#icarus");
	var sun = $(".sun");
	var sunStats = coord(sun);
	var timeOut;
	if(testAudio() === "true") {
		var distress = new Audio();
		distress.load();
		distress.src = "http://traffic.libsyn.com/blogrelations/distresscall.mp3";
	}
	var tooMuchSun = function() {
			$(".emergency").fadeIn("fast");
			$(".emergency").fadeOut("fast");
			if(testAudio() === "true") {
				if(distress.paused = "true") {
					distress.play();
				}
			}
			$("#icarus").animate({
				"top": "1000px"
			}, 6000);
		};

	function spritecollision(a, b, callback) {
		var x1 = a.x,
			y1 = a.y,
			w1 = a.width,
			h1 = a.height,
			x2 = b.x,
			y2 = b.y,
			w2 = b.width,
			h2 = b.height
		if(x2 < (x1 + w1) && (x2 + w2) > x1 && y2 < (y1 + h1) && (y2 + h2) > y1) {
			callback();
		}
	};
	var checkCoord = function() {
			var icStats = coord(icarus);
			spritecollision(icStats, sunStats, tooMuchSun);
			timeOut = setTimeout(function() {
				checkCoord();
			}, 1000);
		};
	checkCoord();

	function Waves() {
		var steps = 350;

		function GenerateOffsets(radius) {
			var coords = [];
			for(var a = 0; a <= steps; a++) {
				coords.push([Math.round(radius * Math.cos(a * (6.2831853 / steps))), Math.round(radius * Math.sin(a * (6.2831853 / steps)))]);
			}
			return coords;
		}
		var layers = [{
			Coords: GenerateOffsets(3),
			Element: $('.wave1'),
			YOffset: -100,
			XOffset: 0,
			XSpeed: -0.15,
			ImageWidth: 450,
			PhaseOffset: 0
		}, {
			Coords: GenerateOffsets(4),
			Element: $('.wave2'),
			YOffset: -110,
			XOffset: 50,
			XSpeed: -0.25,
			ImageWidth: 450,
			PhaseOffset: 50
		}, {
			Coords: GenerateOffsets(5),
			Element: $('.wave3'),
			YOffset: -120,
			XOffset: 30,
			XSpeed: -0.4,
			ImageWidth: 450,
			PhaseOffset: 100
		}];
		var currentStep = 0;
		setInterval(function() {
			for(var l = 0; l < layers.length; l++) {
				layers[l].Element.css({
					'background-position': layers[l].XOffset + 'px ' + (layers[l].Coords[(currentStep + layers[l].PhaseOffset) % steps][1] + layers[l].YOffset) + 'px'
				});
				layers[l].XOffset += layers[l].XSpeed;
			}
			currentStep = (currentStep + 1) % steps;
		}, 7);
	}
	Waves();
});