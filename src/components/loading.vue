<template>
    <div class="loading_container">
      <div class="load_img" :style="{backgroundPositionY: -(positionY%7)*2.5+'rem'}">
      </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                positionY: 0,
                timer: null
            }
        },
        mounted() {
            this.timer = setInterval(()=>{
                this.positionY ++;
            },300);
        }
    }
</script>

<style scoped>
  .loading_container{
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 11;
    background-color: rgba(255, 255, 255, 0.65);
  }
  .load_img{
    background: url(../../static/icon_loading.png) no-repeat 0 0;
    background-size: 2.5rem auto;
    width: 200px;
    height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: load .6s infinite ease-in-out;
    position: relative;
    z-index: 12;
  }
</style>
