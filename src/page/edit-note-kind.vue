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
            <div class="each_div" v-for="item in list">
              <span class="note-kind-img-span" @click="showColorSelectDivEvent($event,item.id)" :style="{backgroundImage: 'url(../../static/bookmark/'+item.iconUrl+')'}"></span>
              <input v-model="item.markText" @blur="leaveContentInput($event,item.id)" class="inputKind"/>
              <span class="note-kind-img-close" @click="deleteKindById(item.id)" :style="{backgroundImage: 'url('+closeSingleIconUrl+')'}"></span>
              <br/>
              <span class="no-div-span"></span>
              <span class="line-span" :style="{backgroundImage: 'url('+lineIconUrl+')'}"></span>
            </div>
          </div>
        </div>
      </div>
      <div v-model="bindEachDiv" v-show="showSelectDiv" class="note-color-select-div" :style="noteColorSelectDivStyle">
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
      <span>{{hideSelectedNoteKindId}}</span>
      <transition name="loading">
        <loading v-show="showLoading"></loading>
      </transition>
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
                completeBtnIconUrl: imgBaseUrl+"/complete_btn.png",
                closeSingleIconUrl: imgBaseUrl+"/close_icon.png",
                lineIconUrl: imgBaseUrl+"/line.png",
                list: '',
                showSelectDiv: false,
                noteColorSelectDivStyle:{
                    top:"0px",left:"0px"
                },
                hideSelectedNoteKindId: '',
                bindEachDiv: '',
                showLoading: false,
            }
        },
        mounted(){
            this.initData();
        },
        components:{
            loading
        },
        methods:{
            goBack() {
                this.$router.go(-1);
            },
            async submitNoteKindEvent(){
                this.showLoading = true;
                for(let i=0;i<this.list.length;i++){
                    this.$delete(this.list[i],'value');
                }
                await updateNoteKindByUserId(this.list);
                this.initData();
                this.showLoading = false;
            },
            async initData(){
                this.list = await getAllNoteKindByUserIdWithoutNull();
            },
            async deleteKindById(noteKindId){
                await deleteNoteKindByNoteKindId(noteKindId);
                this.initData();
            },
            showColorSelectDivEvent(e,noteKindId){
                this.noteColorSelectDivStyle.top = e.pageY+"px";
                this.noteColorSelectDivStyle.left = e.pageX+"px";
                this.showSelectDiv = true;
                this.hideSelectedNoteKindId = noteKindId;
                this.bindEachDiv = e.currentTarget;
            },
            selectColorEvent(id){
                this.bindEachDiv.style = "background-image:url('"+imgBaseUrl+'/bookmark/bookmark-'+id+'.png'+"'";
                this.showSelectDiv = false;
                for(let i=0;i<this.list.length;i++){
                    if(this.list[i].id == this.hideSelectedNoteKindId){
                        this.list[i].iconUrl = imgBaseUrl+"/bookmark/bookmark-"+id+".png";
                        this.list[i].newIconUrl = "bookmark-"+id+".png";
                    }
                }
            },
            leaveContentInput(e,id){
                for(let i=0;i<this.list.length;i++){
                    if(this.list[i].id == id){
                        this.list[i].markText = e.target.value;
                    }
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

  .note-color-select-div{
    position: relative;
    background-color: white;
    width: 60%;
    text-align: center;
    border: none;
    border-radius: 20px;
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 1000;
    top: 0;
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
