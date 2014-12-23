var menuService = require('menuService');
var contentService = require('contentService');

exports.getLogoUrl = function (req, moduleConfig) {
    var logoContent;
    var logo = moduleConfig['logo'];
    if (logo) {
        logoContent = contentService.getContentById(logo.getString());
    }

    if (logoContent) {
        return execute('portal.imageUrl', {
            id: logoContent.id,
            filter: 'scaleblock(115,26)'
        });
    } else {
        return execute('portal.assetUrl', {
            path: 'images/logo.png'
        });
    }
};

exports.defaultParams = function (req) {
    var content = req.content;
    var editMode = req.mode == 'edit';

    var moduleConfig = req.site.moduleConfigs[req.module];

    return {
        context: req,
        mainRegion: req.content.page.regions["main"],
        menuItems: menuService.getSiteMenu(req.site),
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

exports.ifEmpty = function (string, defaultString) {
    if (Array.isArray(string) && string.length > 0) {
        return string[0] || defaultString;
    }
    return string || defaultString;
};