<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">问卷列表</div>
			<div class="mgb20">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="8"><el-date-picker v-model="s_Date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker></el-col>
					<el-col :span="8"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col>
					<el-col :span="8" class="tar">
						<el-button type="success" @click="papers">安排问卷</el-button>
					</el-col>
				</el-row>
			</div>
			<el-table :data="tableData" border size="medium" ref="multipleTable">
				<el-table-column prop="id" label="ID" align="center" width="80"></el-table-column>
				<el-table-column prop="surveyName" label="问卷名称" align="center"></el-table-column>
				<el-table-column prop="startDate" label="开始日期" align="center" width="110"></el-table-column>
				<el-table-column prop="endDate" label="结束日期" align="center" width="110"></el-table-column>
				<el-table-column prop="teacherName" label="测验老师" align="center" width='160'></el-table-column>
				<el-table-column label="操作" align="center" width="140">
					<template slot-scope="scope">
						<!--<router-link :to="{path:'classSuryersReport',query:{id:scope.row.id}}" style="color:#35a000;">报告</router-link>-->
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
								<el-option v-for="item in surveysList" :key="item.id" :label="item.surveyName" :value="item.id"></el-option>
							</el-select>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">	
					<el-col :span="24">
						<el-form-item label="期限:" prop="startDate">
							<el-date-picker v-model="form.startDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker>
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
    data() {
      return {
        tableData: [],
        surveysList:[],
        list:[],
        s_Date:[],
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
      //获取题库
      this.$get('surveys',{pageSize:1000}).then((res) => {
      	if(res.code === 0){
    			this.surveysList = JSON.parse(JSON.stringify(res.data.list))
      	}else{
      		this.$message.error('获取题库失败');
      	}
      }).catch(() => {this.loading = false})
      
    	//获取班级全部试卷
			this.$get('survey_plans',{pageSize:100,classId:this.classId}).then((res) => {
      	if(res.code === 0){
      		this.pages = res.data.pages;
    			this.tableData = JSON.parse(JSON.stringify(res.data.list))
      	}else{
      		this.$message.error('获取问卷失败');
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
				this.$get('survey_plans',{pageNum:val,pageSize:100,classId:this.classId}).then((res) => {
	      	if(res.code === 0){
	      		this.pages = res.data.pages;
	      		this.tableData = JSON.parse(JSON.stringify(res.data.list))
	      	}else{
	      		this.$message.error('获取问卷失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
      },
      //搜索
      search(){
    		this.loading = true
    		var startDate = '',endDate=''
    		if(this.s_Date === '' || this.s_Date == null){

    		}else if(this.s_Date.length>0){
    			startDate = this.s_Date[0]
    			endDate = this.s_Date[1]
    		}
    		
    		this.$get('survey_plans',{pageSize:100,'startDate':startDate,'endDate':endDate,'classId':this.classId}).then((res) => {
	      	if(res.code === 0){
      		this.pages = res.data.pages;
    			this.tableData = JSON.parse(JSON.stringify(res.data.list))
      	}else{
	      		this.$message.error('获取问卷失败');
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
        		this.$post('teachers/'+teacherId+'/classes/'+parseInt(this.classId)+'/survey',{
        			paperId:parseInt(this.form.paperId),
        			startDate:this.form.startDate[0],
        			endDate:this.form.startDate[1]
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
