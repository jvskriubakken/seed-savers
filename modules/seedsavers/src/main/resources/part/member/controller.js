var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var params = {
        context: portal,
        component: portal.component,
        content: portal.content,
        contentData: portal.content.getContentData().toMap()
    };

    var view = resolve('./member.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;

}

exports.get = handleGet;
