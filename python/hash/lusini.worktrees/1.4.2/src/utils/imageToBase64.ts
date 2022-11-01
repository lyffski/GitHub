export default function imageToBase64(imagePath: string): Promise<string> {
  if (typeof window !== 'undefined' || !imagePath) {
    return Promise.resolve('')
  }
  if (imagePath.includes('.svg')) {
    imagePath = imagePath.replace('.svg', '.png')
  }
  if (imagePath.includes('.jpg')) {
    imagePath = imagePath.replace('.jpg', '.jpeg')
  }
  const Jimp = tryRequire('jimp'),
    fs = tryRequire('fs'),
    path = tryRequire('path'),
    cacheKey = Buffer.from(imagePath).toString('base64'),
    filePath = path.resolve(__dirname, '../../.base64Cache', cacheKey)

  return new Promise((resolve) => {
    try {
      fs.access(filePath, (err) => {
        if (!err) {
          fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
              // eslint-disable-next-line no-console
              console.log('cannot read file imageToBase64', imagePath, err)
              resolve(
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTY1IiBoZWlnaHQ9IjE2NSIgdmlld0JveD0iMCAwIDE2NSAxNjUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjRjlGOUY4IiB3aWR0aD0iMTY1IiBoZWlnaHQ9IjE2NSIvPjxwYXRoIGQ9Ik03Ni43ODEzOTEzLDg1IEw4MS4zMzQ1NzE1LDg4LjE1NzM4MDkgTDg2LjM2ODY3NDUsODYuMDMwMTgyOCBMOTEsODcuOTI5Mjk0NCBMOTEsOTEuMTI5MzU4MyBDOTEsOTEuNjM2OTgwMiA5MC43OTM0MTQsOTIuMDk4MDc5MSA5MC40NTc4Niw5Mi40MzU2MjkgQzkwLjEyMjA1MzYsOTIuNzczNDMzIDg5LjY1NzAyNDMsOTIuOTg3MzE2MiA4OS4xNDE3MzcxLDkyLjk5OTQ1NTQgTDg5LjE0MTczNzEsOTIuOTk5NDU1NCBMNzUuOTAzNTA2Niw5MyBDNzUuMzg3ODQ2Myw5MyA3NC45MTk2NzM1LDkyLjc5NzY3NTkgNzQuNTc2ODI1Niw5Mi40Njk5MjMxIEM3NC4yMzEyMDMsOTIuMTM5NTE3NyA3NC4wMTI5NTczLDkxLjY4MTc3ODMgNzQuMDAwNTcsOTEuMTc0ODY5MSBMNzQuMDAwNTcsOTEuMTc0ODY5MSBMNzQsODYuODk4Mjk4MyBMNzYuNzgxMzkxMyw4NSBaIiBzdHJva2U9IiM5QTk3OTAiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNODUuNzgxOTU2NSw3MyBDODYuMTI0MTM5NCw3MyA4Ni40NDk4NTMzLDczLjEyNjY3NzIgODYuNjk5Mjc1NCw3My4zNTUzNzIyIEw4Ni42OTkyNzU0LDczLjM1NTM3MjIgTDkwLjYwMjIyNjgsNzcuMjAyNDc2OSBDOTAuODQ2MzU2MSw3Ny40NDIzNTY1IDkwLjk4NjY1OTIsNzcuNzYxMDk1NSA5MC45OTkwNjUzLDc4LjA5OTE0NTQgTDkwLjk5OTA2NTMsNzguMDk5MTQ1NCBMOTEsODUuNzQwMDQ2NSBMODYuMzcxODk2Nyw4My44MzI4NzQ5IEw4MS4yNzAxMjkyLDg2IEw3Ni43Nzg4ODksODIuODY5MzkzNiBMNzQsODQuNzc1MTQxIEw3NCw3NC44ODA1MDIxIEM3NCw3NC4zNzAxOTcyIDc0LjIwNjQzMzIsNzMuOTA2NjgyIDc0LjU0MTc1MTQsNzMuNTY3MzY5NSBDNzQuODc3MzYwOCw3My4yMjc3NjI0IDc1LjM0MjEzODMsNzMuMDEyNzUxMyA3NS44NTcyMjcxLDczLjAwMDU0NzUgTDc1Ljg1NzIyNzEsNzMuMDAwNTQ3NSBMODUuNzgxOTU2NSw3MyBaIiBzdHJva2U9IiM5QTk3OTAiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNOTAsNzcgTDg2LjM5NjQzMzQsNzcgQzg2LjE3NzQ4OTMsNzcgODYsNzYuODE5NTMxIDg2LDc2LjU5NjkxMTIgTDg2LDczIEw4Niw3MyIgc3Ryb2tlPSIjOUE5NzkwIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg=='
              )
            } else {
              resolve(data)
            }
          })
        } else {
          Jimp.read(imagePath)
            .then(async (image) => {
              const newImg = image.resize(20, Jimp.AUTO).quality(20),
                base64 = await newImg.getBase64Async(Jimp.MIME_JPEG)
              fs.writeFile(filePath, base64, 'utf8', () => {
                resolve(base64)
              })
            })
            .catch((err) => {
              // eslint-disable-next-line no-console
              console.log('jimp error imageToBase64', imagePath, err)
              resolve(
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTY1IiBoZWlnaHQ9IjE2NSIgdmlld0JveD0iMCAwIDE2NSAxNjUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjRjlGOUY4IiB3aWR0aD0iMTY1IiBoZWlnaHQ9IjE2NSIvPjxwYXRoIGQ9Ik03Ni43ODEzOTEzLDg1IEw4MS4zMzQ1NzE1LDg4LjE1NzM4MDkgTDg2LjM2ODY3NDUsODYuMDMwMTgyOCBMOTEsODcuOTI5Mjk0NCBMOTEsOTEuMTI5MzU4MyBDOTEsOTEuNjM2OTgwMiA5MC43OTM0MTQsOTIuMDk4MDc5MSA5MC40NTc4Niw5Mi40MzU2MjkgQzkwLjEyMjA1MzYsOTIuNzczNDMzIDg5LjY1NzAyNDMsOTIuOTg3MzE2MiA4OS4xNDE3MzcxLDkyLjk5OTQ1NTQgTDg5LjE0MTczNzEsOTIuOTk5NDU1NCBMNzUuOTAzNTA2Niw5MyBDNzUuMzg3ODQ2Myw5MyA3NC45MTk2NzM1LDkyLjc5NzY3NTkgNzQuNTc2ODI1Niw5Mi40Njk5MjMxIEM3NC4yMzEyMDMsOTIuMTM5NTE3NyA3NC4wMTI5NTczLDkxLjY4MTc3ODMgNzQuMDAwNTcsOTEuMTc0ODY5MSBMNzQuMDAwNTcsOTEuMTc0ODY5MSBMNzQsODYuODk4Mjk4MyBMNzYuNzgxMzkxMyw4NSBaIiBzdHJva2U9IiM5QTk3OTAiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNODUuNzgxOTU2NSw3MyBDODYuMTI0MTM5NCw3MyA4Ni40NDk4NTMzLDczLjEyNjY3NzIgODYuNjk5Mjc1NCw3My4zNTUzNzIyIEw4Ni42OTkyNzU0LDczLjM1NTM3MjIgTDkwLjYwMjIyNjgsNzcuMjAyNDc2OSBDOTAuODQ2MzU2MSw3Ny40NDIzNTY1IDkwLjk4NjY1OTIsNzcuNzYxMDk1NSA5MC45OTkwNjUzLDc4LjA5OTE0NTQgTDkwLjk5OTA2NTMsNzguMDk5MTQ1NCBMOTEsODUuNzQwMDQ2NSBMODYuMzcxODk2Nyw4My44MzI4NzQ5IEw4MS4yNzAxMjkyLDg2IEw3Ni43Nzg4ODksODIuODY5MzkzNiBMNzQsODQuNzc1MTQxIEw3NCw3NC44ODA1MDIxIEM3NCw3NC4zNzAxOTcyIDc0LjIwNjQzMzIsNzMuOTA2NjgyIDc0LjU0MTc1MTQsNzMuNTY3MzY5NSBDNzQuODc3MzYwOCw3My4yMjc3NjI0IDc1LjM0MjEzODMsNzMuMDEyNzUxMyA3NS44NTcyMjcxLDczLjAwMDU0NzUgTDc1Ljg1NzIyNzEsNzMuMDAwNTQ3NSBMODUuNzgxOTU2NSw3MyBaIiBzdHJva2U9IiM5QTk3OTAiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNOTAsNzcgTDg2LjM5NjQzMzQsNzcgQzg2LjE3NzQ4OTMsNzcgODYsNzYuODE5NTMxIDg2LDc2LjU5NjkxMTIgTDg2LDczIEw4Niw3MyIgc3Ryb2tlPSIjOUE5NzkwIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg=='
              )
            })
        }
      })
    } catch {
      // eslint-disable-next-line no-console
      console.error('Something went Wrong :( See imageToBase 64 Component...')
    }
  })
}

function tryRequire(dept: string) {
  try {
    return require(`${dept}`)
  } catch (e) {
    return null
  }
}
