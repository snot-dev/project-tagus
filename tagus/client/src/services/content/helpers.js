const buildContentTree = content => {
    const contentObject = {};
    const contentTree = [];
    
    for(const page of content) {
        contentObject[page._id] = page;
        contentObject[page._id].children = [];
    }
    
    for(const page of content) {
        if(page.parent) {
            contentObject[page.parent].children.push(page);
        } else {
            contentTree.push(page);
        }
    }

    return contentTree;
}

export {buildContentTree};