function playSegment(x) {
	return function() {
		$("#frames").fadeOut();
		$("#video").fadeIn();
		$("#player").get(0).currentTime = x;
		$("#player").get(0).play();
		tm = setTimeout(function() {
			$("#player").get(0).pause();
			$("#video").fadeOut();
			$("#frames").fadeIn();
		}, 6000);
		$("#playon").show();
	}
}

$(document).ready(function() {
	$("#shutup").hide();
	$("#video").hide();

	$("#playon").click(function() {
		clearTimeout(tm);
		$("#playon").hide();
		$("#shutup").show();

	});
	$("#shutup").click(function() {
		$("#playon").show();
		$("#shutup").hide();
		$("#player").get(0).pause();
		$("#video").fadeOut();
		$("#frames").fadeIn();
	});
	
	for(i in image_list){
		var newDiv= $('<div class="frame"></div>')
		var play = $('<a class="ts" href="#">'+i*image_rate+'</a>')
		play.click(playSegment((i-1)*image_rate-2));
		newDiv.append(play);

		var img = $('<img src="images/'+image_list[i]+'" alt="video frame" />')
		img.toggle(
			function(){$(this).parent().addClass("zoomed").parent().addClass("zoom").removeClass("preview") },
			function(){$(this).parent().removeClass("zoomed").parent().removeClass("zoom").addClass("preview") }
		);
		newDiv.append(img);
		$("#frames").append(newDiv);
	}

});