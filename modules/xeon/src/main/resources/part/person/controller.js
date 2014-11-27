var thymeleaf = require('/lib/view/thymeleaf');
var contentService = require('/lib/contentService');

function handleGet(req) {

    var component = req.component;
    var content = req.content;
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
        var personImageUrl = req.url.createResourceUrl('images/team1.jpg');
        if( imageProperty.getString() ) {
            personImageUrl = req.url.createImageByIdUrl(imageProperty.getContentId()).filter("scaleblock(400,400)");
        }
        person = {
            name: personContent.contentData.getProperty('first-name').getString() + ' ' +
                  personContent.contentData.getProperty('middle-name').getString() + ' ' +
                  personContent.contentData.getProperty('last-name').getString(),
            title: personContent.contentData.getProperty('job-title').getString(),
            image: personImageUrl
        };
    } else {
        person = {
            name: 'Test Testesen',
            title: 'Sjefen over alle sjefer',
            image: req.url.createResourceUrl('images/team1.jpg')
        };
    }

    var params = {
        context: req,
        component: component,
        content: content,
        person: person
    };


    var view = resolve('/view/person.html');
    var body = thymeleaf.render(view, params);

    return {
        body: body,
        contentType: 'text/html'
    };
}

exports.get = handleGet;