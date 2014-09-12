var contentService = require('contentService');
var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var content = portal.content;
    var page = portal.content.page;
    var pageRegions = portal.pageRegions;
    var site = portal.siteContent;
    var editMode = portal.request.mode == 'edit';
    var slides = page ? page.config.getDataSetsByName("slide") : [];

    var xeonConfig = portal.siteContent.site.moduleConfigs.get('com.enonic.wem.modules.xeon-1.0.0').getConfig();

    var params = {
        context: portal,
        pageRegions: pageRegions,
        mainRegion: pageRegions.getRegion("main"),
        contents: contentService.getChildContent(site.path),
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
    var logo = xeonConfig.getProperty('logo');
    if (logo && logo.getString()) {
        logoContent = contentService.getContentById(logo.getString());
    }

    if (logoContent) {
        return portal.url.createImageByIdUrl(logoContent.id).filter("scaleblock(115,26)");
    } else {
        return portal.url.createResourceUrl('images/logo.png');
    }
}

exports.get = handleGet;
