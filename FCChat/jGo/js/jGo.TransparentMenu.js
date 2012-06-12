/*
*TransparentMenu Class
*/


(function() {

var $ = jGo.$;

jGo.TransparentMenu = function() {
    jGo.Window.apply(this, arguments);
    this.type = 'TransparentMenu';

    this.eventsEnabled = true;
    this.isOpen = false;
    this.noHide=false;

    this.ghost;
    this.parent;
    this.target;
    this.frame;

    this.style;
    
    this.getDefault = function() {
        return jGo.TransparentMenu.prototype;
    };

    this.err = function() {
        alert("Method not found.");
    };
};

jGo.TransparentMenu.prototype = new jGo.Menu();

var TMp = jGo.TransparentMenu.prototype;

TMp.create = function(id, p){
	var s = this.style = $.extend({},p[0]);
	var left = s.left || (p[3].offset().left+p[3].width()+s.offsetLeft-(p[4][0]===document.body?'0':jGo.util.eN(p[4].offset().left)));
	var top = s.top || (p[3].offset().top+s.offsetTop-(p[4][0]===document.body?'0':jGo.util.eN(p[4].offset().top)));
	this.target=p[3];
    this.parent=p[4];
	var forecolor = (s.opacity==1)?s.color:'transparent';
	var innerClass = (s.shadow)?'jGo_inner':'';
	var outerClass = (s.shadow)?'jGo_app jGo_myapp jGo_ydsf':'';
	var bkURL = (s.backgroundImage)?";background-image:url(" + s.backgroundImage + ")":"";
	var bkURL2 = (s.opacity==1)?bkURL:'';
	var content1 =p[1]+"</div></td></tr></table>";
	var content2 =(p[2]||p[1])+"</div></td></tr></table>";
	var html="<table id ='jGo_transmenuG_table"+id+"' class='"+innerClass+"' style='width:"+s.width+"px;border:"+s.border+";background-color:"+s.color+bkURL+"'><tr><td class='jGo_td' style='"+s.fontStyles+";padding:"+s.padding+";margin:"+s.margin+"'><div style='display:block;position:relative;visibility:hidden'>"+content2;
	var html2="<table class='"+innerClass+"' style='width:"+s.width+"px;border:"+s.border+";background-color:"+forecolor+bkURL2+"'><tr><td style='"+s.fontStyles+";padding:"+s.padding+";margin:"+s.margin+"'><div style='display:block;position:relative;overflow:hidden;'>"+content1;
	this.ghost=$(document.createElement('div')).addClass(outerClass).attr('id', 'jGo_transmenuG' + id).css({position:'absolute',width:s.width+'px',top:top+'px',left:left+'px','z-index':jGo.config.z_index_base+100}).html(html);
	this.frame=$(document.createElement('div')).addClass(outerClass).attr('id', 'jGo_transmenuF' + id).css({position:'absolute',width:s.width+'px',top:top+'px',left:left+'px','z-index':(jGo.config.z_index_base+101)}).html(html2);
	this.parent.append(this.ghost);
	$("#jGo_transmenuG_table"+id).css({opacity:s.opacity});
	$("#jGo_transmenuG_table"+id).contents().each(TMp.changeGhostIds);
	this.parent.append(this.frame);
	this.target.eventHandler('mousedown', this, 'onMouseDown', '');
	this.frame.eventHandler('mousedown', this, 'onMouseDown', '');
	this.id=id;
	this.show();
};
TMp.changeGhostIds = function(i){
	if(this.getAttribute&&this.getAttribute('id')!=null){
		this.removeAttribute('id');
	}
	$(this).contents().each(TMp.changeGhostIds);
};
TMp.onMouseDown = function(e){
	this.noHide=true;
};
TMp.mouseOff = function(e){
	var root = (document.body.scrollHeight>=document.documentElement.scrollHeight)?document.body:document.documentElement;
	var scroll = (root.scrollLeft)?root.scrollLeft:0;
	if((scroll+root.clientWidth)>e.pageX||root.clientWidth==0){
		if(!this.noHide)this.hide();
		this.noHide=false;
	}
};
TMp.show = function() {
	var s = this.style,
 	t = this.target,
	p = this.parent;
   	jGo.UI.EventHandler('mousedown','transmenu'+this.id,jGo.UI,this,'mouseOff');
	$([this.frame[0],this.ghost[0]]).css({top:s.top || (t.offset().top+s.offsetTop-(p[0]===document.body?'0':jGo.util.eN(p.offset().top))),left:s.left || (t.offset().left+t.width()+s.offsetLeft-(p[0]===document.body?'0':jGo.util.eN(p.offset().left)))});
   	this.ghost.css("display","block");
   	this.frame.css("display","block");
   	this.isOpen=true;
	this.noHide=false;
};
TMp.hide = function() {
    	jGo.UI.removeHandler('mousedown','transmenu'+this.id);
    	this.frame.css("display","none");
    	this.ghost.css("display","none");
	this.isOpen=false;
};
TMp.close = function() {
    	this.ghost.empty();
    	this.frame.empty();
	this.ghost.remove();
	this.frame.remove();
	this.target.removeEventHandler('mousedown');
    	jGo.UI.removeHandler('mousedown','transmenu'+this.id);
	this.isOpen=false;
    	return true;
};
TMp.destroy=function(){return false;}
})();

//Class Initialization
jGo.UI.registerWidgetClass(jGo.TransparentMenu,'TransparentMenu','complex.windows');
jGo.scripts.onLoad('jGo.TransparentMenu.js');