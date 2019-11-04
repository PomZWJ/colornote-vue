<template>
  <div>
  <div style="position: relative">
    <div style="width: 100%;position: fixed;bottom: 0px;top: 0px;background-color: white">
      <div class="edit-home">
        <div class="edit-bar">
          <div class="eb-icon eb-back-icon" :style="{backgroundImage: 'url('+backBtnIconUrl+')'}" @click="goBack"></div>
          <span style="font-size: 17px;margin-left: 17px;margin-top: 5px">{{ebText}}</span>
          <div class="eb-icon eb-ok-icon" :style="{backgroundImage: 'url('+completeBtnIconUrl+')'}"></div>
        </div>
      </div>
      <div class="note-mask">
        <div class="nm-div-kind">
          <div class="form_select">
          <span style="display: flex;align-items:center;position:relative;width: 140px;" @click="showAccountList($event)">
            <span style="background-size: 100% 100%;background-repeat: no-repeat;position: absolute;left: 0;width: 30px;height: 30px;background-image: url('../../static/bookmark-black.png');display: inline-block"></span>
            <span style="margin-left: 30px;color: black">未分类</span>
            <span style="margin-left: 10px;background-size: 100% 100%;background-image: url('../../static/arrow-down.png');display: inline-block;width: 10px;height: 7px;" :class="hasClass==='1' ? 'openlist': (hasClass==='0'?'foldlist':'')" @click="showAccountList($event)"></span>
          </span>
            <ul class="nm-kind-ul" v-if="isShowUserList">
              <li class="nm-kind-li" :class="{'selected':item.selected===true}" v-for="item in list" @click="changeUser(item)">
                <span class="nm-kind-li-img" :style="{backgroundImage: 'url('+item.iconUrl+')'}"></span>
                <span class="nm-kind-li-text">{{ item.name }}</span>
              </li>
              <li style="text-align: center;margin-top: 10px;color: #7071ff;line-height: 30px;font-size: larger" @click="manageKind">新建</li>
            </ul>
          </div>
        </div>
        <div class="nm-div-time">
          <span style="font-size: 15px;" class="nm-div-time-span">{{currentTime}}</span>
        </div>
      </div>
      <div contenteditable="true" style="width: 100%;height: 75%;border: none;outline:none;background-color: white;padding: 10px;font-size: 18px;overflow: scroll;"></div>
    </div>
    <div class="foot_menu">
      <span class="foot_menu_icon" style="background-image: url('../../static/footmenu/fav_icon_foot.png')"></span>
      <span class="foot_menu_icon" style="background-image: url('../../static/footmenu/delete_icon_foot.png')"></span>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                backBtnIconUrl: "../../static/back_btn.png",
                completeBtnIconUrl: "../../static/complete_btn.png",
                ebText: "编辑笔记",
                currentTime: "2019年10月24日 11:58",
                list: [
                    {
                        name: '个人',
                        value: 1,
                        iconUrl:'../../static/bookmark/bookmark-blue.png'
                    },
                    {
                        name: '旅游',
                        value: 2,
                        iconUrl:'../../static/bookmark/bookmark-red.png'
                    },
                    {
                        name: '工作',
                        value: 3,
                        iconUrl:'../../static/bookmark/bookmark-yellow.png'
                    },
                    {
                        name: '生活',
                        value: 4,
                        iconUrl:'../../static/bookmark/bookmark-green.png'
                    },
                ],
                isShowUserList: false,
                hasClass: ''
            }
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
                    if (item.value === data.value) {
                        item.selected = true
                    }
                })
                this.hasClass = '0'
                this.isShowUserList = false
            },
            manageKind(){
                this.isShowUserList=false;
                this.hasClass = '0'
                alert("我是分类管理");
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
    height: 60px;
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
    width: 50px;
    height: 50px;
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

</style>
