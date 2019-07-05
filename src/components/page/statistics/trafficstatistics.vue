<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">产品每日统计</div>
            <el-row :gutter="20">
                    <el-col :span="12">
                            <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                      <span>pv/uv数</span>
                                    </div>
                                    <div style="min-height: 500px;">
                                    <G2Bar1 :charData="barchart2Data" :id="'c1'"></G2Bar1>
                                    </div>
                                  </el-card>
                    </el-col>
                    <el-col :span="12">
                            <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                            <el-row :gutter="20">
                                                    <el-col :span="12">
                                                            <span>产品每日统计</span>
                                                    </el-col>
                                                    <el-col :span="12">
                                                         <el-date-picker v-model="value2" type="date" placeholder="选择日期" @keyup.enter.native="search">
                                                          </el-date-picker>
                                                    </el-col>
                                                  </el-row>
                                    </div>
                                    <div style="min-height: 500px;">
                                            <G2Bar :charData="barchartData" :id="'c2'"></G2Bar>
                                    </div>
                                  </el-card>
                    </el-col>
                  
                  </el-row>
           
           
</div>
</div>
</template>

<script>
import G2Bar from '../../common/barchart.vue'
// import G2Bar from './barchart.vue'
import G2Bar1 from '../../common/barchart2.vue'

export default {
    components: {
        G2Bar,
        G2Bar1
    },
    name: "dailystatistics",
    data() {
        return {
            value2: '',
            nowtime:"",
            // barchartData:"",
            barchartData: [{
                name: '注册按钮点击UV',
                value: 3
            }, {
                name: '注册按钮点击PV',
                value: 4
            }, {
                name: '注册按钮点击累积UV',
                value: 3
            }, {
                name: '注册按钮点击累积PV',
                value: 5
            }, {
                name: '实际注册人数',
                value: 30
            }],
            barchart2Data: [{
                type: '今日实时pv',
                value: 5
            }, {
                type: '今日实时uv',
                value: 3
            }]
        }
    },
    created() {
        this.gettime();
        
    },
    mounted() {
        this.getbarchartdata();
    },
    methods: {
        getbarchartdata(){
            this.$get('channel-analysis/day-count?date='+this.nowtime).then((res) => {
                console.log(res)
                if(res.code===1){
                    this.barchartData = res.info;
                    console.log(this.barchartData)
                }else{
                    this.$message.error('数据加载失败');
                }
                this.loading = false
            }).catch( () => {
                this.loading = false
            })
        },
        gettime(){
            var date=new Date();
            //年
            var year=date.getFullYear();
            //月
            var month=date.getMonth()+1;
            //日
            var day=date.getDate();
            var now = year+"-"+month+"-"+day;
            this.nowtime = now;
            console.log(this.nowtime)
        },
        search(){
            this.loading = true
            console.log(this.start_time)
            this.$get('channel-analysis/day-count?date='+this.value2, {
                channel_id: this.channel?this.channel:'',
            }).then((res) => {
                console.log(res)
                if (res.code === 1) {
                    this.tableData = JSON.parse(JSON.stringify(res.info.items))
                    // this.$router.push({path: 'userlist', query: {active:this.tableData.active,os:this.tableData.os}});
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


<style>
.el-card__header {
    min-height: 80px;
}
</style>