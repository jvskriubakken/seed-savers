var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var component = portal.component;
    var slides = component.config.getDataSetsByName("slide");

    var params = {
        context: portal,
        component: component,
        slides: slides
    };

    var view = resolve('/view/banner.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;
