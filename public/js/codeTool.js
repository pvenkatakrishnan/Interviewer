'use strict';

var editorCall	= function (event, callback) {
	var iframeWin	= document.getElementById("editor").contentWindow;
	// if a callback is present, install it now
	if (callback) {
		event.userdata = event.userdata || {};
		event.userdata.callback	= "editorCall-" + Math.floor(Math.random() * 99999).toString(36);
		window[event.userdata.callback] = function (data) {
			callback(data);
		};
	}
	// post the message
	iframeWin.postMessage(JSON.stringify(event), "*");
};
window.addEventListener("message", function (event) {
	console.log("event.data", event.data);
	var data = JSON.parse(event.data);
	// notify the callback if specified
	if( 'userdata' in data && 'callback' in data.userdata ){
		console.log("notify callback to", data.userdata.callback, "with", data)
		window[data.userdata.callback](data);
		window[data.userdata.callback]	= undefined;
	}
});
		
var doSetTabSize	= function(){
	editorCall({
		type	: "setTabSize",
		data	: {
			size: 8
		}
	}, function(data){
		alert("replied"+JSON.stringify(data, null, '\t'));
	});			
}
var doSetValue	= function(value){
	editorCall({
		type	: "setValue",
		data	: {
			text: value
		}
	}, function(data){
		//alert("replied"+JSON.stringify(data, null, '\t'));
	});
}
var doGetValue	= function(callback){
	editorCall({
		type	: "getValue",
	}, function (data){
		callback(data.data.data);
		//alert("replied"+JSON.stringify(data, null, '\t'));
	});
}