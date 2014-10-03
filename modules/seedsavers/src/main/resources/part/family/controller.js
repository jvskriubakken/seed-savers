var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {

    var view = resolve('./family.html');
    var family;
    if( portal.content.isPageTemplate() ) {
        family = {
            scientificName : "Scientific name",
            norwegianNames: Java.to(["navn1", "navn2", "navn3"], "java.lang.String[]")
        };
    }
    else {
        var contentData = portal.content.getContentData().toMap();
        family = {
            scientificName : portal.content.displayName,
            norwegianNames: contentData.norwegianNames
        };
    }

    var params = {
        context: portal,
        component: portal.component,
        content: portal.content,
        family: family
    };
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;