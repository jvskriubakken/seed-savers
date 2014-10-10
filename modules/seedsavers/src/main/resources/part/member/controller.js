var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {

    var member;
    if( portal.content.isPageTemplate() ) {
        member = {
            name : "Member name"
        };
    }
    else {
        member = {
            name : portal.content.displayName
        };
    }

    var params = {
        context: portal,
        component: portal.component,
        config: portal.component.config.toMap(),
        content: portal.content,
        member: member
    };

    var view = resolve('./member.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;

}

exports.get = handleGet;
