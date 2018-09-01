<template>
  <section class="flexindex_div_wrap ">
    <header class="indexWrap_div_toolbar">
      <input list="flex-direction" name="flex-direction" v-model="container['flex-direction']" placeholder="排列方向"/>
      <input list="flex-wrap" name="flex-wrap" v-model="container['flex-wrap']" placeholder="如何换行"/>
      <input list="justify-content" name="justify-content" v-model="container['justify-content']" placeholder="对齐方式"/>
      <input list="align-items" name="align-items" v-model="container['align-items']" placeholder="侧轴对齐"/>
    </header>
    <main class="indexWrap_div_main row">
      <p class="WrapMain_div_add" @click="add_item_fn">添加项目</p>
      <div class="WrapMain_div_containers" :style="container">
        <div v-for="(item,index) in containers" :key="index" :style="item" class="mainContainers_div_item">
          <input type="number" name="order" v-model="item['order']" placeholder="排列顺序" min="-99" max="99"/>
          <input type="number" name="flex_grow" v-model="item['flex-grow']" placeholder="放大比例" min="-99" max="99"/>
          <input type="number" name="flex_shrink" v-model="item['flex-shrink']" placeholder="缩小比例" min="-99" max="99" />
          <input type="number" name="flex_basis"  placeholder="占据空间" min="-99" max="99" @change="chane_shrink_fn(index,item,$event)"/>
          <input list="align_self" name="align_self" v-model="item['align-self']" placeholder="对齐方式"/>
          <div>
            <button type="button" value="" @click="show_code_fn(index,$event)">布局代码</button>
            <button type="button" value="" @click="romve_item_fn(index)">移除项目</button>
          </div>
        </div>
      </div>
    </main>
    <!-- ------------------------------------------------------------------------------------------------------------ -->
    <datalist id="align_self">
      <option value="auto">auto</option>
      <option value="flex-start">flex-start</option>
      <option value="flex-end">flex-end</option>
      <option value="center">center</option>
      <option value="baseline">baseline</option>
      <option value="stretch">stretch</option>
    </datalist>

    <datalist id="flex-direction">
      <option value="row">row</option>
      <option value="row-reverse">row-reverse</option>
      <option value="column">column</option>
      <option value="column-reverse">column-reverse</option>
    </datalist>

    <datalist id="flex-wrap">
      <option value="nowrap">nowrap</option>
      <option value="wrap">wrap</option>
      <option value="wrap-reverse">wrap-reverse</option>
    </datalist>

    <datalist id="justify-content">
      <option value="flex-start">flex-start</option>
      <option value="flex-end">flex-end</option>
      <option value="center">center</option>
      <option value="space-between">space-between</option>
      <option value="space-around">space-around</option>
    </datalist>

    <datalist id="align-items">
      <option value="flex-start">flex-start</option>
      <option value="flex-end">flex-end</option>
      <option value="center">center</option>
      <option value="baseline">baseline</option>
      <option value="stretch">stretch</option>
    </datalist>
  </section>
</template>

<script>
export default {
  name: 'flex-index',
  data () {
    return {
      containers: [],
      container: {
        'display': 'flex',
        'flex-direction': null, // ['row', 'row-reverse', 'column', 'column-reverse'],
        'flex-wrap': null, // ['nowrap', 'wrap', 'wrap-reverse'],
        'justify-content': null, // ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
        'align-items': null, // ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
        'align-content': null // ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']
      },
      container_item: {
        'order': null,
        'flex-grow': null,
        'flex-shrink': null,
        'flex-basis': null,
        // 'align-selfs': ['auto', 'flex-start', 'flex-end', 'center', 'baseline ', 'stretch'],
        'align-self': null
      }
    }
  },
  methods: {
    add_item_fn () {
      this.containers.push(Object.assign({}, this.container_item))
    },
    romve_item_fn (index) {
      this.containers.splice(index, 1)
    },
    show_code_fn (index, oEvent) {
      let colne_container = Object.assign({}, this.container)
      let colne_container_item = Object.assign({}, this.containers[index])

      for (let val1 in colne_container) {
        if (!colne_container[val1]) {
          delete colne_container[val1]
        }
      }

      for (let val2 in colne_container_item) {
        if (!colne_container_item[val2]) {
          delete colne_container_item[val2]
        }
      }

      const oDiv = document.createElement('div')
      oDiv.style.left = oEvent.clientX + 'px' // 指定创建的DIV在文档中距离左侧的位置
      oDiv.style.top = oEvent.clientY + 'px' // 指定创建的DIV在文档中距离顶部的位置
      oDiv.style.position = 'absolute' // 为新创建的DIV指定绝对定位
      oDiv.style.width = '30em' // 指定宽度
      oDiv.style.height = '20em' // 指定高度

      const oArea = document.createElement('textarea')
      const code_str = JSON.stringify(Object.assign({'#container': colne_container}, {'#container_item': colne_container_item}))

      oArea.value = code_str.replace(/\"/igm, '').replace(/\,/igm, ';').replace(/^\{|\}$/igm, '').replace(/\;\#/igm, '\n#')
        .replace(/\:\{/igm, ':\n{')
      oArea.style.width = '100%' // 指定宽度
      oArea.style.height = '100%' // 指定高度
      oArea.style.fontSize = '1.2rem' // 指定高度
      oArea.style.padding = '1rem' // 指定高度
      // oArea.style.whiteSpace = 'nowrap'

      document.body.appendChild(oDiv)
      oDiv.appendChild(oArea)

      oArea.onmouseout = function (e) {
        oDiv.style.display = 'none'
      }
    },
    chane_shrink_fn (index, item, event) {
      item['flex-basis'] = event.target.value + 'px'
    }
  },
  mounted () {
    const _self = this
    this.containers.push(Object.assign({}, _self.container_item), Object.assign({}, _self.container_item), Object.assign({}, _self.container_item))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  * {
    border-radius: 5px;
  }

  .flexindex_div_wrap {
    display: flex;
    flex-flow: row wrap;
    place-content: flex-start center;
    align-items: center;
    width: inherit;
    height: inherit;
    padding: 5%;
    .indexWrap_div_toolbar {
      display: flex;
      place-content: flex-start;
      align-items: center;
      width: 75%;
      height: 5%;
      input {
        width: 100%;
        font-size: 1.2rem;
        text-align: center;
      }
    }
    .indexWrap_div_main {
      width: 75%;
      height: 95%;
      .WrapMain_div_add {
        position: absolute;
        width: 1.2rem;
        font-size: 1.2rem;
        background-color: #3388f9;
        color: white;
      }
      .WrapMain_div_containers {
        display: flex;
        place-content: flex-start;
        align-items: flex-start;
        height: inherit;
        border: solid 1px white;
        padding: 15px;
        overflow: auto;
        .mainContainers_div_item {
          width: 14.5%;
          min-width: 183px;
          margin: 1%;
          padding: 0.5%;
          background-color: #3388f9;
          input, div {
            width: 98%;
            height: 25px;
            margin: 1%;
          }
          button {
            width: 48.2%;
            height: 25px;
            border-width: 0;
            margin-left: 1px;
          }
        }
      }
    }
  }
</style>
