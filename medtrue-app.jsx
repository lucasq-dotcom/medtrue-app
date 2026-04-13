import { useState, useEffect } from "react";

// MedTrue brand
const G = "#7c929f";
const GD = "#5c666e";
const GL = "#e8eced";
const GM = "#ad9c8a";
const BG = "#efeeed";
const TX = "#2a3135";
const TM = "#5c666e";
const TL = "#8a9ba4";
const HERO = "linear-gradient(160deg,#5c666e 0%,#7c929f 60%,#8faab8 100%)";
const GOLD_BTN = `linear-gradient(135deg,${G} 0%,${GD} 100%)`;

const MedTrueLogo = ({ light, size = 1 }) => {
  const c = light ? "rgba(255,255,255,0.95)" : GD;
  return (
    <span style={{
      fontSize: 22*size, fontWeight:500, color: c,
      fontFamily:"'Helvetica Neue',Arial,sans-serif", letterSpacing:-0.3
    }}>
      Med<span style={{fontWeight:700}}>True</span>
    </span>
  );
};

const Btn = ({label, onClick, variant="gold", disabled}) => {
  const styles = {
    gold: { background: GOLD_BTN, color:"#fff", boxShadow:`0 4px 16px ${G}44`, border:"none" },
    light: { background:"rgba(255,255,255,0.18)", color:"#fff", border:"1px solid rgba(255,255,255,0.35)", boxShadow:"none" },
    ghost: { background:"transparent", color: GD, border:`1.5px solid ${GM}`, boxShadow:"none" },
    disabled: { background:"#dce3e6", color: TL, border:"none", boxShadow:"none" },
  };
  const s = disabled ? styles.disabled : styles[variant];
  return (
    <button onClick={disabled ? null : onClick} style={{
      ...s, width:"100%", padding:"17px", borderRadius:14,
      fontSize:16, fontWeight:600, cursor: disabled?"default":"pointer",
      marginBottom:8, fontFamily:"inherit", letterSpacing:-0.2
    }}>{label}</button>
  );
};

const Sub = ({label, onClick}) => (
  <button onClick={onClick} style={{
    width:"100%", padding:"12px", background:"none", border:"none",
    color:TL, fontSize:14, cursor:"pointer", fontFamily:"inherit"
  }}>{label}</button>
);

const BackBtn = ({onClick}) => (
  <button onClick={onClick} style={{
    background:"none", border:"none", fontSize:22, cursor:"pointer",
    color:TX, padding:"0 0 16px", alignSelf:"flex-start"
  }}>←</button>
);

