exports.render = function(view, inputXml, params) {

    return execute('view.renderXstl', {
        view: view,
        inputXml: inputXml,
        parameters: params
    });

};