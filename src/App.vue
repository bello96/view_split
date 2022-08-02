<template>
  <div id="app">
    <view-split 
      arrow="leftRight" 
      mainSize="100px" 
      @dragend="dragend" 
      :minSize="50" 
      barColor="#f1f3f4"
      barActiveColor="#dee1e6"
    >
      <A />
      <B slot="other" />
    </view-split>
  </div>
</template>

<script>
import ViewSplit from './components/ViewSplit.vue'
import A from "./components/A.vue";
import B from "./components/B.vue";
export default {
  components: {
    ViewSplit,
    A,
    B,
  },
  methods: {
    // 拖拽结束事件
    dragend(e) {
      console.log("拖动结束", e);
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 400px;
  height: 500px;
  margin: 50px auto;

}
</style>
