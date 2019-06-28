<template>
  <div class="index-wrap" v-loading="loading" element-loading-text="加载中">
		<div class="exam_top">
			<div class="exam_top_wrap clearfix">
				<div class="exam_logo clearfix"><img src="../../assets/logo_a.png"/>立洋在线评测</div>
				<div class="exam_signout">{{userInfo.name}}，您好<a @click="signout">【退出】</a></div>
			</div>
		</div>
		<div class="exam">
			<div class="exam_title">在线测验</div>
			<div class="noData" v-if="papersList.length == 0">暂无数据</div>
			<ul class="surverList" v-else style=" padding:20px; border:1px solid #e6e6e6; border-radius:5px; box-shadow:0 0 10px #e6e6e6;">
				<li v-for="(item , index) in papersList">
					<router-link v-if="item.examinationName == '7-8年级入学考试'" :to="{path:'grades_exam_7_8',query:{id:item.paperId,cid:item.classId}}" style="font-size:16px; color:#565656;">{{index+1}}、{{item.examinationName}}</router-link>
					<router-link v-if="item.examinationName == '6-7年级入学考试'" :to="{path:'grades_exam_6_7',query:{id:item.paperId,cid:item.classId}}" style="font-size:16px; color:#565656;">{{index+1}}、{{item.examinationName}}</router-link>
					<router-link v-if="item.examinationName == '领导力测试'" :to="{path:'leadershiptestb',query:{id:item.paperId,cid:item.classId}}" style="font-size:16px; color:#565656;">{{index+1}}、{{item.examinationName}}</router-link>
				</li>
			</ul>
		</div>
		<div class="exam">
			<div class="exam_title">调查问卷</div>
			<div class="noData" v-if="surveyList.length == 0">暂无数据</div>
			<ul class="surverList" v-else style=" padding:20px; border:1px solid #e6e6e6; border-radius:5px; box-shadow:0 0 10px #e6e6e6;">
				<li v-for="(item , index) in surveyList">
					<router-link :to="{path:'surveyItems',query:{id:item.paperId}}" style="font-size:16px; color:#565656;">{{index+1}}、{{item.surveyName}}</router-link>
				</li>
			</ul>
		</div>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
      	loading:true,
      	userInfo:[],
      	papersList:[],
      	surveyList:[]
      }
    },
    created(){
    	this.userInfo = this.username = JSON.parse(localStorage.getItem('userInfo'))
    	//获取试卷
    	this.$get('students/'+this.userInfo.id+'/papers').then((res) => {
      	if(res.code === 0){
      		this.papersList = JSON.parse(JSON.stringify(res.data))
      	}else{
      		this.$message.error('题库获取失败');
      	}
      	this.loading = false
      }).catch(() => {this.loading = false})
    	
    	//获取问卷
    	this.$get('students/'+this.userInfo.id+'/surveys').then((res) => {
      	if(res.code === 0){
      		this.surveyList = JSON.parse(JSON.stringify(res.data))
      	}else{
      		this.$message.error('题库获取失败');
      	}
      	this.loading = false
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
		            this.$router.push('/Login');
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
</style>