<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">产品每日统计</div>
            <div class="mgb20">
                          <!-- <router-link :to="{path:'addproduct'}"><el-button type="primary">今日实时PV:{{puvdata.pv}}</el-button></router-link>
                          <router-link :to="{path:'addproduct'}"><el-button type="primary">今日实时UV:{{puvdata.uv}}</el-button></router-link> -->
                          <el-button type="primary">今日实时PV:{{puvdata.pv}}</el-button>
                                <el-button type="primary">今日实时UV:{{puvdata.uv}}</el-button>
                          <!-- 搜索 -->
                          <!-- <el-button type="primary" icon="el-icon-search"  @click="search()" style="float: right;margin-left: 20px;">搜索</el-button>

                          <el-select v-model="status" placeholder="请选择状态" @change="search()" style="float: right;">
                            <el-option label="已下架" value="0"></el-option>
                            <el-option label="已上架" value="1"></el-option>
                          </el-select> -->
                </div>
            <el-table :data="tableData" border size="medium" ref="multipleTable" stripe>
                <el-table-column prop="id" label="ID" align="center" width="50"></el-table-column>
                <el-table-column prop="product_name" label="产品名称" align="center"></el-table-column>
                <el-table-column prop="uv" label="注册按钮点击UV" align="center"></el-table-column>
                <el-table-column prop="pv" label="注册按钮点击PV" align="center"></el-table-column>
                <el-table-column prop="uv_total" label="注册按钮点击累积UV	" align="center"></el-table-column>
                <el-table-column prop="pv_total" label="注册按钮点击累积PV" align="center"></el-table-column>
                <!-- <el-table-column prop="apply_price" label="实际注册人数" align="center"></el-table-column> -->
                <el-table-column prop="date" label="统计日期" align="center" width="500"></el-table-column>
                <!-- <el-table-column label="操作" align="center" width="400">
                    <template slot-scope="scope">
                        <router-link :to="{path:'addproduct',query:{id:scope.row.id}}">
                            <el-button size="mini">
                               编辑
                            </el-button>
                        </router-link>
                        <router-link :to="{path:'dailystatistics',query:{row:scope.row}}">
                                <el-button size="mini">
                                   数据
                                </el-button>
                            </router-link>
                    </template>
                </el-table-column> -->
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
            dialogTableVisible: false,
            dialogFormVisible: false,
            value1: "",
            value2: "",
            tableData: [],
            cur_page: 1,
            pages: 0,
            name:"",
            s_student: '',
            s_school: '',
            s_grade: '',
            s_klass: '',
            status:"",
            // loading: true,
            region: "",
            region1: "",
            plusIcon: true,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            puvdata:"",
        }
    },
    created() {
        this.getlistdata()
        this.getpuvdata()
     
    },
    computed: {

    },
    methods: {
        getpuvdata(){
            this.$get('channel-analysis/today-count?sort=-id').then((res) => {
                console.log(res)
                if(res.code===1){
                    this.puvdata = res.info;
                }else{
                    this.$message.error('数据加载失败');
                }
                this.loading = false
            }).catch( () => {
                this.loading = false
            })
        },
        getlistdata(){
            this.$get('channel-analysis/day-count?sort=-id').then((res) => {
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
        open() {
            this.$prompt('请输入充值金额', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            // inputPattern: /[1-9]+[0-9]*/,
            // inputErrorMessage: '充值金额格式不正确'
            }).then(({ value }) => {

                // 发送请求到后台充值

            // this.$message({
            //     type: 'success',
            //     message: '你的邮箱是: ' + value
            // });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        handleCheck(index, row) {
            row.hot = !row.hot;
            if(row.hot == false){
                row.hot = 0
            }else{
                row.hot = 1
            }
            this.$put('products/'+row.id, {
                hot: row.hot,
            }).then((res) => {
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },
        handleStatus(index,row){
            row.status = !row.status;

            if(row.status == false){
                row.status = 0
            }else{
                row.status = 1
            }
            this.$put('products/'+row.id, {
                status: row.status,
            }).then((res) => {
                this.loading = false
            }).catch(() => {
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
            this.$get('products', {
                status: this.status?this.status:'',
                name:this.name?this.name:''
            }).then((res) => {
                if (res.code === 1) {
                    this.tableData = JSON.parse(JSON.stringify(res.info.items))
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
        }
    }
}
</script>

<style scoped>
.el-icon-check{
color:#1f9e27;
font-weight:800;
font-size:1.5rem;
}
.el-icon-close{
color:#d81e06;
font-weight:800;
font-size:1.5rem;
}
</style>