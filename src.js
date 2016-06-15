

(function($){

	//no_vnc_scripts

	(function(){

		function NoVnc(canvas){
			
			$(canvas).on('contextmenu', function(e){
				e.preventDefault();
			});

			$(canvas).click(function(){
				$(this).focus();
			});

			$(canvas).attr('tabindex', '');

			var rfb;
			var scale = 1;
			var desktopWidth;
			var desktopHeight;
			var isLoaded = false;

			var afterLoadedList = [];
			function afterLoaded(fn){
				if(!isLoaded){
					afterLoadedList.push(fn);
				} else {
					fn();
				}
			}

			function onUpdateState(rfb, state, oldstate, statusMsg){
				if(state == 'normal' & !isLoaded){
					isLoaded = true;

					desktopWidth = rfb.get_display().get_width();
					desktopHeight = rfb.get_display().get_height();

					while(afterLoadedList.length > 0){
						afterLoadedList.shift()();
					}

					$(canvas).trigger("novnc:loaded");
				}

				if(state == 'connect'){
					$(canvas).trigger("novnc:connected");
				}

				if(state == 'disconnect'){
					reset();
					$(canvas).trigger("novnc:disconnected");
				}

				if(state == 'password'){
					console.log('password');
					$(canvas).trigger("novnc:passwordrequired");
				}
			}

			function rescale(){
				var newWidth = desktopWidth * scale;
				var newHeight = desktopHeight * scale;
				$(canvas).width(newWidth).height(newHeight);
				rfb.get_mouse().set_scale(scale);
			}

			function onFBUComplete(rfb, fbu){
				if(fbu.encodingName == 'DesktopSize'){
					desktopWidth = fbu.width;
					desktopHeight = fbu.height;

					rescale();
				}
			}


			function reset(){
				rfb = undefined;
				afterLoadedList = [];
				isLoaded = false;
			}

			this.connect = function(host, port, password, path){
				if(!rfb){
					rfb = new RFB({
						'target': canvas,
						'encrypt': window.location.protocol === "https:",
						'true_color': true,
						'local_cursor': true,
						'shared': true,
						'view_only': false,
						'focusContainer': canvas,
						'onUpdateState': onUpdateState,
						'onFBUComplete': onFBUComplete
					});
					rfb.connect(host, port, password, path);
				}
				return this;
			};

			this.disconnect = function(){
				if(rfb){
					rfb.disconnect();
					reset();
				}
				return this;
			};

			this.resize = function(width, height){
				if(rfb){
					afterLoaded(function(){
						var widthScale = width / desktopWidth;
						var heightScale = height / desktopHeight;

						scale = widthScale < heightScale ? widthScale : heightScale;

						if(scale > 1) scale = 1;
						if(scale < 0.1) scale = 0.1;

						rescale();
						$(canvas).trigger("novnc:resize");
					});
				}
				return this;
			};

			this.sendPassword = function(password){
				if(rfb){
					rfb.sendPassword(password);
				}
				return this;
			};

			this.sendKey = function(code, down){
				if(rfb){
					rfb.sendKey(code, down);
				}
				return this;
			};

		}

		$.fn.noVnc = function(){
			if(!$(this)[0]._noVnc){
				$(this)[0]._noVnc = new NoVnc($(this)[0]);
			} 
			return $(this)[0]._noVnc;
		};

	})();

})(jQuery);