var params = {
	context: portal,
	component: portal.component,
    content: portal.content,
    contentData: portal.content.getContentData().toMap()
};

var thymeleaf = require('view/thymeleaf');
var view = resolve('./member.html');
var body = thymeleaf.render(view, params);

portal.response.contentType = 'text/html';
portal.response.body = body;
