<template>
  <div>
  <div style="position: relative">
    <div style="width: 100%;position: fixed;bottom: 0px;top: 0px;background-color: white">
      <div class="edit-home">
        <div class="edit-bar">
          <div class="eb-icon eb-back-icon" :style="{backgroundImage: 'url('+backBtnIconUrl+')'}" @click="goBack"></div>
          <span style="font-size: 17px;margin-left: 17px;margin-top: 5px">{{ebText}}</span>
          <div @click="submitNote" class="eb-icon eb-ok-icon" :style="{backgroundImage: 'url('+completeBtnIconUrl+')'}"></div>
        </div>
      </div>
      <div class="note-mask">
        <div class="nm-div-kind">
          <div class="form_select">
          <span style="display: flex;align-items:center;position:relative;width: 140px;" @click="showAccountList($event)">
            <span class="default-kind-img-span" :style="{backgroundImage: 'url('+defaultKindIconUrl+')'}"></span>
            <span style="margin-left: 34px;color: black">{{defaultKindText}}</span>
            <span style="margin-left: 10px;background-size: 100% 100%;background-image: url('../../static/arrow-down.png');display: inline-block;width: 10px;height: 7px;" :class="hasClass==='1' ? 'openlist': (hasClass==='0'?'foldlist':'')" @click="showAccountList($event)"></span>
          </span>
            <ul class="nm-kind-ul" v-if="isShowUserList">
              <li class="nm-kind-li" :class="{'selected':item.selected===true}" v-for="item in list" @click="changeUser(item)">
                <span class="nm-kind-li-img" :style="{backgroundImage: 'url('+item.iconUrl+')'}"></span>
                <span class="nm-kind-li-text">{{ item.markText }}</span>
              </li>
              <li style="text-align: center;margin-top: 10px;color: #7071ff;line-height: 30px;font-size: larger" @click="manageKind">新建</li>
            </ul>
          </div>
        </div>
        <div class="nm-div-time">
          <span style="font-size: 13px;" class="nm-div-time-span">{{currentTime}}</span>
        </div>
      </div>
      <div v-html="noteContent" @input="onDivInput($event)"  contenteditable="true" style="width: 100%;height: 75%;border: none;outline:none;background-color: white;padding: 10px;font-size: 18px;overflow: scroll;"></div>
    </div>
    <div class="foot_menu">
      <span class="foot_menu_icon" style="background-image: url('../../static/footmenu/fav_icon_foot.png')"></span>
      <span class="foot_menu_icon" style="background-image: url('../../static/footmenu/delete_icon_foot.png')"></span>
    </div>
    <span style="display: none">{{selectNoteKindText}}</span>
  </div>
  </div>
</template>

<script>
    import {imgBaseUrl} from '@/config/env'
    import {getSystemCurrentTime} from '@/service/getData'
    import {getAllNoteKindByUserId} from '@/service/getData'
    import {addUserNoteInfo} from '@/service/getData'
    export default {
        data() {
            return {
                backBtnIconUrl: imgBaseUrl+"/back_btn.png",
                completeBtnIconUrl: imgBaseUrl+"/complete_btn.png",
                defaultKindIconUrl: imgBaseUrl+'/bookmark/bookmark-black.png',
                ebText: "编辑笔记",
                defaultKindText: "未分类",
                currentTime: "",
                list: '',
                isShowUserList: false,
                hasClass: '',
                selectNoteKindText: '',
                noteContent: ''
            }
        },
        mounted () {
            this.initData();
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            showAccountList(e) {
                e.stopPropagation()
                this.isShowUserList = !this.isShowUserList
                if (this.isShowUserList) {
                    this.hasClass = '1'
                } else {
                    this.hasClass = '0'
                }
            },
            changeUser(data) {
                this.list.map(item => {
                    item.selected = false
                    if (item.id === data.id) {
                        this.defaultKindIconUrl = item.value.iconUrl;
                        this.defaultKindText = item.value.markText;
                        item.selected = true
                        this.selectNoteKindText = item.id;
                    }
                })
                this.hasClass = '0'
                this.isShowUserList = false
            },
            manageKind(){
                this.isShowUserList=false;
                this.hasClass = '0'
                alert("我是分类管理");
            },
            async submitNote(){
              //alert(this.selectNoteKindText+"==="+this.noteContent+"==="+this.currentTime);
              let flag = await addUserNoteInfo(this.selectNoteKindText,this.noteContent,this.currentTime);
              if(flag == true){
                  alert("插入成功");
                  this.$router.go(-1);
              }
            },
            onDivInput(e){
                this.noteContent = e.target.innerText;
            },
            async initData(){
                this.currentTime = await getSystemCurrentTime();
                this.list = await getAllNoteKindByUserId();
            }
        }
    }
