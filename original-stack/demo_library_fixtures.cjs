// Deterministic, credential-free files selected only by the isolated demo picker.
const zlib=require('node:zlib');
function libraryFixture(kind='txt'){
 if(kind==='txt')return {name:'rea-library-original.txt',bytes:Buffer.from('Original Library upload demo.\nUnicode: café.\n<script>shown as plain text</script>\n')};
 if(kind==='png'){
  const crc=data=>{let n=0xffffffff;for(const byte of data){n^=byte;for(let i=0;i<8;i++)n=(n>>>1)^((n&1)?0xedb88320:0);}return (n^0xffffffff)>>>0;};
  const chunk=(type,data)=>{const name=Buffer.from(type),size=Buffer.alloc(4),sum=Buffer.alloc(4);size.writeUInt32BE(data.length);sum.writeUInt32BE(crc(Buffer.concat([name,data])));return Buffer.concat([size,name,data,sum]);};
  const width=96,height=64,header=Buffer.alloc(13);header.writeUInt32BE(width);header.writeUInt32BE(height,4);header[8]=8;header[9]=2;
  const rows=Buffer.alloc(height*(1+width*3));for(let y=0;y<height;y++)for(let x=0;x<width;x++){const offset=y*(1+width*3)+1+x*3;rows.set(x<32?[240,80,80]:x<64?[80,200,120]:[80,120,240],offset);}
  return {name:'rea-library-colors.png',bytes:Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',zlib.deflateSync(rows)),chunk('IEND',Buffer.alloc(0))])};
 }
 if(kind==='pdf'){
  const stream=text=>{const data='BT /F1 24 Tf 50 200 Td ('+text+') Tj ET\n';return '<< /Length '+Buffer.byteLength(data)+' >>\nstream\n'+data+'endstream';};
  const objects=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R 5 0 R] /Count 2 >>','<< /Type /Page /Parent 2 0 R /MediaBox [0 0 400 300] /Resources << /Font << /F1 7 0 R >> >> /Contents 4 0 R >>',stream('Original PDF - page 1'),'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 400 300] /Resources << /Font << /F1 7 0 R >> >> /Contents 6 0 R >>',stream('Original PDF - page 2'),'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
  let pdf='%PDF-1.4\n',offsets=[0];objects.forEach((object,index)=>{offsets.push(Buffer.byteLength(pdf));pdf+=(index+1)+' 0 obj\n'+object+'\nendobj\n';});const xref=Buffer.byteLength(pdf);pdf+='xref\n0 '+offsets.length+'\n0000000000 65535 f \n'+offsets.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('')+'trailer\n<< /Size '+offsets.length+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF\n';return {name:'rea-library-two-pages.pdf',bytes:Buffer.from(pdf)};
 }
 throw Error('Unsupported synthetic Library fixture');
}
module.exports={libraryFixture};
