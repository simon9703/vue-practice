<script>
import Vest from './Vest'
const text = 'text'
export default {
  data() {
    return {
      splitStr: '-',
      current: 1,
      levels: [1, 2, 3, 4, 5],
      problems: {
        0: (
          <div>
            <section>第一道题</section>
          </div>
        ),
        1: (
          <div>
            <section>第二道题</section>
          </div>
        ),
        2: (
          <div>
            <section>第三道题</section>
          </div>
        )
      },
      child: [<span>{text}-1</span>, <span>{text}-2</span>, <span>{text}-3</span>]
    }
  },
  methods: {
    clickSplitStr() {
      this.splitStr += '-'
    }
  },
  render(h) {
    console.log('render exec!')
    const tags = 'Vest'

    const html = (
      <div>
        <button onClick={this.clickSplitStr}>+++</button>
        <Vest splitStr={this.splitStr} id="123">
          +++++++
        </Vest>
        {this.levels.map(item => {
          const current = `h${item}`
          return <current>今天天气真好！</current>
        })}
        {this.child}
        {this.problems[this.current]}
      </div>
    )
    return html
  },
  created() {
    console.log('child:', this.child)
  },
  mounted() {
    setInterval(() => {
      this.current = (this.current + 1) % 3
      console.log(this.current)
    }, 60000)
  }
}
</script>