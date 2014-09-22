var xslt = require('view/xslt');
var view = resolve('/view/header-component.xsl');

function handleGet(portal) {
    var xml = <dummy/>;
    var editMode = portal.request.mode == 'edit';
    var params = {
        title: portal.content.displayName,
        componentType: portal.component.type,
        editable: editMode
    };

    var body = xslt.render(view, xml, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;
