exports.render = function (view, params) {

    return execute('thymeleaf.render', {
        view: view,
        parameters: params
    });

};