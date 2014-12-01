var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {

    var view = resolve('./genus.html');
    var genus;
    if( req.content.isPageTemplate() ) {
        genus = {
            scientificName : "Scientific name",
            norwegianNames: Java.to(["navn1", "navn2", "navn3"], "java.lang.String[]")
        };
    }
    else {
        var contentData = req.content.data;
        genus = {
            scientificName : req.content.displayName,
            norwegianNames: contentData.norwegianNames
        };
    }

    var params = {
        context: req,
        component: req.component,
        content: req.content,
        genus: genus
    };
    var body = thymeleaf.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;
