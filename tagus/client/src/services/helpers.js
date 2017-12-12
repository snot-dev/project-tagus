const buildContentTree = content => {
    let contentObject = {};
    const contentTree = [];
    
    if (content.constructor === Array) {
        for(const page of content) {
            contentObject[page._id] = page;
            contentObject[page._id].children = [];
        }
    } else {
        contentObject = content;
    }
    
    for (const page of content) {
        if(page.parent) {
            contentObject[page.parent].children.push(page);
        } else {
            contentTree.push(page);
        }
    }
    

    return contentTree;
}

const convertArrayToDictionary = array => {
    const obj = {};

    for(const item of array) {
        obj[item._id] = item;
    }

    return obj;
};

export {buildContentTree, convertArrayToDictionary};
