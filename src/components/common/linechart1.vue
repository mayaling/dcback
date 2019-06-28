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
        // charData: function (val, oldVal) {    // 监听charData，当发生变化时，触发这个回调函数绘制图表
        // console.log('new: %s, old: %s', val, oldVal);
        // this.drawChart(val);
        // }

        methods: {
            drawChart: function() {
                // 2019.03.30 更新 destory方法已被废弃
                // this.chart && this.chart.destory()
                this.chart = new G2.Chart({
                    container: this.id,
                    forceFit: true,
                })
                this.chart.source(this.charData, {
                    year: {
                        type: 'timeCat',
                        range: [0, 1]
                    }
                });
                this.chart.axis('year', {
                    label: {
                        textStyle: {
                            fill: '#aaaaaa'
                        }
                    }
                });
                this.chart.axis('value', {
                    label: {
                        textStyle: {
                            fill: '#aaaaaa'
                        },
                        formatter: function formatter(text) {
                            return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                        }
                    }
                });
                this.chart.line().position('year*value').color('type', ['#ff4d4f', '#ff7a45', '#ffa940', '#facc14', '#bae637', '#73d13d', '#36cfc9', '#40a9ff']);
                this.chart.render();
            }
        }
    }
</script>
<style scoped>

</style>