var thymeleaf = require('/lib/view/thymeleaf');
var contentService = require('/lib/contentService');
var xeon = require('xeon');

function getSingleValue(val, def) {
    if (val && val.length > 0) {
        return val[0];
    }
    return def;
}

function handleGet(req) {
    var component = req.component;
    var relatedPersonsId = component.config["person"] || [];
    var persons = [];

    relatedPersonsId.forEach(function (relatedPersonId) {
        var personData = contentService.getContentById(relatedPersonId);
        var imageContent = contentService.getContentById(personData.data['image'][0]);
        persons.push({
            name: getSingleValue(personData.data['first-name'], '') + ' ' +
                  getSingleValue(personData.data['middle-name'], '') + ' ' +
                  getSingleValue(personData.data['last-name'], ''),
            title: getSingleValue(personData.data['job-title']),

            image: execute('portal.imageUrl', {
                id: imageContent._id,
                filter: "scaleblock(400,400)"
            })
        });
    });

    var data = {
        title: xeon.ifEmpty(component.config['title'], "Please configure"),
        text: xeon.ifEmpty(component.config['text'], ""),
        persons: persons
    };

    var params = {
        context: req,
        component: component,
        data: data
    };


    var view = resolve('/view/person-list.html');
    var body = thymeleaf.render(view, params);

    return {
        body: body,
        contentType: 'text/html'
    };
}

exports.get = handleGet;
