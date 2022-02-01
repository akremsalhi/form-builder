import { writeFileSync } from 'fs'

export default async function handler(req, res) {

  try {

    const { $, cd } = await import('zx')
    await $`composer create-project laravel/laravel project/laravel`;
    await $`git clone https://github.com/akremsalhi/front-react.git project/front`;

    cd('./project/front')

    await $`rm -rf yarn.lock`;
    await $`pnpm i`;

  } catch (err) {
    console.error(err)
  }

  return res.status(201).json({ status: 'success' })

}
