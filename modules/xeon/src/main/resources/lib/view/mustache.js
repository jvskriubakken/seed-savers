exports.render = function (view, params) {

    return execute('mustache.render', {
        view: view,
        parameters: params
    });

};
