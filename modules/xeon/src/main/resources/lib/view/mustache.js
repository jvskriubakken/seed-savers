exports.render = function (view, params) {

    return execute('view.renderMustache', {
        view: view,
        parameters: params
    });

};
