var thymeleaf = require('/lib/view/thymeleaf');

var defaultMember = {
    name: "Member name",
    address: [
        {
            street: "Street",
            postalCode: "Postal code",
            postalPlace: "Postal place"
        }
    ]
};

function handleGet(req) {

    var member;
    if (req.content.isPageTemplate()) {
        member = defaultMember;
    }
    else {
        var data = req.content.data;
        member = data.getTotalSize() > 0 ? dataToMember(data) : defaultMember;
    }

    var params = {
        context: req,
        component: req.component,
        config: req.component.config,
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

function dataToMember(data) {

    var address = {
        street: data.getString("address.street"),
        postalCode: data.getString("address.postalCode"),
        postalPlace: data.getString("address.postalPlace")
    };
    return {
        name : data.getString("name"),
        address : [address]
    };
}

exports.get = handleGet;
