var FONE="5534991680413"; // LimpJá: (34) 99168-0413
var $=function(i){return document.getElementById(i)};
var RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
function wa(t){return"https://wa.me/"+FONE+"?text="+encodeURIComponent(t)}
document.querySelectorAll("[data-wa]").forEach(function(a){a.href=wa(a.dataset.wa);a.target="_blank";a.rel="noopener"});
// pedido pelo WhatsApp
function sim(){var m=+$("m2").value;$("mv").textContent=m;
$("go").href=wa("Olá, LimpJá! Sou "+($("nm").value.trim()||"cliente")+". Quero um orçamento de "+$("sv").value+" para cerca de "+m+" m².");$("go").target="_blank";$("go").rel="noopener"}
["m2","sv","nm"].forEach(function(i){$(i).addEventListener("input",sim)});sim();
// antes e depois (mouse, teclado e toque)
(function(){var b=$("ba"),r=$("rg");function set(v){v=Math.max(0,Math.min(100,v));r.value=v;$("af").style.clipPath="inset(0 0 0 "+v+"%)";$("ln").style.left=v+"%"}
r.addEventListener("input",function(){set(+r.value)});
function pos(x){var k=b.getBoundingClientRect();set((x-k.left)/k.width*100)}
var drag=false,sx=0,sy=0,lock=null;
b.addEventListener("touchstart",function(e){var t=e.touches[0];sx=t.clientX;sy=t.clientY;lock=null;drag=true},{passive:true});
b.addEventListener("touchmove",function(e){if(!drag)return;var t=e.touches[0];if(lock===null){var dx=Math.abs(t.clientX-sx),dy=Math.abs(t.clientY-sy);if(dx+dy<6)return;lock=dx>dy}if(lock){e.preventDefault();pos(t.clientX)}},{passive:false});
b.addEventListener("touchend",function(){if(drag&&lock===null){}drag=false});
window.__ba=set})();
// tema
$("th").addEventListener("click",function(){var r=document.documentElement,d=r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=d?"light":"dark"});
// nav, progresso
addEventListener("scroll",function(){$("nv").classList.toggle("s",scrollY>60);var h=document.documentElement;$("pg").style.width=(scrollY/(h.scrollHeight-innerHeight)*100)+"%"},{passive:true});
// contadores
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var el=en.target,n=+el.dataset.n,i=0,s=Math.max(1,Math.round(n/50));if(RM){io.unobserve(el);return}el.textContent=0;var id=setInterval(function(){i=Math.min(n,i+s);el.textContent=i;if(i>=n)clearInterval(id)},28);io.unobserve(el)})},{threshold:.6});
document.querySelectorAll("[data-n]").forEach(function(e){io.observe(e)});
// entrada escalonada dos compromissos
var ro=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var el=en.target,sib=[].slice.call(el.parentNode.children);el.style.transitionDelay=(sib.indexOf(el)*0.12)+"s";el.classList.add("in");ro.unobserve(el)})},{threshold:.15,rootMargin:"0px 0px -40px 0px"});
document.querySelectorAll(".rv").forEach(function(e){if(RM)e.classList.add("in");else ro.observe(e)});
// como funciona: cascata dos passos + conector
(function(){var w=$("steps"),st=[].slice.call(w.querySelectorAll(".stp"));
function show(){w.classList.add("in");st.forEach(function(e,i){e.style.transitionDelay=(RM?0:i*0.28)+"s";e.classList.add("in")})}
if(RM)return show();var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){show();o.disconnect()}},{threshold:.2});o.observe(w)})();
// depoimentos: carrossel sem biblioteca, loop infinito, autoplay sempre ativo (fade curto se reduced-motion)
(function(){var car=$("car"),vp=$("cvp"),tr=$("ctr"),sl=[].slice.call(tr.children),dots=$("cdots"),N=sl.length,i=0,timer=null,resumeT=null,hover=false,busy=false,DELAY=4500,RESUME=6000;
// clones no fim para o 8 -> 1 sem tranco
sl.forEach(function(s){var c=s.cloneNode(true);c.setAttribute("aria-hidden","true");c.setAttribute("inert","");c.classList.add("cl");c.removeAttribute("aria-label");tr.appendChild(c)});
function pv(){return innerWidth>=960?3:innerWidth>=640?2:1}
function step(){return sl[0].getBoundingClientRect().width+parseFloat(getComputedStyle(tr).columnGap||18)}
function place(k,anim){if(!anim)tr.classList.add("nt");tr.style.transform="translateX("+(-k*step())+"px)";if(!anim){void tr.offsetWidth;tr.classList.remove("nt")}}
function mark(){var r=((i%N)+N)%N;[].forEach.call(dots.children,function(d,n){d.setAttribute("aria-current",n===r?"true":"false")});
sl.forEach(function(s,n){var off=(n-r+N)%N;s.setAttribute("aria-hidden",off<pv()?"false":"true")})}
for(var k=0;k<N;k++){var b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Ir para o depoimento "+(k+1));(function(k){b.onclick=function(){user();go(k)}})(k);dots.appendChild(b)}
function go(k){if(busy)return;
 if(RM){// fade curto, sem deslize
  busy=true;i=((k%N)+N)%N;var f=tr.animate([{opacity:1},{opacity:0}],{duration:180,easing:"ease-out"});
  f.onfinish=function(){place(i,false);mark();tr.animate([{opacity:0},{opacity:1}],{duration:220,easing:"ease-in"}).onfinish=function(){busy=false}};return}
 if(k<0){i=N;place(N,false);k=N-1}
 i=k;place(i,true);mark();
 if(i>=N){busy=true;setTimeout(function(){i=i-N;place(i,false);busy=false},620)}}
function next(){go(i+1)}
function start(){clearInterval(timer);if(hover)return;timer=setInterval(next,DELAY)}
function stop(){clearInterval(timer);timer=null}
var pending=false;function user(){stop();clearTimeout(resumeT);pending=true;tr.setAttribute("aria-live","polite");resumeT=setTimeout(function(){pending=false;tr.setAttribute("aria-live","off");start()},RESUME)}
$("cprev").onclick=function(){user();go(i-1)};$("cnext").onclick=function(){user();go(i+1)};
car.addEventListener("keydown",function(e){if(e.key==="ArrowLeft"){e.preventDefault();user();go(i-1)}if(e.key==="ArrowRight"){e.preventDefault();user();go(i+1)}});
car.addEventListener("mouseenter",function(){hover=true;stop()});
car.addEventListener("mouseleave",function(){hover=false;if(!pending)start()});
// arrasto (mouse) e swipe (toque)
var sx=0,sy=0,dx=0,dn=false,lock=null,base=0;
function down(x,y){if(busy)return;dn=true;sx=x;sy=y;dx=0;lock=null;base=-i*step();tr.classList.add("nt")}
function move(x,y,e){if(!dn)return;var mx=x-sx,my=y-sy;if(lock===null){if(Math.abs(mx)+Math.abs(my)<6)return;lock=Math.abs(mx)>Math.abs(my)}if(!lock)return;if(e&&e.cancelable)e.preventDefault();dx=mx;vp.classList.add("dg");if(!RM)tr.style.transform="translateX("+(base+dx)+"px)"}
function up(){if(!dn)return;dn=false;vp.classList.remove("dg");tr.classList.remove("nt");var t=Math.max(50,step()*0.18);
 if(lock&&Math.abs(dx)>t){user();go(dx<0?i+1:i-1)}else place(i,true)}
vp.addEventListener("mousedown",function(e){e.preventDefault();down(e.clientX,e.clientY)});addEventListener("mousemove",function(e){move(e.clientX,e.clientY)});addEventListener("mouseup",up);
vp.addEventListener("touchstart",function(e){var t=e.touches[0];down(t.clientX,t.clientY)},{passive:true});
vp.addEventListener("touchmove",function(e){var t=e.touches[0];move(t.clientX,t.clientY,e)},{passive:false});
vp.addEventListener("touchend",up);
var rw;addEventListener("resize",function(){clearTimeout(rw);rw=setTimeout(function(){if(i>=N)i-=N;place(i,false);mark()},150)});
place(0,false);mark();start();window.__car=function(){return ((i%N)+N)%N}})();
// FAQ: cascata + acordeão com altura animada
(function(){var it=[].slice.call(document.querySelectorAll("#faqlist details"));
it.forEach(function(d){d.classList.add("rv");d.addEventListener("transitionend",function(e){if(e.propertyName==="opacity")d.style.transitionDelay="0s"});if(RM)d.classList.add("in");else ro.observe(d);
var s=d.querySelector("summary"),a=d.querySelector(".ans"),anim=null;
s.addEventListener("click",function(e){e.preventDefault();if(anim)anim.cancel();
var dur=RM?0:380,ease="cubic-bezier(.2,.8,.2,1)";
if(!d.open){d.open=true;d.classList.add("on");var h=a.scrollHeight;anim=a.animate([{height:"0px",opacity:0},{height:h+"px",opacity:1}],{duration:dur,easing:ease});anim.onfinish=function(){anim=null}}
else{d.classList.remove("on");var h2=a.scrollHeight;anim=a.animate([{height:h2+"px",opacity:1},{height:"0px",opacity:0}],{duration:dur,easing:ease});anim.onfinish=function(){d.open=false;anim=null}}})})})();
// vidro embaçado: o visitante limpa com o mouse ou o dedo
(function(){var c=$("fog"),h=document.querySelector(".hero"),x=c.getContext("2d",{willReadFrequently:true}),done=false,n=0;
function rs(){c.width=h.clientWidth;c.height=h.clientHeight;x.globalCompositeOperation="source-over";x.fillStyle="rgba(110,165,205,.9)";x.fillRect(0,0,c.width,c.height)}
rs();addEventListener("resize",function(){if(!done)rs()});
function clr(){done=true;c.classList.add("off");$("hint").style.opacity=0}
h.addEventListener("pointermove",function(e){if(done)return;var r=h.getBoundingClientRect();x.globalCompositeOperation="destination-out";x.beginPath();x.arc(e.clientX-r.left,e.clientY-r.top,64,0,7);x.fill();$("hint").style.opacity=0;
if(++n%20==0){var d=x.getImageData(0,0,c.width,c.height).data,k=0;for(var i=3;i<d.length;i+=160)if(d[i]<40)k++;if(k>d.length/160*.5)clr()}});
addEventListener("scroll",function(){if(scrollY>80)clr()},{passive:true});setTimeout(clr,7000)})();
// botão flutuante, magnético, saída
setTimeout(function(){$("wa").classList.add("on")},3500);
if(!RM)document.querySelectorAll(".btn").forEach(function(b){b.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+(e.clientX-r.left-r.width/2)*.18+"px,"+(e.clientY-r.top-r.height/2)*.3+"px)"});b.addEventListener("mouseleave",function(){b.style.transform=""})});
var shown=false;document.addEventListener("mouseout",function(e){if(!shown&&e.clientY<5&&!e.relatedTarget){shown=true;$("pop").classList.add("on")}});
$("px").onclick=function(){$("pop").classList.remove("on")};
// scroll suave + rolagem horizontal fixada dos serviços (bibliotecas locais em vendor/)
try{if(window.gsap&&window.ScrollTrigger&&window.Lenis&&!RM){
gsap.registerPlugin(ScrollTrigger);var L=new Lenis();L.on("scroll",ScrollTrigger.update);gsap.ticker.add(function(t){L.raf(t*1000)});gsap.ticker.lagSmoothing(0);
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener("click",function(e){var t=document.querySelector(a.getAttribute("href"));if(t){e.preventDefault();L.scrollTo(t,{offset:-80})}})});
gsap.matchMedia().add("(min-width:900px)",function(){var t=$("trk");gsap.to(t,{x:function(){return-(t.scrollWidth-innerWidth+44)},ease:"none",scrollTrigger:{trigger:"#servicos",pin:true,scrub:.6,end:function(){return"+="+t.scrollWidth},invalidateOnRefresh:true}})})}}catch(e){}
