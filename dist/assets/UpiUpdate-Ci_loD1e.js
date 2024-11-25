import{A as P,r as i,u as R,j as e,B as l,I as D,a as u,_ as g}from"./index-DP5l2bTG.js";import{I as y}from"./Input-BHpDEKWe.js";import{L as j}from"./Label-BT8m33cQ.js";import"./index-BoyYGgaP.js";const E=()=>{const[m,x]=i.useState(""),[w,v]=i.useState(""),[a,c]=i.useState(null),h=i.useRef(null),N=R(),f=()=>u.get("/get-reacharge-api?type=upi").then(r=>{v(r.data.api_key)}).catch(r=>{console.error("Error fetching servers:",r)});i.useEffect(()=>{f()},[]);const b=()=>N("/admin-panel"),U=r=>{c(r.target.files[0])},F=()=>{h.current.click()},k=()=>{c(null)},C=async r=>{if(r.preventDefault(),!a){console.error("No file selected");return}const d=new Promise((s,o)=>{(async()=>{const t=new FileReader;t.onload=async()=>{try{const p=t.result,I=await u.post("/update-qr",{file:p});c(null),s(I)}catch(p){o(p)}},t.readAsDataURL(a)})()});await g.promise(d,{loading:"uploading qr...",success:s=>s.data,error:s=>{var n,t;return((t=(n=s.response)==null?void 0:n.data)==null?void 0:t.error)||"Error, Image Should be less than 50kb."}})},S=async r=>{r.preventDefault();const d=new Promise((s,o)=>{(async()=>{try{const t=await u.post("/add-recharge-api",{recharge_type:"upi",api_key:m});x(""),f(),s(t)}catch(t){o(t)}})()});await g.promise(d,{loading:"updating upi...",success:s=>s.data.message,error:s=>{var n,t;return((t=(n=s.response)==null?void 0:n.data)==null?void 0:t.error)||"Error updating upi. Please try again."}})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"w-full my-4 flex items-center justify-between",children:e.jsxs(l,{variant:"link",onClick:b,className:"text-sm font-normal text-[#8C8C8C] !no-underline p-1 h-0 flex gap-2",children:[e.jsx(D.arrowLeft,{className:"w-4 h-4"})," Update UPI"]})}),e.jsx("div",{className:"flex items-center justify-center pt-[1rem]",children:e.jsx("div",{className:"bg-transparent w-full max-w-md rounded-lg mb-[60px] border-none dark",children:e.jsxs("form",{onSubmit:S,children:[e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(j,{htmlFor:"currentUpi",className:"block text-base text-[#9d9d9d] font-normal py-3",children:"Current UPI"}),e.jsx(y,{id:"currentUpi",type:"text",disabled:!0,className:"w-full h-12 pl-3 rounded-lg disabled:text-white disabled:!border-[#e0effe] focus:border-none disabled:opacity-100 disabled:bg-[#9D9D9D]/50",value:w})]}),!a&&e.jsxs("div",{children:[e.jsx(j,{htmlFor:"newUpi",className:"block text-base text-[#9d9d9d] font-normal py-3",children:"Enter New UPI"}),e.jsx(y,{id:"newUpi",type:"text",placeholder:"Enter new UPI",className:"w-full h-12 pl-3 rounded-lg text-[#9d9d9d] !placeholder-[#9d9d9d] bg-transparent border-[#e0effe] focus:border-none",required:!0,value:m,onChange:r=>x(r.target.value)})]})]}),e.jsx("input",{type:"file",ref:h,style:{display:"none"},accept:"image/*",onChange:U}),e.jsxs("div",{className:"flex flex-col items-center w-full",children:[e.jsx(l,{variant:"link",type:"button",className:"text-sm font-normal text-[#397CFF] !no-underline p-1",onClick:F,children:"Update QR Code"}),a&&e.jsxs(e.Fragment,{children:[e.jsx("div",{children:e.jsx("img",{src:URL.createObjectURL(a),alt:a.name,className:"w-full h-40 object-cover rounded-lg"})}),e.jsx("p",{className:"text-sm truncate w-full text-center",children:a&&a.name}),e.jsxs("div",{className:"w-full flex items-center justify-center gap-4 mt-4",children:[e.jsx(l,{type:"button",onClick:C,className:"py-1 px-8 text-xs bg-[#129BFF] text-white hover:bg-[#129BFF]",children:"Save"}),e.jsx(l,{type:"button",className:"py-1 px-6 text-xs !rounded-md border-2 border-white font-normal hover:!bg-white hover:text-black transition-colors duration-200 ease-in-out",onClick:k,children:"Delete"})]})]})]}),!a&&e.jsxs("div",{className:"w-full flex items-center justify-center gap-4 mt-8",children:[e.jsx(l,{type:"submit",className:"py-1 px-8 text-xs bg-[#129BFF] text-white hover:bg-[#129BFF]",children:"Save"}),e.jsx(l,{type:"button",className:"py-1 px-6 text-xs !rounded-md border-2 border-white font-normal hover:!bg-white hover:text-black transition-colors duration-200 ease-in-out",onClick:b,children:"Cancel"})]})]})})})]})},_=P()(E);export{_ as default};