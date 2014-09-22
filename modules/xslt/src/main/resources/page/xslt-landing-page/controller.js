var xslt = require('view/xslt');
var view = resolve('/view/frogger.xsl');

function handleGet(portal) {

    var xml = <dummy/>;
    var editMode = portal.request.mode == 'edit';
    var params = {
        title: portal.content.displayName,
        editable: editMode
    };

    var body = system.xslt.render(view, xml, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

function log(text) {
    java.lang.System.out.println(text);
}

exports.get = handleGet;
