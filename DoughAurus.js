// Dough Aurus
// By Paps
// Adapted from RainSlide's version: https://rainslide.neocities.org/cookieclicker/GoldenCookieClicker.js
// Automatically click golden cookies and reindeers, won't click wrath cookies. Will NOT click golden cookies if the cookie storm effect is active.
// Version 1.0
// Created 10/1/2025

// Cookie Clicker: https://orteil.dashnet.org/cookieclicker/

"use strict";

if (typeof Game !== "object" || Game === null || !Array.isArray(Game.shimmers)) {

	console.error(
		"Game is not ready yet. `Good things come to those who wait`"
	);

}else {

	const apply = (target, _this, args) => {
		var shimmer = args[0];
		if ((shimmer.type === "golden" && !shimmer.wrath && !isCookieStormActive()) || shimmer.type === "reindeer") {
			setTimeout(() => shimmer.pop(), 500);
		}
		return Reflect.apply(target, _this, args);
	};

	Object.defineProperty(Game.shimmers, "push", {
		value: new Proxy(Game.shimmers.push, { apply }),
		writable: true,
		enumerable: false,
		configurable: true
	});

	typeof Game.Win === "function" &&
	Game.Win("Third-party");


}

function isCookieStormActive(){
  return Object.keys(Game.buffs).some(b => b.toLowerCase().includes("cookie storm"));
}
