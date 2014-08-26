var component = portal.component;

var params = {
	context: portal,
	component: component
};

//var body = system.thymeleaf.render('view/portfolio.html', params);
var thymeleaf = require('view/thymeleaf');
var view = resolve('/view/portfolio.html');
var body = thymeleaf.render(view, params);

portal.response.contentType = 'text/html';
portal.response.body = body;

