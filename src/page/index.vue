<template>
  <div>
    <!--主页-->
    <div class="home" style="overflow:visible" >
      <!--app bar start-->
      <div>
        <div v-show="!showSearchBar" style="display: flex;align-items: center;position: relative">
          <!--菜单图标-->
          <img v-bind:src="menuIconUrl" @click="show=!show" style="width: 30px;height: 30px"/>
          <!--bar title-->
          <span style="font-size: 20px;margin-left: 10px">{{titleBigText}}</span>
          <!--搜索图标-->
          <img @click="showSearchBar = !showSearchBar"  v-bind:src="searchIconUrl" style="width: 30px;height: 30px;position: absolute;right: 10px;"/>
        </div>
        <transition mode="out-in" enter-active-class="animated bounceInRight">
        <div v-show="showSearchBar" style="display: flex;align-items: center;position: relative">
          <!--搜索返回图标-->
          <img v-bind:src="searchBackIconUrl" @click="searchBackBtn" style="width: 30px;height: 30px"/>
          <!--search input-->
          <input class="search-input-bar" @input="search($event)" v-model="seachConditionText" type="text"/>
        </div>
        </transition>
      </div>
      <div>
      <!--笔记条目(使用v-for循环)-->
      <div v-for="(site,index) in bookNotes" :key="index" v-show="bookNotes.length>0">
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
              <div class="cn-item-menu" @click="cancelItemMenu" style="border:1px solid rgba(25,137,250,0.26);" v-if="showItemMenu == index" >
                <!--复制图标-->
                <span class="i-icon" :style="{backgroundImage: 'url('+copyIconUrl+')'}" v-clipboard:success="onCopySuccess" v-clipboard:copy="site.noteContent" @click.stop="copyEvent"></span>
                <!--收藏图标-->
                <span class="i-icon" v-show="site.isFav=='0'" :style="{backgroundImage: 'url('+favYesOrNoIconUrl+')',marginLeft: '50px'}" @click.stop="favEvent(site.noteId,site.isFav,$event)"></span>
                <span class="i-icon" v-show="site.isFav=='1'" :style="{backgroundImage: 'url('+favYesIconUrl+')',marginLeft: '50px'}" @click.stop="favEvent(site.noteId,site.isFav,$event)"></span>
                <!--删除图标-->
                <span class="i-icon" :style="{backgroundImage: 'url('+deleteIconUrl+')',marginLeft: '50px'}" @click.stop="deleteEvent(site.noteId)"></span>
              </div>
            </transition>
          </div>
        </div>
      </div>
        <div class="no_notes" v-show="bookNotes.length==0 && showSearchBar == false">
          <div class="no_search_result_div">
            <span class="no_search_result_img" :style="{backgroundImage: 'url('+noSearchResultIconUrl+')'}"></span>
            <br/>
            <span class="no_search_result_text">没有记录笔记</span>
          </div>
        </div>
        <div class="no_notes" v-show="isShowNoSearchResultUI()">
        <div class="no_search_result_div">
          <span class="no_search_result_img" :style="{backgroundImage: 'url('+noSearchResultIconUrl+')'}"></span>
          <br/>
          <span class="no_search_result_text">没有匹配的结果</span>
        </div>
      </div>

      </div>

      <!--新增按钮和回到顶部按钮-->
      <div class="footer">
        <div class="goTopBtn" :style="{backgroundImage: 'url('+goTopBtnIconUrl+')'}" v-if="goTop" @click="toTop"></div>
        <div class="addNoteBtn" :style="{backgroundImage: 'url('+addNoteIconUrl+')'}" @click="handleRouterToAddNote"></div>
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
            <div class="line-box" @click="selectNoteKindEvent('','全部笔记')">
              <img class="line-icon" v-bind:src="noteIconUrl">
              <span class="line-text">{{allNoteText}}</span>
              <span class="line-num">{{allNoteNum}}</span>
            </div>
            <div class="line-box" @click="selectNoteKindEvent('','我的收藏')">
              <img class="line-icon" v-bind:src="favIconUrl">
              <span class="line-text">{{favoriteText}}</span>
              <span class="line-num">{{favoriteNum}}</span>
            </div>
            <div class="line-box" @click="selectNoteKindEvent('','最近删除')">
              <img class="line-icon" v-bind:src="rubbishIconUrl">
              <span class="line-text">{{rubbishText}}</span>
              <span class="line-num">{{rubbishNum}}</span>
            </div>
            <!--分类-->
            <div class="line-box" style="margin-top: 30px;">
              <span class="line-text" style="font-size: 16px;color: gray;line-height: 40px;margin: 0;">笔记分类</span>
              <img class="line-icon" style="position: absolute;right:20px;" v-bind:src="editMarkIconUrl" @click="handleRouterToEditNoteKind">
            </div>
            <div v-for="site in sites">
              <div class="line-box" @click="selectNoteKindEvent(site.id,site.markText)">
                <img class="line-icon" v-bind:src="site.iconUrl">
                <span class="line-text">{{site.markText}}</span>
                <span class="line-num">{{site.markNum}}</span>
              </div>
            </div>

            <div class="line-box"  @click="selectNoteKindEvent('','未分类')">
              <img class="line-icon" v-bind:src="noNoteKindIconUrl">
              <span class="line-text">未分类</span>
              <span class="line-num">{{noNoteKindNum}}</span>
            </div>
            <div class="line-box">
              <img class="line-icon" v-bind:src="newNoteKindIconUrl">
              <span @click="popNewNoteKindWin" class="line-text" style="color: rgb(45, 168, 199)">新建</span>
            </div>

            <div class="line-box" style="padding-bottom: 30px;background-color: white">
              <img class="line-icon" v-bind:src="wxIconUrl">
              <span class="line-text" @click="toMyWxChatQR">进技术交流群</span>
            </div>

            <div class="line-box" style="padding-bottom: 30px;background-color: white">
              <img class="line-icon" v-bind:src="setIconUrl">
              <span class="line-text">设置</span>
            </div>

            <div class="line-box" style="padding-bottom: 30px;background-color: white" @click="outLogin">
              <img class="line-icon" v-bind:src="exitLoginIconUrl">
              <span class="line-text">退出登录</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="addNoteKindPop">
      <addNoteKindPop @autoRefresh="initData" @autoClose="showNewNoteKindPopWin=false" v-show="showNewNoteKindPopWin"></addNoteKindPop>
    </transition>
    <transition name="deleteConfirmPop">
      <deleteConfirmPop @autoRefresh="initData" @autoClose="showDeleteConfirmPopWin=false" v-show="showDeleteConfirmPopWin"></deleteConfirmPop>
    </transition>
    <transition mode="out-in" leave-active-class="animated zoomOut">
      <alert-tip  v-if="showAlert" @autoClose="showAlert=false" :alertText="alertText"></alert-tip>
    </transition>
    <transition name="deleteConfirmPop">
      <deleteConfirmPop @deleteOk="confirmDelete" @autoClose="showDeleteConfirmPopWin=false" v-show="showDeleteConfirmPopWin"></deleteConfirmPop>
    </transition>
    <span  style="display: none">{{preDeleteNoteId}}</span>
  </div>


