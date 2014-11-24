var xslt = require('view/xslt');
var view = resolve('/view/frogger.xsl');

function handleGet(portal) {

    var editMode = portal.request.mode == 'edit';
    var model = {
        title: portal.content.displayName,
        editable: editMode
    };

    var body = execute('xslt.render', {
        view: view,
        model: model
    });

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;
