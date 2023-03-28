const fs = require('fs')
const path = require('path')

module.exports = (dir, folderOnly = false) => {
    let fileName = []

    const files = fs.readdirSync(dir, { withFileTypes: true })

    for (const file of files) {
        const filePath = path.join(dir, file.name)

        if (folderOnly) {
            if (file.isDirectory()) {
                fileName.push(filePath)
            }
        }
        else {
            if (file.isFile()) {
                fileName.push(filePath)
            }
        }
    }

    return fileName
}