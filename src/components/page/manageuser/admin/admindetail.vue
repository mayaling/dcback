<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">管理员详情</div>
			<div class="item-detail">
		  	<el-row :gutter="10" class="clearfix">
				  <el-col :span="4" class="el-item__label tar">账号：</el-col>
				  <el-col :span="8">{{list.name}}</el-col>
				  <el-col :span="4" class="el-item__label tar">注册时间：</el-col>
				  <el-col :span="8">{{list.englishName}}</el-col>
				</el-row>
				<!-- <el-row :gutter="10" class="clearfix">
					<el-col :span="4" class="el-item__label tar">性别：</el-col>
				  <el-col :span="8">{{list.sex ? "女" : "男"}}</el-col>
				  <el-col :span="4" class="el-item__label tar">手机号：</el-col>
				  <el-col :span="8">{{list.phone}}</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">
				  <el-col :span="4" class="el-item__label tar">学校：</el-col>
				  <el-col :span="8">{{list.school}}</el-col>
				  <el-col :span="4" class="el-item__label tar">年级：</el-col>
				  <el-col :span="8">{{list.grade}}</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">
				  <el-col :span="4" class="el-item__label tar">班级：</el-col>
				  <el-col :span="8">{{list.klass}}</el-col>
				  <el-col :span="4" class="el-item__label tar">科目：</el-col>
				  <el-col :span="8">{{list.subject}}</el-col>
				</el-row> -->
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'studentDetail',
    data() {
      return {
      	list:[],
      	loading:true
      }    
    },
    created(){
			var id = this.$route.query.id
			this.$axios.get('admins/'+id).then((res) => {
                console.log(res)
      	// let newData = JSON.parse(JSON.stringify(res))
      	// if(newData.code === 0){
      	// 	this.list = newData.data
      	// }else{
      	// 	this.$message.error('接口数据请求失败');
      	// }
      	this.loading = false
      }).catch(() => {this.loading = false})
    },
    computed: {

    },
    methods: {

    }
  }
</script>
<style scoped>
.photo{ max-width:120px; display: block; margin:0 auto;}
</style>
