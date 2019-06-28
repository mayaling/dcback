<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">{{studentName}}的试卷批阅</div>
			<el-alert title="选择题、判断题、填空题系统已经自动批阅，您只需批阅以下试题：" type="error" class="mgb20" :closable="false">
  </el-alert>
			<el-form :model="form" ref="form">
			  <div class="exam-Write">
					<div class="part-title">Part 3<span>{{writeTestName}}</span></div>
					<template v-for="item in writelist">
						<div class="papers-write clearfix">
							<div class="fl">
								<div class="Q">{{item.name}}</div>
								<div class="A">{{item.anwser}}~</div>
							</div>
							<div class="fr"><el-input v-model="item.exam" placeholder="评分"></el-input></div>
						</div>
				  </template>
			  </div>
			  <div class="exam_btn">
          <el-button type="primary" @click="submit">提交</el-button>
        </div>
			</el-form>
		</div>
	</div>
</template>


<script>
  export default {
    name: 'student',
    data() {
      return {
      	writeTestName:"",
      	writelist:"",
        studentName:"",
        studentId:0,
        userInfo:[],
        paperId:0,
        loading: true,
        form:{}
      }
    },
    created(){
    	this.studentId = this.$route.query.sid
    	this.paperId = this.$route.query.pid
    	this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    	this.$get('student_papers/'+this.paperId,{"studentId":this.studentId}).then((res) => {
	      	if(res.code === 0){
	      		if(res.data.writing){
		      		for(var i=0,len = res.data.writing.testList.length ; i< len;i++){
		      			res.data.writing.testList[i].exam = ""
		      		}
		      		this.writeTestName = res.data.writing.testName
		      		this.writelist = JSON.parse(JSON.stringify(res.data.writing.testList))
		      		this.studentName = res.data.studentName.studentName
	      		}
	      	}else{
	      		this.$message.error('接口数据请求失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
    },
    computed: {

    },
    methods: {
			submit() {
      	this.loading = true
      	this.exam = []
        var	item,count = 0;
      	for(var i=0; i <this.writelist.length; i++ ){
      		if(this.writelist[i].exam === ""){
      			count = 1
      		}
    			item = {"testId":this.writelist[i].id,"id":this.writelist[i].scoreId,"score":parseInt(this.writelist[i].exam)}
    			this.exam.push(item)
      	}
      	if(count === 1){
	        this.$confirm('有试题未打分，是否继续提交?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
						this.submitResults()
	        }).catch(() => {
        		this.loading = false
	        });
      	}else{
      		this.submitResults()
      	}
      },
      submitResults(){
      	this.$put('teachers/'+ this.userInfo.id +'/correctpaper/'+this.paperId+'?studentId='+this.studentId,this.exam).then((res) => {
	      	if(res.code === 0){
          	this.$alert('提交成功！', '提示', {
		          confirmButtonText: '确定',
		          callback: action => {
		            this.$router.push('/paperList');
		          }
		        })
	      	}else{
	      		this.$message.error(res.msg);
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
      }
    }
  }
</script>

<style scoped>
.photo{height:40px; width:40px;display:block;background-size:contain; background-repeat:no-repeat; margin:0 auto;}
</style>
