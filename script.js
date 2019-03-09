$(document).ready(function(){
  $('input[name="date"]').datepicker({
		format: 'mm/dd/yyyy', 
		todayHighlight: true, 
		autoclose: true, 
		endDate: new Date(), 
	});
})

function getAPOD(event) {
	event.preventDefault();

	let date = document.getElementById("date").value;
	if (date === "") {
		return;
	}
	let newDate = date.split('/');
	date = newDate[2] + '-' + newDate[0] + '-' + newDate[1];
	// console.log(date);

	fetch("https://api.nasa.gov/planetary/apod?date=" + date + "&api_key=gmkr2JQnlSozUzaMAoEiS8JWdVz2RILzIAFMg0Aa") 
	.then((resp) => resp.json())
	.then((json) => {
		// console.log(json);
		let results = "";
		results += '<h2 id="apiTitle">NASAs Astronomy Picture of the Day</h2>';
		results += '<img src="' + json.url + '" width="50%"/>';
		results += '<p id="apiExplanation">' + json.explanation + '</p>';
		document.getElementById("apodResult").innerHTML = results;
		document.getElementById("apiTitle").setAttribute("style", "margin: 100px 0 10px 0;");
		document.getElementById("apiExplanation").setAttribute("style", "margin: 10px 0 200px 0;");
	})
}
