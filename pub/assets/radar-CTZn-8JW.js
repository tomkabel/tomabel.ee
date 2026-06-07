import{r as f,j as a}from"./vendor-BkaHhJu-.js";function L({axes:o,size:d=400,className:k,onAxisFocus:i,language:m="en"}){const[y,$]=f.useState(!1),[M,j]=f.useState(!1);f.useEffect(()=>{const t=window.matchMedia("(prefers-reduced-motion: reduce)");j(t.matches);const r=e=>j(e.matches);return t.addEventListener("change",r),()=>t.removeEventListener("change",r)},[]),f.useEffect(()=>{const t=setTimeout(()=>$(!0),100);return()=>clearTimeout(t)},[]);const l=d/2,c=d/2,s=d*.35,v=s+28,x=o.map(t=>`${t.label[m]}: ${Math.round(t.value*10)}/10`).join(", "),g=o.length,p=o.map((t,r)=>Math.PI*(r*(360/g)-90)/180),b=Math.ceil(6*s*1.1),D=[.33,.66,1],E=o.map((t,r)=>{const e=p[r],n=y||M?s*t.value:0;return`${(l+n*Math.cos(e)).toFixed(1)},${(c+n*Math.sin(e)).toFixed(1)}`}).join(" ");return a.jsxs("svg",{viewBox:`0 0 ${d} ${d}`,className:k,role:"img","aria-label":`Capability radar chart: ${x}`,children:[a.jsxs("desc",{children:["Radar chart of professional capabilities across ",o.length," domains. ",x,"."]}),a.jsx("style",{children:`
        .radar-point {
          cursor: pointer;
          transition: r 0.2s ease, opacity 0.2s ease;
        }
        .radar-point:hover, .radar-point:focus-visible {
          r: 6;
          opacity: 0.8;
        }
        .radar-point:focus-visible {
          outline: none;
          stroke: #00D4FF;
          stroke-width: 3;
          stroke-opacity: 0.6;
        }
        .radar-point:active {
          r: 5;
          opacity: 0.7;
        }
        .radar-label-text {
          transition: fill 0.2s ease;
        }
      `}),D.map(t=>a.jsx("polygon",{points:o.map((r,e)=>{const n=p[e],h=s*t;return`${(l+h*Math.cos(n)).toFixed(1)},${(c+h*Math.sin(n)).toFixed(1)}`}).join(" "),fill:"none",stroke:"#1a1a2e",strokeWidth:1},t)),o.map((t,r)=>{const e=p[r];return a.jsx("line",{x1:l,y1:c,x2:l+s*Math.cos(e),y2:c+s*Math.sin(e),stroke:"#1a1a2e",strokeWidth:1},`axis-${r}`)}),a.jsx("polygon",{points:E,fill:"url(#radarGrad)",stroke:"#00D4FF",strokeWidth:2,style:M?{}:{strokeDasharray:b,strokeDashoffset:y?0:b,transition:"stroke-dashoffset 1.5s ease-out"}}),a.jsx("defs",{children:a.jsxs("linearGradient",{id:"radarGrad",x1:"0",y1:"0",x2:"1",y2:"1",children:[a.jsx("stop",{offset:"0%",stopColor:"#00D4FF",stopOpacity:.2}),a.jsx("stop",{offset:"100%",stopColor:"#00D4FF",stopOpacity:.05})]})}),o.map((t,r)=>{const e=p[r],n=l+v*Math.cos(e),h=c+v*Math.sin(e),C=l+s*t.value*Math.cos(e),F=c+s*t.value*Math.sin(e),R=Math.cos(e)<0;return a.jsxs("g",{className:"radar-point-group",children:[a.jsx("circle",{cx:C,cy:F,r:4,fill:"#00D4FF",className:"radar-point",tabIndex:0,role:"button","aria-label":`${t.label[m]}, ${Math.round(t.value*10)} out of 10`,onKeyDown:u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),i==null||i(t.id))},onClick:()=>i==null?void 0:i(t.id)}),a.jsx("text",{x:n,y:h,textAnchor:R?"end":"start",fill:"#94A3B8",fontSize:10,fontFamily:"JetBrains Mono, monospace",className:"radar-label-text pointer-events-none",children:t.label[m]})]},t.id)})]})}export{L as R};
