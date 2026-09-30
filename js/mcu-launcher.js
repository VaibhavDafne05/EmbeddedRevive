
(function(){
  function init(){
    if(document.getElementById("mcu-launcher"))return;
    const rail=document.getElementById("rail");
    if(!rail)return;
    const box=document.createElement("div");
    box.id="mcu-launcher";
    box.className="mcu-launcher";
    box.innerHTML='<div><b>MCU Fundamentals</b><small>8051 → ARM Cortex-M</small></div><button type="button">Open</button>';
    box.querySelector("button").onclick=function(){
      const tab=document.getElementById("tab-mcu");
      if(tab)tab.click();
      else alert("MCU track is loaded. Select the MCU course tab.");
    };
    const list = document.getElementById("rail-list");
    if (list) rail.insertBefore(box, list);
    else rail.appendChild(box);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();