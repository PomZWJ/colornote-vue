<template>
    <div>
      <div class="back-div" :style="{backgroundImage: 'url('+loginBackImgUrl+')'}">
        <div class="title-div">
          <span class="fav-icon-span" :style="{backgroundImage: 'url('+loginIconImgUrl+')'}"></span>
          <span class="title-span">{{loginTitle}}</span>
          <br/>
          <span class="note_span">{{noteSpan}}</span>
        </div>
        <div class="login-div">
          <div>
            <input @input="monitorUserIdInput()" placeholder="手机号" class="user_id_input" v-model="userId" type="text" :style="{borderColor:userIdInputBorderColor}"/>
            <br/>
            <span class="error-text" v-show="showErrorUserIdText">{{errorUserIdText}}</span>
          </div>
          <div>
            <input @input="monitorUserPwdInput()" placeholder="验证码" v-model="userVerification" class="user_pw_input" type="text" :style="{borderColor:userPwdInputBorderColor}"/>
            <button v-bind:disabled="dis" :style="{borderColor:sendVbtnBorderColor}" class="send_verification_btn" @click="sendVerificationEvent">{{sendBtnText}}</button>
            <br/>
            <span class="error-text" v-show="showErrorUserPwdText">{{errorPwdText}}</span>
          </div>
          <div>
            <span v-bind:disabled="loginBtnDis" class="login_ok_span" @click="loginBtnEvent" :style="{backgroundImage: 'url('+loginBtnImgUrl+')'}"></span>
          </div>
          <div>
            <span class="try_account_login_span" @click="tryAccountLoginEvent">体验账户登录</span>
          </div>
        </div>
      </div>
      <transition name="loading">
        <loading v-show="showLoading"></loading>
      </transition>
      <transition name="tipPop">
        <tipPop v-if="showTipPop" @autoClose="showTipPop = false" :tipPopText="tipPopText"></tipPop>
      </transition>
    </div>
</template>

