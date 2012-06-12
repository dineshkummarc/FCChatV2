jGo.cookie = {


	setCookie : function(name, value, expires, path, domain) {
		document.cookie = name + "=" + escape(value)
			+ ((expires == null) ? "" : "; expires=" + expires.toGMTString())
			+ ((path == null) ? "" : "; path=" + path)
			+ ((domain == null) ? "" : "; domain=" + domain);
	},

	setCookiePath : function(name, value, expires, path, domain) {
		document.cookie = name + "=" + getCookie(name)
			+ ((expires == null) ? "" : "; expires=" + expires.toGMTString())
			+ ((path == null) ? "" : "; path=" + path)
			+ ((domain == null) ? "" : "; domain=" + domain);
	},

	getCookie : function(name) {
		var dcookie = document.cookie;
		var cname = name + "=";
		var clen = dcookie.length;
		var cbegin = 0;
		while (cbegin < clen) {
			var vbegin = cbegin + cname.length;
			if (dcookie.substring(cbegin, vbegin) == cname) {
				var vend = dcookie.indexOf(";", vbegin);
				if (vend == -1)vend = clen;
				return unescape(dcookie.substring(vbegin, vend));
			}
			cbegin = dcookie.indexOf(" ", cbegin) + 1;
			if (cbegin == 0)break;
		}
		return null;
	}
}
//Class Initialization
if(jGo.scripts)jGo.scripts.onLoad('jGo.cookie.js');


