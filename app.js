(function() {
	"use strict";
	var app = {

		init : function() {
			this.listeners();
		},
		
		listeners : function() {
			$("#checkButton").on("click", this.checkInputs.bind(this));
		},

		checkInputs : function() {
			// effacer les erreurs précédentes
			$("#message").remove();
			$("#divInputDay, #divInputYear").removeClass("inputError").addClass("selecteur");

			// récupérer les inputs
			var $inputDay = parseInt($("#inputDay").val(), 10);
			var $selectedMonth = parseInt($("#selectMonth").val(), 10);
			var $inputYear = parseInt($("#inputYear").val(), 10);
			
			// vérifier si les inputs correspondent aux attentes, si oui, lancer la fonction getDate
			if ($inputDay < 1 || $inputDay > 31 || !$inputDay) {
				this.inputError("divInputDay", "La date du jour doit être comprise entre 1 et 31");
			} 
			else if ($inputYear < 0 || !$inputYear) {
				this.inputError("divInputYear", "L'année doit être supérieure à 0");
			} 
			else {
				this.getDate($inputDay, $selectedMonth, $inputYear);
			}

		},

		getDate : function(day, month, year) {
			var date = moment(year + "-" + month + "-" + day);
			var dayToDisplay = date.lang('fr').format('dddd');
			this.displayDay(dayToDisplay);
		},

		displayDay : function(day) {
			$("#message").remove();
			$("body").html("<div class='overlay'>" + day + "<button id='restart' label='recommencer'>x</button></div>");
			$("#restart").on("click", app.restart);
		},

		inputError : function(selector, message) {
			$("#message").remove();
			$("html").prepend('<div id="message" class="error">' + message + '</div>');
			$("#" + selector).removeClass("selecteur");
			$("#" + selector).addClass("inputError");
		},

		restart : function() {
			location.reload();
		}

	}


	app.init();

})();