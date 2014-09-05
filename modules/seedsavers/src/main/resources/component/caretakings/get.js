var thymeleaf = require('view/thymeleaf');
var view = resolve('./caretakings.html');
var params = {
    context: portal,
    component: portal.component,
    content: portal.content,
    contentData: portal.content.getContentData().toMap()
};
var body = thymeleaf.render(view, params);

portal.response.contentType = 'text/html';
portal.response.body = body;
