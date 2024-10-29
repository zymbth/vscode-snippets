# Snippets

## Default

### vue-script-setup

`<sc`: Create a &lt;script setup&gt; template

```vue
<script setup  >

</script>

<template>
  <div>
  </div>
</template>
```


### define-vue-component

`vuecomp`: Define a vue component.

```vue
// import { defineComponent } from 'vue'
const VueComp = defineComponent({
  name: 'VueComp',
  props: [],
  data() {
    return {}
  },
  setup() {
    return () => {
      return <div></div>
    }
  },
})

```


### define-vue-component-with-function-syntax

`vuecompfn`: Define a vue component with function syntax

```vue
// import { defineComponent } from 'vue'
const VueComp = defineComponent(
  ({ props }) => {
    return () => {
      return <div></div>
    }
  },
  { name: 'VueComp', props: [] }
)

```


### define-vue-jsx-component

`vuecompjsx`: Create a vue component in jsx format

```vue
const JsxComp = ({ props }) => {
  return (
    <div>
      
    </div>
  )
}

```


### vue-style

`<st`: Create a vue &lt;style scoped&gt; tag

```vue
<style scoped>

</style>
```


### vue-writable-computed

`computed`: Create a vue writable computed value

```vue
const originalVal = ref(1)
const computedVal = computed({
  get: () => originalVal.value,
  set: val => {
    originalVal.value = val
  }
})

```


### vue-writable-model-value

`computed`: Create a writable computed value for vue's modelValue prop

```vue
// const props = defineProps(['modelValue'])
// const emit = defineEmits(['update:modelValue'])
const computedVal = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})

```


### html-template

`<htm`: Create a html template

```vue
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>title</title>
  </head>
  <body>
  </body>
</html>
```


### function

`fn`: Create a function

```vue
function fn(params) {
  
}
```


### arrow-function

`afn`: Create an arrow function

```vue
const fn = (params) => {
  
}
```


### ignore-prettier-comment

`prettier-ignore`: Ignore prettier comment

```vue
// prettier-ignore
```


### eslint-disable-comment

`eslint-disable`: Eslint disable comment

```vue
/* eslint-disable */
```


## Markdown

### markdown-api-table

`table`: Create a markdown table

```text
| - | - |
| --- | --- |
| - | - |

```


### block-or-container(shiki)

`block`: (Support by shiki) Create a markdown block or container

```text
::: info



:::

```


### code-block

`codeblock`: Create a markdown code block

<pre><code>
```js
```

</code></pre>


### code-group(shiki)

`codeg`: (Support by shiki) Create a markdown code group

<pre><code>
::: code-group

```js [file1.js]

```

```js [file2.js]

```

:::

</code></pre>


### mark-code-line(shiki)

`codehl`: (Support by shiki) Mark a code line

```text
// [!code highlight]
```


### vitepress-yaml-formatter

`formatter`: Create a YAML frontmatter in VitePress, with description and keywords

```text
---
description: 
head:
  -  - meta
    - name: keywords
      content: 
---

```


### directory-structure-block

`dirctory`: Create a directory structure

<pre><code>
```text
├ dir1
├ dir2
│ ├ dir2-1
│ └ dir2-2
└ dir3
```

</code></pre>


### directory-structure-block(loose)

`dirctory`: Create a more loose directory structure

<pre><code>
```text
├── dir1
├── dir2
│   ├── dir2-1
│   └── dir2-2
└── dir3
```

</code></pre>
