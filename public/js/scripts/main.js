$(document).ready(function(){


	var cal = new Calendar(1);

	var today = new Date();
	var year = today.getFullYear();    /// nie wyswietlaja sie alerty
	var month = today.getMonth();


	var fullMonth = cal.monthDays(year, month);

//naglowek kalendarza - nazwa miesiaca / tygodnia
	var nameMonth = ['Styczeń','Luty','Marzec','Kwiecień',
		'Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];	
	$('#calendar').append('<thead><td colspan="7">'+nameMonth[month]+'</td></thead>');
	
	var nameWeek = ['Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota','Niedziela'];
	nameWeek.forEach(function (day){
		$('#calendar thead').append('<td>'+day+'</td>');	
	});




// glowna tablica kalendarza
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
	$('#calendar').append(htmlCalendar);

//komórka kalendarza
	var calendarButtons = '<i class="fa fa-plus-circle"></i>'
	$("tbody td").not('.empty').prepend(calendarButtons);

});
