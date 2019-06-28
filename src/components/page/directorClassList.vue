<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">主任听课班级</div>
			<div class="mgb20">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="5"><el-input v-model.trim="s_className" placeholder="输入班"></el-input></el-col>
					<el-col :span="14"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col>
				</el-row>
			</div>
			<el-table :data="tableData" border size="medium" ref="multipleTable">
				<el-table-column prop="id" label="ID" width="120" align="center"></el-table-column>
				<el-table-column prop="className" label="班"></el-table-column>
				<el-table-column prop="subject" label="科目"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<router-link :to="{path:'director',query:{cid:scope.row.id,tid:teacherId}}" style="color:#0085c8;">跟课报告</router-link>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
				</el-pagination>
			</div>
		</div>
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
      	teacherId:0,
      }
    },
    created(){
    	this.type = JSON.parse(localStorage.getItem('userInfo')).type;
      this.teacherId = JSON.parse(localStorage.getItem('userInfo')).id;
      this.$get('academicdeans/'+ this.teacherId+'/classes').then((res) => {
    		if(res.code === 0){
    			this.tableData = JSON.parse(JSON.stringify(res.data.list))
	    		this.pages = res.data.pages;
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
				this.$get('academicdeans/'+ this.teacherId+'/classes',{pageNum:val,className:this.s_className}).then((res) => {
	      	if(res.code === 0){
	      		var newData = JSON.parse(JSON.stringify(res.data.list))
	      		this.tableData = newData;
	      		this.pages = res.data.pages;
	      	}else{
	      		this.$message.error('数据请求失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
      },
      
      // 搜索
      search(){
    		this.loading = true
				this.$get('academicdeans/'+ this.teacherId+'/classes',{className:this.s_className}).then((res) => {
	      	if(res.code === 0){
	      		var newData = JSON.parse(JSON.stringify(res.data.list))
	      		this.tableData = newData;
	      		this.pages = res.data.pages;
	      	}else{
	      		this.$message.error('数据请求失败');
	      	}
	      	this.loading = false
	      }).catch(() => {this.loading = false})
			}
    }
  }
</script>

<style scoped>

</style>
