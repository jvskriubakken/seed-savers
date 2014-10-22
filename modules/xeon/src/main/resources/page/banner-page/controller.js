var xeon = require('xeon');
var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var page = portal.content.page;
    var slides = page ? page.config.getDataSetsByName("slide") : [];
    var pageParams = {
        slides: slides,
        banner: true
    };
    var params = xeon.merge(xeon.defaultParams(portal), pageParams);

    var view = resolve('../../view/page.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;
