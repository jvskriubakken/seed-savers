var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {

    var editMode = req.mode == 'edit';
    var view = resolve('./plant.page.html');
    var params = {
        context: req,
        site: req.site,
        content: req.content,
        mainRegion: req.content.page.getRegion("main"),
        editable: editMode,
        from: "plant"
    };
    var body = thymeleaf.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;
