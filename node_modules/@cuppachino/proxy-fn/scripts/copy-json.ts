import * as fs from 'fs/promises'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const packageJson = await fs
  .readFile(resolve(__dirname, '../package.cjs.json'), {
    encoding: 'utf-8'
  })
  .catch((err) => {
    console.error(err)
    throw new Error(
      "Couldn't find a `package.cjs.json` file at the project root"
    )
  })

await fs.writeFile(
  resolve(__dirname, '../dist/cjs/package.json'),
  packageJson,
  {
    encoding: 'utf-8'
  }
)
