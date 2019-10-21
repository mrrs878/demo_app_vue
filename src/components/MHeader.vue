<template>
  <header class='header padding' :style="{ backgroundColor: customStyle.bgColor }">
    <div class="left">
      <m-icon :icon-class="leftIcon" :fill-color="customStyle.titleColor || '#fff'" @click="handleLeftClick" />
      <span class="title" :style="{ color: customStyle.titleColor || '#fff' }" v-if="titlePosition">{{ title }}</span>
    </div>

    <div class="center" v-if="!titlePosition" :style="{ color: customStyle.titleColor || '#fff' }">{{ title }}</div>

    <div class="right">
      <slot />
      <span>{{ rightText }}</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MHeader',
  props: {
    leftIcon: {
      type: String,
      default: 'back'
    },
    title: {
      type: String,
      default: 'this is title'
    },
    titlePosition: {
      type: Boolean,
      default: true
    },
    customStyle: {
      type: Object,
      default: () => ({})
    },
    rightText: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleLeftClick () {
      this.$emit('onLeftClick')
    }
  }
}
</script>

<style scoped lang='less'>
@import '~@/assets/less/mainStyle.less';
.header {
  height: 1rem;
  font-size: 0.32rem;
  background-color: @mainColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    width: 30%;
    .title {
      margin-left: 0.2rem;
    }
  }
  .center {
    width: 40%;
    line-height: 1rem;
  }
  .right {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
