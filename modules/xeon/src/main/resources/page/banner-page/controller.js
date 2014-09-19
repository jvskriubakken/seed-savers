var contentService = require('contentService');
var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var content = portal.content;
    var pageRegions = portal.pageRegions;
    var site = portal.siteContent;
    var editMode = portal.request.mode == 'edit';
    var slides = content.hasPage()? content.pageConfig["slide"] : [];

    var xeonConfig = site.getModuleConfig('com.enonic.wem.modules.xeon');

    var params = {
        context: portal,
        pageRegions: pageRegions,
        mainRegion: pageRegions.getRegion("main"),
        contents: contentService.getChildContents(site.path),
        editable: editMode,
        banner: true,
        slides: slides,
        site: site,
        moduleConfig: xeonConfig,
        content: content,
        logoUrl: getLogoUrl(portal, xeonConfig)
    };

    var view = resolve('../../view/page.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

function getLogoUrl(portal, xeonConfig) {
    var logoContent;
    var logo = xeonConfig['logo'];
    if (logo) {
        logoContent = contentService.getContentById(logo);
    }

    if (logoContent) {
        return portal.url.createImageByIdUrl(logoContent.id).filter("scaleblock(115,26)");
    } else {
        return portal.url.createResourceUrl('images/logo.png');
    }
}

exports.get = handleGet;
