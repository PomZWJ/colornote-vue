<template>
  <div v-show="showPop" class="add-note-kind-pop-container" @click.self="cancelPop">
    <div class="my-kind-pop">
      <div class="top-text">
        <span>新建笔记分类</span>
      </div>
      <div style="width: 100%">
        <span @click="showNoteKindColor" class="iconKind"  :style="{backgroundImage: 'url('+kindIconUrl+')'}"></span>
        <input v-model="newNoteKindContent" @input="getNewContent()" class="inputKind"/>
      </div>
      <div class="button_div">
        <span class="submit_span" :style="submitSpanStyle" @click="submitEvent">确定</span>
      </div>
    </div>
    <div v-show="showSelectDiv" class="note-color-select-div">
      <span @click="selectColorEvent('red')" class="color-select-span" style="background-color: rgb(251,42,45)"></span>
      <span @click="selectColorEvent('orange')" class="color-select-span" style="background-color: rgb(252,117,2)"></span>
      <span @click="selectColorEvent('yellow')" class="color-select-span" style="background-color: rgb(254,189,3)"></span>
      <span @click="selectColorEvent('green')" class="color-select-span" style="background-color: rgb(73,202,73)"></span>
      <br/>
      <span @click="selectColorEvent('peacockblue')" class="color-select-span" style="background-color: rgb(2,190,202)"></span>
      <span @click="selectColorEvent('blue')" class="color-select-span" style="background-color: rgb(0,167,237)"></span>
      <span @click="selectColorEvent('purple')" class="color-select-span" style="background-color: rgb(138,43,225)"></span>
      <span @click="selectColorEvent('indigo')" class="color-select-span" style="background-color: rgb(59,83,231)"></span>
    </div>

    <span style="display: none">{{hiddenNoteKindId}}</span>

  </div>
</template>

<script>
    import {imgBaseUrl} from '@/config/env'
    import {
        addNoteKind
    } from '@/service/getData'
    export default {
      data(){
          return{
              kindIconUrl: imgBaseUrl+'/bookmark/bookmark-red.png',
              showPop: true,
              showSelectDiv: false,
              newNoteKindContent:'',
              hiddenNoteKindId: 'bookmark-red.png',
              submitSpanStyle: {
                  color: "rgba(0, 0, 0, 0.31)"
              }
          }
      },
      methods:{
          cancelPop(){
              this.showPop = false;
              this.newNoteKindContent='';
              this.hiddenNoteKindId='bookmark-red.png';
              this.kindIconUrl=imgBaseUrl+'/bookmark/bookmark-red.png';
              this.$emit('autoClose');
          },
          async submitEvent(){
                let flag = this.newNoteKindContent;
                if(!flag.trim()==''){
                    let noteKind = await addNoteKind(this.newNoteKindContent,this.hiddenNoteKindId);
                    this.cancelPop();
                    this.$emit('autoRefresh');
                    /**
                     * 如果是添加笔记的页面，需要返回实体才能默认选中
                     */
                    this.$emit("getAddAfterEntity",noteKind);
                }
          },
          showNoteKindColor(){
              this.showSelectDiv = true;
          },
          selectColorEvent(id){
              this.showSelectDiv = false;
              this.kindIconUrl=imgBaseUrl+'/bookmark/bookmark-'+id+'.png';
              this.hiddenNoteKindId = "bookmark-"+id+".png";
          },
          getNewContent(e){
              let flag = this.newNoteKindContent;
              console.log(flag);
              if(flag.trim() == ''){
                  this.submitSpanStyle.color="rgba(0, 0, 0, 0.31)";
              }else{
                  this.submitSpanStyle.color="rgba(45, 168, 199)";
              }
          }
      }
    }
</script>

<style scoped>
  .add-note-kind-pop-container{
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.55);
  }
  .my-kind-pop{
    border: 1px solid rgba(0, 0, 0, 0.32);
    border-radius: 40px;
    width: 90%;
    height: 350px;
    top: 70%;
    left: 0;
    margin: 0 auto;
    background-color: white;
    /*transform: translate(-50%, -50%);*/
    position: relative;
    z-index: 100;
  }
  .top-text{
    margin-left: 40px;
    margin-top: 40px;
    font-size: large;
    font-weight: bolder;
  }
  .iconKind{
    width: 100px;
    height: 100px;
    display: inline-block;
    background: no-repeat 0 0;
    background-size: 1rem auto;
    margin-left: 40px;
    margin-top: 40px;
  }
  .inputKind{
    border: 0;
    outline: none;
    border-bottom: 2px solid black;
    font-size: 40px;
    display: inline-block;
    width: 70%;
    position: relative;
    top: -40px;

  }
  .button_div{

    margin-top: 30px;
    top: 0px;
    left: 0px;
    transform: translate(44%,-50%);
  }
/*  .button_div .cancel_span{
    font-size: 40px;
    color: rgb(45, 168, 199);

  }
  .button_div .su_span{
    font-size: x-large;
    margin-left: 100px;
    margin-right: 100px;
    color: rgba(0, 0, 0, 0.24);
  }*/
  .button_div .submit_span{
    font-size: 40px;
    color: rgba(0, 0, 0, 0.31);
  }
  .note-color-select-div{
    position: relative;
    background-color: white;
    width: 60%;
    margin: 0 auto;
    text-align: center;
    border: none;
    border-radius: 20px;
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 1000;
    top: 50%;
    left: 0;

  }
  .color-select-span{
    margin: 10px;
    display: inline-block;
    width: 70px;
    height: 70px;
    border-radius: 20px;
  }
</style>
