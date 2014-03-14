// JavaScript Document
$(document).ready(function(e) {

	checkErrorMessageStatus();
    
	$("#submitEmail").on('click',function(e){
		var subscriber = $("#userEmail").val();
		
		if(subscriber == null || subscriber == "")
		{
			$("#errorMessage").html("Je hebt geen e-mailadres ingegeven!");
			$("#errorMessage").removeClass("hidden");
		}
		else
		{
			checkErrorMessageStatus();
			
			if(isValidEmailAddress(subscriber))
			{
				var request = $.ajax({
							  url: "ajax/addSubscriber.php",
							  type: "POST",
							  data: { subscriber : subscriber }, 
							  dataType: "json"
							});
				request.done(function(msg) {
					console.log(msg);
					$("#errorMessage").html("Je bent succesvol ingeschreven op TerrAppke!");
					$("#errorMessage").removeClass("hidden");
					
					$("#submitEmail").css("display","none");
					$("#userEmail").css("display","none");
				});

				request.fail(function(jqXHR, textStatus) {
					console.log("Request failed: " + textStatus );
		   			console.log("Request exceeded");
				});
			}
			else
			{
				$("#errorMessage").html("Je hebt geen geldig e-mailadres ingegeven!");
				$("#errorMessage").removeClass("hidden");
			}
    		
		}
		
		e.preventDefault();
	});
});


function checkErrorMessageStatus()
{
	if(!$("#errorMessage").hasClass("hidden"))
	{
		$("#errorMessage").addClass("hidden");
	}
}

function isValidEmailAddress(emailAddress) 
{
	//var regexPattern = "[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}";
    var pattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    return pattern.test(emailAddress);
};