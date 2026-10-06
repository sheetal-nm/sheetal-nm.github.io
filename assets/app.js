const qs=(s,r=document)=>r.querySelector(s),qsa=(s,r=document)=>[...r.querySelectorAll(s)];
qs('#year').textContent=new Date().getFullYear();

const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target)}}),{threshold:.13,rootMargin:'0px 0px -7% 0px'});
qsa('.reveal').forEach(el=>ro.observe(el));

const statement=qs('.statement-copy');
if(statement){const wo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){qsa('.word',statement).forEach((w,i)=>setTimeout(()=>w.classList.add('visible'),i*80));wo.unobserve(statement)}}),{threshold:.3});wo.observe(statement)}

const progress=qs('.progress span');
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?scrollY/max*100:0)+'%'},{passive:true});

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const tick=()=>{qsa('[data-parallax]').forEach(el=>{const s=Number(el.dataset.parallax||0),r=el.parentElement.getBoundingClientRect(),rel=innerHeight/2-(r.top+r.height/2);el.style.transform=\`translate3d(0,\${rel*s}px,0)\`});requestAnimationFrame(tick)};requestAnimationFrame(tick)
}

const dot=qs('.cursor-dot'),ring=qs('.cursor-ring');let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=\`translate(\${mx}px,\${my}px) translate(-50%,-50%)\`});
(function ct(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.transform=\`translate(\${rx}px,\${ry}px) translate(-50%,-50%)\`;requestAnimationFrame(ct)})();
qsa('a,button,.project-media').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('active'));el.addEventListener('mouseleave',()=>ring.classList.remove('active'))});

qsa('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{if(innerWidth<900)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=\`perspective(1200px) rotateX(\${-y*3}deg) rotateY(\${x*3}deg) scale(.995)\`});card.addEventListener('pointerleave',()=>card.style.transform='')});
qsa('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{if(innerWidth<900)return;const r=el.getBoundingClientRect(),x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2);el.style.transform=\`translate(\${x*.13}px,\${y*.13}px)\`});el.addEventListener('pointerleave',()=>el.style.transform='')});

const menuBtn=qs('.menu-btn'),navLinks=qs('.nav-links');
menuBtn?.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');document.body.classList.toggle('menu-open',open);menuBtn.setAttribute('aria-expanded',String(open))});
qsa('.nav-links a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');document.body.classList.remove('menu-open');menuBtn?.setAttribute('aria-expanded','false')}));

const lb=qs('.lightbox'),lbImg=qs('.lightbox img'),lbCap=qs('.lightbox figcaption');
qsa('[data-lightbox]').forEach(btn=>btn.addEventListener('click',()=>{lbImg.src=btn.dataset.lightbox;lbCap.textContent=btn.dataset.title||'';lb.classList.add('open');lb.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}));
function closeLB(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.style.overflow=''}
qs('.lightbox-close')?.addEventListener('click',closeLB);lb?.addEventListener('click',e=>{if(e.target===lb)closeLB()});addEventListener('keydown',e=>{if(e.key==='Escape')closeLB()});