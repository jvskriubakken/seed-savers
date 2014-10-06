var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {

    var editMode = portal.request.mode == 'edit';
    var view = resolve('./family.page.html');
    var params = {
        context: portal,
        site: portal.site,
        content: portal.content,
        pageRegions: portal.pageRegions,
        mainRegion: portal.pageRegions.getRegion("main"),
        editable: editMode
    };
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;

}


exports.get = handleGet;