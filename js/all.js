$(document).ready(function(){
	firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
		document.getElementById('function_button').innerHTML="<button class='create' onclick='create_vote()'>建立投票</button><button class='user' onclick='open_user()'>使用者</button>";
		document.getElementById('mobile_button_list').innerHTML="<ul><button onclick='create_vote()'>建立投票</button><a href='index.html?created_vote'><li><img src='img/created.png'/>建立的投票</li></a><a href='index.html?voted_vote'><li><img src='img/voted.png'/>投選的投票</li></a><a href=''><li><img src='img/feedback.png'/>意見回饋</li></a><a href='javascript:logout()'><li><img src='img/logout.png'/>登出</li></a></ul>";
	}else{
		document.getElementById('function_button').innerHTML="<button class='login' onclick='open_login()'>登入</button><button class='register' onclick='open_register()'>註冊</button>";
		document.getElementById('mobile_button_list').innerHTML="<button class='login' onclick='open_login()'>登入</button><button class='register' onclick='open_register()'>註冊</button>";
	}

})});

	var config = {
    apiKey: "AIzaSyCZWkrjAHUpqW9KsJIQ90k53NLgM-lyGgI",
    authDomain: "online-vote-169a4.firebaseapp.com",
    databaseURL: "https://online-vote-169a4.firebaseio.com",
    projectId: "online-vote-169a4",
    storageBucket: "online-vote-169a4.appspot.com",
    messagingSenderId: "58452728917"
  	};
  	firebase.initializeApp(config);


    var create_error_func = function(error) {
        var errorCode     = error.code;
        var errorMessage  = error.message;
        alert("註冊失敗:"+errorMessage);  
    }
    var create_success_func = function(error) {
        alert("註冊成功");
        location.reload();
    }        
        
    var login_error_func = function(error) {
        var errorCode     = error.code;
        var errorMessage  = error.message;
        alert("登入失敗:"+errorMessage);  
    }
    var login_success_func = function(error) {
        alert("登入成功");  
        location.reload();                  
    }          
        

function login(){
	var account= $('#account').val();
	var pwd= $('#pwd').val();
    firebase.auth().signInWithEmailAndPassword(account, pwd).then(login_success_func).catch(login_error_func);
}
function register(){
	var account= $('#account').val();
	var pwd= $('#pwd').val();
	firebase.auth().createUserWithEmailAndPassword(account,pwd).then(create_success_func).catch(create_error_func);
}

function logout(){
firebase.auth().signOut().then(function() {
	location.reload();
}).catch(function(error) {
});
}

function open_login(){
	$('.login').toggleClass("actived");
	if($('#function_windows').attr('class')!='reg'){
		$('#function_windows').stop().slideToggle(500);
	}
	$('#function_windows').toggleClass("log");
	$('.reg').removeClass('reg');

	document.getElementById('function_windows').innerHTML="<h2>登入</h2><input type='text' id='account' placeholder='帳號'/><input type='password' id='pwd' placeholder='密碼'/></br><button onclick='login()'>登入</button></br><button onclick='fblogin()'>FB登入</button>";
	$('.register.actived').removeClass('actived');
}

function open_register(){
	$('.register').toggleClass("actived");
	if($('#function_windows').attr('class')!='log'){
		$('#function_windows').stop().slideToggle(500);
	}
	$('#function_windows').toggleClass("reg");
	$('.log').removeClass('log');

	document.getElementById('function_windows').innerHTML="<h2>註冊</h2><input type='text' id='account' placeholder='帳號'/><input type='password' id='pwd' placeholder='密碼'/></br><button onclick='register()'>註冊</button></br><button onclick='fblogin()'>FB登入</button>";
	$('.login.actived').removeClass('actived');
};

function open_user(){
	$('.user').toggleClass("actived");
	document.getElementById('function_windows').innerHTML="<a href='index.html?created_vote'><div class='user_button'><img src='img/created.png'/>建立的投票</div></a><a href='index.html?voted_vote'><div class='user_button'><img src='img/voted.png'/>投選的投票</div></a><a href='feedback.html'><div class='user_button'><img src='img/feedback.png'/>意見回饋</div></a><a href='javascript:logout()'><div class='user_button'><img src='img/logout.png'/>登出</div></a>";
	$('#function_windows').stop().slideToggle(500);
}

