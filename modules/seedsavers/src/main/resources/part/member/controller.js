var thymeleaf = require('view/thymeleaf');

var defaultMember = {
    name: ["Member name"],
    address: Java.to([
        {
            street: ["Street"],
            postalCode: ["Postal code"],
            postalPlace: ["Postal place"]
        }
    ], "java.util.Map[]")
};

function handleGet(portal) {


    var member;
    if (portal.content.isPageTemplate()) {
        member = defaultMember;
    }
    else {
        var data = portal.content.contentData.toMap();
        member = !data.isEmpty() ? data : defaultMember;
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
