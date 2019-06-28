<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">新建菜单</div>
            <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
                    <el-row :gutter="10" class="clearfix">
                        <el-col :span="12">
                            <el-form-item label="标题:" prop="projectNo">
                            <el-input v-model.trim="form.projectNo" type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="链接:" prop="projectName">
                            <el-input v-model.trim="form.projectName"></el-input>
                            <span style="color:#999">U函数解析的URL</span>
                          </el-form-item>
                        </el-col>                   
                    </el-row>
                    <el-row :gutter="10" class="clearfix">
                        <el-col :span="12">
                            <el-form-item label="上级菜单" prop="amt">
                                <el-select v-model="form.region" placeholder="否">
                                    <el-option label="是" value="shanghai"></el-option>
                                    <el-option label="否" value="beijing"></el-option>
                                </el-select>
                            <span style="color:#999">所属的上级菜单</span>

                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="分组" prop="memo">
                            <el-input v-model.trim="form.memo"></el-input>
                            <span style="color:#999">菜单分组</span>

                          </el-form-item>
                        </el-col>
                    </el-row>               
                    <el-row :gutter="10" class="clearfix">
                        <el-col :span="12">
                                <el-form-item label="是否隐藏" prop="startDate">
                                        <el-radio-group v-model="radio1">
                                                <el-radio :label="3">是</el-radio>
                                                <el-radio :label="6">否</el-radio>
                                              </el-radio-group>
                              </el-form-item>
                            
                        </el-col>
                        <el-col :span="12">
                                <el-form-item label="排序" prop="amt">
                                        <el-select v-model="form.region" placeholder="否">
                                            <el-option label="是" value="shanghai"></el-option>
                                            <el-option label="否" value="beijing"></el-option>
                                        </el-select>
                                    <span style="color:#999">用于分组显示的排序</span>
        
                                  </el-form-item>
                          
                        </el-col>
                    </el-row>               
                    <el-row :gutter="10" class="clearfix">
                        <el-col :span="12">
                                <el-form-item label="是否显示" prop="expDate">
                                        <el-radio-group v-model="radio2">
                                                <el-radio :label="3">全部显示</el-radio>
                                                <el-radio :label="6">开发者不显示</el-radio>
                                                <el-radio :label="9">代理不显示</el-radio>
    
                                              </el-radio-group>
                              </el-form-item>
                        </el-col>
                        <el-col :span="12">
                                <el-form-item label="说明" prop="memo">
                                        <el-input v-model.trim="form.memo"></el-input>
                                        <span style="color:#999">菜单详细说明</span>
            
                                      </el-form-item>
                          
                        </el-col>
                    </el-row>               
                    <el-row :gutter="10" class="clearfix">
                      <el-col :span="20" :offset="4">
                        <el-button type="primary" @click="onSubmit('form')" style='margin-top:40px'>保存</el-button>
                        <!-- <route-link :to="{path:'menumanagement'}"><el-button>取消</el-button></route-link> -->
                        <router-link :to="{path:'menumanagement'}"><el-button type="primary">取消</el-button></router-link>
                       
                      </el-col>
                    </el-row>
                    </el-form>
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
                radio1: 3,
                radio2: 6,
                form: {
                    projectNo: "",
                    projectName: "",
                    startDate: "",
                    expDate: "",
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
                        validator: amtRule,
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
                        this.$post('projects', {
                            projectNo: this.form.projectNo,
                            projectName: this.form.projectName,
                            startDate: this.form.startDate,
                            expDate: this.form.expDate,
                            amt: this.form.amt,
                            memo: this.form.memo,
                        }).then((res) => {
                            if (res.code === 0) {
                                this.$message({
                                    message: res.msg,
                                    type: 'success'
                                });
                                this.$emit('closedialog');
                                // this.$router.push('/projecttable');
                            } else {
                                this.$message.error(res.msg);
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