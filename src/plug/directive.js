import Vue from "vue";
Vue.directive("chartsWeith", {
  bind(el, binding) {
    // el为绑定的元素，binding为绑定给指令的对象
    let width = "",
      height = "";
    function isReize() {
      const style = document.defaultView.getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        binding.value();
      }
      width = style.width;
      height = style.height;
    }
    el.__vueSetInterval__ = setInterval(isReize, 300);
  },
  unbind(el) {
    clearInterval(el.__vueSetInterval__);
  },
});
