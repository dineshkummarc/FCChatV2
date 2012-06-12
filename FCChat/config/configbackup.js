//***IMPORTANT-READ THIS: In all config variables 
//***EXCEPT smileys you must escape any double quotes
//***with a backslash. ie, "hello" must be encoded as \"hello\"

var FCChatConfig = {
		
	//CONNECTION
	
	chat_id:"1000000000000000",
	host:"",
	port:443,
	policy_port:443,
	
	//VERSION
	
	version:"2.1.6",
	subversion:"0",
	
	//ENVIRONMENT
	
	forum_proxy:"",
	default_on:true,
	auto_connect:true,
	require_login:false,
	no_chat_history:false,
	showTyping:true,
	display_timestamp:false,
	show_online_count:true,
	allow_split_screen_mode:true,
	allow_web:true,
	room_message_limit:300,
	min_room_messages:50,
	preload_images:false,
	max_chat_size:2000,
	flashEnabled:'test',
	websocketEnabled:'test',
	noshow:false,
	userbox_mode:0,
	zindex_base:0,
	domain:null,
	dir: window["fc_chat_path"] || "/FCChat/",
	alt_dir: window["fc_chat_path"] || "/FCChat/",
	
	//CHAT ROOMS (50 max)
	
	chatRooms:[
	     "The Lobby",
	     "Fun Room",
	     "Help Desk",
	     "Private Room"
	],
	
	chatRoomDescriptions:[
	     "A cool place to hang out",
	     "",
	     "",
	     "Members Only"
	],		
	
	lockedRooms:"3", //comma separated list of room indexes 0,1,2,3 etc
	disabled_rooms:"", //room indexes
	open_in_room:0,    //room index
	
	//MESSAGES
	
	startText:"To begin chatting, press the <b>Open Button.&nbsp;</b>",
	autoGreet:"",
	loadingText:"<b>Connecting, please wait...</b>",
	readyText:"<b><font style='color:green'>YOURDOMAIN Chat</font>...</b>",
	loadingPageText:"<b><font style='margin-left:10px;font-size:12pt;'>&nbsp;Loading Page...Please wait...</font>",
	loadingChatText:"<b><font style='margin-left:10px;font-size:12pt;'>&nbsp;Loading Chat...Please wait...</font>",
	loadingRoomText:"<b><font style='margin-left:10px;font-size:12pt;'>&nbsp;Loading Room...Please wait...</font>",
	chat_toolbox_connectionLostText:"<font style='color:red;font-weight:700'>Connection lost...</font> <a href='javascript:fc_chat.reqRecon()'>Reconnect</a>",
	alert_panel_connectionLostText:"<font style='color:red;font-weight:700'>Connection lost...</font> <a href='javascript:fc_chat.reqRecon()'>Reconnect</a> <a href='javascript:fc_chat.closeChat()'>Close</a>",
	alert_panel_loginText:"To enter, please <b>Login</b> first. <a href='javascript:fc_chat.closeChat()'>Close</a>",
	disabled_roomText:"You must be a member to enter this room.",
	sessionText:"<b>Connecting, please wait...</b>",
	offText:"<b>&nbsp;Chat is off.&nbsp;&nbsp;</b>",
	pauseText:"<b>Chat Paused... <a href='javascript:fc_chat.unPause()'>Resume</a></b>",
	signingOffText:"Signing Off...",
	autoLogoutText:"You have successfully logged out",
	
	//STYLE TEMPLATE/////////////////////////////////////////////////////////////////////////////////////////////
	styles:{
		chat_toolbox:{
			external_template:"",
			absolute_positioning:false,
			top:0,
			left:310,
			width:400,
			height:40,
			css:"border:0px solid #aaaaaa;color:transparent;",
			buttons:{
				default_css:"border:1px solid #000000; padding:4px 8px; font:12px arial;",
				states:{
					link_css:"color:black",
					hover_css:"color:purple",
					disabled_css:"color:gray;border:1px solid gray"
				},
				open_chat_button:{
					top:3,
					left:295
				},
				on_off_button:{
					top:3,
					left:258
				}
			},
			alert_box:{
				top:3,
				left:2,
				width:250,
				height:23,
				expand_on_rollover:{
					width:250,
					height:75,
					shift_page_down:0,
					shift_page_right:0
				},
				css:"border:1px solid #000000;background-color:#eeeeee",
				text:{
					message_text_css:"font-family:arial;font-size:8pt;color:black",
					screen_name_css:"font-family:arial;font-size:10pt;color:green;font-weight:700"
				}
			},
			new_message_alert:{
				top:27,
				left:3,
				css:"font-family:arial;font-size:12px;font-weight:bold;color:gray;",
				text:"New message...Roll over to expand."
			},
			login_panel:{
				top:35,
				left:295
			}
		},
		chat_window:{
			external_template:"",
			frame:{
				logo:"fastcatlogo.gif",
				background_color:"gray",
				opacity:.75
			},
			main_panel:{
				height:568,
				background_image:"", //"tc2.gif",
				background_color:"#555555",
				border:"1px solid #aaaaaa",
				opacity:.85,
				send_to_room_button:{
					default_css:"border:1px solid silver; padding:2px 8px; font:10px arial;",
					states:{
						link_css:"color:white",
						hover_css:"color:lightblue",
						disabled_css:"color:#bbbbbb;border:1px solid #bbbbbb"
					}
				},
				send_private_button:{
					default_css:"border:1px solid silver; padding:2px 12px 2px 11px; font:10px arial;",
					states:{
						link_css:"color:white",
						hover_css:"color:lightblue",
						disabled_css:"color:#bbbbbb;border:1px solid #bbbbbb"
					}
				},
				other_buttons:{
					default_css:"border:1px solid silver; padding:2px 8px; font:12px arial;",
					states:{
						link_css:"color:white",
						hover_css:"color:lightblue",
						disabled_css:"color:#bbbbbb;border:1px solid #bbbbbb"
					}
				},
				widgets:{
					border:{
						link_css:"border:1px solid #666666",
						hover_css:"border:1px solid lightblue"
					}
				},
				text:{
					font:{
						family:"arial",
						color:"lightblue",
						size:12,
						weight:700
					}
				},
				links:{
					css:"font-family:arial;font-size:12px;font-weight:700;color:#ccffff;text-decoration:none;"
				},
				chat_panels:{
					chat_room_panel:{
						background_image:"chat_window_background.jpg",
						background_color:"#000000",
						border:"1px solid silver",
						opacity:.5
					},
					private_chat_panel:{
						background_image:"private_chat_background.jpg",
						background_color:"#000000",
						border:"1px solid silver",
						opacity:.5
					},
					user_icon:{
						online_css:"background-color:#54FD74;border:1px solid white",
						offline_css:"background-color:transparent;border:1px solid #aaaaaa",
						blocked_css:"background-color:#FF8380;border:1px solid white"
					},
					font:{
						family:"arial",
						size:8,
						weight:600,
						color:{
							default_text_color:"white",
							timestamp_color:"#4cF66c",
							link_color:"white",
							censored_color:"red"
						},
						screen_name_states:{
							online:{
								link_css:"color:#fff;",
								visited_css:"color:#FDF5E6;",
								hover_css:"color:#FFFF00;",
								blocked:{
									link_css:"color:#FFB6C1;",
									visited_css:"color:red;",
									hover_css:"color:#cc0000;"
								}
							},
							offline:{
								link_css:"color:white;text-decoration:none;",
								visited_css:"color:#B0E0E6;text-decoration:none;",
								hover_css:"color:#ADD8E6;text-decoration:none;",
								blocked:{
									link_css:"color:#FFB6C1;text-decoration:none;",
									visited_css:"color:red;text-decoration:none;",
									hover_css:"color:#cc0000;text-decoration:none;"
								}
							}
						}
					}
				},
				side_panels:{
					background_color:"lightgreen",
					border:"1px solid silver",
					opacity:.5,
					screen_name_dividers:{
						background_color:"transparent",
						hover_color:"#b3b3b3",
						border:"1px solid #cccccc"
					},
					room_display_panel:{
						background_color:"transparent",
						divider_color:"silver",
						text_css:"font-family:arial;font-size:7pt;font-weight:500;color:white;",
						change_room_link_css:"font-family:arial;font-size:7pt;font-weight:500;color:#ccffff;"
					},
					private_group_panel:{
						selected_user:{
							background_color:"#999966",
							arrow:{
								color:"green",
								hover_color:"red"
							}
						}
					},
					user_icon:{
						online_css:"background-color:#54FD74;border:1px solid white",
						offline_css:"background-color:transparent;border:1px solid#aaaaaa",
						blocked_css:"background-color:#FF8380;border:1px solid white"
					},	
					font:{
						family:"arial",
						size:8,
						weight:500,
						color:{
							typing_color:"#eeeeee",
							idle_color:"#777777",
							mod_color:"#000000"
						},
						screen_name_states:{
							online:{
								link_css:"color:#fff;",
								visited_css:"color:#FDF5E6;",
								hover_css:"color:#FFFF00;",
								blocked:{
									link_css:"color:#FFB6C1;",
									visited_css:"color:red;",
									hover_css:"color:#cc0000;"
								}
							},
							offline:{
								link_css:"color:white;text-decoration:none;",
								visited_css:"color:#B0E0E6;text-decoration:none;",
								hover_css:"color:#ADD8E6;text-decoration:none;",
								blocked:{
									link_css:"color:#FFB6C1;text-decoration:none;",
									visited_css:"color:red;text-decoration:none;",
									hover_css:"color:#cc0000;text-decoration:none;"
								}
							}
						}
					}
				},
				send_chat_panel:{
					width:417,
					height:32,
					css:"font-size:9pt;font-family:arial;color:black;background-color:#aaaaaa;border:1px solid silver;"
				},
				user_pop_up_panel:{
					border:"1px solid silver",
					background_color:"#444444",
					opacity:.8,
					font:{
						screen_name_css:"font-weight:bold;font-size:9pt;color:lightblue;font-style:italic;",
						links_css:"font-family:arial;font-size:9pt;color:white;",
						functions_css:"font-family:arial;color:lightblue;font-size:9pt;",
						smalltext_css:"font-family:arial;color:white;font-size:7pt;"
					},
					dividing_line:"1px solid gray",
					widgets:{
						border:{
							link_css:"border:1px solid #666666",
							hover_css:"border:1px solid lightblue"
						}
					},
					send_chat_panel:{
						css:"font-size:9pt;font-family:arial;color:black;background-color:#aaaaaa;border:1px solid silver;"
					},
					send_private_button:{
						default_css:"border:1px solid silver; padding:2px 12px 2px 11px; font:10px arial;",
						states:{
							link_css:"color:white",
							hover_css:"color:lightblue",
							disabled_css:"color:#bbbbbb;border:1px solid #bbbbbb;"
						}
					}
				},
				options_panel:{
					outer_border:"1px solid #444444",
					inner_border:"1px solid silver",
					background_color:"gray",
					panel_font_css: "color:lightblue;font-family:arial;font-weight:bold;font-style:italic;font-size:12px",
					functions:{
						font_css:"color:white;font-size:12px;text-decoration:none",
						border:"1px solid silver"
					},
					selectors:{
						border:"3px solid silver",
						background_color:"#aaaaaa",
						hover_color:"#b0b0b0",
						selected_color:"#aaaa77",
						font_css:"color:#333333;font-family:arial;font-weight:normal;font-size:10px",
						separator:"1px solid silver"
					},
					room_selector:{
						room_name_font_css:"font-size:12px;font-weight:bold;color:white;",
						disabled_room_name_font_css:"font-size:12px;font-weight:bold;color:#dddddd;"
					},
					font_size_selector:{
						smallest:6,
						largest:16
					},
					color_selector:{
						color_names:["default","black","blue","red","purple","green","yellow","orange","white"],
						color_values:["#fff","black","blue","red","purple","green","yellow","orange","white"]
					},
					remove_block_button:{
						default_css:"border:1px solid silver; padding:2px 12px 2px 11px; font:10px arial;",
						states:{
							link_css:"color:white",
							hover_css:"color:lightblue",
							disabled_css:"color:#bbbbbb;border:1px solid #bbbbbb;"
						}
					}
				},
				smileys_panel:{
					border:"1px solid #444444",
					background_color:"gray",
					width:250,
					height:200
				},
				login_panel:{
					background_color:"#444444",
					border:"1px solid silver",
					font:{
						textfield_description_css:"font-family:arial;font-size:8pt;color:darkgray;font-style:italic;font-weight:bold;",
						smalltext_css:"margin-right:10px;font-family:arial;font-size:8pt;color:white;"
					},
					textfield_css:"background-color:#dddddd;"
				},
				room_password_panel:{
					background_color:"#444444",
					border:"3px solid silver",
					font:{
						textfield_description_css:"font-family:arial;font-size:8pt;color:darkgray;font-style:italic;font-weight:bold;",
						smalltext_css:"font-style:italic;margin-right:10px;font-family:arial;font-size:8pt;color:white;"
					},
					textfield_css:"background-color:#dddddd;"
				},
				alert_panel:{
					background_color:"#dddddd",
					border:"1px solid black",
					font:{
						text_css:"margin-right:10px;font-family:arial;font-size:9pt;color:black;"
					}
				}
			}
		},
		split_screen:{
			background_color:"#555555"
		}
	},
	//END STYLE TEMPLATE////////////////////////////////////////////////////////////////////////////////////
	 
	//PROFILES
	
	useProfiles:true,
	prof_subdir:(window["fc_chat_path"] || "/FCChat/") + "html/Profile.html?u=",
	
	//IMAGES AVATARS SMILEYS
	
	use_images:false,
	use_avatars:false,
	script_type:"php",
	avatars_dir:(window["fc_chat_path"] || "/FCChat/") + "html/images/avatars/",
	images_dir:(window["fc_chat_path"] || "/FCChat/") + "html/images/",
	smileys_dir:(window["fc_chat_path"] || "/FCChat/") + "html/images/smileys/",
	avatar_sz:35,
	show_avatar_in_chats:true,
	
	//***IMPORTANT-READ THIS: In smileys, You 
	//***must escape any single quotes with three backslashes.
	//*** ie, a wink emoticon '-) must be encoded as \\\'-)
	smileys:[['sm1.gif', ':-)','18',],['sm2.gif',':-)0','24'],['sm3.gif',':-)1','15'],['sm4.gif',':-)2','20'],['sm5.gif',':-)3','16'],['sm6.gif',':-)4','18'],['sm7.gif',':-)5','26'],['sm8.gif',':-)6','23'],['sm9.gif',':-)7','23'],['sm10.gif',':-)8','28'],['sm11.gif',':-)9','22'],['sm12.gif',':-)10','36'],['sm13.gif',':-)11','30'],['sm14.gif',':-)12','15'],['sm15.gif',':-)13','18'],['sm16.gif',':-)14','21'],['sm17.gif',':-)15','28'],['sm18.gif',':-)16','15']],
	
	//VIDEO
	
	video_enabled:false,
	max_video_streams:30,
	capture_width:160,
	capture_height:120,
	fps:5,
	quality:85,
	
	video_window1_color:"darkOliveGreen",
	video_window2_color:"darkOliveGreen",
	
	disallow_video_in_rooms:"",
	show_a_v_icon:false,
	
	//COOKIES
	
	user_cookie:"fc_UID", 
	session_cookie:"fc_ChatToken",
	timestamp_cookie:"fc_timestamp",
	mod_cookie:"fc_ChatToken",
	
	//loading phrases
	load_standalone:(!window["jGo"]||jGo.scripts.loadState('jGo.DefaultWindow.init.min.js') == 'not.loaded'?"{<script defer='defer' type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") + "jGo/js/jGo.DefaultWindow.init.min.js'></script>":"") +
	"<script defer='defer' type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") + "jGo/js/jGo.cookie.min.js'></" +
	"script><script defer='defer' type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") + "jGo/js/jGo.MD5.min.js'></" +
	"script><script defer='defer' type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") + "js/fcchat.standalone.min.js'></" +
	"script><script defer='defer' type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") + "js/install.fcchat.standalone.js'></" + 
	"script>",
	load_integrated:"<script defer='defer' type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") +
	"jGo/js/jGo.DefaultWindow.init.min.js'></" +
	"script><script defer='defer' type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") + "jGo/js/jGo.cookie.min.js'></" +
	"script><script defer='defer' type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") + "jGo/js/jGo.MD5.min.js'></" +
	"script><script defer='defer' type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") + "js/fcchat.integrated.min.js'></" +
	"script><script defer='defer' type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") + "js/install.fcchat.integrated.js'></" + 
	"script>"
	
};
