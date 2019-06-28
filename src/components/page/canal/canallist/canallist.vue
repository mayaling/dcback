<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">渠道列表</div>
            <div class="mgb20">
                    <el-row >
                            <el-col :span="4">
                                <router-link :to="{path:'addcanal'}"><el-button type="primary">+新增渠道</el-button></router-link>
                            </el-col>
                            <el-col :span="12">
                                    <el-row :gutter="20">
                                            <el-col :span="6">
                                                    <el-input v-model.trim="s_klass" placeholder="请输入名称" @keyup.enter.native="search"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                                            </el-col>
                                          </el-row>
                                 
                                         
                                              
                            </el-col>
                          </el-row>
                </div>
            <el-table :data="tableData" border size="medium" ref="multipleTable">
                <el-table-column prop="id" label="ID" align="center" width="120"></el-table-column>
                <el-table-column prop="name" label="渠道名称" align="center"></el-table-column>
                <el-table-column prop="url" label="投放链接" align="center"></el-table-column>
                <el-table-column prop="sex" label="渠道联系人" align="center"></el-table-column>
                <el-table-column prop="school" label="渠道联系电话" align="center"></el-table-column>
                <el-table-column prop="grade" label="用户单价" align="center"></el-table-column>
                <el-table-column prop="klass" label="合作方式" align="center"></el-table-column>
                <el-table-column prop="url" label="渠道下载二维码" align="center">
                    <template slot-scope="scope">
            　　　　    <img :src="scope.row.url" width="40" height="40" class="head_pic"/>
            　　    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="700">
                    <template slot-scope="scope">
                        <!-- <router-link :to="{path:'addproduct',query:{row:scope.row}}">
                            <el-button size="mini">
                               编辑
                            </el-button>
                        </router-link>
                        <router-link :to="{path:'dailystatistics',query:{row:scope.row}}">
                                <el-button size="mini">
                                   数据
                                </el-button>
                            </router-link> -->
                        <el-button size="mini" @click="handleEdit( scope.row)">渠道充值</el-button>
                        <el-button size="mini" @click="handleEdit( scope.row)">充值详情</el-button>
                        <el-button size="mini" @click="handleEdit( scope.row)">渠道统计</el-button>
                        <el-button size="mini" @click="handleEdit( scope.row)">UV</el-button>
                        <el-button size="mini" @click="handleEdit( scope.row)">注册量</el-button>
                        <el-button size="mini" @click="handleEdit( scope.row)">激活量</el-button>
                        <el-button size="mini" @click="handleEdit( scope.row)">产品点击</el-button>
                        <el-button size="mini" @click="handleEdit( scope.row)">删除</el-button>
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
                region1: "",
                tableData:"",
            }
        },
        created() {
            this.getlistdata()
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
            getlistdata(){
                this.$get('channels').then((res) => {
                    console.log(res)
                    if(res.code===1){
                        this.tableData = res.info.items;
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