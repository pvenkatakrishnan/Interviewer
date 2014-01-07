'use strict';


module.exports = function (server) {

    var tests = [
        [
            {entry: ['a', 'bc', 'def'], result: 'def'},
            {entry: ['a', 1, 'def'], result: 'def'},
            {entry: [[1234], 23, 'abcde', 'i am a winner'], result: 'i am a winner'}
        ],
        [
            {entry: ['a', 1, 2, 3, [4, 5, 6]], result: 21},
            {entry: ['a', 1, 'def'], result: 1},
            {entry: [[1,2,3,4], 2, 'abcde', 'i am a winner'], result: 12}
        ]
    ];

    function runTests(questionIdx, testFnc, cb) {
        var results = [];
        //console.info('idx', questionIdx);
        //console.info('testFnc', testFnc);

        tests[questionIdx].forEach(function(item) {
            var result = testFnc(item.entry);
            if (item.result === result) {
                results.push({
                    testCase: JSON.stringify(item.entry),
                    result: 'Passed'
                });
            } else {
                results.push({
                    testCase: JSON.stringify(item.entry),
                    expected: item.result,
                    result: 'Failed'
                });
            }
        });
        cb(null, results);
    }


    server.get('/step1', function (req, res) {
        var model = { name: 'UIE Interviewer' }; 
        res.render('index', model);
    });


    server.get('/step2', function(req, res) {
		req.session.name = req.query.name;
		var model = {
			name: "Poornima"
		};
		res.render('step2',model);
    });

    server.post('/runTests', function(req, res) {
        try {
            var codeString = '(function () { return ' + req.body.code + '})()',
            questionIdx = req.body.quesIdx,
            testFnc = eval(codeString);

            //console.info('codeString' + codeString);
            //console.info('evaluated ' + testFnc);

            runTests(questionIdx, testFnc, function(err, results) {
                res.json({
                    error: err,
                    results: results
                });
            });
        } catch (e) {
            res.json({
                error: 'check the code for syntax errors'
            });
        }
        
    });

    server.get('/finish', function(req, res) {
        var model = {
            name: 'Poornima'
        };
        res.render('finish', model);
    });

};
