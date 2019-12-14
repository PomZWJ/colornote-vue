<template>
  <div v-show="showTipPopWin" class="tipop_container">
    <div class="tip_pop">
      <div>
        <span class="tip_pop_img_span" :style="{backgroundImage: 'url('+deletePopIconUrl+')'}"></span>
        <span class="delete_pop_text">错误提示</span>
      </div>
      <span class="warn_span">{{tipPopText}}</span>
      <div class="button_div">
        <span class="submit_span" @click="submitDelete">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
    import {imgBaseUrl} from '@/config/env'
    export default {
        data(){
            return{
                deletePopIconUrl: imgBaseUrl+"/error-icon.png",
                showTipPopWin: true,
                tipText: ''
            }
        },
        props: ['tipPopText'],
        methods:{
            submitDelete(){
                this.$emit('autoClose');
                this.showTipPopWin = false;
            }
        }
    }
</script>

<style scoped>
  .tipop_container{
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.55);
  }
  .tip_pop{
    background-color: white;
    background-size: 2.5rem auto;
    width: 90%;
    height: auto;
    top: 50%;
    left: 50%;
    border-radius: 40px;
    transform: translate(-50%, -50%);
    animation: load .6s infinite ease-in-out;
    position: relative;
    padding: 40px 40px 40px 40px;
    z-index: 12;

  }
  .tip_pop_img_span{
    width: 100px;
    height: 58px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
  }
  .delete_pop_text{
    font-size: large;
    font-weight: bolder;
    vertical-align: middle;
    display: inline-block;
    margin-left: 20px;
  }
  .warn_span{
    font-size: 30px;
    margin-left: 30px;
    margin-top: 100px;
    display: block;
    margin-top: 20px;
  }
  .button_div{
    position: relative;
    margin-top: 30px;
    margin-bottom: 0px;
    text-align: center;
  }
  .button_div .submit_span{
    font-size: 40px;
    color: rgb(45, 168, 199);
  }
</style>

