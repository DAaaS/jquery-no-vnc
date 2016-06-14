

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

			var originalWidth;
			var originalHeight;

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
					originalWidth = $(canvas).width();
					originalHeight = $(canvas).height();

					while(afterLoadedList.length > 0){
						afterLoadedList.shift()();
					}
				}
			}


			rfb.connect(host, port, password, path);

			this.resize = function(width, height){
				afterLoaded(function(){
					var widthScale = width / originalWidth;
					var heightScale = height / originalHeight;

					var scale = widthScale < heightScale ? widthScale : heightScale;

					var newWidth = originalWidth * scale;
					var newHeight = originalHeight * scale;
					
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