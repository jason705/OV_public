var feedback=[];

firebase.database().ref('/feedback').once('value', function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
  	var childKey = childSnapshot.key;
  	var childData = childSnapshot.val();
   	feedback.push(childData);
  	});
});
setTimeout(function(){show_feedback();},3000);
function show_feedback(){
	document.getElementById('temp').innerHTML='';
	for(i=0;i<feedback.length;i++){
		$('#other_feedback').append("<div class='feed'><div class='feedback_text'>"+feedback[i].text+"</div><div class='feedback_point'>"+feedback[i].point+"</div><div class=clear></div></div>");
	}
}
$('.feedback_send').click(function(){
	var content=document.getElementById('feedback_content').value;
	var point=document.getElementById('feedback_point').value;
	if(content==''){
		alert('請輸入回饋內容');
	}else if(point>5||point<0){
		alert('評分請輸入0到5的數字')
	}else{
		var user = firebase.auth().currentUser;
		firebase.database().ref('feedback/').push({
		userid:user.uid,
		text:content,
		point:point    	
  		});
	}
	var s=document.getElementById('feedback_send');
	s.disabled='true';
	setTimeout(function(){location.reload();},2000);
});