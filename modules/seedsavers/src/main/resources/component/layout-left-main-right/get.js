var editMode = portal.request.mode == 'edit';

var component = portal.component;
var layoutRegions = portal.layoutRegions;

var body = system.thymeleaf.render('component/layout-left-main-right/left-main-right.layout.html', {
    editable: editMode,
    component: component,
    leftRegion: layoutRegions.getRegion("left"),
    mainRegion: layoutRegions.getRegion("main"),
    rightRegion: layoutRegions.getRegion("right")
});


portal.response.body = body;
portal.response.contentType = 'text/html';
portal.response.status = 200;
