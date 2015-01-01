var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {

    var reqContent = execute('portal.getContent');
    var reqComponent = execute('portal.getComponent');
    var view = resolve('./genus.html');
    var genus;
    if( reqContent.isPageTemplate ) {
        genus = {
            scientificName : "Scientific name",
            norwegianNames: Java.to(["navn1", "navn2", "navn3"], "java.lang.String[]")
        };
    }
    else {
        genus = {
            scientificName : reqContent.displayName,
            norwegianNames: reqContent.data.norwegianNames
        };
    }

    var params = {
        component: reqComponent,
        content: reqContent,
        genus: genus
    };
    var body = thymeleaf.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;
