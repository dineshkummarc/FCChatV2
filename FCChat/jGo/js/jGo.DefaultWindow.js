/*
 *DefaultWindow Class
 */

( function() {

	// Constants
	var $ = jGo.$;
    var environment = '';
    var DRAGABLE_ELEMENT_PREFIX = "jGo_drag";
    var CLICKABLE_ELEMENT_PREFIX = "jGo_click";
    var DRAG_SELECTOR_LENGTH = 2;
    var CLICK_SELECTOR_LENGTH = 2;
    var DRAG_TOP_TITLE_COVER = "tc";
    var DRAG_TOP_TITLE_NOBR = "tb";
    var DRAG_TOP_TITLE_IMG = "ti";
    var DRAG_TOP_MIDDLE = "tm";
    var DRAG_TOP_LEFT = "tl";
    var DRAG_TOP_RIGHT = "tr";
    var RESIZE_LEFT = "rl";
    var RESIZE_RIGHT = "rr";
    var RESIZE_BOTTOM_MIDDLE = "bm";
    var RESIZE_BOTTOM_LEFT = "bl";
    var RESIZE_BOTTOM_RIGHT = "br";
    var MINIMIZE = "mn";
    var MAXIMIZE = "mx";
    var CLOSE = "cl";
    var RESTORE = "rs";
    var ALTMINIMIZE = "b1";
    var ALTMAXIMIZE = "b2";
    var ALTCLOSE = "b3";
    var ALTRESTORE = "b0";

    jGo.DefaultWindow = function() {
		jGo.Window.apply(this, arguments);
		this.type = 'DefaultWindow';
		this.doc = $(document);
		this.resizable = true;
		this.shieldOnDrag = true;
		this.title = '';
		this.min_label;
		this.max_label;
		this.close_label;
		this.restore_label;
		this.t;
		this.tI;
		this.tC;
		this.cB;
		this.MB;
		this.mB;
		this.cA;
		this.cA2;
		this.cN;

		this.eventsEnabled = true;
		this.lock=false;
		this.eWL = 0;
		this.eWT = 0;
		this.eWW = 0;
		this.eWH = 0;
		this.eCW = 0;
		this.eCH = 0;
		this.eCBL = 0;
		this.eMBL = 0;
		this.emBL = 0;
		this.eX = 0;
		this.eY = 0;
		this.eDraggingWindow = false;
		this.dragElement = null;

		this.color;
		this.opacity;
		this.maxOpacity = 1;
		this.top;
		this.left;
		this.mW = 200;
		this.mH = 38;
		this.lW = 300;
		this.lH = 300;
		this.lt = 0;
		this.lL = 0;
		this.MW = 800;
		this.MH = 750;

		this.getDefault = function() {
			return jGo.DefaultWindow.prototype;
		};
	};

	jGo.DefaultWindow.prototype = new jGo.Window();
	var dwp = jGo.DefaultWindow.prototype;

	dwp.create = function(id, p) {
		this.title = p[0];
		var left = p[1];
		var top = p[2];
		var width = p[3];
		var height = p[4];
		var winstyle = p[5];
		var color = p[6];
		var opacity = p[7];
		var borderStyle = p[8];
		var _backgroundColor = p[9];
		var _backgroundImage = p[10];
		var contentType = p[11];
		var content = p[12];
		var menu = p[13];
		var resizable = p[14];
		var logo = p[15] || (jGo.UI.path + "/current_skin/logo.gif");
		this.min_label = p[16]||'minimize';
		this.max_label = p[17]||'maximize';
		this.restore_label = p[18]||'restore';
		this.close_label = p[19]||'close';
		
		var c = [];
		c[0] = "";
		c[1] = "";
		c[2] = "";
		c[3] = "";
		c[4] = "";
		c[5] = "";
		c[6] = "";
		c[7] = "";
		var id_prefix = 'jGo_drag';
		var cursor_style = '';
		if (!resizable) {
			id_prefix = 'jGo_fix';
			cursor_style = 'cursor:default;';
		}
		var style = cursor_style + 'background-color:' + color
				+ ' ;filter:alpha(opacity=' + opacity + ');-moz-opacity:.'
				+ opacity + ';opacity:.' + opacity + ';';
		this.resizable = resizable;
		this.defaultClientWidth = width;
		this.defaultClientHeight = height;
		this.opacity = opacity;
		this.color = color;

		this.frame = $('#jGo_win' + id);
		if (!this.frame[0]) {
			this.frame = $(document.createElement('div')).attr( {
				'id' :'jGo_win' + id
			}).addClass('jGo_app jGo_myapp jGo_ydsf');
			$(document).append(this.frame);
		}
		this.frame.css( {
			display :"block",
			width :(jGo.util.eN(width) + 10) + "px",
			height :(jGo.util.eN(height) + 35) + "px",
			position :"absolute",
			top :top + "px",
			left :left + "px"
		});
		var background = "background-color:#" + _backgroundColor + ";";
		if (_backgroundColor == '') {
			background = "background-image:url(" + _backgroundImage + ");";
		}
		this.frame[0].innerHTML = "<table id='jGo_inner" + id
				+ "' cellpadding=0 cellspacing=0 class='jGo_inner' >" + "<tr>"
				+ "<td id='jGo_dragtl" + id + "' class='jGo_tl_" + winstyle
				+ "' style='" + style + "'>" + c[0] + "</td>"
				+ "<td id='jGo_dragtm" + id + "' class='jGo_tm_" + winstyle
				+ "' style='" + style + "'>" + c[1] + "</td>"
				+ "<td id='jGo_dragtr" + id + "' class='jGo_tr_" + winstyle
				+ "' style='" + style + "'>" + c[2] + "</td>" + "</tr>"
				+ "<tr>" + "<td id='" + id_prefix + "rl" + id
				+ "' class='jGo_rl_" + winstyle + "' style='" + style + "'>"
				+ c[3] + "</td>" + "<td>" + "<div id='jGo_cnt_wrap" + id
				+ "' style='width:" + width + "px;height:" + height + "px;'>" 
				+ "<img src='trans.gif' height=1 width=1><div id='jGo_cnt" + id + "' style='position:absolute;overflow:hidden;width:" + width + "px;height:" + height + "px;" + background + "'></div>"
				+ "</div>" + "</td>" + "<td id='" + id_prefix + "rr" + id
				+ "' class='jGo_rr_" + winstyle + "' style='" + style + "'>"
				+ c[4] + "</td>" + "</tr>" + "<tr>" + "<td id='" + id_prefix
				+ "bl" + id + "' class='jGo_bl_" + winstyle + "' style='"
				+ style + "'>" + c[5] + "</td>" + "<td id='" + id_prefix + "bm"
				+ id + "' class='jGo_bm_" + winstyle + "' style='" + style
				+ "'>" + c[6] + "</td>" + "<td id='" + id_prefix + "br" + id
				+ "' class='jGo_br_" + winstyle + "' style='" + style + "'>"
				+ c[7] + "</td>" + "</tr>" + "</table>";
		if ($.browser.version == '6.0' && $.browser.msie) {
			this.frame[0].style.background = '';
		}
		this.cA = $('#jGo_cnt_wrap' + id);
		this.cN = $('#jGo_cnt' + id);
		document.body.insertBefore(this.cN[0],document.body.firstChild);
		if (contentType == 'element') {
			this.cN.append(content);
		}
		if (contentType == 'html') {
			this.cN[0].innerHTML = content;
		}
	    this.cN.css({"z-index":(this.frame.css("z-index")+1),left:(parseInt(this.frame[0].style.left)+5)+'px',top:(parseInt(this.frame[0].style.top)+30)+'px'});
	    var elements = [];
		var offset = this.frame.width();
		this.cB = $(document.createElement('div')).attr("id",
				"jGo_clickcl" + id).css("left", (offset - 40) + "px");
		this.MB = $(document.createElement('div')).attr("id",
				"jGo_clickmx" + id).css("left", (offset - 65) + "px");
		this.mB = $(document.createElement('div')).attr("id",
				"jGo_clickmn" + id).css("left", (offset - 90) + "px");
		$( [ this.cB[0], this.MB[0], this.mB[0] ]).css( {
			position :"absolute",
			width :"21px",
			height :"21px",
			display :"block",
			top :"-5px"
		});

		this.tI = $(document.createElement('div')).attr("id", "jGo_title_inner" + id)
				.css(
						{
							width :"16px",
							background :"url(" + logo + ") no-repeat",
							left :"0px"
						});
		this.t = $(document.createElement('div')).attr("id", "jGo_title" + id)
				.css( {
					width :(offset - 116) + "px",
					left :"16px",
					overflow :"hidden"
				});
		this.tC = $(document.createElement('div'))
				.attr("id", "jGo_dragtc" + id).css( {
					width :(offset - 100) + "px",
					left :"0px",
					"background-color" :color,
					opacity :.0001
				});
		$( [ this.tI[0], this.t[0], this.tC[0] ]).addClass("jGo_title_default")
				.css( {
					position :"absolute",
					height :"15px",
					display :"block",
					top :"-5px",
					cursor :"default"
				});
		this.frame.append(this.cB, this.MB, this.mB, this.tI, this.t, this.tC);
		this.cB
				.html("<a href='javascript:void(0)' title='"+this.close_label+"' id='jGo_clickb3"
						+ id + "' class='jGo_closewindow_default'>&nbsp;</a>");
		this.MB
				.html("<a href='javascript:void(0)' title='"+this.max_label+"' id='jGo_clickb2"
						+ id + "' class='jGo_maxwindow_default'>&nbsp;</a>");
		this.mB
				.html("<a href='javascript:void(0)' title='"+this.min_label+"' id='jGo_clickb1"
						+ id + "' class='jGo_minwindow_default'>&nbsp;</a>");
		this.t
				.html("<nobr id='jGo_dragtb"
						+ id
						+ "'>&nbsp;"
						+ this.title
						+ "<a href='javascript:void(0)' style='visibility:hidden' class='jGo_restorewindow_default'>&nbsp;</a></nobr>");

		this.frame.eventHandler('mousedown', this, 'onMouseDown', '');
		this.cN.eventHandler('mousedown', this, 'onMouseDown', '');
		this.frame.eventHandler('dblclick', this, 'onDoubleClick', '');
		this.id = id;

	};
	dwp.setZPos = function(z) {
		this.frame.css("z-index", z);
		this.cN.css("z-index", z+1);
	};
	dwp.getZPos = function() {
		return this.frame.css("z-index");
	};
	dwp.decZPos = function() {
		this.frame.css("z-index", (this.frame.css("z-index") - 2));
		this.cN.css("z-index", (this.cN.css("z-index") - 2));
	};
	dwp.select = function() {
		this.setBorderOpacity(this.opacity);
	};
	dwp.deselect = function() {
		this.setBorderOpacity(this.opacity - 15);
	};
	dwp.setBorderOpacity = function(opacity) {
		var op = opacity / 100;
		var elements = this.getBorderElements();
		elements.css( {
			opacity :op
		});
		// this.dom.setStyle(elements, 'style', 'filter', 'alpha(opacity=' +
		// opacity * 100 + ')');
	};
	dwp.getBorderElements = function() {
		var id_prefix = 'jGo_drag';
		if (!this.resizable || this.state != 1) {
			id_prefix = 'jGo_fix';
		}
		return $("#jGo_dragtm" + this.id + ",#jGo_dragtl" + this.id
				+ ",#jGo_dragtr" + this.id + ",#" + id_prefix + "rl" + this.id
				+ ",#" + id_prefix + "rr" + this.id + ",#" + id_prefix + "bl"
				+ this.id + ",#" + id_prefix + "bm" + this.id + ",#"
				+ id_prefix + "br" + this.id);
	};
	dwp.close = function() {
		this.doc.trigger('mousedown');
		this.frame.css( {
			display :"none",
			"z-index" :"1000",
			top :"-100px",
			left :"-100px",
			width :"",
			height :""
		});
		this.cN.css("display","none");
		if (!$.browser.msie) {
			this.empty();
		}else{
			var _t = this;
		    setTimeout(function() {_t.empty()}, 50);
		}
		return true;
	};
	dwp.empty = function() {
		if(this.frame[0]){
			this.frame.empty();
			this.frame.html("");
		}
		if(this.cN[0]){
			this.cN.empty();
			this.cN.html("");
			try{
				document.body.removeChild(this.cN[0]);
			}catch(e){};
		}
	};
	dwp.destroy = function() {
		return false;
	};


	dwp.onMouseDown = function(e) {
	        if (this.eventsEnabled) {
	            this.handleMouseDown(e,false);
	        }
	        return false;
	};
	
	dwp.onDoubleClick = function(e) {
	        if (this.eventsEnabled) {
	            this.handleMouseDown(e,true);
	        }
	        return false;
	};
	dwp.onDoubleClickTop = function() {
	    switch(this.state) {
	        case 0: this.onRestore();
	        break;
	        case 1: this.onMinimize();
	        break;
		case 2: this.onRestore();
	        break;
	        default: 
	    }
	};
	dwp.handleMouseDown = function(e,doubleClick) {
		if(!this.isSelected){
			this.select();
		}
	        if (e.button == 1 && window.event != null || e.button == 0) {
	            var target_id = e.target.getAttribute('id');
	            if (target_id != null && target_id.substring(0, DRAGABLE_ELEMENT_PREFIX.length) == DRAGABLE_ELEMENT_PREFIX) {
	                this.eX = e.clientX;
	                this.eY = e.clientY;
	                this.dragElement = e.target;
	                var movement_selector = target_id.substr(DRAGABLE_ELEMENT_PREFIX.length, DRAG_SELECTOR_LENGTH);
	                var _id = target_id.substr(DRAGABLE_ELEMENT_PREFIX.length + DRAG_SELECTOR_LENGTH);
	                document.body.focus();
	                document.body.onselectstart = function() {
	                    return false;
	                 };
	                 document.body.onmousedown = function() {
	                     return false;
	                 };
	                if (this.enabled&&this.id==_id) {
	                    switch(movement_selector) {
	                        case DRAG_TOP_MIDDLE: case DRAG_TOP_LEFT: case DRAG_TOP_RIGHT: case DRAG_TOP_TITLE_COVER: case DRAG_TOP_TITLE_NOBR: case DRAG_TOP_TITLE_IMG: 
					this.eWL = jGo.util.eN(this.frame.css("left"));
	    				this.eWT = jGo.util.eN(this.frame.css("top"));
	                        	if (doubleClick) {
	                           	 	this.onDoubleClickTop();
	                           	 	document.body.onselectstart = null;
	                           	 	document.body.onmousedown = null;
	                        	} else {
						jGo.UI.EventHandler('mousemove','hmd' + this.id,jGo.UI,this,'onMouseMoveDrag');
						jGo.UI.EventHandler('mouseup','hmd' + this.id,jGo.UI,this,'onMouseUp');
	                        	}
	                        break;
	                        case RESIZE_RIGHT:  
					this.eCW = jGo.util.eN(this.cA.css("width"));
	                        	this.eWW = jGo.util.eN(this.frame.width());
	                        	this.frame.css({width:this.eWW});
	                        	this.eCBL = jGo.util.eN(this.cB.css("left"));
	                        	this.eMBL = jGo.util.eN(this.MB.css("left"));
	                        	this.emBL = jGo.util.eN(this.mB.css("left"));
					jGo.UI.EventHandler('mousemove','hmd' + this.id,jGo.UI,this,"onMouseMoveResizeR");
					jGo.UI.EventHandler('mouseup','hmd' + this.id,jGo.UI,this,"onMouseUp");
	                        break;
	                        case RESIZE_LEFT: 
					this.eWL = jGo.util.eN(this.frame.css("left"));
	                        	this.eCW = jGo.util.eN(this.cA.css("width"));
	                        	this.eWW = jGo.util.eN(this.frame.width());
	                        	this.frame.css({width:this.eWW});
	                        	this.eCBL = jGo.util.eN(this.cB.css("left"));
	                        	this.eMBL = jGo.util.eN(this.MB.css("left"));
	                        	this.emBL = jGo.util.eN(this.mB.css("left"));
					jGo.UI.EventHandler('mousemove','hmd' + this.id,jGo.UI,this,"onMouseMoveResizeL");
					jGo.UI.EventHandler('mouseup','hmd' + this.id,jGo.UI,this,"onMouseUp");
	                        break;
	                        case RESIZE_BOTTOM_LEFT: 
					this.eWL = jGo.util.eN(this.frame.css("left"));
	                        	this.eCW = jGo.util.eN(this.cA.css("width"));
	                        	this.eWW = jGo.util.eN(this.frame.width());
	                        	this.frame.css({width:this.eWW});
	                        	this.eCBL = jGo.util.eN(this.cB.css("left"));
	                        	this.eMBL = jGo.util.eN(this.MB.css("left"));
	                        	this.emBL = jGo.util.eN(this.mB.css("left"));
	                        	this.eCH = jGo.util.eN(this.cA.css("height"));
	                        	this.eWH = jGo.util.eN(this.frame.height());
	                        	this.frame.css({height:this.eWH});
					jGo.UI.EventHandler('mousemove','hmd' + this.id,jGo.UI,this,"onMouseMoveResizeBL");
					jGo.UI.EventHandler('mouseup','hmd' + this.id,jGo.UI,this,"onMouseUp");
	                        break;
	                        case RESIZE_BOTTOM_MIDDLE: 
					this.eCH = jGo.util.eN(this.cA.css("height"));
	                        	this.eWH = jGo.util.eN(this.frame.height());
	                        	this.frame.css({height:this.eWH});
	                        	jGo.UI.EventHandler('mousemove','hmd' + this.id,jGo.UI,this,"onMouseMoveResizeB");
					jGo.UI.EventHandler('mouseup','hmd' + this.id,jGo.UI,this,"onMouseUp");
	                        	break;
	                        case RESIZE_BOTTOM_RIGHT: 
					this.eCW = jGo.util.eN(this.cA.css("width"));
	                        	this.eWW = jGo.util.eN(this.frame.width());
	                        	this.frame.css({width:this.eWW});
	                        	this.eCBL = jGo.util.eN(this.cB.css("left"));
	                        	this.eMBL = jGo.util.eN(this.MB.css("left"));
	                        	this.emBL = jGo.util.eN(this.mB.css("left"));
	                        	this.eCH = jGo.util.eN(this.cA.css("height"));
	                        	this.eWH = jGo.util.eN(this.frame.height());
	                        	this.frame.css({height:this.eWH});
	                        	jGo.UI.EventHandler('mousemove','hmd' + this.id,jGo.UI,this,"onMouseMoveResizeBR");
					jGo.UI.EventHandler('mouseup','hmd' + this.id,jGo.UI,this,"onMouseUp");
	                        	break;
	                        default: 
	                    }
	                }
	                return false;
	            } else {
	                if (target_id != null && target_id.substring(0, CLICKABLE_ELEMENT_PREFIX.length) == CLICKABLE_ELEMENT_PREFIX) {
	                    var click_selector = target_id.substr(CLICKABLE_ELEMENT_PREFIX.length, CLICK_SELECTOR_LENGTH);
	                    var _id = target_id.substr(CLICKABLE_ELEMENT_PREFIX.length + CLICK_SELECTOR_LENGTH);
	                    if (this.enabled&&this.id==_id) {
	                        switch(click_selector) {
	                            case MINIMIZE: case ALTMINIMIZE: 
					this.onMinimize();
	                            	break;
	                            case RESTORE: case ALTRESTORE: 
					this.onRestore();
	                            	break;
	                            case MAXIMIZE: case ALTMAXIMIZE: 
					this.onMaximize();
	                            	break;
	                            case CLOSE: case ALTCLOSE: 
					this.close();
					this.destroy();
	                            	break;
	                            default: 
	                        }
	                    }
	                    document.body.focus();
	                    return false;
	                }
	            }
	        }
	};
	dwp.onMouseUp = function(e) {
	        if (this.dragElement != null) {
		    jGo.UI.removeHandler('mousemove','hmd' + this.id);
		    jGo.UI.removeHandler('mouseup','hmd' + this.id);
	            document.body.onselectstart = null;
		    document.body.onmousedown = null;
	            this.dragElement = null;
	            if (this.eDraggingWindow && this.shieldOnDrag) {
	                this.lowerDragShield();
	            }
	            this.eDraggingWindow = false;
	        }
	};
	dwp.onMouseMoveDrag = function(e) {
	        if ( ! this.eDraggingWindow) {
	            this.eDraggingWindow = true;
	            if (this.shieldOnDrag) {
	                this.raiseDragShield();
	            }
	        }
		this.moveWindow((this.eWL + e.clientX - this.eX), (this.eWT + e.clientY - this.eY));
	};
	dwp.onMouseMoveResizeR = function(e) {
	        this.resizeRight((e.clientX - this.eX), false);
	};
	
	dwp.onMouseMoveResizeL = function(e) {
	        this.resizeLeft((this.eX - e.clientX), false);
	};
	dwp.onMouseMoveResizeB = function(e) {
	        this.resizeBottom((e.clientY - this.eY), false);
	};
	dwp.onMouseMoveResizeBR = function(e) {
	        this.resizeBottomRight((e.clientX - this.eX), (e.clientY - this.eY), false);
	};
	dwp.onMouseMoveResizeBL = function(e) {
	        this.resizeBottomLeft((this.eX - e.clientX), (e.clientY - this.eY), false);
	};
	dwp.moveWindow = function(x, y) {
	    this.frame.css({left:x + "px"});
	    this.frame.css({top:y + "px"});
	    if (!this.shieldOnDrag) {
	    	this.cN.css({left:(parseInt(this.frame[0].style.left)+5)+'px',top:(parseInt(this.frame[0].style.top)+30)+'px'});
	    }
	};
	dwp.raiseDragShield = function() {
	    //this.cA.css({opacity:.5});
	    //this.cN.css({position:"absolute",top:"-3000px"});
		this.cN.css({left:"-3000px"});
	    //this.cN.css({visibility:"hidden"});
	    //this.cA.style.filter = 'alpha(opacity=' + 50 + ')';
	};
	dwp.lowerDragShield = function() {
	    //var max = this.maxOpacity;
	   // if(!jQuery.browser.msie&&max==1){
	//	max=.9999;
	   // }
	   // this.cA.css({opacity:max});
	    //this.cA.zoom = 1;
	   //this.cA.style.filter = 'alpha(opacity=' + 100 + ')';
	    //try {
	     // this.cA.style.removeAttribute("filter");
	    //}
	    //catch(err) {}
		//this.cN.css({"top":"30px"});
		this.cN.css({left:(parseInt(this.frame[0].style.left)+5)+'px',top:(parseInt(this.frame[0].style.top)+30)+'px'});
		
	    //this.cN.css({position:"static","top":"0px"});
	   //this.cN.css({visibility:"visible"});
	};
	dwp.resizeRight = function(offset, findDimensions) {
	    var dim;
	    if (findDimensions) {
	        //dim = this.dom.getDimensions(this.id, 'WINDOW_WIDTH', 'CLIENT_WIDTH', 'CLOSE_BUTTON_LEFT', 'MAXIMIZE_BUTTON_LEFT', 'MINIMIZE_BUTTON_LEFT');
	    } else {
	        dim = new Array();
	        dim.push(this.eWW);
	        dim.push(this.eCW);
	        dim.push(this.eCBL);
	        dim.push(this.eMBL);
	        dim.push(this.emBL);
	    }
	    if ((dim[0] + offset) < this.mW) {
	        offset = this.mW - dim[0];
	    } else {
	        if ((dim[0] + offset) > this.MW) {
	            offset = this.MW - dim[0];
	        }
	    }
	    this.frame.css({width:(dim[0] + offset) + 'px'});
	    this.t.css({width:(dim[0] + offset-117) + 'px'});
	    this.tC.css({width:(dim[0] + offset-100) + 'px'});
	    this.cN.css({width:(dim[1] + offset) + 'px'});
	    this.cA.css({width:(dim[1] + offset) + 'px'});
	    this.cB.css({left:(dim[2] + offset) + 'px'});
	    this.MB.css({left:(dim[3] + offset) + 'px'});
	    this.mB.css({left:(dim[4] + offset) + 'px'});
	};
	dwp.resizeLeft = function(offset, findDimensions) {
	    var dim;
	    if (findDimensions) {
	        //dim = this.dom.getDimensions(this.id, 'WINDOW_LEFT', 'WINDOW_WIDTH', 'CLIENT_WIDTH', 'CLOSE_BUTTON_LEFT', 'MAXIMIZE_BUTTON_LEFT', 'MINIMIZE_BUTTON_LEFT');
	    } else {
	        dim = new Array();
	        dim.push(this.eWL);
	        dim.push(this.eWW);
	        dim.push(this.eCW);
	        dim.push(this.eCBL);
	        dim.push(this.eMBL);
	        dim.push(this.emBL);
	    }
	    if (dim[1] + offset < this.mW) {
	        offset = this.mW - dim[1];
	    } else {
	        if (dim[1] + offset > this.MW) {
	            offset = this.MW - dim[1];
	        }
	    }
	    this.frame.css({left:(dim[0] - offset) + 'px'});
	    this.frame.css({width:(dim[1] + offset) + 'px'});
	    this.t.css({width:(dim[1] + offset-117) + 'px'});
	    this.tC.css({width:(dim[1] + offset-100) + 'px'});
	    this.cN.css({left:(dim[0] - offset+5) + 'px'});
	    this.cN.css({width:(dim[2] + offset) + 'px'});
	    this.cA.css({width:(dim[2] + offset) + 'px'});
	    this.cB.css({left:(dim[3] + offset) + 'px'});
	    this.MB.css({left:(dim[4] + offset) + 'px'});
	    this.mB.css({left:(dim[5] + offset) + 'px'});
	};
	dwp.resizeBottom = function(offset, findDimensions) {
	    var dim;
	    if (findDimensions) {
	        //dim = this.dom.getDimensions(this.id, 'WINDOW_HEIGHT', 'CLIENT_HEIGHT');
	    } else {
	        dim = new Array();
	        dim.push(this.eWH);
	        dim.push(this.eCH);
	    }
	    if (dim[0] + offset < this.mH) {
	        offset = this.mH - dim[0];
	    } else {
	        if (dim[0] + offset > this.MH) {
	            offset = this.MH - dim[0];
	        }
	    }
	    this.frame.css({height:(dim[0] + offset) + 'px'});
	    this.cN.css({height:(dim[1] + offset) + 'px'});
	    this.cA.css({height:(dim[1] + offset) + 'px'});
	};
	dwp.resizeBottomRight = function(offsetX, offsetY, findDimensions) {
	    this.resizeRight(offsetX, findDimensions);
	    this.resizeBottom(offsetY, findDimensions);
	};
	dwp.resizeBottomLeft = function(offsetX, offsetY, findDimensions) {
	    this.resizeLeft(offsetX, findDimensions);
	    this.resizeBottom(offsetY, findDimensions);
	};
	dwp.setWindowHeight = function(y) {
	    this.frame.css("height",y + "px");
	    this.cN.css("height",(y - 35) + "px");
	    this.cA.css("height",(y - 35) + "px");
	};
	dwp.setWindowWidth = function(x) {
	    var dim = new Array();
	    dim.push(null);
	    dim.push(null);
	    dim.push(jGo.util.eN(this.cB.css("left")));
	    dim.push(jGo.util.eN(this.MB.css("left")));
	    dim.push(jGo.util.eN(this.mB.css("left")));
	    var offset = x - jGo.util.eN(this.frame.css("width"));
	    this.frame.css("width",x + "px");
	    this.cN.css("width",(x - 10) + "px");
	    this.cA.css("width",(x - 10) + "px");
	    this.cB.css("left",(dim[2] + offset) + "px");
	    this.MB.css("left",(dim[3] + offset) + "px");
	    this.mB.css("left",(dim[4] + offset) + "px");
	    
	};
	
	dwp.onMinimize = function() {
		if(!this.lock){
			this.lock=true;
			var _t = this;
		    setTimeout(function() {_t.minimize()}, 50);
		    this.doc.trigger('mousedown');
		}
	};
	
	dwp.minimize = function() {
		if (this.state == 2){
			this.setWindowHeight(this.lH);
		    this.setWindowWidth(this.lW);
		    this.frame.css( {
				top :this.lT,left :this.lL
			});
			this.cN.css( {
				top :(jGo.util.eN(this.lT)+30) + 'px',left :(jGo.util.eN(this.lL)+5) + 'px'
			});
		    this.MB.attr("id","jGo_clickmx" + this.id);
		    this.MB.html("<a href='javascript:void(0)' title='"+this.max_label+"' id='jGo_clickb2" + this.id + "' class='jGo_maxwindow_default'>&nbsp;</a>");
	    }
	    if (this.resizable) {
	        var prefix = 'jGo_fix';
	        var elements = this.getBorderElements();
	        elements[3].setAttribute("id", prefix + "rl" + this.id);
	        elements[4].setAttribute("id", prefix + "rr" + this.id);
	        elements[5].setAttribute("id", prefix + "bl" + this.id);
	        elements[6].setAttribute("id", prefix + "bm" + this.id);
	        elements[7].setAttribute("id", prefix + "br" + this.id);
	        elements.css("cursor","default");
	    }
	    this.lW = this.frame.width();
	    this.lH = this.frame.height();
	    this.setWindowHeight(38);
	    this.mB.attr("id", "jGo_clickrs" + this.id);
	    this.mB.html("<a href='javascript:void(0)' title='"+this.restore_label+"' id='jGo_clickb0" + this.id + "' class='jGo_restorewindow_default'>&nbsp;</a>");
	    this.state = 0;
	    this.lock=false;
	};
	
	dwp.onMaximize = function() {
		if(!this.lock){
			this.lock=true;
			var _t = this;
		    setTimeout(function() {_t.maximize()}, 50);
		}
	};
	
	dwp.maximize = function() {
		var root = (document.body.scrollHeight>=document.documentElement.scrollHeight)?document.body:document.documentElement;
		if (this.state == 0) {
			this.setWindowHeight(this.lH);
		    this.setWindowWidth(this.lW);
		    this.mB.attr("id","jGo_clickmn" + this.id);
		    this.mB.html("<a href='javascript:void(0)' title='"+this.min_label+"' id='jGo_clickb1" + this.id + "' class='jGo_minwindow_default'>&nbsp;</a>");
	    }
	    if (this.resizable) {
	        var prefix = 'jGo_fix';
	        var elements = this.getBorderElements();
	        elements[3].setAttribute("id", prefix + "rl" + this.id);
	        elements[4].setAttribute("id", prefix + "rr" + this.id);
	        elements[5].setAttribute("id", prefix + "bl" + this.id);
	        elements[6].setAttribute("id", prefix + "bm" + this.id);
	        elements[7].setAttribute("id", prefix + "br" + this.id);
	        elements.css("cursor","default");
	    }
	    this.lW = this.frame.width();
	    this.lH = this.frame.height();
	    this.lT = this.frame.css("top");
	    this.lL = this.frame.css("left");
	    this.frame.css({top:root.scrollTop-20,left:root.scrollLeft});
	    this.cN.css({top:root.scrollTop+10,left:root.scrollLeft+5});
	    this.setWindowHeight(jGo.util.getSHeight()+20);
	    this.setWindowWidth(jGo.util.getSWidth());
	    this.MB.attr("id", "jGo_clickrs" + this.id);
	    this.MB.html("<a href='javascript:void(0)' title='"+this.restore_label+"' id='jGo_clickb0" + this.id + "' class='jGo_restorewindow_default'>&nbsp;</a>");
	    this.state = 2;
	    this.lock=false;
	};
	
	dwp.onRestore = function() {
		if(!this.lock){
			this.lock=true;
			var _t = this;
		    setTimeout(function() {_t.restore()}, 50);
		}
	};
	
	dwp.restore = function() {
	    if (this.resizable) {
	        var prefix = 'jGo_drag';
	        var elements = this.getBorderElements();
	        elements[3].setAttribute("id", prefix + "rl" + this.id);
	        elements[4].setAttribute("id", prefix + "rr" + this.id);
	        elements[5].setAttribute("id", prefix + "bl" + this.id);
	        elements[6].setAttribute("id", prefix + "bm" + this.id);
	        elements[7].setAttribute("id", prefix + "br" + this.id);
	        elements.css("cursor","");
	    }
	    this.setWindowHeight(this.lH);
	    this.setWindowWidth(this.lW);
	    if (this.state == 0) {
	        this.mB.attr("id","jGo_clickmn" + this.id);
	        this.mB.html("<a href='javascript:void(0)' title='"+this.min_label+"' id='jGo_clickb1" + this.id + "' class='jGo_minwindow_default'>&nbsp;</a>");
	    }else if (this.state == 2){
			this.frame.css( {
				top :this.lT,left :this.lL
			});
			this.cN.css( {
				top :(jGo.util.eN(this.lT)+30) + 'px',left :(jGo.util.eN(this.lL)+5) + 'px'
			});
	    	this.MB.attr("id","jGo_clickmx" + this.id);
	        this.MB.html("<a href='javascript:void(0)' title='"+this.max_label+"' id='jGo_clickb2" + this.id + "' class='jGo_maxwindow_default'>&nbsp;</a>");
	    }
	    this.state = 1;
	    this.lock=false;
	};
})();

// Class Initialization
jGo.UI.registerWidgetClass(jGo.DefaultWindow, 'DefaultWindow',
		'complex.windows');
jGo.UI.addToSelectableInterface(jGo.DefaultWindow);
jGo.scripts.onLoad('jGo.DefaultWindow.js');
