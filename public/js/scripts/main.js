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
	};
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
					//zamiana daty na string - dodanie elementu data-eventDate
					var monthString = (month + 1).toString();
					var dayString = (fullMonth[i][j]).toString();
					var yearString = year.toString();
					 if (monthString.length == 1){
					 	monthString = "0"+monthString;
					 } 
					 if (dayString.length == 1 && dayString!=="0"){
					 	dayString = "0"+ dayString;
					 } 
					var eventDate = dayString+"-"+monthString+"-"+yearString;
					
					var dataElement = 'data-eventDate="'+eventDate+'"';
					htmlCalendar = htmlCalendar +"<td "+ dataElement +"><p class='dayNumber'>"+fullMonth[i][j]+"</p></td>";
				};	
			};
			htmlCalendar = htmlCalendar + "<tr>";
		};
		$('#calendar tbody').html(htmlCalendar);

		//komórka kalendarza
		var calendarButtons = 
		'<p class="icon-add-event"><i class="button-plus-event fa fa-plus-circle" data-toggle="modal" data-target="#event-plus"></i></p>';
		$("tbody td").not('.empty').append(calendarButtons);
	}
	eventCalendar();
	

	//utworzone wydarzenia, pobranie pliku json

	var appointments = function (){
		$.getJSON('public/js/addEvent.json',function(data){
			var events = data.events;
			var oneEvent = '';
			$.each(events, function(i,v){
				var iventDate = v.date;
				var iventTime = v.time;
				var iventName = v.name;
				var iventDescription = v.description;
				var iventImportant = v.important;
				var tekst
				if (iventImportant == true){
					tekst ="<p class='eventRowImportant'><span class='eventRowTime'>"+iventTime+" </span><span class='eventRowName'>"+iventName+"</span></p>";
				}else{
				tekst ="<p class='eventRow'><span class='eventRowTime'>"+iventTime+" </span><span class='eventRowName'>"+iventName+"</span></p>";
				}
				$('td[data-eventdate="'+iventDate+'"]').append(tekst);
				
			});
		});

	};
	appointments();


	//zmiana miesięcy w kalendarzu
	function changeMonth (){
		$(".icon-prev").on("click",function(){
			month--;
			if (month==-1){
				month = 11;
				year--
			}
			fullMonth = cal.monthDays(year, month);
			eventCalendar();
			headerMonthYear();
			appointments();
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
			appointments();
		});	
	};
	changeMonth();

	
});

