exports.render = function(view, inputXml, params) {

    return execute('com.enonic.wem.xslt.RenderView', {
        view: view,
        inputXml: inputXml,
        parameters: params
    });

};