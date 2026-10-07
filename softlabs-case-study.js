document.documentElement.classList.add('motion-ready');

const qs=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>[...r.querySelectorAll(s)];

qs('#year').textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:'0px 0px -6% 0px'});

qsa('.reveal').forEach(el=>observer.observe(el));

const progress=qs('.progress span');
addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(max ? scrollY/max*100 : 0)+'%';
},{passive:true});