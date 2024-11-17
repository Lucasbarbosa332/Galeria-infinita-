<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template lang="pug">
  #app
    .mondrian__container(v-bind:style="{'--initial-height': initialHeight}")
      .mondrian
        .mondrian__block(v-for="(block, index) in blocks" v-bind:style="{'--index': index, '--row': block.rowSpan, '--col': block.colSpan, '--hue': block.hue, '--saturation': block.saturation, '--lightness': block.lightness, '--delay': block.delay}")
          img(v-bind:src="'https://picsum.photos/' + (block.colSpan * 1) + '00/' + (block.rowSpan * 1) + '00?' + index")
    .mondrian__trigger
</template>

<script>
export default {
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
        const randoColor = this.colors[Math.floor(Math.random() * this.colors.length)]
        this.blocks.push({
          colSpan: Math.floor(Math.random() * limit + 1),
          rowSpan: Math.floor(Math.random() * limit + 1),
          delay: i,
          // Spread a color onto the data!
          ...(randoColor)
        })
      }
    },
    regenerate: function() {
      this.blocks = []
      setTimeout(() => this.generateBlocks(), 0)
    },
    setUpObserver: function() {
      let options = {
        rootMargin: '0px',
        threshold: 1.0
      }
      const callback = () => {
        if ( window.scrollY !== 0) {
          this.generateBlocks() 
        }
      }
      const observer = new IntersectionObserver(callback, options)
      const target = document.querySelector('.mondrian__trigger')
      observer.observe(target)
    }
  },
  updated: function () {
    if (!this.initialHeight) {
      this.initialHeight = document.querySelector('.mondrian').offsetHeight
      this.setUpObserver()
    }
  },
  mounted: function () {
    this.generateBlocks(2)
  }
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style lang="stylus">
:root
  --black hsl(150, 13%, 3%)
  --yellow hsl(51, 94%, 57%)
  --white hsl(105, 17%, 95%)
  --blue hsl(211, 87%, 34%)
  --red hsl(354, 100%, 42%)
  --block 50
  --height calc(var(--block) * 6)
  --width calc(var(--block) * 5 + (6 * 10))

*
  box-sizing border-box

body
html
  background hsl(0, 0%, 93%)
  display flex
  align-items center
  justify-content center
  min-height 100vh
  font-family sans-serif
  text-align center

// This is our container, we need this to be full height
// with a little piece on the bottom that triggers the observer
.mondrian__container
  min-height 100vh
  display flex
  align-items center
  justify-content center
  padding calc(50vmin - ((var(--initial-height) / 2) * 1px)) 0
  
.mondrian__trigger
  height 10px
  
.mondrian
  --block-size calc(var(--block) * 1px)
  background var(--black)
  // padding 10px
  border 10px solid var(--black)
  box-shadow 5px 10px 10px #aaa
  display grid
  // grid-auto-columns var(--block-size)
  grid-auto-flow dense
  grid-auto-rows minmax(50px, 10vmin)
  grid-gap 10px
  grid-template-columns repeat(5, minmax(50px, 1fr))
  min-width calc(var(--width) * 1px)
  width calc(50vmin + 60px)

  &__block
    animation scaleIn 0.15s calc(var(--delay) * 0.1s) ease both
    background 'hsl(%s, %s, %s)' % (var(--hue, 105) calc(var(--saturation, 17) * 1%) calc(var(--lightness, 95) * 1%))
    grid-row span var(--row)
    grid-column span var(--col)
    position relative
    overflow hidden

    img
      width 100%
      height 100%
      object-fit cover

@keyframes scaleIn
  from
    transform scale(0)
</style>
