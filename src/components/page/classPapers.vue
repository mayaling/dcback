<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">试卷列表</div>
			<div class="mgb20">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="6"><el-date-picker v-model="s_startDate" type="date" placeholder="选择日期" style='width:100%;'></el-date-picker></el-col>
					<el-col :span="8"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col>
					<el-col :span="10" class="tar">
						<el-button type="success" @click="papers">安排测验</el-button>
					</el-col>
				</el-row>
			</div>
			<el-table :data="tableData" border size="medium" ref="multipleTable">
				<el-table-column prop="id" label="ID" align="center" width="80"></el-table-column>
				<el-table-column prop="examinationName" label="试卷名称"></el-table-column>
				<el-table-column prop="startDate" label="测试日期" align="center"></el-table-column>
				<el-table-column prop="teacherName" label="测验老师" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="140">
					<template slot-scope="scope">
						<!--<router-link :to="{path:'studentDetail',query:{id:scope.row.id}}" style="color:#35a000;">详情</router-link>-->
						<!--<a @click="editItem(scope.row.id,scope.row.name,scope.row.englishName,scope.row.sex,scope.row.subject)" style="color:#0085c8; margin:0 6px; cursor:pointer">编辑</a>
						<a @click="delItem(scope.row.id,scope.row.name)" style="color:#ff0000; cursor:pointer">删除</a>-->
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="安排测验" width="500px" :close-on-click-modal="false" :visible.sync="dialogPaper" :show-close="false">
			<el-form :model="form" ref="form" :rules="rules" class="item-add-list">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="24">
						<el-form-item label="试卷:" prop="paperId">
					    <el-select v-model="form.paperId" filterable placeholder="选择试卷">
								<el-option v-for="item in papersList" :key="item.id" :label="item.subject" :value="item.id"></el-option>
							</el-select>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">	
					<el-col :span="24">
						<el-form-item label="日期:" prop="startDate">
							<el-date-picker v-model="form.startDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
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
    name: 'teacher',
    data(){
      return {
        tableData: [],
        papersList:[],
        list:[],
        s_startDate:'',
        classId:0,
        loading: true,
        dialogPaper:false,
        pages:100,
        form:{
        	paperId:'',
        	startDate:''
        },
	      rules:{
          paperId: [
            { required: true, message: '不可为空！', trigger: 'change' }
          ],
          startDate: [
            { required: true, message: '不可为空！', trigger: 'change' }
          ]
	      }
      }
    },
    created(){
    	this.classId = this.$route.query.id
      //获取试题库
      this.$get('papers',{pageSize:1000}).then((res) => {
      	if(res.code === 0){
    			this.papersList = JSON.parse(JSON.stringify(res.data.list))
      	}else{
      		this.$message.error('获取题库失败');
      	}
      }).catch(() => {this.loading = false})
      
    	//获取班级全部试卷
			this.$get('examination_plans',{pageSize:100,classId:this.classId}).then((res) => {
      	if(res.code === 0){
      		this.pages = res.data.pages;
    			this.tableData = JSON.parse(JSON.stringify(res.data.list))
      	}else{
      		this.$message.error('获取试卷失败');
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
				this.$get('examination_plans',{pageNum:val,pageSize:100,classId:this.classId}).then((res) => {
	      	if(res.code === 0){
	      		this.pages = res.data.pages;
	      		this.tableData = JSON.parse(JSON.stringify(res.data.list))
	      	}else{
	      		this.$message.error('获取试卷失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
      },
      //搜索
      search(){
    		this.loading = true
    		this.$get('examination_plans',{pageSize:100,startDate:this.s_startDate,classId:this.classId}).then((res) => {
	      	if(res.code === 0){
      		this.pages = res.data.pages;
    			this.tableData = JSON.parse(JSON.stringify(res.data.list))
      	}else{
	      		this.$message.error('获取试卷失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
    	},
			papers(){
				this.dialogPaper = true
			},
			handleClose(formName){
				this.dialogPaper = false
        this.form.paperId = ''
        this.form.startDate = ''
        this.$refs['form'].resetFields();
			},
			onSubmit(formName){
				this.$refs[formName].validate((valid) => {
          if (valid) {
          	var teacherId = JSON.parse(localStorage.getItem('userInfo')).id
          	this.loading = true
        		this.$post('teachers/'+teacherId+'/classes/'+parseInt(this.classId)+'/examination_plans',{
        			classId:parseInt(this.classId),
        			paperId:parseInt(this.form.paperId),
        			startDate:this.form.startDate
        		}).then((res) => {
			      	if(res.code === 0){
								this.$message({message:res.msg,type: 'success'});
								this.handleCurrentChange(1)
								this.handleClose('form')
			      	}else{
			      		this.$message.error(res.msg);
			      		this.loading = false
			      	}
			      }).catch(() => {this.loading = false})
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
