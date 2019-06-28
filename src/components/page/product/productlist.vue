<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">产品列表</div>
                <div class="mgb20">
                        <el-row >
                                <el-col :span="4">
                                    <router-link :to="{path:'addproduct'}"><el-button type="primary">+新增产品</el-button></router-link>
                                    
                                </el-col>
                                <el-col :span="12" :offset="2">
                                        <el-row :gutter="20">
                                                <el-col :span="6">
                                                        <el-select v-model="region" placeholder="请选择平台">
                                                                <el-option label="区域一" value="shanghai"></el-option>
                                                                <el-option label="区域二" value="beijing"></el-option>
                                                              </el-select>
                                                </el-col>
                                                <el-col :span="6">
                                                        <el-select v-model="region1" placeholder="请选择状态">
                                                                <el-option label="已下架" value="1"></el-option>
                                                                <el-option label="已上架" value="2"></el-option>
                                                              </el-select>
                                                </el-col>
                                                <el-col :span="6">
                                                        <el-input v-model.trim="s_klass" placeholder="请输入产品名称" @keyup.enter.native="search"></el-input>
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
                    <el-table-column prop="name" label="名称" align="center"></el-table-column>
                    <el-table-column prop="image" label="图片" align="center">
                    　<template slot-scope="scope">
                    　　　　<img :src="scope.row.image" width="40" height="40" class="head_pic"/>
                    　　</template>
                    </el-table-column>
                    <el-table-column prop="rate" label="日利率" align="center"></el-table-column>
                    <el-table-column prop="apply_num" label="申请人数" align="center"></el-table-column>
                    <el-table-column prop="lending_time" label="放款时长" align="center" width="80"></el-table-column>
                    <el-table-column prop="apply_price" label="放款金额" align="center"></el-table-column>
                    <el-table-column prop="url" label="链接地址" align="center"></el-table-column>
                    <el-table-column prop="create_time" label="时间" align="center"></el-table-column>
                    <el-table-column prop="hot" label="是否热门" align="center">
                        <template slot-scope="scope">
                            <span  @click="handleCheck(scope.$index,scope.row)" style="width: 40px;height: 40px;">
                                <i v-if="scope.row.hot" class="el-icon-check"></i>
                                <i v-if="!scope.row.hot" class="el-icon-close"></i>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                            <template slot-scope="scope">
                                <span  @click="handleStatus(scope.$index,scope.row)" style="width: 40px;height: 40px;">
                                    <i v-if="scope.row.status" class="el-icon-check"></i>
                                    <i v-if="!scope.row.status" class="el-icon-close"></i>
                                </span>
                            </template>
                    </el-table-column>
                    <el-table-column prop="money" label="余额" align="center"></el-table-column>
                    <el-table-column prop="platform" label="系统平台" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="500">
                        <template slot-scope="scope">
                            <router-link :to="{path:'addproduct',query:{row:scope.row}}">
                                <el-button size="mini">
                                   编辑
                                </el-button>
                            </router-link>
                            <router-link :to="{path:'dailystatistics',query:{row:scope.row}}">
                                    <el-button size="mini">
                                       数据
                                    </el-button>
                                </router-link>
                              
                                <el-button  size="mini" @click="open">充值</el-button>
                             
                                  <el-button size="mini" @click="dialogFormVisible = true">新增流量详情</el-button>

                                  <el-dialog title="新增流量详情" :visible.sync="dialogFormVisible" width="20%" center>
                                        <el-form :model="form">
                                            <el-form-item label="产品名称" :label-width="formLabelWidth">
                                            <el-input v-model="form.name" autocomplete="off"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <el-form :model="form">
                                                <el-form-item label="用户单价" :label-width="formLabelWidth">
                                                <el-input v-model="form.name" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-form>
                                            <el-form :model="form">
                                                    <el-form-item label="实际用户流量" :label-width="formLabelWidth">
                                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                                    </el-form-item>
                                                </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                                        </div>
                                    </el-dialog>    
                                    <el-button size="mini"  @click="dialogTableVisible = true">流量记录</el-button>

                                    <el-dialog title="流量记录" :visible.sync="dialogTableVisible">
                                            <el-table :data="tableData" border size="medium" ref="multipleTable">
                                                    <el-table-column prop="id" label="编号" align="center" width="120"></el-table-column>
                                                    <el-table-column prop="name" label="产品id" align="center"></el-table-column>
                                                    <el-table-column prop="type" label="次数" align="center"></el-table-column>
                                                    <el-table-column prop="register_time" label="用户单价" align="center"></el-table-column>
                                                    <el-table-column prop="status" label="创建时间" align="center"></el-table-column>
                                                </el-table>
                                        <!-- <el-table :data="gridData">
                                            <el-table-column property="date" label="编号" width="150"></el-table-column>
                                            <el-table-column property="name" label="产品id" width="200"></el-table-column>
                                            <el-table-column property="address" label="次数"></el-table-column>
                                            <el-table-column property="address" label="用户单价"></el-table-column>
                                            <el-table-column property="address" label="创建时间"></el-table-column>

                                        </el-table> -->
                                    </el-dialog>
                            <!-- <el-button size="mini" @click="handleEdit( scope.row)">流量记录</el-button> -->
                            <el-button size="mini" @click="handleEdit( scope.row)">删除</el-button>
                        </template>
                        <!-- <template slot-scope="scope">
                            <router-link :to="{path:'studentDetail',query:{id:scope.row.id}}" style="color:#35a000;">编辑</router-link>
                        </template> -->
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
                dialogTableVisible: false,
                dialogFormVisible: false,
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
            }
        },
        created() {
            this.getlistdata()
         
        },
        computed: {

        },
        methods: {
            getlistdata(){
                this.$get('products').then((res) => {
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