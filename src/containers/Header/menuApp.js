export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user', 
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            // {
            //     name: 'menu.admin.manage-doctor', link: '/system/user-doctor'
            // },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },
           
        ]
    },
    {
        name: 'menu.admin.clinic',
        menus:[
            {
                name: 'menu.admin.manage-clinic', link: '/system/pitch-redux'
            },
            {
                name: 'menu.admin.manage-detail-clinic', link: '/system/pitch-detail-redux'
            },
            {
                name: 'menu.manage.manage-book-pitch', link: '/manage/manage-book-pitch'
            },
            // {
            //     name: 'menu.manage.manage-booking', link: '/manage/manage-booking'
            // },
        ]
    },
    // {
    //     name: 'menu.admin.specialty',
    //     menus:[
    //         {
    //             name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
    //         }
    //     ]
    // },
    // {
    //     name: 'menu.admin.handbook',
    //     menus:[
    //         {
    //             name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
    //         }
    //     ]
    // },
];

export const manageMenu = [
  
    {
        name: 'menu.admin.clinic',
        menus:[
            {
                name: 'menu.manage.manage-book-pitch', link: '/manage/manage-book-pitch-1'
            },
            {
                name: 'menu.manage.manage-booking', link: '/manage/manage-booking'
            },
        ]
    },
    
];
