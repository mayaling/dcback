<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">{{titleText}}学生信息</div>
			<el-form :model="form" ref="form" :rules="rules" class="item-add-list">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="12">
						<el-form-item label="姓名:" prop="name">
					    <el-input v-model.trim="form.name" type="text"></el-input>
					  </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="英文名:">
					    <el-input v-model.trim="form.englishName" type="text"></el-input>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">
					<el-col :span="12">
						<el-form-item label="性别:">
					    <el-select v-model="form.sex" placeholder="选择性别">
								<el-option key="0" label="男" value="0"></el-option>
								<el-option key="1" label="女" value="1"></el-option>
							</el-select>
					  </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机号：">
					    <el-input v-model.trim="form.phone"></el-input>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">
					<el-col :span="12">
					  <el-form-item label="学校:" prop="school">
					    <el-input v-model.trim="form.school"></el-input>
					  </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="年级" prop="grade">
							<el-select v-model="form.grade" placeholder="选择年级">
								<el-option key="0" label="幼儿园" value="幼儿园"></el-option>
								<el-option key="1" label="一年级" value="一年级"></el-option>
								<el-option key="2" label="二年级" value="二年级"></el-option>
								<el-option key="3" label="三年级" value="三年级"></el-option>
								<el-option key="4" label="四年级" value="四年级"></el-option>
								<el-option key="5" label="五年级" value="五年级"></el-option>
								<el-option key="6" label="六年级" value="六年级"></el-option>
								<el-option key="7" label="七年级" value="七年级"></el-option>
								<el-option key="8" label="八年级" value="八年级"></el-option>
								<el-option key="9" label="九年级" value="九年级"></el-option>
								<el-option key="10" label="高一" value="高一"></el-option>
								<el-option key="11" label="高二" value="高二"></el-option>
								<el-option key="12" label="高三" value="高三"></el-option>
								<el-option key="13" label="其他" value="其他"></el-option>
							</el-select>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">
					<el-col :span="12">
						<el-form-item label="班级：" prop="klass">
					    <el-input v-model.trim="form.klass"></el-input>
					  </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="科目：">
					    <el-input v-model.trim="form.subject"></el-input>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">
				  <el-col :span="20" :offset="4">
				  	<el-button type="primary" @click="onSubmit('form')" style='margin-top:40px'>确认提交</el-button>
				  </el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	import VueCropper  from 'vue-cropperjs'
  export default {
    name: 'teacherAdd',
    data() {
    	var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(198)|(199)|(166)|(165)|(146)|(148))+\d{8})$/;
    	var phoneRule = (rule, value, callback) => {
        if(!re.test(value)) {
          callback(new Error('请输入正确手机号'));
        }else{
          callback();
        }
      };
      return {
      	form:{
      		name:"",
      		englishName:"",
	        sex:"",
	        phone:"",
	        dept:"",
	        school:"",
	        grade:"",
	        klass:"",
	        subject:"",
	        delFlag:false
	      },
	      rules:{
	      	name: [
            { required: true, message: '不可为空！', trigger: 'blur' }
          ],
          phone: [
            { required: true, validator: phoneRule, trigger: 'blur' }
          ],
          grade: [
            { required: true, message: '不可为空！', trigger: 'change' }
          ],
          klass: [
            { required: true, message: '不可为空！', trigger: 'blur' }
          ],
          school: [
            { required: true, message: '不可为空！', trigger: 'blur' }
          ],
          subject: [
            { required: true, message: '不可为空！', trigger: 'blur' }
          ]
	      },
	      deptList:[],
	      studentList:[],
	      id:0,
	      pageType:0,
	      titleText:"",
	      imgSrc:"",
        cropImg:"",
        backImgUrl:"",
        dialogVisible: false,
        loading:true
      }        
    },
    created(){
    	if(this.$route.query.t == 1){
    		this.pageType = parseInt(this.$route.query.t)
    		this.titleText = "添加"
    		this.loading = false
    	} else{
    		this.id = this.$route.query.id
				this.pageType = parseInt(this.$route.query.t)
				this.titleText = "编辑"
				this.$get('students/'+this.id).then((res) => {
	      	let newData = JSON.parse(JSON.stringify(res))
	      	if(newData.code === 0){
	      		if(newData.data.sex){
	      			newData.data.sex = '1'
	      		}else{
	      			newData.data.sex = '0'
	      		}
	      		this.form = newData.data
	      		this.cropImg = newData.data.pic
	      	}else{
	      		this.$message.error(res.msg);
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
    	}
			//获取学校
//			this.$get('students/schools',{pageSize:10000}).then((res) => {
//    	if(res.code === 0){
//    		this.studentList = JSON.parse(JSON.stringify(res.data.list))
//    	}else{
//    		this.$message.error('获取学校错误');
//    	}
//    })
    },
    components: {

    },
    methods: {
      
      //提交数据
			onSubmit(formName){
				this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.loading = true
          	if(this.pageType == 1){ 
          		//新增
          		this.$post('students',{
          			name:this.form.name,
				        sex:parseInt(this.form.sex),
				        englishName:this.form.englishName,
				        phone:this.form.phone,
				        school:this.form.school,
				        grade:this.form.grade,
				        klass:this.form.klass,
				        subject:this.form.subject,
				        delFlag:this.form.delFlag
	            }).then((res) => {
				      	if(res.code === 0){
									this.$message({message:'添加成功！',type: 'success'});
									this.$router.push('/Dashboard');
				      	}else{
				      		this.$message.error(res.msg);
				      		this.loading = false
				      	}
				      }).catch(() => {this.loading = false})
          	} else if(this.pageType == 2){ 
          		//编辑
          		this.$put('students/'+this.id,{
	            	name:this.form.name,
				        sex:parseInt(this.form.sex),
				        englishName:this.form.englishName,
				        phone:this.form.phone,
				        school:this.form.school,
				        grade:this.form.grade,
				        klass:this.form.klass,
				        subject:this.form.subject,
				        delFlag:this.form.delFlag
	            }).then((res) => {
				      	if(res.code === 0){
									this.$message({message:'更新成功！',type: 'success'});
									this.$router.push('/Dashboard');
				      	}else{
				      		this.$message.error(res.msg)
				      		this.loading = false
				      	}
				      }).catch(() => {this.loading = false})
          	}            
          } else {
            return false;
          }
        });
			}
    }
  }
</script>

<style scoped>
.crop{ height:172px; width:172px; position:relative;}
.pre-img{ height:172px; width:172px; position:absolute; z-index: 1;}
.crop-input{ height:172px; width:172px; position:absolute; z-index:2; opacity:0;}
.uploader-icon{ height:170px; width:170px; border:1px dashed #ddd; text-align:center; line-height:170px; font-size:28px; color:#8c939d; position:absolute;left:0; top:0; z-index:1;}


  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 170px;
    height: 170px;
    line-height: 170px;
    text-align: center;
  }
  .avatar {
    width: 170px;
    height: 170px;
    display: block;
  }



</style>

