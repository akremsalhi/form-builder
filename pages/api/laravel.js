
export default async function handler(req, res) {

    if (req.method === 'POST') {

        await write('./laravel.json', req.body)

        const { $ } = await import('zx')
        await $`schematics @lowcode/generator:generator --dry-run=false`;
        await $`schematics @lowcode/laravel-gen:lowcode project/laravel --dry-run=false`;
        return res.status(201).json({ ok: true })
    }

    const data = await read('./laravel.json')

    return res.status(200).json(data)
}


async function read(path) {
    const fs = await import('fs')
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

async function write(path, data) {
    const { writeFileSync } = await import('fs')
    writeFileSync(path, JSON.stringify(data))
}
