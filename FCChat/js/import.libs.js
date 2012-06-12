//Load jQuery
if (!window["jGo"] && (!window.jQuery || window.jQuery.fn.jquery != "1.3.2")) {
	google.load("jquery", "1.3.2");
}

// Load jGo css and js
if (!window["jGo"] || window["jGo"].version < 1.0) {
	document.write("<script type='text/javascript' src='"
			+ FCChatConfig.dir + "jGo/js/jGo.min.js'></script>");
	var fcp_headID = document.getElementsByTagName("head")[0];
	if (fcp_headID) {
		var fcp_cssNode = document.createElement('link');
		fcp_cssNode.type = 'text/css';
		fcp_cssNode.rel = 'stylesheet';
		fcp_cssNode.href = FCChatConfig.dir + 'jGo/css/jGo.min.css';
		fcp_cssNode.media = 'screen';
		fcp_headID.appendChild(fcp_cssNode);
	} else {
		document.write("<link rel='stylesheet' href='" + FCChatConfig.dir
				+ "jGo/css/jGo.min.css' type='text/css'>");
	}

}
