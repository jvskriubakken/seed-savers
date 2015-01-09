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
    var relatedPersonsId = component.config['person'] || [];
    var persons = [];

    var defaultPersonImageUrl = execute('portal.assetUrl', {path: 'images/team1.jpg'});

    relatedPersonsId.forEach(function (relatedPersonId) {
        var personData = execute('content.get', {key: relatedPersonId});

        var imageContentId = getSingleValue(personData.data['image'], '');
        var imageContentUrl = imageContentId ?
                              execute('portal.imageUrl', {
                                  id: imageContentId,
                                  filter: 'scaleblock(400,400)'
                              }) :
                              defaultPersonImageUrl;

        var personName = [
            getSingleValue(personData.data['first-name'], ''),
            getSingleValue(personData.data['middle-name'], ''),
            getSingleValue(personData.data['last-name'], '')
        ].join(' ').trim();

        var personTitle = getSingleValue(personData.data['job-title'], '');

        persons.push({
            name:  personName || 'Test Testesen',
            title: personTitle || 'Sjefen over alle sjefer',
            image: imageContentUrl
        });
    });

    var data = {
        title: getSingleValue(component.config['title'], 'Please configure'),
        text: getSingleValue(component.config['text'], ''),
        persons: persons
    };

    var params = {
        context: req,
        component: component,
        data: data
    };


    var body = execute('thymeleaf.render', {
        view: resolve('/view/person-list.html'),
        model: params
    });

    return {
        body: body,
        contentType: 'text/html'
    };
}

exports.get = handleGet;
