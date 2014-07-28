var params = {
	context: portal,
	component: portal.component,
    content: portal.content,
    contentData: portal.content.getContentData().toMap()
};

var body = system.thymeleaf.render('component/caretakings/caretakings.html', params);

portal.response.contentType = 'text/html';
portal.response.body = body;
