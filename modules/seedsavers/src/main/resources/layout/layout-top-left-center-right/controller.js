var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {

    var editMode = portal.request.mode == 'edit';
    var component = portal.component;
    var layoutRegions = portal.layoutRegions;
    var view = resolve('./layout-top-left-center-right.html');

    var params = {
        editable: editMode,
        component: component,
        topRegion: layoutRegions.getRegion("top"),
        leftRegion: layoutRegions.getRegion("left"),
        centerRegion: layoutRegions.getRegion("center"),
        rightRegion: layoutRegions.getRegion("right")
    };

    var body = thymeleaf.render(view, params);


    portal.response.body = body;
    portal.response.contentType = 'text/html';
    portal.response.status = 200;
}

exports.get = handleGet;