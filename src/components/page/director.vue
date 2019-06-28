<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container" style="min-height:400px;">
			<div class="container-title">教学主任听课报告</div>
			<div class="mgb20">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="8"><el-date-picker v-model="s_Date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker></el-col>
					<el-col :span="8"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col>
				</el-row>
			</div>
			<div>
				<!--<div class="item-detail" style="padding:20px 0;">
			  	<el-row :gutter="10" class="clearfix">
					  <el-col :span="6" class="el-item__label tar">Time duration 听课时段：</el-col>
					  <el-col :span="6">{{list.other.duration ? list.other.duration : ''}}</el-col>
					  <el-col :span="6" class="el-item__label tar">Local teacher 合作学校老师：</el-col>
					  <el-col :span="6">{{list.other.localTeacher ? list.other.localTeacher : ''}}</el-col>
					</el-row>
			  	<el-row :gutter="10" class="clearfix">
					  <el-col :span="6" class="el-item__label tar">Sales manager 销售经理：</el-col>
					  <el-col :span="6">{{list.other.salesManager ? list.other.salesManager : ''}}</el-col>
					  <el-col :span="6" class="el-item__label tar">Observer 听课人：</el-col>
					  <el-col :span="6">{{list.other.observer ? list.other.observer : ''}}</el-col>
					</el-row>
				</div>-->
				<el-table v-if="list.rubrics" :data="list.rubrics" border size="medium" ref="multipleTable" style='margin-bottom:20px;'>
					<el-table-column label="" align="center" width="40">
						<template slot-scope="scope">{{scope.$index+1}}</template>
					</el-table-column>
					<el-table-column prop='itemName' label="RUBRICS"></el-table-column>
					<el-table-column label="平均分" align="center" width="100">
						<template slot-scope="scope">{{scope.row.choose ? scope.row.choose : '未评分'}}</template>
					</el-table-column>
				</el-table>
				
				<el-table v-if="list.learningEnvironment" :data="list.learningEnvironment" border size="medium" ref="multipleTable" style='margin-bottom:20px;'>
					<el-table-column label="" align="center" width="40">
						<template slot-scope="scope">{{scope.$index+6}}</template>
					</el-table-column>
					<el-table-column prop='itemName' label="LEARNING ENVIRONMENT 学习氛围"></el-table-column>
					<el-table-column label="平均分" align="center" width="100">
						<template slot-scope="scope">{{scope.row.choose ? scope.row.choose : '未评分'}}</template>
					</el-table-column>
				</el-table>
				
				<el-table v-if="list.subjectMatterKnowledge" :data="list.subjectMatterKnowledge" border size="medium" ref="multipleTable" style='margin-bottom:20px;'>
					<el-table-column label="" align="center" width="40">
						<template slot-scope="scope">{{scope.$index+10}}</template>
					</el-table-column>
					<el-table-column prop='itemName' label="LEARNING ENVIRONMENT 学习氛围"></el-table-column>
					<el-table-column label="平均分" align="center" width="100">
						<template slot-scope="scope">{{scope.row.choose ? scope.row.choose : '未评分'}}</template>
					</el-table-column>
				</el-table>
				
				<el-table v-if="list.engagingAndSupportin" :data="list.engagingAndSupportin" border size="medium" ref="multipleTable" style='margin-bottom:20px;'>
					<el-table-column label="" align="center" width="40">
						<template slot-scope="scope">{{scope.$index+14}}</template>
					</el-table-column>
					<el-table-column prop='itemName' label="LEARNING ENVIRONMENT 学习氛围"></el-table-column>
					<el-table-column label="平均分" align="center" width="100">
						<template slot-scope="scope">{{scope.row.choose ? scope.row.choose : '未评分'}}</template>
					</el-table-column>
				</el-table>
				
				<el-table v-if="list.assessingStudentLearning" :data="list.assessingStudentLearning" border size="medium" ref="multipleTable" style='margin-bottom:20px;'>
					<el-table-column label="" align="center" width="40">
						<template slot-scope="scope">{{scope.$index+17}}</template>
					</el-table-column>
					<el-table-column prop='itemName' label="LEARNING ENVIRONMENT 学习氛围"></el-table-column>
					<el-table-column label="平均分" align="center" width="100">
						<template slot-scope="scope">{{scope.row.choose ? scope.row.choose : '未评分'}}</template>
					</el-table-column>
				</el-table>
				
				<el-table v-if="list.planningDesigningAndDelivering" :data="list.planningDesigningAndDelivering" border size="medium" ref="multipleTable" style='margin-bottom:20px;'>
					<el-table-column label="" align="center" width="40">
						<template slot-scope="scope">{{scope.$index+19}}</template>
					</el-table-column>
					<el-table-column prop='itemName' label="LEARNING ENVIRONMENT 学习氛围"></el-table-column>
					<el-table-column label="平均分" align="center" width="100">
						<template slot-scope="scope">{{scope.row.choose ? scope.row.choose : '未评分'}}</template>
					</el-table-column>
				</el-table>
				
				<el-table :data="list.otherList || []" border size="medium" ref="multipleTable" style="margin-top:20px;">
					<el-table-column prop="createDate" label="创建日期" align="center" width="100"></el-table-column>
					<el-table-column prop="comment" label="教学主任评语" width ='500'></el-table-column>
					<el-table-column prop="duration" label="听课时段" align="center"></el-table-column>
					<el-table-column prop="observer" label="听课人"></el-table-column>
					<el-table-column prop="localTeacher" label="合作学校老师"></el-table-column>
					<el-table-column prop="salesManager" label="销售经理"></el-table-column>
				</el-table>
				<!--<dl v-if="list.observerComments" style="margin-bottom:20px; border:1px solid #ebeef5;">
					<dt style="line-height:44px; font-weight:bold; color:#909399; padding:0 10px; font-size:14px;">{{list.observerComments.itemName}}</dt>
					<dd style="padding:20px 10px; line-height:24px; font-size:16px; color:#606266; border-top:1px solid #ebeef5;">
						{{list.observerComments.choose ? list.observerComments.choose : '未填写'}}</dd>
				</dl>
				
				<dl v-if="list.lecturerReflection" style="margin-bottom:20px; border:1px solid #ebeef5;">
					<dt style="line-height:44px; font-weight:bold; color:#909399; padding:0 10px; font-size:14px;">{{list.lecturerReflection.itemName}}</dt>
					<dd style="padding:20px 10px; line-height:24px; font-size:16px; color:#606266; border-top:1px solid #ebeef5;">
						{{list.lecturerReflection.choose ? list.lecturerReflection.choose : '未填写'}}</dd>
				</dl>-->
			</div>
		</div>
	</div>
