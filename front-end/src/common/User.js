export const filterUsers = (users, filtered_list) => {
    let filtered_users = [];
    if (filtered_list && filtered_list.length > 0) {
        filtered_users = users.filter((user) => {
            let filtered_check = filtered_list.find(filtered_item => (filtered_item.user_id == user._id));
            if (filtered_check) {
                return user;
            } else {
                return;
            }
        });
    }
    
    return filtered_users;
}


export const filterOutUsers = (users, filtered_list) => {
    let filtered_users = [];
    if (filtered_list && filtered_list.length > 0) {
        filtered_users = users.filter((user) => {
            let filtered_check = filtered_list.find(filtered_item => (filtered_item.user_id == user._id));
            if (!filtered_check) {
                return user;
            } else {
                return;
            }
        });
    }
    
    return filtered_users;
}

export const filterStudents = (users, enrollments, course_permissions, current_user) => {
    let filtered_users = [];
    filtered_users = users.filter((user) => {
            if(enrollments && course_permissions) {

                let student_enrollments = []
                course_permissions.forEach(course_permission => {
                    enrollments.forEach(enrollment => {
                        if(enrollment.course_id == course_permission.course_id && course_permission.user_id == current_user.id) {
                            student_enrollments.push(enrollment);
                        }
                    });
                });
            
                let filtered_check = student_enrollments.find(filtered_item => (filtered_item.user_id == user._id));
                if (filtered_check) {
                    return user;
                } else {
                    return;
                }
            } else {
                return;
            }
    });
    return filtered_users;
}

export const filterUsersBySite = (users, filtered_list, site_id) => {
    let filtered_users = [];
    if (filtered_list && filtered_list.length > 0) {
        filtered_users = users.filter((user) => {
            let filtered_check = filtered_list.find(filtered_item => (filtered_item.user_id == user._id) && filtered_item.site_id == site_id);
            if (filtered_check) {
                return user;
            } else {
                return;
            }
        });
    }
    
    return filtered_users;
}

