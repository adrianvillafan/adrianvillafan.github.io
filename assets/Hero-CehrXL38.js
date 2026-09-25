import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{M as t,N as n,t as r}from"./vendor-animations-zpKKrK78.js";import{F as i,K as a,M as o,et as s}from"./vendor-react-DD4BretU.js";import{a as c,c as l,i as u,n as d,o as f,s as p,t as m,u as h}from"./index-DA8bkU5Z.js";import{t as g}from"./useSectionObserver-Uhi9Aj0-.js";var _=e(n(),1),v=t(),y=_.memo(()=>(0,v.jsxs)(`div`,{style:{position:`absolute`,inset:0,overflow:`hidden`,pointerEvents:`none`,zIndex:0,opacity:`var(--aurora-opacity, 1)`,transition:`opacity 0.4s ease`},children:[(0,v.jsx)(`div`,{className:`aurora-blob aurora-1`,style:{position:`absolute`,top:`-15%`,left:`15%`,width:`550px`,height:`550px`,borderRadius:`50%`,background:`radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, rgba(79, 70, 229, 0.08) 60%, transparent 80%)`,filter:`blur(90px)`}}),(0,v.jsx)(`div`,{className:`aurora-blob aurora-2`,style:{position:`absolute`,top:`10%`,right:`15%`,width:`500px`,height:`500px`,borderRadius:`50%`,background:`radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(99, 102, 241, 0.05) 55%, transparent 75%)`,filter:`blur(80px)`}}),(0,v.jsx)(`div`,{className:`aurora-blob aurora-3`,style:{position:`absolute`,top:`30%`,left:`35%`,width:`600px`,height:`400px`,borderRadius:`50%`,background:`radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 70%)`,filter:`blur(100px)`}}),(0,v.jsx)(`style`,{children:`
        @keyframes auroraFloat1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(40px, 30px, 0) scale(1.1);
          }
        }
        @keyframes auroraFloat2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-35px, 45px, 0) scale(0.95);
          }
        }
        @keyframes auroraFloat3 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(25px, -30px, 0) scale(1.05);
          }
        }

        .aurora-1 {
          animation: auroraFloat1 18s ease-in-out infinite;
          will-change: transform;
        }
        .aurora-2 {
          animation: auroraFloat2 22s ease-in-out infinite;
          will-change: transform;
        }
        .aurora-3 {
          animation: auroraFloat3 16s ease-in-out infinite;
          will-change: transform;
        }
      `})]}));y.displayName=`AuroraBackground`;var b=_.memo(({size:e=48,strokeColor:t=`var(--grid-stroke)`,opacity:n=.7})=>(0,v.jsx)(`div`,{style:{position:`absolute`,inset:0,pointerEvents:`none`,zIndex:0,opacity:n,maskImage:`radial-gradient(ellipse 65% 55% at 50% 40%, #000 30%, transparent 80%)`,WebkitMaskImage:`radial-gradient(ellipse 65% 55% at 50% 40%, #000 30%, transparent 80%)`},children:(0,v.jsxs)(`svg`,{width:`100%`,height:`100%`,children:[(0,v.jsx)(`defs`,{children:(0,v.jsx)(`pattern`,{id:`hero-grid-pattern`,width:e,height:e,patternUnits:`userSpaceOnUse`,children:(0,v.jsx)(`path`,{d:`M ${e} 0 L 0 0 0 ${e}`,fill:`none`,stroke:t,strokeWidth:`1`})})}),(0,v.jsx)(`rect`,{width:`100%`,height:`100%`,fill:`url(#hero-grid-pattern)`})]})}));b.displayName=`GridPattern`;var x=_.memo(({words:e,interval:t=3e3,className:n=``,style:i})=>{let[a,o]=(0,_.useState)(0);return(0,_.useEffect)(()=>{let n=setInterval(()=>{o(t=>(t+1)%e.length)},t);return()=>clearInterval(n)},[e.length,t]),(0,v.jsx)(`span`,{style:{display:`inline-block`,position:`relative`,overflow:`hidden`,verticalAlign:`bottom`,minWidth:`280px`,height:`1.4em`,...i},className:n,children:(0,v.jsx)(p,{mode:`wait`,children:(0,v.jsx)(r.span,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.45,ease:[.16,1,.3,1]},style:{display:`inline-block`,position:`absolute`,left:0,right:0,color:`var(--accent-light)`,fontWeight:600},children:e[a]},a)})})});x.displayName=`RotatingText`;var S=_.memo(()=>{let e=g(`hero`),{scrollTo:t}=h(),{personalInfo:n}=m(),{showToast:p}=f(),{isEnglish:S}=l(),{openCvModal:C}=d(),w=(0,_.useMemo)(()=>n.rotatingWords,[n.rotatingWords]);return(0,v.jsxs)(`section`,{ref:e,id:`hero`,style:{minHeight:`100vh`,display:`flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,paddingTop:`calc(var(--header-height) + 3rem)`,paddingBottom:`5rem`,overflow:`hidden`},children:[(0,v.jsx)(y,{}),(0,v.jsx)(b,{size:52,opacity:.65}),(0,v.jsxs)(`div`,{className:`container`,style:{display:`flex`,flexDirection:`column`,alignItems:`center`,textAlign:`center`,position:`relative`,zIndex:1},children:[(0,v.jsxs)(r.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.6},style:{display:`inline-flex`,alignItems:`center`,gap:`0.65rem`,padding:`0.45rem 1.15rem`,borderRadius:`9999px`,background:`rgba(99, 102, 241, 0.08)`,border:`1px solid rgba(99, 102, 241, 0.3)`,marginBottom:`2rem`,boxShadow:`0 0 25px rgba(99, 102, 241, 0.2)`,backdropFilter:`blur(10px)`},children:[(0,v.jsxs)(`span`,{style:{position:`relative`,display:`flex`,width:`8px`,height:`8px`},children:[(0,v.jsx)(`span`,{style:{position:`absolute`,inset:0,borderRadius:`50%`,background:`#34d399`,opacity:.75,animation:`ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite`}}),(0,v.jsx)(`span`,{style:{position:`relative`,display:`inline-flex`,borderRadius:`50%`,width:`8px`,height:`8px`,background:`#10b981`}})]}),(0,v.jsx)(`span`,{style:{fontSize:`0.85rem`,fontWeight:500,color:`var(--text-secondary)`,letterSpacing:`0.01em`},children:n.status})]}),(0,v.jsx)(r.h1,{initial:{opacity:0,y:25},animate:{opacity:1,y:0},transition:{duration:.7,delay:.1},style:{fontSize:`clamp(2.75rem, 6.5vw, 5rem)`,fontWeight:800,letterSpacing:`-0.04em`,lineHeight:1.08,marginBottom:`1.25rem`,background:`var(--title-gradient)`,WebkitBackgroundClip:`text`,WebkitTextFillColor:`transparent`,maxWidth:`900px`},children:n.name}),(0,v.jsxs)(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.7,delay:.2},style:{display:`flex`,alignItems:`center`,justifyContent:`center`,flexWrap:`wrap`,gap:`0.6rem`,fontSize:`clamp(1.2rem, 2.8vw, 1.75rem)`,marginBottom:`1.75rem`,color:`var(--text-secondary)`},children:[(0,v.jsx)(`span`,{style:{fontWeight:400},children:n.heroSpecializedIn}),(0,v.jsx)(x,{words:w,interval:3200})]}),(0,v.jsx)(r.p,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.7,delay:.3},style:{fontSize:`clamp(1rem, 1.8vw, 1.2rem)`,color:`var(--text-secondary)`,maxWidth:`750px`,lineHeight:1.65,marginBottom:`2.75rem`,fontWeight:400},children:n.heroTagline}),(0,v.jsxs)(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.7,delay:.4},style:{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`1rem`,flexWrap:`wrap`},children:[(0,v.jsx)(u,{size:`lg`,variant:`primary`,icon:(0,v.jsx)(a,{size:18}),onClick:()=>t(`#projects`),children:n.heroActions.projects}),(0,v.jsx)(u,{size:`lg`,variant:`outline`,icon:(0,v.jsx)(s,{size:18,color:`var(--accent-light)`}),onClick:()=>{c.playClick(),C()},children:n.heroActions.downloadCv}),(0,v.jsx)(u,{size:`lg`,variant:`outline`,icon:(0,v.jsx)(o,{size:18,color:`#25D366`}),onClick:()=>window.open(n.whatsappUrl,`_blank`),children:n.heroActions.whatsapp})]}),(0,v.jsxs)(r.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.8,duration:.8},style:{marginTop:`5rem`,display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`0.5rem`,cursor:`pointer`,color:`var(--text-muted)`,fontSize:`0.82rem`,transition:`color 0.2s`},onClick:()=>t(`#about`),children:[(0,v.jsx)(`span`,{children:n.scrollIndicator}),(0,v.jsx)(r.div,{animate:{y:[0,7,0]},transition:{repeat:1/0,duration:1.6,ease:`easeInOut`},children:(0,v.jsx)(i,{size:16})})]})]}),(0,v.jsx)(`style`,{children:`
        @keyframes ping {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `})]})});export{S as default};