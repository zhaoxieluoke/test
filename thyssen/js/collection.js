/*
* @Author: Administrator
* @Date:   2017-02-06 20:21:25
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-07 14:07:48
*/

function getworks(){
	$.getJSON("files/works.json", function(data){
		console.log(data);
		
		$('.masterlist ul li').on('click',function(){
			console.log(data);
			var $index = $(this).index();
			$(this).children('a').addClass('cur').parent('li').siblings().children('a').removeClass('cur');
			console.log($index);
			$('.masterWorks .works a img').attr("src",data.database[$index].imgsrc);
			$('.masterWorks .cont h3').text( data.database[$index].tit);
			$('.masterWorks .cont .p1').text(data.database[$index].p1);
			$('.masterWorks .cont .p2').text(data.database[$index].p2);
			/*$('.masterWorks .cont .p3').text(data.database[$index].p3);*/
			$('.timelinecont .cont .other .txt p:eq(0)').text(data.database[$index].otherp1);
			$('.timelinecont .cont .other .txt p:eq(1)').text(data.database[$index].otherp2);
			$('.timelinecont .cont .other .txt p:eq(2)').text(data.database[$index].otherp3);
		});       
	})
}
		

$(function(){
	getworks();
})