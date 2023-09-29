const mentorAuth = (currentUser) => {
    if(currentUser.roles.includes("ROLE_MENTOR")) {
        return true;
    }
    return false;
};

const adminAuth = (currentUser) => {
    if(currentUser.roles.includes("ROLE_ADMIN")) {
        return true;
    }
    return false;
};

const userAuth = (currentUser) => {
    if(currentUser.roles.includes("ROLE_USER")) {
        return true;
    }
    return false;
};

const globalAdminAuth = (currentUser) => {
    if(currentUser.roles.includes("ROLE_GLOBAL_ADMIN")) {
        return true;
    }
    return false;
};

const PageAuth = {
    mentorAuth,
    adminAuth,
    userAuth,
    globalAdminAuth
};

export default PageAuth;
