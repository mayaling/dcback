<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="container">
			<div class="container-title">班管理</div>
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
				<el-table-column label="操作" width="120" align="center">
					<template slot-scope="scope">
						<!--<a @click="editItem(scope.row.id,scope.row.className)" style="color:#0085c8; cursor:pointer">编辑</a>-->
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
        loading:true
      }
    },
    created(){
    	this.$get('baseclasses').then((res) => {
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

    computed: {

    },
    methods: {
    	
    	// 分页导航
      handleCurrentChange(val) {
      	this.loading = true
				this.$get('baseclasses',{pageNum:val,className:this.s_className}).then((res) => {
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
				this.$get('baseclasses',{className:this.s_className}).then((res) => {
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
			editItem(id,name){
				this.$prompt('请输入班', '编辑班', {confirmButtonText:'确定',cancelButtonText:'取消',inputValue:name,inputPattern:/\S/,inputErrorMessage: '班不能为空'}).then(({ value }) => {
//    		this.loading = true
//					this.$post('baseclasses',{className:value}).then((res) => {
//		      	if(res.code === 0){
//		      		this.$message({type: 'success',message:res.msg});
//		          this.handleCurrentChange(1)
//		      	}else{
//		      		this.$message.error('接口数据请求失败');
//		      	}
//		      	this.loading = false
//		      }).catch(() => {this.loading = false})
      	}).catch(() => { });
			},
			addItem(){
				this.$prompt('请输入班','添加班',{confirmButtonText:'确定',cancelButtonText:'取消',inputPattern:/\S/,inputErrorMessage:'班不能为空'}).then(({value})=>{
      		this.loading = true
					this.$post('baseclasses',{className:value}).then((res) => {
		      	if(res.code === 0){
		      		this.$message({type:'success',message:res.msg});
		          this.handleCurrentChange(1)
		      	}else{
		      		this.$message.error('接口数据请求失败');
		      	}
		      	this.loading = false
		      }).catch(() => {this.loading = false})
			  }).catch(() => { })
			}
    }
  }
</script>

<style scoped>

</style>
