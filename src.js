

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
				'view_only': WebUtil.getQueryVar('view_only', false)
			});

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