var thymeleaf = require('/lib/view/thymeleaf');

function handleGet(req) {
    var component = req.component;
    var page = req.content.page;

    var title, text = "";

    if (component.config.getProperty("title") && component.config.getProperty("title").getString() != "") {
        title = component.config.getProperty("title").getString();
    } else {
        title = req.content.displayName;
    }

    if (component.config.getProperty("text") && component.config.getProperty("text").getString() != "") {
        text = component.config.getProperty("text").getString();
    }

    var params = {
        context: req,
        component: component,
        title: title,
        text: text
    };

    var view = resolve('/view/header.html');
    var body = thymeleaf.render(view, params);

    return {
        body: body,
        contentType: 'text/html'
    };
}

exports.get = handleGet;
