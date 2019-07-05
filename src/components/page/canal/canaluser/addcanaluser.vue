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
                     
                            <el-form-item label="密码:" prop="password">
                            <el-input v-model.trim="form.password" type="password"></el-input>
                          </el-form-item>
                    
                            <el-form-item label="type" prop="type" v-show="false">
                            <el-input v-model.trim="form.type"></el-input>
                          </el-form-item>
                      
                            <el-form-item label="状态" prop="status">
                                <el-select v-model="form.status" placeholder="请选择状态">
                                    <el-option label="启动" value="1"></el-option>
                                    <el-option label="关闭" value="2"></el-option>
                                  </el-select>
                          </el-form-item>
                        <el-button type="primary" v-if="!tableData" @click="onSubmit('form')" style='margin-top:40px'>确认添加</el-button>
                        <el-button type="primary" v-if="tableData" @click="onEdit('form')" style='margin-top:40px'>保存</el-button>
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
                    type: "3",
                    status: "",
                    amt: "",
                    memo: "",
                },
                id:'',
                tableData:'',
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
            this.id = this.$route.query.id
            if(this.id){
                this.getformdata()
            }
        },
        computed: {

        },
        methods: {
             // 编辑进来获取表单的内容
             getformdata(){
                this.$get('admins/'+this.id,).then((res) => {
                    console.log(res)
                    if(res.code===1){
                        this.tableData = res.info;
                        console.log(this.tableData)
                       if(this.tableData.status == 1){
                        this.tableData.status = "开启"
                       }else{
                        this.tableData.status = "关闭"
                       }
                    }else{
                        this.$message.error('数据加载失败');
                    }
                    this.form = this.tableData;
                    this.loading = false
                }).catch( () => {
                    this.loading = false
                })
            },
            //提交数据
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post('admins', {
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
                                this.$router.push("/canaluser")
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
            onEdit(formName) {
                if(this.tableData.status == "开启"){
                        this.tableData.status = 1
                       }else{
                        this.tableData.status = 0
                       }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$put('admins/'+this.id, {
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
                                this.$router.push("/canaluser")
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