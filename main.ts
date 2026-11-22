import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const B="00011223--------222222212221222-222-------------01100-----------12--------------1101",C="01102233--------111111111111111-111-------------00000-----------10--------------0010";
function run(p,q){
const D=new Int32Array(256),E=new Int32Array(64),M=new Int32Array(256),u=new Uint8Array(65536);
let s=0,c=0,x=0,t=0,j=0,l=0;
const e=v=>[v,u.slice(0,l)];
for(;;){
if(t===1e6)return e(10);
if(x<0||x>=p.length)return e(9);
const o=p[x];
if(o>83||B[o]==='-')return e(5);
const im=o===1?1:o===2?4:o>47&&o<52?2:0,po=+B[o],pu=+C[o];
if(x+im>=p.length)return e(9);
t++;
const n=x+1+im;
if(s<po)return e(2);
if(s-po+pu>256)return e(3);
x=n;
if(o<8){
if(o===0)return e(0);
if(o===1)D[s++]=(p[n-1]<<24)>>24;
else if(o===2)D[s++]=p[n-4]|p[n-3]<<8|p[n-2]<<16|p[n-1]<<24;
else if(o===3)s--;
else if(o===4){D[s]=D[s-1];s++;}
else if(o===5)[D[s-1],D[s-2]]=[D[s-2],D[s-1]];
else if(o===6){D[s]=D[s-2];s++;}
else[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];
}else if(o<35){
if(o===23){D[s-1]=-D[s-1]|0;continue;}
if(o===27){D[s-1]=~D[s-1];continue;}
const b=D[s-1],a=D[s-2];
let r;
if(o===16)r=a+b|0;
else if(o===17)r=a-b|0;
else if(o===18)r=Math.imul(a,b);
else if(o===19){if(!b)return e(4);r=(a/b)|0;}
else if(o===20){if(!b)return e(4);r=a%b|0;}
else if(o===21){if(!b)return e(4);r=Math.floor((a>>>0)/(b>>>0))|0;}
else if(o===22){if(!b)return e(4);r=(a>>>0)%(b>>>0)|0;}
else if(o===24)r=a&b;
else if(o===25)r=a|b;
else if(o===26)r=a^b;
else if(o===28)r=a<<(b&31);
else if(o===29)r=a>>(b&31);
else if(o===30)r=a>>>(b&31)|0;
else if(o===32)r=+(a===b);
else if(o===33)r=+(a<b);
else r=+(a>>>0<b>>>0);
s-=2;D[s++]=r;
}else if(o<53){
const g=((p[n-2]|p[n-1]<<8)<<16)>>16;
if(o===48)x=n+g;
else if(o===49){const v=D[--s];if(!v)x=n+g;}
else if(o===50){const v=D[--s];if(v)x=n+g;}
else if(o===51){if(c===64)return e(7);E[c++]=n;x=p[n-2]|p[n-1]<<8;}
else{if(!c)return e(8);x=E[--c];}
}else if(o<66){
const a=D[s-1];
if(a<0||a>255)return e(6);
if(o===64)D[s-1]=M[a];
else{const v=D[s-2];s-=2;M[a]=v;}
}else{
if(o===80){const y=String(D[s-1]);if(l+y.length>65536)return e(11);s--;u.set(Buffer.from(y),l);l+=y.length;}
else if(o===81){if(l+1>65536)return e(11);u[l++]=D[--s]&255;}
else if(o===82)D[s++]=j<q.length?q[j++]:-1;
else return e(D[--s]&255);
}
}
}
for(const id of readdirSync(I).sort()){
const[ex,out]=run(readFileSync(I+'/'+id+'/program.bin'),readFileSync(I+'/'+id+'/input.bin'));
mkdirSync(O+'/'+id,{recursive:true});
writeFileSync(O+'/'+id+'/stdout.bin',out);
writeFileSync(O+'/'+id+'/exit.txt',ex+'\n');
}
