<template>
    <div class="login">
        <div class="container">
            <el-form ref="userinfo" :model="userinfo" status-icon :rules="rules">
                <el-form-item prop="username">
                    <div class="avatar">
                        <img src="../assets/vue.png" alt="">
                    </div>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input v-model="userinfo.username" placeholder="用户名" prefix-icon="myicon myicon-user" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="userinfo.password" type="pass" placeholder="密码" prefix-icon="myicon myicon-key" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('userinfo')" class="login-btn">登陆</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {postInfo} from '../api'
import {mapMutations} from 'vuex'
export default {
    data () {
        return {
            userinfo:{
                username: '',
                password: ''
            },
            rules: {
                 username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
     methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) { console.log({username:this.userinfo.username ,password:this.userinfo.password})
            postInfo('login',{username: this.userinfo.username ,password: this.userinfo.password})
            .then(res =>{
                if (res.meta.status===200){
                    console.log(res)
                    localStorage.setItem('mytoken', res.data.token)
                    this.setName(res.data.username)
                    this.$router.push('/')
                } else {
                      this.$message({
                        message: res.meta.msg,
                        type: 'error'
                        });
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      ...mapMutations(['setName'])
    }
  }
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
