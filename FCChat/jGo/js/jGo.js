/*
 *jGo javascript-OS (work in progress)
 *Copyright (C) 2008 Robert Beach (www.fastcatsoftware.com)
 *
 */

/**
 * Creates a new jGo namespace
 * 
 */

var _jGo = window["jGo"], jGo = {};

/**
 * jGO.config -- configuration
 * 
 */

jGo.config = {
	version :1.0,
	path :FCChatConfig.dir + "jGo",
	z_index_base :1000
};

( function() {

	// jGo Private members

	// Aliases
	var assets = 'assets', events = 'events', eventHandlers = 'eventHandlers', widgets = 'widgets', type = 'type', path = 'path', simple = 'simple', elements = 'elements', complex = 'complex', enabled = 'enabled',

	// Application Environment
	OS = {
		// Members
		assets : {
			browser : {},
			scripts : {
				_class : {},
				external : {}
			},
			z_index_base :jGo.config.z_index_base
		},

		events : {
			enabled :true,
			onEvent : function(event) {
				if (_e.enabled && _e.eventManager('pre', event)) {
					var e = _e[eventHandlers][event.type];
					for ( var fn = e.length - 1; fn > 0; fn--) {
						if (event.data[0] == e[fn][1]) {
							e[fn][2].call(_e, event);
						}
					}
					e[0][2].call(_e, event);
					_e.eventManager('post', event)
				}
			},
			preHandlers : [],
			eventHandlers : {
				dblclick : [ [ 'default', null, function() {
					this.dispatchEvent.apply(this, arguments);
				} ] ],
				mousedown : [ [ 'default', null, function() {
					this.dispatchEvent.apply(this, arguments);
				} ] ],
				mousemove : [ [ 'default', null, function() {
					this.dispatchEvent.apply(this, arguments);
				} ] ],
				mouseup : [ [ 'default', null, function() {
					this.dispatchEvent.apply(this, arguments);
				} ] ],
				control : []
			},
			postHandlers : [],
			eventManager : function(action, event) {
				var e = _e[action + 'Handlers'];
				for ( var fn = e.length - 1; fn >= 0; fn--) {
					if (!e[fn][1].call(_e, event)) {
						return false;
					}
				}
				return true;
			},
			dispatchEvent : function() {
				var args = arguments;
				if (args[0].data) {
					var obj = args[0].data[0], fn = args[0].data[1];
					obj[fn].apply(obj, args);
				}
			}
		},

		widgets : {
			enabled :true,
			classes : {},
			type : {
				simple : {
					elements : {}
				},
				complex : {
					groups : {},
					windows : {
						MAX :50,
						enabled :true
					},
					controls : {
						enabled :true
					},
					dialogs : {
						enabled :true
					},
					menus : {
						enabled :true
					},
					buttons : {
						enabled :true
					}
				}
			}
		},

		interfaces : {
			selectable : {
				selectableElements :0,
				selectedObject :null,
				members : {},
				add : function(w) {
					if (OS.checkTemplate(w,
							[ 'isSelected', 'setZPos', 'getZPos', 'decZPos',
									'select', 'deselect', 'close' ],
							'selectable interface')) {
						_s.members[w.type] = {};
					}
				},
				onSelect : function(target) {
					var e = _s.selectHandlers;
					for ( var fn in e) {
						if(e.hasOwnProperty(fn)){
							e[fn][1].call(_s, target);
						}
					}
				},
				onClose : function(target) {
					var e = _s.closeHandlers;
					for ( var fn in e) {
						if(e.hasOwnProperty(fn)){
							e[fn][1].call(_s, target);
						}
					}
				},
				selectHandlers : [ [
						'default',
						function(target) {
							if (_s.selectedObject != null) {
								_s.selectedObject.deselect();
								_s.selectedObject.isSelected = false;
							}
							for ( var n in _s.members) {
								if(_s.members.hasOwnProperty(n)){
									for ( var ent in _w.classes[n][path][n]) {
										if(_w.classes[n][path][n].hasOwnProperty(ent)){
											if (Number(_w.classes[n][path][n][ent]
													.getZPos()) > Number(target
													.getZPos())) {
												_w.classes[n][path][n][ent].decZPos();
											}
										}
									}
								}
							}
							target.setZPos(_en.z_index_base
									+ 2*_s.selectableElements);
							target.isSelected = true;
							_s.selectedObject = target;
						} ] ],
				closeHandlers : [ [
						'default',
						function(target) {
							_s.selectableElements--;
							if (target.isSelected == true) {
								_s.selectedObject = null;
							}
							for( var n in _s.members){
								if(_s.members.hasOwnProperty(n)){
									for ( var ent in _w.classes[n][path][n]) {
										if(_w.classes[n][path][n].hasOwnProperty(ent)){
											if (Number(_w.classes[n][path][n][ent]
													.getZPos()) > Number(target
													.getZPos())) {
												_w.classes[n][path][n][ent].decZPos();
											}
										}
									}
								}
							}
						} ] ]
			}
		},

		// Methods
		checkTemplate : function(w, template, group) {
			for (ent in template) {
				if(template.hasOwnProperty(ent)){
					if (!(template[ent] in w)) {
						throw Error("Cannot be added to " + group
								+ ". Class must implement the " + template[ent]
								+ " property.");
						return false;
					}
				}
			}
			return true;
		}

	},

	// Shortcuts
	_en = OS[assets], _w = OS[widgets], _e = OS[events], _s = OS.interfaces.selectable;

	/**
	 * core objects
	 * 
	 */

	// UI
	( function() {

		// Inject array attributes
		var arrayAttributes = {
			length :0,
			set : function(elem) {
				return Array.prototype.push.call(this, elem);
			}
		},

		// Event capture
		capture = {
			dblclick :true,
			mouseup :true,
			mousedown :true,
			mousemove :true
		};

		jGo.UI = {

			path :jGo.config.path || "/jGo",

			makeEnumerable : function(w) {
				jGo.$.extend(w, arrayAttributes);
			},

			// Events
			ondoubleclick : function(e) {
			},
			onmousedown : function(e) {
			},
			onmouseup : function(e) {
			},
			onmousemove : function(e) {
			},

			// Aplication Interface

			EventHandler : function(type, name, scope, obj, method) {
				var e = _e[eventHandlers][type];
				for ( var fn in e) {
					if(e.hasOwnProperty(fn)){
						if (e[fn][0] == name) {
							return false;
						}
					}
				}
				if (!capture[type]) {
					jGo.$(document).eventHandler(type, J, 'on' + type);
				}
				e.splice(e.length, 0, [ name, scope,
						jGo.util.bind(obj, obj[method]) ]);
			},

			removeHandler : function(type, name) {
				var e = _e[eventHandlers][type];
				for ( var fn in e) {
					if(e.hasOwnProperty(fn)){
						if (e[fn][0] == name) {
							e.splice(fn, 1);
						}
					}
				}
			},

			enableEvents : function(en) {
				_e[enabled] = en;
			},

			get : function(e, id) {
				if (e == 'widget') {
					return _w[id]
				} else if (e == 'element') {
					return _w[type][simple][element][id]
				} else {
					return _w[type][complex][e][id]
				}
			},

			set : function(e, widget) {
				if (e == 'widget') {
					return _w.set(widget)
				} else if (e == 'element') {
					return _w[type][simple][element].set(widget)
				} else {
					return _w[type][complex][e].set(widget)
				}
			},

			registerWidgetClass : function(classType, name, classpath) {
				var w = new classType();
				if (OS.checkTemplate(w, [ 'id', 'type', 'enabled', 'create',
						'destroy' ], 'widget')) {
					var pathArray = classpath.split('.');
					var obj = _w[type];
					for (ent in pathArray) {
						if(pathArray.hasOwnProperty(ent)){
							obj = obj[pathArray[ent]];
						}
					}
					obj[name] = [];
					_w.classes[name] = {};
					_w.classes[name].path = obj;
					_w.classes[name].classType = classType;
				}
			},

			isRegistered : function(name1) {
				return (_w.classes[name1] != null);
			},

			addToSelectableInterface : function(classType) {
				var w = new classType();
				_s.add(w);
			},
			
			getNextId : function(n) {
				var id = 0;
				while (true) {
					if (_w.classes[n][path][n][id] == null) {
						break;
					}
					id++;
				}
				return id;
			},
			
			createWidget : function(n, params) {
				var id = jGo.UI.getNextId(n);
				var w;
				if (id > _w.classes[n][path][n].MAX) {
					return null;
				} else {
					w = new _w.classes[n].classType();
					_w.classes[n][path][n][id] = w;
					w.create(id, params);
					if (w.type in _s.members) {
						if(_s.members.hasOwnProperty(w.type)){
							_s.selectableElements++;
							w.setZPos(_en.z_index_base + 2*_s.selectableElements);
							var fn = w.select;
							w.select = ( function(obj, fn) {
								return function() {
									_s.onSelect(obj);
									fn.apply(obj, arguments);
								};
							})(w, fn);
							w.select();
							fn = w.close;
							w.close = ( function(obj, fn) {
								return function() {
									_s.onClose(obj);
									fn.apply(obj, arguments);
								};
							})(w, fn);
						}
					}

					w.destroy = function() {
						jGo.UI.destroyWidget(this);
					};
				}
				return w;
			},

			destroyWidget : function(w) {
				if (w.type in _s.members) {
					if(_s.members.hasOwnProperty(w.type)){
						_s.selectableElements--;
					}
				}
				delete _w.classes[w.type][path][w.type][w.id];
			},

			classesLoaded :false,

			setClassesLoaded : function() {
				J.classesLoaded = true;
			},

			// Initialization
			init : function() {
				var doc = jGo.$(document);
				doc.eventHandler('dblclick', this, 'ondoubleclick');
				doc.eventHandler('mousedown', this, 'onmousedown');
				doc.eventHandler('mouseup', this, 'onmouseup');
				doc.eventHandler('mousemove', this, 'onmousemove');
			}
		}
	})();

	// jQuery

	jGo.$ = jQuery.noConflict(true);

	jGo.$.fn
			.extend( {
				_moveLeftRight : function(x) {
					// will only move if the elements position is set to
					// absolute or relative.
					return this.each( function() {
						this.style.left = x + "px";
					});
				},
				eventHandler : function() {
					if (this[0] == document
							&& (arguments[0] != jGo.UI && arguments[1] != jGo.UI)) {
						throw Error('Do not use eventHandler to bind events to the document object, use jGo.UI.EventHandler');
					}
					var args = Array.prototype.slice.call(arguments);
					var type = (typeof args[1] == 'string') ? args.splice(0, 1,
							this) : args.splice(0, 1);
					type = type.toString();
					return this.bind(type, args, OS.events.onEvent);
				},
				removeEventHandler : function(type) {
					return this.unbind(type, OS.events.onEvent);
				},
				uncheck : function() {
					return this.each( function() {
						this.checked = false;
					});
				}
			});

	// util

	( function() {
		jGo.util = {
			eN : function(value) {
				var n = parseInt(value);
				return (n == null || isNaN(n) ? 0 : n);
			},
			getSHeight : function() {
				var b = document.body, d = document.documentElement;
				var mH = 0;
				if (typeof (window.innerWidth) == 'number') {
					mH = window.innerHeight;
				} else if (d && (d.clientWidth || d.clientHeight)) {
					mH = d.clientHeight;
				} else if (b && (b.clientWidth || b.clientHeight)) {
					mH = b.clientHeight;
				}
				return mH;
			},
			getSWidth : function() {
				var b = document.body, d = document.documentElement;
				var mW = 0;
				if (typeof (window.innerWidth) == 'number') {
					mW = window.innerWidth;
				} else if (d && (d.clientWidth || d.clientHeight)) {
					mW = d.clientWidth;
				} else if (b && (b.clientWidth || b.clientHeight)) {
					mW = b.clientWidth;
				}
				return mW;
			},
			bind : function(obj, method) {
				return function() {
					return method.apply(obj, arguments);
				};
			}
		};
	})();

	// event

	jGo.event = {
		addLoadListener : function(fn) {
			if (typeof window.addEventListener != 'undefined') {
				window.addEventListener('load', fn, false);
			} else if (typeof document.addEventListener != 'undefined') {
				document.addEventListener('load', fn, false);
			} else if (typeof window.attachEvent != 'undefined') {
				window.attachEvent('onload', fn);
			} else {
				var oldfn = window.onload;
				if (typeof window.onload != 'function') {
					window.onload = fn;
				} else {
					window.onload = function() {
						oldfn();
						fn();
					};
				}
			}
		}
	};

	// scripts

	jGo.scripts = {
		load : function(path, name, mode, obj, callback, data, writemode) {
			if (!OS.assets.scripts.external[name]) {
				OS.assets.scripts.external[name] = {
					fns :[{obj:obj,fn:callback,data:data}]
				};
				if(!writemode){
					this.loadScript(path + name, mode);
				}
			}
		},
		importClass : function(name, mode, obj, callback, data, writemode) {
			if (!OS.assets.scripts._class[name]) {
				var url = jGo.UI.path + "/js/" + name;
				OS.assets.scripts._class[name] = {
					fns :[{obj:obj,fn:callback,data:data}]
				};
				if(!writemode){
					this.loadScript(url, mode);
				}
			}
		},
		loadScript : function(url, mode) {
			if (mode == 'static')
				document.write("<script type='text/javaScript' src='" + url
						+ "'></script>");
			if (mode == 'dynamic') {
				var headID = document.getElementsByTagName("head")[0];
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = url;
				headID.appendChild(newScript);
			}
		},
		onLoad : function(name, type) {
			var s = (type && type == "external") ? OS.assets.scripts.external[name]
					: OS.assets.scripts._class[name];
			if (s){
				s.loaded = 1;
				for (x in s.fns){
					if(s.fns.hasOwnProperty(x)){
						if(s.fns[x].fn){
							s.fns[x].fn.call(s.fns[x].obj,s.fns[x].data);
						}
					}
				}
				if(type && type == "external"){
					OS.assets.scripts.external[name].fns = [];
				}else{
					OS.assets.scripts._class[name].fns = [];
				}
			}
		},
		loadState : function(name, type) {
			var s = (type && type == "external") ? OS.assets.scripts.external[name]
					: OS.assets.scripts._class[name];
			if (!s)
				return "not.loaded";
			if (!s.loaded)
				return "load.called";
			return "loaded";
		},
		addCallback : function(name, type, obj, callback, data){
			var s = (type && type == "external") ? OS.assets.scripts.external[name]
					: OS.assets.scripts._class[name];
			s.fns.push({obj:obj,fn:callback,data:data});
		}
	};

	// flash

	jGo.flash = {
		getFlash : function(name) {
			if (navigator.appName.indexOf("Microsoft") > -1) {
				return window[name + 'Object'];
			} else if (document.getElementById) {
				return document.getElementById(name + 'Embed');
			} else {
				return null;
			}
		},
		writeFlash : function(name, id, w, h, base, bgcolor, wmode, flashvars) {
			if (!w)
				w = '100%';
			if (!h)
				h = '100%';
			if (!base)
				base = '';
			if (!bgcolor)
				bgcolor = '#ffffff';
			if (!flashvars)
				flashvars = '';
			return ('<object '
					+ 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '
					+ 'codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" '
					+ 'width="'
					+ w
					+ '" height="'
					+ h
					+ '" '
					+ 'id="'
					+ name
					+ id
					+ 'Object"> '
					+ '<param name="allowFullScreen" value="true" />'
					+ '<param name="allowScriptAccess" value="always" /> '
					+ '<param name="base" value="'
					+ base
					+ '." /> '
					+ '<param name="align" value="left" /> '
					+ '<param name="movie" value="'
					+ base
					+ name
					+ '.swf" /> '
					+ '<param name="wmode" value="'
					+ wmode
					+ '" /> '
					+ '<param name="flashvars" value="'
					+ flashvars
					+ '" /> '
					+ '<param name="quality" value="high" /> '
					+ '<param name="bgcolor" value="'
					+ bgcolor
					+ '" /> '
					+ '<param name="scale" value="showAll" /> '
					+ '<embed '
					+ 'id="'
					+ name
					+ id
					+ 'Embed"'
					+ 'src="'
					+ base
					+ name
					+ '.swf" allowFullScreen="true" '
					+ 'quality="high" '
					+ 'bgcolor="'
					+ bgcolor
					+ '" '
					+ 'wmode="'
					+ wmode
					+ '" '
					+ 'flashvars="'
					+ flashvars
					+ '" '
					+ 'width="'
					+ w
					+ '" height="'
					+ h
					+ '" '
					+ 'align="left" '
					+ 'base="'
					+ base
					+ '." '
					+ 'scale="showAll" '
					+ 'allowScriptAccess="always" '
					+ 'type="application/x-shockwave-flash" swLiveConnect="true"'
					+ 'pluginspage="http://www.macromedia.com/go/getflashplayer" /> ' + '</object>');
		}
	};

})();

/*
 * Abstract Widget Classes
 */

jGo.Widget = function() {
	this.id = 0;
	this.type = 'Widget';
	this.enabled = true;
	this.state = 1;
	this.frame = null;
	this.propertyNotFound = "Method not found.";
	this.getDefault = function() {
		return jGo.Widget.prototype;
	};
	this.err = function() {
		alert("Method not found.");
	};
};

jGo.Window = function() {
	jGo.Widget.apply(this, arguments);
	this.resizable = false;
	this.isSelected = false;
	this.getDefault = function() {
		return jGo.Window.prototype;
	};
};

jGo.Window.prototype = new jGo.Widget();

jGo.Menu = function() {
	jGo.Widget.apply(this, arguments);
	this.isSelected = false;
	this.getDefault = function() {
		return jGo.Window.prototype;
	};
};

jGo.Menu.prototype = new jGo.Widget();

/*
 * Clean up
 */

if (!window.jQuery)
	window.jQuery = jGo.$;
if (!window.$)
	window.$ = jGo.$;
if (!_jGo || _jgo.config.version < jGo.config.version) {
	jGo.UI.init();
} else {
	jGo = _jGo;
}