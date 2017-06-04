$(document).ready(function(){
var ctx = document.getElementById("bar_0").getContext("2d");
var data={
	labels:['選項1','選項2','選項3','選項4','選項5'],
	datasets:[{
		backgroundColor:[
		'rgba(255,102,90,0.5)',
		'rgba(135,212,40,0.5)',
		'rgba(85,102,234,0.5)',
		'rgba(103,201,202,0.5)',
		'rgba(255,212,100,0.5)',
		'rgba(186,51,243,0.5)',
		'rgba(85,40,6,0.5)',
		'rgba(130,38,130,0.5)',
		'rgba(80,133,122,0.5)',
		'rgba(156,79,89,0.5)'
		],
		borderColor:[
		'rgba(255,102,90,1)',
		'rgba(135,212,40,1)',
		'rgba(85,102,234,1)',
		'rgba(103,201,202,1)',
		'rgba(255,212,100,1)',
		'rgba(186,51,243,1)',
		'rgba(85,40,6,1)',
		'rgba(130,38,130,1)',
		'rgba(80,133,122,1)',
		'rgba(156,79,89,1)'

		],
      borderWidth: 1,
		label:'投票結果',
		data:['2','4','6','7','1']
	}]
};
var myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: data,
    options:{
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
			},
    	legend: {
    		display:false
    			},
        responsive : true,
        animationEasing: "easeOutQuart",
    }
});
});