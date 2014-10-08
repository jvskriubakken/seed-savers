exports.render = function(view, params) {

    return execute('com.enonic.wem.mustache.RenderView', {
        view: view,
        parameters: params
    });

};