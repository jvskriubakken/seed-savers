var xeon = require('xeon');
var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var params = xeon.defaultParams(portal);

    var view = resolve('../../view/page.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;
