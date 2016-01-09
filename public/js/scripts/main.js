$(document).ready(function(){

//kalendarz
	var cal = new Calendar(1);
	var today = new Date();
	var year = today.getFullYear();    
	var month = today.getMonth();



	var fullMonth = cal.monthDays(year, month);


//naglowek kalendarza - nazwa miesiaca / tygodnia
	var nameMonth = ['Sty.','Lut.','Mar.','Kwi.',
		'Maj','Cze.','Lip.','Sie.','Wrz.','Paz.','Lis.','Gru.'];	
	var headerMonthYear = function(){
		$('#month').html(nameMonth[month]);
		$('#year').html(year);
	}
	headerMonthYear();
	
	var nameWeek = ['Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota','Niedziela'];
	nameWeek.forEach(function (day){
		$('#calendar thead').append('<td>'+day+'</td>');	
	});


// glowna tablica kalendarza
	var eventCalendar = function () {
		var htmlCalendar = "";
	for (i=0; i<fullMonth.length; i++){
		htmlCalendar = htmlCalendar + "<tr>";
		for (j=0; j<7; j++){
			if (fullMonth[i][j]==0) {
				htmlCalendar = htmlCalendar +"<td class='empty'></td>";
			}else{
				htmlCalendar = htmlCalendar +"<td>"+fullMonth[i][j]+"</td>";
			};	
		};
		htmlCalendar = htmlCalendar + "<tr>";
	};
		$('#calendar').html(htmlCalendar);
		//komórka kalendarza
		var calendarButtons = 
		'<i class="button-plus-event fa fa-plus-circle icon-add-event" data-toggle="modal" data-target="#event-plus"></i>';
		$("tbody td").not('.empty').prepend(calendarButtons);
	}

	eventCalendar();
	

	//zmiana miesięcy w kalendarzu
	function changeMonth (){
		$(".icon-prev").on("click",function(){
			month--;
			if (month==0){
				month = 11;
				year--
			}
			fullMonth = cal.monthDays(year, month);
			eventCalendar();
			headerMonthYear();
		});
		$(".icon-next").on("click",function(){
			month++;
			if (month==12){
				month = 0;
				year++
			}
			fullMonth = cal.monthDays(year, month);
			eventCalendar();
			headerMonthYear();
		});	
	};
	changeMonth();

	
});

