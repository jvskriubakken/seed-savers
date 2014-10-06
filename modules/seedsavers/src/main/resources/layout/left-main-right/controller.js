var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {

    var editMode = portal.request.mode == 'edit';
    var component = portal.component;
    var layoutRegions = portal.layoutRegions;
    var view = resolve('./left-main-right.html');

    var params = {
        editable: editMode,
        component: component,
        leftRegion: layoutRegions.getRegion("left"),
        mainRegion: layoutRegions.getRegion("main"),
        rightRegion: layoutRegions.getRegion("right")
    };
    var body = thymeleaf.render(view, params);


    portal.response.body = body;
    portal.response.contentType = 'text/html';
    portal.response.status = 200;
}

exports.get = handleGet;
