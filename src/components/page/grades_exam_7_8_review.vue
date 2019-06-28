<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">试卷批阅</div>
			<el-alert title="选择题、判断题、填空题系统已经自动批阅，您只需批阅以下试题：" type="error" class="mgb20" :closable="false">
  </el-alert>
			<el-form :model="form" ref="form">
			  <div class="exam-Write" v-if="writinglist">
					<div class="part-title">Writing ● Part2</div>
						<div class="papers-write clearfix">
							<div class="fl">
								<div class="Q" v-html="writinglist[1].testName"></div>
								<div class="A">{{writinglist[1].itemList[0].anwser}}</div>
							</div>
							<div class="fr"><el-input v-model="writinglist[1].itemList[0].exam" placeholder="评分"></el-input></div>
						</div>
			  </div>
			  <div class="exam-Write" v-if="writinglist" style="padding-top:20px;">
					<div class="part-title">Writing ● Part3<span>Write the answer to one of the questions (7 or 8) in this part.<br />
Write your answer in about 100 words on your answer sheet.<br />
Tick the box (Question 7 or Question 8) on your answer sheet to show which question you have answered.</span></div>
						<div class="papers-write clearfix" style="margin-top:-20px;">
							<div class="fl">
								<div class="Q" v-html="writinglist[2].testName"></div>
								<div class="A">{{writinglist[2].itemList[0].anwser}}</div>
							</div>
							<div class="fr"><el-input v-model="writinglist[2].itemList[0].exam" placeholder="评分"></el-input></div>
						</div>
						<div class="papers-write clearfix">
							<div class="fl">
								<div class="Q" v-html="writinglist[3].testName"></div>
								<div class="A">{{writinglist[3].itemList[0].anwser}}</div>
							</div>
							<div class="fr"><el-input v-model="writinglist[3].itemList[0].exam" placeholder="评分"></el-input></div>
						</div>
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
      		if(res.data.writingPart){
	      		for(var i=0,len = res.data.writingPart.length ; i< len;i++){
	      			res.data.writingPart[i].testName = this.trim(res.data.writingPart[i].testName)
	      		}
	      		for(var i=0,len = res.data.writingPart[0].itemList.length ; i< len;i++){
	      			res.data.writingPart[0].itemList[i].itemName = this.trim(res.data.writingPart[0].itemList[i].itemName)
	      		}
	      		this.writinglist = JSON.parse(JSON.stringify(res.data.writingPart))
	      		console.log(this.writinglist)
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
        var	item
      	for(var i=1; i <this.writinglist.length; i++ ){
      		for (var j=0; j< this.writinglist[i].itemList.length; j++) {
					item={"scoreId":this.writinglist[i].itemList[j].scoreId,"score":parseInt(this.writinglist[i].itemList[j].exam?this.writinglist[i].itemList[j].exam:0)}
    				this.exam.push(item)
      		}
      	}
	      this.$confirm('确认全部评分并提交?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.submitResults()
					console.log(this.exam)
        }).catch(() => {
      		this.loading = false
        });
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
      },
      trim(str) {
				return str.replace(/\n|\r\n/g,"<br/>")
      }
    }
  }
</script>

<style scoped>
.photo{height:40px; width:40px;display:block;background-size:contain; background-repeat:no-repeat; margin:0 auto;}
</style>
