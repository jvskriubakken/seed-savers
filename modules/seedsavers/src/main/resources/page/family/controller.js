var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {

    var editMode = req.mode == 'edit';
    var view = resolve('./family.page.html');
    var model = {
        context: req,
        site: req.site,
        content: req.content,
        mainRegion: req.content.page.getRegion("main"),
        editable: editMode
    };
    var body = thymeleaf.render(view, model);

    return {
        contentType: 'text/html',
        body: body
    };

}

exports.get = handleGet;
