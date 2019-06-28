<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">新增用户</div>
            <!-- <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
                <el-row :gutter="10" class="clearfix">
                    <el-col :span="12">
                        <el-form-item label="账号:" prop="name">
                        <el-input v-model.trim="form.name" type="text"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="密码:" prop="password">
                        <el-input v-model.trim="form.password" type="password"></el-input>
                        </el-form-item>
                    </el-col>                   
                </el-row>
                <el-row :gutter="10" class="clearfix">
                    <el-col :span="12">
                        <el-form-item label="分组:" prop="type">
                            <el-select v-model="form.type" placeholder="管理员">
                                <el-option label="管理员" value="1"></el-option>
                                <el-option label="运营" value="2"></el-option>
                                <el-option label="渠道" value="3"></el-option>

                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态:" prop="status">
                            <el-select v-model="form.status" placeholder="关闭">
                                <el-option label="开启" value="1"></el-option>
                                <el-option label="关闭" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>               
                <el-row :gutter="10" class="clearfix">
                    <el-col :span="20" :offset="4">
                        <el-button type="primary" @click="onSubmit('form')" style='margin-top:40px'>保存</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-col>
                </el-row>
            </el-form> -->
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                        <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
                                <el-form-item label="账号:" prop="name">
                                <el-input v-model.trim="form.name" type="text"></el-input>
                                </el-form-item>
                                <el-form-item label="密码:" prop="password">
                                <el-input v-model.trim="form.password" type="password"></el-input>
                                </el-form-item>
                                <el-form-item label="名称:" prop="name">
                                    <el-input v-model.trim="form.name" type="text"></el-input>
                                </el-form-item>
                                <el-form-item label="分组:" prop="type">
                                    <el-select v-model="form.type">
                                        <el-option label="管理员" value="1"></el-option>
                                        <el-option label="运营" value="2"></el-option>
                                        <el-option label="渠道" value="3"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="状态:" prop="status">
                                    <el-select v-model="form.status">
                                        <el-option label="开启" value="1"></el-option>
                                        <el-option label="关闭" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-button type="primary" @click="onSubmit('form')" style='margin-top:40px'>保存</el-button>
                                <el-button @click="resetForm('form')">重置</el-button>
                    </el-form>
                </el-col>
                <el-col :span="6"></el-col>
                <el-col :span="6"></el-col>
                </el-row>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: 'addproject',
        data() {
            // var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(198)|(199)|(166)|(165)|(146)|(148))+\d{8})$/;
            var re = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            var amtRule = (rule, value, callback) => {
                if (!re.test(value)) {
                    callback(new Error('请输入正确的格式'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    name: "",
                    password: "",
                    status: "",
                    type: "",
                },
                id:'',
                data:"",
                rules: {
                    name: [{
                        required: true,
                        message: '不可为空！',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '不可为空！',
                        trigger: 'blur'
                    }],
                    status: [{
                        required: true,
                        validator: "不可为空！",
                        trigger: 'blur'
                    }],
                    type: [{
                        required: true,
                        message: '不可为空！',
                        trigger: 'blur'
                    }],
                }
            }
        },
        created() {
            this.id = this.$route.query.id
            // this.row = this.$route.query.row
            // console.log(this.row)
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
                        if(this.tableData.type == 1){
                            this.tableData.type = "管理员"
                        }else if(this.tableData.type == 2){
                            this.tableData.type = "运营"
                        }else{
                            this.tableData.type = "渠道"
                        }
                        // for(var i=0;i<this.tableData.length;i++){
                        //     if(this.tableData[i].status == 1){
                        //         this.tableData[i].status = "开启"
                        //     }else{
                        //         this.tableData[i].status = "关闭"
                        //     }
                        // }
                        // for(var i=0;i<this.tableData.length;i++){
                        //     if(this.tableData[i].type == 1){
                        //         this.tableData[i].type = "管理员"
                        //     }else if(this.tableData[i].type == 2){
                        //         this.tableData[i].type = "运营"
                        //     }else{
                        //         this.tableData[i].type = "渠道"
                        //     }
                        // }
                        this.form = this.tableData;
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