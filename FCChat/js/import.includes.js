jGo.scripts.importClass('jGo.browser.min.js', 'static', this,
			null);
if(FCChatConfig.styles.chat_toolbox.external_template!=''){
	document.write("<script language='JavaScript' src='" + FCChatConfig.dir + "templates/" + FCChatConfig.styles.chat_toolbox.external_template + "'></script>");
}
if(FCChatConfig.styles.chat_window.external_template!=''){
	document.write("<script language='JavaScript' src='" + FCChatConfig.dir + "templates/" + FCChatConfig.styles.chat_window.external_template + "'></script>");
}
if(FCChatConfig.flashEnabled=='test'){
	FCChatConfig.flashEnabled=false;
	if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"])
	{
		FCChatConfig.flashEnabled = !(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin==null);
	}
	else if (document.all && (navigator.appVersion.indexOf("Mac")==-1))
	{
		eval ('try {var fcchat_xObj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if (fcchat_xObj) FCChatConfig.flashEnabled = true; fcchat_xObj = null; } catch (e) {}');
	}
}
if(FCChatConfig.websocketEnabled=='test'){
	FCChatConfig.websocketEnabled=false;
	if("WebSocket" in window){
		FCChatConfig.websocketEnabled=true;
	}
}
if(FCChatConfig.flashEnabled){
	document.write("<script type='text/javascript' src='" + FCChatConfig.dir + "js/flash.tag.min.js'></script>");
}else{
	document.write("<script type='text/javascript' src='" + FCChatConfig.dir + "js/fcchat.websocket.min.js'></script>");
}
document.write("<script language='JavaScript' src='" + FCChatConfig.dir + "js/css.vars.js'></script>");
document.write("<script language='JavaScript' src='" + FCChatConfig.dir + "js/page.init.js'></script>");

	

