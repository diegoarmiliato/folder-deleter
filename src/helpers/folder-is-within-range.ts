import fs from 'fs'

class FolderIsWithinRange {
  private readonly folderPath: string

  constructor (folderPath: string) {
    this.folderPath = folderPath
  }

  public check (): boolean {
    if (!fs.existsSync(this.folderPath)) {
      throw new Error(`Folder ${this.folderPath} does not exist`)
    }

    if (!fs.statSync(this.folderPath).isDirectory()) {
      throw new Error(`Path ${this.folderPath} is not a directory`)
    }

    return true
  }
}

export default FolderIsWithinRange
