var thymeleaf = require('/lib/view/thymeleaf');

exports.get = function (req) {
    var editMode = req.mode == 'edit';

    var content = req.content;
    var component = req.component;

    var view = resolve('/view/layout-3-col.html');
    var body = thymeleaf.render(view, {
        title: content.displayName,
        path: content.path,
        name: content.name,
        editable: editMode,
        resourcesPath: req.url.createResourceUrl(''),
        component: component,
        leftRegion: component.getRegion("left"),
        centerRegion: component.getRegion("center"),
        rightRegion: component.getRegion("right")
    });

    return {
        body: body,
        contentType: 'text/html'
    };
};
