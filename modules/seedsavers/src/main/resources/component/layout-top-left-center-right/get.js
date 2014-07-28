var editMode = portal.request.mode == 'edit';

var component = portal.component;
var layoutRegions = portal.layoutRegions;

var body = system.thymeleaf.render('component/layout-top-left-center-right/layout-top-left-center-right.html', {
    editable: editMode,
    component: component,
    topRegion: layoutRegions.getRegion("top"),
    leftRegion: layoutRegions.getRegion("left"),
    centerRegion: layoutRegions.getRegion("center"),
    rightRegion: layoutRegions.getRegion("right")
});


portal.response.body = body;
portal.response.contentType = 'text/html';
portal.response.status = 200;
