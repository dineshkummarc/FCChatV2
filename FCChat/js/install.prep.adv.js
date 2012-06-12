if(document.getElementsByTagName("head")[0]){         
	var fc_cssNode = document.createElement('link');
	fc_cssNode.type = 'text/css';
	fc_cssNode.rel = 'stylesheet';
	fc_cssNode.href = FCChatConfig.dir + 'css/fcchat.css';
	fc_cssNode.media = 'screen';
	document.getElementsByTagName("head")[0].appendChild(fc_cssNode);
	var fc_style = document.createElement('style');
	fc_style.type = 'text/css';
	document.getElementsByTagName("head")[0].appendChild(fc_style);
	if (fc_style.styleSheet) {
		fc_style.styleSheet.cssText = FCChatConfig.dynamicStyles;
	} else {
		var fc_tt1 = document.createTextNode(FCChatConfig.dynamicStyles);
		fc_style.appendChild(fc_tt1);
	}
}else{
	document.write("<link rel='stylesheet' href='" + FCChatConfig.dir + "css/fcchat.css' type='text/css'>");
	document.write("<style>"+FCChatConfig.dynamicStyles+"</style>");
}
document.write("<div id='fc_install'><div id='fc_domain' style='display: none;'>none</div>");
jGo.scripts.importClass('jGo.DefaultWindow.pack.js', 'static', this,
		null,null,1);
document.write("<div class='jGo_myapp'><div id='jGo_win0' class='jGo_app jGo_myapp jGo_ydsf'></div><div id='jGo_win1' class='jGo_app jGo_myapp jGo_ydsf'></div><div id='jGo_win2' class='jGo_app jGo_myapp jGo_ydsf'></div><div id='jGo_win3' class='jGo_app jGo_myapp jGo_ydsf'></div><div id='jGo_win4' class='jGo_app jGo_myapp jGo_ydsf'></div><div id='jGo_win5' class='jGo_app jGo_myapp jGo_ydsf'></div><div id='jGo_win6' class='jGo_app jGo_myapp jGo_ydsf'></div><div id='jGo_win7' class='jGo_app jGo_myapp jGo_ydsf'></div><div id='jGo_win8' class='jGo_app jGo_myapp jGo_ydsf'></div><div id='jGo_win9' class='jGo_app jGo_myapp jGo_ydsf'></div></div>");
//Initialization
jGo.scripts.onLoad('jGo.DefaultWindow.pack.js');
if (top==self&&FCChatConfig.flashEnabled){
	document.write("<div id='fc_fla' style='position:absolute; top: -30px; left:750px;border:1px solid #aaaaaa'><div  id='fc_flaToggle'>");
	document.write(fc_tag.toString());
	document.write('</div></div>');
}
document.write("</div><div id='fc_hideContent'>");

jGo.browser.init();
if(FCChatConfig.preload_images || (jGo.browser.browser=='Explorer' && (jGo.browser.version=='5' || jGo.browser.version=='6'))){
document.write("<DIV style='display:none'><IMG SRC='" + FCChatConfig.dir +"current_skin/trans.gif'><IMG SRC='" + FCChatConfig.dir +"closewindow.gif'><IMG SRC='" + FCChatConfig.dir +"current_skin/chatelems1.gif'><IMG SRC='" + FCChatConfig.dir +"current_skin/rmarrow.gif'><IMG SRC='" + FCChatConfig.dir +"current_skin/maxwin.gif'><IMG SRC='" + FCChatConfig.dir +"current_skin/minwin.gif'><IMG SRC='" + FCChatConfig.dir +"current_skin/removebutton.gif'><IMG SRC='" + FCChatConfig.dir +"current_skin/Video.gif'><IMG SRC='" + FCChatConfig.dir +"images/avatars/fastcat_0.jpg'></DIV>");
}



