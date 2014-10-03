var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {

    var view = resolve('./plant.html');
    var plant;
    if( portal.content.isPageTemplate() ) {
        plant = {
            binomialName : "Binomial name",
            norwegianNames: Java.to(["navn1", "navn2", "navn3"], "java.lang.String[]")
        };
    }
    else {
        var contentData = portal.content.getContentData().toMap();
        plant = {
            binomialName : contentData.binomialName ? contentData.binomialName[0] : "",
            norwegianNames: contentData.norwegianNames
        };
    }
    var params = {
        context: portal,
        component: portal.component,
        content: portal.content,
        plant: plant
    };
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;