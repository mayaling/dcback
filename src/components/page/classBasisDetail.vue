<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container" style="margin-bottom:20px;">
			<div class="container-title">基础班级详情</div>
			<div class="item-detail">
		  	<el-row :gutter="10" class="clearfix">
				  <el-col :span="4" class="el-item__label tar">班级名称：</el-col>
				  <el-col :span="8">{{list.className}}</el-col>
				  <!--<el-col :span="4" class="el-item__label tar">老师：</el-col>
				  <el-col :span="8">{{list.teacher ? list.teacher.teacherName : ""}}</el-col>-->
				</el-row>
				<!--<el-row :gutter="10" class="clearfix">
					<el-col :span="4" class="el-item__label tar">外教：</el-col>
				  <el-col :span="8">{{list.overseasTeacher ? list.overseasTeacher.teacherName : ""}}</el-col>
				</el-row>-->
			</div>
		</div>
		<div class="container">
			<div class="container-title">学生列表</div>
			<div class="mgb20">
				<el-row :gutter="10" class="clearfix">
					<!--<el-col :span="24" class="tar"><el-button type="success" @click="addItem">新增</el-button></el-col>-->
				</el-row>
			</div>
			<el-table :data="studentlist" border size="medium" ref="multipleTable">
				<el-table-column prop="name" label="姓名" align="center"></el-table-column>
				<el-table-column prop="englishName" label="英文名" align="center"></el-table-column>
				<el-table-column prop="username" label="用户名" align="center"></el-table-column>
				<el-table-column prop="sex" label="性别" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="140">
					<template slot-scope="scope">
						<!--<router-link :to="{path:'studentDetail',query:{id:scope.row.id}}" style="color:#35a000;">详情</router-link>-->
						<!--<a @click="editItem(scope.row.id,scope.row.name,scope.row.englishName,scope.row.sex,scope.row.subject)" style="color:#0085c8; margin:0 6px; cursor:pointer">编辑</a>-->
						<!--<a @click="delItem(scope.row.id,scope.row.name)" style="color:#ff0000; cursor:pointer">删除</a>-->
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog :title="dialogTitle" width="500px" :close-on-click-modal="false" :visible.sync="dialogVisible" :show-close="false">
			<el-form :model="form" ref="form" :rules="rules" class="item-add-list">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="24">
						<el-form-item label="姓名:" prop="name">
					    <el-input v-model.trim="form.name"></el-input>
					  </el-form-item>
					</el-col>
				</el-row>	
				<el-row :gutter="10" class="clearfix">	
					<el-col :span="24">
						<el-form-item label="英文名:">
					    <el-input v-model.trim="form.englishName"></el-input>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">
					<el-col :span="24">
						<el-form-item label="性别:" prop="sex">
					    <el-select v-model="form.sex" placeholder="选择性别">
								<el-option key="0" label="男" value="0"></el-option>
								<el-option key="1" label="女" value="1"></el-option>
							</el-select>
					  </el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose('form')">取消</el-button>
				<el-button type="primary" @click="onSubmit('form')">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
  export default {
    name: 'studentDetail',
    data() {
      return {
      	list:{},
      	studentlist:[],
      	classId:0,
      	overseasTeacherId:0,
      	loading:true,
      	dialogTitle:'',
        dialogVisible:false,
        pageType:0,
        form:{
        	id:'',
        	name:'',
        	englishName:'',
        	sex:''
        },
        rules:{
          name: [
            { required: true, message: '不可为空！', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '不可为空！', trigger: 'change' }
          ]
	      }
      }    
    },
    created(){
			this.classId = this.$route.query.id
			this.$get('classes/'+this.classId).then((res) => {
      	if(res.code === 0){
      		this.list = JSON.parse(JSON.stringify(res.data))
      		//this.overseasTeacherId = res.data.overseasTeacher.id
      		this.studentlist = res.data.studentList
      		for(var i=0;i<this.studentlist.length;i++){
      			if(this.studentlist[i].sex){
      				this.studentlist[i].sex = '女'
      			}else{
      				this.studentlist[i].sex = '男'
      			}
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
    	// 分页导航
      handleCurrentChange(val) {
      	this.loading = true
				this.$get('realclasses/'+this.classId,{pageNum:val,pageSize:100}).then((res) => {
	      	if(res.code === 0){
	      		this.className = res.data.className
      			this.tableData = JSON.parse(JSON.stringify(res.data.studentList))
	      		for(var i=0;i<this.tableData.length;i++){
	      			if(this.tableData[i].sex){
	      				this.tableData[i].sex = '女'
	      			}else{
	      				this.tableData[i].sex = '男'
	      			}
	      		}
	      	}else{
	      		this.$message.error('学生加载失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
      },

			editItem(id,name,enName,sex,sub){
				if(sex == "男"){
					this.form.sex = '0'
				}else{
					this.form.sex = '1'
				}
				this.pageType = 2
				this.form.id = id
				this.form.name = name
        this.form.englishName = enName
        this.form.subject = sub
				this.dialogVisible = true
				this.dialogTitle = '编辑学生'
			},
			addItem(){
				this.pageType = 1
				this.dialogVisible = true
				this.dialogTitle = '添加学生'
			},
			delItem(id,name){
				this.$confirm('确认删除该'+name+'学生?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
        	this.loading = true
				  this.$del('realclasses/'+this.classId+'/students?studentIds='+id).then((res) => {
		      	if(res.code === 0){
							this.$message({message:'删除成功',type: 'success'});
							this.handleCurrentChange(1)
		      	}else{
		      		this.$message.error('删除失败');
		      		this.loading = false
		      	}
				  }).catch(() => {this.loading = false})
        }).catch(() => {});
			},
			handleClose(formName){
				this.dialogVisible = false
				this.form.id = ''
				this.form.englishName = ''
        this.form.subject = ''
        this.$refs[formName].resetFields();
			},
			onSubmit(formName){
				this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.loading = true
          	if(this.pageType == 1){ 
          		//新增
          		this.$post('realclasses/'+this.classId+'/students',{
          			name:this.form.name,
          			englishName:this.form.englishName,
          			sex:parseInt(this.form.sex)
          		}).then((res) => {
				      	if(res.code === 0){
				      		this.dialogVisible = false
									this.$message({message:res.msg,type: 'success'});
									this.handleCurrentChange(1)
				      	}else{
				      		this.$message.error(res.msg);
				      	}
				      	this.loading = false
				      }).catch(() => {this.loading = false})
          	} else if(this.pageType == 2){ 
          		//编辑
							this.dialogVisible = false
							this.loading = false
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
.photo{ max-width:120px; display: block; margin:0 auto;}
</style>
