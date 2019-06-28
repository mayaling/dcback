<template>
	<div class="table" v-loading="loading" element-loading-text="提交中">
		<div class="container">
			<div class="container-title">修改密码</div>
			<el-form :model="form" ref="form" :rules="rules" class="item-add-list" @keyup.enter.native="onSubmit('form')">
				<el-row :gutter="10" class="clearfix">
					<el-col :span="12">
						<el-form-item label="新密码:" prop="psw1">
					    <el-input v-model.trim="form.psw1" type="password"></el-input>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">
					<el-col :span="12">
						<el-form-item label="重复密码:" prop="psw2">
					    <el-input v-model.trim="form.psw2" type="password"></el-input>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10" class="clearfix">
				  <el-col :span="20" :offset="4">
				  	<el-button type="primary" @click="onSubmit('form')" style='margin-top:40px'>确认修改</el-button>
				  </el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'enter',
    data() {
    	var psw1 = (rule, value, callback) => {
        if(value === '') {
          callback(new Error('密码不能为空！'));
        }else if(value.length < 5){
          callback(new Error('密码最少5位字符！'));
        }else{
          callback();
        }
      };
      var psw2 = (rule, value, callback) => {
        if(value === '') {
          callback(new Error('密码不能为空！'));
        }else if(value != this.form.psw1){
          callback(new Error('2次输入密码不同！'));
        } else{
          callback();
        }
      };
      return {
      	form: {
          psw1:'',
          psw2:''
        },
        rules: {
          psw1: [
            { required: true, validator: psw1,  trigger: 'blur' }
          ],
          psw2: [
            { required: true, validator: psw2, trigger: 'blur' }
          ]
        },
	      userid:0,
        loading:false
      }        
    },
    created(){
			this.userid = JSON.parse(localStorage.getItem('userInfo')).id
    },
    components: {

    },
    methods: {
      //提交数据
			onSubmit(formName){
				this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.loading = true
        		this.$put('teachers/'+this.userid,{passwd:this.form.psw2}).then((res) => {
			      	if(res.code === 0){
			      		this.$alert('密码修改成功，请重新登录！', '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				            localStorage.setItem('userInfo','');
	                	localStorage.setItem('token','');
	                  this.$router.push('/login');
				          }
				        });
			      	}else{
			      		this.$message.error(res.msg)
			      	}
			      	this.loading = false
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

