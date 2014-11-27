var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {

    var editMode = req.mode == 'edit';
    var component = req.component;
    var view = resolve('./left-main-right.html');

    var params = {
        editable: editMode,
        component: component,
        leftRegion: component.getRegion("left"),
        mainRegion: component.getRegion("main"),
        rightRegion: component.getRegion("right")
    };

    var body = thymeleaf.render(view, params);

    return {
        body: body,
        contentType: 'text/html',
        status: 200
    };
}

exports.get = handleGet;
