
export default async function handler(req, res) {

    const data = await read('./generated.json')



    return res.status(200).json(data)
}


async function read(path) {
    const fs = await import('fs')
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}
