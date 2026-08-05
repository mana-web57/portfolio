
const menuBtn=document.querySelector('.menu-toggle');const nav=document.querySelector('.site-nav');
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');document.body.style.overflow=''}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const topBtn=document.querySelector('.back-to-top');window.addEventListener('scroll',()=>topBtn?.classList.toggle('show',scrollY>500));topBtn?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

const voices=[...document.querySelectorAll('.voice')];let voiceIndex=0;
function showVoice(i){if(!voices.length)return;voices[voiceIndex].classList.remove('is-active');voiceIndex=(i+voices.length)%voices.length;voices[voiceIndex].classList.add('is-active')}
document.querySelector('.slider-btn.next')?.addEventListener('click',()=>showVoice(voiceIndex+1));
document.querySelector('.slider-btn.prev')?.addEventListener('click',()=>showVoice(voiceIndex-1));
if(voices.length)setInterval(()=>showVoice(voiceIndex+1),6500);

function filterCards(area,price,layout){const cards=[...document.querySelectorAll('.property-item,.property-card[data-area]')];let count=0;cards.forEach(card=>{const okArea=!area||card.dataset.area===area;const okPrice=!price||Number(card.dataset.price)<=Number(price);const okLayout=!layout||card.dataset.layout===layout;const show=okArea&&okPrice&&okLayout;card.style.display=show?'':'none';if(show)count++});document.getElementById('resultCount')&&(document.getElementById('resultCount').textContent=count);document.getElementById('noResult')&&(document.getElementById('noResult').style.display=count?'none':'block')}

document.getElementById('homeSearchBtn')?.addEventListener('click',()=>{const a=document.getElementById('areaSearch').value,p=document.getElementById('priceSearch').value,l=document.getElementById('layoutSearch').value;location.href=`property.html?area=${encodeURIComponent(a)}&price=${encodeURIComponent(p)}&layout=${encodeURIComponent(l)}`});

const params=new URLSearchParams(location.search);if(document.getElementById('filterArea')){document.getElementById('filterArea').value=params.get('area')||'';document.getElementById('filterPrice').value=params.get('price')||'';document.getElementById('filterLayout').value=params.get('layout')||'';filterCards(document.getElementById('filterArea').value,document.getElementById('filterPrice').value,document.getElementById('filterLayout').value)}
document.getElementById('filterBtn')?.addEventListener('click',()=>filterCards(document.getElementById('filterArea').value,document.getElementById('filterPrice').value,document.getElementById('filterLayout').value));
document.getElementById('resetBtn')?.addEventListener('click',()=>{document.getElementById('filterArea').value='';document.getElementById('filterPrice').value='';document.getElementById('filterLayout').value='';filterCards('','','')});

document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(t=>t.classList.remove('is-active'));tab.classList.add('is-active');document.getElementById('contactType').value=tab.dataset.tab}));
document.getElementById('contactForm')?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('formMessage').textContent='入力内容を確認しました。デモサイトのため実際には送信されません。'});
