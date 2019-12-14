<template>
  <div style="overflow: auto;">
    <div style="position: relative">
      <div style="width: 100%;position: fixed;bottom: 0px;top: 0px;background-color: white">
        <div class="qr-home">
          <div class="qr-bar">
            <div class="qr-icon qr-back-icon" :style="{backgroundImage: 'url('+backBtnIconUrl+')'}" @click="goBack"></div>
            <span style="font-size: 17px;margin-left: 17px;margin-top: 5px">我的微信</span>
           </div>
          <div class="content-div">
            <span class="text-span">{{textSpan}}</span>
            <br/>
            <img class="wx-qr-img" v-bind:src="myWxQrIconUrl" />
            <br/>
            <span class="text-span-wx-note">如果是微信，长按图片，其他浏览器保存图片后微信扫一扫识别</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {imgBaseUrl} from '@/config/env'
    import {
        getAllNoteKindByUserIdWithoutNull,
        deleteNoteKindByNoteKindId,
        updateNoteKindByUserId
    } from '@/service/getData'
    import loading from '@/components/loading'
    export default {
        data(){
            return{
                backBtnIconUrl: imgBaseUrl+"/back_btn.png",
                myWxQrIconUrl: imgBaseUrl+"/mywxqr.png",
                textSpan: "扫描下面二维码加我好友，拉你进群，备注进群即可"
            }
        },
        components:{
            loading
        },
        methods:{
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
  .qr-home {
    padding: 30px;
    background-color: white;

  }
  .qr-bar {
    display: flex;
    align-items: center;
    position: relative;
  }
  .qr-bar .qr-back-icon {
    background-repeat: no-repeat;
    background-size: 50px 50px;
    width: 50px;
    height: 50px;
  }
  .wx-qr-img{
    width: 700px;
    height: 700px;
  }
  .content-div{
    padding-top: 200px;
    text-align: center;

  }
  .text-span{
    font-size: 40px;
  }
  .text-span-wx-note{
    font-size: 30px;
  }
</style>
