var site = portal.siteContent;
var editMode = portal.request.mode == 'edit';


var params = {
	context: portal,
    site: portal.siteContent,
    content: portal.content,
	pageRegions: portal.pageRegions,
	mainRegion: portal.pageRegions.getRegion("main"),
	editable: editMode,
    from: "member"
};

var body = system.thymeleaf.render('page/member/member.page.html', params);

portal.response.contentType = 'text/html';
portal.response.body = body;

