var key=location.search;
key=key.split('?');
key=key[1].split('=');
key=key[1];


firebase.database().ref('/vote_subject/'+key).once('value', function(snapshot) {
	var string='';
 	for(i=0;i<snapshot.val().choice.length;i++){
  		string+="<input type='radio' name='choice' value="+i+">"+snapshot.val().choice[i]+"</br>";
  	}
  	$('.vote_content').append("<h2>"+snapshot.val().votename+"</h2><form action='' name='voting'>"+string+"</form><p class='info'>已有"+snapshot.val().count+"人參與此投票</br>截止日期："+snapshot.val().endtime+"</br>");
});

function button_enable(){
	var voted=false;
	var select='';
	firebase.database().ref('user_vote/'+firebase.auth().currentUser.uid+'/'+key).once('value',function(snap){
		if(snap.val()==null){
			$('.vote_content').append("</p><button class='send' onclick='sss()'>送出</button>");
		}else{
			document.getElementsByName('voting')[0].innerHTML='';
			voted=true;
			snap.forEach(function(child){
			select=child.val().select;
		})
			$('.vote_content').append("</p><button class='send dis' onclick='sss()' disabled>送出</button>");
		}
	})
	firebase.database().ref('/vote_subject/'+key).once('value',function(snapshot){
		if(snapshot.val().result=='false'||snapshot.val().key==firebase.auth().currentUser.uid){
			$('.vote_content').append("<button class='show_result dis' disabled>觀看結果</button><div class='clear'></div>");
		}else{
			$('.vote_content').append("<a href='vote_result.html?key="+key+"' class='show_result'>觀看結果</a><div class='clear'></div>");
		}
		if(voted){
			var string='';
			for(i=0;i<snapshot.val().choice.length;i++){
				if(select==i){
					string+="<p class='choice'>"+snapshot.val().choice[i]+"</p>";
				}else{
					string+=snapshot.val().choice[i]+'</br>';
				}
			}
			document.getElementsByName('voting')[0].innerHTML=string;
		}
	})
};

setTimeout(function(){button_enable();},2000);

function sss(){
	var count=0
	for(i=0;i<$('form[name="voting"]')[0].length;i++){
		if($('form[name="voting"]')[0][i].checked){
			count+=1;
		}
	}
	if(count==0){
		alert('請選擇一個選項');
	}else if(count==1){
		var vote='';
		for(i=0;i<$('form[name="voting"]')[0].length;i++){
			if($('form[name="voting"]')[0][i].checked){
				vote=i;
			}
		}
		firebase.database().ref('/vote_subject/'+key).once('value', function(snapshot) {
			var voting=snapshot.val().vote;
			voting[vote]+=1;
			firebase.database().ref('/vote_subject/'+key).update({
				count:snapshot.val().count+=1,
				vote:voting
  			});
  			firebase.database().ref('user_vote/'+firebase.auth().currentUser.uid+'/'+key).push({
  				select:vote
  			})
		})
	var s=document.getElementsByClassName('send');
	s[0].className='send dis';
	setTimeout(function(){location.reload();},2000);
	}
};
