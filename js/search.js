var data=[];

firebase.database().ref('/vote_subject').once('value', function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
  	var childKey = childSnapshot.key;
  	var childData = childSnapshot.val();
   	data.push(childData);
  	});
});

var query=location.search;
if(query!=''){
	query=decodeURI(query);
	query=query.split('?');
	query=query[1].split('=');
	if(query[0]=='query'){
		query=query[1];
		if(query!=''){
			setTimeout(function(){search(query);},3000);
		}else{
			setTimeout(function(){search()},3000);
		}
	}else{
		if(query[0]=='created_vote'){
			setTimeout(function(){created()},3000);
		}
		if(query[0]=='voted_vote'){
			setTimeout(function(){voted()},3000);
		}
	}
}else{
	setTimeout(function(){search()},3000);
}


function created(){
	document.getElementById('contenter').innerHTML='';
	var sresult=[];
	for(i=0;i<data.length;i++){
		if(data[i].creater==firebase.auth().currentUser.uid){
			sresult.push(data[i]);
		}
	}
	for(i=0;i<sresult.length;i++){
		$('#contenter').append("<a href='vote.html?key="+sresult[i].key+"'><div class='vote_box'><h2 id='title'>"+sresult[i].votename+"</h2><p>目前已有<span id='people_count'>"+sresult[i].count+"</span>人投票<br/>截止日期："+sresult[i].endtime+"</p><div class='clear'></div></div></a>");
	}
}


function voted(){
	document.getElementById('contenter').innerHTML='';
	firebase.database().ref('/user_vote/'+firebase.auth().currentUser.uid).once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var key=childSnapshot.key;	
			firebase.database().ref('/vote_subject/'+key).once('value', function(snap) {
				$('#contenter').append("<a href='vote.html?key="+snap.val().key+"'><div class='vote_box'><h2 id='title'>"+snap.val().votename+"</h2><p>目前已有<span id='people_count'>"+snap.val().count+"</span>人投票<br/>截止日期："+snap.val().endtime+"</p><div class='clear'></div></div></a>");
			})
 		});
	});
}

function search(q){
	var sresult=[];
	var dataset=[];
	for(i=0;i<data.length;i++){
		if(data[i].private=='false'){
			dataset.push(data[i]);
		}
	}
	if(data==undefined){
		console.log('讀取失敗');
	}else{
		document.getElementById('contenter').innerHTML='';
		if(q==undefined||q==''){
			for(i=0;i<dataset.length;i++){
				$('#contenter').append("<a href='vote.html?key="+dataset[i].key+"'><div class='vote_box'><h2 id='title'>"+dataset[i].votename+"</h2><p>目前已有<span id='people_count'>"+dataset[i].count+"</span>人投票<br/>截止日期："+dataset[i].endtime+"</p><div class='clear'></div></div></a>");
			}
		}else{
			for(i=0;i<dataset.length;i++){
				if(dataset[i].votename.indexOf(q)!=-1){
					sresult.push(dataset[i]);
				}
			}
			for(i=0;i<sresult.length;i++){
				$('#contenter').append("<a href='vote.html?key="+sresult[i].key+"'><div class='vote_box'><h2 id='title'>"+sresult[i].votename+"</h2><p>目前已有<span id='people_count'>"+sresult[i].count+"</span>人投票<br/>截止日期："+sresult[i].endtime+"</p><div class='clear'></div></div></a>");
			}
		}
	}
}