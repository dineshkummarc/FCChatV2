/*
 *DefaultWindow Class
 */

( function() {

	// Constants
	var $ = jGo.$;

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
})();

// Class Initialization
jGo.UI.registerWidgetClass(jGo.DefaultWindow, 'DefaultWindow',
		'complex.windows');
jGo.UI.addToSelectableInterface(jGo.DefaultWindow);
jGo.scripts.onLoad('jGo.DefaultWindow.init.js');
