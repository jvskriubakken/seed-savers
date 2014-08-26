var component = portal.component;

var slides = component.config.dataSets('slide');



var params = {
	context: portal,
	component: component,
	slides: slides
};

//var body = system.thymeleaf.render('view/pricing.html', params);
var thymeleaf = require('view/thymeleaf');
var view = resolve('/view/pricing.html');
var body = thymeleaf.render(view, params);

portal.response.contentType = 'text/html';
portal.response.body = body;

