var contentService = require('contentService');

function getMenuProperties(content) {
    var defaultMenu = {
        menuItem: [false],
        menuName: [content.displayName]
    };

    var menuProps;
    if( content.hasMetadata("system:menu-item") ) {
        menuProps = content.getMetadata("system:menu-item").toMap();
    }
    else {
        menuProps = defaultMenu;
    }

    return menuProps;
}

exports.getSiteMenu = function(site) {
    var contents = Java.from(contentService.getChildContent(site.path).getSet());
    var menuContent = [];
    for (var i = 0; i <contents.length; i++) {
        var menuProps = getMenuProperties(contents[i]);
        if (menuProps.menuItem[0]) {
            var name;
            if (menuProps.menuName[0]) {
                name = menuProps.menuName[0];
            } else {
                name = contents[i].displayName
            }
            menuContent.push({"name": name, "content": contents[i]});
        }
    }
    return menuContent;
};

exports.getSiteMenuAsList = function(site) {
    return Java.to(this.getSiteMenu(site), "java.util.List");
};