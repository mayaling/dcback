<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">总数据分析</div>
                <el-row >
                        <g2-line :charData="linechartData" :id="'c2'"></g2-line>
                </el-row>
               
               
    </div>
    </div>
    </template>


<script>
    import G2Line from '../../common/linechart1.vue'

    export default {
        components: {
            G2Line
        },
        name: "totaldataanalysis",
        data() {
            return {

                linechartData: [{
                    year: 2013,
                    type: '渠道实际个数',
                    value: 111
                }, {
                    year: 2013,
                    type: '渠道uv',
                    value: 222
                }, {
                    year: 2013,
                    type: '渠道pv',
                    value: 333
                }, {
                    year: 2013,
                    type: '渠道注册数',
                    value: 444
                }, {
                    year: 2013,
                    type: '渠道激活数',
                    value: 555
                }, {
                    year: 2013,
                    type: '渠道点击产品次数',
                    value: 666
                }, {
                    year: 2013,
                    type: '渠道申请次数',
                    value: 777
                }, {
                    year: 2013,
                    type: '自然引流数',
                    value: 888
                }, {
                    year: 2013,
                    type: '自然点击产品数',
                    value: 999
                }, {
                    year: 2013,
                    type: '自然产品申请数',
                    value: 888
                }, {
                    year: 2013,
                    type: '总产品申请数',
                    value: 777
                }, {
                    year: 2013,
                    type: '产品实际申请人数',
                    value: 666
                }, {
                    year: 2014,
                    type: '渠道实际个数',
                    value: 111
                }, {
                    year: 2014,
                    type: '渠道uv',
                    value: 222
                }, {
                    year: 2014,
                    type: '渠道pv',
                    value: 333
                }, {
                    year: 2014,
                    type: '渠道注册数',
                    value: 444
                }, {
                    year: 2014,
                    type: '渠道激活数',
                    value: 555
                }, {
                    year: 2014,
                    type: '渠道点击产品次数',
                    value: 34
                }, {
                    year: 2014,
                    type: '渠道申请次数',
                    value: 56
                }, {
                    year: 2014,
                    type: '自然引流数',
                    value: 888
                }, {
                    year: 2014,
                    type: '自然点击产品数',
                    value: 78
                }, {
                    year: 2014,
                    type: '自然产品申请数',
                    value: 888
                }, {
                    year: 2014,
                    type: '总产品申请数',
                    value: 777
                }, {
                    year: 2014,
                    type: '产品实际申请人数',
                    value: 666
                }, {
                    year: 2015,
                    type: '渠道实际个数',
                    value: 111
                }, {
                    year: 2015,
                    type: '渠道uv',
                    value: 222
                }, {
                    year: 2015,
                    type: '渠道pv',
                    value: 567
                }, {
                    year: 2015,
                    type: '渠道注册数',
                    value: 444
                }, {
                    year: 2015,
                    type: '渠道激活数',
                    value: 567
                }, {
                    year: 2015,
                    type: '渠道点击产品次数',
                    value: 666
                }, {
                    year: 2015,
                    type: '渠道申请次数',
                    value: 567
                }, {
                    year: 2015,
                    type: '自然引流数',
                    value: 888
                }, {
                    year: 2015,
                    type: '自然点击产品数',
                    value: 999
                }, {
                    year: 2015,
                    type: '自然产品申请数',
                    value: 888
                }, {
                    year: 2015,
                    type: '总产品申请数',
                    value: 777
                }, {
                    year: 2015,
                    type: '产品实际申请人数',
                    value: 666
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