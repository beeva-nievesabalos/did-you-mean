
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Did you mean...?' , information: ''});
};

