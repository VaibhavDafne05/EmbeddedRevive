/* Interactive ECU Signal Journey */
const SIGNAL_JOURNEY = {
  title: "VehicleSpeed — one signal, end to end",
  subtitle: "Follow the same vehicle signal from the CAN wire to the application runnable.",
  signal: { name:"VehicleSpeed", canId:"0x180", cycle:"20 ms", length:"16 bit", byteOrder:"Intel / little-endian", factor:"0.01 km/h per bit", timeout:"100 ms" },
  stages: [
    {id:"vehicle",short:"Vehicle",title:"Physical vehicle value",layer:"Vehicle / sensor domain",what:"The vehicle produces a speed value. The transmitting ECU turns that physical quantity into a network representation.",representation:"VehicleSpeed = 72.34 km/h",evidence:["Signal source defined","Operating range defined","Update period defined"],requirement:"REQ-VSPD-001 — The vehicle-speed source shall provide VehicleSpeed with a 20 ms update period within the configured operating range."},
    {id:"can-frame",short:"CAN",title:"CAN frame",layer:"CAN network",what:"The signal is packed into a CAN data frame. The CAN identifier identifies the message; the signal definition identifies the bits inside it.",representation:"CAN ID 0x180 · DLC 8 · Data: 0x42 0x1C 0x00 0x00 0x00 0x00 0x00 0x00",evidence:["CAN ID allocation","DLC / payload definition","Cycle-time definition"],requirement:"REQ-VSPD-002 — The transmitting ECU shall publish the VehicleSpeed message using CAN ID 0x180 every 20 ms."},
    {id:"controller",short:"CAN Ctrl",title:"CAN controller",layer:"Microcontroller peripheral",what:"The CAN peripheral receives the frame from the transceiver and exposes the received message to the software stack.",representation:"RX mailbox → CAN controller → receive event",evidence:["Controller configuration","Acceptance/filter configuration","RX event handling"],requirement:"REQ-VSPD-003 — The ECU shall receive CAN ID 0x180 through the configured CAN controller without losing valid frames under the specified bus load."},
    {id:"mcal",short:"MCAL",title:"CanDrv / CanIf",layer:"AUTOSAR MCAL + ECU abstraction",what:"The microcontroller-specific CAN driver interacts with the controller. CanIf provides a standardized interface upward.",representation:"CanDrv → CanIf → received PDU",evidence:["MCAL configuration","Controller/channel mapping","CanIf PDU configuration"],requirement:"REQ-VSPD-004 — The communication stack shall expose the received VehicleSpeed PDU to upper BSW using the configured CanIf path."},
    {id:"pdu",short:"PduR",title:"PDU routing",layer:"AUTOSAR communication services",what:"PduR routes the configured PDU between communication modules.",representation:"VehicleSpeed_Pdu → PduR route → COM",evidence:["PDU routing table","Rx PDU handle","Destination module configuration"],requirement:"REQ-VSPD-005 — PduR shall route VehicleSpeed_Pdu to the configured COM destination."},
    {id:"com",short:"COM",title:"Signal unpacking",layer:"AUTOSAR COM",what:"COM extracts the configured signal from the PDU and applies start position, length, byte order, factor and offset.",representation:"Raw 7234 → 7234 × 0.01 + 0 = 72.34 km/h",evidence:["Signal start bit / length","Endianness","Factor / offset","Timeout configuration"],requirement:"REQ-VSPD-006 — COM shall unpack VehicleSpeed from VehicleSpeed_Pdu using the configured 16-bit little-endian representation and 0.01 scaling."},
    {id:"isignal",short:"I-Signal",title:"I-Signal representation",layer:"AUTOSAR communication model",what:"The signal is represented as a typed communication object connected to the application interface. Generated names depend on ECU configuration and toolchain.",representation:"I-Signal: VehicleSpeed · configured data type",evidence:["Signal definition","Data type mapping","Sender / receiver mapping"],requirement:"REQ-VSPD-007 — The configured I-Signal shall expose VehicleSpeed with the agreed data type, range and communication semantics."},
    {id:"rte",short:"RTE",title:"RTE interface",layer:"AUTOSAR Runtime Environment",what:"The RTE connects the application SWC to the configured communication path.",representation:"Rte_Read_VehicleSpeed(&speed)",evidence:["Port interface","Data element","RTE mapping","Generated API"],requirement:"REQ-VSPD-008 — The RTE shall provide the VehicleSpeed data element to the consuming SWC through its configured receiver port."},
    {id:"swc",short:"SWC",title:"Application SWC",layer:"Application software",what:"The application consumes the signal as an engineering value and makes a product decision.",representation:"VehicleSpeed = 72.34 km/h → application logic",evidence:["SWC interface","Runnable mapping","Application unit tests"],requirement:"REQ-VSPD-009 — The consuming SWC shall use the received VehicleSpeed value according to the application behavior specification."},
    {id:"runnable",short:"Runnable",title:"Runnable execution",layer:"Application execution",what:"A configured RTE event activates the runnable. Its execution context, period and deadline must match timing assumptions.",representation:"20 ms event → Runnable → Rte_Read → process → output",evidence:["RTE event","OS task mapping","Timing budget","Unit / integration test"],requirement:"REQ-VSPD-010 — The VehicleSpeed-consuming runnable shall execute within its configured timing budget and handle stale data according to the specified timeout behavior."}
  ]
};

