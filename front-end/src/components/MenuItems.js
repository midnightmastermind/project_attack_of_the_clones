/**
 * This code is an export of different menu items.
 * Each menu item has a title and a list of different options.
 */
export const MenuItems = {
    directory: {
        title: 'Directory',
        list: [
            {
                title: 'Courses',
                path: '/courses',
                cName: 'nav-link'
            },
            {
                title: 'Mentors',
                path: '/mentors',
                cName: 'nav-link'
            }
        ]
    },
    admin: {
        title: 'Admin',
        list: [
            {
                title: 'Global Admin Dashboard',
                path: '/global',
                cName: 'nav-link'
            },
            {
                title: 'Site Admin Dashboard',
                path: '/admin',
                cName: 'nav-link'
            },
            {
                title: 'Mentorship Dashboard',
                path: '/mentor',
                cName: 'nav-link'
            },
            {
                title: 'Student Dashboard',
                path: '/user',
                cName: 'nav-link'
            },
        ]
    },
    solutions: {
        title: 'Solutions',
        list: [
            {
                title: 'Pricing',
                path: '/',
                cName: 'nav-link'
            },
        ]
    },
    get_started: {
        title: 'Get Started',
        list: [
            {
                title: 'Become a Mentor',
                path: '/',
                cName: 'nav-link'
            },
            {
                title: 'Be Mentored',
                path: '/',
                cName: 'nav-link'
            },
            {
                title: 'Become a coach',
                path: '/',
                cName: 'nav-link'
            },
        ]
    }
};
