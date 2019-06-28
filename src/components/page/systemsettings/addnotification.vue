<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">新建通知</div>
                <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
                        <el-row :gutter="10" class="clearfix">
                            <el-col :span="12">
                                <el-form-item label="名称:" prop="projectNo">
                                <el-input v-model.trim="form.projectNo" type="text"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="描述:" prop="projectName">
                                <el-input v-model.trim="form.projectName"></el-input>
                                <span style="color:#999">U函数解析的URL</span>
                              </el-form-item>
                            </el-col>                   
                        </el-row>
                        <el-row :gutter="10" class="clearfix">
                            <el-col :span="12">
                                <el-form-item label="内容" prop="amt">
                                        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                  
                                <el-form-item label="图片" prop="memo">
                                        <el-upload
                                        class="upload-demo"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :file-list="fileList"
                                        list-type="picture">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                      </el-upload>
                              </el-form-item>
                            </el-col>
                        </el-row>               
                        <el-row :gutter="10" class="clearfix">
                            <el-col :span="12">
                                <el-form-item label="链接地址" prop="memo">
                                    <el-input v-model.trim="form.projectNo" type="text"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="产品id" prop="memo">
                                    <el-input v-model.trim="form.projectNo" type="text"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>               
                        <el-row :gutter="10" class="clearfix">
                            <el-col :span="12">
                                    <el-form-item label="可见类型" prop="expDate">
                                            <el-select v-model="form.region" placeholder="否">
                                                    <el-option label="所有人" value="shanghai"></el-option>
                                                    <el-option label="指定人" value="beijing"></el-option>
                                                </el-select>
                                  </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                    <el-form-item label="用户id" prop="memo">
                                            <el-input v-model.trim="form.memo"></el-input>
                                          </el-form-item>
                              
                            </el-col>
                        </el-row>         
                        <el-row :gutter="10" class="clearfix">
                                <el-col :span="12">
                                        <el-form-item label="是否为产品" prop="memo">
                                                <el-select v-model="form.region" placeholder="否">
                                                        <el-option label="是" value="shanghai"></el-option>
                                                        <el-option label="否" value="beijing"></el-option>
                                                    </el-select>
                                              </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                        <el-form-item label="用户id" prop="memo">
                                                <el-input v-model.trim="form.memo"></el-input>
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
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import {
        quillEditor
    } from 'vue-quill-editor';

    export default {
        name: 'addproject',
        components: {
            quillEditor
        },
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