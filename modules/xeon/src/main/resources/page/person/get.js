var content = portal.content;
var pageRegions = portal.pageRegions;
var site = portal.siteContent;
var contents = system.contentService.getChildContent(site.path);
var editMode = portal.request.mode == 'edit';

var xeonConfig = portal.siteContent.site.moduleConfigs.get('com.enonic.wem.modules.xeon-1.0.0').getConfig();

var params = {
	context: portal,
	pageRegions: pageRegions,
	mainRegion: pageRegions.getRegion("main"),
	contents: contents,
	editable: editMode,
	banner: false,
    site: site,
    moduleConfig: xeonConfig,
    content: content,
    logoUrl: getLogoUrl()
};

//var body = system.thymeleaf.render('view/page.html', params);
var thymeleaf = require('view/thymeleaf');
var view = resolve('/view/page.html');
var body = thymeleaf.render(view, params);

portal.response.contentType = 'text/html';
portal.response.body = body;

function getLogoUrl() {
    var logoContent;
    var logo = xeonConfig.getProperty('logo');
    if (logo) {
        logoContent = system.contentService.getContentById(logo.getString());
    }

    if (logoContent) {
        return portal.url.createImageByIdUrl(logoContent.id).filter("scaleblock(115,26)");
    } else {
        return portal.url.createResourceUrl('images/logo.png');
    }
}

