import{u as Ce,r as d,j as t,L as $e,C as te,a as Te,M as Le,T as se,P as qe}from"./index-DAYIqF8C.js";const Be=({lang:a,basket:_,set_basket:h,userSignIn:ae,notify:ne})=>{var D,W,Z,G,K,ee;Ce();const[e,re]=d.useState(null),[p,v]=d.useState("4x6"),[ie,g]=d.useState(0),[i,j]=d.useState(0),[C,Q]=d.useState(3),[Pe,oe]=d.useState(!1),[$,B]=d.useState(!1),[T,le]=d.useState(""),[A,O]=d.useState(!1),[Ee,Me]=d.useState(0),[L,z]=d.useState(""),[ce,w]=d.useState(!1),[N,de]=d.useState([]),[xe,ue]=d.useState({}),[k,b]=d.useState(1),V=a=="uz"?"so'm":a=="en"?"uzs":a=="ru"?"сум":"so'm",me={uz:["6 oy","12 oy","15 oy","18 oy","24 oy"],en:["6 mth","12 mth","15 mth","18 mth","24 mth"],ru:["6 мес","12 мес","15 мес","18 мес","24 мес"]},pe=(s,n,r)=>{h(o=>{const c=o.map(l=>{if(l.id===s&&l.size[a]===n&&l.color[a]===r){const m=l.quantity-1;return m>0?{...l,quantity:m}:null}return l}).filter(Boolean);return localStorage.setItem("basket",JSON.stringify(c)),c})},X=(s,n,r)=>{h(o=>{const c=o.filter(l=>!(l.id===s&&l.size[a]===n&&l.color[a]===r));return localStorage.setItem("basket",JSON.stringify(c)),c})},fe=(s,n,r)=>{h(o=>{const c=o.map(l=>l.id===s&&l.size[a]===n&&l.color[a]===r?{...l,quantity:l.quantity+1}:l);return localStorage.setItem("basket",JSON.stringify(c)),c})},H=(s,n,r,o,c)=>{let l=parseInt(o,10);if(isNaN(l)||l<1)if(c)l=1;else return;h(m=>{const f=m.map(x=>x.id===s&&x.size[a]===n&&x.color[a]===r?{...x,quantity:l}:x);return localStorage.setItem("basket",JSON.stringify(f)),f})};d.useEffect(()=>{if(A&&T){const s=_.findIndex(r=>r.id===e.id&&r.size.en===e.variants[i].size_en&&r.color.en===e.variants[i].color_en),n=[..._];if(s!==-1)n[s].quantity+=1,ae&&(async()=>fetch("https://backkk.stroybazan1.uz/api/api/orders/create/",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({user:localStorage.getItem("userId")})}).then(o=>{console.log(o),console.log(localStorage.getItem("userId"))}).catch(o=>{console.log(o)}))();else{const r={img:e.variants[i].image?`https://backkk.stroybazan1.uz${e.variants[i].image}`:`https://backkk.stroybazan1.uz${e.image}`,id:e.id,name:{uz:e.name_uz,en:e.name_en,ru:e.name_ru},variant_id:e.variants[i].id,branch_id:e.branch,color:{uz:e.variants[i].color_uz,en:e.variants[i].color_en,ru:e.variants[i].color_ru},size:{uz:e.variants[i].size_uz,en:e.variants[i].size_en,ru:e.variants[i].size_ru},price:e.variants[i].price,quantity:k};n.push(r)}h(n),ne(T,"success"),localStorage.setItem("basket",JSON.stringify(n))}},[A,T]),d.useEffect(()=>{Q(Number(localStorage.getItem("selectedPaymentIndex"))||0)},[]);const he=async()=>{try{const n=window.location.href.split("/").pop(),o=await(await fetch(`https://backkk.stroybazan1.uz/api/api/products/${n}/`)).json();re(o),v(o.variants[0][`size_${a}`]);const c=new Map,l={};o.variants.forEach((f,x)=>{const M=f[`size_${a}`];if(M){const y=M.toLowerCase().trim();l[y]||(l[y]=[]),l[y].push(x),c.has(y)||c.set(y,{size:M,variantIndex:x})}else console.warn(`No size available for variant ${x}`)});const m=Array.from(c.values());de(m),ue(l)}catch(s){console.error("Xatolik yuz berdi:",s)}};d.useEffect(()=>{he()},[]),d.useEffect(()=>{b(1)},[i]);const ve=()=>{if(!e||!e.variants||e.variants.length===0)return;const s=e.variants.length;if(s<=1)return;const n=i>0?i-1:s-1;z("slide-right"),w(!0),setTimeout(()=>{j(n);const r=e.variants[n][`size_${a}`];v(r);const o=N.findIndex(c=>c.size.toLowerCase()===r.toLowerCase());o!==-1&&g(o),setTimeout(()=>{w(!1),z("")},300)},50)},be=()=>{if(!e||!e.variants||e.variants.length===0)return;const s=e.variants.length;if(s<=1)return;const n=i<s-1?i+1:0;z("slide-left"),w(!0),setTimeout(()=>{j(n);const r=e.variants[n][`size_${a}`];v(r);const o=N.findIndex(c=>c.size.toLowerCase()===r.toLowerCase());o!==-1&&g(o),setTimeout(()=>{w(!1),z("")},300)},50)},R=s=>{j(s),v(e.variants[s][`size_${a}`]);const n=N.findIndex(r=>r.size.toLowerCase()===e.variants[s][`size_${a}`].toLowerCase());n!==-1&&g(n)},ye=(s,n)=>{v(s),g(n);const r=e.variants.findIndex(o=>o[`size_${a}`].toLowerCase()===s.toLowerCase());r!==-1&&j(r)},ge=s=>{Q(s),localStorage.setItem("selectedPaymentIndex",s)},je=()=>{B(!0),setTimeout(()=>{oe(!0),B(!1),ze()},600)},ze=()=>{le("Mahsulot savatga qo'shildi"),O(!0),setTimeout(()=>{O(!1)},300)},q=s=>{s.target.src=`https://backkk.stroybazan1.uz${e.image}`},we=s=>{var o,c,l,m,f,x;if(!e||!e.variants||!e.variants[s])return!1;const n=(l=(c=(o=e.variants[i])==null?void 0:o[`size_${a}`])==null?void 0:c.toLowerCase())==null?void 0:l.trim(),r=(x=(f=(m=e.variants[s])==null?void 0:m[`size_${a}`])==null?void 0:f.toLowerCase())==null?void 0:x.trim();return n&&r&&n===r};if(!e)return t.jsx("div",{});const P=_.find(s=>s.variant_id===e.variants[i].id),J=[{months:6,percent:26},{months:12,percent:42},{months:15,percent:50},{months:18,percent:56},{months:24,percent:75}],u=!!P,Y=u?P.quantity:k,Ne=u?P.quantity:k===""?1:k,ke=J.map(({months:s,percent:n})=>{const r=e.variants[i].price*Ne,o=r+r*n/100;return Math.ceil(o/s)}),I=(D=e==null?void 0:e.variants)==null?void 0:D[i],Ie=I!=null&&I[`size_${a}`]?I[`size_${a}`].toLowerCase().trim():"";xe[Ie];const F=((W=e==null?void 0:e.variants)==null?void 0:W.length)>1;e[`units_${a}`];const U={uz:{deliveryTitle:"Yetkazib berish",deliveryHighlight1:"1 kun",deliveryHighlight2:"5mln so'mdan ortiq mahsulotga buyurtma bersangiz yetkazib berish VODIY bo'ylab be'pul.",installmentText:"Muddatli to'lovni rasmiylashtirayotganingizda bizdan va hamkorlarimizdan eng ma'qul takliflarga ega bo'lishingiz mumkin."},en:{deliveryTitle:"Delivery",deliveryHighlight1:"within 1 day",deliveryHighlight2:"If you order products over 5 million UZS, delivery is free across the valley.",installmentText:"When applying for an installment plan, you may receive the best offers from us and our partners."},ru:{deliveryTitle:"Доставка",deliveryHighlight1:"в течение 1 дня",deliveryHighlight2:"Если вы закажете товары на сумму более 5 миллионов сумов, доставка по долине бесплатна.",installmentText:"Оформляя рассрочку, вы можете получить лучшие предложения от нас и наших партнеров."}},Se={uz:{dona:"dona",litr:"litr"},en:{dona:"piece",litr:"liter"},ru:{dona:"штука",litr:"литр"}},_e=s=>{var r;if(!s)return"";const n=s.toLowerCase();return((r=Se[a])==null?void 0:r[n])||s},S=U[a]||U.uz,E=s=>s.image?`https://backkk.stroybazan1.uz${s.image}`:`https://backkk.stroybazan1.uz${e.image}`;return t.jsxs("div",{className:"w-full h-auto mt-[0px] sm:mt-[50px] px-[22px] sm:px-[190px] mb-[111px]",children:[t.jsx("style",{jsx:"true",children:`
        @keyframes slideLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-20px);
            opacity: 0;
          }
        }
        @keyframes slideRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(20px);
            opacity: 0;
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .slide-left {
          animation: slideLeft 0.3s forwards;
        }
        .slide-right {
          animation: slideRight 0.3s forwards;
        }
        .slide-in-left {
          animation: slideInLeft 0.3s forwards;
        }
        .slide-in-right {
          animation: slideInRight 0.3s forwards;
        }
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }
        .nav-button:hover {
          background-color: rgba(255, 255, 255, 0.9);
        }
        .nav-button-left {
          left: 10px;
        }
        .nav-button-right {
          right: 10px;
        }
        .dimmed {
          opacity: 0.4;
          pointer-events: none;
        }
        .disabled-nav {
          opacity: 0;
          cursor: not-allowed;
          pointer-events: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}),t.jsx("div",{className:"mx-[-22px] sticky top-0 z-50 block sm:hidden",children:t.jsx("div",{className:"w-full h-[65px] bg-[#DCC38B]",children:t.jsxs($e,{className:"w-full h-full flex items-center gap-[10px] pl-[13px]",to:"/",children:[t.jsx(te,{className:"scale-110"}),t.jsx("h1",{className:"font-inter font-[500] text-[15px] leading-[22px] text-black",children:e[`name_${a}`]})]})})}),t.jsx("h1",{className:"hidden sm:block font-inter font-[600] text-[20px] leading-[22px] text-black",children:e[`name_${a}`]}),t.jsxs("div",{className:"flex flex-col sm:flex-row gap-[20px]",children:[t.jsxs("div",{className:"product-div",children:[t.jsxs("div",{className:"mt-[20px] flex gap-[19px]",children:[t.jsx("div",{className:"hidden sm:block overflow-y-scroll h-[500px] image-selection-div space-y-[15px]",children:e.variants.map((s,n)=>t.jsx("div",{className:`border-[3px] ${i===n?"border-[rgba(190,160,134,1)]":"border-transparent"} overflow-hidden w-[158px] h-[156px] bg-[rgba(242,242,241,1)] rounded-[15px] flex justify-center items-center cursor-pointer`,onClick:()=>R(n),children:t.jsx("img",{src:E(s),onError:q,className:"w-[158px] h-[156px] object-fill"})},n))}),t.jsxs("div",{className:"flex justify-center items-center big-selected-image relative w-full sm:w-[504px] h-[330px] sm:h-[504px] overflow-hidden bg-[rgba(242,242,241,1)] rounded-[15px]",children:[t.jsx("div",{className:`nav-button cursor-pointer nav-button-left ${F?"":"disabled-nav"}`,onClick:ve,children:t.jsx(te,{size:24})}),t.jsx("div",{className:`nav-button cursor-pointer nav-button-right ${F?"":"disabled-nav"}`,onClick:be,children:t.jsx(Te,{size:24})}),t.jsx("img",{src:E(e.variants[i]),onError:q,className:`w-full sm:w-[504px] h-full sm:h-[504px] object-cover ${ce?L:L?L==="slide-left"?"slide-in-right":"slide-in-left":""}`})]})]}),t.jsx("div",{className:"w-auto sm:block hidden",children:t.jsxs("div",{className:"mt-[40px] flex flex-col gap-[15px] sm:w-[681px] w-full",children:[t.jsx("h1",{className:"font-inter font-[600] text-[28px] leading-[22px] text-black",children:a=="uz"?"Tasnif":a=="en"?"Description":a=="ru"?"Описание":"Tasnif"}),t.jsx("p",{className:"font-inter font-[500] text-[13px] sm:text-[16px] leading-[18px] sm:leading-[22px] text-black",children:e[`description_${a}`]})]})})]}),t.jsxs("div",{className:"product-details mt-[0px] sm:mt-[20px] max-w-full",children:[t.jsxs("div",{className:"flex flex-col gap-[10px]",children:[t.jsx("h5",{className:"font-inter font-[600] text-[16px] leading-[22px] text-[rgba(66,206,94,1)]",children:e.is_available?a=="uz"?"Mavjud":a=="en"?"Available":a=="ru"?"Доступно":"Mavjud":a=="uz"?"Mavjud emas":a=="en"?"Not available":a=="ru"?"Недоступно":"Mavjud emas"}),t.jsx("h1",{className:"font-inter font-[600] text-[24px] leading-[22px] text-black",children:e[`name_${a}`]})]}),((Z=e==null?void 0:e.variants)==null?void 0:Z.some(s=>s.color_uz||s.color_ru||s.color_en))&&t.jsxs("div",{className:"color-div mt-[7px] flex flex-col gap-[6px] max-w-full",children:[t.jsxs("h1",{className:"font-inter font-[400] text-[13px] leading-[22px] text-black",children:[a=="uz"?"Rang":a=="en"?"Color":a=="ru"?"Цвет":"Rang"," ",":"," ",t.jsxs("span",{className:"font-[500]",children:[((K=(G=e==null?void 0:e.variants)==null?void 0:G[i])==null?void 0:K[`color_${a}`])||""," "]})]}),t.jsx("div",{className:"select-color flex flex-wrap gap-[10px] max-w-full",children:(ee=e==null?void 0:e.variants)==null?void 0:ee.filter(s=>s.color_uz||s.color_ru||s.color_en).map((s,n)=>{const r=e.variants.findIndex(o=>o.id===s.id);return t.jsx("div",{className:`transition-all duration-200 overflow-hidden min-w-[62px] w-[62px] h-[80px] flex-shrink-0 flex justify-center items-center rounded-[5px] 
                    ${i===r?"border-[1.5px] border-[rgba(190,160,134,1)]":"border-transparent"} 
                    bg-[rgba(247,247,246,1)] cursor-pointer ${we(r)?"":"dimmed"}`,onClick:()=>R(r),children:t.jsx("img",{src:E(s),onError:q,alt:s.color_uz||e[`name_${a}`],className:"object-contain w-full h-full"})},s.id)})})]}),t.jsxs("div",{className:"size-div mt-[20px] max-w-full",children:[t.jsxs("h1",{className:"font-inter font-[400] text-[13px] leading-[22px] text-black",children:[_e(e[`units_${a}`]),":"," ",t.jsx("span",{className:"font-[500]",children:p})]}),t.jsx("div",{className:"sizes flex flex-wrap gap-[10px] mt-[7px] transition-all duration-300 cursor-pointer max-w-full",children:N.map((s,n)=>t.jsx("div",{className:`active:scale-[99%] transition-all duration-200 flex justify-center items-center px-2 min-w-[62px] flex-shrink-0 h-[62px] rounded-[5px] 
        ${ie===n?"border-[rgba(190,160,134,1)] border-[1.5px]":"border-transparent"} 
        bg-[rgba(247,247,246,1)]`,onClick:()=>ye(s.size,n),children:t.jsx("span",{className:"font-inter whitespace-nowrap max-w-full font-[400] text-[16px] leading-[22px] text-black",children:s.size})},n))})]}),t.jsx("div",{className:"mt-[20px]",children:t.jsxs("h1",{className:"font-inter font-[700] text-[20px] leading-[22px] text-black",children:[e.variants[i].price," ",V]})}),t.jsx("div",{className:"w-auto sm:hidden block",children:t.jsxs("div",{className:"mt-[40px] flex flex-col gap-[15px] sm:w-[681px] w-full",children:[t.jsx("h1",{className:"font-inter font-[600] text-[28px] leading-[22px] text-black",children:a=="uz"?"Tasnif":a=="en"?"Description":a=="ru"?"Описание":"Tasnif"}),t.jsx("p",{className:"font-inter font-[500] text-[13px] sm:text-[16px] leading-[18px] sm:leading-[22px] text-black",children:e[`description_${a}`]})]})}),t.jsxs("div",{className:"term-payment mt-[20px]",children:[t.jsxs("div",{className:"flex flex-col mt-8 justify-between w-full py-[11px] px-[14px] h-[94px] rounded-[8px] border-[1px] border-[rgba(213,213,213,1)] bg-[rgba(242,242,241,1)]",children:[t.jsx("div",{className:"w-full h-[30px] rounded-[5px] flex justify-between gap-[3.75px] bg-[rgba(213,213,213,1)]",children:me[a].map((s,n)=>t.jsx("div",{className:`transition-all duration-100 flex justify-center items-center w-[80px] h-[30px] rounded-[5px] cursor-pointer ${C===n?"bg-white border-[1.5px] border-[rgba(190,160,134,1)]":""}`,onClick:()=>ge(n),children:t.jsx("h1",{className:"font-inter font-[500] text-[14px] text-black",children:s})},n))}),t.jsxs("div",{className:"flex gap-[10px] items-center",children:[t.jsxs("h1",{className:"w-auto h-[28px] px-3 rounded-[4px] bg-[rgba(254,242,157,1)] font-inter font-[500] text-[14px] leading-[22px] flex justify-center items-center",children:[ke[C]," ",V]}),t.jsxs("h1",{className:"font-inter font-[500] text-[14px] leading-[22px] text-black",children:["x ",J[C].months," ",a==="uz"?"oy":a==="en"?"month":a==="ru"?"мес.":"oy"]})]})]}),t.jsx("p",{className:"mt-[10px] w-[318px] font-inter font-[400] sm:ml-3 text-[15px] leading-[22px] text-[rgba(0,0,0,0.75)]",children:a=="uz"?"Siz buyurtmani 6 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin.":a=="en"?"You can pay for your order for 6 months to 24 months.":a=="ru"?"Вы можете оплатить заказ на 6 месяца до 24 месяцев.":"Siz buyurtmani 6 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin."}),t.jsxs("div",{className:"payment-options p-[20px] mt-[20px] w-full h-fit rounded-[10px] border-[1px] border-[rgba(213,213,213,1)]",children:[t.jsxs("h1",{className:"font-inter font-[400] text-[15px] leading-[22px] text-[rgba(0,0,0,0.75)]",children:[S.deliveryTitle," ",t.jsx("span",{className:"font-inter font-[700]",children:S.deliveryHighlight1})," ",a=="uz"?"ichida.":"."," ",S.deliveryHighlight2]}),t.jsx("div",{className:"mt-[20px] w-full h-[1px] bg-[rgba(213,213,213,1)]"}),t.jsx("h1",{className:"mt-[20px] font-inter font-[400] text-[15px] leading-[22px] text-[rgba(0,0,0,0.75)]",children:S.installmentText})]}),t.jsxs("div",{className:"relative",children:[t.jsxs("div",{className:"flex justify-between",children:[t.jsxs("div",{className:"flex items-center mt-4 sm:mt-10",children:[Y>1?t.jsx("button",{onClick:()=>{u?pe(e.id,p,e.variants[i][`color_${a}`]):b(s=>s-1)},className:"flex items-center justify-center w-8 h-8 border rounded-md cursor-pointer hover:bg-gray-50",children:t.jsx(Le,{className:"w-4 h-4 text-gray-600"})}):t.jsx("button",{onClick:()=>{u&&X(e.id,p,e.variants[i][`color_${a}`])},className:`flex items-center justify-center w-8 h-8 text-red-500 border rounded-md ${u?"cursor-pointer hover:bg-red-50":"cursor-not-allowed opacity-50"}`,children:t.jsx(se,{className:"w-4 h-4"})}),t.jsx("input",{className:"w-16 mx-3 text-center border rounded-md sm:mx-4 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#DCC38B] focus:border-transparent",type:"number",value:Y,onChange:s=>{const n=s.target.value;u?H(e.id,p,e.variants[i][`color_${a}`],n,!1):b(n===""?"":parseInt(n)||1)},onBlur:s=>{if(u)H(e.id,p,e.variants[i][`color_${a}`],s.target.value,!0);else{let n=parseInt(s.target.value,10);(isNaN(n)||n<1)&&(n=1),b(n)}}}),t.jsx("button",{onClick:()=>{u?fe(e.id,p,e.variants[i][`color_${a}`]):b(s=>typeof s=="number"?s+1:2)},className:"flex items-center justify-center w-8 h-8 border rounded-md cursor-pointer hover:bg-gray-50",children:t.jsx(qe,{className:"w-4 h-4 text-gray-600"})})]}),t.jsx("div",{className:"flex items-end justify-center",children:t.jsxs("button",{onClick:()=>u&&X(e.id,p,e.variants[i][`color_${a}`]),className:`sm:w-37 sm:h-8.5 w-9 h-7.5 ${u?"opacity-70 sm:opacity-50 hover:opacity-100":"opacity-0 pointer-events-none"} duration-200 overflow-hidden justify-end gap-[8px] rounded-md flex items-center cursor-pointer sm:mr-0 text-gray-600 hover:text-gray-800`,children:[t.jsx(se,{className:"w-4 h-4"}),t.jsx("h1",{className:"hidden sm:block",children:a=="uz"?"Yo'q qilish":a=="en"?"Delete":"Удалить"})]})})]}),t.jsxs("button",{className:`mt-[20px] w-full h-[60px] rounded-[10px] bg-[rgba(220,195,139,1)] cursor-pointer hover:bg-[#e9d8b2] transition-all duration-200 font-inter font-[600] text-[15px] leading-[22px] text-black ${$?"animate-circle":""}`,onClick:je,children:[t.jsx("h1",{className:"uppercase font-inter font-[600] text-[16px] leading-[22px] text-[#FFDF02] whitespace-nowrap"}),$?"":a=="uz"?"Savatga qo'shish":a=="en"?"Add to cart":a=="ru"?"Добавить в корзину":"Savatga qo'shish"]}),$&&t.jsx("div",{className:"absolute mt-[90px] inset-0 flex justify-center items-center",children:t.jsx("div",{className:"w-8 h-8 border-4 border-t-4 border-t-[#ffffff] border-transparent rounded-full animate-spin"})})]})]})]})]})]})};export{Be as default};
