// Script for navigation bar
const bar=document.querySelector("#bar");
const nav=document.querySelector("#navbar");
const close=document.getElementById("close");

bar.addEventListener('click',()=>{
    nav.classList.add('active');
})
close.addEventListener('click',()=>{
    nav.classList.remove('active');
})




