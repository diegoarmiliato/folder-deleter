import fs from 'fs'
import path from 'path'
import FileDateChecker from './file-date-checker'

class FolderIsWithinRange {
  public readonly NUMBER_OF_MONTHS = 9

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

    const dateCheckResult = this.scanFolder(this.folderPath)

    return dateCheckResult
  }

  private scanFolder (folder: string): boolean {
    // iterates over all the files in the folder
    for (const file of fs.readdirSync(folder)) {
      const filePath = path.join(folder, file)
      if (fs.statSync(filePath).isDirectory()) {
        const folderResult = this.scanFolder(filePath)
        if (!folderResult) { return false }
      }
      const fileResult = this.validateDate(filePath)
      if (!fileResult) { return false }
    }
    return true
  }

  private validateDate (path: string): boolean {
    const currentDate = this.getCurrentDate()
    //
    const fileDateChecker = new FileDateChecker(path)
    const fileDate = fileDateChecker.check()
    //
    fileDate.setMonth(fileDate.getMonth() + this.NUMBER_OF_MONTHS)
    //
    return currentDate <= fileDate
  }

  private getCurrentDate (): Date {
    return new Date()
  }
}

export default FolderIsWithinRange
