import FileDateChecker from '../src/helpers/file-date-checker'

describe('Test Suite for File Date Checker', () => {
  //
  it('should fail since the file does not exist', () => {
    const invalidFilePath = 'ofhewohfeowh'
    const fileDateChecker = new FileDateChecker(invalidFilePath)
    //
    expect(() => fileDateChecker.check()).toThrowError(Error)
  })
  //
  it('should work since the file exists', () => {
    const validFilePath = __filename
    const fileDateChecker = new FileDateChecker(validFilePath)
    //
    const fileDate = fileDateChecker.check()
    expect(new Date(fileDate)).toBeInstanceOf(Date)
  })
  //
})
