<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">产品流量统计</div>
                <!-- <el-row :gutter="20">
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
                                                             <el-date-picker v-model="value2" type="date" placeholder="选择日期">
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
                -->
               
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
        name: "trafficstatistics",
        data() {
            return {
                value1: '',
                barchartData: [{
                    type: '注册按钮点击UV',
                    value: 3
                }, {
                    type: '注册按钮点击PV',
                    value: 4
                }, {
                    type: '注册按钮点击累积UV',
                    value: 3
                }, {
                    type: '注册按钮点击累积PV',
                    value: 5
                }, {
                    type: '实际注册人数',
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
        methods: {
            // 此处省略从服务器获取数据并且赋值给this.serverData
            // 推荐使用axios请求接口
        }
    }
</script>


<style>
    .el-card__header {
        min-height: 80px;
    }
</style>