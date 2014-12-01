var thymeleaf = require('/lib/view/thymeleaf');
var contentService = require('/lib/contentService');
var xeon = require('xeon');

function handleGet(req) {
    var component = req.component;
    var relatedPersonsId = Java.from(component.config.getContentIds("person"));
    var persons = [];

    relatedPersonsId.forEach(function (relatedPersonId) {
        var personData = contentService.getContentById(relatedPersonId);
        var imageContent = contentService.getContentById(personData.data.getContentId('image'));
        persons.push({
            name: personData.data.getString('first-name') + ' ' +
                  personData.data.getString('middle-name') + ' ' +
                  personData.data.getString('last-name'),
            title: personData.data.getString('job-title'),
            image: req.url.createImageByIdUrl(imageContent.id).filter("scaleblock(400,400)")
        });
    });

    var data = {
        title: xeon.ifEmpty(component.config.getString('title'), "Please configure"),
        text: xeon.ifEmpty(component.config.getString('text'), ""),
        persons: Java.to(persons, "java.util.Map[]")
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
