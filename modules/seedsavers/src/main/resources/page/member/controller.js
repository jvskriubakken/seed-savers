var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {

    var editMode = req.mode == 'edit';
    var view = resolve('./member.page.html');


    var defaultMenu = {
        menu: [false],
        menuName: [req.content.displayName]
    };

    var menu;
    if( req.content.hasMetadata("system:menu-item") ) {
        menu = req.content.getMetadata("system:menu-item").toMap();
    }
    else {
        menu = defaultMenu;
    }


    var params = {
        context: req,
        site: req.site,
        content: req.content,
        pageConfig: req.content.page.config.toMap(),
        mainRegion: req.content.page.getRegion("main"),
        editable: editMode,
        menu: menu
    };
    var body = thymeleaf.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;
