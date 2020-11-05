import Component from 'vue-class-component';

Component.registerHooks([
    // models到底算不算hook
    'models',
    'asyncData',
    'beforeRouteEnter',
    'beforeRouteUpdate',
    'beforeRouteLeave',
    'subscriptions',
    // 'fetch',
    // 'head',
    // 'layout',
    // 'middleware',
    // 'scrollToTop',
    // 'transition',
    // 'validate'
]);

export default Component;
