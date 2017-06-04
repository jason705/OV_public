$(document).ready(function(){
	firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
		document.getElementById('function_button').innerHTML="<button class='create' onclick='create_vote()'>建立投票</button><button class='user' onclick='open_user()'>使用者</button>";
	}else{
		document.getElementById('function_button').innerHTML="<button class='login' onclick='open_login()'>登入</button><button class='register' onclick='open_register()'>註冊</button>";
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
	document.getElementById('function_windows').innerHTML="<h2>登入</h2><input type='text' id='account' placeholder='帳號'/><input type='text' id='pwd' placeholder='密碼'/><button onclick='login()'>登入</button><button onclick=''>FB登入</button>";
	$('#function_windows').stop().slideToggle(500);
}

function open_register(){
	$('.register').toggleClass("actived");
	document.getElementById('function_windows').innerHTML="<h2>註冊</h2><input type='text' id='account' placeholder='帳號'/><input type='text' id='pwd' placeholder='密碼'/><button onclick='register()'>註冊</button><button onclick=''>FB登入</button>";
	$('#function_windows').stop().slideToggle(500);
}

function open_user(){
	$('.user').toggleClass("actived");
	document.getElementById('function_windows').innerHTML="<a href=''><div class='user_button'><img src=''/>我建立的投票</div></a><a href=''><div class='user_button'><img src=''/>我投選的投票</div></a><a href=''><div class='user_button'><img src=''/>意見回饋</div></a><a href='javascript:logout()'><div class='user_button'><img src=''/>登出</div></a>";
	$('#function_windows').stop().slideToggle(500);
}

function create_vote(){
$('.create').toggleClass("actived");
$('.create_form').show();
}

function form_check(){
	var vform=document.forms['vote_form'];
	var vname=vform.elements['Vote_Name'].value;
	var vchoice01=vform.elements['Vote_choice_01'].value;
	var vchoice02=vform.elements['Vote_choice_02'].value;
	var vtime=vform.elements['Vote_endtime'].value;
	var vprivate=new Boolean(vform.elements['Vote_private'].value);
	var vresult=new Boolean(vform.elements['Vote_result'].value);
	if(vname==""){
		alert('請輸入投票名稱');
	}else if(vchoice01==''||vchoice02==''){
		alert('至少需輸入兩個選項');
	}else if(vtime==''){
		alert('請輸入截止時間')
	}else{
		console.log('111');
		form_create(vform);
	}
};

function form_create(form){
		var vname=form.elements['Vote_Name'].value;
		var vchoice01=form.elements['Vote_choice_01'].value;
		var vchoice02=form.elements['Vote_choice_02'].value;
		var vtime=form.elements['Vote_endtime'].value;
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

		firebase.database().ref('vote_subject/').push({
    	votename: vname,
    	endtime: vtime,
    	private : vprivate,
    	result : vresult,
    	choice: [vchoice01,vchoice02]
  });
}


$('.close').click(function(){
	$('.create').toggleClass('actived');
	$('.create_form').hide();
});

$('.create_form').click(function(evt){
	if($(evt.target).parents('.form_content').length==0 && evt.target.class!='create_form'){
	$('.create').toggleClass('actived');
	$('.create_form').hide();
	}
});


function search(){
	firebase.database().ref('/vote_subject/vote_id').once('value').then(function(snapshot) {
		console.log(snapshot.val().votename);
	})
}

$('show_result').click(function(){
	
});