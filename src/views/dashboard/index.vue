<!--
 * @Date: 2022-10-14 10:38:47
 * @LastEditors: Cosima
 * @LastEditTime: 2022-10-14 18:48:42
 * @FilePath: \vue-admin\src\views\dashboard\index.vue
-->
<template>
  <div class="app-container">
    <span>dashboard</span>
  </div>
</template>

<script>
// import { textThis } from '@/utils/common'
export default {
  name: 'dashboard',
  data () {
    return {
      value: 123
    }
  },
  created () {
    // this.asyncAwait()
    // this.initPromise()
    // this.initGenerator()
    // this.initIterator()
    this.initCall()
  },
  methods: {
    async asyncAwait () {
      try {
        await this.promise().then((res) => {
          console.log(res, 123);
          return res
        }).then(res => {
          console.log(res, 'then2---res');
        })
        await this.promise2().then((res) => {
          console.log(res, 456);
        })
      } catch (error) {
        console.log(error, 'error---9');
      }
      // .catch(err => {
      //   console.log(err, 'err---promise2');
      // });
      console.log('end---', this.promise);
    },
    promise () {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 3000)
      })
    },
    promise2 () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(2);
        }, 3000)
      })
    },
    initPromise () {
      Promise.all(this.getPromises()).then(console.log);
      Promise.allSettled(this.getPromises()).then(console.log);
      Promise.race(this.getPromises()).then(console.log);
    },
    getPromises () {
      return [
        new Promise(((resolve) => setTimeout(() => resolve(1), 1000))),
        new Promise(((resolve, reject) => setTimeout(() => reject(new Error('2')), 2000))),
        new Promise(((resolve) => setTimeout(() => resolve(3), 3000))),
      ];
    },
    // 原生对象的迭代器属性
    initGenerator () {
      let arr = ['a', 'b', 'c'];
      console.log(arr, 'arr---protype');
      // 创建迭代器
      let iter = arr[Symbol.iterator]();
      console.log(iter, iter.next(), 'iterator----init');
      iter.next() // { value: 'a', done: false }
      iter.next() // { value: 'b', done: false }
      iter.next() // { value: 'c', done: false }  
      iter.next() // { value: undefined, done: true }
    },
    // 自定义迭代器 params {}
    // createIterator (items) {
    //   let keyArr = Object.keys(items);
    //   // 记录当前索引
    //   let i = 0;
    //   // 迭代器 iterator: { next() { return { value, done } } }
    //   return {
    //     next: function () {
    //       let done = (i >= keyArr.length);
    //       let value = !done ? items[keyArr[i++]] : undefined;
    //       return {
    //         value: value,
    //         done: done,
    //       };
    //     }
    //   };
    // },
    // generator 
    * createIterator () {
      console.log('createIterator---init');
      yield 1
      yield 2
      yield 3
    },
    initIterator () {
      let iterator = this.createIterator()
      console.log(iterator, 'iterator---init');
      console.dir(iterator, 'iterator---init');
      iterator.next()
    },
    initCall () {
      // textThis.call(this)
      var foo = {
        count: 1
      };
      function bar () {
        console.log(this.count);
      }
      // 实现call函数
      Function.prototype.myCall = function (content) {
        console.log(content, 'content---');
      }
      bar.myCall(foo); // 1
    }
  }
}
</script>
