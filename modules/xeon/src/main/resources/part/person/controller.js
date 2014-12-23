var thymeleaf = require('/lib/view/thymeleaf');
var contentService = require('/lib/contentService');

function getSingleValue(val, def) {
    if (val && val.length > 0) {
        return val[0];
    }
    return def;
}

function handleGet(req) {

    var component = execute('portal.getComponent');
    var content = execute('portal.getContent');
    var person;
    var personContent;

    if (content.type == 'com.enonic.wem.modules.xeon:person') {
        personContent = content;
    } else {
        var personId;
        var relatedPersonId = getSingleValue(component.config['person']);
        if (relatedPersonId) {
            personId = relatedPersonId;
            if (personId) {
                personContent = contentService.getContentById(personId);
            }
        }
    }

    var imageId = null;
    if (personContent) {
        imageId = getSingleValue(personContent.data['image']);
    }

    if (imageId) {
        personImageUrl = execute('portal.imageUrl', {
            id: imageId,
            filter: 'scaleblock(400,400)'
        });

        person = {
            name: getSingleValue(personContent.data['first-name'], '') + ' ' +
                  getSingleValue(personContent.data['middle-name'], '') + ' ' +
                  getSingleValue(personContent.data['last-name'], ''),
            title: getSingleValue(personContent.data['job-title'], ''),
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