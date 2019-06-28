<template>
  <div class="index-wrap" v-loading="loading" element-loading-text="加载中">
		<div class="exam_top">
			<div class="exam_top_wrap clearfix">
				<div class="exam_logo clearfix"><img src="../../assets/logo_a.png"/>立洋在线评测</div>
				<div class="exam_signout">{{userInfo.name}}，您好<a @click="signout">【退出】</a></div>
			</div>
		</div>
		<div class="exam">
			<!--<div class="exam-about">2018 Elite Midterm Exam——ESL &nbsp;&nbsp; 2018年立洋期中考试——领导力<br />45 Minutes. Full Marks: 100 Points  &nbsp;&nbsp;  考试时间45分钟; 满分：100分。</div>-->
			<ul class="exam-student clearfix">
				<li><span class="fl"><strong>Chinese Name</strong><br />考生姓名</span>
					<span>{{userInfo.name}}</span>
				</li>
				<li>
					<span class="fl"><strong>English Name</strong><br />英语名</span>
					<span>{{userInfo.englishName}}</span>
				</li>
			</ul>
			<el-form :model="form" ref="form">
				<div class="none"><audio :src="audioUrl" @ended="audioEnded" autoplay="autoplay">您的浏览器不支持</audio></div>
				<div class="listenlist_1" v-if="listenlist[0].testName">
					<div class="part-title">Listening ● Part 1<span v-html="listenlist[0].testName" style="margin-top:10px;"></span></div>
					<!--<div class="part-name">{{listenTestName}}</div>-->
					<div class="audioBox"><el-button :type="audiolist[0].type" round @click="audioPlay(0)">{{audiolist[0].text}}</el-button></div>
					<div class="exam-example">
						<el-form-item :label="listenlist[0].example[0]">
					    <el-radio-group disabled v-model="listenExampleVal">
					      <el-radio label="a">A</el-radio>
					      <el-radio label="b">B</el-radio>
					      <el-radio label="c">C</el-radio>
					    </el-radio-group>
					  </el-form-item>
					  <div class="imglist clearfix" style="margin-top:-10px;">
					  	<div><img :src="listenlist[0].example[1]"><p>A</p></div>
					  	<div><img :src="listenlist[0].example[2]"><p>B</p></div>
					  	<div><img :src="listenlist[0].example[3]"><p>C</p></div>
					  </div>
					</div>
					<template v-for="(item , index) in listenlist[0].itemList">
					<el-form-item :label="index+1 +'、' +item.itemName">
				    <el-radio-group v-model="item.exam">
				      <el-radio label="a">A</el-radio>
				      <el-radio label="b">B</el-radio>
				      <el-radio label="c">C</el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <div class="imglist clearfix" style="margin-top:-10px;">
				  	<div><img :src="item.option1"><p>A</p></div>
				  	<div><img :src="item.option2"><p>B</p></div>
				  	<div><img :src="item.option3"><p>C</p></div>
				  </div>
				  </template>
			  </div>
			  
			  <div class="exam-Listen listenlist_1" v-if="listenlist[1].testName" style="margin-top:30px;">
					<div class="part-title">Listening ● Part 2<span v-html="listenlist[1].testName" style="margin-top:10px;"></span></div>
					<div class="audioBox"><el-button :type="audiolist[1].type" round @click="audioPlay(1)">{{audiolist[1].text}}</el-button></div>
					<template v-for="(item , index) in listenlist[1].itemList">
						
					<el-form-item :label="index+8 +'、' +item.itemName">
				    <el-radio-group v-model="item.exam">
				      <el-radio label="a">A、{{item.option1}}</el-radio>
				      <el-radio label="b">B、{{item.option2}}</el-radio>
				      <el-radio label="c">C、{{item.option3}}</el-radio>
				    </el-radio-group>
				  </el-form-item>
				  </template>
			  </div>
			  
			  <div class="exam-Listen listenlist_3"  v-if="listenlist[2].testName" style="margin-top:30px;">
					<div class="part-title">Listening ● Part 3<span v-html="listenlist[2].testName" style="margin-top:10px;"></span></div>
					<div class="audioBox"><el-button :type="audiolist[2].type" round @click="audioPlay(2)">{{audiolist[2].text}}</el-button></div>
					<div class="listen3_Info">
						<div class="title">Bristol Music Centre</div>
						<dl>
							<dt>Courses available now: </dt>
							<dd>• how to play the guitar</dd>
							<dd>• the history of (14) ......................... </dd>
						</dl>
						<dl>
							<dt>Careers training:</dt>
							<dd>• how to become a successful (15) ........................ </dd>
						</dl>
						<dl>
							<dt></dt>
							<dd>Cost of using the concert hall at the Centre on a Saturday: (16) £......................... </dd>
							<dd>Also available for use: (17).........................</dd>
						</dl>
						<dl>
							<dt>Information:</dt>
							<dd>Email address: (18) ......................... @musiccentre.com</dd>
							<dd>Phone number: (19) ......................... </dd>
						</dl>
					</div>
					<template v-for="(item , index) in listenlist[2].itemList">
					<el-form-item >
						{{item.itemName}}、<el-input v-model="item.exam"></el-input>
				  </el-form-item>
				  </template>
			  </div>
			  
			  <div class="exam-Read"  v-if="listenlist[3].testName" style="margin-top:30px;">
					<div class="part-title">Listening ● Part 4<span v-html="listenlist[3].testName" style="margin-top:10px;"></span></div>
					<div class="audioBox"><el-button :type="audiolist[3].type" round @click="audioPlay(3)">{{audiolist[3].text}}</el-button></div>
					<template v-for="(item , index) in listenlist[3].itemList">
					<el-form-item :label="index+20 +'、' +item.itemName">
				    <el-select v-model="item.exam" size="mini" style="width:85px; float:right;" placeholder="请选择">
							<el-option key="0" label="A" value="A"></el-option>
							<el-option key="1" label="B" value="B"></el-option>
						</el-select>
				  </el-form-item>
				  </template>
			  </div>
			  
			  
			  <div class="exam-Listen readinglist_1" v-if="readinglist[0].testName" style="margin-top:30px;">
					<div class="part-title">Reading ● Part1<span v-html="readinglist[0].testName" style="margin-top:10px;"></span></div>
					<div v-for="(item , index) in readinglist[0].itemList" class="clearfix" style="margin-bottom:15px;">
					<div class="fl">{{index+1}}、<img :src="item.itemName" ></div>
					<el-form-item>
				    <el-radio-group v-model="item.exam">
				      <el-radio label="a">A、{{item.option1}}</el-radio>
				      <el-radio label="b">B、{{item.option2}}</el-radio>
				      <el-radio label="c">C、{{item.option3}}</el-radio>
				    </el-radio-group>
				  </el-form-item>
				  </div>
			  </div>
			  
			  <div class="exam-Listen readinglist_1" v-if="readinglist[1].testName" style="margin-top:30px;">
					<div class="part-title">Reading ● Part2<span v-html="readinglist[1].testName" style="margin-top:10px;"></span></div>
					<div v-for="(item , index) in readinglist[1].itemList" class="clearfix" style="margin-bottom:15px;">
						<div class="fl">{{index+6}}、<img :src="item.itemName[0]" ></div>
						<div class="r">{{item.itemName[1]}}<br /><br />Answer:<el-input v-model="item.exam"></el-input></div>
				  </div>
				  <div class="reading3_info">
				  	<div>Centres</div>
				  	<p class="clearfix"><span class="l">A、</span><span class="rr" v-html="readinglist[1].itemList[0].option1"></span></p>
				  	<p class="clearfix"><span class="l">B、</span><span class="rr" v-html="readinglist[1].itemList[0].option2"></span></p>
				  	<p class="clearfix"><span class="l">C、</span><span class="rr" v-html="readinglist[1].itemList[0].option3"></span></p>
				  	<p class="clearfix"><span class="l">D、</span><span class="rr" v-html="readinglist[1].itemList[0].option4"></span></p>
				  	<p class="clearfix"><span class="l">E、</span><span class="rr" v-html="readinglist[1].itemList[0].option5"></span></p>
				  	<p class="clearfix"><span class="l">F、</span><span class="rr" v-html="readinglist[1].itemList[0].option6"></span></p>
				  	<p class="clearfix"><span class="l">G、</span><span class="rr" v-html="readinglist[1].itemList[0].option7"></span></p>
				  	<p class="clearfix"><span class="l">H、</span><span class="rr" v-html="readinglist[1].itemList[0].option8"></span></p>
				  </div>
			  </div>
			  
			  <div class="exam-Read readinglist_3"  v-if="readinglist[2].testName" style="margin-top:30px;">
					<div class="part-title">Reading ● Part 3<span v-html="readinglist[2].testName" style="margin-top:10px;"></span></div>
					<template v-for="(item , index) in readinglist[2].itemList">
					<el-form-item :label="index+11 +'、' +item.itemName">
				    <el-select v-model="item.exam" size="mini" style="width:85px; float:right;" placeholder="请选择">
							<el-option key="0" label="A" value="A"></el-option>
							<el-option key="1" label="B" value="B"></el-option>
						</el-select>
				  </el-form-item>
				  </template>
				  <div class="reading3_info">
				  	<div>CLIMBING TRIPby <br /> Samantha Dav</div>
				  	<p>My dad and I have both done a bit of climbing at our local sports centre. So we decided to go on a trip together, climbing the high rocks along the coastline of a small island. Although it wasn’t far from where we live, the journey across the sea took quite a long time – but it was worth it!</p>
						<p>As we approached the island, Dad pointed out the rocks covered in colourful plants, wild goats and bees, which were once the only signs of life on this now popular place for visitors. The island has become well-known as a climbing venue and the ferry we took across to the island was full of climbers carrying boots and backpacks.</p>
						<p>We arrived at the island’s harbour, full of brightly-coloured houses lit by the early-morning sun. We were met by a driver in an ancient old car, arranged by the travel company we’d booked with. The driver took us to the tiny apartment, which, like the car, had seen better days, but it was comfortable and we weren’t going to spend much time there anyway.</p>
						<p>There are lots of possible climbs up the island’s rocks, and not all of them have been discovered by climbers, but many have places clearly marked out so climbers can easily see where to put their hands and feet. All we needed were shoes, ropes and the equipment for attaching the rope to the rocks, although despite the markings on the rocks, I still had problems! Anyway, climbing is obviously not without risk, and things can still go wrong, but you’re far less likely to get into difficulties on the island.</p>
						<p>There was a wide range of climbers, both in ability and age, so there was no need for my previous worries about being the only teenager. Away from the rocks and back in the town, there was a very sociable atmosphere in the cafes, where we compared notes on what we’d achieved that day. </p>
						<p>One day, our climbing destination was a rough cliff, with very little to put my hands and feet on. It was amazing how quickly I learnt to attach my rope onto the rock to avoid falling as I climbed! Then I realised the boy climbing next to me was someone I knew. We waved, smiled and moved on, although he seemed to find the rock far less of a challenge!</p>
						<p>Once Dad and I were down at ground level again, we stopped at a beach, which was deserted. We walked along with our feet in the water and promised ourselves that it wouldn’t be the last time that we sat on that stretch of beach.</p>
				  </div>
			  </div>
			  
			  <div class="exam-Listen listenlist_1"  v-if="readinglist[3].testName" style="margin-top:30px;">
					<div class="part-title">Reading ● Part 4<span v-html="readinglist[3].testName" style="margin-top:10px;"></span></div>
					<div class="reading3_info">
				  	<div>Water-skiing barefoot<br />by Dan Thomas</div>
				  	<p>Have you ever been barefoot water-skiing? It’s just like normal water-skiing, being pulled along behind a boat at 40 mph – but without any skis! It sounds scary but it’s amazing! My cousin used to take me water-skiing, and that’s where I first learnt to stand up and balance. But I moved on to barefooting when I did it for a laugh with some mates. And I loved it!</p>
