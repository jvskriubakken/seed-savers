var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {

    var editMode = portal.request.mode == 'edit';
    var view = resolve('./member.page.html');
    var params = {
        context: portal,
        site: portal.site,
        content: portal.content,
        pageConfig: portal.content.page.config.toMap(),
        mainRegion: portal.content.page.getRegion("main"),
        editable: editMode,
        from: "member"
    };
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;