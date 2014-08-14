var component = portal.component;
var site = portal.siteContent;

var contentData = portal.siteContent.site.moduleConfigs.get('com.enonic.wem.modules.xeon-1.0.0').getConfig();

var social = {
    facebook: contentData.getProperty('facebook').getString(),
    twitter: contentData.getProperty('twitter').getString(),
    linkedin: contentData.getProperty('linkedin').getString(),
    google: contentData.getProperty('google').getString(),
    pintrest: contentData.getProperty('pintrest').getString(),
    youtube: contentData.getProperty('youtube').getString()
};

var addresses = site.contentData.dataSets('location');

var data = {
    social: social,
    addresses: addresses
};

var params = {
	context: portal,
	component: component,
    site: site,
    data: data
};

var body = system.thymeleaf.render('view/contact-form.html', params);

portal.response.contentType = 'text/html';
portal.response.body = body;
