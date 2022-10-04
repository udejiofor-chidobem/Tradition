// Rebranding Feature
var im2 = document.getElementsByClassName('img-fluid float-sm-right p-0 mb-3')[0];
var im1 = document.createElement("img");
var origpar = document.getElementsByClassName('navbar-brand col-md-3 col-lg-2 mr-0 p-0 logo')[0].style.display;
var orig = document.getElementsByClassName('navbar-brand col-md-3 col-lg-2 mr-0 p-0 logo')[0].getElementsByTagName("div");
im1.src= chrome.runtime.getURL("images/gt-logo.svg");
im1.style.margin = "8px 43px";
im1.style.height = "60px";
//im1.style.width = "162px";
im1.id = 'im1';
const elem = document.createElement('a');
elem.style.margin = "20px 39px";
elem.style = origpar.style;
elem.href = "https://gatech.instructure.com";
elem.id = 'new1';
elem.appendChild(im1);
var target = document.getElementsByClassName('navbar-brand col-md-3 col-lg-2 mr-0 p-0 logo')[0]; 
document.getElementsByClassName('navbar navbar-dark bg-dark flex-md-nowrap d-print-none p-0 shadow persistent-header')[0].insertBefore(elem, target); 
document.getElementsByClassName('navbar-brand col-md-3 col-lg-2 mr-0 p-0 logo')[0].style.display = "none";
im2.src = chrome.runtime.getURL("images/long.png");
document.getElementById('new1').className = 'navbar-brand col-md-3 col-lg-2 mr-0 p-0 logo';

