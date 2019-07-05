<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">渠道今日实时统计</div>
                <div class="mgb20">
                    <el-row :gutter="10" class="clearfix">
                            <router-link :to="{path:'channeldaylog'}"><el-button type="primary">查看今日实时</el-button></router-link>
                          <router-link :to="{path:'channelhistory'}"><el-button type="primary">查看过往数据</el-button></router-link>
                    </el-row>
                </div>
                <el-table :data="tableData" border size="medium" ref="multipleTable">
                    <el-table-column prop="channel_name" label="渠道名称" align="center" width="120"></el-table-column>
                    <el-table-column prop="reg" label="注册数" align="center"></el-table-column>
                    <el-table-column prop="active" label="激活数" align="center"></el-table-column>
                    <el-table-column prop="p_uv" label="产品点击pv" align="center"></el-table-column>
                    <el-table-column prop="p_pv" label="产品点击uv" align="center"></el-table-column>
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
                    loading: true
                }
            },
            created() {
                this.getlistdata()
            },
            computed: {
    
            },
            methods: {
                // 列表数据
                getlistdata(){
                    this.$get('channel-analysis/today-list?type=1,2').then((res) => {
                        console.log(res)
                        if(res.code===1){
                            this.tableData = res.info;
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