//import Vue from 'vue';
//import Router from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    //mode:'history',
    //base:'/dist/',
    routes: [{
            path: '/',
            redirect: '/Dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: 'home' },
            children: [{
                    path: '/Dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '首页', admin: true }
                },{
                    path: '/adminlist',
                    component: resolve => require(['../components/page/manageuser/admin/adminlist.vue'], resolve),
                    meta: { title: '管理员列表', admin: true }
                }, {
                    path: '/addadmin',
                    component: resolve => require(['../components/page/manageuser/admin/addadmin.vue'], resolve),
                    meta: { title: '新增用户', admin: true }
                },
                {
                    path: '/admindetail',
                    component: resolve => require(['../components/page/manageuser/admin/admindetail.vue'], resolve),
                    meta: { title: '用户详情', admin: true }
                },
                {
                    path: '/userlist',
                    component: resolve => require(['../components/page/manageuser/user/userlist.vue'], resolve),
                    meta: { title: '随手花用户', admin: true }
                }, {
                    path: '/CPA',
                    component: resolve => require(['../components/page/manageuser/user/CPA.vue'], resolve),
                    meta: { title: 'CPA', admin: true }
                }, {
                    path: '/active',
                    component: resolve => require(['../components/page/manageuser/user/active.vue'], resolve),
                    meta: { title: '活跃日期', admin: true }
                }, {
                    path: '/productlist',
                    component: resolve => require(['../components/page/product/productlist.vue'], resolve),
                    meta: { title: '产品列表', admin: true }
                }, {
                    path: '/addproduct',
                    component: resolve => require(['../components/page/product/addproduct.vue'], resolve),
                    meta: { title: '新增产品', admin: true }
                }, {
                    path: '/productdata',
                    component: resolve => require(['../components/page/product/productdata.vue'], resolve),
                    meta: { title: '产品数据', admin: true }
                }, {
                    path: '/canaluser',
                    component: resolve => require(['../components/page/canal/canaluser/canaluser.vue'], resolve),
                    meta: { title: '渠道用户', admin: true }
                }, {
                    path: '/addcanaluser',
                    component: resolve => require(['../components/page/canal/canaluser/addcanaluser.vue'], resolve),
                    meta: { title: '新增渠道用户', admin: true }
                }, {
                    path: '/canallist',
                    component: resolve => require(['../components/page/canal/canallist/canallist.vue'], resolve),
                    meta: { title: '渠道列表', admin: true }
                }, {
                    path: '/addcanal',
                    component: resolve => require(['../components/page/canal/canallist/addcanal.vue'], resolve),
                    meta: { title: '新增渠道', admin: true }
                }, {
                    path: '/deduct',
                    component: resolve => require(['../components/page/canal/deduct/deduct.vue'], resolve),
                    meta: { title: '劣质用户扣除', admin: true }
                }, {
                    path: '/adddeduct',
                    component: resolve => require(['../components/page/canal/deduct/adddeduct.vue'], resolve),
                    meta: { title: '劣质用户扣除', admin: true }
                }, {
                    path: '/clickfarm',
                    component: resolve => require(['../components/page/canal/clickfarm/clickfarm.vue'], resolve),
                    meta: { title: '刷单检测', admin: true }
                }, {
                    path: '/dailystatistics',
                    component: resolve => require(['../components/page/statistics/dailystatistics.vue'], resolve),
                    meta: { title: '产品每日统计', admin: true }
                }, {
                    path: '/totaldataanalysis',
                    component: resolve => require(['../components/page/statistics/totaldataanalysis.vue'], resolve),
                    meta: { title: '总数据分析', admin: true }
                }, {
                    path: '/trafficstatistics',
                    component: resolve => require(['../components/page/statistics/trafficstatistics.vue'], resolve),
                    meta: { title: '产品流量统计', admin: true }
                }, {
                    path: '/applicationrecord',
                    component: resolve => require(['../components/page/statistics/applicationrecord.vue'], resolve),
                    meta: { title: '申请记录', admin: true }
                }, {
                    path: '/dailycanalstatistics',
                    component: resolve => require(['../components/page/statistics/dailycanalstatistics.vue'], resolve),
                    meta: { title: '渠道每日统计', admin: true }
                }, 
                {
                    path: '/channeldaylog',
                    component: resolve => require(['../components/page/statistics/channeldaylog.vue'], resolve),
                    meta: { title: '今日实时', admin: true }
                },{
                    path: '/channelhistory',
                    component: resolve => require(['../components/page/statistics/channelhistory.vue'], resolve),
                    meta: { title: '渠道历史', admin: true }
                }, {
                    path: '/manageapk',
                    component: resolve => require(['../components/page/app/manageapk.vue'], resolve),
                    meta: { title: 'apk管理', admin: true }
                },{
                    path: '/manageversion',
                    component: resolve => require(['../components/page/app/manageversion.vue'], resolve),
                    meta: { title: '版本管理', admin: true }
                },{
                    path: '/menumanagement',
                    component: resolve => require(['../components/page/systemsettings/menumanagement.vue'], resolve),
                    meta: { title: '菜单管理', admin: true }
                }, {
                    path: '/addmenu',
                    component: resolve => require(['../components/page/systemsettings/addmenu.vue'], resolve),
                    meta: { title: '新增菜单', admin: true }
                }, {
                    path: '/usergroupmanagement',
                    component: resolve => require(['../components/page/systemsettings/usergroupmanagement.vue'], resolve),
                    meta: { title: '用户组管理', admin: true }
                }, {
                    path: '/addgroup',
                    component: resolve => require(['../components/page/systemsettings/addgroup.vue'], resolve),
                    meta: { title: '新增用户组', admin: true }
                }, {
                    path: '/systemnotification',
                    component: resolve => require(['../components/page/systemsettings/systemnotification.vue'], resolve),
                    meta: { title: '系统通知', admin: true }
                }, {
                    path: '/addnotification',
                    component: resolve => require(['../components/page/systemsettings/addnotification.vue'], resolve),
                    meta: { title: '新增系统通知', admin: true }
                }, {
                    path: '/guestmessage',
                    component: resolve => require(['../components/page/systemsettings/guestmessage.vue'], resolve),
                    meta: { title: '用户留言', admin: true }
                }, {
                    path: '/Picturemanagement',
                    component: resolve => require(['../components/page/systemsettings/Picturemanagement.vue'], resolve),
                    meta: { title: '轮播图管理', admin: true }
                }, {
                    path: '/addbanner',
                    component: resolve => require(['../components/page/systemsettings/addbanner.vue'], resolve),
                    meta: { title: '新增轮播图', admin: true }
                }, {
                    path: '/canalsetup',
                    component: resolve => require(['../components/page/systemsettings/canalsetup.vue'], resolve),
                    meta: { title: '渠道设置', admin: true }
                },
                // {
                //     path: '/dashboard',
                //     component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                //     meta: { title: '测评学员', admin: true }
                // },
                // {
                //     path: '/studentDetail',
                //     component: resolve => require(['../components/page/studentDetail.vue'], resolve),
                //     meta: { title: '学员详情', admin: true }
                // },
                // {
                //     path: '/paperList',
                //     component: resolve => require(['../components/page/paperList.vue'], resolve),
                //     meta: { title: '试卷管理', admin: true }
                // },
                // {
                //     path: '/paperReview',
                //     component: resolve => require(['../components/page/paperReview.vue'], resolve),
                //     meta: { title: '批卷', admin: true }
                // },
                // {
                //     path: '/grades_exam_6_7_review',
                //     component: resolve => require(['../components/page/grades_exam_6_7_review.vue'], resolve),
                //     meta: { title: '6-7年级入学考试', admin: true }
                // },
                // {
                //     path: '/grades_exam_7_8_review',
                //     component: resolve => require(['../components/page/grades_exam_7_8_review.vue'], resolve),
                //     meta: { title: '7-8年级入学考试', admin: true }
                // },
                // {
                //     path: '/classList',
                //     component: resolve => require(['../components/page/classList.vue'], resolve),
                //     meta: { title: '班级列表', admin: true }
                // },
                // {
                //     path: '/directorClassList',
                //     component: resolve => require(['../components/page/directorClassList.vue'], resolve),
                //     meta: { title: '主任听课班级', admin: true }
                // },
                // {
                //     path: '/classBasisList',
                //     component: resolve => require(['../components/page/classBasisList.vue'], resolve),
                //     meta: { title: '基础班级', admin: true }
                // },
                // {
                //     path: '/classDetail',
                //     component: resolve => require(['../components/page/classDetail.vue'], resolve),
                //     meta: { title: '班级详情', admin: true }
                // },
                // {
                //     path: '/classBasisDetail',
                //     component: resolve => require(['../components/page/classBasisDetail.vue'], resolve),
                //     meta: { title: '基础班级详情', admin: true }
                // },
                // {
                //     path: '/classSuryersReport',
                //     component: resolve => require(['../components/page/classSuryersReport.vue'], resolve),
                //     meta: { title: '问卷报告', admin: true }
                // },
                // {
                //     path: '/director',
                //     component: resolve => require(['../components/page/director.vue'], resolve),
                //     meta: { title: '问卷报告', admin: true }
                // },
                // {
                //     path: '/classreports',
                //     component: resolve => require(['../components/page/classreports.vue'], resolve),
                //     meta: { title: '跟课报告', admin: true }
                // },
                // {
                //     path: '/classStudent',
                //     component: resolve => require(['../components/page/classStudent.vue'], resolve),
                //     meta: { title: '班级学生', admin: true }
                // },
                // {
                //     path: '/classPapers',
                //     component: resolve => require(['../components/page/classPapers.vue'], resolve),
                //     meta: { title: '班级试卷', admin: true }
                // },
                // {
                //     path: '/classSuryers',
                //     component: resolve => require(['../components/page/classSuryers.vue'], resolve),
                //     meta: { title: '班级问卷', admin: true }
                // },
                // {
                //     path: '/teacherList',
                //     component: resolve => require(['../components/page/teacherList.vue'], resolve),
                //     meta: { title: '教师列表', admin: true }
                // },
                // {
                //     path: '/shoolControl',
                //     component: resolve => require(['../components/page/shoolControl.vue'], resolve),
                //     meta: { title: '学校管理', admin: true }
                // },
                // {
                //     path: '/gradeControl',
                //     component: resolve => require(['../components/page/gradeControl.vue'], resolve),
                //     meta: { title: '年级管理', admin: true }
                // },
                // {
                //     path: '/classControl',
                //     component: resolve => require(['../components/page/classControl.vue'], resolve),
                //     meta: { title: '班管理', admin: true }
                // },
                // {
                //     path: '/editpsw',
                //     component: resolve => require(['../components/page/editpsw.vue'], resolve),
                //     meta: { title: '修改密码', admin: true }
                // }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/index',
            component: resolve => require(['../components/page/index.vue'], resolve),
            meta: { title: '首页' }
        },
        {
            path: '/leadershiptestb',
            component: resolve => require(['../components/page/leadershiptestb.vue'], resolve),
            meta: { title: '领导力测试B' }
        },
        {
            path: '/grades_exam_6_7',
            component: resolve => require(['../components/page/grades_exam_6_7.vue'], resolve),
            meta: { title: '6-7年级试卷' }
        },
        {
            path: '/grades_exam_7_8',
            component: resolve => require(['../components/page/grades_exam_7_8.vue'], resolve),
            meta: { title: '7-8年级试卷' }
        },
        {
            path: '/surveyItems',
            component: resolve => require(['../components/page/surveyItems.vue'], resolve),
            meta: { title: '问卷调查' }
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})