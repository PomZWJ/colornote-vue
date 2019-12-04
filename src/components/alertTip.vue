<template>
    <div v-show="showFlag" class="alert_container">
        <span style="color: white">{{alertText}}</span>
    </div>

</template>

<script>
    export default {
        data(){
            return{
                timer: null,
                showFlag: true
            }
        },
        props: ['alertText'],
        mounted() {
            let _this = this;
            this.timer = setTimeout(()=>{
                _this.showFlag = false;
                this.$emit('autoClose');
            },1300);
        }
    }
</script>

<style scoped>
  .alert_container{
    position: fixed;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    padding: 20px 40px 20px 40px;
    background-color: rgba(44, 62, 80, 0.81);
    border-radius: 10px;
  }
</style>

