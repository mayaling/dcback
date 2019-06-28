<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">跟课报告</div>
			<div class="mgb20">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="8"><el-date-picker v-model="s_Date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%;"></el-date-picker></el-col>
					<el-col :span="8"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col>
				</el-row>
			</div>
			<div class="item-detail" style="padding:20px 0;">
		  	<el-row :gutter="10" class="clearfix">
				  <el-col :span="4" class="el-item__label tar">学校：</el-col>
				  <el-col :span="8">{{list.school}}</el-col>
				  <el-col :span="4" class="el-item__label tar">课程：</el-col>
				  <el-col :span="8">{{list.subject}}</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">
					<el-col :span="4" class="el-item__label tar">外教：</el-col>
				  <el-col :span="8">{{list.overseasTeacherName}}</el-col>
				  <el-col :span="4" class="el-item__label tar">学生数：</el-col>
				  <el-col :span="8">{{list.studentCount}}</el-col>
				</el-row>
			</div>
			<el-table :data="reportList" border size="medium" ref="multipleTable">
				<el-table-column prop="index" label="#" align="center" width="40"></el-table-column>
				<el-table-column label="项目">
					<template slot-scope="scope"><span v-html="scope.row.itemName"></span></template>
				</el-table-column>
				<el-table-column prop="avgScore" label="平均分" align="center" width="80">
					<template slot-scope="scope"><span v-if="scope.row.index != 9 && scope.row.index != 10">{{scope.row.totalScore ? scope.row.totalScore : '0'}}</span></template>
				</el-table-column>
				<el-table-column prop="avgScore" label="备注" align="center" width="150">
					<template slot-scope="scope">
						<span v-if="scope.row.index == 9" style="display: block; width:100%; text-align:left;">
							作业安排：{{list.assignHomeWorkCount ? list.assignHomeWorkCount : '0'}}次<br />
							未安排作业：{{list.doNotAssignHomeWorkCount ? list.doNotAssignHomeWorkCount :  '0'}}次
						</span>
						<span v-if="scope.row.index == 10" style="display: block; width:100%; text-align:left;">
							安排小组作业：{{list.groupCount ? list.groupCount : '0'}}次<br />
							安排写作作业：{{list.writtenWorkCount ? list.writtenWorkCount : '0'}}次<br />
							安排口头作业：{{list.oralCount ? list.oralCount : '0'}}次<br />
						</span>
					</template>
				</el-table-column>
			</el-table>
			
			<el-table :data="otherList" border size="medium" ref="multipleTable" style="margin-top:20px;">
				<el-table-column prop="createDate" label="时间" align="center" width="150"></el-table-column>
				<!--<el-table-column prop="lesson" label="lesson" align="center"></el-table-column>
				<el-table-column prop="memo" label="memo" align="center"></el-table-column>-->
				<el-table-column prop="comment" label="说明"></el-table-column>
			</el-table>
		</div>
	</div>
</template>


<script>
  export default {
    name: 'teacher',
    data() {
      return {
	      reportList:[],
	      otherList:[],
        list:[],
        s_Date:[],
        overseasTeacherId:0,
        classId:0,
        loading: true,
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
    	this.classId = this.$route.query.cid
    	this.overseasTeacherId = this.$route.query.tid
      this.$get('teachers/'+this.overseasTeacherId+'/classes/'+this.classId+'/classreports',{comments:true}).then((res) => {
      	if(res.code === 0){
      		for(var i=0,len = res.data.classReportItemList.length; i< len;i++){
      			res.data.classReportItemList[i].itemName = this.trim(res.data.classReportItemList[i].itemName)
      			res.data.classReportItemList[i].index = i+1
	      	}
    			this.list = JSON.parse(JSON.stringify(res.data))
    			this.reportList = JSON.parse(JSON.stringify(res.data.classReportItemList))
    			if(res.data.classReportOtherList){
    				this.otherList = res.data.classReportOtherList
    			}
    			this.loading = false
      	}else{
      		this.$message.error('获取报告失败');
      		this.loading = false
      	}
      }).catch(() => {this.loading = false})
    },
    computed: {

    },
    methods: {
      //搜索
      search(){
    		this.loading = true
    		this.reportList = []
	      this.otherList = []
        this.list = []
    		var startDate = '',endDate=''
    		if(this.s_Date === '' || this.s_Date == null){
    			
    		}else if(this.s_Date.length>0){
    			startDate = this.s_Date[0]
    			endDate = this.s_Date[1]
    		}
    		
      this.$get('teachers/'+this.overseasTeacherId+'/classes/'+this.classId+'/classreports',{comments:true,startDate:startDate,endDate:endDate}).then((res) => {
      	if(res.code === 0){
      		for(var i=0,len = res.data.classReportItemList.length; i< len;i++){
      			res.data.classReportItemList[i].itemName = this.trim(res.data.classReportItemList[i].itemName)
      			res.data.classReportItemList[i].index = i+1
	      	}
    			this.list = JSON.parse(JSON.stringify(res.data))
    			this.reportList = JSON.parse(JSON.stringify(res.data.classReportItemList))
    			if(res.data.classReportOtherList){
    				this.otherList = res.data.classReportOtherList
    			}
    			this.loading = false
      	}else{
      		this.$message.error('获取报告失败');
      		this.loading = false
      	}
      }).catch(() => {this.loading = false})
    	},
			trim(str) {
				return str.replace(/\n|\r\n/g,"<br/>")
      }
    }
  }
</script>

<style scoped>
</style>
