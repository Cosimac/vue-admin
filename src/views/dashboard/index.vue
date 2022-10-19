<!--
import { log } from 'util';
 * @Date: 2022-10-14 10:38:47
 * @LastEditors: Cosima
 * @LastEditTime: 2022-10-19 16:47:52
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
      function bar (value) {
        // obj.count
        console.log(value, 'value---1');
        console.log(this.count, 'this.count');
      }
      // 实现call函数
      Function.prototype.myCall = function (context) {
        // 相当于给传入的上下文context 赋值了一个新的函数并执行
        // 1. 赋值this指向
        // 2. 触发函数
        // 不传第一个参数，默认是window,
        var content = context || window;
        // 给context添加一个属性，这时的this指向调用myCall的函数，比如上文的bar函数
        content.fn = this;
        // 通过展开运算符和解构赋值取出context后面的参数，上文的例子没有传入参数列表
        var args = [...arguments].slice(1);
        // 执行函数（相当于上文的bar(...args)）
        var result = context.fn(...args);
        // 删除函数
        delete context.fn;
        return result;
      }
      bar.myCall(foo, 1, 2); // 1
    }
  }
}
</script>
