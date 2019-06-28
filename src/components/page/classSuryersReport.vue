<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">问卷报告</div>
			<div class="mgb20">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="8"><el-date-picker v-model="s_Date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker></el-col>
					<el-col :span="8"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col>
				</el-row>
			</div>
			<div class="item-detail" style="padding:20px 0;">
		  	<el-row :gutter="10" class="clearfix">
				  <el-col :span="4" class="el-item__label tar">学校：</el-col>
				  <el-col :span="8">{{list.school}}</el-col>
				  <el-col :span="4" class="el-item__label tar">课程：</el-col>
				  <el-col :span="8">{{list.subject}}</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">
					<el-col :span="4" class="el-item__label tar">外教：</el-col>
				  <el-col :span="8">{{list.teacherName}}</el-col>
				  <el-col :span="4" class="el-item__label tar">课时：</el-col>
				  <el-col :span="8">{{list.classHour}}</el-col>
				</el-row>
			</div>
			<el-table :data="surveysList" border size="medium" ref="multipleTable">
				<el-table-column prop="index" label="#" align="center" width="40"></el-table-column>
				<el-table-column label="问题">
					<template slot-scope="scope"><span v-html="scope.row.itemName"></span></template>
				</el-table-column>
				<el-table-column label="平均分" align="center" width="100">
					<template slot-scope="scope">{{scope.row.avgScore ? scope.row.avgScore : '0'}}</template>
				</el-table-column>
			</el-table>
			<div style="margin-top:30px;">
				<div style="font-size:16px; font-weight: bold; margin-bottom:15px;">学生评价：</div>
				<el-tag type="danger" v-if="commentsList.length == 0">暂无评价</el-tag>
				<template v-for="item in commentsList">
					<el-tag style="margin-right:10px;">{{item}}</el-tag>
				</template>
			</div>
		</div>
	</div>
</template>


<script>
  export default {
    name: 'teacher',
    data() {
      return {
	      surveysList:[],
	      commentsList:[],
        list:[],
        s_Date:[],
        overseasTeacherId:0,
        classId:0,
        loading: true,
        form:{
        	paperId:'',
        	startDate:''
        },
	      rules:{
          paperId: [
            { required: true, message: '不可为空！', trigger: 'change' }
          ],
          startDate: [
            { required: true, message: '不可为空！', trigger: 'change' }
          ]
	      }
      }
    },
    created(){
    	this.classId = this.$route.query.cid
    	this.overseasTeacherId = this.$route.query.tid
      //获取题库
      this.$get('teachers/'+this.overseasTeacherId+'/classes/'+this.classId+'/surveys',{comments:true}).then((res) => {
      	if(res.code === 0){
      		for(var i=0,len = res.data.surveyItemList.length; i< len;i++){
      			res.data.surveyItemList[i].itemName = this.trim(res.data.surveyItemList[i].itemName)
      			res.data.surveyItemList[i].index = i+1
	      	}
    			this.list = JSON.parse(JSON.stringify(res.data))
    			this.surveysList = JSON.parse(JSON.stringify(res.data.surveyItemList))
    			this.commentsList = res.data.commentsList
    			this.loading = false
      	}else{
      		this.$message.error('获取题库失败');
      		this.loading = false
      	}
      }).catch(() => {this.loading = false})
    },
    computed: {

    },
    methods: {
    	// 分页导航
      handleCurrentChange(val) {
      	this.loading = true
				this.$get('survey_plans',{pageNum:val,pageSize:100,classId:this.classId}).then((res) => {
	      	if(res.code === 0){
	      		this.pages = res.data.pages;
	      		this.tableData = JSON.parse(JSON.stringify(res.data.list))
	      	}else{
	      		this.$message.error('获取问卷失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
      },
      //搜索
      search(){
    		this.loading = true
    		this.surveysList = []
    		this.commentsList = []
    		var startDate = '',endDate=''
    		if(this.s_Date === '' || this.s_Date == null){
    			
    		}else if(this.s_Date.length>0){
    			startDate = this.s_Date[0]
    			endDate = this.s_Date[1]
    		}
    		
      this.$get('teachers/'+this.overseasTeacherId+'/classes/'+this.classId+'/surveys',{comments:true,startDate:startDate,endDate:endDate}).then((res) => {
      	if(res.code === 0){
      		for(var i=0,len = res.data.surveyItemList.length; i< len;i++){
      			res.data.surveyItemList[i].itemName = this.trim(res.data.surveyItemList[i].itemName)
      			res.data.surveyItemList[i].index = i+1
	      	}
    			this.list = JSON.parse(JSON.stringify(res.data))
    			this.surveysList = JSON.parse(JSON.stringify(res.data.surveyItemList))
    			
    			this.loading = false
      	}else{
      		this.$message.error('获取题库失败');
      		this.loading = false
      	}
      }).catch(() => {this.loading = false})
    	},
			papers(){
				this.dialogPaper = true
			},
			handleClose(formName){
				this.dialogPaper = false
        this.form.paperId = ''
        this.form.startDate = ''
        this.$refs['form'].resetFields();
			},
			onSubmit(formName){
				this.$refs[formName].validate((valid) => {
          if (valid) {
          	var teacherId = JSON.parse(localStorage.getItem('userInfo')).id
          	this.loading = true
        		this.$post('teachers/'+teacherId+'/classes/'+parseInt(this.classId)+'/survey',{
        			paperId:parseInt(this.form.paperId),
        			startDate:this.form.startDate[0],
        			endDate:this.form.startDate[1]
        		}).then((res) => {
			      	if(res.code === 0){
								this.$message({message:res.msg,type: 'success'});
								this.handleCurrentChange(1)
								this.handleClose('form')
			      	}else{
			      		this.$message.error(res.msg);
			      		this.loading = false
			      	}
			      }).catch(() => {this.loading = false})
          } else {
            return false;
          }
        });
			},
			trim(str) {
				return str.replace(/\n|\r\n/g,"<br/>")
      }
    }
  }
</script>

<style scoped>
</style>
