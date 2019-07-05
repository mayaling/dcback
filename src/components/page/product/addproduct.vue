<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">新建产品</div>
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
                                                <el-input v-model.trim="form.lending_time"></el-input>
                                          </el-form-item>
                                      
                                            <el-form-item label="申请金额范围" prop="apply_price">
                                                <el-input v-model.trim="form.apply_price"></el-input>
                                            </el-form-item>
                                      
                                                <el-form-item label="申请最高价" prop="max_price">
                                                        <el-input-number v-model="form.max_price" controls-position="right" :min="1"></el-input-number>
                                                    <!-- <el-input v-model.trim="form.memo" placeholder="2000-50000"></el-input> -->
                                              </el-form-item>
                                           
                                                <el-form-item label="贷款最大周期（天）" prop="max_duration">
                                                        <el-input-number v-model="form.max_duration" controls-position="right" :min="1"></el-input-number>
            
                                                </el-form-item>
                                           
                                                    <el-form-item label="产品链接:" prop="url">
                                                    <el-input v-model.trim="form.url" type="text"></el-input>
                                                  </el-form-item>
                                           
                                                    <!-- <el-form-item label="是否必下款:" prop="projectName">
                                                        <el-select v-model="form.region" placeholder="否">
                                                            <el-option label="是" value="shanghai"></el-option>
                                                            <el-option label="否" value="beijing"></el-option>
                                                        </el-select>
                                                  </el-form-item> -->
                                             
                                                        <el-form-item label="热门:" prop="hot">
                                                                <el-select v-model="form.hot" placeholder="否">
                                                                        <el-option label="是" value="1"></el-option>
                                                                        <el-option label="否" value="0"></el-option>
                                                                    </el-select>
                                                      </el-form-item>
                                                        <el-form-item label="状态:" prop="status">
                                                                <el-select v-model="form.status" placeholder="正常">
                                                                        <el-option label="正常" value="1"></el-option>
                                                                        <el-option label="下架" value="0"></el-option>
                                                                    </el-select>
                                                      </el-form-item>
                                                            <el-form-item label="排序:" prop="sort">
                                                        <el-input-number v-model="form.sort" controls-position="right" :min="1"></el-input-number>
                                                        <span style="color:#999">数字越大越靠前,最小 0, 最大 100</span>
                                                          </el-form-item>
                                                            <el-form-item label="系统平台:" prop="projectName">
                                                                    <el-select v-model="form.platform" placeholder="正常">
                                                                            <el-option label="正常" value="shanghai"></el-option>
                                                                            <el-option label="下架" value="beijing"></el-option>
                                                                        </el-select>
                                                          </el-form-item>
                                                                <el-form-item label="用户单价:" prop="user_price">
                                                                <el-input v-model.trim="form.user_price" type="text"></el-input>
                                                              </el-form-item>
                                                                <el-form-item label="上传图片:" prop="imageList" ref="uploadElemet">
                                                                        <el-upload class="upload-demo" :on-preview="handlePreview" :on-remove="handleRemove"   :file-list="fileList" list-type="picture" :on-change="handleChange" :http-request="addAttachment"> 
                                                                        <el-button size="small" type="primary">点击上传</el-button>
                                                                      </el-upload>
                                                                      <el-input v-show="false" v-model.trim="imageurl"></el-input>
                                                                      <img v-if="imageshow" :src="form.image" alt="">
                                                              </el-form-item>
                                    <el-row :gutter="10" class="clearfix">
                                        
                                      <el-col :span="20" :offset="4">
                                        <el-button type="primary" v-if="!tableData" @click="onSubmit('form')" style='margin-top:40px'>提交</el-button>
                                        <el-button type="primary" v-if="tableData" @click="onEdit('form')" style='margin-top:40px'>保存</el-button>
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
                dialogImageUrl: '',
                dialogVisible: false,
                hideUpload: false,
                limitCount:1,
                imageList:"",
                // num1: 14,
                // num2: 50000,
                // num3: 100,
                form: {
                    name: "",
                    image: "",
                    desc: "",
                    max_price: "50000",
                    apply_price: "",
                    rate: "",
                    lending_time: "",
                    max_duration: "14",
                    url: "",
                    hot: "",
                    sort: "100",
                    status: "",
                    platform:"",
                    user_price:'',
                },
                id:"",
                tabledata:"",
                imageurl:"",
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
            this.id = this.$route.query.id
            if(this.id){
                this.getformdata();
                this.imageshow = true;
            }
        },
        computed: {

        },
        methods: {
            // 编辑进来获取表单的内容
            getformdata(){
                this.$get('products/'+this.id,).then((res) => {
                    console.log(res)
                    if(res.code===1){
                        this.tableData = res.info;
                        console.log(this.tableData)
                       if(this.tableData.status == 1){
                        this.tableData.status = "开启"
                       }else{
                        this.tableData.status = "关闭"
                       }
                       if(this.tableData.hot == 1){
                        this.tableData.hot = "是"
                       }else{
                        this.tableData.hot = "否"
                       }
                       if(this.tableData.platform == 1){
                        this.tableData.platform = "正常"
                       }else{
                        this.tableData.platform = "下架"
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
                        this.$post('products', {
                            name: this.form.name,
                            image: this.imageurl,
                            desc: this.form.desc,
                            max_price: this.form.max_price,
                            apply_price: this.form.apply_price,
                            rate: this.form.rate,
                            lending_time: this.form.lending_time,
                            max_duration: this.form.max_duration,
                            url: this.form.url,
                            hot: this.form.hot,
                            sort: this.form.sort,
                            status: this.form.status,
                        }).then((res) => {
                            console.log(res)
                            if (res.code === 1) {
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                });
                                this.$emit('closedialog');
                                // this.$router.push('/projecttable');
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
            
            onEdit(formName) {
                if(this.form.status == "开启"){
                        this.form.status = 1
                       }else{
                        this.form.status = 0
                       }
                       if(this.form.hot == "是"){
                        this.form.hot = 1
                       }else{
                        this.form.hot = 0
                       }
                       if(this.form.platform == "正常"){
                        this.form.platform = 1
                       }else{
                        this.form.platform = 0
                       }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$put('products/'+this.id, {
                            name: this.form.name,
                            image: this.imageurl,
                            desc: this.form.desc,
                            max_price: this.form.max_price,
                            apply_price: this.form.apply_price,
                            rate: this.form.rate,
                            lending_time: this.form.lending_time,
                            max_duration: this.form.max_duration,
                            url: this.form.url,
                            hot: this.form.hot,
                            sort: this.form.sort,
                            status: this.form.status,
                        }).then((res) => {
                            console.log(res)
                            if (res.code === 1) {
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                });
                                // this.$emit('closedialog');
                                // this.$router.push('/projecttable');
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
                      if(response.data.code==1){
                            this.imageurl = response.data.info.url;
                            console.log(this.imageurl)
                      }
                  })
                  .catch((response)=>{
                     this.$message.error(response.data);
                      console.log(response);
                  });                               
            },        
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            imgChange(file, fileList){
                this.hideUpload = fileList.length >= this.limitCount;
                if(fileList){
                    this.$refs['uploadElemet'].clearValidate();
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.hideUpload = fileList.length >= this.limitCount;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-1);
                this.imageshow = false;
            }
        }
    }
</script>


<style>
    .el-input-number--medium {
        width: 100%!important;
    }
    .hide .el-upload--picture-card {
        display: none;
    }
</style>