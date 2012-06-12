/*
*DefaultWindow Class
*/


(function() {

    //Constants

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

var dwp = jGo.DefaultWindow.prototype;

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

//Class Initialization
jGo.scripts.onLoad('jGo.DefaultWindow.ext.js');