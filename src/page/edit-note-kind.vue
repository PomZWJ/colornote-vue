<template>
    <div>
      <div style="position: relative">
        <div style="width: 100%;position: fixed;bottom: 0px;top: 0px;background-color: white">
          <div class="edit-home">
            <div class="edit-bar">
              <div class="eb-icon eb-back-icon" :style="{backgroundImage: 'url('+backBtnIconUrl+')'}" @click="goBack"></div>
              <span style="font-size: 17px;margin-left: 17px;margin-top: 5px">编辑笔记分类</span>
              <div @click="submitNoteKindEvent" class="eb-icon eb-ok-icon" :style="{backgroundImage: 'url('+completeBtnIconUrl+')'}"></div>
            </div>
          </div>
          <div class="content_div">
            <div class="each_div">
              <span class="note-kind-img-span" style="background-image: url('../../static/bookmark/bookmark-black.png')"></span>
              <input v-model="newNoteKindContent" @input="getNewContent()" class="inputKind"/>
              <span class="note-kind-img-close" :style="{backgroundImage: 'url('+closeSingleIconUrl+')'}"></span>
              <br/>
              <span class="no-div-span"></span>
              <span class="line-span" :style="{backgroundImage: 'url('+lineIconUrl+')'}"></span>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
    import {imgBaseUrl} from '@/config/env'
    export default {
        data(){
            return{
                backBtnIconUrl: imgBaseUrl+"/back_btn.png",
                completeBtnIconUrl: imgBaseUrl+"/complete_btn.png",
                closeSingleIconUrl: imgBaseUrl+"/close_icon.png",
                lineIconUrl: imgBaseUrl+"/line.png",
                newNoteKindContent: ''
            }
        },
        methods:{
            goBack() {
                this.$router.go(-1);
            },
            submitNoteKindEvent(){
                alert("submit");
            },
            getNewContent(){
                let flag = this.newNoteKindContent;
                console.log(flag);
                if(flag.trim() == ''){
                    //this.submitSpanStyle.color="rgba(0, 0, 0, 0.31)";
                }else{
                    //this.submitSpanStyle.color="rgba(45, 168, 199)";
                }
            }
        }
    }
</script>

<style scoped>
  .edit-home {
    padding: 30px;
    background-color: white;
  }
  .edit-bar {
    display: flex;
    align-items: center;
    position: relative;
  }
  .edit-bar .eb-back-icon {
    background-repeat: no-repeat;
    background-size: 50px 50px;
    width: 50px;
    height: 50px;
  }
  .edit-bar .eb-ok-icon {
    background-repeat: no-repeat;
    background-size: 60px 60px;
    width: 60px;
    height: 60px;
    position: absolute;
    right: 0;
  }
  .content_div{
    overflow: auto;
    width: 100%;
    height: 100%;
    margin-top: 30px;
    background-color: white;
    padding-bottom: 30px;
  }
  .each_div{
    margin-left: 20px;
    margin-right: 20px;
  }
  .note-kind-img-span{
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 60px 60px;
    vertical-align: middle;
    width: 60px;
    height: 60px;
    right: 0;
  }
  .inputKind{

    border: 0;
    outline: none;
    font-size: 40px;
    display: inline-block;
    width: 70%;
    position: relative;
    margin-left: 20px;
    top: 5px;
  }
  .note-kind-img-close{
    display: inline-block;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 40px;
    height: 40px;
    right: 0;
    margin-left: 10%;
  }
  .line-span{
    display: inline-block;
    background-repeat: repeat-x;
    vertical-align: middle;
    width: 90%;
    height: 2px;
    right: 0;
  }
  .no-div-span{
    display: inline-block;
    vertical-align: middle;
    width: 50px;
    height: 50px;
    right: 0;
  }
</style>
