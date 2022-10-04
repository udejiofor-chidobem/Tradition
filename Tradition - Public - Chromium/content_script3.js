// Rebranding Feature
var im1 = document.getElementById("gt-logo-image");
var im2 = document.getElementById('gt-logo-footer').getElementsByTagName('img')[0];
im1.src = chrome.runtime.getURL("images/long.png");
im2.src = chrome.runtime.getURL("images/long.png");
