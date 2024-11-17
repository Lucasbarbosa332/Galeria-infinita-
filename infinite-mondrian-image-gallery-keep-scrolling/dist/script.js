var script = {
  //   Do NOT need this!
  // el: '#app',
  data: {
    initialHeight: 0,
    blocks: [],
    colors: [
      //   Red
      {
        hue: 354,
        saturation: 100,
        lightness: 42
      },
      //   White
      {
        hue: 105,
        saturation: 17,
        lightness: 95
      },
      //   Blue
      {
        hue: 211,
        saturation: 87,
        lightness: 34
      },
      //   Yellow
      {
        hue: 51,
        saturation: 94,
        lightness: 57
      },
    ]
  },
  methods: {
    generateBlocks: function(limit = 3) {
      for (let i = 0; i < 5; i++) {
        const randoColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.blocks.push({
          colSpan: Math.floor(Math.random() * limit + 1),
          rowSpan: Math.floor(Math.random() * limit + 1),
          delay: i,
          // Spread a color onto the data!
          ...(randoColor)
        });
      }
    },
    regenerate: function() {
      this.blocks = [];
      setTimeout(() => this.generateBlocks(), 0);
    },
    setUpObserver: function() {
      let options = {
        rootMargin: '0px',
        threshold: 1.0
      };
      const callback = () => {
        if ( window.scrollY !== 0) {
          this.generateBlocks(); 
        }
      };
      const observer = new IntersectionObserver(callback, options);
      const target = document.querySelector('.mondrian__trigger');
      observer.observe(target);
    }
  },
  updated: function () {
    if (!this.initialHeight) {
      this.initialHeight = document.querySelector('.mondrian').offsetHeight;
      this.setUpObserver();
    }
  },
  mounted: function () {
    this.generateBlocks(2);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { attrs: { id: "app" } }, [
    _c(
      "div",
      {
        staticClass: "mondrian__container",
        style: { "--initial-height": _vm.initialHeight }
      },
      [
        _c(
          "div",
          { staticClass: "mondrian" },
          _vm._l(_vm.blocks, function(block, index) {
            return _c(
              "div",
              {
                staticClass: "mondrian__block",
                style: {
                  "--index": index,
                  "--row": block.rowSpan,
                  "--col": block.colSpan,
                  "--hue": block.hue,
                  "--saturation": block.saturation,
                  "--lightness": block.lightness,
                  "--delay": block.delay
                }
              },
              [
                _c("img", {
                  attrs: {
                    src:
                      "https://picsum.photos/" +
                      block.colSpan * 1 +
                      "00/" +
                      block.rowSpan * 1 +
                      "00?" +
                      index
                  }
                })
              ]
            )
          }),
          0
        )
      ]
    ),
    _c("div", { staticClass: "mondrian__trigger" })
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-62925164_0", { source: ":root {\n  --black: #070908;\n  --yellow: #f8d92a;\n  --white: #f1f4f0;\n  --blue: #0b54a2;\n  --red: #d60015;\n  --block: 50;\n  --height: calc(var(--block) * 6);\n  --width: calc(var(--block) * 5 + (6 * 10));\n}\n* {\n  box-sizing: border-box;\n}\nbody,\nhtml {\n  background: #ededed;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  font-family: sans-serif;\n  text-align: center;\n}\n.mondrian__container {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: calc(50vmin - ((var(--initial-height) / 2) * 1px)) 0;\n}\n.mondrian__trigger {\n  height: 10px;\n}\n.mondrian {\n  --block-size: calc(var(--block) * 1px);\n  background: var(--black);\n  border: 10px solid var(--black);\n  box-shadow: 5px 10px 10px #aaa;\n  display: grid;\n  grid-auto-flow: dense;\n  grid-auto-rows: minmax(50px, 10vmin);\n  grid-gap: 10px;\n  grid-template-columns: repeat(5, minmax(50px, 1fr));\n  min-width: calc(var(--width) * 1px);\n  width: calc(50vmin + 60px);\n}\n.mondrian__block {\n  animation: scaleIn 0.15s calc(var(--delay) * 0.1s) ease both;\n  background: hsl(var(--hue, 105), calc(var(--saturation, 17) * 1%), calc(var(--lightness, 95) * 1%));\n  grid-row: span var(--row);\n  grid-column: span var(--col);\n  position: relative;\n  overflow: hidden;\n}\n.mondrian__block img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n@-moz-keyframes scaleIn {\nfrom {\n    transform: scale(0);\n}\n}\n@-webkit-keyframes scaleIn {\nfrom {\n    transform: scale(0);\n}\n}\n@-o-keyframes scaleIn {\nfrom {\n    transform: scale(0);\n}\n}\n@keyframes scaleIn {\nfrom {\n    transform: scale(0);\n}\n}\n", map: {"version":3,"sources":["/tmp/codepen/vuejs/src/pen.vue","pen.vue"],"names":[],"mappings":"AA0FA;EACA,gBAAA;EACA,iBAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;EACA,WAAA;EACA,gCAAA;EACA,0CAAA;ACzFA;AD2FA;EACA,sBAAA;ACzFA;AD2FA;;EAEA,mBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,iBAAA;EACA,uBAAA;EACA,kBAAA;ACzFA;AD6FA;EACA,iBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,6DAAA;AC3FA;AD6FA;EACA,YAAA;AC3FA;AD6FA;EACA,sCAAA;EACA,wBAAA;EAEA,+BAAA;EACA,8BAAA;EACA,aAAA;EAEA,qBAAA;EACA,oCAAA;EACA,cAAA;EACA,mDAAA;EACA,mCAAA;EACA,0BAAA;AC7FA;AD+FA;EACA,4DAAA;EACA,mGAAA;EACA,yBAAA;EACA,4BAAA;EACA,kBAAA;EACA,gBAAA;AC7FA;AD+FA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AC7FA;AD+FA;AACA;IACA,mBAAA;AC7FE;AACF;AD0FA;AACA;IACA,mBAAA;ACxFE;AACF;ADqFA;AACA;IACA,mBAAA;ACnFE;AACF;ADgFA;AACA;IACA,mBAAA;AC9EE;AACF","file":"pen.vue","sourcesContent":["<!-- Use preprocessors via the lang attribute! e.g. <template lang=\"pug\"> -->\n<template lang=\"pug\">\n  #app\n    .mondrian__container(v-bind:style=\"{'--initial-height': initialHeight}\")\n      .mondrian\n        .mondrian__block(v-for=\"(block, index) in blocks\" v-bind:style=\"{'--index': index, '--row': block.rowSpan, '--col': block.colSpan, '--hue': block.hue, '--saturation': block.saturation, '--lightness': block.lightness, '--delay': block.delay}\")\n          img(v-bind:src=\"'https://picsum.photos/' + (block.colSpan * 1) + '00/' + (block.rowSpan * 1) + '00?' + index\")\n    .mondrian__trigger\n</template>\n\n<script>\nexport default {\n  //   Do NOT need this!\n  // el: '#app',\n  data: {\n    initialHeight: 0,\n    blocks: [],\n    colors: [\n      //   Red\n      {\n        hue: 354,\n        saturation: 100,\n        lightness: 42\n      },\n      //   White\n      {\n        hue: 105,\n        saturation: 17,\n        lightness: 95\n      },\n      //   Blue\n      {\n        hue: 211,\n        saturation: 87,\n        lightness: 34\n      },\n      //   Yellow\n      {\n        hue: 51,\n        saturation: 94,\n        lightness: 57\n      },\n    ]\n  },\n  methods: {\n    generateBlocks: function(limit = 3) {\n      for (let i = 0; i < 5; i++) {\n        const randoColor = this.colors[Math.floor(Math.random() * this.colors.length)]\n        this.blocks.push({\n          colSpan: Math.floor(Math.random() * limit + 1),\n          rowSpan: Math.floor(Math.random() * limit + 1),\n          delay: i,\n          // Spread a color onto the data!\n          ...(randoColor)\n        })\n      }\n    },\n    regenerate: function() {\n      this.blocks = []\n      setTimeout(() => this.generateBlocks(), 0)\n    },\n    setUpObserver: function() {\n      let options = {\n        rootMargin: '0px',\n        threshold: 1.0\n      }\n      const callback = () => {\n        if ( window.scrollY !== 0) {\n          this.generateBlocks() \n        }\n      }\n      const observer = new IntersectionObserver(callback, options)\n      const target = document.querySelector('.mondrian__trigger')\n      observer.observe(target)\n    }\n  },\n  updated: function () {\n    if (!this.initialHeight) {\n      this.initialHeight = document.querySelector('.mondrian').offsetHeight\n      this.setUpObserver()\n    }\n  },\n  mounted: function () {\n    this.generateBlocks(2)\n  }\n};\n</script>\n\n<!-- Use preprocessors via the lang attribute! e.g. <style lang=\"scss\"> -->\n<style lang=\"stylus\">\n:root\n  --black hsl(150, 13%, 3%)\n  --yellow hsl(51, 94%, 57%)\n  --white hsl(105, 17%, 95%)\n  --blue hsl(211, 87%, 34%)\n  --red hsl(354, 100%, 42%)\n  --block 50\n  --height calc(var(--block) * 6)\n  --width calc(var(--block) * 5 + (6 * 10))\n\n*\n  box-sizing border-box\n\nbody\nhtml\n  background hsl(0, 0%, 93%)\n  display flex\n  align-items center\n  justify-content center\n  min-height 100vh\n  font-family sans-serif\n  text-align center\n\n// This is our container, we need this to be full height\n// with a little piece on the bottom that triggers the observer\n.mondrian__container\n  min-height 100vh\n  display flex\n  align-items center\n  justify-content center\n  padding calc(50vmin - ((var(--initial-height) / 2) * 1px)) 0\n  \n.mondrian__trigger\n  height 10px\n  \n.mondrian\n  --block-size calc(var(--block) * 1px)\n  background var(--black)\n  // padding 10px\n  border 10px solid var(--black)\n  box-shadow 5px 10px 10px #aaa\n  display grid\n  // grid-auto-columns var(--block-size)\n  grid-auto-flow dense\n  grid-auto-rows minmax(50px, 10vmin)\n  grid-gap 10px\n  grid-template-columns repeat(5, minmax(50px, 1fr))\n  min-width calc(var(--width) * 1px)\n  width calc(50vmin + 60px)\n\n  &__block\n    animation scaleIn 0.15s calc(var(--delay) * 0.1s) ease both\n    background 'hsl(%s, %s, %s)' % (var(--hue, 105) calc(var(--saturation, 17) * 1%) calc(var(--lightness, 95) * 1%))\n    grid-row span var(--row)\n    grid-column span var(--col)\n    position relative\n    overflow hidden\n\n    img\n      width 100%\n      height 100%\n      object-fit cover\n\n@keyframes scaleIn\n  from\n    transform scale(0)\n</style>\n",":root {\n  --black: #070908;\n  --yellow: #f8d92a;\n  --white: #f1f4f0;\n  --blue: #0b54a2;\n  --red: #d60015;\n  --block: 50;\n  --height: calc(var(--block) * 6);\n  --width: calc(var(--block) * 5 + (6 * 10));\n}\n* {\n  box-sizing: border-box;\n}\nbody,\nhtml {\n  background: #ededed;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  font-family: sans-serif;\n  text-align: center;\n}\n.mondrian__container {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: calc(50vmin - ((var(--initial-height) / 2) * 1px)) 0;\n}\n.mondrian__trigger {\n  height: 10px;\n}\n.mondrian {\n  --block-size: calc(var(--block) * 1px);\n  background: var(--black);\n  border: 10px solid var(--black);\n  box-shadow: 5px 10px 10px #aaa;\n  display: grid;\n  grid-auto-flow: dense;\n  grid-auto-rows: minmax(50px, 10vmin);\n  grid-gap: 10px;\n  grid-template-columns: repeat(5, minmax(50px, 1fr));\n  min-width: calc(var(--width) * 1px);\n  width: calc(50vmin + 60px);\n}\n.mondrian__block {\n  animation: scaleIn 0.15s calc(var(--delay) * 0.1s) ease both;\n  background: hsl(var(--hue, 105), calc(var(--saturation, 17) * 1%), calc(var(--lightness, 95) * 1%));\n  grid-row: span var(--row);\n  grid-column: span var(--col);\n  position: relative;\n  overflow: hidden;\n}\n.mondrian__block img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n@-moz-keyframes scaleIn {\n  from {\n    transform: scale(0);\n  }\n}\n@-webkit-keyframes scaleIn {\n  from {\n    transform: scale(0);\n  }\n}\n@-o-keyframes scaleIn {\n  from {\n    transform: scale(0);\n  }\n}\n@keyframes scaleIn {\n  from {\n    transform: scale(0);\n  }\n}\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;