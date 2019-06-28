<template>
  <div class="index-wrap" v-loading="loading" element-loading-text="加载中">
		<div class="exam_top">
			<div class="exam_top_wrap clearfix">
				<div class="exam_logo clearfix"><img src="../../assets/logo_a.png"/>立洋在线评测</div>
				<div class="exam_signout">{{userInfo.name}}，您好<a @click="signout">【退出】</a></div>
			</div>
		</div>
		<div class="exam">
			<div class="exam-about">KEY ENGLISH TEST for Schools &nbsp;&nbsp; SAMPLE TEST1<br />Time Approximately 30 minutes(including 8 minutes'transfer time)</div>
			<ul class="exam-student clearfix">
				<li><span class="fl"><strong>Chinese Name</strong><br />考生姓名</span>
					<span>{{userInfo.name}}</span>
				</li>
				<li>
					<span class="fl"><strong>English Name</strong><br />英语名</span>
					<span>{{userInfo.englishName}}</span>
				</li>
			</ul>
			<div class="part-title">INSTRUCTIONS TO CANDIDATES</div>
			<div class="part-name">Do not open this question paper until you are told to do so.</div>
			<div class="part-title">Write your name, centre number and candidate number on your answer sheet if they are not already there.</div>
			<div class="part-name">
				Listen to the instructions for each part of the paper carefully.<br/>
				Answer all the questions.<br/>
				While you are listening, write your answers on the question paper.<br/>
				You will have 8 minutes at the end of the test to copy your answers onto the separate answer sheet. Use a pencil.<br/>
				At the end of the test, hand in both this question paper and your answer sheet.
			</div>
			<div class="part-title">INFORMATION FOR CANDIDATES</div>
			<div class="part-name">
				There are five parts to the test.<br/>
				Each question carries one mark.You will hear each piece twice.<br/>
				For each part of the test there will be time for you to look through the questions and time for you to check your answers.
			</div>			
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
			  
			  	<div class="listenlist_2"  v-if="listenlist[1].testName" style="margin-top:30px;">
					<div class="part-title">Listening ● Part 2<span v-html="listenlist[1].testName" style="margin-top:10px;"></span></div>
					<div class="audioBox"><el-button :type="audiolist[1].type" round @click="audioPlay(1)">{{audiolist[1].text}}</el-button></div>
					<div class="exam-example">
						<div class="exam-example-title">{{listenlist[1].example[0]}}</div>
					</div>					
					<!-- <template v-for="(item , index) in listenlist[1].itemList"> -->
						<el-row :gutter="20">
							<el-col :span="16">
							  	<template v-for="(item , index) in listenlist[1].itemList">
									<el-form-item :label="item.itemName">
		 							<el-select v-model="item.exam" size="mini" style="width:100px; float:right;" placeholder="请选择">
										<el-option key="0" label="A" value="A"></el-option>
										<el-option key="1" label="B" value="B"></el-option>
										<el-option key="2" label="C" value="C"></el-option>
										<el-option key="3" label="D" value="D"></el-option>
										<el-option key="4" label="E" value="E"></el-option>
										<el-option key="5" label="F" value="F"></el-option>
										<el-option key="6" label="G" value="G"></el-option>
										<el-option key="7" label="H" value="H"></el-option>
									</el-select>									
									</el-form-item>
								</template>		
						  </el-col>
						  <el-col :span="8">
						  	<template v-for="item in listenlist[1].itemList">
								<div style="margin-top: 10px">
									{{item.option1}}
								</div>
								<div style="margin-top: 40px">
									{{item.option2}}
								</div>
								<div style="margin-top: 40px">
									{{item.option3}}
								</div>
								<div style="margin-top: 40px">
									{{item.option4}}
								</div>
								<div style="margin-top: 40px">
									{{item.option5}}
								</div>
								<div style="margin-top: 40px">
									{{item.option6}}
								</div>
								<div style="margin-top: 40px">
									{{item.option7}}
								</div>
								<div style="margin-top: 40px">
									{{item.option8}}
								</div>
								</template>
							</el-col>
						</el-row>						  	
					<!-- </template> -->
			  	</div>
			  
			    <div class="exam-Listen listenlist_3"  v-if="listenlist[2].testName" style="margin-top:30px;">
					<div class="part-title">Listening ● Part 3<span v-html="listenlist[2].testName" style="margin-top:10px;"></span></div>
					<div class="audioBox"><el-button :type="audiolist[2].type" round @click="audioPlay(2)">{{audiolist[2].text}}</el-button></div>
					<template v-for="(item , index) in listenlist[2].itemList">
						<el-form-item :label="index+8 +'、' +item.itemName">
					    <el-radio-group v-model="item.exam">
					      <el-radio label="a">A、{{item.option1}}</el-radio>
					      <el-radio label="b">B、{{item.option2}}</el-radio>
					      <el-radio label="c">C、{{item.option3}}</el-radio>
					    </el-radio-group>
					  </el-form-item>
				  </template>				  
			    </div>	

			    <div class="listenlist_4"  v-if="listenlist[3].testName" style="margin-top:30px;">
					<div class="part-title">Listening ● Part 4<span v-html="listenlist[3].testName" style="margin-top:10px;"></span></div>
					<div class="audioBox"><el-button :type="audiolist[3].type" round @click="audioPlay(3)">{{audiolist[3].text}}</el-button></div>
					<p style="margin-left:200px;font-size: 20px;font-weight: 400;">Guitar lessons</p>
					<el-row :gutter="20">
					  	<el-col :span="10">
								<el-form-item>
									<span>Name:</span>
								</el-form-item>					  		
								<template v-for="(item , index) in listenlist[3].itemList">
									<el-form-item :label="item.itemName">
								</el-form-item>
							</template>							  		
					  	</el-col>
					  	<el-col :span="10" :offset="2">
								<el-form-item>
									<span>answer that!</span>
								</el-form-item>						  		
					  		<template v-for="(item , index) in listenlist[3].itemList">
								<el-form-item>
									<el-input v-model="item.exam" placeholder="请输入答案"></el-input>
								</el-form-item>	
					  		</template>
					  	</el-col>
					</el-row>					
			    </div>

 				<div class="listenlist_5"  v-if="listenlist[4].testName" style="margin-top:30px;">
					<div class="part-title">Listening ● Part 5<span v-html="listenlist[4].testName" style="margin-top:10px;"></span></div>
					<div class="audioBox"><el-button :type="audiolist[4].type" round @click="audioPlay(4)">{{audiolist[4].text}}</el-button></div>
					<p style="margin-left:200px;font-size: 20px;font-weight: 400;">New quiz show</p>
					<el-row :gutter="20">
					  	<el-col :span="10">
								<el-form-item>
									<span>Name:</span>
								</el-form-item>					  		
								<template v-for="(item , index) in listenlist[4].itemList">
									<el-form-item :label="item.itemName">
								</el-form-item>
							</template>							  		
					  	</el-col>
					  	<el-col :span="10" :offset="2">
								<el-form-item>
									<span>answer that!</span>
								</el-form-item>						  		
					  		<template v-for="(item , index) in listenlist[4].itemList">
								<el-form-item>
									<el-input v-model="item.exam" placeholder="请输入答案"></el-input>
								</el-form-item>	
					  		</template>
					  	</el-col>
					</el-row>					
			    </div>			    
			  
			  
			    <div class="writing_1" v-if="readinglist[0].testName" style="margin-top:30px;">
					<div class="part-title">Reading and Writing ● Part1<span v-html="readinglist[0].testName" style="margin-top:10px;"></span></div>
					<div class="exam-example">
						<div class="exam-example-title">{{readinglist[0].example[0]}}{{readinglist[0].example[1]}}</div>
					</div>	
					<el-row :gutter="20">
						<el-col :span="16">
						  	<template v-for="(item , index) in readinglist[0].itemList">
								<el-form-item :label="item.itemName">
	 							<el-select v-model="item.exam" size="mini" style="width:90px; float:right;" placeholder="请选择">
									<el-option key="0" label="A" value="A"></el-option>
									<el-option key="1" label="B" value="B"></el-option>
									<el-option key="2" label="C" value="C"></el-option>
									<el-option key="3" label="D" value="D"></el-option>
									<el-option key="4" label="E" value="E"></el-option>
									<el-option key="5" label="F" value="F"></el-option>
									<el-option key="6" label="G" value="G"></el-option>
									<el-option key="7" label="H" value="H"></el-option>
								</el-select>									
								</el-form-item>
							</template>		
					  </el-col>
					  <el-col :span="8">
					  	<template v-for="(item , index) in readinglist[0].itemList">
					  			<img :src="item.option1" alt="">
					  			<img :src="item.option2" alt="">
					  			<img :src="item.option3" alt="">
					  			<img :src="item.option4" alt="">
					  			<img :src="item.option5" alt="">
					  			<img :src="item.option6" alt="">
					  			<img :src="item.option7" alt="">
					  			<img :src="item.option8" alt="">
					  	</template>
					  </el-col>
					</el-row>											
				
			    </div>
			  
			    <div class="writing_2" v-if="readinglist[1].testName" style="margin-top:30px;">
					<div class="part-title">Reading and Writing ● Part2<span v-html="readinglist[1].testName" style="margin-top:10px;"></span></div>
					<div class="exam-example">
						<div class="exam-example-title">{{readinglist[1].example[0]}}</div>
						<div class="exam-example-title" style="margin-top: 20px;">{{readinglist[1].example[1]}}</div>
						<el-form-item>
					    	<el-radio-group disabled v-model="rwpart2ExampleVal" style="margin-left: 10px;margin-top: 20px;">
							    <el-radio label="A">{{readinglist[1].example[2]}}</el-radio>
							    <el-radio label="B">{{readinglist[1].example[3]}}</el-radio>
							    <el-radio label="C">{{readinglist[1].example[4]}}</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>	
					<template v-for="(item , index) in readinglist[1].itemList">
						<el-form-item :label="index+6 +'、' +item.itemName">
						    <el-radio-group v-model="item.exam">
						      <el-radio label="A">A.  {{item.option1}}</el-radio>
						      <el-radio label="B">B.  {{item.option2}}</el-radio>
						      <el-radio label="C">C.  {{item.option3}}</el-radio>
						    </el-radio-group>
					  	</el-form-item>
					</template>												
			    </div>
			  
			    <div class="writing_3"  v-if="readinglist[2].testName" style="margin-top:30px;">
					<div class="part-title">Reading and Writing ● Part 3<span v-html="readinglist[2].testName" style="margin-top:10px;"></span></div>
					<div class="exam-example">
						<div class="exam-example-title">{{readinglist[2].example[0]}}</div>
						<div class="exam-example-title" style="margin-top: 20px;">
							<img :src="readinglist[2].example[1]" alt="">
						</div>
						<el-form-item>
					    	<el-radio-group disabled v-model="rwpart2ExampleVal" style="margin-left: 10px;margin-top: 20px;">
							    <el-radio label="A"></el-radio>
							    <el-radio label="B"></el-radio>
							    <el-radio label="C"></el-radio>
							</el-radio-group>
						</el-form-item>
					</div>						
					<template v-for="(item , index) in readinglist[2].itemList">
						<div>{{item.itemName}}</div>
						<el-form-item>
						    <el-radio-group v-model="item.exam">
						      <el-radio label="A">A  {{item.option1}}</el-radio>
						      <el-radio label="B">B  {{item.option2}}</el-radio>
						      <el-radio label="C">C  {{item.option3}}</el-radio>
						    </el-radio-group>
					  	</el-form-item>
					</template>						  	
			    </div>

				<div class="writing_3"  v-if="readinglist[3].testName" style="margin-top:30px;">
					<div class="part-title"><span v-html="readinglist[3].testName" style="margin-top:10px;"></span></div>
					<div class="exam-example">
						<div class="exam-example-title">{{readinglist[3].example[0]}}</div>
						<el-form-item :label="readinglist[3].example[1]">
						</el-form-item>					
						<el-form-item :label="readinglist[3].example[2]">
	 						<el-select disabled v-model="rwpart4ExampleVal" size="mini" style="width:85px; float:right;" placeholder="请选择">
									<el-option key="0" label="A" value="A"></el-option>
									<el-option key="1" label="B" value="B"></el-option>
									<el-option key="2" label="C" value="C"></el-option>
									<el-option key="3" label="D" value="D"></el-option>
									<el-option key="4" label="E" value="E"></el-option>
									<el-option key="5" label="F" value="F"></el-option>
									<el-option key="6" label="G" value="G"></el-option>
									<el-option key="7" label="H" value="H"></el-option>
							</el-select>									
						</el-form-item>											
					</div>					
					<el-row :gutter="20">
						<el-col :span="14">
						  	<template v-for="(item , index) in readinglist[3].itemList">
								<el-form-item :label="item.itemName">
	 							<el-select v-model="item.exam" size="mini" style="width:85px; float:right;" placeholder="请选择">
									<el-option key="0" label="A" value="A"></el-option>
									<el-option key="1" label="B" value="B"></el-option>
									<el-option key="2" label="C" value="C"></el-option>
									<el-option key="3" label="D" value="D"></el-option>
									<el-option key="4" label="E" value="E"></el-option>
									<el-option key="5" label="F" value="F"></el-option>
									<el-option key="6" label="G" value="G"></el-option>
									<el-option key="7" label="H" value="H"></el-option>
								</el-select>									
								</el-form-item>
							</template>		
					  	</el-col>
					  <el-col :span="8" :offset="2">
					  	<template v-for="(item , index) in readinglist[3].itemList">
								<el-form-item >
									<div style="margin-top: 40px;">{{item.option1}}</div>
									<div style="margin-top: 40px;">{{item.option2}}</div>
									<div style="margin-top: 40px;">{{item.option3}}</div>
									<div style="margin-top: 40px;">{{item.option4}}</div>
									<div style="margin-top: 40px;">{{item.option5}}</div>
									<div style="margin-top: 40px;">{{item.option6}}</div>
									<div style="margin-top: 40px;">{{item.option7}}</div>
									<div style="margin-top: 40px;">{{item.option8}}</div>
								</el-form-item>
							</template>
					  </el-col>
					</el-row>											  	
			    </div>	

				<div class="writing_4"  v-if="readinglist[4].testName" style="margin-top:30px;">
					<div class="part-title">Reading and Writing ● Part 4<span v-html="readinglist[4].testName" style="margin-top:10px;"></span></div>
					<div style="font-size: 18px;border: 1px solid #aaa;padding:20px">{{readinglist[4].testContent}}</div>
					<div class="exam-example" style="border:none;border-bottom: 1px solid #000000;">
						<div class="exam-example-title">{{readinglist[4].example[0]}}</div>
						<div class="exam-example-title" style="margin-top: 20px;">{{readinglist[4].example[1]}}</div>
						<el-form-item>
					    	<el-radio-group disabled v-model="rwpart5ExampleVal" style="margin-left: 10px;margin-top: 20px;">
							    <el-radio label="A">{{readinglist[4].example[2]}}</el-radio>
							    <el-radio label="B">{{readinglist[4].example[3]}}</el-radio>
							    <el-radio label="C">{{readinglist[4].example[4]}}</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>	
					<template v-for="(item , index) in readinglist[4].itemList">
						<div>{{item.itemName}}</div>
						<el-form-item>
						    <el-radio-group v-model="item.exam">
						      <el-radio label="A">A  {{item.option1}}</el-radio>
						      <el-radio label="B">B  {{item.option2}}</el-radio>
						      <el-radio label="C">C  {{item.option3}}</el-radio>
						    </el-radio-group>
					  	</el-form-item>
					</template>																	  	
			    </div>

				<div class="writing_5"  v-if="readinglist[5].testName" style="margin-top:30px;">
					<div class="part-title">Reading and Writing ● Part 5<span v-html="readinglist[5].testName" style="margin-top:10px;"></span></div>
					<div style="font-size: 18px;border: 1px solid #aaa;padding:20px">{{readinglist[5].testContent}}</div>
					<div class="exam-example" style="border:none;border-bottom: 1px solid #000000;">
						<el-form-item :label="readinglist[5].example[0]">
					    	<el-radio-group disabled v-model="rwpart5ExampleVal" style="margin-left: 10px;margin-top: 20px;">
							    <el-radio label="A">{{readinglist[5].example[1]}}</el-radio>
							    <el-radio label="B">{{readinglist[5].example[2]}}</el-radio>
							    <el-radio label="C">{{readinglist[5].example[3]}}</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>	
					<template v-for="(item , index) in readinglist[5].itemList">
						<div>{{item.itemName}}</div>
						<el-form-item>
						    <el-radio-group v-model="item.exam">
						      <el-radio label="A">A  {{item.option1}}</el-radio>
						      <el-radio label="B">B  {{item.option2}}</el-radio>
						      <el-radio label="C">C  {{item.option3}}</el-radio>
						    </el-radio-group>
					  	</el-form-item>
					</template>																	  	
			    </div>	

				<div class="writing_6"  v-if="readinglist[6].testName" style="margin-top:30px;">
					<div class="part-title">Reading and Writing ● Part 6<span v-html="readinglist[6].testName" style="margin-top:10px;"></span></div>
					<div class="exam-example" style="border:none;border-bottom: 1px solid #000000;">
						<el-row :gutter="20">
						  	<el-col :span="14">
								<el-form-item>
									<span style="font-size: 18px;">{{readinglist[6].example[0]}}</span>
								</el-form-item>					  		
						  	</el-col>
						  	<el-col :span="8" :offset="2">
								<el-form-item>
									<el-input placeholder="magazine" v-model="rwpart7input" clearable>
									</el-input>
								</el-form-item>	
						  	</el-col>
						</el-row>								
					</div>	
					<el-row :gutter="20">
					  	<el-col :span="14">
							<template v-for="(item , index) in readinglist[6].itemList">
								<el-form-item :label="item.itemName">
								</el-form-item>
							</template>							  		
					  	</el-col>
					  	<el-col :span="8" :offset="2">
					  		<template v-for="(item , index) in readinglist[6].itemList">
								<el-form-item  >
									<el-input v-model="item.exam" placeholder="请输入答案"></el-input>
								</el-form-item>	
					  		</template>
					  	</el-col>
					</el-row>
				</div>				    		    				    		    
			  	
				<div class="writing_7"  v-if="readinglist[7].testName" style="margin-top:30px;">
					<div class="part-title">Reading and Writing ● Part 7<span v-html="readinglist[7].testName" style="margin-top:10px;"></span></div>
					<div style="font-size: 18px;border: 1px solid #aaa;padding:20px">{{readinglist[7].testContent}}</div>
					<template v-for="(item , index) in readinglist[5].itemList">
					    <el-form-item  style="margin-top: 20px;">
					    	{{index+41}}
							<el-input v-model="item.exam" placeholder="请输入答案"></el-input>
						</el-form-item>	
					</template>																						  	
			    </div>		

				<div class="writing_8"  v-if="readinglist[8].testName" style="margin-top:30px;">
					<div class="part-title">Reading and Writing ● Part 8<span v-html="readinglist[8].testName" style="margin-top:10px;"></span></div>
					<div class="exam-example" style="border:none;border-bottom: 1px solid #000000;">
						<div class="exam-example-title">
							<img :src="readinglist[8].example[0]" alt="">
						</div>
					</div>		
					<p style="margin-left:200px;font-size: 20px;font-weight: 400;">Louisa's Notes Ice-skating party</p>
					<el-row :gutter="20">
					  	<el-col :span="10">
								<el-form-item>
									<span>Person having party:</span>
								</el-form-item>					  		
								<template v-for="(item , index) in readinglist[8].itemList">
								<el-form-item :label="item.itemName">
								</el-form-item>
							</template>							  		
					  	</el-col>
					  	<el-col :span="10" :offset="2">
								<el-form-item>
									<span>Sara</span>
								</el-form-item>						  		
					  		<template v-for="(item , index) in readinglist[8].itemList" >
								<el-form-item>
									<el-input v-model="item.exam" placeholder="请输入内容"></el-input>
								</el-form-item>	
					  		</template>
					  	</el-col>
					</el-row>																											  	
			    </div>	

				<div class="writing_9"  v-if="readinglist[9].testName" style="margin-top:30px;">
					<div class="part-title">Reading and Writing ● Part 9<span v-html="readinglist[9].testName" style="margin-top:10px;"></span></div>
					<div class="exam-example" style="border:none;border-bottom: 1px solid #000000;">
						<div class="exam-example-title">
							<img :src="readinglist[9].example[0]" alt="">
						</div>
					</div>	
					<template v-for="(item , index) in readinglist[9].itemList">
						<div>{{item.itemName}}</div>
						<el-input type="textarea" :rows="4" placeholder="请在此处作答" v-model="item.exam">
						</el-input>									
			  		</template>							
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
	    		},{
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
    		audiolist:[],
    		audioUrl:"",
    		playTimes:0,
    		playIndex:0,
      	listenExampleVal:"a",
      	total:0,
      	loading:true,
      	exam:[],
      	userInfo:[],
        form: {},
        rwpart2ExampleVal:""
      }
    },
    created(){
		this.classId = this.$route.query.cid
    	this.paperId = this.$route.query.id
    	this.userInfo = this.username = JSON.parse(localStorage.getItem('userInfo'))      	
		this.getData();
    },
    computed: {
			
    },
    methods: {
    	getData(){
			var audioItem
			this.$get('papers/'+ this.paperId,{type:'6_7_grades_exam'}).then((res) => {
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
	      		if(res.data.readingWriting){
		      		for(var i=0,len = res.data.readingWriting.length ; i< len;i++){
		      			if(res.data.readingWriting[i].example){
		      				res.data.readingWriting[i].example = res.data.readingWriting[i].example.split("|")
		      			}
		      			res.data.readingWriting[i].testName = this.trim(res.data.readingWriting[i].testName)
		      		}
		      		for(var i=0,len = res.data.readingWriting[1].itemList.length ; i< len;i++){
		      			res.data.readingWriting[1].itemList[i].itemName = res.data.readingWriting[1].itemList[i].itemName.split("|")
		      		}
		      		this.readinglist = JSON.parse(JSON.stringify(res.data.readingWriting))
	      		}
					//console.log(this.audiolist)
					this.audiolist[0].play = true
					this.audiolist[0].type = 'primary'
					this.audiolist[0].text = '播放听力(第1次)'
	      	}else{
	      		this.$message.error('题库获取失败');
	      	}
	      	this.loading = false
	    	}).catch(() => {this.loading = false})    		
    	},
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
        //console.log(this.exam)

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