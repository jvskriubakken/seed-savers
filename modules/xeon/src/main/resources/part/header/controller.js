var thymeleaf = require('view/thymeleaf');

function handleGet(portal) {
    var component = portal.component;
    var page = portal.content.page;

    var title, text = "";

    if (component.config.getProperty("title") && component.config.getProperty("title").getString() != "") {
        title = component.config.getProperty("title").getString();
    } else {
        title = portal.content.displayName;
    }

    if (component.config.getProperty("text") && component.config.getProperty("text").getString() != "") {
        text = component.config.getProperty("text").getString();
    }

    var params = {
        context: portal,
        component: component,
        title: title,
        text: text
    };

    var view = resolve('/view/header.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

exports.get = handleGet;
