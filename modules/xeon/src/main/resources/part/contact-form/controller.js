var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var component = portal.component;
    var site = portal.site;

    var contentData = site.getModuleConfig(portal.module.key).getConfig();

    var social = {
        facebook: contentData.getProperty('facebook').getString(),
        twitter: contentData.getProperty('twitter').getString(),
        linkedin: contentData.getProperty('linkedin').getString(),
        google: contentData.getProperty('google').getString(),
        pintrest: contentData.getProperty('pintrest').getString(),
        youtube: contentData.getProperty('youtube').getString()
    };

    var addresses = site.contentData.getDataSetsByName('location');

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

//var body = system.thymeleaf.render('view/contact-form.html', params);
    var view = resolve('/view/contact-form.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;

