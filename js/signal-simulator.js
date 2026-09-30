/* VehicleSpeed data + fault simulator */
(function(){
  const state = {
    bytes:[0x42,0x1C,0,0,0,0,0,0],
    fault:"normal",
    running:false,
    ticks:0
  };
  const faults = {
    normal:{name:"Normal",desc:"Valid message arrives every 20 ms.",severity:"OK"},
    timeout:{name:"Timeout",desc:"No new frame arrives for more than 100 ms.",severity:"TIMEOUT"},
    range:{name:"Invalid range",desc:"Decoded speed exceeds the configured engineering range.",severity:"INVALID"},
    corrupt:{name:"Corrupted payload",desc:"Payload is changed so the decoded value no longer matches the expected source.",severity:"CORRUPT"},
    stale:{name:"Stale data",desc:"A previously valid value remains unchanged beyond its freshness window.",severity:"STALE"}
  };

  function clamp(n,a,b){return Math.max(a,Math.min(b,n));}
  function hex(n){return "0x"+n.toString(16).toUpperCase().padStart(2,"0");}
  function decode(bytes){
    const raw=(bytes[0] | (bytes[1]<<8))>>>0;
    return {raw:raw,kmh:raw*0.01};
  }
  function render(){
    const root=document.getElementById("signal-simulator");
    if(!root)return;
    const d=decode(state.bytes);
    const f=faults[state.fault];
    let value=d.kmh, status="VALID", statusClass="ok";
    if(state.fault==="range"){value=700;status="OUT OF RANGE";statusClass="bad";}
    if(state.fault==="timeout"){status="TIMEOUT";statusClass="bad";}
    if(state.fault==="corrupt"){status="CRC / DATA ERROR";statusClass="warn";}
    if(state.fault==="stale"){status="STALE";statusClass="warn";}
    const staleAge=state.fault==="normal"?20:(state.fault==="timeout"?140:(state.fault==="stale"?160:20));

    root.querySelector(".sim-bytes").innerHTML=state.bytes.map((b,i)=>
      `<label>B${i}<input data-byte="${i}" value="${hex(b).slice(2)}" maxlength="2" inputmode="text"></label>`).join("");
    root.querySelector(".sim-raw").textContent=d.raw;
    root.querySelector(".sim-value").textContent=value.toFixed(2)+" km/h";
    root.querySelector(".sim-status").textContent=status;
    root.querySelector(".sim-status").className="sim-status "+statusClass;
    root.querySelector(".sim-age").textContent=staleAge+" ms";
    root.querySelector(".sim-fault-desc").textContent=f.desc;

    const chain=root.querySelector(".sim-chain");
    const stages=[
      ["CAN","0x180 / DLC 8"],
      ["MCAL","CanDrv → CanIf"],
      ["PduR","VehicleSpeed_Pdu"],
      ["COM","raw "+d.raw],
      ["I-Signal","VehicleSpeed"],
      ["RTE","Rte_Read_VehicleSpeed"],
      ["SWC","engineering value"]
    ];
    chain.innerHTML=stages.map((s,i)=>{
      let sub=s[1];
      if(i===3) sub="raw "+d.raw;
      if(i===4) sub=state.fault==="timeout"?"no fresh sample":state.fault==="range"?"range violation":state.fault==="stale"?"freshness expired":state.fault==="corrupt"?"payload integrity issue":d.kmh.toFixed(2)+" km/h";
      if(i===5) sub=state.fault==="timeout"?"invalid/stale":value.toFixed(2)+" km/h";
      if(i===6) sub=status;
      return `<div class="sim-node ${i===stages.length-1?"last":""}"><b>${s[0]}</b><small>${sub}</small></div>`;
    }).join("");

    root.querySelectorAll("[data-byte]").forEach(inp=>{
      inp.addEventListener("change",()=>{
        const i=Number(inp.dataset.byte);
        let v=parseInt(inp.value,16);
        if(Number.isNaN(v))v=0;
        state.bytes[i]=clamp(v,0,255);
        render();
      });
    });
    root.querySelectorAll("[data-fault]").forEach(btn=>{
      btn.classList.toggle("selected",btn.dataset.fault===state.fault);
      btn.onclick=()=>{state.fault=btn.dataset.fault;render();};
    });
    root.querySelector(".sim-reset").onclick=()=>{
      state.bytes=[0x42,0x1C,0,0,0,0,0,0];state.fault="normal";render();
    };
  }

  function init(){
    if(document.getElementById("signal-simulator"))return;
    const btn=document.createElement("button");
    btn.className="sim-open";btn.type="button";
    btn.setAttribute("aria-haspopup","dialog");
    btn.innerHTML="<span>ECU Signal Simulator</span><small>CAN → COM → RTE → SWC</small>";
    const tabs=document.querySelector(".course-bar")||document.querySelector(".course-tabs");
    if(tabs)tabs.appendChild(btn);

    const modal=document.createElement("section");
    modal.id="signal-simulator";modal.className="sim-modal";modal.hidden=true;
    modal.innerHTML=`
      <div class="sim-backdrop" data-sim-close></div>
      <div class="sim-panel" role="dialog" aria-modal="true" aria-labelledby="sim-title">
        <header class="sim-head"><div><p class="kicker">Embedded ECU simulator</p>
        <h2 id="sim-title">VehicleSpeed data path</h2>
        <p>Change the CAN payload and inject communication faults. Watch the value propagate through the AUTOSAR stack.</p></div>
        <button class="sim-close" type="button" data-sim-close>×</button></header>
        <section class="sim-work">
          <div class="sim-controls">
            <h3>1 · CAN payload</h3>
            <p>CAN ID <b>0x180</b> · DLC 8 · little-endian · 0.01 km/h/bit</p>
            <div class="sim-bytes"></div>
            <button type="button" class="ctrl sim-reset">Reset signal</button>
            <h3>2 · Inject a fault</h3>
            <div class="sim-faults">
              <button data-fault="normal">Normal</button>
              <button data-fault="timeout">Timeout</button>
              <button data-fault="range">Invalid range</button>
              <button data-fault="corrupt">Corrupted payload</button>
              <button data-fault="stale">Stale data</button>
            </div>
            <p class="sim-fault-desc"></p>
          </div>
          <div class="sim-result">
            <div class="sim-metrics">
              <div><span>Raw</span><b class="sim-raw"></b></div>
              <div><span>Engineering value</span><b class="sim-value"></b></div>
              <div><span>Data age</span><b class="sim-age"></b></div>
              <div><span>Status</span><b class="sim-status"></b></div>
            </div>
            <h3>3 · Observe the stack</h3>
            <div class="sim-chain"></div>
            <div class="sim-explain"><b>What to notice</b><p>Hardware receives bytes; communication services interpret configured signal metadata; the RTE exposes application data. A fault becomes meaningful only when detection and reaction are defined.</p></div>
          </div>
        </section>
      </div>`;
    document.body.appendChild(modal);

    function open(){modal.hidden=false;document.body.classList.add("sim-opened");render();}
    function close(){modal.hidden=true;document.body.classList.remove("sim-opened");}
    btn.onclick=open;
    modal.querySelectorAll("[data-sim-close]").forEach(x=>x.addEventListener("click",close));
    document.addEventListener("keydown",e=>{if(!modal.hidden&&e.key==="Escape")close();});
    render();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();