(function (){
	var fc_tb = FCChatConfig.styles.chat_toolbox;
	var fc_tb_btn = fc_tb.buttons;
	var fc_tb_ab = fc_tb.alert_box;
	var fc_cw_mp_cp = FCChatConfig.styles.chat_window.main_panel.chat_panels;
	var fc_cw_mp_sp = FCChatConfig.styles.chat_window.main_panel.side_panels;
	var fc_cwtmc=fc_cw_mp_cp.font.color.default_text_color;
	var fc_cwsnc=fc_cw_mp_cp.font.screen_name_states;
	var fc_spsnc=fc_cw_mp_sp.font.screen_name_states;
	var fc_df=FCChatConfig.default_font;
	var fc_sc_css=FCChatConfig.styles.chat_window.main_panel.send_chat_panel.css;
	var fc_uc_css=FCChatConfig.styles.chat_window.main_panel.user_pop_up_panel.send_chat_panel.css;
	var fc_o_btn = FCChatConfig.styles.chat_window.main_panel.other_buttons;
	var fc_sr_btn = FCChatConfig.styles.chat_window.main_panel.send_to_room_button;
	var fc_sp_btn = FCChatConfig.styles.chat_window.main_panel.send_private_button;
	var fc_usp_btn = FCChatConfig.styles.chat_window.main_panel.user_pop_up_panel.send_private_button;
	var fc_blk_btn = FCChatConfig.styles.chat_window.main_panel.options_panel.remove_block_button;
	var fc_widgets = FCChatConfig.styles.chat_window.main_panel.widgets.border;
	var fc_uwidgets = FCChatConfig.styles.chat_window.main_panel.user_pop_up_panel.widgets.border;
	
	var fc_rule = "#jGo_app.jGo_myapp ";
	var fc_rule2 = ".jGo_app.jGo_myapp ";
	var firstPart = "" +
	
	//Chat panels
	fc_rule +"*.fc_d1, "+fc_rule2+"*.fc_d1{font-family:"+fc_cw_mp_cp.font.family+";font-size:"+fc_cw_mp_cp.font.size+"pt;font-weight:"+fc_cw_mp_cp.font.weight+";color:"+fc_cwtmc+";-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius:5px}"+
	fc_rule+"*.fc_d1 *, "+fc_rule2+"*.fc_d1 *{font-family:"+fc_cw_mp_cp.font.family+";font-size:"+fc_cw_mp_cp.font.size+"pt;font-weight:"+fc_cw_mp_cp.font.weight+";color:"+fc_cwtmc+";}"+
	fc_rule+"*.fc_d1 div, "+fc_rule2+"*.fc_d1 div{border:0px;}"+
	fc_rule+"*.fc_d1 a, "+fc_rule2+"*.fc_d1 a{color:"+fc_cw_mp_cp.font.color.link_color+"}"+
	fc_rule+"*.fc_d1 span, "+fc_rule2+"*.fc_d1 span{color:"+fc_cwsnc.online.link+"}" +
	fc_rule+"*.fc_d1 small a, "+fc_rule2+"*.fc_d1 small a{font-size:"+(fc_cw_mp_cp.font.size+2)+"pt;}" +
	
	//Side panels
	fc_rule+"*.fc_d2, "+fc_rule2+"*.fc_d2{font-family:"+fc_cw_mp_sp.font.family+";font-size:"+fc_cw_mp_sp.font.size+"pt;font-weight:"+fc_cw_mp_sp.font.weight+";color:black;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius:5px}"+
	fc_rule+"*.fc_d2 *, "+fc_rule2+"*.fc_d2 *{font-family:"+fc_cw_mp_sp.font.family+";font-size:"+fc_cw_mp_sp.font.size+"pt;font-weight:"+fc_cw_mp_sp.font.weight+";}"+
	fc_rule+"*.fc_d2 small a, "+fc_rule2+"*.fc_d2 small a{font-size:"+(fc_cw_mp_sp.font.size+1)+"pt;}"+
	
	//Options panel
	fc_rule+"*.fc_d3, "+fc_rule2+"*.fc_d3{font-family:arial;font-size:7pt;color:black;}"+
	fc_rule+"*.fc_d3 *, "+fc_rule2+"*.fc_d3 *{font-family:arial;font-size:7pt;}"+
	
	//Alert box
	fc_rule+"*.fc_d4, "+fc_rule2+"*.fc_d4{"+fc_tb_ab.css+"}"+
	fc_rule+"*.fc_d4 *, "+fc_rule2+"*.fc_d4 *{"+fc_tb_ab.text.message_text_css+"}"+

	//Widgets border
	fc_rule+"*.fc_cborder a, "+fc_rule2+"*.fc_cborder a{"+fc_widgets.link_css+"}" +
	fc_rule+"*.fc_cborder a:link, "+fc_rule2+"*.fc_cborder a:link{}" +
	fc_rule+"*.fc_cborder a:visited, "+fc_rule2+"*.fc_cborder a:visited{}" +
	fc_rule+"*.fc_cborder a:hover, "+fc_rule2+"*.fc_cborder a:hover{"+fc_widgets.hover_css+"}" +
	fc_rule+"*.fc_cborder a.fc_cborder_dis:hover, "+fc_rule2+"*.fc_cborder a.fc_cborder_dis:hover{"+fc_widgets.link_css+"}" +
	
	//User box widgets border
	fc_rule+"*.fc_ucborder a, "+fc_rule2+"*.fc_ucborder a{"+fc_uwidgets.link_css+"}" +
	fc_rule+"*.fc_ucborder a:link, "+fc_rule2+"*.fc_ucborder a:link{}" +
	fc_rule+"*.fc_ucborder a:visited, "+fc_rule2+"*.fc_ucborder a:visited{}" +
	fc_rule+"*.fc_ucborder a:hover, "+fc_rule2+"*.fc_ucborder a:hover{"+fc_uwidgets.hover_css+"}" +
	fc_rule+"*.fc_ucborder a.fc_ucborder_dis:hover, "+fc_rule2+"*.fc_ucborder a.fc_ucborder_dis:hover{"+fc_uwidgets.link_css+"}" +
	
	
	//alert box buttons
	fc_rule+"div.fc_abbtn a, "+fc_rule2+"div.fc_abbtn a{"+fc_tb_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
	fc_rule+"div.fc_abbtn a:link, "+fc_rule2+"div.fc_abbtn a:link{"+fc_tb_btn.states.link_css+"}" +
	fc_rule+"div.fc_abbtn a:visited, "+fc_rule2+"div.fc_abbtn a:visited{"+fc_tb_btn.states.link_css+"}" +
	fc_rule+"div.fc_abbtn a:hover, "+fc_rule2+"div.fc_abbtn a:hover{"+fc_tb_btn.states.hover_css+"}" +
	fc_rule+"div.fc_abbtn_dis a, "+fc_rule2+"div.fc_abbtn_dis a{"+fc_tb_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
	fc_rule+"div.fc_abbtn_dis a.fc_abbtn_disa, "+fc_rule2+"div.fc_abbtn_dis a.fc_abbtn_disa{"+fc_tb_btn.states.disabled_css+";cursor:default;}" +
	
	//options buttons
	fc_rule+"div.fc_obtn a, "+fc_rule2+"div.fc_obtn a{"+fc_o_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
	fc_rule+"div.fc_obtn a:link, "+fc_rule2+"div.fc_obtn a:link{"+fc_o_btn.states.link_css+"}" +
	fc_rule+"div.fc_obtn a:visited, "+fc_rule2+"div.fc_obtn a:visited{"+fc_o_btn.states.link_css+"}" +
	fc_rule+"div.fc_obtn a:hover, "+fc_rule2+"div.fc_obtn a:hover{"+fc_o_btn.states.hover_css+"}" +
	fc_rule+"div.fc_obtn_dis a, "+fc_rule2+"div.fc_obtn_dis a{"+fc_o_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
	fc_rule+"div.fc_obtn_dis a.fc_obtn_disa, "+fc_rule2+"div.fc_obtn_dis a.fc_obtn_disa{"+fc_o_btn.states.disabled_css+";cursor:default;}" +
	
	//send to room button
	fc_rule+"div.fc_srbtn a, "+fc_rule2+"div.fc_srbtn a{"+fc_sr_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
	fc_rule+"div.fc_srbtn a:link, "+fc_rule2+"div.fc_srbtn a:link{"+fc_sr_btn.states.link_css+"}" +
	fc_rule+"div.fc_srbtn a:visited, "+fc_rule2+"div.fc_srbtn a:visited{"+fc_sr_btn.states.link_css+"}" +
	fc_rule+"div.fc_srbtn a:hover, "+fc_rule2+"div.fc_srbtn a:hover{"+fc_sr_btn.states.hover_css+"}" +
	fc_rule+"div.fc_srbtn_dis a, "+fc_rule2+"div.fc_srbtn_dis a{"+fc_sr_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
	fc_rule+"div.fc_srbtn_dis a.fc_srbtn_disa, "+fc_rule2+"div.fc_srbtn_dis a.fc_srbtn_disa{"+fc_sr_btn.states.disabled_css+";cursor:default;}" +
	
	//send private button
	fc_rule+"div.fc_spbtn a, "+fc_rule2+"div.fc_spbtn a{"+fc_sp_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
	fc_rule+"div.fc_spbtn a:link, "+fc_rule2+"div.fc_spbtn a:link{"+fc_sp_btn.states.link_css+"}" +
	fc_rule+"div.fc_spbtn a:visited, "+fc_rule2+"div.fc_spbtn a:visited{"+fc_sp_btn.states.link_css+"}" +
	fc_rule+"div.fc_spbtn a:hover, "+fc_rule2+"div.fc_spbtn a:hover{"+fc_sp_btn.states.hover_css+"}" +
	fc_rule+"div.fc_spbtn_dis a, "+fc_rule2+"div.fc_spbtn_dis a{"+fc_sp_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
	fc_rule+"div.fc_spbtn_dis a.fc_spbtn_disa, "+fc_rule2+"div.fc_spbtn_dis a.fc_spbtn_disa{"+fc_sp_btn.states.disabled_css+";cursor:default;}" +
	
	//send private user box button
	fc_rule+"div.fc_uspbtn a, "+fc_rule2+"div.fc_uspbtn a{"+fc_usp_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
	fc_rule+"div.fc_uspbtn a:link, "+fc_rule2+"div.fc_uspbtn a:link{"+fc_usp_btn.states.link_css+"}" +
	fc_rule+"div.fc_uspbtn a:visited, "+fc_rule2+"div.fc_uspbtn a:visited{"+fc_usp_btn.states.link_css+"}" +
	fc_rule+"div.fc_uspbtn a:hover, "+fc_rule2+"div.fc_uspbtn a:hover{"+fc_usp_btn.states.hover_css+"}" +
	fc_rule+"div.fc_uspbtn_dis a, "+fc_rule2+"div.fc_uspbtn_dis a{"+fc_usp_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
	fc_rule+"div.fc_uspbtn_dis a.fc_uspbtn_disa, "+fc_rule2+"div.fc_uspbtn_dis a.fc_uspbtn_disa{"+fc_usp_btn.states.disabled_css+";cursor:default;}" +
	
	//remove block button
	fc_rule+"div.fc_blkbtn a, "+fc_rule2+"div.fc_blkbtn a{"+fc_blk_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
	fc_rule+"div.fc_blkbtn a:link, "+fc_rule2+"div.fc_blkbtn a:link{"+fc_blk_btn.states.link_css+"}" +
	fc_rule+"div.fc_blkbtn a:visited, "+fc_rule2+"div.fc_blkbtn a:visited{"+fc_blk_btn.states.link_css+"}" +
	fc_rule+"div.fc_blkbtn a:hover, "+fc_rule2+"div.fc_blkbtn a:hover{"+fc_blk_btn.states.hover_css+"}" +
	fc_rule+"div.fc_blkbtn_dis a, "+fc_rule2+"div.fc_blkbtn_dis a{"+fc_blk_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
	fc_rule+"div.fc_blkbtn_dis a.fc_blkbtn_disa, "+fc_rule2+"div.fc_blkbtn_dis a.fc_blkbtn_disa{"+fc_blk_btn.states.disabled_css+";cursor:default;}";
	
	FCChatConfig.dynamicStyles=firstPart+
	//fc_rule+"*.fc_a1:link, "+fc_rule2+"*.fc_a1:link{font-size:"+fc_cwfs+"pt;}"+
	//fc_rule+"*.fc_a1:visited, "+fc_rule2+"*.fc_a1:visited{font-size:"+fc_cwfs+"pt;}"+
	//fc_rule+"*.fc_a1:hover, "+fc_rule2+"*.fc_a1:hover{font-size:"+fc_cwfs+"pt;}"+
	fc_rule+"*.fc_online, "+fc_rule2+"*.fc_online{height:6px;width:6px}"+
	fc_rule+"*.fc_online2, "+fc_rule2+"*.fc_online2{height:8px;width:8px}"+
	fc_rule+"*.fc_onlinesp, "+fc_rule2+"*.fc_onlinesp{height:6px;width:6px}"+
	fc_rule+"*.fc_onlinesp2, "+fc_rule2+"*.fc_onlinesp2{height:8px;width:8px}"+
	
	
	//fc_rule+"*.fc_a2:link, "+fc_rule2+"*.fc_a2:link{font-family:"+fc_df+";font-size:"+fc_spfs+"pt;}"+
	//fc_rule+"*.fc_a2:visited, "+fc_rule2+"*.fc_a2:visited{font-family:"+fc_df+";font-size:"+fc_spfs+"pt;}"+
	//fc_rule+"*.fc_a2:hover, "+fc_rule2+"*.fc_a2:hover{font-family:"+fc_df+";font-size:"+fc_spfs+"pt;}"+
	
	//Side panel offline screen names
	fc_rule+"*.fc_u:link, "+fc_rule2+"*.fc_u:link{"+fc_spsnc.offline.link_css+"}"+
	fc_rule+"*.fc_u:visited, "+fc_rule2+"*.fc_u:visited{"+fc_spsnc.offline.visited_css+"}"+
	fc_rule+"*.fc_u:hover, "+fc_rule2+"*.fc_u:hover{"+fc_spsnc.offline.hover_css+"}"+
	
	//Side panel online screen naes
	fc_rule+"*.fc_uo:link, "+fc_rule2+"*.fc_uo:link{"+fc_spsnc.online.link_css+"}"+
	fc_rule+"*.fc_uo:visited, "+fc_rule2+"*.fc_uo:visited{"+fc_spsnc.online.visited_css+"}"+
	fc_rule+"*.fc_uo:hover, "+fc_rule2+"*.fc_uo:hover{"+fc_spsnc.online.hover_css+"}"+
	
	//Chat window screen names offline
	fc_rule+"*.fc_u2:link, "+fc_rule2+"*.fc_u2:link{"+fc_cwsnc.offline.link_css+"}"+
	fc_rule+"*.fc_u2:visited, "+fc_rule2+"*.fc_u2:visited{"+fc_cwsnc.offline.visited_css+"}"+
	fc_rule+"*.fc_u2:hover, "+fc_rule2+"*.fc_u2:hover{"+fc_cwsnc.offline.hover_css+"}"+
	
	//chat window screen names online
	fc_rule+"*.fc_uo2:link, "+fc_rule2+"*.fc_uo2:link{"+fc_cwsnc.online.link_css+"}"+
	fc_rule+"*.fc_uo2:visited, "+fc_rule2+"*.fc_uo2:visited{"+fc_cwsnc.online.visited_css+"}"+
	fc_rule+"*.fc_uo2:hover, "+fc_rule2+"*.fc_uo2:hover{"+fc_cwsnc.online.hover_css+"}"+
	
	//Side panel online blocked screen names
	fc_rule+"*.fc_ublk:link, "+fc_rule2+"*.fc_ublk:link{"+fc_spsnc.online.blocked.link_css+"}"+
	fc_rule+"*.fc_ublk:visited, "+fc_rule2+"*.fc_ublk:visited{"+fc_spsnc.online.blocked.visited_css+"}"+
	fc_rule+"*.fc_ublk:hover, "+fc_rule2+"*.fc_ublk:hover{"+fc_spsnc.online.blocked.hover_css+"}"+
	
	//Side panel offline blocked screen names
	fc_rule+"*.fc_ublko:link, "+fc_rule2+"*.fc_ublko:link{"+fc_spsnc.offline.blocked.link_css+"}"+
	fc_rule+"*.fc_ublko:visited, "+fc_rule2+"*.fc_ublko:visited{"+fc_spsnc.offline.blocked.visited_css+"}"+
	fc_rule+"*.fc_ublko:hover, "+fc_rule2+"*.fc_ublko:hover{"+fc_spsnc.offline.blocked.hover_css+"}"+
	
	//Chat window blocked online screen names
	fc_rule+"*.fc_ublk2:link, "+fc_rule2+"*.fc_ublk2:link{"+fc_cwsnc.online.blocked.link_css+"}"+
	fc_rule+"*.fc_ublk2:visited, "+fc_rule2+"*.fc_ublk2:visited{"+fc_cwsnc.online.blocked.visited_css+"}"+
	fc_rule+"*.fc_ublk2:hover, "+fc_rule2+"*.fc_ublk2:hover{"+fc_cwsnc.online.blocked.hover_css+"}"+
	
	//Chat window blocked offline screen names
	fc_rule+"*.fc_ublko2:link, "+fc_rule2+"*.fc_ublko2:link{"+fc_cwsnc.offline.blocked.link_css+"}"+
	fc_rule+"*.fc_ublko2:visited, "+fc_rule2+"*.fc_ublko2:visited{"+fc_cwsnc.offline.blocked.visited_css+"}"+
	fc_rule+"*.fc_ublko2:hover, "+fc_rule2+"*.fc_ublko2:hover{"+fc_cwsnc.offline.blocked.hover_css+"}"+
	
	fc_rule+"*.fc_txt, "+fc_rule2+"*.fc_txt{"+fc_sc_css+";-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius:5px}"+
	fc_rule+"*.fc_table, "+fc_rule2+"*.fc_table{}"+
	fc_rule+"*.fc_table td, "+fc_rule2+"*.fc_table td{font-family:"+fc_df+";font-size:9px;color:black}"+
	fc_rule+"*.fc_table div, "+fc_rule2+"*.fc_table div{font-family:"+fc_df+";font-size:9px;color:black}"+
	fc_rule+"*.fc_table a, "+fc_rule2+"*.fc_table a{font-family:"+fc_df+";font-size:9px;color:blue}"+
	fc_rule+"*.fc_table b, "+fc_rule2+"*.fc_table b{font-family:"+fc_df+";font-size:9px}"+
	fc_rule+"*.fc_table textarea, "+fc_rule2+"*.fc_table textarea{"+fc_uc_css+";width:300;height:50;z-index:302;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius:5px}";
}());