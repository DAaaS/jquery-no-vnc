

(function($){

	//no_vnc_scripts

	(function(){
		$.fn.noVnc = function(host, port, password, path){
			rfb = new RFB({
				'target': $(this)[0],
	            'encrypt': WebUtil.getQueryVar('encrypt', (window.location.protocol === "https:")),
	            'repeaterID': WebUtil.getQueryVar('repeaterID', ''),
	            'true_color': WebUtil.getQueryVar('true_color', true),
	            'local_cursor': WebUtil.getQueryVar('cursor', true),
	            'shared': WebUtil.getQueryVar('shared', true),
	            'view_only': WebUtil.getQueryVar('view_only', false)
	        });

	        rfb.connect(host, port, password, path);
		};
	})();

})(jQuery);