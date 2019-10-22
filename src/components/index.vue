<template>
  <div>
    <div class="home">
      <div style="display: flex;align-items: center;position: relative">
        <img v-bind:src="menuIconUrl" @click="show=!show" style="width: 30px;height: 30px"/>
        <span style="font-size: 20px;margin-left: 10px">全部笔记</span>
        <img v-bind:src="searchIconUrl" @click="showItemMenu=!showItemMenu" style="width: 20px;height: 20px;position: absolute;right: 10px;"/>
      </div>
      <div class="cn-item-body">
        <div class="cn-item-li">
          <div class="cn-item-main" style="border:1px solid rgba(25,137,250,0.26);">
            <div class="cn-item-text">
              <span style="font-size: 18px">闽南师范大学--www.mnnu.com</span>
            </div>
            <div class="cn-item-time">
              <span style="font-size: larger;color: #bdbdbd">2019-10-22 14:14:20</span>
            </div>
          </div>
          <div class="cn-item-mask"></div>
          <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="cn-item-menu" style="border:1px solid rgba(25,137,250,0.26);" v-if="showItemMenu">
              <img class="i-icon" v-bind:src="copyIconUrl" @click="show=!show"/>
              <img class="i-icon" style="margin-left: 50px" v-bind:src="favYesOrNoIconUrl" @click="show=!show"/>
              <img class="i-icon" style="margin-left: 50px" v-bind:src="deleteIconUrl" @click="show=!show"/>
            </div>
          </transition>
        </div>
      </div>


      <div class="cn-item-body">
        <div class="cn-item-li">
          <div class="cn-item-main" style="border:1px solid rgba(25,137,250,0.26);">
            <div class="cn-item-text">
              <span style="font-size: 18px">闽南师范大学--www.mnnu.com</span>
            </div>
            <div class="cn-item-time">
              <span style="font-size: larger;color: #bdbdbd">2019-10-22 14:14:20</span>
            </div>
          </div>
          <div class="cn-item-mask"></div>
          <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="cn-item-menu" style="border:1px solid rgba(25,137,250,0.26);" v-if="showItemMenu">
              <img class="i-icon" v-bind:src="copyIconUrl" @click="show=!show"/>
              <img class="i-icon" style="margin-left: 50px" v-bind:src="favYesOrNoIconUrl" @click="show=!show"/>
              <img class="i-icon" style="margin-left: 50px" v-bind:src="deleteIconUrl" @click="show=!show"/>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <transition mode="out-in" enter-active-class="animated zoomIn" leave-active-class="animated zoomOutDown">
      <div class="popup" v-if="show" :style="popupStyle">
        <img v-bind:src="closeIconUrl" style="position: absolute;width: 15px;height: 15px;top: 20px;right: 20px;" @click="cancelPopWin">
        <div class="popup-left">
          <div style="margin-left:-10px;margin-top: 20px;text-align: center">
            <img v-bind:src="iconUrl" style="width: 50px;height: 50px"/>
            <div>
              <span style="font-weight: bolder;font-size: x-large;">色彩笔记</span>
            </div>
          </div>
          <div style="margin-left:-10px;padding-left: 30px;background-color: white">
            <div class="line-box">
              <img class="line-icon" v-bind:src="noteIconUrl">
              <span class="line-text">{{allNoteText}}</span>
              <span class="line-num">{{allNoteNum}}</span>
            </div>
            <div class="line-box">
              <img class="line-icon" v-bind:src="favIconUrl">
              <span class="line-text">{{favoriteText}}</span>
              <span class="line-num">{{favoriteNum}}</span>
            </div>
            <div class="line-box">
              <img class="line-icon" v-bind:src="rubbishIconUrl">
              <span class="line-text">{{rubbishText}}</span>
              <span class="line-num">{{rubbishNum}}</span>
            </div>
            <!--分类-->
            <div class="line-box" style="margin-top: 30px;">
              <span class="line-text" style="font-size: 16px;color: gray;line-height: 40px;margin: 0;">笔记分类</span>
              <img class="line-icon" style="position: absolute;right:20px;" v-bind:src="editMarkIconUrl">
            </div>
            <div v-for="site in sites">
              <div class="line-box">
                <img class="line-icon" v-bind:src="site.iconUrl">
                <span class="line-text">{{site.markText}}</span>
                <span class="line-num">{{site.markNum}}</span>
              </div>
            </div>
            <div class="line-box" style="padding-bottom: 30px;background-color: white">
              <img class="line-icon" v-bind:src="setIconUrl">
              <span class="line-text">设置</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                iconUrl: "../../static/logo.ico",
                noteIconUrl: "../../static/note.png",
                favIconUrl: "../../static/fav.png",
                rubbishIconUrl: "../../static/rubbish.png",
                closeIconUrl: "../../static/close_icon.png",
                editMarkIconUrl: "../../static/edit-bookmark.png",
                setIconUrl: "../../static/set_icon.png",
                menuIconUrl: "../../static/menu_icon.png",
                searchIconUrl: "../../static/search_icon.png",
                copyIconUrl: "../../static/copy_icon.png",
                favYesOrNoIconUrl: "../../static/fav_no.png",
                deleteIconUrl: "../../static/delete_icon.png",
                allNoteNum: 0,
                favoriteNum: 0,
                rubbishNum: 0,
                allNoteText: "全部笔记",
                favoriteText: "我的收藏",
                rubbishText: "最近删除",
                show: false,
                showItemMenu: false,
                popupStyle: {},
                sites: [
                    { iconUrl: '../../static/bookmark/bookmark-blue.png',markText:'个人',markNum:'0' },
                    { iconUrl: '../../static/bookmark/bookmark-green.png',markText:'生活',markNum:'0' },
                    { iconUrl: '../../static/bookmark/bookmark-red.png',markText:'工作',markNum:'0' },
                    { iconUrl: '../../static/bookmark/bookmark-yellow.png',markText:'旅游',markNum:'0' }
                ]
            }
        },
        methods: {
            //取消弹窗
            cancelPopWin() {
                if (this.show) {
                    this.show = false;
                }

            },
            cancelItemMenu(){
                if(this.showItemMenu){
                    this.showItemMenu=false;
                }
            }
        }
    }
</script>
<style scoped>
  .home {
    width: 100%;
    height: 100%;
    position: fixed;
    padding: 30px;
    /*background-color: white;*/
  }

  .popup {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0);
    overflow: auto;
  }

  .popup-left {
    width: 100%;
    height: 100%;
    float: left;
    background-color: white;
  }


  .line-box {
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 60px;
  }

  .line-box .line-icon {
    width: 50px;
    height: 50px;
  }

  .line-box .line-text {
    font-weight: bolder;
    font-size: large;
    margin-left: 30px
  }

  .line-box .line-num {
    position: absolute;
    font-size: large;
    right: 50px;
  }

  .cn-item-body{
    margin-top: 50px
  }
  .cn-item-li{
    position: relative;
  }
  .cn-item-main{
    border-radius: 15px;
    padding: 20px;


  }
  .cn-item-text{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .cn-item-time{

  }
  .cn-item-mask{
    background-color: blue;
    position: absolute;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    background-color: rgba(221,217,213,0);
  }
  .cn-item-menu{
    border:1px solid rgba(25,137,250,0.26);
    border-radius: 10px;
    position: absolute;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    background-color: rgba(255,255,255,0.81);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cn-item-menu .i-icon{
    width: 100px;
    height: 100px;
  }

</style>



