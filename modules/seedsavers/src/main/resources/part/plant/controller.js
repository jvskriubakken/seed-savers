var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {

    var view = resolve('./plant.html');
    var plant;
    if( req.content.isPageTemplate() ) {
        plant = {
            binomialName : "Binomial name",
            norwegianNames: Java.to(["navn1", "navn2", "navn3"], "java.lang.String[]")
        };
    }
    else {
        var contentData = req.content.getContentData().toMap();
        plant = {
            binomialName : contentData.binomialName ? contentData.binomialName[0] : "",
            norwegianNames: contentData.norwegianNames
        };
    }
    var params = {
        context: req,
        component: req.component,
        content: req.content,
        plant: plant
    };
    var body = thymeleaf.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;
