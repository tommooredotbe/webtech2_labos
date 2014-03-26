// TODO
// * css animation op de messages
// * voting systeem
// * bij meermaals klikken = voten, moet de vraag groter worden
//


$(document).ready(function(){

/*	var client = new Faye.Client('http://localhost:3000/faye',{
				timeout: 20
	});*/
	var client = new Faye.Client('http://localhost:3000/faye/',{
				timeout: 20
	});

//	Clients should subscribe to channels using the #subscribe() method:		
	var subscription = client.subscribe('/ask', function(message) {
	   //alert('Got a message: ' + message.text);
	   $("#leftSide").append("<p class='questionStyle'><span class='userClass'>" + message.user + ":</span></br>" + message.chat + "</p>")
	});
//	The Subscription object is a promise that is fulfilled when the subscription has been acknowledged by the server
	/*subscription.then(function() {
	  alert('Subscription is now active!');
	});*/
	
    $('#submitQuestion').on('click',null, function() {
    	var chatMessage = $('#questionField').val();
    	var chatUser = $('#nameField').val();
    		/*var url = 'http://localhost:3000/message';
				
    		var message = {message: 'Client 1: ' + chat.val()};
    		var dataType = 'json';
    		$.ajax({
    		        type: 'POST',
    		        url: url,
    		        data: message,
    		        dataType: dataType,
    		    });
    		  chat.val('');*/

    	//client.publish("/message", chat);
//	You can send a message using the #publish() method, passing in the channel name and a message object.
    	//var publication = client.publish('/ask', {text: chat});
    	if(chatMessage != "" && chatUser != "" )
    	{
    		$(".errorMessage").text("") ;
    		$(".errorMessage").css('display','none');
			var publication = client.publish('/ask', {chat : chatMessage, user : chatUser});
    	}
    	else
    	{
    		$(".errorMessage").text("You must fill in both your name and a question!") ;
    		$(".errorMessage").css('display','block');
    	}
    	
// ust like subscribe(), the publish() method returns a promise that is fulfilled when the server
// acknowledges the message. This just means the server received and routed the message successfully, 
// not that it has been received by all other clients. The promise is rejected if the server explcitly 
// returns an error saying it could not publish the message to other clients; network errors are therefore 
// not covered by this API.
 /*   	publication.then(function() {
			  alert('Message received by server!');
			}, function(error) {
			  alert('There was a problem: ' + error.message);
		});
*/

    	
	});

/*	$("#submitQuestion").on('click',function(){

	});*/

	/*var nameField = $("#nameField");

    		    $('#submitQuestion').on('click',null, function() {
    		        var url = 'http://localhost:3000/';
				
    		        var message = {message: 'Client 1: ' + nameField.val()};
    		        var dataType = 'json';
    		        $.ajax({
    		            type: 'POST',
    		            url: url,
    		            data: message,
    		            dataType: dataType,
    		        });
    		        nameField.val('');
    		    });*/

});

