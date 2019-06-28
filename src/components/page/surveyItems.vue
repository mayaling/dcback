<template>
  <div class="index-wrap" v-loading="loading" element-loading-text="加载中">
		<div class="exam_top">
			<div class="exam_top_wrap clearfix">
				<div class="exam_logo clearfix"><img src="../../assets/logo_a.png"/>立洋在线评测</div>
				<div class="exam_signout">{{userInfo.name}}，您好<a @click="signout">【退出】</a></div>
			</div>
		</div>
		<div class="exam examSurvey">
			<div class="exam_title">2019年立洋学生问卷调查 Elite Student Survey</div>
			<el-alert title="备注：" description="请选择相应的选项。选项分值：很棒（10分），良好（8分），一般（5分），需改进（2分）" type="success" :closable="false"></el-alert>
			<el-form :model="form" ref="form" :rules="rules">
				<template v-for="(item,index) in list">
				<el-form-item>
					<div class="examName clearfix"><em>{{index+1}}、</em><span v-html="item.itemName"></span></div>
			    <el-radio-group  v-model="item.exam">
			      <el-radio :label="item.option1">很棒</el-radio>
			      <el-radio :label="item.option2">良好</el-radio>
			      <el-radio :label="item.option3">一般</el-radio>
			      <el-radio :label="item.option4">需改进</el-radio>
			    </el-radio-group>
			  </el-form-item>
			  </template>
			  <el-form-item label="填写评价:" prop="info">
			  	<el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="form.info"></el-input>
			  </el-form-item>
			  <el-form-item label="选择班级:" prop="classId">
					<el-select v-model="form.classId" filterable placeholder="选择班">
						<el-option v-for="item in student" :key="item.id" :label="item.className" :value="item.id"></el-option>
					</el-select>
			  </el-form-item>
			  <div class="exam_btn">
          <el-button type="primary" @click="submit('form')">提交问卷</el-button>
        </div>
			</el-form>
		</div>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
      	list:"",
      	student:"",
      	total:0,
      	loading:true,
      	exam:[],
      	userInfo:[],
        form: {
        	classId:"",
        	info:""
        },
        rules:{
        	classId: [
            { required: true, message: '不可为空！', trigger: 'change' }
          ],
          info: [
            { required: true, message: '不可为空！', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
    	this.userInfo = this.username = JSON.parse(localStorage.getItem('userInfo'))
    	this.$get('students/'+this.userInfo.id).then((res) => {
      	let student = JSON.parse(JSON.stringify(res))
      	if(student.code === 0){
      		this.student = student.data.classList
      	}else{
      		this.$message.error('接口数据请求失败');
      	}
      }).catch(() => {this.loading = false})
    	
    	
    	
    	this.$get('survey_items',{pageSize:100}).then((res) => {
      	if(res.code === 0){
      		for(var i=0,len = res.data.list.length; i< len;i++){
      			res.data.list[i].itemName = this.trim(res.data.list[i].itemName)
	      		res.data.list[i].exam = ""
	      	}
      		this.list = JSON.parse(JSON.stringify(res.data.list))
      		this.loading = false
      	}else{
      		this.$message.error('题库获取失败');
      		this.loading = false
      	}
      	
      }).catch(() => {this.loading = false})
    },
    computed: {

    },
    methods: {
      submit(formName) {
      	this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.loading = true
		      	this.exam = []
		        var	item,count = 0;
		      	for(var i=0; i <this.list.length; i++ ){
		      		if(this.list[i].exam === ""){
		      			count = 1
		      		}
		    			item = {"surveyId":this.list[i].id,"choose":parseInt(this.list[i].exam)}
		    			this.exam.push(item)
		      	}
		      	if(count === 1){
			        this.$confirm('问卷未全部选择，是否继续提交?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
								this.submitResults()
			        }).catch(() => {
		        		this.loading = false
			        });
		      	}else{
		      		this.submitResults()
		      	}
          } else {
            return false;
          }
       })
      },
      submitResults(){
      	this.$post('students/'+ this.userInfo.id+'/classes/'+ parseInt(this.form.classId) +'/surveys',{
      		comment:this.form.info,
      		chooseList:this.exam
      		}).then((res) => {
	      	if(res.code === 0){
          	this.$alert('提交成功！', '提示', {
		          confirmButtonText: '确定',
		          callback: action => {
		            this.$router.push('/index');
		          }
		        })
	      	}else{
	      		this.$message.error(res.msg);
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
      },
      signout(){
        localStorage.setItem('userInfo','');
        localStorage.setItem('token','');
        this.$router.push('/login');
      },
      trim(str) {
				return str.replace(/\n|\r\n/g,"<br/>")
      }
    }
  }
</script>
<style>
.examSurvey .el-alert{ margin-bottom:20px;}
.examSurvey .el-alert__content .el-alert__title{display: block; font-size:16px;}
.examSurvey .el-alert__content .el-alert__description{font-size:15px;}
.examSurvey .examName{ font-size:16px; line-height:24px; color:#606266;}
.examSurvey .examName em{font-style:normal; display:block; float:left; margin-right:5px; height:26px; line-height:24px;}
.examSurvey .el-radio-group{ padding-left:35px;}
.examSurvey .el-radio+.el-radio{ margin-left:60px;}
.examSurvey .el-radio__label{font-size:16px;}
.examSurvey .el-textarea,.examSurvey .el-select{ width:400px;}


</style>