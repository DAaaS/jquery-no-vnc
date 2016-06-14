

(function($){

	//no_vnc_scripts

	(function(){

		function NoVnc(canvas, host, port, password, path){

			$(canvas).on('contextmenu', function(e){
				e.preventDefault();
			});

			var rfb = new RFB({
				'target': canvas,
				'encrypt': window.location.protocol === "https:",
				'true_color': true,
				'local_cursor': true,
				'shared': true,
				'view_only': false,
				'onUpdateState': onUpdateState,
				'onFBUComplete': onFBUComplete
			});

			var scale;
			var desktopWidth;
			var desktopHeight;

			var isLoaded = 0;
			var afterLoadedList = [];
			function afterLoaded(fn){
				if(!isLoaded){
					afterLoadedList.push(fn);
				} else {
					fn();
				}
			}

			function onUpdateState(rfb, state, oldstate, statusMsg){
				if(state == 'normal'){
					isLoaded = true;

					desktopWidth = rfb.get_display().get_width();
					desktopHeight = rfb.get_display().get_height();

					while(afterLoadedList.length > 0){
						afterLoadedList.shift()();
					}
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

			this.resize = function(width, height){
				afterLoaded(function(){
					var widthScale = width / desktopWidth;
					var heightScale = height / desktopHeight;

					scale = widthScale < heightScale ? widthScale : heightScale;

					if(scale > 1) scale = 1;
					if(scale < 0.1) scale = 0.1;

					rescale();
				});
			};

			rfb.connect(host, port, password, path);

		}

		$.fn.noVnc = function(host, port, password, path){
			if(host !== undefined){
				$(this)[0]._noVnc = new NoVnc($(this)[0], host, port, password, path);
			} 
			return $(this)[0]._noVnc;
		};
	})();

})(jQuery);