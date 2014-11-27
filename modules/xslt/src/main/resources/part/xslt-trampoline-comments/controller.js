var view = resolve('/view/trampoline-comments.xsl');

function handleGet(req) {

    var editMode = req.mode == 'edit';
    var model = {
        title: req.content.displayName,
        componentType: req.component.type,
        editable: editMode
    };

    var body = execute('xslt.render', {
        view: view,
        model: model
    });

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;
