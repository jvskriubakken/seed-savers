var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var site = portal.siteContent;
    var editMode = portal.request.mode == 'edit';

    var view = resolve('./top-left-center-right.page.html');
    var params = {
        context: portal,
        site: portal.siteContent,
        content: portal.content,
        pageRegions: portal.pageRegions,
        mainRegion: portal.pageRegions.getRegion("main"),
        editable: editMode,
        from: "site"
    };
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;


