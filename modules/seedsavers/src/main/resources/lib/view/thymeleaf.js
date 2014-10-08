exports.render = function (view, params) {

    return execute('view.renderThymeleaf', {
        view: view,
        parameters: params
    });

};