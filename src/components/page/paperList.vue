<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">阅卷管理</div>
			<div class="mgb20">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="4"><el-input v-model.trim="s_school" placeholder="输入学校" @keyup.enter.native="search"></el-input></el-col>
					<el-col :span="4"><el-input v-model.trim="s_grade" placeholder="输入年级" @keyup.enter.native="search"></el-input></el-col>
					<el-col :span="4"><el-input v-model.trim="s_klass" placeholder="输入班级" @keyup.enter.native="search"></el-input></el-col>
					<el-col :span="4"><el-input v-model.trim="s_name" placeholder="学生姓名" @keyup.enter.native="search"></el-input></el-col>
					<el-col :span="4"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col>
				</el-row>
			</div>
			<el-table :data="tableData" border size="medium" ref="multipleTable">
				<el-table-column prop="studentName" label="姓名" align="center"></el-table-column>
				<el-table-column prop="school" label="学校" align="center"></el-table-column>
				<el-table-column prop="grade" label="年级" align="center"></el-table-column>
				<el-table-column prop="klass" label="班级" align="center"></el-table-column>
				<el-table-column prop="paperName" label="考试科目" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<!--<router-link v-if="scope.row.isOver" :to="{path:'paperDetail',query:{id:scope.row.id}}" style="color:#0085c8;">详情</router-link>-->
						<router-link v-if="scope.row.paperName == '领导力测试'" :to="{path:'paperReview',query:{pid:scope.row.paperId,sid:scope.row.studentId}}" style="color:#0085c8;">批卷</router-link>
						<router-link v-if="scope.row.paperName == '7-8年级入学考试'" :to="{path:'grades_exam_7_8_review',query:{pid:scope.row.paperId,sid:scope.row.studentId}}" style="color:#0085c8;">批卷</router-link>
						<router-link v-if="scope.row.paperName == '6-7年级入学考试'" :to="{path:'grades_exam_6_7_review',query:{pid:scope.row.paperId,sid:scope.row.studentId}}" style="color:#0085c8;">批卷</router-link>
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
        tableData: [],
        cur_page: 1,
        pages:0,
        s_school: '',
        s_grade: '',
        s_klass: '',
        s_name: '',
        loading: false
      }
    },
    created(){
    	this.$get('student_papers').then((res) => {
      	if(res.code === 0){
      		this.tableData = JSON.parse(JSON.stringify(res.data.list))
      		this.pages = res.data.pages;
      	}else{
      		this.$message.error('学生加载失败');
      	}
      	this.loading = false
      }).catch(() => {this.loading = false})
    },
    computed: {

    },
    methods: {
    	// 分页导航
      handleCurrentChange(val) {
      	this.loading = true
				this.$get('student_papers',{pageNum:val,shool:this.s_shool,grade:this.s_grade,klass:this.s_klass,studentName:this.s_name}).then((res) => {
	      	if(res.code === 0){
	      		this.tableData = JSON.parse(JSON.stringify(res.data.list))
      			this.pages = res.data.pages;
	      	}else{
	      		this.$message.error('学生加载失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
      },
      
      // 搜索
      search(){
    		this.loading = true
    		this.$get('student_papers',{shool:this.s_shool,grade:this.s_grade,klass:this.s_klass,studentName:this.s_name}).then((res) => {
	      	if(res.code === 0){
	      		this.tableData = JSON.parse(JSON.stringify(res.data.list))
      			this.pages = res.data.pages;
	      	}else{
	      		this.$message.error('学生加载失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
			}			
    }
  }
</script>

<style scoped>
</style>
