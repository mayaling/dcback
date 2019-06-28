<template>
  <div class="index-wrap" v-loading="loading" element-loading-text="加载中">
		<div class="exam_top">
			<div class="exam_top_wrap clearfix">
				<div class="exam_logo clearfix"><img src="../../assets/logo_a.png"/>立洋在线评测</div>
				<div class="exam_signout">{{userInfo.name}}，您好<a @click="signout">【退出】</a></div>
			</div>
		</div>
		<div class="exam">
			<!--{{listenlist}}-->
			<div class="exam-about">2018 Elite Midterm Exam——ESL &nbsp;&nbsp; 2018年立洋期中考试——领导力<br />45 Minutes. Full Marks: 100 Points  &nbsp;&nbsp;  考试时间45分钟; 满分：100分。</div>
			<ul class="exam-student clearfix">
				<li><span class="fl"><strong>Chinese Name</strong><br />考生姓名</span>
					<span>{{userInfo.name}}</span>
				</li>
				<li>
					<span class="fl"><strong>Class</strong><br />班级</span>
					<span>{{userInfo.grade}}{{userInfo.klass}}</span>					
				</li>
				<li>
					<span class="fl"><strong>English Name</strong><br />英语名</span>
					<span>{{userInfo.englishName}}</span>
				</li>
			</ul>
			<el-form :model="form" ref="form">
				<div class="exam-Listen">
					<div class="part-title">Part 1<span>Listen and choose the right answer</span></div>
					<div class="part-name">{{listenTestName}}</div>
					<div class="exam-example">
						<div class="exam-example-title">Example:</div>
						<el-form-item :label="listenExample[0]">
					    <el-radio-group disabled v-model="listenExampleVal">
					      <el-radio label="A">{{listenExample[1]}}</el-radio>
					      <el-radio label="B">{{listenExample[2]}}</el-radio>
					      <el-radio label="C">{{listenExample[3]}}</el-radio>
					      <el-radio label="D">{{listenExample[4]}}</el-radio>
					    </el-radio-group>
					  </el-form-item>
					</div>
					<template v-for="item in listenlist">
					<el-form-item :label="item.name">
				    <el-radio-group  v-model="item.exam">
				      <el-radio :label="item.option1">a).{{item.option1}}</el-radio>
				      <el-radio :label="item.option2">b).{{item.option2}}</el-radio>
				      <el-radio :label="item.option3">c).{{item.option3}}</el-radio>
				      <el-radio :label="item.option4">d).{{item.option4}}</el-radio>
				    </el-radio-group>
				  </el-form-item>
				  </template>
			  </div>
			  
			  <div class="exam-Read">
					<div class="part-title">Part 2<span>{{readTestName}}</span></div>
					<div class="part-info">{{readInfo}}</div>
					<div class="exam-example">
						<div class="exam-example-title">Example:</div>
						<el-form-item :label="readExample[0]">
					    <el-select v-model="readExampleVal" disabled size="mini" style="width:85px; float:right;">
								<el-option key="0" label="T" value="T"></el-option>
								<el-option key="1" label="F" value="F"></el-option>
							</el-select>
					  </el-form-item>
					</div>
					<template v-for="(item,index) in readlist">
					<el-form-item :label="index+1 + '.' + item.name">
				    <el-select v-model="item.exam" size="mini" style="width:85px; float:right;" placeholder="请选择">
							<el-option key="0" label="T" value="T"></el-option>
							<el-option key="1" label="F" value="F"></el-option>
						</el-select>
				  </el-form-item>
				  </template>
			  </div>
			  
			  <div class="exam-Write">
					<div class="part-title">Part 3<span>{{writeTestName}}</span></div>
					<div class="exam-example">
						<div class="exam-example-title">Example:</div>
						<el-form-item :label="writeExample[0]">
					    <el-input disabled v-model="writeExample[1]"></el-input>
					  </el-form-item>
					</div>
					<template v-for="item in writelist">
					<el-form-item :label="item.name">
						<el-input v-model="item.exam"></el-input>
				  </el-form-item>
				  </template>
			  </div>
			  
			  <div class="exam-Read">
					<div class="part-title">Part 4<span>{{chooseTestName}}</span></div>
					<div class="exam-prompts"><span v-for="item in choosePrompts">{{item}}</span></div>
					<div class="part-info">{{chooseInfo}}</div>
					<template v-for="(item,index) in chooseList">
					<el-form-item :label="index+1 + '.' + item.name">
				    <el-select v-model="item.exam" size="mini" style="width:120px; float:right;" placeholder="请选择">
							<el-option v-for="item in choosePrompts" :key="item" :label="item" :value="item"></el-option>
						</el-select>
				  </el-form-item>
				  </template>
			  </div>
			  
			  <div class="exam_btn">
          <el-button type="primary" @click="submit">提交测评</el-button>
        </div>
			</el-form>
		</div>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
      	paperId:"",
      	listenTestName:"",
      	listenExample:[],
      	listenExampleVal:"D",
      	listenlist:"",
      	readInfo:"",
      	readTestName:"",
      	readExample:[],
      	readExampleVal:"F",
      	readlist:"",
      	writeExample:[],
      	writeTestName:"",
      	writelist:"",
      	choosePrompts:[],
      	chooseTestName:"",
      	chooseInfo:"",      	
      	chooseList:"",      	
      	total:0,
      	loading:true,
      	exam:[],
      	userInfo:[],
        form: {}
      }
    },
    created(){
    	this.userInfo = this.username = JSON.parse(localStorage.getItem('userInfo'))
    	this.$get('papers/leadership').then((res) => {
      	if(res.code === 0){
      		if(res.data.paperId){
      			this.paperId = res.data.paperId.paperId
      		}
      		if(res.data.reading){
	      		for(var i=0,len = res.data.reading.testList.length ; i< len;i++){
	      			res.data.reading.testList[i].exam = ""
	      		}
	      		this.listenTestName = res.data.reading.testName
	      		this.listenExample = res.data.reading.example.split("|")
	      		this.listenlist = JSON.parse(JSON.stringify(res.data.reading.testList))
      		}
      		if(res.data.listening){
	      		for(var i=0,len = res.data.listening.testList.length ; i< len;i++){
	      			res.data.listening.testList[i].exam = ""
	      		}
	      		this.readInfo = res.data.listening.testContent
	      		this.readTestName = res.data.listening.testName
	      		this.readExample = res.data.listening.example.split("|")
	      		this.readlist = JSON.parse(JSON.stringify(res.data.listening.testList))
      		}
      		if(res.data.writing){
	      		for(var i=0,len = res.data.writing.testList.length ; i< len;i++){
	      			res.data.writing.testList[i].exam = ""
	      		}
	      		this.writeExample = res.data.writing.example.split("|")
	      		this.writeTestName = res.data.writing.testName
	      		this.writelist = JSON.parse(JSON.stringify(res.data.writing.testList))
      		}
      		if(res.data.choose){
	      		for(var i=0,len = res.data.choose.testList.length ; i< len;i++){
	      			res.data.choose.testList[i].exam = ""
	      		}
	      		this.choosePrompts = res.data.choose.prompts.split("|")
	      		this.chooseTestName = res.data.choose.testName
	      		this.chooseInfo = res.data.choose.testContent
	      		this.chooseList = JSON.parse(JSON.stringify(res.data.choose.testList))
      		}
      	}else{
      		this.$message.error('题库获取失败');
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
        var	item;
        var paperId = parseInt(this.paperId);
      	for(var i=0; i <this.listenlist.length; i++ ){
    			item = {"testId":this.listenlist[i].id,"answer":this.listenlist[i].exam,"paperId":paperId}
    			this.exam.push(item)
      	}
      	for(var i=0; i <this.readlist.length; i++ ){
    			item = {"testId":this.readlist[i].id,"answer":this.readlist[i].exam,"paperId":paperId}
    			this.exam.push(item)
      	}
      	for(var i=0; i <this.writelist.length; i++ ){
    			item = {"testId":this.writelist[i].id,"answer":this.writelist[i].exam,"paperId":paperId}
    			this.exam.push(item)
      	}
      	for(var i=0; i <this.chooseList.length; i++ ){
    			item = {"testId":this.chooseList[i].id,"answer":this.chooseList[i].exam,"paperId":paperId}
    			this.exam.push(item)
      	}
        //console.log(this.exam)
		  	this.$post('students/'+ this.userInfo.id +'/leadershiptest',this.exam).then((res) => {
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
      }
    }
  }
</script>
