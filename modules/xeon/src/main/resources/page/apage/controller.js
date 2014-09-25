var contentService = require('contentService');
var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var content = portal.content;
    var pageRegions = portal.pageRegions;
    var site = portal.siteContent;
    var editMode = portal.request.mode == 'edit';

    var xeonConfig = portal.siteContent.site.moduleConfigs.get('com.enonic.wem.modules.xeon').getConfig();

    var params = {
        context: portal,
        pageRegions: pageRegions,
        mainRegion: pageRegions.getRegion("main"),
        contents: getContentsWithoutImages(),
        editable: editMode,
        banner: false,
        site: site,
        moduleConfig: xeonConfig,
        content: content,
        logoUrl: getLogoUrl(portal)
    };

    // var body = system.thymeleaf.render('view/page.html', params);

    var view = resolve('view/page.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

function getContentsWithoutImages() {
    var contents = contentService.getChildContent(site.path).getList().toArray();
    var noImagesContent = [];
    for (var i = 0; i <contents.length; i++) {
        if (contents[i].type.getContentTypeName() != "image") {
            noImagesContent.push(contents[i]);
        }
    }

    return noImagesContent;
}

function getLogoUrl(portal) {
    var logoContent;
    var logo = xeonConfig.getProperty('logo');
    if (logo) {
        logoContent = contentService.getContentById(logo.getString());
    }

    if (logoContent) {
        return portal.url.createImageByIdUrl(logoContent.id).filter("scaleblock(115,26)");
    } else {
        return portal.url.createResourceUrl('images/logo.png');
    }
}