var menuService = require('menuService');
var contentService = require('contentService');

exports.getLogoUrl = function(portal, moduleConfig) {
    var logoContent;
    var logo = moduleConfig.getProperty('logo');
    if (logo && !logo.hasNullValue()) {
        logoContent = contentService.getContentById(logo.getString());
    }

    if (logoContent) {
        return portal.url.createImageByIdUrl(logoContent.id).filter("scaleblock(115,26)");
    } else {
        return portal.url.createResourceUrl('images/logo.png');
    }
};

exports.defaultParams = function(portal) {
    var content = portal.content;
    var editMode = portal.request.mode.toString() == 'edit';
    var moduleConfig = portal.site.getModuleConfig(portal.module.key);

    return {
        context: portal,
        mainRegion: portal.content.page.getRegion("main"),
        menuItems: menuService.getSiteMenuAsList(portal.site),
        editable: editMode,
        banner: false,
        site: portal.site,
        moduleConfig: moduleConfig,
        content: content,
        logoUrl: this.getLogoUrl(portal, moduleConfig)
    }
};

exports.merge = function(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
};
