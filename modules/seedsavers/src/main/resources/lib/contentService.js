exports.getRootContent = function () {

    return execute('content.findByParent', {
        from: 0,
        size: 1,
        parentPath: null
    });
};

exports.getChildContent = function (parentPath, size) {

    return execute('content.findByParent', {
        from: 0,
        size: size ? size : 500,
        parentPath: parentPath
    });
};

exports.getContentById = function (contentId) {

    return execute('content.getById', {
        id: contentId
    });

};
