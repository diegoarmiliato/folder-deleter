import FolderIsWithinRange from '../src/helpers/folder-is-within-range'
import path from 'path'

describe('Test Suite for Folder Is Witihin Range', () => {
  //
  it('should fail since the folder does not exist', () => {
    const invalidFolderPath = 'ofhewohfeowh'
    const folderIsWithinRange = new FolderIsWithinRange(invalidFolderPath)
    //
    expect(() => folderIsWithinRange.check()).toThrowError(Error)
  })
  //
  it('should fail since the path refers to a file, no a folder', () => {
    const invalidFolderPath = __filename
    const folderIsWithinRange = new FolderIsWithinRange(invalidFolderPath)
    //
    expect(() => folderIsWithinRange.check()).toThrowError(Error)
  })
  //
  it('should return true because folder\'s modified lower', () => {
    const folderPath = path.resolve(__dirname, '..')
    const folderIsWithinRange = new FolderIsWithinRange(folderPath)
    //
    expect(folderIsWithinRange.check()).toBeTruthy()
  })
  //
  it('should return false because folder\'s modified date is higher', () => {
    const folderPath = __dirname
    const folderIsWithinRange = new FolderIsWithinRange(folderPath)
    //
    // Mock the current date to look like the files are out of date
    const mockCurrentDate = new Date(Date.now())
    mockCurrentDate.setMonth(mockCurrentDate.getMonth() + folderIsWithinRange.NUMBER_OF_MONTHS + 1)
    jest.spyOn<FolderIsWithinRange, any>(folderIsWithinRange, 'getCurrentDate').mockReturnValue(mockCurrentDate)
    //
    expect(folderIsWithinRange.check()).toBeFalsy()
  })
  //
})
