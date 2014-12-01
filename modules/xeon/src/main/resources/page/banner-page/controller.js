var xeon = require('/lib/xeon');
var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {
    var page = req.content.page;
    var slides = page ? page.config.getSets("slide") : [];
    var pageParams = {
        slides: slides,
        banner: true
    };
    var params = xeon.merge(xeon.defaultParams(req), pageParams);

    var view = resolve('../../view/page.html');
    var body = thymeleaf.render(view, params);

    return {
        body: body,
        contentType: 'text/html'
    };
}

exports.get = handleGet;
