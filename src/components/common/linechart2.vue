<template>
        <div :id="id"></div>
      </template>

<script>
    import G2 from '@antv/g2'
    export default {
        data() {
            return {
                chart: null
            }
        },
        props: {
            charData: {
                type: Array,
                default: function() {
                    return {
                        data: []
                    }
                }
            },
            id: String
        },
        // 如果使用serverData传过来的静态数据 请使用mounted()方法 并注释掉watch
        mounted() {
            this.drawChart()
        },

        
        // 监听API接口传过来的数据 使用watch  2018-08-21更新
        // watch: {
        //     charData: function (val, oldVal) {    // 监听charData，当发生变化时，触发这个回调函数绘制图表
        //     console.log('new: %s, old: %s', val, oldVal);
        //     this.drawChart(val);
        //     }
        // },

        methods: {
            drawChart: function() {
                // 2019.03.30 更新 destory方法已被废弃
                // this.chart && this.chart.destory()
                this.chart = new G2.Chart({
                        container: this.id,
                        forceFit: true,
                        // width: 600,
                        // height: 400,
                        // height: window.innerHeight,
                        // padding: [20, 40, 50, 20]
                    })
                    // this.chart.scale('value', {
                    //     alias: '体能分'
                    // });
                this.chart.source(this.charData)
                    // this.chart.axis('value', {
                    //     label: {
                    //         textStyle: {
                    //             fill: '#aaaaaa'
                    //         }
                    //     },
                    //     tickLine: {
                    //         alignWithLabel: false,
                    //         length: 0
                    //     }
                    // });
                this.chart.axis('value', {
                    label: null
                });
                this.chart.legend(false);
                this.chart.interval().position('name*value').opacity(1).label('value', {
                    offset: 10,
                    textStyle: {
                        fill: '#595959',
                        fontSize: 12
                    }
                });
                this.chart.render()
            }
        }
    }
</script>
<style scoped>

</style>