export const filterCourses = (courses, filtered_list, check_id, check_index) => {
    let filtered_courses = [];
    if (filtered_list && filtered_list.length > 0) {
        filtered_courses = courses.filter((course) => {
            let filtered_check = filtered_list.find(filtered_item => (filtered_item.course_id == course._id && filtered_item[check_index] == check_id));
            if (filtered_check) {
                return course;
            } else {
                return;
            }
        });      
    }

    return filtered_courses;
}

export const filterOutCourses = (courses, filtered_list, check_id, check_index) => {
    let filtered_courses = [];
    if (filtered_list && filtered_list.length > 0) {
        filtered_courses = courses.filter((course) => {
            let filtered_check = filtered_list.find(filtered_item => (filtered_item.course_id == course._id && filtered_item[check_index] != check_id));
            if (!filtered_check) {
                return course;
            } else {
                return;
            }
        });      
    }

    return filtered_courses;
}

export const isEnrolled = (courses, enrollments, user_id, course_id) => {
    let filtered_courses = filterOutCourses(courses, enrollments, user_id, "user_id");
    let filtered_check = false;
    if (filtered_courses && filtered_courses.length > 0) {
            filtered_check = filtered_courses.find(filtered_item => (filtered_item.course_id == course_id));           
    }

    return filtered_check;
}

export const findCourse = (courses, course_id) => {
    let found_course = null;
    if (courses && courses.length > 0) {
        courses.forEach((course) => {
            if(course._id == course_id) {
                found_course = course;
            }
        });      
    }

    return found_course;
}



