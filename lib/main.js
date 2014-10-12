// // "use strict";

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
// var tabs_utils = require("sdk/tabs/utils");
var windows = require("sdk/windows").browserWindows;
var _ = require("sdk/l10n").get;

// var { Ci } = require('chrome');
var utils = require('sdk/window/utils');

var mini = buttons.ActionButton({
  id: "kde-boton-mini",
  label: _("mini_id"),
  icon:"./mini.png",
  onClick: minimiza
});
var maxi = buttons.ActionButton({
  id: "kde-boton-maxi",
  label: _("maxi_id"),
  icon:"./maxi.png",
  onClick: maximiza
});
var cierra = buttons.ActionButton({
  id: "kde-boton-cierra",
  label: _("cierra_id"),
  icon:"./close.png",
  onClick: cerrar
});

// var toolbar = Toolbar({
//   title: "Player",
//   items: [button, button2,]
// });


// const widgets = require("sdk/widget");
// const data = require("sdk/self").data;
// 
// var player = widgets.Widget({
//   id: "player",
//   width: 17,
//   label: "Player",
//   contentURL: data.url("ut.html"),
// });




function cerrar(){
  windows.activeWindow.close();
//   utils.getFocusedWindow().moveTo(0,0);//esto lo debería implimentar para mover la ventana
}

function minimiza(){
  if (utils.isXULBrowser(utils.getFocusedWindow())){
    utils.getFocusedWindow().minimize();
  }else{
    utils.getMostRecentBrowserWindow().minimize();
  }
  
}
function maximiza(state) {

  if (utils.isXULBrowser(utils.getFocusedWindow())){
    //console.log("xul");
    //Primero cambio la ventana
    if(utils.getFocusedWindow().windowState==1){
      utils.getFocusedWindow().restore();
    }else{
      utils.getFocusedWindow().maximize();
    }
    //Luego cambio el icono (de manera de estar seguro que la ventana cambio
//     if(utils.getFocusedWindow().windowState==1){
// //       maxi["icon"]="./restore.png"
//       maxi.state("window", {"icon" : "./restore.png"});
//     }else{
// //       maxi["icon"]="./maxi.png"
//       maxi.state("window", {"icon" : "./maxi.png"});
//     }
  }  else{//Al parecer esto es necesario para que funcione con ventanas especiales
    //console.log("No xul");
    if(utils.getMostRecentBrowserWindow().windowState==1){
      utils.getMostRecentBrowserWindow().restore();
    }else{
      utils.getMostRecentBrowserWindow().maximize();
    }
//     if(utils.getMostRecentBrowserWindow().windowState==1){
// //       maxi["icon"]="./restore.png"
//       maxi.state("window", {"icon" : "./restore.png"});
//     }else{
// //       maxi["icon"]="./maxi.png"
//       maxi.state("window", {"icon" : "./maxi.png"});
//     }
  }

//   console.log("button  was clicked");
}


// var {Cu} = require('chrome');
// Cu.import('resource://gre/modules/Services.jsm');

function eventualizador(){
// 	var aDOMWindow = utils.getFocusedWindow();
	var aDOMWindow = utils.getMostRecentBrowserWindow();
	aDOMWindow.addEventListener('mouseover', isin);
	aDOMWindow.addEventListener('mouseout', isout);
	aDOMWindow.addEventListener("sizemodechange",maxi_boton);
	
	var re_mini = /action-button.*kde-boton-mini/;
	var re_maxi = /action-button.*kde-boton-maxi/;
	var re_cierra = /action-button.*kde-boton-cierra/;	
	
	function isin(event) {
	//   var node = event.explicitOriginalTarget;
	  var node = event.target;
	  if(re_mini.test(node["id"])){
	    mini.state(aDOMWindow, {"icon" : "./mini-hover.png"});
	  }
	  if(re_cierra.test(node["id"])){
	    cierra.state(aDOMWindow, {"icon" : "./close-hover.png"});
	  }
	  if(re_maxi.test(node["id"])){
	    if (utils.isXULBrowser(aDOMWindow)){
	      if(aDOMWindow.windowState==1){
		maxi.state(aDOMWindow, {"icon" : "./restore-hover.png"});
	      }else{
		maxi.state(aDOMWindow, {"icon" : "./maxi-hover.png"});
	      }
	    }else{
	      if(aDOMWindow.windowState==1){
		maxi.state(aDOMWindow, {"icon" : "./restore-hover.png"});
	      }else{
		maxi.state(aDOMWindow, {"icon" : "./maxi-hover.png"});
	      }
	    }
	  }
	}
	
	function isout(event) {
	  var node = event.target;
	  if(re_mini.test(node["id"])){
	    mini.state(aDOMWindow, {"icon" : "./mini.png"});
	  }
	  if(re_cierra.test(node["id"])){
	    cierra.state(aDOMWindow, {"icon" : "./close.png"});
	  }
	  if(re_maxi.test(node["id"])){
	    if (utils.isXULBrowser(aDOMWindow)){
	      if(aDOMWindow.windowState==1){
		maxi.state(aDOMWindow, {"icon" : "./restore.png"});
	      }else{
		maxi.state(aDOMWindow, {"icon" : "./maxi.png"});
	      }
	    }else{
	      if(aDOMWindow.windowState==1){
		maxi.state(aDOMWindow, {"icon" : "./restore.png"});
	      }else{
		maxi.state(aDOMWindow, {"icon" : "./maxi.png"});
	      }
	    }
	  }
	}
	
	function maxi_boton(event){
	    if (utils.isXULBrowser(aDOMWindow)){
	      if(aDOMWindow.windowState==1){
		maxi.state(aDOMWindow, {"icon" : "./restore.png"});
	      }else{
		maxi.state(aDOMWindow, {"icon" : "./maxi.png"});
	      }
	    }else{
	      if(aDOMWindow.windowState==1){
		maxi.state(aDOMWindow, {"icon" : "./restore.png"});
	      }else{
		maxi.state(aDOMWindow, {"icon" : "./maxi.png"});
	      }
	    }	
	}
}

eventualizador();
windows.on("open",eventualizador);

