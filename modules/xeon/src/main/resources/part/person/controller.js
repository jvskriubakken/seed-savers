var thymeleaf = require('/lib/view/thymeleaf');
var contentService = require('/lib/contentService');

function getSingleValue(val, def) {
    if (val && (val.length > 0)) {
        if (val[0] != null) {
            return val[0];
        }
    }
    return def;
}

function handleGet(req) {

    var component = execute('portal.getComponent');
    var content = execute('portal.getContent');
    var personContent,
        personName,
        personTitle,
        imageId,
        personImageUrl;

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

    if (personContent) {
        personName = [
            getSingleValue(personContent.data['first-name'], ''),
            getSingleValue(personContent.data['middle-name'], ''),
            getSingleValue(personContent.data['last-name'], '')
        ].join(' ').trim();
        personTitle = getSingleValue(personContent.data['job-title'], '');
        imageId = getSingleValue(personContent.data['image']);
    }

    if (imageId) {
        personImageUrl = execute('portal.imageUrl', {id: imageId, filter: 'scaleblock(400,400)'});
    } else {
        personImageUrl = execute('portal.assetUrl', {path: 'images/team1.jpg'});
    }
    personName = personName || 'Test Testesen';
    personTitle = personTitle || 'Sjefen over alle sjefer';

    var params = {
        context: req,
        component: component,
        content: content,
        person: {
            name: personName,
            title: personTitle,
            image: personImageUrl
        }
    };


    var view = resolve('/view/person.html');
    var body = thymeleaf.render(view, params);

    return {
        body: body,
        contentType: 'text/html'
    };
}

exports.get = handleGet;