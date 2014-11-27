var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {
    var view = resolve('./caretakings.html');
    var params = {
        context: req,
        component: req.component,
        content: req.content,
        contentData: req.content.getContentData().toMap()
    };
    var body = thymeleaf.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;
