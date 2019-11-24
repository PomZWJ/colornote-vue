<template>
  <div v-show="showDeletePopWin" class="delete_container" @click.self="cancelDeletePop">
    <div class="delete_pop">
      <div>
        <span class="delete_pop_img_span" :style="{backgroundImage: 'url('+deletePopIconUrl+')'}"></span>
        <span class="delete_pop_text">警告</span>
      </div>
      <span class="warn_span">此笔记将从云空间删除。是否删除?</span>
      <div class="button_div">
        <span class="cancel_span" @click="cancelDeletePop">取消</span>
        <span class="su_span">|</span>
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
                deletePopIconUrl: imgBaseUrl+"/warn_icon.png",
                showDeletePopWin: true,
            }
        },
        methods:{
            cancelDeletePop(){
                this.showDeletePopWin = false;
                this.$emit('autoClose');
            },
            submitDelete(){
                this.showDeletePopWin = false;
                this.$emit('deleteOk');
            }
        }
    }
</script>

<style scoped>
  .delete_container{
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.55);
  }
  .delete_pop{
    background-color: white;
    background-size: 2.5rem auto;
    width: 90%;
    height: 350px;
    top: 85%;
    left: 50%;
    border-radius: 40px;
    transform: translate(-50%, -50%);
    animation: load .6s infinite ease-in-out;
    position: relative;
    padding: 40px 40px 10px 40px;
    z-index: 12;

  }
  .delete_pop_img_span{
    width: 100px;
    height: 100px;
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
    margin-top: 20px;
    top: 0px;
    left: 0px;
    transform: translate(19%,20%);
  }
  .button_div .cancel_span{
    font-size: 40px;
    color: rgb(45, 168, 199);
  }
  .button_div .su_span{
    font-size: x-large;
    margin-left: 100px;
    margin-right: 100px;
    color: rgba(0, 0, 0, 0.24);
  }
  .button_div .submit_span{
    font-size: 40px;
    color: rgb(45, 168, 199);
  }
</style>

