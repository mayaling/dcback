<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">随手花用户列表</div>
                <div class="mgb20">
                        <el-row :gutter="10" class="clearfix">
                                <el-col :span="2">
                                    <el-select v-model="channel" placeholder="请选择渠道">
                                        <template  v-for="item in channeldata">
                                            <el-option :label="item.name" :value="item.id"></el-option>
                                        </template>
                                    </el-select>
                                </el-col>
                                <el-col :span="2">
                                    <el-select v-model="active" placeholder="请选择激活状态">
                                        <el-option label="已激活" value="1"></el-option>
                                        <el-option label="未激活" value="0"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="4">
                                    <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                                </el-col>
                            <!-- <el-col :span="3">
                            
                            <el-date-picker
                            v-model="value2"
                            type="date"
                            placeholder="选择注册时间">
                          </el-date-picker>
                        </el-col> -->
                            <el-col :span="2"><el-input v-model.trim="p_phone" placeholder="输入用户手机号" @keyup.enter.native="search"></el-input></el-col>
                            <!-- <el-col :span="4"><el-input v-model.trim="s_name" placeholder="学生姓名" @keyup.enter.native="search"></el-input></el-col> -->
                            <el-col :span="2"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col>
                            <el-col :span="2"><el-button type="primary" icon="el-icon-search">导出</el-button></el-col>
                        </el-row>
                    </div>
                <el-table :data="tableData" border size="medium" ref="multipleTable">
                    <el-table-column prop="id" label="ID" align="center" width="120"></el-table-column>
                    <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
                    <el-table-column prop="active" label="是否激活" align="center"></el-table-column>
                    <el-table-column prop="active_time" label="激活时间" align="center"></el-table-column>
                    <el-table-column prop="last_login_time" label="最近打开时间" align="center"></el-table-column>
                    <el-table-column prop="device_id" label="设备号" align="center"></el-table-column>
                    <el-table-column prop="channel" label="渠道" align="center"></el-table-column>
                    <el-table-column prop="klass" label="版本号" align="center"></el-table-column>
                    <el-table-column prop="os" label="设备系统" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="300">
                        <template slot-scope="scope">
                            <router-link :to="{path:'CPA',query:{row:scope.row}}">
                                <el-button size="mini">
                                    CPA
                                </el-button>
                            </router-link>
                            <router-link :to="{path:'active',query:{row:scope.row}}">
                                <el-button size="mini">
                                    活跃日期
                                </el-button>
                            </router-link>
                        </template>
</el-table-column>
</el-table>
<div class="pagination">
    <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
    </el-pagination>
</div>
</div>
</div>
</template>


<script>
    export default {
        name: 'teacher',
        data() {
            return {
                value1: "",
                value2: "",
                tableData: [],
                cur_page: 1,
                pages: 0,
                s_student: '',
                s_school: '',
                s_grade: '',
                s_klass: '',
                // loading: true,
                active: "",
                channel:"",
                channeldata:"",
                time:"",
                p_phone:''
            }
        },
        created() {
            this.getlistdata();
            this.getchanneldata()
        },
        computed: {

        },
        methods: {
            getlistdata(){
                this.$get('users').then((res) => {
                    console.log(res)
                    if(res.code===1){
                        this.tableData = res.info.items;
                        for (var i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].active == 0) {
                                this.tableData[i].active = '未激活'
                            } else {
                                this.tableData[i].active = '已激活'
                            }
                        }
                        for (var i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].os == 0) {
                                this.tableData[i].os = 'Android'
                            } else if(this.tableData[i].os == 1){
                                this.tableData[i].os = 'IOS'
                            }else if(this.tableData[i].os == 2){
                                this.tableData[i].os = 'Web'
                            }else if(this.tableData[i].os == 4){
                                this.tableData[i].os = '其他'
                            }else{
                                this.tableData[i].os = ''
                            }
                        }
                    }else{
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch( () => {
                    this.loading = false
                })
            }, 
            getchanneldata(){
                this.$get('channels').then((res) => {
                    console.log(res)
                    if(res.code===1){
                        this.channeldata = res.info.items;
                    }else{
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch( () => {
                    this.loading = false
                })
            }, 
            // 分页导航
            handleCurrentChange(val) {
                this.loading = true
                this.$get('users', {
                    pageNum: val,
                    studentName: this.s_student
                }).then((res) => {
                    if (res.code === 0) {
                        this.tableData = JSON.parse(JSON.stringify(res.data.list))
                        this.pages = res.data.pages;
                    } else {
                        this.$message.error('学生加载失败');
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },

            // 搜索
            search() {
                this.loading = true
                console.log(this.start_time)
                this.$get('users', {
                    channel_id: this.channel?this.channel:'',
                    active:this.active?this.active:'',
                    start_time:this.time[0],
                    end_time:this.time[1]
                }).then((res) => {
                    console.log(res)
                    if (res.code === 1) {
                        this.tableData = JSON.parse(JSON.stringify(res.info.items))
                        // this.$router.push({path: 'userlist', query: {active:this.tableData.active,os:this.tableData.os}});
                        for (var i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].active == 0) {
                                this.tableData[i].active = '未激活'
                            } else {
                                this.tableData[i].active = '已激活'
                            }
                        }
                        for (var i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].os == 0) {
                                this.tableData[i].os = 'Android'
                            } else if(this.tableData[i].os == 1){
                                this.tableData[i].os = 'IOS'
                            }else if(this.tableData[i].os == 2){
                                this.tableData[i].os = 'Web'
                            }else if(this.tableData[i].os == 4){
                                this.tableData[i].os = '其他'
                            }else{
                                this.tableData[i].os = ''
                            }
                        }
                    } else {
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
        }
    }
</script>

<style scoped>

</style>