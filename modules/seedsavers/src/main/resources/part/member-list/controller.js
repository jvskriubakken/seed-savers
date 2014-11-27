var thymeleaf = require('/lib/view/thymeleaf');
var contentService = require('/lib/contentService');

function handleGet(req) {

    var maxCount = 100;
    var maxCountProperty = req.component.config.getProperty('maxCount');
    if( maxCountProperty && !maxCountProperty.hasNullValue() ) {
        maxCount = maxCountProperty.getLong();
    }

    var membersContent = contentService.getChildContent(req.site.getPath() + "/members", maxCount);

    var params = {
        context: req,
        component: req.component,
        maxCount: maxCount,
        members: membersContent
    };

    var view = resolve('./member-list.html');
    var body = thymeleaf.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;
