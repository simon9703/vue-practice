<template>
  <div>
    <div class="group">
      <button @click="add">+++</button>
      <button @click="remove">---</button>
      <button @click="random">random</button>
      <button @click="toggle">toggle</button>
    </div>
    <div class="virtual-scroll" :style="{ height: totalHeight + 'px' }">
      <div class="list" :style="{ top: scrollDistance + 'px' }">
        <div
          class="item"
          v-for="(element, index) in visiableArr"
          :key="element"
          :data-key="element"
          :class="{ show: index >= limit }"
        >
          这是第{{ element }}个
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
      visiableArr: [],
      limit: 10,
      itemHeight: 48,
      scrollDistance: 0,
      startIndex: 0
    }
  },
  computed: {
    /* 总高度 */
    totalHeight() {
      return this.arr.length * this.itemHeight
    }
  },
  created() {
    setTimeout(() => {
      this.arr = new Array(1000).fill(0).map((item, index) => index + 1)
      this.visiableArr = this.arr.slice(this.startIndex, this.startIndex + this.limit)
    }, 1000)
  },
  mounted() {
    window.addEventListener('scroll', this.scrollWithDiff)
  },
  methods: {
    add() {
      this.visiableArr.push(this.arr[this.startIndex + this.limit])
      this.$nextTick(() => {
        this.visiableArr.shift()
      })
      this.startIndex++
      // this.visiableArr = this.arr.slice(++this.startIndex, this.startIndex + this.limit)
    },
    remove() {
      this.startIndex--
      this.visiableArr.pop()
      this.visiableArr.unshift(this.arr[this.startIndex])
      // this.visiableArr = this.arr.slice(--this.startIndex, this.startIndex + this.limit)
    },
    random() {
      this.visiableArr = [...this.visiableArr.slice(0, 5), ...this.visiableArr.slice(5, 10).reverse()]
    },
    toggle() {
      this.visiableArr.splice(2, 1, Math.floor(Math.random() * 100 + 10))
      this.visiableArr.splice(6, 1, Math.floor(Math.random() * 100 + 10))
    },
    virtualScroll() {
      let currentHeight = this.limit * this.itemHeight
    },
    baseScroll() {
      let currentScroll = document.body.scrollTop || document.documentElement.scrollTop
      let currentIndex = Math.floor(currentScroll / this.itemHeight)
      this.visiableArr = this.arr.slice(currentIndex, currentIndex + this.limit)

      this.startIndex = currentIndex
      this.scrollDistance = currentScroll
    },
    scrollWithDiff() {
      let currentScroll = document.body.scrollTop || document.documentElement.scrollTop
      let currentIndex = 0
      if (this.scrollDistance < currentScroll) {
        currentIndex = Math.floor(currentScroll / this.itemHeight)
        let currentArr = this.arr.slice(currentIndex, currentIndex + this.limit)
        let extendArr = this.arr.slice(this.startIndex, currentIndex).reverse()
        this.visiableArr = [...currentArr, ...extendArr]
        // 下滑
      } else {
        currentIndex = Math.floor(currentScroll / this.itemHeight)
        this.visiableArr = this.arr.slice(currentIndex, currentIndex + this.limit)
      }
      this.startIndex = currentIndex
      this.scrollDistance = currentScroll
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 48px;

* {
  box-sizing: border-box;
}

.virtual-scroll {
  position: relative;
  margin: 20px;
  background: yellow;
}

.list {
  position: absolute;
  top: 0;
  width: 100%;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: $height;
  border-top: 1px solid #ddd;
}

button {
  margin-left: 8px;
}

.show {
  // visibility: hidden;
  display: none;
}
</style>