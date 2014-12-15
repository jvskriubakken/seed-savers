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
        var relatedPersonId = component.config.getContentId('person');
        if (relatedPersonId) {
            personId = relatedPersonId;
            if (personId) {
                personContent = contentService.getContentById(personId);
            }
        }
    }

    var imageId = null;
    if (personContent) {
        imageId = personContent.data.getContentId('image');
    }

    if (imageId) {
        personImageUrl = execute('portal.imageUrl', {
            id: imageId,
            filter: 'scaleblock(400,400)'
        });

        person = {
            name: personContent.data.getString('first-name') + ' ' +
                  personContent.data.getString('middle-name') + ' ' +
                  personContent.data.getString('last-name'),
            title: personContent.data.getString('job-title'),
            image: personImageUrl
        };
    } else {
        person = {
            name: 'Test Testesen',
            title: 'Sjefen over alle sjefer',
            image: execute('portal.assetUrl', {path: 'images/team1.jpg'})
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