</template>


<script>
  export default {
    name: 'teacher',
    data() {
      return {
        list:[],
        s_Date:[],
        teacherId:0,
        classId:0,
        loading: true,
        startDate:''
      }
    },
    created(){
    	this.classId = this.$route.query.cid
    	this.teacherId = this.$route.query.tid
      this.$get('academicdeans/'+this.teacherId+'/classes/'+this.classId+'/classevaluation').then((res) => {
      	if(res.code === 0){
    			this.list = JSON.parse(JSON.stringify(res.data))
    			console.log(res.data)
    			this.loading = false
      	}else{
      		this.$message.error('获取数据失败');
      		this.loading = false
      	}
      }).catch(() => {this.loading = false})
    },
    computed: {
    	
    },
    methods: {
      //搜索
      search(){
				this.loading = true
        this.list = []
    		var startDate = '',endDate=''
    		if(this.s_Date === '' || this.s_Date == null){
    			
    		}else if(this.s_Date.length>0){
    			startDate = this.s_Date[0]
    			endDate = this.s_Date[1]
    		}
		      this.$get('academicdeans/'+this.teacherId+'/classes/'+this.classId+'/classevaluation',{startDate:startDate,endDate:endDate}).then((res) => {
		      	if(res.code === 0){
		    			this.list = JSON.parse(JSON.stringify(res.data))
		    			this.loading = false
		      	}else{
		      		this.$message.error('获取数据失败');
		      		this.loading = false
		      	}
		      }).catch(() => {this.loading = false})
    	},
			trim(str) {
				return str.replace(/\n|\r\n/g,"<br/>")
      }
    }
  }
</script>

<style scoped>
</style>
