exports.render = function(view, params) {

    return executeCommand('com.enonic.wem.thymeleaf.RenderView', {
        view: view,
        parameters: params
    });

};