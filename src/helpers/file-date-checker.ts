import fs from 'fs'

class FileDateChecker {
  private readonly filePath: string

  constructor (filePath: string) {
    this.filePath = filePath
  }

  public check (): Date {
    if (!fs.existsSync(this.filePath)) {
      throw new Error(`File "${this.filePath}" does not exist`)
    }

    const stats = fs.statSync(this.filePath)

    return stats.mtime
  }
}

export default FileDateChecker
