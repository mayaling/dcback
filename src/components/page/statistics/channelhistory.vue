<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">渠道每日统计</div>
                <div class="mgb20">
                              <router-link :to="{path:'channeldaylog'}"><el-button type="primary">查看今日实时</el-button></router-link>
                              <router-link :to="{path:'channelhistory'}"><el-button type="primary">查看过往数据</el-button></router-link>
                              <el-button type="primary" icon="el-icon-search"  @click="search()" style="float:right;margin-left: 20px;">搜索</el-button>
    
                              <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd" @change="search" style="float: right"></el-date-picker>
                    </div>
                <!-- <el-table :data="tableData" border size="medium" ref="multipleTable" stripe :span-method="objectSpanMethod">
                    <el-table-column prop="id" label="渠道名称" align="center"></el-table-column>
                    <el-table-column prop="name" label="统计日期" align="center"></el-table-column>
                    <el-table-column prop="image" label="推广页uv" align="center">
                    　<template slot-scope="scope">
                    　　　　<img :src="scope.row.image" width="40" height="40" class="head_pic"/>
                    　　</template>
                    </el-table-column>
                    <el-table-column prop="rate" label="渠道注册" align="center"></el-table-column>
                    <el-table-column prop="apply_num" label="渠道激活" align="center"></el-table-column>
                    <el-table-column prop="lending_time" label="产品pv(新客)" align="center"></el-table-column>
                    <el-table-column prop="apply_price" label="产品uv(新客)" align="center"></el-table-column>
                    <el-table-column prop="hidden_url" label="产品pv(老客)" align="center"></el-table-column>
                    <el-table-column prop="create_time" label="产品uv(老客)" align="center"></el-table-column>
                    <el-table-column prop="hot" label="产品累积点击" align="center">
                        <template slot-scope="scope">
                            <span  @click="handleCheck(scope.$index,scope.row)" style="width: 40px;height: 40px;">
                                <i v-if="scope.row.hot" class="el-icon-check"></i>
                                <i v-if="!scope.row.hot" class="el-icon-close"></i>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="平均每日" align="center">
                            <template slot-scope="scope">
                                <span  @click="handleStatus(scope.$index,scope.row)" style="width: 40px;height: 40px;">
                                    <i v-if="scope.row.status" class="el-icon-check"></i>
                                    <i v-if="!scope.row.status" class="el-icon-close"></i>
                                </span>
                            </template>
                    </el-table-column>
                    <el-table-column prop="money" label="平均每周" align="center"></el-table-column>
                </el-table> -->
    
    
                <el-table stripe :data="tableData6" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
                    <el-table-column prop="channel_name" label="渠道姓名" width="180"></el-table-column>
                    <el-table-column prop="date" label="统计日期"></el-table-column>
                    <el-table-column prop="uv" label="推广页uv"></el-table-column>
                    <el-table-column prop="reg" label="渠道注册"></el-table-column>
                    <el-table-column prop="active" label="渠道激活"></el-table-column>
                    
                    <el-table-column prop="p_pv" label="产品pv（新客）"></el-table-column>
                    <el-table-column prop="p_uv" label="产品uv（新客）"></el-table-column>
                    <el-table-column prop="p_old_pv" label="产品pv（老客）"></el-table-column>
                    <el-table-column prop="p_old_uv" label="产品uv（老客）"></el-table-column>
                    
                    <el-table-column prop="reg_uv_pre" label="产品累计点击"></el-table-column>
                    <el-table-column prop="active_uv_pre" label="平均每日"></el-table-column>
                    <el-table-column prop="p_uv_uv_pre" label="平均每周"></el-table-column>
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
                
                tableData:{},
                cur_page: 1,
                pages: 0,
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
                rowList: [],
                spanArr: [],
                position: 0,
                tableData6: []
            }
        },
        created() {
            this.getlistdata()
            // console.log(this.tableData)
        },
        mounted() {
            var _this = this;
            setTimeout(function(){
                // console.log(_this.tableData)
                let arr=[]
                var myData = _this.tableData;
                for(let index in myData){
                if(index==='info'){
                    for(let j in myData[index]){
                        for(let s in myData[index][j]){
                            if(s==='list'){
                                // console.log(myData[index][j][s])
                                for(let x=0;x<myData[index][j][s].length;x++){
                                    arr.push(myData[index][j][s][x])
                                }
                            }
                            
                        }
                    }
                }
                }
                _this.tableData6=arr
                // console.log(arr,'arr')
                _this.rowspan()
          
            }, 500);
    
           
        },
        computed: {
    
        },
        methods: {
            getlistdata(){
                this.$get('channel-analysis/day-list??sort=-id').then((res) => {
                    // console.log(res)
                    if(res.code === 1){
                        this.tableData = res;
                        // console.log(this.tableData)
                    }else{
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch( () => {
                    this.loading = false
                })
            },
            rowspan(){
                    this.tableData6.forEach((item,index) => {
                        // console.log(index)
                    if( index === 0){
                        this.spanArr.push(1);
                        this.position = 0;
                    }else{
                        if(this.tableData6[index].channel_name === this.tableData6[index-1].channel_name ){
                            this.spanArr[this.position] += 1;
                            this.spanArr.push(0);
                        }else{
                            this.spanArr.push(1);
                            this.position = index;
                        }
                    }
                })
            },
            
           
            objectSpanMethod({row,column,rowIndex,columnIndex}) {
                if (columnIndex === 0) {
                    const _row = this.spanArr[rowIndex];
                    const _col = _row>0 ? 1 : 0;
                    console.log(_row,_col)
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
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
                    } else {
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
              if (rowIndex % 2 === 0) {
                return {
                  rowspan: 2,
                  colspan: 1
                };
              } else {
                return {
                  rowspan: 0,
                  colspan: 0
                };
              }
            }
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