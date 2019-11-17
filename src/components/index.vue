<template>
  <div>
    <!--主页-->
    <div class="home" style="overflow:visible" >
      <!--app bar start-->
      <div style="display: flex;align-items: center;position: relative">
        <!--菜单图标-->
        <img v-bind:src="menuIconUrl" @click="show=!show" style="width: 30px;height: 30px"/>
        <!--bar title-->
        <span style="font-size: 20px;margin-left: 10px">全部笔记</span>
        <!--搜索图标-->
        <img   v-bind:src="searchIconUrl" style="width: 30px;height: 30px;position: absolute;right: 10px;"/>
      </div>
      <div>
      <!--笔记条目(使用v-for循环)-->
      <div v-for="(site,index) in bookNotes" :key="index">
        <div class="cn-item-body" @touchstart="showDeleteButton(index)" @touchend="emptyTime">
          <div class="cn-item-li">
            <div class="cn-item-main" style="border:1px solid rgba(25,137,250,0.26);">
              <div class="cn-item-text">
                <span style="font-size: 18px">{{site.noteContent}}</span>
              </div>
              <div class="cn-item-time">
                <span style="font-size: larger;color: #bdbdbd">{{site.noteTime}}</span>
              </div>
            </div>
            <!--给文字加上一层遮罩(防止文字被选择)-->
            <div class="cn-item-mask" @click="labelDetails(site.noteId)"></div>
            <!--每个条目的菜单栏(长按item弹出)-->
            <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <div class="cn-item-menu" @click="cancelItemMenu" style="border:1px solid rgba(25,137,250,0.26);" v-if="showItemMenu == index">
                <!--复制图标-->
                <span class="i-icon" :style="{backgroundImage: 'url('+copyIconUrl+')'}" @click.stop="copyEvent"></span>
                <!--收藏图标-->
                <span class="i-icon" :style="{backgroundImage: 'url('+favYesOrNoIconUrl+')',marginLeft: '50px'}" @click.stop="favEvent"></span>
                <!--删除图标-->
                <span class="i-icon" :style="{backgroundImage: 'url('+deleteIconUrl+')',marginLeft: '50px'}" @click.stop="deleteEvent"></span>
              </div>
            </transition>
          </div>
        </div>
      </div>
      </div>

      <!--新增按钮和回到顶部按钮-->
      <div class="footer">
        <div class="goTopBtn" v-if="goTop" @click="toTop"></div>
        <div class="addNoteBtn" @click="handleRouterToAddNote"></div>
      </div>
    </div>
    <!--主菜单页-->
    <transition mode="out-in" enter-active-class="animated zoomIn" leave-active-class="animated zoomOutDown">
      <div class="popup" v-if="show" :style="popupStyle">
        <img v-bind:src="closeIconUrl" style="position: absolute;width: 15px;height: 15px;top: 20px;right: 20px;" @click="cancelPopWin">
        <div class="popup-left">
          <div style="margin-left:-10px;margin-top: 20px;text-align: center">
            <img v-bind:src="userIconLogo" style="width: 50px;height: 50px"/>
            <div>
              <span style="font-weight: bolder;font-size: large;">{{userIdText}}</span>
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
    import {imgBaseUrl} from 'src/config/env'
    import {getD1} from 'src/service/getData'
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
                goTopIconUrl: "../../static/go_top_icon.png",
                userIconLogo: "../../static/user-logo.png",
                allNoteNum: 0,
                favoriteNum: 0,
                rubbishNum: 0,
                allNoteText: "全部笔记",
                favoriteText: "我的收藏",
                rubbishText: "最近删除",
                userIdText: '色彩笔记',
                show: false,
                showItemMenu: -1,// -1代表都不显示
                popupStyle: {},
                sites: "",
                bookNotes: "",
                timeOutEvent: 0,
                Loop: null,
                goTop:false
            }
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll,true);
        },
        created(){
            let _this = this;
            this.$axios({
                method:'post',
                url:'http://vzdn.natapp1.cc/ColorNote/user/getCurrentLoginUserInfo',
                data:this.qs.stringify({
                    userId:'912094062@qq.com',
                    token:'P+K09nlcpw+US3gt/4Od2JApnyw2lYz1r7OUh8WbPnkK63JGhkmWGfMF8NPFl5iXAnO7hRIVR1O6C86DWiBjseAROZWRb3xmfuNIK/R4GK68LgPQJ3qxXQ+hGnXbs8no1jv1H/RB+Rk/QcISVEw1CR4XOPCrNzVZQ/VTQu2dUGMan9QlLLaam/Cfhs2Zx5xwzt7UqhhEzKF6T2NVu+XBzYHesV1cQ8LgqRTeQlIekm3rZVfbkjWX3bE6MqzpFqEh2SB+kLM8cDuCNzgIWp5BkoHivAUXK9SkMxMJkyRShkXbZvJbtu7DDIH8dtj+6bfTj7C9TFEcZWBFN8oZl/1YcA=='
                }),
            }).then((response)=>{
                let data = response.data;
                if(data.resultCode!='000000'){
                    alert(data.resultMsg);
                }else{
                    let user = data.params.user;
                    this.userIdText = user.userName;
                }
            }).catch((error)=>{
                alert(error);
            });

            this.$axios({
                method:'post',
                url:'http://vzdn.natapp1.cc/ColorNote/user/getUserIndexInfo',
                data:this.qs.stringify({
                    userId:'912094062@qq.com'
                }),
            }).then((response)=>{
                let data = response.data;
                if(data.resultCode!='000000'){
                    alert(data.resultMsg);
                }else{
                    let params = data.params;
                    _this.allNoteNum = params.allNote;
                    _this.favoriteNum = params.myFav;
                    _this.rubbishNum = params.nearDel;
                    //console.log(noteKinds);
                    _this.sites = params.noteKind;

                }
            }).catch((error)=>{
                alert(error);
            });


            this.$axios({
                method:'post',
                url:'http://vzdn.natapp1.cc/ColorNote/note/getAllNoteInfo',
                data:this.qs.stringify({
                    userId:'912094062@qq.com'
                }),
            }).then((response)=>{
                let data = response.data;
                if(data.resultCode!='000000'){
                    alert(data.resultMsg);
                }else{
                    _this.bookNotes = data.params;

                }
            }).catch((error)=>{
                alert(error);
            });


        },
        methods: {
            //取消弹窗
            cancelPopWin() {
                if (this.show) {
                    this.show = false;
                }

            },
            cancelItemMenu() {
                this.showItemMenu = -1;
            },
            copyEvent() {
                alert("copy");
            },
            favEvent() {
                alert("fav");
            },
            deleteEvent() {
                alert("delete");
            },
            showDeleteButton(index) {
                clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
                this.Loop = setTimeout(function () {
                    this.showItemMenu = index;
                }.bind(this),700);
            },
            //清空
            emptyTime: function () {
                clearTimeout(this.Loop); //清空定时器，防止重复注册定时器
            },
            labelDetails(id) {
                //看看是不是子项菜单出现,出现的话就先隐藏菜单
                if(this.showItemMenu != -1){
                    this.showItemMenu = -1;
                    return;
                }
                alert(id);
            },
            handleScroll() {
                let scrollTop = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
                if(scrollTop>100){
                    this.goTop = true
                }else{
                    this.goTop = false
                }
            },
            toTop() {

                let top = document.documentElement.scrollTop || document.body.scrollTop;
                // 实现滚动效果
                const timeTop = setInterval(() => {
                    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                    if (top <= 0) {
                        clearInterval(timeTop);
                    }
                }, 10);
            },
            handleRouterToAddNote(){
                this.$router.push('/addNote');
            },
            async loadNote(){
                let res = await getD1("912094062@qq.com");
                alert(res);
            }
        }
    }
</script>
<style scoped>
  .home {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 30px;
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

  .cn-item-body {
    margin-top: 50px
  }

  .cn-item-li {
    position: relative;
  }

  .cn-item-main {
    border-radius: 15px;
    padding: 20px;


  }

  .cn-item-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cn-item-time {

  }

  .cn-item-mask {
    background-color: blue;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(221, 217, 213, 0);
  }

  .cn-item-menu {
    border: 1px solid rgba(25, 137, 250, 0.26);
    border-radius: 10px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(255, 255, 255, 0.81);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cn-item-menu .i-icon {
    width: 100px;
    height: 100px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .footer .goTopBtn {
    position: fixed;
    right: 70px;
    bottom: 250px;
    padding: 10px;
    border-radius: 10%;
    width: 100px;
    height: 100px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("../../static/go_top_icon.png");
  }
  .footer .addNoteBtn{
    position: fixed;
    right: 70px;
    bottom: 100px;
    padding: 10px;
    border-radius: 10%;
    width: 100px;
    height: 100px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("../../static/add_note_icon.png");
  }
</style>



