<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">新增扣除</div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="6">
                            <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
                                    <el-form-item label="渠道:" prop="channel_id">
                                            <el-select v-model="form.channel_id" placeholder="请选择渠道">
                                                    <template v-for="item in channeldata">
                                                <el-option :label="item.name" :value="item.id"></el-option>
                                             </template> 
                                            </el-select>
                                        </el-form-item>
                                    <el-form-item label="扣除后的比例:" prop="deduct">
                                    <el-input v-model.trim="form.deduct" type="text"></el-input>
                                    </el-form-item>
                                    <el-form-item label="日期:" prop="date_time">
                                            <el-date-picker  v-model="form.date_time" type="date" placeholder="选择日期">
                                          </el-date-picker>
                                        <!-- <el-input v-model.trim="form.name" type="text"></el-input> -->
                                    </el-form-item>
                                    <el-form-item label="状态:" prop="status">
                                        <el-select v-model="form.status" placeholder="请选择状态">
                                            <el-option label="启用" value="1"></el-option>
                                            <el-option label="禁用" value="0"></el-option>
        
                                        </el-select>
                                    </el-form-item>
                                   
                                    <el-button type="primary" v-if="!tableData" @click="onSubmit('form')" style='margin-top:40px'>提交</el-button>
                                    <el-button type="primary" v-if="tableData" @click="onEdit('form')" style='margin-top:40px'>保存</el-button>

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
                        deduct: "",
                        date_time: "",
                        status: "",
                        channel_id:""
                    },
                    time:"",
                    id:'',
                    data:"",
                    channeldata:"",
                    tableData:"",
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
                        // status: [{
                        //     required: true,
                        //     validator: "不可为空！",
                        //     trigger: 'blur'
                        // }],
                        type: [{
                            required: true,
                            message: '不可为空！',
                            trigger: 'blur'
                        }],
                    }
                }
            },
            created() {
                this.getchanneldata();
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
                getchanneldata(){
                    this.$get('channels').then((res) => {
                        if(res.code === 1){
                            this.channeldata = res.info.items;
                        }
                        // console.log(res)
                    }).catch( () => {

                    })
                },
                // 编辑进来获取表单的内容
                getformdata(){
                    this.$get('deducts/'+this.id).then((res) => {
                        if(res.code === 1){
                            this.tableData = res.info;
                            console.log(this.tableData)
                            if(this.tableData.status == 1){
                                this.tableData.status = "开启"
                            }else{
                                this.tableData.status = "关闭"
                            }
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
                            this.$post('deducts', {
                                channel_id: this.form.channel_id,
                                deduct: this.form.deduct,
                                date_time:this.form.date_time,
                                status:this.form.status
                            }).then((res) => {
                                console.log(res)
                                if(res.code === 1){
                                    this.$message({
                                        message: res.message,
                                        type: 'success'
                                    });
                                    this.$router.push("/deduct")
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
                    if(this.form.status == "开启"){
                            this.form.status = 1
                        }else{
                            this.form.status = 0
                        }
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$put('deducts/'+this.id, {
                                channel_id: this.form.channel_id,
                                deduct: this.form.deduct,
                                date_time:this.form.date_time,
                                status:this.form.status
                            }).then((res) => {
                                console.log(res)
                                if(res.code === 1){
                                    this.$message({
                                        message: res.message,
                                        type: 'success'
                                    });
                                    this.$router.push("/deduct")
                                }else{
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