<template>
  <div>
    <div class="edit-home">
      <div class="edit-bar">
        <div class="eb-icon eb-back-icon" :style="{backgroundImage: 'url('+backBtnIconUrl+')'}" @click="goBack"></div>
        <span style="font-size: 17px;margin-left: 17px;margin-top: 5px">{{ebText}}</span>
        <div class="eb-icon eb-ok-icon" :style="{backgroundImage: 'url('+completeBtnIconUrl+')'}"></div>
      </div>
    </div>
    <div class="note-mask">
      <div style="display: inline-block">
        <select>
          <option>未分类</option>
          <option>未分类</option>
          <option>未分类</option>
          <option>未分类</option>
          <option>未分类</option>
        </select>
      </div>
      <div style="display: inline-block">
        <span style="font-size: 15px;margin-left: 8px;margin-top: 8px;color: rgba(128,128,128,0.49)">{{currentTime}}</span>
      </div>
    </div>
    <div style="position: fixed">
      <textarea style="width: 100%;height: 100%"></textarea>
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
                currentTime: "2019年10月24日 11:58"
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
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
  }
</style>
