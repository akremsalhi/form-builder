
export default async function handler(req, res) {

  const { $, cd } = await import('zx')

  try {
    await $`composer create-project laravel/laravel project/laravel`;
    await $`git clone https://github.com/akremsalhi/front-react.git project/front`;

    cd('./project/front')
    await $`pwd`

    await $`rm -rf yarn.lock`;
    await $`yarn`;

    await new Promise((resolve, _) => resolve(0))
  } catch (err) {

    return res.status(500).json({ error: err })
  }


  return res.status(200).json({ status: 'success' })

}