</script>

<style scoped>
  .edit-home {
    padding: 30px;
    background-color: rgba(128, 128, 128, 0.04);
  }

  .edit-bar {

    display: flex;
    align-items: center;
    position: relative;
  }

  .edit-bar .eb-icon {
    display: inline-block;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .edit-bar .eb-back-icon {
    width: 50px;
    height: 50px;
  }

  .edit-bar .eb-ok-icon {
    width: 60px;
    height: 60px;
    position: absolute;
    right: 0;
  }
  .note-mask{
    padding: 30px;
    display: flex;
    align-items: center;
    position: relative;
    background-color: white;
  }
  .note-mask .nm-div-kind{
    display: inline-block;
  }
  .note-mask .nm-div-time{
    display: inline-block;
    position: absolute;
    right: 0;
    padding-right: 30px;
  }
  .note-mask .nm-div-time .nm-div-time-span{
    color: rgba(128, 128, 128, 0.49);
  }
  .foot_menu{
    position: fixed;
    height: 100px;
    display: flex;
    align-items: center;
    text-align: center;
    line-height: 60px;
    bottom: 0px;
    width: 100%;
    background-color: white;
  }
  .foot_menu_icon{
    margin: 0 auto;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 60px;
    height: 60px;
    display: inline-block;
  }
</style>

<!--下拉选框的样式-->
<style scoped>
  .form_select {
    height: 35px;
    display: inline-block;
    width: 150px;
    position: relative;
    color: #aeaeae;
  }
  .nm-kind-ul {
    width: 250px;
    height: auto;
    background-color: #fff;
    border: 1px solid rgba(229, 221, 204, 0.22);
    list-style: none;
    padding: 10px;
    position: absolute;
    margin-top: 20px;
  }
  .nm-kind-li {
    display: flex;
    align-items: center;
    height: 80px;
    width: 100%;
    margin-top: 20px;
    line-height: 70px;
    box-sizing: border-box;
    cursor: pointer;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
  /*li:hover {
    background-color: #e6f7ff;
    color: #737677;
  }
  li.selected {
    background-color: #e6f7ff;
    color: #737677;
  }*/
  .nm-kind-li-img{
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    width: 60px;
    height: 60px;
    display: inline-block;
    margin-left: 40px;
  }
  .nm-kind-li-text{
    margin-left: 120px;
    font-size: larger;
   }
  /* 展开： */
  .openlist {
    -webkit-animation: open 0.3s linear forwards;
    animation: open 0.3s linear forwards;
  }

  /* 收起： */
  .foldlist {
    -webkit-animation: fold 0.3s linear forwards;
    animation: fold 0.3s linear forwards;
  }

  @-webkit-keyframes open {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(180deg);
    }
  }

  @keyframes open {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }
  @-webkit-keyframes fold {
    from {
      -webkit-transform: rotate(180deg);
    }
    to {
      -webkit-transform: rotate(0deg);
    }
  }
  @keyframes fold {
    from {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  .default-kind-img-span{
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    width: 60px;
    height: 60px;
    display: inline-block;
  }
</style>
