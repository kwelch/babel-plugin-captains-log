import path from 'path';

export const getFileName = file => {

  if( !file )
  {
    return '';
  }

  let baseDir = process.env.PWD;
  let absolutePath = path.resolve( file.opts.filename );

  return absolutePath.replace( baseDir, '.' )
}
