var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {

    var editMode = portal.request.mode == 'edit';
    var view = resolve('./genus.page.html');
    var params = {
        context: portal,
        site: portal.site,
        content: portal.content,
        mainRegion: portal.content.page.getRegion("main"),
        editable: editMode
    };
    var body = thymeleaf.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };

}


exports.get = handleGet;
