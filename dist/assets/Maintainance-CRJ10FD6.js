import{A as g,u as j,r,j as a,B as w,I as y,f as N,a as c}from"./index-DP5l2bTG.js";import{S as l}from"./Switch-DmbYghAb.js";import"./index-BeS4TZan.js";import"./index-BoyYGgaP.js";const S=()=>{const m=j(),[d,i]=r.useState([]),[f,h]=r.useState(!0),[x,o]=r.useState(!1),p=()=>m("/admin-panel");r.useEffect(()=>{(async()=>{try{const t=await c.get("/get-server");i(t.data);const n=t.data.find(s=>s.server===0);o((n==null?void 0:n.maintainance)||!1)}catch(t){console.error("Failed to fetch servers:",t)}finally{h(!1)}})()},[]);const u=async e=>{try{await c.post("/maintainance-server",{server:0,maintainance:e}),o(e),i(t=>t.map(n=>n.server!==0?{...n,maintainance:e}:n))}catch(t){console.error("Failed to update master maintenance status:",t)}},v=async(e,t)=>{try{await c.post("/maintainance-server",{server:e,maintainance:t}),i(n=>n.map(s=>s.server===e?{...s,maintainance:t}:s))}catch(n){console.error("Failed to update server maintenance status:",n)}};return a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"w-full my-2",children:a.jsxs(w,{variant:"link",onClick:p,className:"text-sm font-normal text-[#8C8C8C] !no-underline p-1 h-0 flex gap-2",children:[a.jsx(y.arrowLeft,{className:"w-4 h-4"})," Maintainance"]})}),a.jsx("div",{className:"flex items-center justify-center pt-[1rem]",children:a.jsxs("div",{className:"bg-transparent w-full max-w-md rounded-lg mb-[60px] border-none dark",children:[a.jsxs("div",{className:"w-full flex items-center justify-between px-4",children:[a.jsx("h5",{className:"font-normal text-base text-[#757575]",children:"Master Maintainance"}),a.jsx(l,{checked:x,onCheckedChange:e=>u(e)})]}),a.jsx("div",{className:"flex flex-col items-center gap-2",children:f?a.jsx("div",{children:"Loading..."}):d.filter(e=>e.server!==0).map(e=>a.jsxs("div",{className:N({variant:"login",className:"w-full text-sm font-normal h-14 text-white !bg-[#282828] !hover:bg-[#282828] !justify-between !transform-none"}),children:["Server ",e.server,a.jsx(l,{checked:e.maintainance,onCheckedChange:t=>v(e.server,t)})]},e.server))})]})})]})},F=g()(S);export{F as default};