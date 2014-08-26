var component = portal.component;
var relatedPersons = component.config.datas("person").toArray();
var persons = [];

relatedPersons.forEach(function (element) {
    var personData = system.contentService.getContentById(element.getString());
    var imageContent = system.contentService.getContentById(personData.contentData.getProperty('image').getString());
    persons.push({
        name: personData.contentData.getProperty('first-name').getString() + ' ' + personData.contentData.getProperty('middle-name').getString() + ' ' + personData.contentData.getProperty('last-name').getString(),
        title: personData.contentData.getProperty('job-title').getString(),
        image: portal.url.createImageByIdUrl(imageContent.id).filter("scaleblock(400,400)")
    });
});
//for (var i in relatedPersons) {
//    system.log(relatedPersons);
//    //persons.push(system.contentService.getContentById();
//}


var data = {
    title: component.config.getProperty('title') ? component.config.getProperty('title').getString() : "Please configure",
    text: component.config.getProperty('text') ? component.config.getProperty('text').getString() : "",
    persons: persons
};

var params = {
    context: portal,
    component: component,
    data: data
};

//var body = system.thymeleaf.render('view/person-list.html', params);
var thymeleaf = require('view/thymeleaf');
var view = resolve('/view/person-list.html');
var body = thymeleaf.render(view, params);

portal.response.contentType = 'text/html';
portal.response.body = body;