</template>
<script>
    import {imgBaseUrl} from '@/config/env'
    import {
        getAllNote,
        getUserInfo,
        getUserIndexInfo,
        deleteNoteToRubbishByUserIdAndNoteId,
        updateNoteFavState,
    } from '@/service/getData'
    import addNoteKindPop from '@/components/addNoteKindPop'
    import deleteConfirmPop from '@/components/deleteConfirmPop'
    import alertTip from '@/components/alertTip'
    import {setStore, getStore, removeStore} from '@/config/mUtils' // 本地存储方法封装
    export default {
        data() {
            return {
                iconUrl: imgBaseUrl+"/logo.ico",
                noteIconUrl: imgBaseUrl+"/note.png",
                favIconUrl: imgBaseUrl+"/fav.png",
                rubbishIconUrl: imgBaseUrl+"/rubbish.png",
                closeIconUrl: imgBaseUrl+"/close_icon.png",
                editMarkIconUrl: imgBaseUrl+"/edit-bookmark.png",
                setIconUrl: imgBaseUrl+"/set_icon.png",
                menuIconUrl: imgBaseUrl+"/menu_icon.png",
                searchIconUrl: imgBaseUrl+"/search_icon.png",
                copyIconUrl: imgBaseUrl+"/copy_icon.png",
                favYesOrNoIconUrl: imgBaseUrl+"/fav_no.png",
                favYesIconUrl: imgBaseUrl+"/fav_yes.png",
                deleteIconUrl: imgBaseUrl+"/delete_icon.png",
                goTopIconUrl: imgBaseUrl+"/go_top_icon.png",
                userIconLogo: imgBaseUrl+"/user-logo.png",
                noNoteKindIconUrl: imgBaseUrl+'/bookmark/bookmark-black.png',
                newNoteKindIconUrl: imgBaseUrl+'/bookmark/bookmark-new.png',
                searchBackIconUrl: imgBaseUrl+'/back_btn.png',
                noSearchResultIconUrl: imgBaseUrl+"/no_search_result.png",
                exitLoginIconUrl: imgBaseUrl+"/exit_login.png",
                goTopBtnIconUrl: imgBaseUrl+"/go_top_icon.png",
                addNoteIconUrl: imgBaseUrl+"/add_note_icon.png",
                wxIconUrl: imgBaseUrl+'/wx_icon.png',
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
                goTop:false,
                noNoteKindNum: 0,
                showNewNoteKindPopWin: false,
                showDeleteConfirmPopWin: false,
                alertText: '',//提示的内容
                showAlert: false,
                preDeleteNoteId: '',
                showSearchBar: false,
                seachConditionText: '',
                indexSelectNoteKindId:"",
                indexSelectMyFav:'',
                titleBigText:'全部笔记'

            }
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll,true);
            this.initData();
        },
        components:{
            addNoteKindPop,
            deleteConfirmPop,
            alertTip
        },
        methods: {
            showAlertTip(text){
                this.showAlert = true;
                this.alertText = text;
            },
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
            },
            async favEvent(noteId,isFav,e) {
                let favState = '0';
                if(isFav == '0'){
                    favState = '1';
                }
                let cs = e.target;
                let flag = await updateNoteFavState(noteId,favState);
                if(flag == true){
                    for(let i=0;i<this.bookNotes.length;i++){
                        if(this.bookNotes[i].noteId == noteId){
                            this.bookNotes[i].isFav = favState;
                        }
                    }
                    this.indexPageData();
                }
            },
            deleteEvent(noteId) {
                this.preDeleteNoteId = noteId;
                this.showDeleteConfirmPopWin= true;
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
                let _id = id;
                this.$router.push({
                    path: '/addNote',
                    query: {
                        action: 'edit',
                        noteId: _id
                    }
                });

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
                this.$router.push({
                    path: '/addNote',
                    query: {

                    }
                });
            },
            async initData(){
                this.getAllNoteBook();
                let userInfo = await getUserInfo();
                this.userIdText = userInfo.user.userName;
                this.indexPageData();

            },
            async getAllNoteBook(){
                this.bookNotes = await getAllNote(this.seachConditionText,this.indexSelectNoteKindId,this.indexSelectMyFav);
            },
            async indexPageData(){
                let userIndexInfo = await getUserIndexInfo();
                this.allNoteNum = userIndexInfo.allNote;
                this.favoriteNum = userIndexInfo.myFav;
                this.rubbishNum = userIndexInfo.nearDel;
                this.sites = userIndexInfo.noteKind;
                this.noNoteKindNum = userIndexInfo.noNoteKindNumber;
            },
            popNewNoteKindWin(){
                this.showNewNoteKindPopWin = true;
            },
            handleRouterToEditNoteKind(){
                this.$router.push({
                    path: '/editNoteKind',
                    query: {

                    }
                });
            },
            onCopySuccess(){
                //复制完成后隐藏条形菜单
                this.showItemMenu = -1;
                this.showAlertTip("复制成功");
            },
            async confirmDelete(){
                let flag = await deleteNoteToRubbishByUserIdAndNoteId(this.preDeleteNoteId);
                if(flag == true){
                    this.showAlertTip("删除成功");
                }
                this.showDeleteConfirmPopWin = false;
                this.initData();
                this.preDeleteNoteId="";
                this.showItemMenu = -1;
            },
            async search(e){
                this.seachConditionText = e.currentTarget.value;
                this.bookNotes = this.getAllNoteBook();
            },
            async searchBackBtn(){
                this.showSearchBar = !this.showSearchBar;
                this.seachConditionText = "";
                this.bookNotes = this.getAllNoteBook();
            },
            selectNoteKindEvent(noteKindId,titleText){
                this.show = false;
                this.titleBigText = titleText;
                this.indexSelectNoteKindId = noteKindId;
                this.indexSelectMyFav = "";
                if(titleText == '全部笔记'){
                    this.indexSelectNoteKindId = "";
                }else if(titleText == '我的收藏'){
                    this.indexSelectMyFav = "1";
                }else if(titleText=='未分类'){
                    this.indexSelectNoteKindId = "NOT_KIND";
                }
                this.bookNotes = this.getAllNoteBook();
            },
            isShowNoSearchResultUI(){
                if((this.bookNotes==''||this.bookNotes.length==0) && this.seachConditionText.trim() != ''){
                    return true;
                }
                return false;
            },
            outLogin(){
                removeStore("userId");
                removeStore("token");
                this.$router.push({
                    path: '/login',
                    query: {

                    }
                });
            },
            toMyWxChatQR(){
                this.$router.push({
                    path: '/myWxQr',
                    query: {

                    }
                });
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
    background-color: white;
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
  }
  .search-input-bar{
    margin-left: 20px;
    outline: none;
    height: 70px;
    width: 90%;
    padding-left: 30px;
    border:2px solid rgb(98, 86, 205);
    border-radius: 40px;
  }
  .no_search_result_div{
    display: inline-block;
    top: 50%;
    left: 50%;
    transform: translate(-60%,-60%);
    position: relative
  }
  .no_search_result_img{
    vertical-align: middle;
    background-repeat: no-repeat;
    display: inline-block;
    width: 230px;
    height: 230px;
    background-size: 100% 100%
  }
  .no_search_result_text{
    width: 230px;
    margin-top: 20px;
    font-size: 30px;
    text-align: center;
    display: inline-block;
  }
  .no_notes{
    width: 100%;
    height: 100%;
    position:fixed;
  }
</style>



