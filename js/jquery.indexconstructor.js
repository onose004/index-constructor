/*	
 * jQuery index builder v1.0
 *
 * Copyright (c) Ryosuke ONOSE
 * onose.ws
 *
 */


$(document).ready(function(){
	



	// jQuery plugin

	$.fn.indexbuilder = function(opts){

		var defaults = {

		}

		var setting = $.extend(defaults, opts);

		var offset = -30;

		var parentElement	= $("#main");

		var indexObject = 	"h2, h3, h4, h5, h6";
		var indexObject = indexObject.replace(/,[ ]*/g, ",");

		var indexObjectTag = indexObject.split(",");


		
		// get DOM

		indexElement = parentElement.find(indexObject);




		var indexItem = $();

		indexElement.each(function(i, val){
	
			// attach y-position
			indexElement[i].hTop = $(indexElement[i]).offset().top + offset;
			if(i < indexElement.length - 1)		indexElement[i].hBottom = $(indexElement[i+1]).offset().top + offset;
			if(i == indexElement.length - 1)	indexElement[i].hBottom =  parentElement.offset().top + parentElement.height() + offset;
			indexItem = indexItem.add("<li class='ib-list-item-"+i+"'><a href='#' onclick='jump("+indexElement[i].hTop+")'>"+indexElement[i].innerHTML+"</a></li>");
		});

	
		// construct list

		for(i = 0; i < indexObjectTag.length; i++){
			indexElement.filter(indexObjectTag[i]).each(function(j,val){$(this).attr("ib-depth", i), $(this).attr("ib-depth-index", j)});
		}

		// attach section height [top level only]

		indexElement.filter("[ib-depth = 0]").each(function(i,val){
			
			if(i < indexElement.filter("[ib-depth = 0]").length - 1)		indexElement.filter("[ib-depth = 0]")[i].sBottom = $(indexElement.filter("[ib-depth = 0]")[i+1]).offset().top + offset;
			if(i == indexElement.filter("[ib-depth = 0]").length - 1)	indexElement.filter("[ib-depth = 0]")[i].sBottom =  parentElement.offset().top + parentElement.height() + offset;
			console.log($(this));
		});

		console.log($(indexElement.filter("[ib-depth = 0]")[0]));

		// add list
		var indexList = $(this);
		var targetItem = indexList;

		for(i = 0; i < indexElement.length; i++){
			if(i > 0){
				indexGap = ($(indexElement[i-1]).attr("ib-depth") - $(indexElement[i]).attr("ib-depth"))
				
				if(indexGap < 0 ){
					// increace depth
					for(j = 0; j < Math.abs(indexGap); j++){
						if (j < Math.abs(indexGap) - 1) {
                    	    targetItem.children('li:last-child').append("<ul><li></li></ul>");
                    	} else {
                    	    targetItem.children('li:last-child').append("<ul></ul>");
                    	}
		
                    	targetItem = targetItem.children('li:last-child').children("ul:last-child");
					}
				
				}else if(indexGap > 0){
					// decrease depth
					for (j = 0; j < Math.abs(indexGap); j++) {
                	    targetItem = targetItem.parent().parent();
                	}
				}
				// console.log(indexItem[i]);
				targetItem.append(indexItem[i]);
			}else{
				targetItem.append(indexItem[i]);
			}

		}

		// scroll spy

		$(document).ready(scrollSpy);
    	$(window).scroll(scrollSpy);

    	function scrollSpy(){
    		$(indexList).find("a").removeClass("stay");
    		$(indexList).children("li").children("ul").hide();
    		for(i = 0; i < indexElement.length; i++){
    			if ($(window).scrollTop() >= indexElement[i].hTop && $(window).scrollTop() < indexElement[i].hBottom) {
    				$(indexItem[i]).children("a").addClass('stay');
    				console.log(indexItem[i]);
    			}
    			if(indexElement.attr("ib-depth") == 0){
    				if ($(window).scrollTop() >= indexElement[i].hTop && $(window).scrollTop() < indexElement[i].sBottom) {
    					// active contents
    					
    					$(indexItem[i]).children("a").addClass('stay');
    					$(indexList.children("li")[$(indexElement[i]).attr("ib-depth-index")]).children("ul").show();
    					break;
    				}
    			}
    		}
    	}
		
		
	}


	

});

function jump(n){
	var offset = -20;
	$('html,body').animate(
		{scrollTop: n+offset}, 
		{duration: 'slow', easing: 'swing'}
	);

}

$(window).load(function() {
	$("#index-constructor").indexbuilder({

	});
	$("#nav-inde").mmenu({
        classes: "mm-light"
    });
});