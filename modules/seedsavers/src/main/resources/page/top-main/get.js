var site = portal.siteContent;
var editMode = portal.request.mode == 'edit';


var params = {
    context: portal,
    site: portal.siteContent,
    content: portal.content,
    pageRegions: portal.pageRegions,
    topRegion: portal.pageRegions.getRegion("top"),
    mainRegion: portal.pageRegions.getRegion("main"),
    editable: editMode,
    from: "site"
};

var body = system.thymeleaf.render('page/top-main/top-main.page.html', params);

portal.response.contentType = 'text/html';
portal.response.body = body;