<p>Barefoot water-skiing is one of the most popular watersports there is – to watch, anyway! When someone jumps really high and then lands, it’s awesome. And you don’t need expensive stuff like boards, although a wetsuit’s a good idea. But catching your toes on things in the lake can hurt. I guess you can’t help getting water up your nose when you start learning, too, as you have to lie almost flat in the water before you pull yourself up – but it’s OK.</p>
<p>Now I’m experienced, I’ve learnt not to attempt new moves in rough water as it never goes well. Instead, I make sure I limit myself to skiing directly behind the boat, where the water’s calmer. I ask the boat drivers to warn me about big waves coming, although they can’t always see them.</p>
<p>Finding time to practise regularly is hard as I’m still at school – but then it’s not as if I’m into winning prizes and stuff. But if I want to learn a new move, I need to repeat it over and over, and that’s not easy in winter when it’s cold. Lots of skiers say they’ll continue during cold weather, but not many do. So I’m often the only one out on the lake!</p>
				  </div>
					<template v-for="(item , index) in readinglist[3].itemList">
					<el-form-item :label="index+21 +'、' +item.itemName">
				    <el-radio-group v-model="item.exam">
				      <el-radio label="a">A、 {{item.option1}}</el-radio>
				      <el-radio label="b">B、{{item.option2}}</el-radio>
				      <el-radio label="c">C、{{item.option3}}</el-radio>
				      <el-radio label="d">D、{{item.option4}}</el-radio>
				    </el-radio-group>
				  </el-form-item>
				  </template>
			  </div>
			  
			  <div class="listenlist_3"  v-if="readinglist[4].testName" style="margin-top:30px;">
					<div class="part-title">Reading ● Part 5<span v-html="readinglist[4].testName" style="margin-top:10px;"></span></div>
					<div class="listen3_Info">
						<div class="title">WATER</div>
						<p>You’re thirsty and you (0) ………… yourself a glass of water. Do you ever (26) ………… how old that water really is? The glass of water that you’re (27) ………… to drink may have fallen from the sky as rain only last week. However, water itself has been around pretty much as (28) ………… as the earth has! In fact, (29) ………… oceans, seas and rivers cover 70% of the earth, there is a (30) ………… supply of water, which keeps on moving round the earth. This is (31) ………… of what’s known as the water cycle. The sun heats up water and it turns into clouds, which are (32) ………… from water vapour. When the clouds become (33) ………… , the water falls back onto the earth as rain.</p>
						<p>Of course, clean water is absolutely essential for good health. The amount ofsafe drinking water has gone up around the world, but (34) ………… one billion people still lack easy (35) ………… to clean water.</p>
					</div>
					<template v-for="(item , index) in readinglist[4].itemList">
					<el-form-item :label="index+26 +'、'">
				    <el-radio-group v-model="item.exam">
				      <el-radio label="a">A、{{item.option1}}</el-radio>
				      <el-radio label="b">B、{{item.option2}}</el-radio>
				      <el-radio label="c">C、{{item.option3}}</el-radio>
				      <el-radio label="d">D、{{item.option4}}</el-radio>
				    </el-radio-group>
				  </el-form-item>
				  </template>
			  </div>
			  
			  <div class="exam-Listen readinglist_1" v-if="writinglist[0].testName" style="margin-top:30px;">
					<div class="part-title">Writing ● Part1<span v-html="writinglist[0].testName" style="margin-top:10px;"></span></div>
					<div v-for="(item , index) in writinglist[0].itemList" class="clearfix" style="margin-bottom:25px;">
						<div class="fl" style="width:30px;">{{index+1}}、</div>
						<div class="r" style="margin-left:30px; padding-top:0;"><span v-html="item.itemName" style=" display: block; padding-bottom:10px;"></span>Answer:<el-input v-model="item.exam"></el-input></div>
				  </div>
			  </div>
			  
			  <div class="exam-Listen readinglist_1" v-if="writinglist[1].testName" style="margin-top:30px;">
					<div class="part-title">Writing ● Part2<span v-html="writinglist[1].testName" style="margin-top:10px;"></span></div>
					<div v-for="(item , index) in writinglist[1].itemList" class="clearfix" style="margin-bottom:25px;">
						<el-input type="textarea" v-model="item.exam" :rows='5' placeholder='Answer:' style="font-size:16px;"></el-input>
				  </div>
			  </div>
			  
			  <div class="exam-Listen readinglist_1" v-if="writinglist[2].testName" style="margin-top:30px;">
					<div class="part-title">Writing ● Part3<span style="margin-top:10px;">Write the answer to one of the questions (7 or 8) in this part.<br />
