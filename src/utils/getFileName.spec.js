import { getFileName } from './getFileName';

describe('getfileName util fucntion', () => {

  test('should return empty string when invalid file object is passed', () => {
    expect( getFileName(null) ).toEqual('')
    expect( getFileName(undefined) ).toEqual('')
    expect( getFileName() ).toEqual('')
  })

  test( 'should return properly scoped file name', () => {
    let file = {
      opts: {
        filename: 'path/to/file.js'
      }
    }

    expect( getFileName(file) ).toEqual('./path/to/file.js');
  })
});
