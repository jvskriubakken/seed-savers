var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var editMode = portal.request.mode == 'edit';

    var content = portal.content;
    var component = portal.component;
    var layoutRegions = portal.layoutRegions;

    var view = resolve('/view/layout-70-30.html');
    var body = thymeleaf.render(view, {
        title: content.displayName,
        path: content.path,
        name: content.name,
        editable: editMode,
        resourcesPath: portal.url.createResourceUrl(''),
        component: component,
        leftRegion: layoutRegions.getRegion("left"),
        rightRegion: layoutRegions.getRegion("right")
    });


    portal.response.body = body;
    portal.response.contentType = 'text/html';
    portal.response.status = 200;
}

exports.get = handleGet;