Write your answer in about 100 words on your answer sheet.<br />
Tick the box (Question 7 or Question 8) on your answer sheet to show which question you have answered.</span></div>
					<div class="part-title" style="margin-top:-20px;"><span v-html="writinglist[2].testName"></span></div>
					<div v-for="(item , index) in writinglist[2].itemList" class="clearfix" style="margin-bottom:25px;">
						<el-input type="textarea" v-model="item.exam" :rows='5' placeholder='Answer:' style="font-size:16px;"></el-input>
				  </div>
			  </div>
			  
			  <div class="exam-Listen readinglist_1" v-if="writinglist[3].testName" style="margin-top:30px;">
					<div class="part-title"><span v-html="writinglist[3].testName"></span></div>
					<div v-for="(item , index) in writinglist[3].itemList" class="clearfix" style="margin-bottom:25px;">
						<el-input type="textarea" v-model="item.exam" :rows='5' placeholder='Answer:' style="font-size:16px;"></el-input>
				  </div>
			  </div>

			  <div class="exam_btn">
          <el-button type="primary" @click="submit">提交试卷</el-button>
        </div>
			</el-form>
		</div>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
      	paperId:0,
      	classId:0,
    		listenlist:[
	    		{
	    			itemList:[]
	    		},{
	    			itemList:[]
	    		},{
	    			itemList:[]
	    		},{
	    			itemList:[]
	    		}
    		],
    		readinglist:[
	    		{
	    			itemList:[]
	    		},{
	    			itemList:[]
	    		},{
	    			itemList:[]
	    		},{
	    			itemList:[]
	    		},{
	    			itemList:[]
	    		}
    		],
    		writinglist:[
	    		{
	    			itemList:[]
	    		},{
	    			itemList:[]
	    		},{
	    			itemList:[]
	    		},{
	    			itemList:[]
	    		}
    		],
    		audiolist:[],
    		audioUrl:"",
    		playTimes:0,
    		playIndex:0,
      	listenExampleVal:"a",
      	total:0,
      	loading:true,
      	exam:[],
      	userInfo:[],
        form: {}
      }
    },
    created(){
    	var audioItem
    	this.classId = this.$route.query.cid
    	this.paperId = this.$route.query.id
    	this.userInfo = this.username = JSON.parse(localStorage.getItem('userInfo'))
			this.$get('papers/'+ this.paperId,{type:'7_8_grades_exam'}).then((res) => {
      	if(res.code === 0){
      		if(res.data.listening){
	      		for(var i=0,len = res.data.listening.length ; i< len;i++){
	      			if(res.data.listening[i].example){
	      				res.data.listening[i].example = res.data.listening[i].example.split("|")
	      			}
	      			res.data.listening[i].testName = this.trim(res.data.listening[i].testName)
	      			audioItem = {"url":res.data.listening[i].audioUrl,"text":"播放听力","type":"info","play":false}
    					this.audiolist.push(audioItem)
	      		}
	      		this.listenlist = JSON.parse(JSON.stringify(res.data.listening))
      		}
      		if(res.data.readingPart){
	      		for(var i=0,len = res.data.readingPart.length ; i< len;i++){
	      			if(res.data.readingPart[i].example){
	      				res.data.readingPart[i].example = res.data.readingPart[i].example.split("|")
	      			}
	      			res.data.readingPart[i].testName = this.trim(res.data.readingPart[i].testName)
	      		}
	      		for(var i=0,len = res.data.readingPart[1].itemList.length ; i< len;i++){
	      			res.data.readingPart[1].itemList[i].itemName = res.data.readingPart[1].itemList[i].itemName.split("|")
	      		}
	      		this.readinglist = JSON.parse(JSON.stringify(res.data.readingPart))
      		}
      		if(res.data.writingPart){
	      		for(var i=0,len = res.data.writingPart.length ; i< len;i++){
	      			res.data.writingPart[i].testName = this.trim(res.data.writingPart[i].testName)
	      		}
	      		for(var i=0,len = res.data.writingPart[0].itemList.length ; i< len;i++){
	      			res.data.writingPart[0].itemList[i].itemName = this.trim(res.data.writingPart[0].itemList[i].itemName)
	      		}
	      		this.writinglist = JSON.parse(JSON.stringify(res.data.writingPart))
      		}
					console.log(this.audiolist)
					this.audiolist[0].play = true
					this.audiolist[0].type = 'primary'
					this.audiolist[0].text = '播放听力(第1次)'
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
      	for(var i=0; i <this.listenlist.length; i++ ){
      		for (var j=0; j< this.listenlist[i].itemList.length; j++) {
      			item={"testItemId":this.listenlist[i].itemList[j].id,"answer":this.listenlist[i].itemList[j].exam?this.listenlist[i].itemList[j].exam:''}
    				this.exam.push(item)
      		}
      	}
				for(var i=0; i <this.readinglist.length; i++ ){
      		for (var j=0; j< this.readinglist[i].itemList.length; j++) {
      			item={"testItemId":this.readinglist[i].itemList[j].id,"answer":this.readinglist[i].itemList[j].exam?this.readinglist[i].itemList[j].exam:''}
    				this.exam.push(item)
      		}
      	}
				for(var i=0; i <this.writinglist.length; i++ ){
      		for (var j=0; j< this.writinglist[i].itemList.length; j++) {
      			item={"testItemId":this.writinglist[i].itemList[j].id,"answer":this.writinglist[i].itemList[j].exam?this.writinglist[i].itemList[j].exam:''}
    				this.exam.push(item)
      		}
      	}
        console.log(this.exam)

        this.$confirm('请仔细核对答案后提交试卷后！', '提示', {confirmButtonText: '继续提交',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.$post('students/'+this.userInfo.id+'/classes/'+this.classId+'/entrance_tests/'+this.paperId,this.exam).then((res) => {
		      	if(res.code === 0){
	          	this.$alert('试卷提交成功！', '提示', {
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
        }).catch(() => {
      		this.loading = false
        });

      },
      audioPlay(index){
      	if(this.audiolist[index].play && this.audiolist[index].type == 'primary'){
      		this.playTimes += 1
      		this.audioUrl = this.audiolist[index].url
      		this.audiolist[index].text = '听力播放中(第'+ this.playTimes +'次)'
      		this.playIndex = index
      		this.audiolist[index].play = false
      	}else if(!this.audiolist[index].play && this.audiolist[index].type == 'primary'){
      		this.$message.warning('听力播放中，请勿重复点击！');
      	}else{
      		this.$message.warning('请按顺序播放听力！');
      	}      	
      },
      audioEnded(){
				if(this.playTimes == 1){
					this.audiolist[this.playIndex].text = '播放听力(第'+ (this.playTimes+1) +'次)'
					this.audiolist[this.playIndex].play = true
      		this.audioUrl = ''
				}else if(this.playTimes == 2 && this.playIndex == 3){
					this.playTimes = 0
					this.audioUrl = ''
					this.audiolist[this.playIndex].text = '播放结束'
					this.audiolist[this.playIndex].type = 'info'
					this.audiolist[this.playIndex].play = false
				}else{
					this.playTimes = 0
					this.audioUrl = ''
					this.audiolist[this.playIndex].text = '播放结束'
					this.audiolist[this.playIndex].type = 'info'
					this.audiolist[this.playIndex].play = false
					this.audiolist[this.playIndex+1].text = '播放听力(第'+ (this.playTimes+1) +'次)'
					this.audiolist[this.playIndex+1].type = 'primary'
					this.audiolist[this.playIndex+1].play = true
				}
      	
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
<style type="text/css">
.audioBox{margin-bottom:20px;}
.listenlist_1 .el-form-item__label{ display:block; width:100%;}
.imglist{ width:100%; padding-bottom:15px;}
.imglist div{ width:27%; margin-left:5%; float:left; text-align: center;}
.imglist div img{ max-width:100%; display: block;}
.imglist div p{ text-align: center; font-size:16px; margin-top:10px;}
.listen3_Info{border:4px double #a9a9a9; padding:20px; margin-bottom:20px;}
.listen3_Info div{ text-align: center; font-size:22px; font-weight: bold; padding-bottom:20px;}
.listen3_Info dl{ margin-top:20px; line-height:32px; font-size:16px;}
.listen3_Info dl dd{ padding-left:15px;}
.listen3_Info p{line-height:28px; font-size:16px; margin-bottom:10px;}
.listenlist_3 .el-input{ display:inline-block; width:300px;}
.listenlist_3 .el-input input{ height:28px; line-height:28px; padding:0 10px; border:none; border-bottom:1px solid #a9a9a9; border-radius:0;}
.readinglist_1 .fl{ width:300px; float:left;}
.readinglist_1 .fl img{ width:240px;vertical-align:text-top;}
.readinglist_1 .el-form-item .el-radio{ margin:20px 0 0 0;}
.readinglist_1 .r{ padding-top:10px; line-height:28px; font-size:16px; margin-left:300px;}
.readinglist_1 .r .el-input{ display:inline-block; width:150px;}
.readinglist_1 .r .el-input input{ height:28px; line-height:28px; padding:0 10px; border:none; border-bottom:1px solid #a9a9a9; border-radius:0; text-align: center;}
.reading3_info{padding:20px; margin:20px 0;}
.reading3_info div{ text-align: center; font-size:22px; font-weight: bold; padding-bottom:20px}
.reading3_info p{line-height:28px; font-size:16px; margin-bottom:10px; display:block;}
.reading3_info p span.l{display:block;float:left;}
.reading3_info p span.rr{ margin-left:40px; display: block;}
</style>