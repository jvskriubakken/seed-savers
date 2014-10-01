exports.render = function(view, params) {

    return executeCommand('com.enonic.wem.mustache.RenderView', {
        view: view,
        parameters: params
    });

};