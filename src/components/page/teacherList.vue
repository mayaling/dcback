<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">教师列表</div>
			<div class="mgb20">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="4"><el-input v-model.trim="s_school" placeholder="输入学校" @keyup.enter.native="search"></el-input></el-col>
					<el-col :span="4"><el-input v-model.trim="s_grade" placeholder="输入年级" @keyup.enter.native="search"></el-input></el-col>
					<el-col :span="4"><el-input v-model.trim="s_klass" placeholder="输入班级" @keyup.enter.native="search"></el-input></el-col>
					<el-col :span="8"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col>
					<!--<el-col :span="4" class="tar"><router-link to="/studentEnter?t=1"><el-button type="success">新增</el-button></router-link></el-col>-->
				</el-row>
			</div>
			<el-table :data="tableData" border size="medium" ref="multipleTable">
				<el-table-column prop="name" label="姓名" align="center" width="120"></el-table-column>
				<el-table-column prop="englishName" label="英文名" align="center"></el-table-column>
				<el-table-column prop="username" label="用户名" align="center"></el-table-column>
				<el-table-column prop="sex" label="性别" align="center" width="80"></el-table-column>
				<el-table-column prop="subject" label="科目" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="110">
					<template slot-scope="scope">
						<router-link :to="{path:'studentDetail',query:{id:scope.row.id}}" style="color:#35a000;">详情</router-link>
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
        loading:true
      }
    },
    created(){
    	this.$get('students').then((res) => {
      	if(res.code === 0){
      		this.tableData = JSON.parse(JSON.stringify(res.data.list))
      		this.pages = res.data.pages;
      		for(var i=0;i<this.tableData.length;i++){
      			if(this.tableData[i].sex){
      				this.tableData[i].sex = '女'
      			}else{
      				this.tableData[i].sex = '男'
      			}
      		}
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
				this.$get('students',{pageNum:val}).then((res) => {
	      	if(res.code === 0){
	      		this.tableData = JSON.parse(JSON.stringify(res.data.list))
	      		this.pages = res.data.pages;
	      		for(var i=0;i<this.tableData.length;i++){
	      			if(this.tableData[i].sex){
	      				this.tableData[i].sex = '女'
	      			}else{
	      				this.tableData[i].sex = '男'
	      			}
	      		}
	      	}else{
	      		this.$message.error('学生加载失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
      },
      
      // 搜索
      search(){
    		this.loading = true
    		this.$get('students',{shool:this.s_shool,grade:this.s_grade,klass:this.s_klass}).then((res) => {
	      	if(res.code === 0){
	      		this.tableData = JSON.parse(JSON.stringify(res.data.list))
	      		this.pages = res.data.pages;
	      		for(var i=0;i<this.tableData.length;i++){
	      			if(this.tableData[i].sex){
	      				this.tableData[i].sex = '女'
	      			}else{
	      				this.tableData[i].sex = '男'
	      			}
	      		}
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
