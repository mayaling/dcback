<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">新建产品</div>
                <!-- <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
                        <el-row :gutter="10" class="clearfix">
                            <el-col :span="12">
                                <el-form-item label="产品名称:" prop="projectNo">
                                <el-input v-model.trim="form.projectNo" type="text"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="描述:" prop="projectName">
                                <el-input v-model.trim="form.projectName"></el-input>
                              </el-form-item>
                            </el-col>                   
                        </el-row>
                        <el-row :gutter="10" class="clearfix">
                            <el-col :span="12">
                                <el-form-item label="日利率" prop="amt">
                                <el-input v-model.trim="form.amt" placeholder="例如0.03%"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="申请人数" prop="memo">
                                <el-input v-model.trim="form.memo"></el-input>
                              </el-form-item>
                            </el-col>
                        </el-row>               
                        <el-row :gutter="10" class="clearfix">
                            <el-col :span="12">
                                <el-form-item label="放款时长" prop="startDate">
                                    <el-input v-model.trim="form.memo" placeholder="2000-50000"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="申请金额范围" prop="startDate">
                                    <el-input v-model.trim="form.memo"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>               
                        <el-row :gutter="10" class="clearfix">
                                <el-col :span="12">
                                    <el-form-item label="申请最高价" prop="startDate">
                                            <el-input-number v-model="num2" controls-position="right" :min="1"></el-input-number>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="贷款最大周期（天）" prop="startDate">
                                            <el-input-number v-model="num1" controls-position="right" :min="1"></el-input-number>

                                    </el-form-item>
                                </el-col>
                            </el-row>     
                            <el-row :gutter="10" class="clearfix">
                                    <el-col :span="12">
                                        <el-form-item label="产品链接:" prop="projectNo">
                                        <el-input v-model.trim="form.projectNo" type="text"></el-input>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="是否必下款:" prop="projectName">
                                            <el-select v-model="form.region" placeholder="否">
                                                <el-option label="是" value="shanghai"></el-option>
                                                <el-option label="否" value="beijing"></el-option>
                                            </el-select>
                                      </el-form-item>
                                    </el-col>                   
                                </el-row>
                                <el-row :gutter="10" class="clearfix">
                                        <el-col :span="12">
                                            <el-form-item label="热门:" prop="projectNo">
                                                    <el-select v-model="form.region" placeholder="否">
                                                            <el-option label="是" value="shanghai"></el-option>
                                                            <el-option label="否" value="beijing"></el-option>
                                                        </el-select>
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="状态:" prop="projectName">
                                                    <el-select v-model="form.region" placeholder="正常">
                                                            <el-option label="正常" value="shanghai"></el-option>
                                                            <el-option label="下架" value="beijing"></el-option>
                                                        </el-select>
                                          </el-form-item>
                                        </el-col>                   
                                    </el-row>
                                    <el-row :gutter="10" class="clearfix">
                                            <el-col :span="12">
                                                <el-form-item label="排序:" prop="projectNo">
                                            <el-input-number v-model="num3" controls-position="right" :min="1"></el-input-number>
                                            <span style="color:#999">数字越大越靠前,最小 0, 最大 100</span>
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="系统平台:" prop="projectName">
                                                        <el-select v-model="form.region" placeholder="正常">
                                                                <el-option label="正常" value="shanghai"></el-option>
                                                                <el-option label="下架" value="beijing"></el-option>
                                                            </el-select>
                                              </el-form-item>
                                            </el-col>                   
                                        </el-row>    
                                        <el-row :gutter="10" class="clearfix">
                                                <el-col :span="12">
                                                    <el-form-item label="用户单价:" prop="projectNo">
                                                    <el-input v-model.trim="form.projectNo" type="text"></el-input>
                                                  </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item label="上传图片:" prop="projectName">
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
                            
                          <el-col :span="20" :offset="4">
                            <el-button type="primary" @click="onSubmit('form')" style='margin-top:40px'>保存</el-button>
                            <el-button @click="resetForm('form')">重置</el-button>
                          </el-col>
                        </el-row>
                </el-form> -->

                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="6">
                            <el-form :model="form" ref="form" :rules="rules" class="item-add-list" :data="tableData">
                                            <el-form-item label="产品名称:" prop="name">
                                            <el-input v-model.trim="form.name" type="text"></el-input>
                                          </el-form-item>
                                    
                                            <el-form-item label="描述:" prop="desc">
                                            <el-input v-model.trim="form.desc"></el-input>
                                          </el-form-item>
                                    
                                      
                                            <el-form-item label="日利率" prop="rate">
                                            <el-input v-model.trim="form.rate" placeholder="例如0.03%"></el-input>
                                          </el-form-item>
                                   
                                            <el-form-item label="申请人数" prop="apply_num">
                                            <el-input v-model.trim="form.apply_num"></el-input>
                                          </el-form-item>
                                     
                              
                                            <el-form-item label="放款时长" prop="lending_time">
                                                <el-input v-model.trim="form.lending_time" placeholder="2000-50000"></el-input>
                                          </el-form-item>
                                      
                                            <el-form-item label="申请金额范围" prop="startDate">
                                                <el-input v-model.trim="form.memo"></el-input>
                                            </el-form-item>
                                      
                                                <el-form-item label="申请最高价" prop="startDate">
                                                        <el-input-number v-model="num2" controls-position="right" :min="1"></el-input-number>
                                                    <!-- <el-input v-model.trim="form.memo" placeholder="2000-50000"></el-input> -->
                                              </el-form-item>
                                           
                                                <el-form-item label="贷款最大周期（天）" prop="startDate">
                                                        <el-input-number v-model="num1" controls-position="right" :min="1"></el-input-number>
            
                                                </el-form-item>
                                           
                                                    <el-form-item label="产品链接:" prop="projectNo">
                                                    <el-input v-model.trim="form.projectNo" type="text"></el-input>
                                                  </el-form-item>
                                           
                                                    <el-form-item label="是否必下款:" prop="projectName">
                                                        <el-select v-model="form.region" placeholder="否">
                                                            <el-option label="是" value="shanghai"></el-option>
                                                            <el-option label="否" value="beijing"></el-option>
                                                        </el-select>
                                                  </el-form-item>
                                             
                                                        <el-form-item label="热门:" prop="projectNo">
                                                                <el-select v-model="form.region" placeholder="否">
                                                                        <el-option label="是" value="shanghai"></el-option>
                                                                        <el-option label="否" value="beijing"></el-option>
                                                                    </el-select>
                                                      </el-form-item>
                                                        <el-form-item label="状态:" prop="projectName">
                                                                <el-select v-model="form.region" placeholder="正常">
                                                                        <el-option label="正常" value="shanghai"></el-option>
                                                                        <el-option label="下架" value="beijing"></el-option>
                                                                    </el-select>
                                                      </el-form-item>
                                                            <el-form-item label="排序:" prop="projectNo">
                                                        <el-input-number v-model="num3" controls-position="right" :min="1"></el-input-number>
                                                        <span style="color:#999">数字越大越靠前,最小 0, 最大 100</span>
                                                          </el-form-item>
                                                            <el-form-item label="系统平台:" prop="projectName">
                                                                    <el-select v-model="form.region" placeholder="正常">
                                                                            <el-option label="正常" value="shanghai"></el-option>
                                                                            <el-option label="下架" value="beijing"></el-option>
                                                                        </el-select>
                                                          </el-form-item>
                                                                <el-form-item label="用户单价:" prop="projectNo">
                                                                <el-input v-model.trim="form.projectNo" type="text"></el-input>
                                                              </el-form-item>
                                                                <el-form-item label="上传图片:">
                                                                        <el-upload class="upload-demo" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"  list-type="picture" :http-request="addAttachment"> 
                                                                        <el-button size="small" type="primary">点击上传</el-button>
                                                                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                                                      </el-upload>
                                                              </el-form-item>
                                    <el-row :gutter="10" class="clearfix">
                                        
                                      <el-col :span="20" :offset="4">
                                        <el-button type="primary" @click="onSubmit('form')" style='margin-top:40px'>保存</el-button>
                                        <el-button @click="resetForm('form')">重置</el-button>
                                      </el-col>
                                    </el-row>
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
                num1: 14,
                num2: 50000,
                num3: 100,
                form: {
                    projectNo: "",
                    projectName: "",
                    startDate: "",
                    expDate: "",
                    amt: "",
                    memo: "",
                },
                tabledata:"",
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
            this.tabledata = this.$route.query.row;
            console.log(this.tabledata)
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
            // 自定义上传方法
             addAttachment ( file ) {
                // 用于显示图片
                this.imageUrl = URL.createObjectURL(file.file);
                //保存一份文件信息，用于上传
                this.fileData = file.file;
                console.log( this.fileData)
                var formData = new FormData();  
                formData.append("file", this.fileData);
                axios({
                    method: 'post',
                    url: 'http://47.103.61.179:82/upload-to-aliyun_oss?type=product',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' , 'Authorization': 'Bearer ' + localStorage.getItem('token')}}
                  })
                  .then((response)=>{
                      console.log(response)
                    //   if(response.data.code==0){
                    //     this.$message.success(`修改第 ${this.idx+1} 行成功`);
                    //     this.getData()
                    //   }
                  })
                  .catch((response)=>{
                     this.$message.error(response.data);
                      console.log(response);
                  });                               
            },        
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>


<style>
    .el-input-number--medium {
        width: 100%!important;
    }
</style>