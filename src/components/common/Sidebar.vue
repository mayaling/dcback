<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
        <template v-for="item in items">
            <template v-if="item.subs">
            <el-submenu :index="item.id" :key="item.url">
                <template slot="title">
                <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
                </template>
                <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.url">{{subItem.title}}</el-menu-item>
            </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :url="item.url" :key="item.id">
            <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
</template>
</el-menu>
</div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items:[],
                // items: [
                //     {
                //         icon: 'el-icon-lx-people',
                //         id: '1',
                //         title: '用户管理',
                //         subs: [{
                //             id:"0",
                //             url: 'adminlist',
                //             title: '管理员列表'
                //         }, {
                //             id:"1",
                //             url: 'userlist',
                //             title: '随手花用户'
                //         }]
                //     }, 
                //     {
                //         icon: 'el-icon-lx-people',
                //         id: '2',
                //         title: '用户管理1',
                //         subs: [{
                //             id:"2",
                //             url: 'productlist',
                //             title: '管理员列表1'
                //         }, {
                //             id:"3",
                //             url: 'productdata',
                //             title: '随手花用户1'
                //         }]
                //     }, 
                // ],
                // items: [{
                //     icon: 'el-icon-lx-people',
                //     index: '1',
                //     title: '用户管理',
                //     subs: [{
                //         index: 'adminlist',
                //         title: '管理员列表'
                //     }, {
                //         index: 'userlist',
                //         title: '随手花用户'
                //     }]
                // }, {
                //     icon: 'el-icon-document',
                //     index: '2',
                //     title: '产品列表',
                //     subs: [{
                //         index: 'productlist',
                //         title: '产品列表'
                //     }, {
                //         index: 'productdata',
                //         title: '产品数据'
                //     }]
                // }, {
                //     icon: 'el-icon-document',
                //     index: '3',
                //     title: '渠道管理',
                //     subs: [{
                //         index: 'canaluser',
                //         title: '渠道用户'
                //     }, {
                //         index: 'canallist',
                //         title: '渠道列表'
                //     }]
                // }, {
                //     icon: 'el-icon-menu',
                //     index: '4',
                //     title: '数据统计',
                //     subs: [{
                //         index: 'dailystatistics',
                //         title: '产品每日统计'
                //     }, {
                //         index: 'totaldataanalysis',
                //         title: '总数据分析'
                //     }, {
                //         index: 'trafficstatistics',
                //         title: '产品流量统计'
                //     }, {
                //         index: 'applicationrecord',
                //         title: '申请记录'
                //     }, {
                //         index: 'dailycanalstatistics',
                //         title: '渠道每日统计'
                //     }]
                // }, {
                //     icon: 'el-icon-setting',
                //     index: '5',
                //     title: '系统设置',
                //     subs: [{
                //         index: 'menumanagement',
                //         title: '菜单管理'
                //     }, {
                //         index: 'usergroupmanagement',
                //         title: '用户组管理'
                //     }, {
                //         index: 'systemnotification',
                //         title: '系统通知'
                //     }, {
                //         index: 'guestmessage',
                //         title: '用户留言'
                //     }, {
                //         index: 'Picturemanagement',
                //         title: '轮播图管理'
                //     }, {
                //         index: 'canalsetup',
                //         title: '渠道设置'
                //     }]
                // }],
                type: ''
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
              this.$get('admin/menu').then((res) => {
                // console.log(res)
                this.items = res.info;
            }).catch(() => {
                this.loading = false
            })
            // this.type = JSON.parse(localStorage.getItem('userInfo')).type;
            // if (this.type == 'academic') {
            //     var aca = {
            //         icon: 'el-icon-tickets',
            //         index: 'directorClassList',
            //         title: '主任听课班级'
            //     }
            //     this.items.splice(3, 0, aca)
            // }
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }
    
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }
    /*  .el-menu-item,.el-submenu__title{ height:40px; line-height:40px;}*/
    
    .sidebar>ul {
        height: 100%;
    }
</style>