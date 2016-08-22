var catelist=[
{
	series:"polymer_additives",
	id:"optical_brighteners",
	name:"螢光增白劑(Optical Brighteners)",
	properties:["Product  Name","Melting Point","Application"]	
},
{
	series:"polymer_additives",
	id:"anti_oxidants",
	name:"抗氧化劑(Anti-Oxidants)",
	properties:["Product  Name","Melting Point","Application"]	
},
{
	series:"polymer_additives",
	id:"flame_retardants",
	name:"耐燃劑(Flame Retardants)",
	properties:["Product  Name","P2O5(%)","Application"]	
},
{
	series:"polymer_additives",
	id:"gelling_accelerator",
	name:"流動助劑(膠化促進劑)",
	properties:["Product  Name","Soften Point","Application"]
},
{
	series:"polymer_additives",
	id:"blowing_agents",
	name:"發泡劑(Blowing Agents)",
	properties:["Product  Name",""]
}];

function pCategory(series,id,cate_name,properties)
{
	this.series=series;
	this.name=cate_name;
	this.id=id;
	this.properties=properties;
	this.gridview=function(){
		var htmlcode = "<span class=\"gridview_title\">"+this.name+"</span>";
		    htmlcode+= "<table class=\"gridview_table\" id=\""+this.id+"\">";
			htmlcode+="	<thead><tr>";
			this.properties.forEach(function(item){htmlcode+="<th>"+item+"</th>";});
			htmlcode+=" </tr></thead>";
			htmlcode+=" <tbody></tbody>";
			htmlcode+="</table>";
		return htmlcode;
	};
	this.loaddata=function(){
		$.ajax({
			url:"data\\products\\"+this.series+"\\"+this.id+".html",
			type:"GET",
			error:function(xhr){console.log("ajax request error: cant find file"+this.id+".html");},
			success:function(data)
				{
					var product=$(data).find("table.product");
					var htmlcode="";
						htmlcode+=$(product).find("tbody").html();
						//console.log(htmlcode);
					if (htmlcode!="undefined")
					{
						$("#"+id+" tbody").html(htmlcode);
					}
					else
					{
						$("#"+id+" tbody").html("no data");
					}
					decorate_gridview();
				}	
			});
	}
}

function catelist_load()
{
	var pl=new Array();
	for(var i=0;i<catelist.length;i++)
	{
		var pp=catelist[i];
		pl.push(new pCategory(pp.series,pp.id,pp.name,pp.properties));	
	}
	return pl;
}

function draw_gridview(divselector,catelist)
{
	var res = "";
	catelist.forEach(function(item){
		res+=item.gridview();
	});
	$(divselector).html(res);
}
function load_data(catelist)
{
	catelist.forEach(function(item){item.loaddata();});
}
function decorate_gridview()
{
	$(".gridview_table td.name").each(function(){
		productname=$(this).text();
		$(this).html("<a href=\"javascript:drilldown('"+productname+"');\">"+productname+"</a>");
	});
	
}
function drilldown(productname)
{
	//alert(productname);
	var productname_list=$(".gridview_table td.name");
	var prev,curr,next,i;
	for(i=0;i<productname_list.length;i++)
	{
		if($(productname_list[i]).text()==productname)
		{
			curr=productname_list[i];
			if(i>0)
			{
				prev=$(productname_list[i-1]).text();
			}
			if(i<productname_list.length-1)
			{
				next=$(productname_list[i+1]).text();
			}
			break;
		}
	}
	var desc=$(curr).parent().find("td.detail").html();
	if(prev==undefined)
	{
		$("#divProductDetailContentPrev").hide();
	}
	else
	{
		$("#divProductDetailContentPrev").show();
		$("#divProductDetailContentPrev a").attr("href","javascript:drilldown('"+prev+"')");
	}
	if(next==undefined)
	{
		$("#divProductDetailContentNext").hide();
	}
	else
	{
		$("#divProductDetailContentNext").show();
		$("#divProductDetailContentNext a").attr("href","javascript:drilldown('"+next+"')");
	}
	//transfer for format
	desc=transferformat(desc);
	$("#divProductDetail #divProductDetailDesc").html(desc);
	$("#divProductDetail").fadeIn();
	$("#divProductDetailBar").click(function(){$("#divProductDetail").fadeOut()});
	
}
function transferformat(orgStr)
{
	return orgStr.replace(/^\n|\n$/g,"").replace(/\n/g,"<br/>").replace(/\t/g,"");
}
$(function(){
	var catlist=catelist_load();
	draw_gridview($("#divCateList"),catlist);
	load_data(catlist);
	});