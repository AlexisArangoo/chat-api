const fs =  require('node:fs/promises')
const path = require('node:path')


const getImages = async (dirPath) => { 
    const formats = ['.png', '.gif', '.jpg', '.jpeg', '.webp', '.svg'];
    //leer el directorio donde estan las imagenes
    const imagesPath = path.join(__dirname, '..', dirPath)
    const images = await fs.readdir(imagesPath)
    const filtered = images.filter(img => 
        formats.includes(path.extname(img))
    )
    console.log(filtered)
    return filtered.map(img => ({
        filename: img,
        path: `${imagesPath}/${img}`,
        cid: img.split('.')[0]
    }))
 }

 module.exports = getImages