(function(){
  function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function init(){
    if(document.getElementById("signal-journey")) return;
    const openBtn=document.createElement("button");
    openBtn.type="button"; openBtn.id="signal-journey-open"; openBtn.className="journey-open";
    openBtn.setAttribute("aria-haspopup","dialog");
    openBtn.innerHTML="<span>Signal Journey</span><small>VehicleSpeed · end to end</small>";
    const tabs=document.querySelector(".course-bar")||document.querySelector(".course-tabs"); if(tabs) tabs.appendChild(openBtn);

    const modal=document.createElement("section");
    modal.id="signal-journey"; modal.className="journey-modal"; modal.hidden=true;
    modal.innerHTML=`<div class="journey-backdrop" data-journey-close></div>
      <div class="journey-panel" role="dialog" aria-modal="true" aria-labelledby="journey-title">
        <header class="journey-head"><div><p class="kicker">Interactive architecture</p>
        <h2 id="journey-title">${esc(SIGNAL_JOURNEY.title)}</h2><p>${esc(SIGNAL_JOURNEY.subtitle)}</p></div>
        <button type="button" class="journey-close" data-journey-close aria-label="Close">×</button></header>
        <div class="journey-grid"><nav class="journey-stages" aria-label="Signal stages"></nav><article class="journey-detail"></article></div>
        <footer class="journey-foot"><div><b>Signal definition</b><span id="journey-signal-summary"></span></div>
        <div><b>Flow</b><span>Vehicle → CAN → MCAL → PduR → COM → I-Signal → RTE → SWC → Runnable</span></div></footer>
      </div>`;
    document.body.appendChild(modal);
    const nav=modal.querySelector(".journey-stages"), detail=modal.querySelector(".journey-detail");
    modal.querySelector("#journey-signal-summary").textContent =
      SIGNAL_JOURNEY.signal.name+" · ID "+SIGNAL_JOURNEY.signal.canId+" · "+SIGNAL_JOURNEY.signal.length+" · "+SIGNAL_JOURNEY.signal.cycle;
    let selected=0;

    function render(){
      nav.innerHTML=SIGNAL_JOURNEY.stages.map((s,i)=>`<button type="button" class="journey-stage ${i===selected?"selected":""}" data-stage="${i}">
        <span class="journey-num">${String(i+1).padStart(2,"0")}</span><span><b>${esc(s.short)}</b><small>${esc(s.layer)}</small></span></button>`).join("");
      const s=SIGNAL_JOURNEY.stages[selected];
      detail.innerHTML=`<div class="journey-progress"><span style="width:${((selected+1)/SIGNAL_JOURNEY.stages.length)*100}%"></span></div>
        <p class="journey-kicker">${esc(s.layer)}</p><h3>${esc(s.title)}</h3><p class="journey-what">${esc(s.what)}</p>
        <div class="journey-representation"><span>Representation at this layer</span><code>${esc(s.representation)}</code></div>
        <div class="journey-cols"><section><h4>Requirement</h4><p>${esc(s.requirement)}</p></section>
        <section><h4>Evidence</h4><ul>${s.evidence.map(x=>"<li>"+esc(x)+"</li>").join("")}</ul></section></div>
        <div class="journey-nav"><button type="button" class="ctrl" id="journey-prev" ${selected===0?"disabled":""}>Previous stage</button>
        <span>${selected+1} / ${SIGNAL_JOURNEY.stages.length}</span>
        <button type="button" class="ctrl primary" id="journey-next" ${selected===SIGNAL_JOURNEY.stages.length-1?"disabled":""}>Next stage</button></div>`;
      nav.querySelectorAll("[data-stage]").forEach(b=>b.addEventListener("click",()=>{selected=Number(b.dataset.stage);render();}));
      const p=document.getElementById("journey-prev"), n=document.getElementById("journey-next");
      if(p)p.addEventListener("click",()=>{selected--;render();}); if(n)n.addEventListener("click",()=>{selected++;render();});
    }
    function open(){modal.hidden=false;document.body.classList.add("journey-opened");selected=0;render();}
    function close(){modal.hidden=true;document.body.classList.remove("journey-opened");}
    openBtn.addEventListener("click",open);
    modal.querySelectorAll("[data-journey-close]").forEach(x=>x.addEventListener("click",close));
    document.addEventListener("keydown",e=>{
      if(modal.hidden)return;
      if(e.key==="Escape")close();
      if(e.key==="ArrowDown"&&selected<SIGNAL_JOURNEY.stages.length-1){selected++;render();}
      if(e.key==="ArrowUp"&&selected>0){selected--;render();}
    });
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();