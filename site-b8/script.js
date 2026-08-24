const ids = ['leads','agents','resp','delay','qual','rdv','close','value','commission'];
const defaults = { leads:200, agents:3, resp:50, delay:4.5, qual:45, rdv:10, close:1.2, value:2800000, commission:2 };

const presets = {
  boutique: { leads:80,  agents:3,  resp:45, qual:40, rdv:8,  close:1.0 },
  midsize:  { leads:200, agents:12, resp:50, qual:45, rdv:10, close:1.2 },
  premium:  { leads:450, agents:35, resp:55, qual:50, rdv:12, close:1.5 }
};

ids.forEach(id=>{
  const slider = document.getElementById(id);
  const num = document.getElementById(id+'Num');
  slider.addEventListener('input', ()=>{ num.value = slider.value; calculate(); });
  num.addEventListener('input', ()=>{
    let v = parseFloat(num.value);
    if(isNaN(v)) return;
    v = Math.min(Math.max(v, parseFloat(slider.min)), parseFloat(slider.max));
    slider.value = v; calculate();
  });
});

function applyPreset(name, btn){
  document.querySelectorAll('.preset').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const p = presets[name];
  Object.keys(p).forEach(key=>{
    document.getElementById(key).value = p[key];
    document.getElementById(key+'Num').value = p[key];
  });
  calculate();
}

function toggleFinetune(){
  const el = document.getElementById('finetuneFields');
  const toggle = document.querySelector('.finetune-toggle');
  const plus = document.getElementById('finetunePlus');
  el.classList.toggle('open');
  toggle.classList.toggle('open');
  plus.textContent = el.classList.contains('open') ? '–' : '+';
}

function toggleBreakdown(){
  const el = document.getElementById('breakdownMini');
  const plus = document.getElementById('breakdownPlus');
  el.classList.toggle('open');
  plus.textContent = el.classList.contains('open') ? '–' : '+';
}

function toggleDetailed(){
  const el = document.getElementById('detailedSection');
  const btn = document.getElementById('detailedBtn');
  el.classList.toggle('open');
  btn.textContent = el.classList.contains('open') ? 'Masquer le calculateur détaillé' : 'Accéder au calculateur détaillé';
  if(el.classList.contains('open')){
    setTimeout(()=> el.scrollIntoView({behavior:'smooth', block:'start'}), 120);
  }
}

function fmtAED(n){
  n = Math.round(n);
  return n.toLocaleString('fr-FR');
}
function fmtCompact(n){
  if(n >= 1000000) return (n/1000000).toFixed(2).replace(/\.00$/,'') + 'M';
  if(n >= 1000) return (n/1000).toFixed(0) + 'K';
  return Math.round(n).toString();
}
function clamp(v,min,max){ return Math.min(Math.max(v,min),max); }

function computeScenario(rates, leadsPerMonth, valueTx, commissionRate){
  const L1 = leadsPerMonth * 12;
  const contactes = L1 * rates.resp;
  const qualifies = contactes * rates.qual;
  const rdvCount = qualifies * rates.rdv;
  const ventes = L1 * rates.close; // formule: ventes = leads_annuels * taux_closing_global
  const ca = ventes * valueTx;
  const commission = ca * commissionRate;
  return { L1, contactes, qualifies, rdvCount, ventes, ca, commission };
}

function getInputs(){
  return {
    leads: parseFloat(document.getElementById('leadsNum').value),
    agents: parseFloat(document.getElementById('agentsNum').value),
    resp: parseFloat(document.getElementById('respNum').value)/100,
    delay: parseFloat(document.getElementById('delayNum').value),
    qual: parseFloat(document.getElementById('qualNum').value)/100,
    rdv: parseFloat(document.getElementById('rdvNum').value)/100,
    close: parseFloat(document.getElementById('closeNum').value)/100,
    value: parseFloat(document.getElementById('valueNum').value),
    commission: parseFloat(document.getElementById('commissionNum').value)/100
  };
}

let compareChart = null;
let currentFunnelScenario = 'actuel';
let lastResults = null;

