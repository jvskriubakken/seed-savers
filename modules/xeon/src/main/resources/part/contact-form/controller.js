var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var component = portal.component;
    var site = portal.site;

    var xeonConfig = site.getModuleConfig(portal.module.key);

    var social = {
        facebook: xeonConfig.getProperty('facebook').getString(),
        twitter: xeonConfig.getProperty('twitter').getString(),
        linkedin: xeonConfig.getProperty('linkedin').getString(),
        google: xeonConfig.getProperty('google').getString(),
        pintrest: xeonConfig.getProperty('pintrest').getString(),
        youtube: xeonConfig.getProperty('youtube').getString()
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

    var view = resolve('/view/contact-form.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;

