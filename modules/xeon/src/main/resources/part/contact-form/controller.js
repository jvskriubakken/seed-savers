var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {
    var component = req.component;
    var site = req.site;

    var xeonConfig = site.getModuleConfig(req.module.key);

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
        context: req,
        component: component,
        site: site,
        data: data
    };

    var view = resolve('/view/contact-form.html');
    var body = thymeleaf.render(view, params);

    return {
        body: body,
        contentType: 'text/html'
    };
}

exports.get = handleGet;

