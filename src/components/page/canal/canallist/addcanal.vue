<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">新增渠道用户</div>
            <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
                    <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="6">
                    <!-- <el-row :gutter="10" class="clearfix">
                        <el-col :span="12"> -->
                            <el-form-item label="渠道名称:" prop="name">
                            <el-input v-model.trim="form.name" type="text"></el-input>
                          </el-form-item>
                        <!-- </el-col>
                        <el-col :span="12"> -->
                            <el-form-item label="APP下载链接:" prop="app_url">
                            <el-input v-model.trim="form.app_url" ></el-input>
                          </el-form-item>
                        <!-- </el-col>                   
                    </el-row>
                    <el-row :gutter="10" class="clearfix">
                        <el-col :span="12"> -->
                            <el-form-item label="渠道联系人名称" prop="admin_id">
                                    <el-select v-model="form.admin_id" placeholder="请选择联系人名称">
                                        <template v-for="item in admindata">
                                                <el-option :label="item.admin_id" :value="item.admin_id"></el-option>
                                        </template>    
                                    </el-select>
                          </el-form-item>
                        <!-- </el-col>
                        <el-col :span="12"> -->
                            <el-form-item label="渠道模板类型" prop="template">
                                <el-select v-model="form.template" placeholder="请选择模板类型">
                                    <el-option label="默认模板" value="1"></el-option>
                                  </el-select>
                          </el-form-item>
                        <!-- </el-col>
                    </el-row>         
                    <el-row :gutter="10" class="clearfix">
                            <el-col :span="12"> -->
                                <el-form-item label="合作方式" prop="cooperation_type">
                                        <el-select v-model="form.cooperation_type" placeholder="请选择合作方式">
                                                <el-option label="UV" value="1"></el-option>
                                                <el-option label="注册" value="2"></el-option>
                                                <el-option label="激活" value="3"></el-option>
                                                <el-option label="其他" value="4"></el-option>
                                              </el-select>
                              </el-form-item>
                            <!-- </el-col>
                        </el-row>               
                    <el-row :gutter="10" class="clearfix">
                      <el-col :span="20" :offset="4"> -->
                            <el-button type="primary" @click="onSubmit('form')" style='margin-top:40px'>确认添加</el-button>
                            <el-button @click="resetForm('form')">重置</el-button>
                        </el-col>
                        <el-col :span="6"></el-col>
                        <el-col :span="6"></el-col>
                  </el-row>
                   
                    </el-form>
</div>
</div>
</template>

<script>
    export default {
        name: 'addcanal',
        data() {
            // var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(198)|(199)|(166)|(165)|(146)|(148))+\d{8})$/;
            var re = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            // var amtRule = (rule, value, callback) => {
            //     if (!re.test(value)) {
            //         callback(new Error('请输入正确的格式'));
            //     } else {
            //         callback();
            //     }
            // };
            return {
                form: {
                    name: "",
                    app_url: "",
                    startDate: "",
                    expDate: "",
                    amt: "",
                    memo: "",
                    cooperation_type:"",
                    admindata:"",
                },
                // rules: {
                //     projectNo: [{
                //         required: true,
                //         message: '不可为空！',
                //         trigger: 'blur'
                //     }],
                //     projectNo: [{
                //         required: true,
                //         message: '不可为空！',
                //         trigger: 'blur'
                //     }],
                //     amt: [{
                //         required: true,
                //         message: '不可为空！',
                //         trigger: 'blur'
                //     }],
                //     startDate: [{
                //         required: true,
                //         message: '不可为空！',
                //         trigger: 'blur'
                //     }],
                //     expDate: [{
                //         required: true,
                //         message: '不可为空！',
                //         trigger: 'blur'
                //     }],
                // }
            }
        },
        created() {
            this.getadmindata()
        },
        computed: {

        },
        methods: {
            getadmindata(){
                this.$get('channels').then((res) => {
                    console.log(res)
                    if(res.code===1){
                        this.admindata = res.info.items;
                        console.log(this.admindata)
                    }else{
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch( () => {
                    this.loading = false
                })
            },
            //提交数据
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post('channels', {
                            name: this.form.name,
                            admin_id: this.form.admin_id,
                            cooperation_type: this.form.cooperation_type,
                            app_url: this.form.app_url,
                            template: this.form.template,
                        }).then((res) => {
                            if (res.code === 1) {
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                });
                                this.$router.push('/canallist');
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    } else {
                        return false;
                    }
                });
                // this.$emit('closedialog');  
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>


<style scoped>

</style>