

(function($){

	//no_vnc_scripts

	(function(){

		function NoVnc(canvas, host, port, password, path){

			var rfb = new RFB({
				'target': canvas,
				'encrypt': WebUtil.getQueryVar('encrypt', (window.location.protocol === "https:")),
				'repeaterID': WebUtil.getQueryVar('repeaterID', ''),
				'true_color': WebUtil.getQueryVar('true_color', true),
				'local_cursor': WebUtil.getQueryVar('cursor', true),
				'shared': WebUtil.getQueryVar('shared', true),
				'view_only': WebUtil.getQueryVar('view_only', false),
				'onUpdateState': onUpdateState
			});

			var resolutionWidth;
			var resolutionHeight;

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
				console.log('state', state);
				if(state == 'normal'){
					isLoaded = true;
					resolutionWidth = $(canvas).width();
					resolutionHeight = $(canvas).height();

					while(afterLoadedList.length > 0){
						afterLoadedList.shift()();
					}
				}
			}


			rfb.connect(host, port, password, path);

			$(canvas).click(function(e){
				e.preventDefault();
			});

			this.resize = function(width, height){
				afterLoaded(function(){
					var widthScale = width / resolutionWidth;
					var heightScale = height / resolutionHeight;

					var scale = widthScale < heightScale ? widthScale : heightScale;
					if(scale > 1) scale = 1;
					if(scale < 0.1) scale = 0.1;

					var newWidth = resolutionWidth * scale;
					var newHeight = resolutionHeight * scale;
					
					$(canvas).width(newWidth).height(newHeight);
					rfb.get_mouse().set_scale(scale);
				});
			};

		}

		$.fn.noVnc = function(host, port, password, path){
			if(host !== undefined){
				$(this)[0]._noVnc = new NoVnc($(this)[0], host, port, password, path);
			} 
			return $(this)[0]._noVnc;
		};
	})();

})(jQuery);