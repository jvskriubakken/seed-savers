var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {

    var editMode = req.mode == 'edit';
    var view = resolve('./top-main.page.html');
    var params = {
        context: req,
        site: req.site,
        content: req.content,
        topRegion: req.content.page.getRegion("top"),
        mainRegion: req.content.page.getRegion("main"),
        editable: editMode
    };
    var body = thymeleaf.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;
