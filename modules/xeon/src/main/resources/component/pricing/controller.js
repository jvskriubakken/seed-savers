var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var component = portal.component;

    var slides = component.config.getDataSetsByName('slide');


    var params = {
        context: portal,
        component: component,
        slides: slides
    };

//var body = system.thymeleaf.render('view/pricing.html', params);

    var view = resolve('/view/pricing.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;