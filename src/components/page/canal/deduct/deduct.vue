<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">扣除列表</div>
                <div class="mgb20">
                    <el-row :gutter="10" class="clearfix">
                            <router-link :to="{path:'adddeduct'}"><el-button type="primary">+新增扣除</el-button></router-link>
                        <!-- <el-col :span="4"><el-input v-model.trim="s_student" placeholder="输入学生姓名" @keyup.enter.native="search"></el-input></el-col>
                        <el-col :span="8"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col> -->
                        <!-- <el-col :span="4" class="tar"><router-link to="/studentEnter?t=1"><el-button type="success">新增</el-button></router-link></el-col> -->
                    </el-row>
                </div>
                <el-table :data="tableData" border size="medium" ref="multipleTable">
                    <el-table-column prop="id" label="id" align="center" width="120"></el-table-column>
                    <el-table-column prop="name" label="渠道" align="center"></el-table-column>
                    <el-table-column prop="type" label="结算百分比" align="center"></el-table-column>
                    <el-table-column prop="register_time" label="扣除日期" align="center"></el-table-column>
                    <el-table-column prop="status" label="创建时间" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="300">
                        <template slot-scope="scope">
                                <router-link :to="{path:'CPA',query:{row:scope.row}}">
                                        <el-button size="mini">
                                            编辑
                                        </el-button>
                                    </router-link>
                                    <router-link :to="{path:'active',query:{row:scope.row}}">
                                        <el-button size="mini">
                                            删除
                                        </el-button>
                                    </router-link>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages"></el-pagination>
                </div>
            </div>
        </div>
    </template>
    
    
    <script>
        export default {
            name: 'teacher',
            data() {
                return {
                    tableData: [],
                    cur_page: 1,
                    pages: 0,
                    s_student: '',
                    s_school: '',
                    s_grade: '',
                    s_klass: '',
                    // loading: true
                }
            },
            created() {
                // this.getlistdata()
            },
            computed: {
    
            },
            methods: {
                // 列表数据
                getlistdata(){
                    this.$get('admins?type=1,2').then((res) => {
                        console.log(res)
                        if(res.code===1){
                            this.tableData = res.info.items;
                            for(var i=0;i<this.tableData.length;i++){
                                if(this.tableData[i].status == 1){
                                    this.tableData[i].status = "开启"
                                }else{
                                    this.tableData[i].status = "关闭"
                                }
                            }
                            for(var i=0;i<this.tableData.length;i++){
                                if(this.tableData[i].type == 1){
                                    this.tableData[i].type = "管理员"
                                }else if(this.tableData[i].type == 2){
                                    this.tableData[i].type = "运营"
                                }else{
                                    this.tableData[i].type = "渠道"
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
                // 分页导航
                handleCurrentChange(val) {
                    this.loading = true
                    this.$get('students', {
                        pageNum: val,
                        studentName: this.s_student
                    }).then((res) => {
                        if (res.code === 0) {
                            this.tableData = JSON.parse(JSON.stringify(res.list))
                            this.pages = res.pages;
                            // for (var i = 0; i < this.tableData.length; i++) {
                            //     if (this.tableData[i].sex) {
                            //         this.tableData[i].sex = '女'
                            //     } else {
                            //         this.tableData[i].sex = '男'
                            //     }
                            // }
                        } else {
                            this.$message.error('数据加载失败');
                        }
                        this.loading = false
                    }).catch(() => {
                        this.loading = false
                    })
                },
    
                // 搜索
                search() {
                    this.loading = true
                    this.$get('students', {
                        studentName: this.s_student
                    }).then((res) => {
                        if (res.code === 0) {
                            this.tableData = JSON.parse(JSON.stringify(res.list))
                            this.pages = res.pages;
                            for (var i = 0; i < this.tableData.length; i++) {
                                if (this.tableData[i].sex) {
                                    this.tableData[i].sex = '女'
                                } else {
                                    this.tableData[i].sex = '男'
                                }
                            }
                        } else {
                            this.$message.error('学生加载失败');
                        }
                        this.loading = false
                    }).catch(() => {
                        this.loading = false
                    })
                }
            }
        }
    </script>
    
    <style scoped>
    
    </style>