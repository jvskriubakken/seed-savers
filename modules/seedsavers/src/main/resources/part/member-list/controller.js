var thymeleaf = require('/lib/view/thymeleaf');
var contentService = require('/lib/contentService');

function handleGet(req) {

    var reqComponent = execute('portal.getComponent');
    var maxCount = 100;
    var maxCountProperty = reqComponent.config.getProperty('maxCount');
    if( maxCountProperty && !maxCountProperty.hasNullValue() ) {
        maxCount = maxCountProperty.getLong();
    }

    var membersContent = contentService.getChildContent(req.site.getPath() + "/members", maxCount);

    var params = {
        component: reqComponent,
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
