export const getSiteOwner = (site_id, users, site_permissions) => {
    let siteOwner = "";
    if (site_permissions && site_permissions.length > 0) {
        site_permissions = site_permissions.forEach((site_permission) => {
            if (site_id == site_permission.site_id) {
                users.forEach((user) => {
                    if (site_permission.user_id == user._id) {
                        siteOwner = `${user.first_name} ${user.last_name}`;
                    }
                });;
            }
        });
    }
    
    return siteOwner;
}

export const isSiteOwner = (user_id, site_id, site_permissions) => {
    let isSiteOwner = false;
    if (site_permissions && site_permissions.length > 0) {
        site_permissions = site_permissions.forEach((site_permission) => {
            if (site_permissions.user_id == user_id && site_permission.site_id == site_id) {
                isSiteOwner = true;
            }
        });
    }
    
    return isSiteOwner;
}

export const belongsToSite = (object_id, site_id, object_list_check, object_index) => {
    let belongsToSite = false;
    if (object_list_check && object_list_check.length > 0) {
        object_list_check = object_list_check.forEach((object_list_item) => {
            if (object_list_item[object_index]== object_id && object_list_item.site_id == site_id) {
                belongsToSite = true;
            }
        });
    }
    
    return belongsToSite;
}

const SiteHelper = {
    isSiteOwner,
    getSiteOwner,
    belongsToSite
};

export default SiteHelper;