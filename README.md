<p align="center">
    <a href="https://www.iviewui.com">
        <img width="200" src="https://file.iviewui.com/view-ui-logo-new.svg">
    </a>
</p>

<h1>
ppui
    <h3>基于iviewui</h3>
</h1>

> 该项目基于 ppui。

## Docs

**[4.x](https://www.iviewui.com)** 
## Features

- Dozens of useful and beautiful components.
- Friendly API. It's made for people with any skill level.
- Extensive documentation and demos.
- It is quite beautiful.
- Supports both Vue.js 2 and Vue.js 1.


## Install

We provide an [View UI plugin](https://github.com/ppui-design/vue-cli-plugin-viewui) for Vue CLI 3, which you can use to quickly build an ViewUI-based project.

We also provide a starter kit [view-ui-project](https://github.com/ppui-design/view-ui-project) for you.

### Install View UI

Using npm:
```
npm install ppui --save
```

Using a script tag for global use:

```html
<script type="text/javascript" src="ppui.min.js"></script>
<link rel="stylesheet" href="dist/styles/ppui.css">
```

You can find more info [on the website](https://www.iviewui.com/docs/guide/install-en).

## Usage

```vue
<template>
    <Slider v-model="value" range />
</template>
<script>
    export default {
        data () {
            return {
                value: [20, 50]
            }
        }
    }
</script>
```

Using css via `import`:

```js
import 'view-design/dist/styles/ppui.css';
```

## Compatibility

- Supports Vue.js 2.x
- Supports Vue.js 1.x - [visit 1.0 docs](http://v1.iviewui.com/)
- Supports SSR
- Supports [Nuxt.js](https://nuxtjs.org/)
- Supports TypeScript
- Supports [Electron](http://electron.atom.io/)
- Most components and features support IE9 and above browsers, some components and features do not support IE

## Community

If you want to contribute or have questions or bugs to report:

**Questions:** Find other users at the [Gitter chat](https://gitter.im/ppui/ppui) or post on [StackOverflow using `[ppui-ui]` tag](https://stackoverflow.com/questions/tagged/ppui-ui)  
**Bugs:** [File a issue here](https://github.com/ppui-design/ppui/issues) - please provide a example so we can help you better  
**Contribute:** Contact us in [Gitter chat](https://gitter.im/ppui/ppui), WeChat or via mail to `admin@aresn.com`. PRs welcome!

## Major Contributors
|Name|Avatar|Name|Avatar|Name|Avatar|
|---|---|---|---|---|---|
|[Aresn](https://github.com/icarusion) |  ![](https://avatars3.githubusercontent.com/u/5370542?v=3&s=60)  |[jingsam](https://github.com/jingsam) |  ![](https://avatars3.githubusercontent.com/u/1522494?v=3&s=60)  | [rijn](https://github.com/rijn)       |  ![](https://avatars2.githubusercontent.com/u/6976367?v=3&s=60)  |
|[lcx960324](https://github.com/lcx960324)           |  ![](https://avatars3.githubusercontent.com/u/9768245?v=3&s=60)  |[GITleonine1989](https://github.com/GITleonine1989) |  ![](https://avatars1.githubusercontent.com/u/7582490?v=3&s=60)  |[huixisheng](https://github.com/huixisheng)         |  ![](https://avatars1.githubusercontent.com/u/1518967?v=3&s=60)  |
|[Sergio Crisostomo](https://github.com/SergioCrisostomo)           |  ![](https://avatars3.githubusercontent.com/u/5614559?v=3&s=60)  |  [lison16](https://github.com/lison16)           |  ![](https://avatars3.githubusercontent.com/u/20942571?v=3&s=60) |  [Xotic750](https://github.com/Xotic750)    | ![](https://avatars3.githubusercontent.com/u/216041?v=3&s=60)   | 
[huanghong1125](https://github.com/huanghong1125) | ![](https://avatars3.githubusercontent.com/u/12794817?v=3&s=60) | [yangdan8](https://github.com/yangdan8) | ![](https://avatars2.githubusercontent.com/u/16515026?v=3&s=60) |


## Ecosystem Links

- [View UI Pro](https://pro.iviewui.com/pro)
- [View UI Admin Pro](https://pro.iviewui.com/admin-pro)
- [Developer](https://dev.iviewui.com)
- [Run](https://run.iviewui.com)
- [ppui-Loader](https://github.com/ppui/ppui-loader)
- [ViewUI-Plugin](https://github.com/ppui/vue-cli-plugin-ppui)

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present, ViewDesign
