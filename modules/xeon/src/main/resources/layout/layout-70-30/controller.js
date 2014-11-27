var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {
    var editMode = req.mode == 'edit';

    var content = req.content;
    var component = req.component;

    var view = resolve('/view/layout-70-30.html');
    var body = thymeleaf.render(view, {
        title: content.displayName,
        path: content.path,
        name: content.name,
        editable: editMode,
        resourcesPath: req.url.createResourceUrl(''),
        component: component,
        leftRegion: component.getRegion("left"),
        rightRegion: component.getRegion("right")
    });

    return {
        body: body,
        contentType: 'text/html'
    };
}

exports.get = handleGet;
