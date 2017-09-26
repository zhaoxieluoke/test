/*
* @Author: Administrator
* @Date:   2017-02-04 11:34:27
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-06 15:55:22
*/

'use strict';

$(function(){
	$('.yearsnum div').on('click',function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		var $index = $(this).index();
		console.log($index);
		/*$.getJSON("http://127.0.0.1:8020/thyssen/files/data.json",
	    	function(data){
	    	console.log(data);
				$('.timelinecont h3').text("'"+ data.database[$index].tit + "'");
				$('.timelinecont p').text("'" + data.database[$index].cont1 + "'");
				$('.timelinecont p img').attr('src',"'" + data.database[$index].imgsrc + "'");
		});*/

		/*$.ajax({
			type:"get",
			url:"http://127.0.0.1:8020/thyssen/files/data.json",
			dataType:"json",
			success:function(data){
				console.log(data);
				$('.timelinecont h3').text("'"+ data.database[$index].tit + "'");
				$('.timelinecont p').text("'" + data.database[$index].cont1 + "'");
				$('.timelinecont p img').attr('src',"'" + data.database[$index].imgsrc + "'");
			},
		})*/
		$.get("files/data.json", function(data){
			console.log(data);
			$('.timelinecont h3').text( data.database[$index].tit);
			$('.timelinecont p.timelinecont1').text(data.database[$index].cont1);
			$('.timelinecont p img').attr("src",data.database[$index].imgsrc);
		});

	        
	})



	
})
 

		