<script>
    import {imgBaseUrl,systemOkCode} from '@/config/env'
    import {userlogin,sendVerificationCode,tryAccountLogin} from '@/service/getData'
    import { setStore,getStore,removeStore } from '@/config/mUtils' // 本地存储方法封装
    import loading from '@/components/loading'
    import tipPop from '@/components/tipPop'
    export default {
        data(){
            return{
                loginBackImgUrl: imgBaseUrl+'/login_back.png',
                loginIconImgUrl: imgBaseUrl+'/fav2.png',
                loginBtnImgUrl: imgBaseUrl+"/login_ok.png",
                loginTitle: '彩色笔记',
                noteSpan: '记录生活点滴',
                sendBtnText: '发送验证码',
                userId: '',
                userVerification: '',
                userIdInputBorderColor:"rgba(0, 0, 0, 0.42)",
                errorUserIdText: '手机号码非法',
                errorPwdText: '验证码不是六位数字',
                showErrorUserIdText: false,
                showErrorUserPwdText: false,
                sendVbtnBorderColor:"rgba(0, 0, 0, 0.42)",
                totalTime: 10,      //记录具体倒计时时间
                dis: false,
                userPwdInputBorderColor: "rgba(0, 0, 0, 0.42)",
                loginBtnDis:true,
                showLoading: false,
                showTipPop: false,
                tipPopText: ''
            }
        },
        components:{
            loading,tipPop
        },
        methods:{
            async sendVerificationEvent(){
                if(this.monitorPhoneUtils()){
                    let flag = await sendVerificationCode(this.userId);
                    this.dis = true;
                    this.sendVbtnBorderColor = "rgba(0, 0, 0, 0.42)";
                    let clock = window.setInterval(() => {

                        this.sendBtnText = this.totalTime + 's后重发';
                        this.totalTime--;
                        if(this.totalTime < 0){
                            this.dis = false;
                            window.clearInterval(clock);
                            this.totalTime = 10;
                            this.sendVbtnBorderColor = "rgba(93, 193, 252, 0.99)";
                            this.sendBtnText='发送验证码';
                        }
                    },1000);
                }else{

                }

            },
            async loginBtnEvent(){
                //this.showLoading = true;
                this.loginBtnDis = false;
                //console.log("123");
                let a = this.monitorPhoneUtils();
                let b = this.monitorUserPwdInput();
                if(a&&b){
                    this.showLoading = true;
                    let data = await userlogin(this.userId,this.userVerification);
                    this.showLoading = false;
                    if(data.resultCode!=systemOkCode){
                        this.tipPopText = data.resultMsg;
                        this.showTipPop = true;
                        return;
                    }
                    let params = data.params;
                    this.loginBtnDis = true;

                    setStore("userId",params.userId);
                    setStore("token",params.token);
                    this.$router.push({
                        path: '/',
                        query: {
                        }
                    });
                }else{
                    return ;
                }

            },
            monitorUserIdInput(){
                this.monitorPhoneUtils();
            },
            monitorPhoneUtils(){
                let phoneReg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
                if(phoneReg.test(this.userId)){
                    this.showErrorUserIdText = false;
                    this.userIdInputBorderColor= "rgba(0, 0, 0, 0.42)";
                    this.sendVbtnBorderColor = "rgba(93, 193, 252, 0.99)";
                    return true;
                }else{
                    this.showErrorUserIdText = true;
                    this.userIdInputBorderColor= "rgba(255, 0, 0, 0.42)";
                    this.sendVbtnBorderColor = "rgba(0, 0, 0, 0.42)";
                    return false;
                }
            },
            monitorUserPwdInput(){
                let verificationReg = /^\d{6}$/;
                if(verificationReg.test(this.userVerification)){
                    this.userPwdInputBorderColor= "rgba(0, 0, 0, 0.42)";
                    this.showErrorUserPwdText = false;
                    return true;
                }else{
                    this.userPwdInputBorderColor= "rgba(255, 0, 0, 0.42)";
                    this.showErrorUserPwdText = true;
                    return false;
                }
            },
            async tryAccountLoginEvent(){
                let data = await tryAccountLogin();
                let params = data.params;
                this.loginBtnDis = true;
                setStore("userId",params.userId);
                setStore("token",params.token);
                this.$router.push({
                    path: '/',
                    query: {
                    }
                });
            }
        }
    }
</script>

<style scoped>
  .back-div{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  }
  .title-div{
    margin-top: 150px;
    margin-left: 30px;
  }
  .fav-icon-span{
    display: inline-block;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 200px;
    height: 200px;
    vertical-align: middle;
  }
  .title-span{
    display:inline-block;
    vertical-align: middle;
    font-size: 70px;
    margin-top: 20px;
  }
  .note_span{
    margin-left: 30px;
    font-size: 25px;
  }
  .login-div{
    margin: 150px 100px 0px 100px;
  }
  .user_id_input{
    width: 100%;
    font-size: larger;
    padding-left: 30px;
    outline: none;
    height: 100px;
    border-radius: 50px;
    border: 2px solid rgba(0, 0, 0, 0.42);
  }
  .user_pw_input{
    width: 60%;
    outline: none;
    font-size: larger;
    padding-left: 30px;
    margin-top: 50px;
    height: 100px;
    border-radius: 50px;
    border: 2px solid rgba(0, 0, 0, 0.42);
  }
  .login_ok_span{
    display:inline-block;
    width: 100px;
    height: 100px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    left: 50%;
    margin-left: -50px;
    margin-top: 100px;
  }
  .send_verification_btn{
    width: 38%;
    font-size: larger;
    outline: none;
    height: 100px;
    border-radius: 50px;
    border: 2px solid rgba(93, 193, 252, 0.99);
    background-color: white;
  }
  .error-text{
    display: inline-block;
    color: red;
    margin-top: 10px;
    margin-left: 20px;
  }
  .try_account_login_span{
    display:inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    text-decoration: underline;
    margin-top: 30px;

  }
</style>
