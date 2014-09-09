var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var component = portal.component;

    var params = {
        context: portal,
        component: component
    };

//var body = system.thymeleaf.render('view/services.html', params);

    var view = resolve('/view/services.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;