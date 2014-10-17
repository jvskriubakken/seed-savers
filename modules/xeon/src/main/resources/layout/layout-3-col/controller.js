var thymeleaf = require('view/thymeleaf');

exports.get = function (portal) {
    var editMode = portal.request.mode == 'edit';

    var content = portal.content;
    var component = portal.component;

    var view = resolve('/view/layout-3-col.html');
    var body = thymeleaf.render(view, {
        title: content.displayName,
        path: content.path,
        name: content.name,
        editable: editMode,
        resourcesPath: portal.url.createResourceUrl(''),
        component: component,
        leftRegion: component.getRegion("left"),
        centerRegion: component.getRegion("center"),
        rightRegion: component.getRegion("right")
    });

    portal.response.body = body;
    portal.response.contentType = 'text/html';
    portal.response.status = 200;
};
