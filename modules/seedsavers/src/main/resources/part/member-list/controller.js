var thymeleaf = require('view/thymeleaf');
var contentService = require('contentService');

function handleGet(portal) {

    var maxCount = 100;
    var maxCountProperty = portal.component.config.getProperty('maxCount');
    if( maxCountProperty && !maxCountProperty.hasNullValue() ) {
        maxCount = maxCountProperty.getLong();
    }

    var membersContent = contentService.getChildContent(portal.site.getPath() + "/members", maxCount);

    var params = {
        context: portal,
        component: portal.component,
        maxCount: maxCount,
        members: membersContent
    };

    var view = resolve('./member-list.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;

}

exports.get = handleGet;
