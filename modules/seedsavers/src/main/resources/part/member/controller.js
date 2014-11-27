var thymeleaf = require('/lib/view/thymeleaf');

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

function handleGet(req) {


    var member;
    if (req.content.isPageTemplate()) {
        member = defaultMember;
    }
    else {
        var data = req.content.contentData.toMap();
        member = !data.isEmpty() ? data : defaultMember;
    }

    var params = {
        context: req,
        component: req.component,
        config: req.component.config.toMap(),
        content: req.content,
        member: member
    };

    var view = resolve('./member.html');
    var body = thymeleaf.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;
