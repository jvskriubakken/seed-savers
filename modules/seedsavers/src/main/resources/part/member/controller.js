var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {

    var member;
    if( portal.content.isPageTemplate() ) {
        member = {
            name : ["Member name"],
            address : Java.to([{
                street : ["Street"],
                postalCode: ["Postal code"],
                postalPlace: ["Postal place"]
            }
            ], "java.util.Map[]")
        };
    }
    else {
        var data = portal.content.contentData.toMap();
        member = data;
        /*
        member = {
            name : portal.content.displayName,
            address : data.address ? data.address : []
        };*/
    }

    var params = {
        context: portal,
        component: portal.component,
        config: portal.component.config.toMap(),
        content: portal.content,
        member: member
    };

    var view = resolve('./member.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;

}

exports.get = handleGet;
