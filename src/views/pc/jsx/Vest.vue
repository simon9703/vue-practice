<script>
export default {
  data() {
    return {
      message: '欢迎2！'
    }
  },
  methods: {
    repeat(str, count) {
      let result = ''
      while (count > 0) {
        result += str
        count--
      }
      return result
    }
  },
  render() {
    debugger
    return (
      <div>
        <p>{this.repeat(this.props.splitStr, 5)}</p>
        <p class={{ back: true, light: true }}>{this.$slots.default || this.message}</p>
        <p>========</p>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.back {
  background: #e0e0e0;
}

.light {
  color: red;
}
</style>