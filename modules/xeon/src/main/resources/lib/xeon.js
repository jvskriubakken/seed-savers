var menuService = require('menuService');
var contentService = require('contentService');

exports.getLogoUrl = function (req, moduleConfig) {
    var logoContent;
    var logo = moduleConfig.getProperty('logo');
    if (logo && !logo.hasNullValue()) {
        logoContent = contentService.getContentById(logo.getString());
    }

    if (logoContent) {
        return req.url.createImageByIdUrl(logoContent.id).filter("scaleblock(115,26)");
    } else {
        return req.url.createResourceUrl('images/logo.png');
    }
};

exports.defaultParams = function (req) {
    var content = req.content;
    var editMode = req.request.mode.toString() == 'edit';
    var moduleConfig = req.site.getModuleConfig(req.module.key);

    return {
        context: req,
        mainRegion: req.content.page.getRegion("main"),
        menuItems: menuService.getSiteMenuAsList(req.site),
        editable: editMode,
        banner: false,
        site: req.site,
        moduleConfig: moduleConfig,
        content: content,
        logoUrl: this.getLogoUrl(req, moduleConfig)
    }
};

exports.merge = function (o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
};

exports.ifNull = function (string, defaultString) {
    if (!string) {
        return defaultString;
    }
    return string;
};

exports.ifEmpty = function (string, defaultString) {
    if (!string) {
        return defaultString;
    }
    if (string == "") {
        return defaultString;
    }
    return string;
};