function setFunnelScenario(sc, btn){
  currentFunnelScenario = sc;
  document.querySelectorAll('.scenario-toggle button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderFunnel();
}

function renderFunnel(){
  if(!lastResults) return;
  const map = { actuel:lastResults.actuel, opt:lastResults.opt, top:lastResults.top };
  const r = map[currentFunnelScenario];
  const stages = [
    { name:'Leads reçus', count:r.L1, pct:100, cls:'' },
    { name:'Contactés', count:r.contactes, pct:r.contactes/r.L1*100, cls:'' },
    { name:'Qualifiés', count:r.qualifies, pct:r.qualifies/r.L1*100, cls:'' },
    { name:'RDV planifiés', count:r.rdvCount, pct:r.rdvCount/r.L1*100, cls:'' },
    { name:'Ventes conclues', count:r.ventes, pct:r.ventes/r.L1*100, cls:'final' },
  ];
  const container = document.getElementById('funnelContainer');
  container.innerHTML = stages.map(s => `
    <div class="funnel-row">
      <div class="stage-name">${s.name}</div>
      <div class="funnel-track"><div class="funnel-fill ${s.cls}" style="width:${Math.max(s.pct,1.5)}%"></div></div>
      <div class="funnel-count">${fmtCompact(s.count)}</div>
      <div class="funnel-pct">${s.pct.toFixed(1)}%</div>
    </div>
  `).join('');
}

function calculate(){
  const inp = getInputs();

  const actuelRates = { resp:inp.resp, qual:inp.qual, rdv:inp.rdv, close:inp.close };

  const optRates = {
    resp: clamp(Math.max(inp.resp*1.3, inp.resp+0.20), 0, 0.95),
    qual: clamp(Math.max(inp.qual*1.3, inp.qual+0.15), 0, 0.85),
    rdv:  clamp(Math.max(inp.rdv*2,   inp.rdv+0.08),  0, 0.30),
    close:clamp(Math.max(inp.close*1.5, inp.close+0.005), 0, 0.035)
  };

  const topRates = {
    resp: Math.max(inp.resp, 0.90),
    qual: Math.max(inp.qual, 0.70),
    rdv:  Math.max(inp.rdv, 0.25),
    close:Math.max(inp.close, 0.05)
  };

  const actuel = computeScenario(actuelRates, inp.leads, inp.value, inp.commission);
  const opt = computeScenario(optRates, inp.leads, inp.value, inp.commission);
  const top = computeScenario(topRates, inp.leads, inp.value, inp.commission);

  lastResults = { actuel, opt, top };

  const opportunity = Math.max(opt.commission - actuel.commission, 0);

  document.getElementById('heroValue').textContent = fmtAED(opportunity);
  document.getElementById('statVentesGain').textContent = Math.max(opt.ventes - actuel.ventes, 0).toFixed(1);

  const delayAfter = inp.delay > 0.25 ? '15 min' : (inp.delay*60).toFixed(0) + ' min';
  const delayBeforeLabel = inp.delay >= 1 ? inp.delay.toFixed(1) + ' h' : (inp.delay*60).toFixed(0) + ' min';
  document.getElementById('statDelay').textContent = `${delayBeforeLabel} → ${delayAfter}`;

  document.getElementById('statClose').textContent = `${(actuelRates.close*100).toFixed(1)}% → ${(optRates.close*100).toFixed(1)}%`;

  document.getElementById('bmVentes').textContent = `${actuel.ventes.toFixed(1)} → ${opt.ventes.toFixed(1)}`;
  document.getElementById('bmCa').textContent = `AED ${fmtCompact(actuel.ca)} → AED ${fmtCompact(opt.ca)}`;
  document.getElementById('bmCommission').textContent = `AED ${fmtCompact(actuel.commission)} → AED ${fmtCompact(opt.commission)}`;

  renderFunnel();
  renderChart(actuel, opt, top);
  renderTable(actuel, opt, top);
}

function renderChart(actuel, opt, top){
  const ctx = document.getElementById('compareChart').getContext('2d');
  const data = {
    labels: ['Actuel', 'Optimisé', 'Best-in-class'],
    datasets: [{
      label: 'Commissions annuelles (AED)',
      data: [actuel.commission, opt.commission, top.commission],
      backgroundColor: ['#3D5AFE', '#6C7CFF', '#5EEAD4'],
      borderRadius: 6,
      maxBarThickness: 70
    }]
  };
  if(compareChart){
    compareChart.data = data;
    compareChart.update();
    return;
  }
  compareChart = new Chart(ctx, {
    type: 'bar',
    data,
    options:{
      responsive:true,
      plugins:{ legend:{ display:false },
        tooltip:{ callbacks:{ label: c => 'AED ' + fmtAED(c.parsed.y) } } },
      scales:{
        y:{ ticks:{ color:'#99A0BC', callback:v=>fmtCompact(v) }, grid:{ color:'rgba(255,255,255,0.06)' } },
        x:{ ticks:{ color:'#F4F5FA', font:{family:"'Inter'"} }, grid:{ display:false } }
      }
    }
  });
}

function renderTable(actuel, opt, top){
  const rows = [
    ['Actuel', actuel.ventes, actuel.ca, actuel.commission],
    ['Optimisé', opt.ventes, opt.ca, opt.commission],
    ['Best-in-class', top.ventes, top.ca, top.commission],
  ];
  document.querySelector('#scenarioTable tbody').innerHTML = rows.map(r=>`
    <tr><td>${r[0]}</td><td>${r[1].toFixed(1)}</td><td>AED ${fmtCompact(r[2])}</td><td>AED ${fmtAED(r[3])}</td></tr>
  `).join('');
}

calculate();
