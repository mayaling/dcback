<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">产品数据</div>
            <el-button type="primary">今日实时uv</el-button>
            <el-button type="primary">今日实时pv</el-button>
            <el-table :data="tableData" border size="medium" ref="multipleTable" style="margin-top: 20px;">
                <el-table-column prop="name" label="ID" align="center" width="120"></el-table-column>
                <el-table-column prop="englishName" label="产品名称" align="center"></el-table-column>
                <el-table-column prop="username" label="注册按钮点击UV" align="center"></el-table-column>
                <el-table-column prop="sex" label="注册按钮点击PV" align="center" width="80"></el-table-column>
                <el-table-column prop="school" label="注册按钮点击累积UV" align="center"></el-table-column>
                <el-table-column prop="grade" label="注册按钮点击累积PV" align="center"></el-table-column>
                <el-table-column prop="klass" label="实际注册人数" align="center"></el-table-column>
                <el-table-column prop="klass" label="统计日期" align="center"></el-table-column>
                <el-table-column prop="klass" label="设备系统" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="110">
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