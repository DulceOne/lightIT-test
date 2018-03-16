$(document).ready(function(){

	$(".image").click(function(){
		var val = $(".search input").val();
		if(val){
			$.ajax({
				url:"https://itunes.apple.com/search?term="+val,
				type:"GET",
				dataType:"json"
			})
			.done(function(res) {
		   		for(i in res.results){
		   			var item = $(".item.template").clone();
		   			item.removeClass("template");
		   			item.find("#trackImg").attr("src",res.results[i].artworkUrl100)
		   			item.find(".artist").append(res.results[i].artistName);
		   			item.find(".track").append(res.results[i].trackName);
		   			item.find(".collectionName").append(res.results[i].collectionName);
		   			item.find(".genre").append(res.results[i].primaryGenreName);
		   			item.find(".collection").append(res.results[i].collectionName);
		   			item.find(".count").append(res.results[i].trackCount);
		   			item.find(".collectionPrice").append(res.results[i].collectionPrice+" USD");
		   			item.find("h1").append(res.results[i].artistName+" - "+res.results[i].trackName);
		   			item.find(".duration").append(parseTime(res.results[i].trackTimeMillis));
		   			item.find(".price").append(res.results[i].trackPrice+ "USD");
		   			$(".items").append(item);
		   		}
	  			$(".item").click(function(){
	  				$(".item").not(this).removeClass("opened");
					$(".item").not(this).find(".hide").hide();
					$(this).find(".hide").toggle("swap");
					$(this).toggleClass("opened");
					
				})
		  	})
		  	.fail(function(err) {
		    	console.log(err);
		  	})
		}
	})
	function parseTime(ms){
		sec = Math.floor(ms/1000);
		return  Math.floor(sec/60)+':'+((sec%60 >=10)? (sec % 60) : '0' + (sec % 60))+" min";
	}

});