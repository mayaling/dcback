<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        我是首页
            
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