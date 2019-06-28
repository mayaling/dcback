<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">用户留言列表</div>
                <div class="mgb20">
                    <el-row >
                        <el-col :span="4">
                        </el-col>
                        <el-col :span="12">
                            <el-row :gutter="20">
                                <el-col :span="6">
                                        <el-input v-model.trim="s_klass" placeholder="请输入用户手机号" @keyup.enter.native="search"></el-input>
                                </el-col>
                                <el-col :span="6">
                                        <el-button type="primary" icon="el-icon-search">搜索</el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <el-table :data="tableData" border size="medium" ref="multipleTable">
                    <el-table-column prop="name" label="ID" align="center" width="120"></el-table-column>
                    <el-table-column prop="englishName" label="手机号" align="center" width="180"></el-table-column>
                    <el-table-column prop="username" label="内容" align="center"></el-table-column>
                    <el-table-column prop="sex" label="时间" align="center"></el-table-column>
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