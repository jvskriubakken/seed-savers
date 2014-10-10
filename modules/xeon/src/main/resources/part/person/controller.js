var thymeleaf = require('view/thymeleaf');
var contentService = require('contentService');

function handleGet(portal) {

    var component = portal.component;
    var content = portal.content;
    var person;
    var personContent;

    if (content.type.toString() == 'com.enonic.wem.modules.xeon:person') {
        personContent = content;
    } else {
        var personId;
        var relatedPerson = component.config.getProperty('person');
        if (relatedPerson) {
            personId = relatedPerson.getString();
            if (personId) {
                personContent = contentService.getContentById(personId);
            }
        }
    }

    var imageProperty = null;
    if (personContent) {
        imageProperty = personContent.contentData.getProperty('image');
    }

    if (personContent && imageProperty) {
        var imageContent = contentService.getContentById(imageProperty.getString());
        person = {
            name: personContent.contentData.getProperty('first-name').getString() + ' ' +
                  personContent.contentData.getProperty('middle-name').getString() + ' ' +
                  personContent.contentData.getProperty('last-name').getString(),
            title: personContent.contentData.getProperty('job-title').getString(),
            image: portal.url.createImageByIdUrl(imageContent.id).filter("scaleblock(400,400)")
        };
    } else {
        person = {
            name: 'Test Testesen',
            title: 'Sjefen over alle sjefer',
            image: portal.url.createResourceUrl('images/team1.jpg')
        };
    }

    var params = {
        context: portal,
        component: component,
        content: content,
        person: person
    };


    var view = resolve('/view/person.html');
    var body = thymeleaf.render(view, params);

    portal.response.contentType = 'text/html';
    portal.response.body = body;
}

function log(text) {
    java.lang.System.out.println(text);
}

exports.get = handleGet;