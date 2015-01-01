var thymeleaf = require('/lib/view/thymeleaf');
var contentService = require('/lib/contentService');

function handleGet() {

    var site = execute('portal.getSite');
    var reqComponent = execute('portal.getComponent');
    var maxCount = 100;
    var maxCountProperty = reqComponent.config.maxCount;
    if( maxCountProperty && !maxCountProperty.hasNullValue() ) {
        maxCount = maxCountProperty.getLong();
    }

    var membersResult = contentService.getChildren(site._path + "/members", maxCount);
    var membersContent = membersResult.contents;
    var membersTotal = membersResult.total;

    var params = {
        component: reqComponent,
        maxCount: maxCount,
        members: membersContent,
        membersTotal: membersTotal
    };

    var view = resolve('./member-list.html');
    var body = thymeleaf.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;
