var editMode = portal.request.mode == 'edit';

var content = execute('portal.getContent');
var component = execute('portal.getComponent');

var thymeleaf = require('view/thymeleaf');
var view = resolve('/view/layout-3-col.html');
var body = thymeleaf.render(view, {
    title: content.displayName,
    path: content.path,
    name: content.name,
    editable: editMode,
    resourcesPath: execute('portal.assetUrl', {}),
    component: component,
    leftRegion: component.getRegion("left"),
    centerRegion: component.getRegion("center"),
    rightRegion: component.getRegion("right")
});


portal.response.body = body;
portal.response.contentType = 'text/html';
portal.response.status = 200;
