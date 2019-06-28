<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">CPA详情</div>
                <el-table :data="tableData" border size="medium" ref="multipleTable" style="margin-top: 20px;">
                    <el-table-column prop="id" label="UID" align="center" width="120"></el-table-column>
                    <el-table-column prop="englishName" label="产品名称" align="center"></el-table-column>
                    <el-table-column prop="username" label="停留时长" align="center"></el-table-column>
                    <el-table-column prop="sex" label="	是否注册" align="center" ></el-table-column>
                    <el-table-column prop="school" label="点击时间" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="120">
                        <template slot-scope="scope">
                            <router-link :to="{path:'studentDetail',query:{id:scope.row.id}}" style="color:#35a000;">详情</router-link>
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
            name: 'canaluser',
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
                    region: "",
                    region1: ""
                }
            },
            created() {
                // this.$get('students').then((res) => {
                //     if (res.code === 0) {
                //         this.tableData = JSON.parse(JSON.stringify(res.data.list))
                //         this.pages = res.data.pages;
                //         for (var i = 0; i < this.tableData.length; i++) {
                //             if (this.tableData[i].sex) {
                //                 this.tableData[i].sex = '女'
                //             } else {
                //                 this.tableData[i].sex = '男'
                //             }
                //         }
                //     } else {
                //         this.$message.error('学生加载失败');
                //     }
                //     this.loading = false
                // }).catch(() => {
                //     this.loading = false
                // })
            },
            computed: {
    
            },
            methods: {
                // 分页导航
                handleCurrentChange(val) {
                    this.loading = true
                    this.$get('students', {
                        pageNum: val,
                        studentName: this.s_student
                    }).then((res) => {
                        if (res.code === 0) {
                            this.tableData = JSON.parse(JSON.stringify(res.data.list))
                            this.pages = res.data.pages;
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
                },
    
                // 搜索
                search() {
                    this.loading = true
                    this.$get('students', {
                        studentName: this.s_student
                    }).then((res) => {
                        if (res.code === 0) {
                            this.tableData = JSON.parse(JSON.stringify(res.data.list))
                            this.pages = res.data.pages;
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