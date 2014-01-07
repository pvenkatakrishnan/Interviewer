'use strict';
var idx =0;
$('#evaluate').click(function() {
	console.info("Clicked on evalute");
	doGetValue(function (value) {
		//pass it to controller to run tests on it and display results
		console.info("***" + JSON.stringify(value));
		var param = {
			code: value,
			quesIdx: idx
		};

		$.post('/runTests', param, function(result) {
			console.info('results' + JSON.stringify(result));
			var val = '<pre>' + JSON.stringify(result.results, undefined, 2) + '</pre>';
			if(result.error) {
				$('#testResult').html('Error!!! ' + result.error); 
			} else {
				val = val.replace(/\\"/g, "'");
				$('#testResult').html(val);	
			}
		});
	});
});

$('#tryAgain').click(function() {
	console.info("Clicked on tryagain");
	//putting it back in the reset mode
	doSetValue(questions[idx]);

});

$('#next').click(function() {
	++idx;
	console.info("Clicked on next");
	//go to next test
	doSetValue(questions[1]);
	$('#testResult').html('');
});

$('#finish').click(function() {
	console.info("Clicked on finish");
	//finish up 
	$.get('/finish');
});