<template>
  <div class="login-wrap" v-loading="loading" element-loading-text="登录中">
    <!-- <div class="ms-login clearfix"> -->
    	<!-- <div class="ms-login-left"></div> -->
    	<div class="ms-login-right">
    		<div class="login-title">随手花</div>
    		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input class="login-input" v-model="ruleForm.username" placeholder="用户名"><i slot="prefix" class="el-input__icon el-icon-lx-people"></i></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="login-input" type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"><i slot="prefix" class="el-input__icon el-icon-lx-lock"></i></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
    	</div>
    <!-- </div> -->
  </div>
</template>

<script>
    export default {
        data: function() {
            return {
                loading: false,
                ruleForm: {
                    type: "",
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('token', '');
                        this.loading = true
                        this.$post('get-access-token', {
                                name: this.ruleForm.username,
                                password: this.ruleForm.password
                            }).then((res) => {
                                console.log(res)
                                if (res.code === 1) {
                                    localStorage.setItem('token', res.info.access_token);
                                    this.token = localStorage.getItem("token")
                                    this.$get('admin/info', {
                                        access_token: this.token,
                                    }).then((res) => {
                                        console.log(res)
                                        if (res.code === 1) {
                                            localStorage.setItem('userInfo', JSON.stringify(res.info));
                                            this.$router.push('/Dashboard');
                                        } else {
                                            this.$message.error(res.message);
                                        }
                                        this.loading = false
                                    }).catch(() => {
                                        this.loading = false
                                    })
                                    // this.$router.push('/home');
                                } else {
                                    this.$message.error(res.message);
                                }
                                this.loading = false
                            }).catch(() => {
                                this.loading = false
                            })
                    } else {
                        return false;
                    }
                });
            }

        }
    }
</script>