function create_vote(){
$('.create').toggleClass("actived");
$('.create_form').show('fast');
}

function addchoice(){
	var choice_count=0;
	var total_count=0;
		$('input').each(function(n){
			if($(this).is('#choice_text')){
				total_count+=1;
				if($(this).val()!=''){
				choice_count+=1;
				}
			}
		})
		if(total_count==choice_count){
			$('.choice_place table').append("<tr><td></td><td><input type='text' style='display:none;' class='text' id='choice_text' onkeyup='addchoice()'></br></td></tr>");
			$('.text').show('fast');
		}
};

function form_check(){
	var vform=document.forms['vote_form'];
	var vname=vform.elements['Vote_Name'].value;
	var vprivate=new Boolean(vform.elements['Vote_private'].value);
	var vresult=new Boolean(vform.elements['Vote_result'].value);
	var count=0;
	if(vname==""){
		alert('請輸入投票名稱');
	}else{
		$('input').each(function(n){
			if($(this).is('#choice_text')){
				if($(this).val()!=''){
				count+=1;
				}
			}
		})
	if(count<2){
		alert('至少需輸入兩個選項');
	}else{
		count=0;
		$('input').each(function(n){
			if($(this).is('#Vote_endtime')){
				if($(this).val()!=''){
				count+=1;
				}
			}
		})		
	if(count!='5'){
		alert('請輸入截止時間')
	}else{
		form_create(vform);
	}
}
}};

function form_create(form){
	var choice=[];
	var date=[];
	var vote=[];
		$('input').each(function(n){
			if($(this).is('#choice_text')){
				if($(this).val()!=''){
				choice.push($(this).val());
				vote.push(0);
				}
			}
			if($(this).is('#Vote_endtime')){
				if($(this).val()!=''){
				date.push($(this).val());
				}
			}
		})
		var vtime=new Date(date[0],date[1]-1,date[2],date[3],date[4]);
		vtime=vtime.getFullYear()+'/'+(parseInt(vtime.getMonth())+1)+'/'+vtime.getDate()+' '+vtime.getHours()+':'+vtime.getMinutes();
		var vname=form.elements['Vote_Name'].value;
		if(document.getElementById('Vote_private').checked){
			var vprivate='true';
		}else{
			var vprivate='false';
		}
		if(document.getElementById('Vote_result').checked){
			var vresult='true';
		}else{
			var vresult='false';
		}
		var user = firebase.auth().currentUser;
		var key=firebase.database().ref().push().key;
		firebase.database().ref('vote_subject/'+key).set({
		creater:user.uid,
		key:key,
    	votename: vname,
    	endtime: vtime,
    	private : vprivate,
    	result : vresult,
    	choice: choice,
    	vote: vote,
    	count: 0
  });
var s=document.getElementsByClassName('vcreate');
s[0].disabled='true';
setTimeout(function(){location.replace('index.html');},2000);
}


$('.close').click(function(){
	$('.create').toggleClass('actived');
	$('.create_form').hide('fast');
});

$('.create_form').click(function(evt){
	if($(evt.target).parents('.form_content').length==0 && evt.target.class!='create_form'){
	$('.create').toggleClass('actived');
	$('.create_form').hide('fast');
	}
});


$('.search').keydown(function(event){   
   if(event.keyCode==13){
	var query=document.getElementById("search").value;
	window.location.href='index.html?query='+query;
	}
});

function fblogin(){
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithRedirect(provider);
 	firebase.auth().getRedirectResult().then(function(result) {
     if (result.credential) {
       var token = result.credential.accessToken;
     }
     var user = result.user;
   }).catch(function(error) {
   var errorCode = error.code;
   var errorMessage = error.message;
   var email = error.email;
   var credential = error.credential;
   });
}



function show_list(){
	$('#mobile_button_list').stop().slideToggle(500);
}