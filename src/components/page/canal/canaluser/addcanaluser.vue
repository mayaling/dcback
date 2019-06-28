<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">新增渠道用户</div>
            <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="6">
                            <el-form-item label="渠道账号:" prop="name">
                            <el-input v-model.trim="form.name" type="text"></el-input>
                          </el-form-item>
                        <!-- </el-col>
                        <el-col :span="12"> -->
                            <el-form-item label="密码:" prop="password">
                            <el-input v-model.trim="form.password" type="password"></el-input>
                          </el-form-item>
                        <!-- </el-col>                    -->
                    <!-- </el-row> -->
                    <!-- <el-row :gutter="10" class="clearfix">
                        <el-col :span="12"> -->
                            <el-form-item label="渠道名称" prop="type">
                            <el-input v-model.trim="form.type"></el-input>
                          </el-form-item>
                        <!-- </el-col>
                        <el-col :span="12"> -->
                            <el-form-item label="状态" prop="status">
                                <el-select v-model="form.status" placeholder="请选择状态">
                                    <el-option label="启动" value="1"></el-option>
                                    <el-option label="关闭" value="2"></el-option>
                                  </el-select>
                          </el-form-item>
                        <!-- </el-col> -->
                    <!-- </el-row>                -->
                    <!-- <el-row :gutter="10" class="clearfix"> -->
                      <!-- <el-col :span="20" :offset="4"> -->
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
        name: 'addcanaluser',
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
                    password: "",
                    type: "",
                    status: "",
                    amt: "",
                    memo: "",
                },
                rules: {
                    projectNo: [{
                        required: true,
                        message: '不可为空！',
                        trigger: 'blur'
                    }],
                    projectNo: [{
                        required: true,
                        message: '不可为空！',
                        trigger: 'blur'
                    }],
                    amt: [{
                        required: true,
                        message: '不可为空！',
                        trigger: 'blur'
                    }],
                    startDate: [{
                        required: true,
                        message: '不可为空！',
                        trigger: 'blur'
                    }],
                    expDate: [{
                        required: true,
                        message: '不可为空！',
                        trigger: 'blur'
                    }],
                }
            }
        },
        created() {

        },
        computed: {

        },
        methods: {
            //提交数据
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post('channels', {
                            name: this.form.name,
                            password: this.form.password,
                            type:this.form.type,
                            status:this.form.status
                        }).then((res) => {
                            console.log(res)
                            if(res.code === 1){
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                });
                            }else{
                                if(!res.info.name){
                                    this.$message.error(res.message);
                                }else{
                                    this.$message.error(res.info.name[0]);
                                }
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