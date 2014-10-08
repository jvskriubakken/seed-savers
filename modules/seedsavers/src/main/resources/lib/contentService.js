exports.getRootContent = function () {

    return execute('com.enonic.wem.portal.content.FindContentByParent', {
        from: 0,
        size: 1,
        parentPath: null
    });
};

exports.getChildContent = function (parentPath, size) {

    return execute('com.enonic.wem.portal.content.FindContentByParent', {
        from: 0,
        size: size ? size : 500,
        parentPath: parentPath
    });
};

exports.getContentById = function (contentId) {

    return execute('com.enonic.wem.portal.content.GetContentById', {
        id: contentId
    });

};
