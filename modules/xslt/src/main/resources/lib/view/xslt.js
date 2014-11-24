exports.render = function(view, inputXml, params) {

    return execute('xslt.render', {
        view: view,
        // inputXml: inputXml,
        model: params
    });

};