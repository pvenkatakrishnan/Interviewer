/*global require:true*/
'use strict';

require(['config'], function (config) {

	require(['jquery', 'codeTool'],
			function ($, tool) {

		require(['questions', 'step2View'], 
			function (questions , step2View) {
				console.info('****' + questions);
				var questions = [
					"function longestString(i) {\n\n\t// i will be an array.\n\t// return the longest string in the array\n}",
					"function arraySum(i) {\n\n\t// i will be an array, containing integers, strings and/or arrays like itself.\n\t// Sum all the integers you find, anywhere in the nest of arrays.\n}"
				];
				//console.info('***' + JSON.stringify(questions));
				/* Create instance of the App */
				var app = {
					initialize: function () {
						doSetValue(questions[0]);
					}
				};
				app.initialize();
		});
	});
});

