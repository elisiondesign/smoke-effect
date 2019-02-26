parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"bagd":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function a(e,a,i){return a&&t(e.prototype,a),i&&t(e,i),e}function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var n=function(){function t(a,n){var r=this;e(this,t),i(this,"opacities",[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,3,5,5,7,4,4,1,1,0,1,0,0,0,0,0,1,0,0,17,27,41,52,56,34,23,15,11,4,9,5,1,0,0,0,0,0,0,1,45,63,57,45,78,66,52,41,34,37,23,20,0,1,0,0,0,0,1,43,62,66,64,67,115,112,114,56,58,47,33,18,12,10,0,0,0,0,39,50,63,76,87,107,105,112,128,104,69,64,29,18,21,15,0,0,0,7,42,52,85,91,103,126,153,128,124,82,57,52,52,24,1,0,0,0,2,17,41,67,84,100,122,136,159,127,78,69,60,50,47,25,7,1,0,0,0,34,33,66,82,113,138,149,168,175,82,142,133,70,62,41,25,6,0,0,0,18,39,55,113,111,137,141,139,141,128,102,130,90,96,65,37,0,0,0,2,15,27,71,104,129,129,158,140,154,146,150,131,92,100,67,26,3,0,0,0,0,46,73,104,124,145,135,122,107,120,122,101,98,96,35,38,7,2,0,0,0,50,58,91,124,127,139,118,121,177,156,88,90,88,28,43,3,0,0,0,0,30,62,68,91,83,117,89,139,139,99,105,77,32,1,1,0,0,0,0,0,16,21,8,45,101,125,118,87,110,86,64,39,0,0,0,0,0,0,0,0,0,1,28,79,79,117,122,88,84,54,46,11,0,0,0,0,0,0,0,0,0,1,0,6,55,61,68,71,30,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,23,25,20,12,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,12,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,0,0,0,0,0,0,0,0]),i(this,"smokeSpriteSize",20),i(this,"particles",[]),i(this,"running",!1),i(this,"smokeParticleImage",null),i(this,"lastframe",null),i(this,"preDrawCallback",function(){}),i(this,"context",null),i(this,"polyfillAnimFrame",window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame),i(this,"frame",function(e){if(r.running){var t=e-r.lastframe;r.lastframe=e,r.updateAndDrawParticles(t),r.polyfillAnimFrame.call(window,r.frame)}}),i(this,"addSmoke",this.addParticles),this.context=a,this.smokeParticleImage=this.makeSmokeSprite(n),this.lastframe=performance.now()}return a(t,[{key:"floatInRange",value:function(e,t){return e+Math.random()*(t-e)}},{key:"makeSmokeSprite",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[24,46.8,48.2],t=document.createElement("canvas"),a=t.getContext("2d"),i=a.createImageData(this.smokeSpriteSize,this.smokeSpriteSize),n=i.data,r=0;r<n.length;r+=4)n[r]=e[0],n[r+1]=e[1],n[r+2]=e[2],n[r+3]=this.opacities[r/4];return t.width=this.smokeSpriteSize,t.height=this.smokeSpriteSize,a.putImageData(i,0,0),t}},{key:"createParticle",value:function(e,t,a){a=a||{};var i={x:e,y:t,vx:this.floatInRange(a.minVx||-.08,a.maxVx||.08),startvy:this.floatInRange(a.minVy||-.4,a.maxVy||.1),scale:this.floatInRange(a.minScale||0,a.maxScale||.5),lifetime:this.floatInRange(a.minLifetime||2e3,a.maxLifetime||8e3),age:0};return i.finalScale=this.floatInRange(a.minScale||25+i.scale,a.maxScale||30+i.scale),i.vy=i.startvy,i}},{key:"updateParticle",value:function(e,t){e.x+=e.vx*t,e.y+=e.vy*t;var a=Math.sqrt(e.age/e.lifetime);e.vy=(1-a)*e.startvy,e.age+=t,e.scale=a*e.finalScale}},{key:"drawParticle",value:function(e,t){this.context.globalAlpha=(1-Math.abs(1-2*e.age/e.lifetime))/8;var a=e.scale*this.smokeSpriteSize/2,i=e.x-a,n=i+3*a,r=e.y-a,s=r+2*a;this.context.drawImage(t,i,r,n-i,s-r)}},{key:"addParticles",value:function(e,t,a,i){if((a=a||10)<1)return Math.random()<=a&&this.particles.push(this.createParticle(e,t,i));for(var n=0;n<a;n++)this.particles.push(this.createParticle(e,t,i))}},{key:"updateAndDrawParticles",value:function(e){var t=this;this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height),this.particles.forEach(function(a){t.updateParticle(a,e)}),this.particles=this.particles.filter(function(e){return e.age<e.lifetime}),this.preDrawCallback(e,this.particles),this.particles.forEach(function(e){t.drawParticle(e,t.smokeParticleImage,t.context)})}},{key:"setPreDrawCallback",value:function(e){this.preDrawCallback=e}},{key:"step",value:function(e){e=e||16,this.updateAndDrawParticles(e)}},{key:"start",value:function(){this.running=!0,this.lastframe=performance.now(),this.polyfillAnimFrame.call(window,this.frame)}},{key:"stop",value:function(){this.running=!1}}]),t}();exports.default=n;
},{}]},{},["bagd"], null)
//# sourceMappingURL=/smoke.map