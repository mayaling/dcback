<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">班级列表</div>
			<div class="mgb20">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="5"><el-input v-model.trim="s_className" placeholder="输入班"></el-input></el-col>
					<el-col :span="14"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col>
					<!--<el-col :span="5" class="tar"><el-button type="success" @click="addItem">新增</el-button></el-col>-->
				</el-row>
			</div>
			<el-table :data="tableData" border size="medium" ref="multipleTable">
				<el-table-column prop="id" label="ID" width="120" align="center"></el-table-column>
				<el-table-column prop="className" label="班"></el-table-column>
				<el-table-column prop="subject" label="科目"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<!--<a @click="editItem(scope.row.id,scope.row.schoolId,scope.row.gradeId,scope.row.classId)" style="color:#0085c8; cursor:pointer">编辑</a>-->
						<!--<router-link :to="{path:'classStudent',query:{id:scope.row.id}}" style="color:#35a000;">学生</router-link>-->
						<router-link :to="{path:'classPapers',query:{id:scope.row.id}}" style="color:#0085c8;">试卷</router-link>
						<router-link :to="{path:'classSuryers',query:{id:scope.row.id}}" style="color:#35a000; margin:0 6px;">问卷</router-link>
						<router-link :to="{path:'classDetail',query:{id:scope.row.id}}" style="color:#0085c8;">详情</router-link>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
				</el-pagination>
			</div>
		</div>
		
		<el-dialog :title="dialogTitle" width="900px" :close-on-click-modal="false" :visible.sync="dialogVisible" :before-close="handleClose">
			<el-form :model="form" ref="form" :rules="rules" class="item-add-list">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="12">
						<el-form-item label="学校:" prop="school">
					    <el-select v-model="form.school" filterable placeholder="选择学校">
								<el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.schoolName"></el-option>
							</el-select>
					  </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="年级:" prop="grade">
					    <el-select v-model="form.grade" filterable placeholder="选择年级">
								<el-option v-for="item in gradeList" :key="item.id" :label="item.gradeName" :value="item.gradeName"></el-option>
							</el-select>
					  </el-form-item>
					</el-col>
				</el-row>	
				<el-row :gutter="10" class="clearfix">	
					<el-col :span="12">
						<el-form-item label="班:" prop="class">
							<el-select v-model="form.class" filterable placeholder="选择班">
								<el-option v-for="item in classList" :key="item.id" :label="item.className" :value="item.className"></el-option>
							</el-select>
					  </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="助教:">
							<el-select v-model="form.teacher_id" filterable placeholder="选择助教">
								<el-option v-for="item in teacherList" :key="item.id" :label="item.teacherName" :value="item.id"></el-option>
							</el-select>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">	
					<el-col :span="12">
						<el-form-item label="外教:">
							<el-select v-model="form.overseasTeacherId" filterable placeholder="选择外教">
								<el-option v-for="item in teacherList" :key="item.id" :label="item.teacherName" :value="item.id"></el-option>
							</el-select>
					  </el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="每周课时:">
							<el-input v-model="form.classHour" placeholder="填写课时"></el-input>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="科目:">
					    <el-select v-model="form.subject" filterable placeholder="选择外教">
								<el-option v-for="item in subjectList" :key="item" :label="item" :value="item"></el-option>
							</el-select>
					  </el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取消</el-button>
				<el-button type="primary" @click="onSubmit('form')">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>


<script>
  export default {
    name: 'chasslist',
    data() {
      return {
        tableData: [],
        pages:0,
        s_className: '',
        loading:true,
        dialogTitle:'',
        dialogVisible:false,
        schoolList:[],
        pageType:0,
      	gradeList:[],
      	classList:[],
      	type:'',
      	teacherId:0,
      	teacherList:[],
      	subjectList:['领导力','ESL','戏剧'],
        form:{
        	id:'',
        	school:'',
        	grade:'',
        	class:'',
        	teacher_id:'',
        	overseasTeacherId:'',
        	classHour:'',
        	subject:''
        },
        rules:{
          school: [
            { required: true, message: '不可为空！', trigger: 'change' }
          ],
          grade: [
            { required: true, message: '不可为空！', trigger: 'change' }
          ],
          class: [
            { required: true, message: '不可为空！', trigger: 'change' }
          ]
	      }
      }
    },
    created(){
    	this.type = JSON.parse(localStorage.getItem('userInfo')).type;
      this.teacherId = JSON.parse(localStorage.getItem('userInfo')).id;
      var Url = ''
      if(this.type == 'academic'){
      	Url = 'realclasses'
      }else{
      	Url = 'realclasses?teacherId='+ this.teacherId
      }
    	this.$axios.all([this.$get(Url),this.$get('teachers'),this.$get('realclasses/csg')]).then(([a,b,c])=>{
    		if(a.code === 0 && b.code === 0 && c.code === 0){
    			this.tableData = JSON.parse(JSON.stringify(a.data.list))
	    		this.pages = a.data.pages;
      		this.teacherList = JSON.parse(JSON.stringify(b.data.list))
      		this.schoolList = JSON.parse(JSON.stringify(c.data.schoolList))
    			this.gradeList = JSON.parse(JSON.stringify(c.data.gradeList))
    			this.classList = JSON.parse(JSON.stringify(c.data.klassList))
    			this.loading = false
    		}else{
      		this.$message.error('数据请求失败');
      		this.loading = false
    		}
    	}).catch((err) =>{
    		this.loading = false
    	})
    },

    computed: {

    },
    methods: {
    	
    	// 分页导航
      handleCurrentChange(val) {
      	this.loading = true
				this.$get('realclasses',{pageNum:val,className:this.s_className}).then((res) => {
	      	if(res.code === 0){
	      		var newData = JSON.parse(JSON.stringify(res.data.list))
	      		this.tableData = newData;
	      		this.pages = res.data.pages;
	      	}else{
	      		this.$message.error('接口数据请求失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
      },
      
      // 搜索
      search(){
    		this.loading = true
				this.$get('realclasses',{className:this.s_className}).then((res) => {
	      	if(res.code === 0){
	      		var newData = JSON.parse(JSON.stringify(res.data.list))
	      		this.tableData = newData;
	      		this.pages = res.data.pages;
	      	}else{
	      		this.$message.error('接口数据请求失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
			},
			editItem(id,sid,gid,cid){
//				this.pageType = 2
//				this.form.id = id
//				this.form.schoolId = sid
//      this.form.gradeId = gid
//      this.form.classId = cid
//				this.dialogVisible = true
//				this.dialogTitle = '编辑班级'
			},
			addItem(){
				this.pageType = 1
				this.form.school = ''
        this.form.grade = ''
        this.form.class = ''
				this.dialogVisible = true
				this.dialogTitle = '添加班级'
			},
			handleClose(){
				this.dialogVisible = false
				this.form.id = ''
				this.form.school = ''
        this.form.grade = ''
        this.form.class = ''
			},
			onSubmit(formName){
				this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.loading = true
          	if(this.pageType == 1){ 
          		//新增
          		this.$post('realclasses',{
          			school:this.form.school,
          			klass:this.form.class,
          			grade:this.form.grade,
          			teacher_id:parseInt(this.form.teacher_id),
          			overseasTeacherId:parseInt(this.form.overseasTeacherId),
          			classHour:parseInt(this.form.classHour),
          			subject:this.form.subject
          		}).then((res) => {
				      	if(res.code === 0){
				      		this.dialogVisible = false
									this.$message({message:res.msg,type: 'success'});
									this.handleCurrentChange(1)
				      	}else{
				      		this.$message.error(res.msg);
				      		this.loading = false
				      	}
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

</style>
