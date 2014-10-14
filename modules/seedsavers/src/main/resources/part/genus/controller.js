var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {

    var view = resolve('./genus.html');
    var genus;
    if( portal.content.isPageTemplate() ) {
        genus = {
            scientificName : "Scientific name",
            norwegianNames: Java.to(["navn1", "navn2", "navn3"], "java.lang.String[]")
        };
    }
    else {
        var contentData = portal.content.getContentData().toMap();
        genus = {
            scientificName : portal.content.displayName,
            norwegianNames: contentData.norwegianNames
        };
    }

    var params = {
        context: portal,
        component: portal.component,
        content: portal.content,
        genus: genus
    };
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;