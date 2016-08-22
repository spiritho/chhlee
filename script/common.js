//document ready
$(function(){
	$("div#footer").html(footertext);
	$("title").html(chhleecompanyname);
    //$("div#loginbar").html(links);
	$('div#menu').load('menu.html',function(){
		initMenu();
	});
});

//after loading complete
$(window).load(function(){
	hideLoading();
	initContent();
});

function hideLoading()
{
	$("#loading").hide();
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function initDescriptionOfEachPage(url)
{
	console.log(url);
	url="data\\"+url+".html";
	$(".content").load(url,function(){});
}

function initMenu()
{
	var res = "";
	$(chhleemenu).each(function () {
		res += "<li><a href='javascript:initDescriptionOfEachPage(\"" + this.url + "\");'>" + this.displayname + "</a></li>";
	});
	$("#menulogo").click(function () { document.location.href = "index.html"; });	
	$("ul#mainmenu").html(res);
}
function initContent()
{
	$(".content").load("welcome.html");
}