const FeatCard = ({icon, title, sub}) => (
  <div style={{background:"#fff",borderRadius:16,padding:"16px 18px",marginBottom:10,display:"flex",gap:14,alignItems:"flex-start",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
    <div style={{width:44,height:44,background:GL,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{icon}</div>
    <div>
      <div style={{fontSize:15,fontWeight:600,color:TX,marginBottom:2}}>{title}</div>
      <div style={{fontSize:13,color:TL,lineHeight:1.4}}>{sub}</div>
    </div>
  </div>
);

const OptionCard = ({label, icon, selected, onClick}) => (
  <div onClick={onClick} style={{
    background: selected ? GL : "#fff", borderRadius:14, padding:"16px 18px", marginBottom:10,
    display:"flex", alignItems:"center", gap:14, cursor:"pointer",
    border:`2px solid ${selected ? G : "transparent"}`,
    boxShadow:"0 2px 8px rgba(0,0,0,0.04)"
  }}>
    {icon && <div style={{width:36,height:36,background:GL,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{icon}</div>}
    <div style={{flex:1,fontSize:15,fontWeight:500,color:TX}}>{label}</div>
    <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${selected?G:"#D0C8BC"}`,background:selected?G:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
      {selected && <div style={{width:8,height:8,borderRadius:"50%",background:"#fff"}}/>}
    </div>
  </div>
);

const Screen = ({children, hero, noPad}) => (
  <div style={{
    width:"100%", maxWidth:390, height:"100%",
    background: hero ? HERO : BG,
    display:"flex", flexDirection:"column",
    padding: noPad ? 0 : "56px 26px 36px",
    fontFamily:"'Helvetica Neue',Arial,system-ui,sans-serif",
    overflowY:"auto", position:"relative", overflowX:"hidden"
  }}>
    {hero && <>
      <div style={{position:"absolute",width:260,height:260,borderRadius:"50%",background:"rgba(255,255,255,0.06)",top:-80,right:-80,pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,0.04)",bottom:100,left:-60,pointerEvents:"none"}}/>
    </>}
    {children}
  </div>
);

export default function App() {
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [goals, setGoals] = useState([]);
  const [treatStarted, setTreatStarted] = useState(null);
  const [day, setDay] = useState(4);
  const [hour, setHour] = useState(9);
  const [dose, setDose] = useState(5.0);
  const [weight, setWeight] = useState(99);
  const [wgoal, setWgoal] = useState(90);
  const [loadStep, setLoadStep] = useState(0);

  const STEPS = ["splash","gender","age","goal","feat1","feat2","three","feat3","status","dose","weight","wgoal","roadmap","articles","notifs","loading","paywall","register"];

  const go = (name) => {
    setHistory(h => [...h, step]);
    setStep(STEPS.indexOf(name));
    if (name === "loading") runLoader();
  };

  const back = () => {
    if (!history.length) return;
    setStep(history[history.length-1]);
    setHistory(h => h.slice(0,-1));
  };

  const runLoader = () => {
    setLoadStep(0);
    setTimeout(() => setLoadStep(1), 800);
    setTimeout(() => setLoadStep(2), 1700);
    setTimeout(() => setLoadStep(3), 2700);
    setTimeout(() => { setLoadStep(4); setTimeout(() => go("paywall"), 600); }, 3500);
  };

  const screen = STEPS[step];
  const diff = Math.max(0, weight - wgoal);
  const days = ["D","S","T","Q","Q","S","S"];
  const dayNames = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

  // SPLASH
  if (screen === "splash") return (
    <Screen hero>
      <MedTrueLogo light />
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
        <div style={{marginBottom:32}}>
          <MedTrueLogo light size={2} />
        </div>
        <div style={{fontSize:34,fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:12}}>Sua jornada<br/>começa agora.</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.65)",lineHeight:1.5,marginBottom:36}}>O controle do seu tratamento com Tirzepatida começa aqui.</div>
        <div style={{background:"rgba(255,255,255,0.15)",borderRadius:100,padding:"8px 18px",fontSize:13,color:"rgba(255,255,255,0.9)",marginBottom:40,display:"inline-flex",alignItems:"center",gap:8,border:"1px solid rgba(255,255,255,0.2)"}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"#b8d4dc"}}/>
          Vamos personalizar seu perfil
        </div>
      </div>
      <Btn label="Começar" onClick={() => go("gender")} variant="light"/>
      <Sub label="Já tenho uma conta" onClick={() => go("register")}/>
    </Screen>
  );

  // GENDER
  if (screen === "gender") return (
    <Screen>
      <div style={{marginBottom:24}}><MedTrueLogo/></div>
      <div style={{fontSize:28,fontWeight:700,color:TX,marginBottom:8}}>Qual seu gênero?</div>
      <div style={{fontSize:14,color:TL,marginBottom:24,lineHeight:1.5}}>Isso nos ajuda a personalizar sua experiência e oferecer recomendações mais precisas</div>
      <OptionCard label="Masculino" icon="♂️" selected={gender==="M"} onClick={() => { setGender("M"); setTimeout(() => go("age"), 280); }}/>
      <OptionCard label="Feminino" icon="♀️" selected={gender==="F"} onClick={() => { setGender("F"); setTimeout(() => go("age"), 280); }}/>
      <div style={{flex:1}}/>
      <Sub label="Prefiro não dizer" onClick={() => go("age")}/>
    </Screen>
  );

  // AGE
  if (screen === "age") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{fontSize:28,fontWeight:700,color:TX,marginBottom:8}}>Qual sua faixa etária?</div>
      <div style={{fontSize:14,color:TL,marginBottom:24}}>Isso nos permite oferecer orientações adequadas para sua idade</div>
      <div style={{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
        {["18-24 anos","25-34 anos","35-44 anos","45-54 anos","55-64 anos","65+ anos"].map((a,i,arr) => (
          <div key={a} onClick={() => { setAge(a); setTimeout(() => go("goal"), 280); }} style={{
            padding:"18px 20px",fontSize:15,fontWeight:500,cursor:"pointer",
            background: age===a ? GL : "#fff", color: age===a ? GD : TX,
            display:"flex",justifyContent:"space-between",alignItems:"center",
            borderBottom: i<arr.length-1 ? "1px solid #F0EBE2" : "none"
          }}>
            {a}{age===a && <span style={{color:G,fontWeight:700}}>✓</span>}
          </div>
        ))}
      </div>
    </Screen>
  );

  // GOAL
  if (screen === "goal") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{fontSize:28,fontWeight:700,color:TX,marginBottom:8}}>O que você quer conquistar?</div>
      <div style={{fontSize:14,color:TL,marginBottom:20}}>Selecione o que mais representa seu momento</div>
      {[["✅","Ter controle do meu tratamento"],["🌿","Emagrecer com mais tranquilidade"],["🍃","Emagrecer de forma saudável"],["⚡","Aumentar minha energia e força"],["📅","Ser mais consistente"],["📈","Entender melhor meu corpo"],["💛","Cuidar de mim com mais confiança"]].map(([icon,label]) => (
        <OptionCard key={label} label={label} icon={icon} selected={goals.includes(label)}
          onClick={() => setGoals(g => g.includes(label) ? g.filter(x=>x!==label) : [...g,label])}/>
      ))}
      <div style={{minHeight:16}}/>
      <Btn label="Continuar" onClick={() => go("feat1")} disabled={!goals.length}/>
    </Screen>
  );

  // FEAT 1
  if (screen === "feat1") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{fontSize:28,fontWeight:700,color:TX,marginBottom:8}}>Menos dúvida.<br/>Mais controle.</div>
      <div style={{fontSize:14,color:TL,marginBottom:24}}>Seu tratamento organizado, do início ao fim</div>
      <FeatCard icon="💊" title="Aplicações e doses" sub="Registre e acompanhe sem erro"/>
      <FeatCard icon="📊" title="Peso e progresso" sub="Visualize sua evolução com clareza"/>
      <FeatCard icon="📄" title="Relatório completo" sub="Exporte para compartilhar com seu médico"/>
      <div style={{flex:1}}/>
      <Btn label="Continuar" onClick={() => go("feat2")}/>
    </Screen>
  );

  // FEAT 2
  if (screen === "feat2") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{background:"#fff",borderRadius:16,overflow:"hidden",marginBottom:16,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
        <div style={{height:120,background:HERO,display:"flex",alignItems:"flex-end",padding:12}}>
          <div style={{background:"rgba(255,255,255,0.92)",borderRadius:8,padding:"4px 10px",fontSize:10,fontWeight:700,color:GD}}>📌 DESTAQUE</div>
        </div>
        <div style={{padding:"14px 16px"}}>
          <div style={{fontSize:10,fontWeight:700,color:G,marginBottom:6}}>● ESTUDO CLÍNICO 2026</div>
          <div style={{fontSize:15,fontWeight:600,color:TX}}>Avanços na terapia com Tirzepatida e longevidade.</div>
          <div style={{fontSize:12,color:TL,marginTop:6}}>4 min de leitura</div>
        </div>
      </div>
      <div style={{fontSize:24,fontWeight:700,color:TX,lineHeight:1.2,marginBottom:12}}>Clareza para acompanhar seu tratamento.</div>
      <FeatCard icon="📈" title="Visão completa do tratamento" sub="Tudo o que importa, organizado em um só lugar."/>
      <FeatCard icon="📋" title="Relatório para seu médico" sub="Um PDF claro, pronto para compartilhar quando precisar."/>
      <FeatCard icon="🛡️" title="Privacidade em primeiro lugar" sub="Seus dados são protegidos e ficam apenas com você."/>
      <div style={{minHeight:16}}/>
      <Btn label="Continuar" onClick={() => go("three")}/>
    </Screen>
  );

  // THREE
  if (screen === "three") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{fontSize:28,fontWeight:700,color:TX,marginBottom:32}}>Você só precisa de 3 coisas.</div>
      {[["01","Consistência","Aplicações e lembretes no ritmo certo."],["02","Clareza","Peso, sinais e evolução sem confusão."],["03","Confiança","Tudo registrado, pronto para você."]].map(([n,t,s]) => (
        <div key={n} style={{marginBottom:32}}>
          <div style={{fontSize:52,fontWeight:700,color:G,lineHeight:1,marginBottom:4}}>{n}</div>
          <div style={{fontSize:18,fontWeight:600,color:TX,marginBottom:4}}>{t}</div>
          <div style={{fontSize:14,color:TL}}>{s}</div>
        </div>
      ))}
      <div style={{flex:1}}/>
      <Btn label="Continuar" onClick={() => go("feat3")}/>
    </Screen>
  );

  // FEAT 3
  if (screen === "feat3") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{fontSize:28,fontWeight:700,color:TX,marginBottom:16}}>Veja o que você vai usar todo dia.</div>
      <FeatCard icon="💊" title="Nível do medicamento" sub="Saiba quando ele está mais ativo no seu corpo."/>
      <FeatCard icon="📊" title="Progresso real" sub="Veja sua evolução semana após semana."/>
      <FeatCard icon="📋" title="Histórico de aplicações" sub="Tudo registrado, sem dúvidas ou esquecimentos."/>
      <div style={{textAlign:"center",fontSize:14,fontWeight:600,color:GD,margin:"20px 0",padding:14,background:GL,borderRadius:12}}>✨ Seu tratamento sob controle, em segundos.</div>
      <Btn label="Configurar meu plano" onClick={() => go("status")}/>
    </Screen>
  );

  // STATUS
  if (screen === "status") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{fontSize:28,fontWeight:700,color:TX,marginBottom:8}}>Em que momento do tratamento você está?</div>
      <div style={{fontSize:14,color:TL,marginBottom:28}}>Selecione uma opção abaixo</div>
      <Btn label="Já estou em tratamento" onClick={() => { setTreatStarted(true); go("dose"); }}/>
      <Btn label="Ainda não comecei" onClick={() => { setTreatStarted(false); go("dose"); }} variant="ghost"/>
    </Screen>
  );

  // DOSE
  if (screen === "dose") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{fontSize:26,fontWeight:700,color:TX,marginBottom:4}}>Aplicação</div>
      <div style={{fontSize:14,color:TL,marginBottom:4}}>Defina quando e quanto você aplica</div>
      <div style={{fontSize:13,color:TM,marginBottom:16}}>Você selecionou: <strong style={{color:GD}}>Tirzepatida Composta</strong></div>
      <div style={{background:"#fff",borderRadius:16,padding:"18px 16px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
        <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:16}}>
          {days.map((d,i) => (
            <button key={i} onClick={() => setDay(i)} style={{
              width:40,height:40,borderRadius:12,border:"none",fontWeight:600,fontSize:13,
              background: day===i ? GOLD_BTN : BG, color: day===i ? "#fff" : TM,
              cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,
              fontFamily:"inherit", boxShadow: day===i ? `0 2px 8px ${G}44` : "none"
            }}>
              {d}<span style={{fontSize:9,fontWeight:400}}>{dayNames[i]}</span>
            </button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16,justifyContent:"center"}}>
          <button onClick={() => setHour(h=>(h-1+24)%24)} style={{width:36,height:36,borderRadius:10,border:"none",background:BG,fontSize:20,cursor:"pointer"}}>−</button>
          <div style={{fontSize:36,fontWeight:700,color:TX,letterSpacing:-1,minWidth:90,textAlign:"center"}}>{String(hour).padStart(2,"0")}:00</div>
          <button onClick={() => setHour(h=>(h+1)%24)} style={{width:36,height:36,borderRadius:10,border:"none",background:BG,fontSize:20,cursor:"pointer"}}>+</button>
        </div>
      </div>
      <div style={{background:"#fff",borderRadius:16,padding:"18px 16px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
          <span style={{fontSize:15,fontWeight:600,color:TX}}>Dose inicial</span>
          <span style={{fontSize:12,color:TL}}>Sugerida: 2.5 mg</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16,justifyContent:"center",marginBottom:12}}>
          <button onClick={() => setDose(d=>Math.max(0.5,+(d-0.5).toFixed(1)))} style={{width:36,height:36,borderRadius:10,border:"none",background:BG,fontSize:20,cursor:"pointer"}}>−</button>
          <span style={{fontSize:32,fontWeight:700,color:TX}}>{dose.toFixed(1)}</span>
          <span style={{fontSize:14,color:TL}}>mg</span>
          <button onClick={() => setDose(d=>Math.min(15,+(d+0.5).toFixed(1)))} style={{width:36,height:36,borderRadius:10,border:"none",background:BG,fontSize:20,cursor:"pointer"}}>+</button>
        </div>
        <input type="range" min="0.5" max="15" step="0.5" value={dose} onChange={e=>setDose(+e.target.value)} style={{width:"100%",accentColor:G}}/>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:TL,marginTop:4}}><span>0.5 mg</span><span>15.0 mg</span></div>
      </div>
      <div style={{textAlign:"center",fontSize:12,color:TL,marginBottom:16}}>Você pode alterar depois</div>
      <Btn label="Continuar" onClick={() => go("weight")}/>
      <Sub label="Ainda não comecei o tratamento" onClick={() => go("weight")}/>
    </Screen>
  );

  // WEIGHT
  if (screen === "weight") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{fontSize:28,fontWeight:700,color:TX,marginBottom:8}}>Peso atual</div>
      <div style={{fontSize:14,color:TL,marginBottom:24}}>Digite seu peso em quilogramas</div>
      <div style={{flex:1,display:"flex",alignItems:"center"}}>
        <div style={{background:"#fff",borderRadius:20,padding:"32px 40px",textAlign:"center",width:"100%",boxShadow:"0 4px 16px rgba(0,0,0,0.06)"}}>
          <input type="number" value={weight} onChange={e=>setWeight(+e.target.value)}
            style={{fontSize:64,fontWeight:700,color:TX,border:"none",outline:"none",width:130,textAlign:"center",background:"transparent",fontFamily:"inherit"}}/>
          <span style={{fontSize:22,color:TL,marginLeft:6}}>kg</span>
        </div>
      </div>
      <Btn label="Continuar" onClick={() => go("wgoal")}/>
    </Screen>
  );

  // WEIGHT GOAL
  if (screen === "wgoal") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{fontSize:28,fontWeight:700,color:TX,marginBottom:8}}>Peso ideal</div>
      <div style={{fontSize:14,color:TL,marginBottom:24}}>Qual é o seu peso objetivo?</div>
      <div style={{flex:1,display:"flex",alignItems:"center"}}>
        <div style={{background:"#fff",borderRadius:20,padding:"32px 40px",textAlign:"center",width:"100%",boxShadow:"0 4px 16px rgba(0,0,0,0.06)"}}>
          <input type="number" value={wgoal} onChange={e=>setWgoal(+e.target.value)}
            style={{fontSize:64,fontWeight:700,color:TX,border:"none",outline:"none",width:130,textAlign:"center",background:"transparent",fontFamily:"inherit"}}/>
          <span style={{fontSize:22,color:TL,marginLeft:6}}>kg</span>
        </div>
      </div>
      <Btn label="Continuar" onClick={() => go("roadmap")}/>
    </Screen>
  );

  // ROADMAP — cálculo dinâmico: 1% do peso atual por semana
  const weeklyLoss = +(weight * 0.01).toFixed(1);
  const weeks = diff > 0 ? Math.ceil(diff / weeklyLoss) : 0;
  const conclusionDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + weeks * 7);
    return d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  })();
  const ringOffset = diff > 0
    ? Math.max(10, 314 * (1 - diff / Math.max(weight, 1)))
    : 304;

  if (screen === "roadmap") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{fontSize:28,fontWeight:700,color:TX,marginBottom:8}}>O caminho está traçado</div>
      <div style={{fontSize:14,color:TL,marginBottom:20}}>Criamos um cronograma realista baseado nos seus dados para garantir que você chegue lá com saúde.</div>
      <div style={{background:"#fff",borderRadius:20,padding:28,textAlign:"center",marginBottom:12,boxShadow:"0 4px 16px rgba(0,0,0,0.06)"}}>
        <svg width={120} height={120} viewBox="0 0 120 120" style={{display:"block",margin:"0 auto 8px"}}>
          <circle cx={60} cy={60} r={50} fill="none" stroke={GL} strokeWidth={10}/>
          <circle cx={60} cy={60} r={50} fill="none" stroke={G} strokeWidth={10}
            strokeDasharray={314} strokeDashoffset={diff > 0 ? Math.max(8, 314*(diff/Math.max(weight,1))) : 8}
            strokeLinecap="round" transform="rotate(-90 60 60)"/>
        </svg>
        <div style={{fontSize:52,fontWeight:700,color:TX,lineHeight:1}}>{diff}</div>
        <div style={{fontSize:13,color:TL}}>kg faltam</div>
        <div style={{fontSize:16,fontWeight:600,color:TX,marginTop:12}}>Meta atingível</div>
        <div style={{fontSize:13,color:TL,marginTop:2}}>
          Perda média de ~<strong style={{color:GD}}>{weeklyLoss} kg/semana</strong> (1% do seu peso)
        </div>
      </div>

      <div style={{background:"#fff",borderRadius:16,padding:"16px 18px",display:"flex",gap:14,marginBottom:10,alignItems:"flex-start",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
        <div style={{width:40,height:40,background:GL,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>📅</div>
        <div>
          <div style={{fontSize:14,fontWeight:600,color:TX}}>Previsão de conclusão</div>
          <div style={{fontSize:13,color:TL,lineHeight:1.4,marginTop:2}}>
            Em aproximadamente <strong style={{color:GD}}>{weeks} semanas</strong> você pode alcançar{" "}
            <strong>{wgoal} kg</strong> — por volta de{" "}
            <strong style={{color:GD}}>{conclusionDate}</strong>.
          </div>
        </div>
      </div>

      <div style={{background:"#fff",borderRadius:16,padding:"16px 18px",display:"flex",gap:14,marginBottom:10,alignItems:"flex-start",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
        <div style={{width:40,height:40,background:GL,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>💛</div>
        <div>
          <div style={{fontSize:14,fontWeight:600,color:TX}}>Ritmo seguro e sustentável</div>
          <div style={{fontSize:13,color:TL,lineHeight:1.4,marginTop:2}}>A consistência é o que garante que o peso não volte.</div>
        </div>
      </div>

      <div style={{background:GL,borderRadius:14,padding:"14px 16px",marginBottom:10,display:"flex",gap:10,alignItems:"flex-start"}}>
        <span style={{fontSize:16,flexShrink:0}}>ℹ️</span>
        <span style={{fontSize:12,color:GD,lineHeight:1.4}}>
          Cálculo baseado em 1% do peso corporal por semana — referência segura segundo protocolos de emagrecimento supervisionado.
        </span>
      </div>

      <div style={{minHeight:16}}/>
      <Btn label="Continuar" onClick={() => go("articles")}/>
    </Screen>
  );

  // ARTICLES
  if (screen === "articles") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{background:"#fff",borderRadius:16,overflow:"hidden",marginBottom:16,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
        <div style={{height:120,background:HERO,display:"flex",alignItems:"flex-end",padding:12}}>
          <div style={{background:"rgba(255,255,255,0.92)",borderRadius:8,padding:"4px 10px",fontSize:10,fontWeight:700,color:GD}}>📌 DESTAQUE</div>
        </div>
        <div style={{padding:"14px 16px"}}>
          <div style={{fontSize:10,fontWeight:700,color:G,marginBottom:6}}>● ESTUDO CLÍNICO 2026</div>
          <div style={{fontSize:15,fontWeight:600,color:TX}}>Avanços na terapia com Tirzepatida e longevidade.</div>
          <div style={{fontSize:12,color:TL,marginTop:6}}>4 min de leitura</div>
        </div>
      </div>
      <div style={{fontSize:24,fontWeight:700,color:TX,lineHeight:1.2,marginBottom:12}}>Curadoria científica na palma da sua mão.</div>
      <FeatCard icon="📄" title="Artigos Exclusivos" sub="As últimas descobertas revisadas por especialistas."/>
      <FeatCard icon="🔬" title="Foco em GLP-1" sub="Conteúdo sobre Tirzepatida e protocolos MedTrue."/>
      <FeatCard icon="🔔" title="Atualizações Diárias" sub="Novas diretrizes e aprovações."/>
      <div style={{minHeight:16}}/>
      <Btn label="Continuar" onClick={() => go("notifs")}/>
    </Screen>
  );

  // NOTIFS
  if (screen === "notifs") return (
    <Screen>
      <BackBtn onClick={back}/>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{width:64,height:64,background:GL,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 16px"}}>🔔</div>
        <div style={{fontSize:26,fontWeight:700,color:TX,marginBottom:8}}>Não perca nenhuma aplicação</div>
        <div style={{fontSize:14,color:TL,lineHeight:1.5}}>Nós te avisaremos quando for a hora da sua próxima dose. Assim você mantém seu tratamento sempre em dia.</div>
      </div>
      <div style={{background:"#fff",borderRadius:16,padding:16,display:"flex",alignItems:"center",gap:12,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
        <div style={{width:40,height:40,background:GOLD_BTN,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:"#fff",flexShrink:0}}>💊</div>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:600,color:TX}}>Lembrete de Dose</div>
          <div style={{fontSize:12,color:TL}}>É hora da sua aplicação semanal!</div>
        </div>
        <div style={{fontSize:11,color:TL}}>Agora</div>
      </div>
      <div style={{background:GL,borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <span style={{fontSize:18}}>🛡️</span>
        <span style={{fontSize:13,fontWeight:500,color:GD}}>Suas informações são privadas e seguras conosco.</span>
      </div>
      <div style={{flex:1}}/>
      <Btn label="Ativar notificações" onClick={() => go("loading")}/>
      <Sub label="Agora não, obrigado" onClick={() => go("loading")}/>
    </Screen>
  );

  // LOADING
  if (screen === "loading") return (
    <Screen>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{width:72,height:72,background:GOLD_BTN,borderRadius:22,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24,boxShadow:`0 8px 24px ${G}44`}}>
          <MedTrueLogo light size={0.65}/>
        </div>
        <div style={{fontSize:24,fontWeight:700,color:TX,textAlign:"center",marginBottom:8}}>Personalizando seu MedTrue</div>
        <div style={{fontSize:14,color:TL,textAlign:"center",marginBottom:24}}>Estamos configurando tudo para você</div>
        <div style={{width:"100%"}}>
          {[[0,"✓","Configurando seu perfil",`${gender==="M"?"Masculino":"Feminino"}, ${age||"35-44 anos"}`],
            [1,"✓","Personalizando para Tirzepatida","Aplicação semanal"],
            [2,"✨","Ativando insights de IA","Sugestões personalizadas"],
            [3,"🔔","Preparando lembretes",`${dayNames[day]} às ${String(hour).padStart(2,"0")}:00`],
            [4,"✓","Tudo pronto!","Seu app está configurado"]
          ].map(([s,icon,title,sub]) => (
            <div key={s} style={{display:"flex",gap:14,marginBottom:22,opacity:loadStep>=s?1:0.3,transition:"opacity 0.5s"}}>
              <div style={{width:36,height:36,borderRadius:12,background:loadStep>s?GOLD_BTN:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,color:loadStep>s?"#fff":G}}>
                {loadStep>s?"✓":icon}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:600,color:TX}}>{title}</div>
                <div style={{fontSize:13,color:TL,marginTop:2}}>{sub}</div>
                {loadStep===s && s===2 && (
                  <div style={{height:3,background:GL,borderRadius:2,marginTop:8}}>
                    <div style={{height:"100%",background:G,borderRadius:2,width:loadStep>=2?"85%":"0%",transition:"width 2s ease"}}/>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );

  // PAYWALL
  if (screen === "paywall") return (
    <Screen noPad>
      <div style={{background:HERO,padding:"52px 28px 28px",color:"#fff",position:"relative",overflow:"hidden",flexShrink:0}}>
        <div style={{position:"absolute",width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,0.06)",top:-60,right:-50,pointerEvents:"none"}}/>
        <MedTrueLogo light/>
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:20,marginBottom:16}}>
          <div style={{display:"flex"}}>
            {["👩","👨","👩","👨"].map((e,i) => <div key={i} style={{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",marginLeft:i?-8:0,border:"2px solid rgba(255,255,255,0.4)"}}>{e}</div>)}
          </div>
          <div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.85)"}}>846+ clientes MedTrue</div>
            <div style={{color:"#b8d4dc",fontSize:12}}>★★★★★ <span style={{color:"rgba(255,255,255,0.6)",fontSize:11}}>4,9 na App Store</span></div>
          </div>
        </div>
        <div style={{fontSize:22,fontWeight:700,lineHeight:1.2,marginBottom:8}}>Seu tratamento merece atenção inteligente</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.65)",marginBottom:16}}>Feito para o seu tratamento com Tirzepatida Composta</div>
        {[["✨","Insights personalizados com IA"],["📊","Acompanhamento completo de sintomas"],["🔔","Lembretes inteligentes de aplicação"],["📈","Relatórios detalhados de progresso"]].map(([icon,label]) => (
          <div key={label} style={{display:"flex",alignItems:"center",gap:10,color:"rgba(255,255,255,0.85)",fontSize:14,marginBottom:8}}><span>{icon}</span>{label}</div>
        ))}
      </div>
      <div style={{background:BG,borderRadius:"24px 24px 0 0",padding:"24px 28px 36px",flex:1,overflowY:"auto"}}>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {["12 meses","1 mês","1 semana"].map((p,i) => (
            <button key={p} style={{flex:1,padding:"10px 6px",borderRadius:12,border:"none",background:i===0?GOLD_BTN:"#dce3e6",color:i===0?"#fff":TM,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{p}</button>
          ))}
        </div>
        <div style={{background:"#fff",borderRadius:16,padding:"16px 18px",display:"flex",alignItems:"center",gap:12,marginBottom:16,border:`2px solid ${G}`}}>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:600,color:TX}}>Plano 12 meses <span style={{background:G,color:"#fff",fontSize:10,fontWeight:700,borderRadius:6,padding:"2px 6px",marginLeft:6}}>3 dias grátis</span></div>
            <div style={{fontSize:12,color:TL,marginTop:2}}>Depois R$ 29,99/ano · R$ 2,50/mês</div>
          </div>
          <span style={{color:G,fontSize:20}}>✓</span>
        </div>
        <Btn label="Começar teste grátis →" onClick={() => go("register")}/>
        <div style={{textAlign:"center",fontSize:12,color:TL}}>Sem compromisso, cancele quando quiser</div>
      </div>
    </Screen>
  );

  // REGISTER
  if (screen === "register") return (
    <Screen>
      <div style={{marginBottom:24}}><MedTrueLogo/></div>
      <div style={{width:64,height:64,background:GL,borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,marginBottom:20}}>📱</div>
      <div style={{fontSize:26,fontWeight:700,color:TX,marginBottom:8}}>Crie sua conta</div>
      <div style={{fontSize:14,color:TL,marginBottom:20,lineHeight:1.5}}>Registre-se para manter seus dados seguros e sincronizados</div>
      <div style={{display:"flex",gap:10,marginBottom:14}}>
        <div style={{background:"#fff",borderRadius:14,padding:"16px 14px",fontSize:14,whiteSpace:"nowrap",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>🇧🇷 +55 ▾</div>
        <input type="tel" placeholder="Seu número" style={{flex:1,background:"#fff",borderRadius:14,padding:"16px",fontSize:16,border:"none",outline:"none",fontFamily:"inherit",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}/>
      </div>
      <div style={{background:GL,borderRadius:14,padding:"14px 16px",display:"flex",gap:12,marginBottom:24,alignItems:"flex-start"}}>
        <div style={{width:36,height:36,background:"#fff",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🛡️</div>
        <div>
          <div style={{fontSize:13,fontWeight:600,color:GD}}>Seus dados protegidos</div>
          <div style={{fontSize:12,color:TL,marginTop:2}}>Mantenha seu progresso salvo e sincronizado entre dispositivos.</div>
        </div>
      </div>
      <div style={{flex:1}}/>
      <Btn label="Enviar código →" onClick={() => alert("✓ Código enviado!")}/>
      <div style={{textAlign:"center",fontSize:11,color:TL,marginTop:8}}>Ao continuar, você concorda com nossos Termos e Política de Privacidade</div>
    </Screen>
  );

  return null;
}
