import fs from 'node:fs'
// import mdSnippets from './snippets/markdown.json' assert { type: 'json' }
import path from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  console.log('Start generating preview file...')
  // 读取内容
  const tmp1 = fs.readFileSync(path.join(__dirname, 'snippets', 'default.json'), 'utf8')
  const tmp2 = fs.readFileSync(path.join(__dirname, 'snippets', 'markdown.json'), 'utf8')
  const defaultSnippets = JSON.parse(tmp1);
  const mdSnippets = JSON.parse(tmp2);
  // 生成预览内容
  let outputs = `# Snippets` + generateTmplFromSnippets(defaultSnippets, 'Default')
  outputs += generateTmplFromSnippets(mdSnippets, 'Markdown', 'text')
  // 内容写入文件
  if (fs.existsSync('./PREVIEW.md')) {
    console.log('Target file exists, skipping creation.')
  }
  fs.writeFileSync('./PREVIEW.md', outputs)
  console.log('Preview file created.')
} catch (error) {
  console.error(error)
}

/**
 * 根据快捷输入信息生成模板
 *
 * @param {Object} snippets 快捷输入信息
 * @param {string} title H2标题
 * @param {string} codeType 默认代码块类型
 * @returns {string} 模板内容
 */
function generateTmplFromSnippets(snippets, title, codeType = 'vue') {
  return `\n\n## ${title}`
    + Object.entries(snippets).map(([name, { prefix, body, description }]) => {
      // body 包含代码块时，使用代码块包裹
      const [blockStart, blockEnd] = isBodyIncludeCodeBlock(body)
        ? ['<pre><code>', '</code></pre>']
        : [`\`\`\`${codeType}`, '```']
      return `\n\n### ${name}\n\n`
        + `\`${prefix}\`: ${pureTxt(description)}\n\n`
        + `${blockStart}\n`
        + dealSnippetBody(Array.isArray(body) ? body.join('\n') : body)
        + `\n${blockEnd}\n`
    }).join('')
}

// 去除标签
function pureTxt(val) {
  return val.replaceAll(/\</g, '&lt;').replaceAll(/\>/g, '&gt;')
}

// 处理body内容，去除占位符，例如：$1、${1}、${1|a,b|}、${1:a}
function dealSnippetBody(bodyStr) {
  let res = bodyStr
  try {
    // 替换制表符为两个空格
    res = res.replaceAll('\t', '  ')
    // 去除 $1 占位符
    res = res.replaceAll(/\$\d/g, '')
    // 替换 ${1} 占位符
    res = res.replaceAll(/\$\{\d\}/g, '')
    // 替换 ${1:a} 占位符，保留默认值
    res = res.replaceAll(/(\$\{\d:([^}]+)\})/g, (match, $1, $2) => $2)
    // 替换 ${1|a,b|} 占位符，保留第一个可选值
    res = res.replaceAll(/(\$\{\d\|([^|}]+)\|\})/g, (match, $1, $2) => {
      let res = ''
      try {
        res = $2.split(',').filter(Boolean)[0]
      } catch { }
      return res
    })
  } catch (error) {
    console.error(error)
  }
  return res
}

// 判断body内容是否包含代码块
function isBodyIncludeCodeBlock(body) {
  return Array.isArray(body) ? body.some(p => p.includes('```')) : body.includes('```')
}
