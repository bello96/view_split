<template>
  <div
    ref="split_body"
    class="view-split"
    :class="[arrow || 'topBottom', moving ? 'active' : '']"
  >
    <div
      ref="target"
      class="view-split_main"
      :style="{
        [arrow === 'topBottom' ? 'height' : 'width']: value || mainSize,
      }"
    >
      <slot></slot>
    </div>
    <template v-if="$slots.other">
      <div
        :style="barStyle"
        class="view-split_bar"
        @mousedown.stop="handlerDown"
      ></div>
      <div class="view-split_other">
        <slot name="other"></slot>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "ViewSplit",
  props: {
    // 默认主区域的尺寸，默认50%
    mainSize: {
      type: String,
      default: "50%",
    },
    // 分隔方向
    arrow: {
      type: String,
      default: "leftRight", //默认左右切割
    },
    // 每个分区的最小大小
    minSize: {
      type: Number,
      default: 100,
    },
    // 拖拽条颜色
    barColor: {
      type: String,
      default: "#f1f3f4",
    },
    // 拖拽条选中时的颜色
    barActiveColor: {
      type: String,
      default: "#dee1e6",
    },
  },
  computed: {
    barStyle() {
      return {
        "--barColor": this.barColor,
        "--barActiveColor": this.barActiveColor,
      };
    },
  },
  data() {
    return {
      value: 0, //当前主区域尺寸
      moving: false, //是否正在拖动
    };
  },
  created() {
    //拖动
    this._event_move = ($evt) => {
      let moveX = $evt.clientX - this.startX,
        moveY = $evt.clientY - this.startY;
      if (this.arrow === "topBottom") {
        //上下
        let height = this.height + moveY;
        if (height < this.minSize) {
          height = this.minSize;
        } else if (height > this.maxHeight) {
          height = this.maxHeight;
        }
        this.value = height + "px";
      } else {
        //左右
        let width = this.width + moveX;
        if (width < this.minSize) {
          width = this.minSize;
        } else if (width > this.maxWidth) {
          width = this.maxWidth;
        }
        this.value = width + "px";
      }
    };
    //取消|结束
    this._event_cancel = () => {
      this.moving = false;
      document.removeEventListener("mousemove", this._event_move);
      document.removeEventListener("mouseup", this._event_cancel);
      window.dispatchEvent(new Event("resize")); //操作结束后派发resize事件
      this.$emit("dragend", this.value);
    };
  },
  methods: {
    //开始拖动
    handlerDown($evt) {
      this.moving = true;
      this.startX = $evt.clientX;
      this.startY = $evt.clientY;
      this.width = this.$refs.target.offsetWidth;
      this.height = this.$refs.target.offsetHeight;
      this.maxWidth = this.$refs.split_body.offsetWidth - this.minSize;
      this.maxHeight = this.$refs.split_body.offsetHeight - this.minSize;
      document.addEventListener("mousemove", this._event_move);
      document.addEventListener("mouseup", this._event_cancel);
    },
  },
};
</script>

<style lang="less" scoped>
.view-split {
  display: flex;
  width: 100%;
  height: 100%;
  &.active {
    user-select: none;
  }
  &_main {
    position: relative;
  }
  &_other {
    position: relative;
    flex: 1;
  }
  &.leftRight {
    & > * {
      height: 100%;
    }
    .view-split_bar {
      cursor: e-resize;
      width: 2px;
      background-color: var(--barColor);
      &:hover {
        width: 4px;
        transition: width 0.2s;
        background-color: var(--barActiveColor);
      }
    }
  }
  &.topBottom {
    flex-direction: column;
    & > * {
      width: 100%;
    }
    .view-split_bar {
      cursor: s-resize;
      height: 2px;
      background-color: var(--barColor);
      &:hover {
        height: 4px;
        transition: height 0.2s;
        background-color: var(--barActiveColor);
      }
    }
  }
}
</style>