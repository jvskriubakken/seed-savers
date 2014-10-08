exports.render = function(view, params) {

    return execute('com.enonic.wem.thymeleaf.RenderView', {
        view: view,
        parameters: params
    });

};