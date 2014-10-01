exports.render = function(view, inputXml, params) {

    return executeCommand('com.enonic.wem.xslt.RenderView', {
        view: view,
        inputXml: inputXml,
        parameters: params
    });

};