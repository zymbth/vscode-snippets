import fs from 'node:fs'
// import mdSnippets from './snippets/markdown.json' assert { type: 'json' }
import path from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const tmp1 = fs.readFileSync(path.join(__dirname, 'snippets', 'default.json'), 'utf8')
  const tmp2 = fs.readFileSync(path.join(__dirname, 'snippets', 'markdown.json'), 'utf8')
  const defaultSnippets = JSON.parse(tmp1);
  const mdSnippets = JSON.parse(tmp2);
  let outputs = `# Snippets` + generateTmplFromSnippets(defaultSnippets, 'Default')
  outputs += generateTmplFromSnippets(mdSnippets, 'Markdown', 'text')
  if (fs.existsSync('./PREVIEW.md')) {
    console.log('Target file exists, skipping creation.')
  }
  fs.writeFileSync('./PREVIEW.md', outputs)
} catch (error) {
  console.error(error)
}

function generateTmplFromSnippets(snippets, title, codeType = 'vue') {
  return `\n\n## ${title}`
    + Object.entries(snippets).map(([name, { prefix, body, description }]) => {
      const [blockStart, blockEnd] = isBodyIncludeCodeBlock(body)
        ? ['<pre><code>', '</code></pre>']
        : [`\`\`\`${codeType}`, `\`\`\``]
      return `\n\n### ${name}\n\n`
        + `\`${prefix}\`: ${pureTxt(description)}\n\n`
        + `${blockStart}\n`
        + dealSnippetBody(Array.isArray(body) ? body.join('\n') : body)
        + `\n${blockEnd}\n`
    }).join('')
}

function pureTxt(val) {
  return val.replaceAll(/\</g, '&lt;').replaceAll(/\>/g, '&gt;')
}

function dealSnippetBody(bodyStr) {
  return bodyStr
    .replaceAll(/\$\d/g, '')
    .replaceAll(/\$\{\d(?:\|.+\|)?\}/g, '')
    .replaceAll('\t', '  ')
}
function isBodyIncludeCodeBlock(body) {
  return Array.isArray(body) ? body.some(p => p.includes('```')) : body.includes('```')
}
