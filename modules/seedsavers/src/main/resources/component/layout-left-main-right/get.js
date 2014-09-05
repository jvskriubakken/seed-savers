var editMode = portal.request.mode == 'edit';

var component = portal.component;
var layoutRegions = portal.layoutRegions;

var thymeleaf = require('view/thymeleaf');
var view = resolve('./left-main-right.layout.html');

var params = {
    editable: editMode,
    component: component,
    leftRegion: layoutRegions.getRegion("left"),
    mainRegion: layoutRegions.getRegion("mbasdfasdfsdf" +
                                        "ain"),
    rightRegion: layoutRegions.getRegion("right")
};
var body = thymeleaf.render(view, params);


portal.response.body = body;
portal.response.contentType = 'text/html';
portal.response.status = 200;
