import{u as be,r as l,j as t,L as ge,C as B,a as ye}from"./index-CJeyXc2E.js";const Ne=({lang:a,basket:$,set_basket:J,userSignIn:W,notify:Z})=>{var H,R,O,F,U,Y;be();const[e,G]=l.useState(null),[K,m]=l.useState("4x6"),[Q,u]=l.useState(0),[r,h]=l.useState(0),[w,T]=l.useState(3),[ze,D]=l.useState(!1),[k,L]=l.useState(!1),[N,ee]=l.useState(""),[q,E]=l.useState(!1),[je,we]=l.useState(0),[I,f]=l.useState(""),[te,v]=l.useState(!1),[b,se]=l.useState([]),[ae,ie]=l.useState({}),P=a=="uz"?"so'm":a=="en"?"uzs":a=="ru"?"сум":"so'm",ne={uz:["6 oy","12 oy","15 oy","18 oy","24 oy"],en:["6 mth","12 mth","15 mth","18 mth","24 mth"],ru:["6 мес","12 мес","15 мес","18 мес","24 мес"]};l.useEffect(()=>{if(q&&N){const s=$.findIndex(n=>n.id===e.id&&n.size.en===e.variants[r].size_en&&n.color.en===e.variants[r].color_en),i=[...$];if(s!==-1)i[s].quantity+=1,W&&(async()=>fetch("https://backkk.stroybazan1.uz/api/api/orders/create/",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({user:localStorage.getItem("userId")})}).then(o=>{console.log(o),console.log(localStorage.getItem("userId"))}).catch(o=>{console.log(o)}))();else{const n={img:e.variants[r].image?`https://backkk.stroybazan1.uz${e.variants[r].image}`:`https://backkk.stroybazan1.uz${e.image}`,id:e.id,name:{uz:e.name_uz,en:e.name_en,ru:e.name_ru},variant_id:e.variants[r].id,branch_id:e.branch,color:{uz:e.variants[r].color_uz,en:e.variants[r].color_en,ru:e.variants[r].color_ru},size:{uz:e.variants[r].size_uz,en:e.variants[r].size_en,ru:e.variants[r].size_ru},price:e.variants[r].price,quantity:1};i.push(n)}J(i),Z(N,"success"),localStorage.setItem("basket",JSON.stringify(i))}},[q,N]),l.useEffect(()=>{T(Number(localStorage.getItem("selectedPaymentIndex"))||0)},[]);const re=async()=>{try{const i=window.location.href.split("/").pop(),o=await(await fetch(`https://backkk.stroybazan1.uz/api/api/products/${i}/`)).json();G(o),m(o.variants[0][`size_${a}`]);const c=new Map,d={};o.variants.forEach((j,x)=>{const C=j[`size_${a}`];if(C){const p=C.toLowerCase().trim();d[p]||(d[p]=[]),d[p].push(x),c.has(p)||c.set(p,{size:C,variantIndex:x})}else console.warn(`No size available for variant ${x}`)});const z=Array.from(c.values());se(z),ie(d)}catch(s){console.error("Xatolik yuz berdi:",s)}};l.useEffect(()=>{re()},[]);const oe=()=>{if(!e||!e.variants||e.variants.length===0)return;const s=e.variants.length;if(s<=1)return;const i=r>0?r-1:s-1;f("slide-right"),v(!0),setTimeout(()=>{h(i);const n=e.variants[i][`size_${a}`];m(n);const o=b.findIndex(c=>c.size.toLowerCase()===n.toLowerCase());o!==-1&&u(o),setTimeout(()=>{v(!1),f("")},300)},50)},le=()=>{if(!e||!e.variants||e.variants.length===0)return;const s=e.variants.length;if(s<=1)return;const i=r<s-1?r+1:0;f("slide-left"),v(!0),setTimeout(()=>{h(i);const n=e.variants[i][`size_${a}`];m(n);const o=b.findIndex(c=>c.size.toLowerCase()===n.toLowerCase());o!==-1&&u(o),setTimeout(()=>{v(!1),f("")},300)},50)},M=s=>{h(s),m(e.variants[s][`size_${a}`]);const i=b.findIndex(n=>n.size.toLowerCase()===e.variants[s][`size_${a}`].toLowerCase());i!==-1&&u(i)},ce=(s,i)=>{m(s),u(i);const n=e.variants.findIndex(o=>o[`size_${a}`].toLowerCase()===s.toLowerCase());n!==-1&&h(n)},de=s=>{T(s),localStorage.setItem("selectedPaymentIndex",s)},xe=()=>{L(!0),setTimeout(()=>{D(!0),L(!1),me()},600)},me=()=>{ee("Mahsulot savatga qo'shildi"),E(!0),setTimeout(()=>{E(!1)},300)},S=s=>{s.target.src=`https://backkk.stroybazan1.uz${e.image}`},pe=s=>{var o,c,d,z,j,x;if(!e||!e.variants||!e.variants[s])return!1;const i=(d=(c=(o=e.variants[r])==null?void 0:o[`size_${a}`])==null?void 0:c.toLowerCase())==null?void 0:d.trim(),n=(x=(j=(z=e.variants[s])==null?void 0:z[`size_${a}`])==null?void 0:j.toLowerCase())==null?void 0:x.trim();return i&&n&&i===n};if(!e)return t.jsx("div",{});const A=[{months:6,percent:26},{months:12,percent:42},{months:15,percent:50},{months:18,percent:56},{months:24,percent:75}],ue=A.map(({months:s,percent:i})=>{const n=e.variants[r].price+e.variants[r].price*i/100;return Math.ceil(n/s)}),g=(H=e==null?void 0:e.variants)==null?void 0:H[r],he=g!=null&&g[`size_${a}`]?g[`size_${a}`].toLowerCase().trim():"";ae[he];const V=((R=e==null?void 0:e.variants)==null?void 0:R.length)>1;e[`units_${a}`];const X={uz:{deliveryTitle:"Yetkazib berish",deliveryHighlight1:"1 kun",deliveryHighlight2:"5mln so'mdan ortiq mahsulotga buyurtma bersangiz yetkazib berish VODIY bo'ylab be'pul.",installmentText:"Muddatli to'lovni rasmiylashtirayotganingizda bizdan va hamkorlarimizdan eng ma'qul takliflarga ega bo'lishingiz mumkin."},en:{deliveryTitle:"Delivery",deliveryHighlight1:"within 1 day",deliveryHighlight2:"If you order products over 5 million UZS, delivery is free across the valley.",installmentText:"When applying for an installment plan, you may receive the best offers from us and our partners."},ru:{deliveryTitle:"Доставка",deliveryHighlight1:"в течение 1 дня",deliveryHighlight2:"Если вы закажете товары на сумму более 5 миллионов сумов, доставка по долине бесплатна.",installmentText:"Оформляя рассрочку, вы можете получить лучшие предложения от нас и наших партнеров."}},fe={uz:{dona:"dona",litr:"litr"},en:{dona:"piece",litr:"liter"},ru:{dona:"штука",litr:"литр"}},ve=s=>{var n;if(!s)return"";const i=s.toLowerCase();return((n=fe[a])==null?void 0:n[i])||s},y=X[a]||X.uz,_=s=>s.image?`https://backkk.stroybazan1.uz${s.image}`:`https://backkk.stroybazan1.uz${e.image}`;return t.jsxs("div",{className:"w-full h-auto mt-[0px] sm:mt-[50px] px-[22px] sm:px-[190px] mb-[111px]",children:[t.jsx("style",{jsx:"true",children:`
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
      `}),t.jsx("div",{className:"mx-[-22px] sticky top-0 z-50 block sm:hidden",children:t.jsx("div",{className:"w-full h-[65px] bg-[#DCC38B]",children:t.jsxs(ge,{className:"w-full h-full flex items-center gap-[10px] pl-[13px]",to:"/",children:[t.jsx(B,{className:"scale-110"}),t.jsx("h1",{className:"font-inter font-[500] text-[15px] leading-[22px] text-black",children:e[`name_${a}`]})]})})}),t.jsx("h1",{className:"hidden sm:block font-inter font-[600] text-[20px] leading-[22px] text-black",children:e[`name_${a}`]}),t.jsxs("div",{className:"flex flex-col sm:flex-row gap-[20px]",children:[t.jsxs("div",{className:"product-div",children:[t.jsxs("div",{className:"mt-[20px] flex gap-[19px]",children:[t.jsx("div",{className:"hidden sm:block overflow-y-scroll h-[500px] image-selection-div space-y-[15px]",children:e.variants.map((s,i)=>t.jsx("div",{className:`border-[3px] ${r===i?"border-[rgba(190,160,134,1)]":"border-transparent"} overflow-hidden w-[158px] h-[156px] bg-[rgba(242,242,241,1)] rounded-[15px] flex justify-center items-center cursor-pointer`,onClick:()=>M(i),children:t.jsx("img",{src:_(s),onError:S,className:"w-[158px] h-[156px] object-fill"})},i))}),t.jsxs("div",{className:"flex justify-center items-center big-selected-image relative w-full sm:w-[504px] h-[330px] sm:h-[504px] overflow-hidden bg-[rgba(242,242,241,1)] rounded-[15px]",children:[t.jsx("div",{className:`nav-button cursor-pointer nav-button-left ${V?"":"disabled-nav"}`,onClick:oe,children:t.jsx(B,{size:24})}),t.jsx("div",{className:`nav-button cursor-pointer nav-button-right ${V?"":"disabled-nav"}`,onClick:le,children:t.jsx(ye,{size:24})}),t.jsx("img",{src:_(e.variants[r]),onError:S,className:`w-full sm:w-[504px] h-full sm:h-[504px] object-cover ${te?I:I?I==="slide-left"?"slide-in-right":"slide-in-left":""}`})]})]}),t.jsx("div",{className:"hidden sm:block",children:t.jsxs("div",{className:"mt-[40px] flex flex-col gap-[15px] w-[681px]",children:[t.jsx("h1",{className:"font-inter font-[600] text-[28px] leading-[22px] text-black",children:a=="uz"?"Tasnif":a=="en"?"Description":a=="ru"?"Описание":"Tasnif"}),t.jsx("p",{className:"font-inter font-[500] text-[16px] leading-[22px] text-black",children:e[`description_${a}`]})]})})]}),t.jsxs("div",{className:"product-details mt-[0px] sm:mt-[20px] max-w-full",children:[t.jsxs("div",{className:"flex flex-col gap-[10px]",children:[t.jsx("h5",{className:"font-inter font-[600] text-[16px] leading-[22px] text-[rgba(66,206,94,1)]",children:e.is_available?a=="uz"?"Mavjud":a=="en"?"Available":a=="ru"?"Доступно":"Mavjud":a=="uz"?"Mavjud emas":a=="en"?"Not available":a=="ru"?"Недоступно":"Mavjud emas"}),t.jsx("h1",{className:"font-inter font-[600] text-[24px] leading-[22px] text-black",children:e[`name_${a}`]})]}),((O=e==null?void 0:e.variants)==null?void 0:O.some(s=>s.color_uz||s.color_ru||s.color_en))&&t.jsxs("div",{className:"color-div mt-[7px] flex flex-col gap-[6px] max-w-full",children:[t.jsxs("h1",{className:"font-inter font-[400] text-[13px] leading-[22px] text-black",children:[a=="uz"?"Rang":a=="en"?"Color":a=="ru"?"Цвет":"Rang"," ",":"," ",t.jsxs("span",{className:"font-[500]",children:[((U=(F=e==null?void 0:e.variants)==null?void 0:F[r])==null?void 0:U[`color_${a}`])||""," "]})]}),t.jsx("div",{className:"select-color flex flex-wrap gap-[10px] max-w-full",children:(Y=e==null?void 0:e.variants)==null?void 0:Y.filter(s=>s.color_uz||s.color_ru||s.color_en).map((s,i)=>{const n=e.variants.findIndex(o=>o.id===s.id);return t.jsx("div",{className:`transition-all duration-200 overflow-hidden min-w-[62px] w-[62px] h-[80px] flex-shrink-0 flex justify-center items-center rounded-[5px] 
                    ${r===n?"border-[1.5px] border-[rgba(190,160,134,1)]":"border-transparent"} 
                    bg-[rgba(247,247,246,1)] cursor-pointer ${pe(n)?"":"dimmed"}`,onClick:()=>M(n),children:t.jsx("img",{src:_(s),onError:S,alt:s.color_uz||e[`name_${a}`],className:"object-contain w-full h-full"})},s.id)})})]}),t.jsxs("div",{className:"size-div mt-[20px] max-w-full",children:[t.jsxs("h1",{className:"font-inter font-[400] text-[13px] leading-[22px] text-black",children:[ve(e[`units_${a}`]),":"," ",t.jsx("span",{className:"font-[500]",children:K})]}),t.jsx("div",{className:"sizes flex flex-wrap gap-[10px] mt-[7px] transition-all duration-300 cursor-pointer max-w-full",children:b.map((s,i)=>t.jsx("div",{className:`active:scale-[99%] transition-all duration-200 flex justify-center items-center px-2 min-w-[62px] flex-shrink-0 h-[62px] rounded-[5px] 
        ${Q===i?"border-[rgba(190,160,134,1)] border-[1.5px]":"border-transparent"} 
        bg-[rgba(247,247,246,1)]`,onClick:()=>ce(s.size,i),children:t.jsx("span",{className:"font-inter whitespace-nowrap max-w-full font-[400] text-[16px] leading-[22px] text-black",children:s.size})},i))})]}),t.jsx("div",{className:"mt-[20px]",children:t.jsxs("h1",{className:"font-inter font-[700] text-[20px] leading-[22px] text-black",children:[e.variants[r].price," ",P]})}),t.jsxs("div",{className:"term-payment mt-[20px]",children:[t.jsxs("div",{className:"flex flex-col mt-8 justify-between w-full py-[11px] px-[14px] h-[94px] rounded-[8px] border-[1px] border-[rgba(213,213,213,1)] bg-[rgba(242,242,241,1)]",children:[t.jsx("div",{className:"w-full h-[30px] rounded-[5px] flex justify-between gap-[3.75px] bg-[rgba(213,213,213,1)]",children:ne[a].map((s,i)=>t.jsx("div",{className:`transition-all duration-100 flex justify-center items-center w-[80px] h-[30px] rounded-[5px] cursor-pointer ${w===i?"bg-white border-[1.5px] border-[rgba(190,160,134,1)]":""}`,onClick:()=>de(i),children:t.jsx("h1",{className:"font-inter font-[500] text-[14px] text-black",children:s})},i))}),t.jsxs("div",{className:"flex gap-[10px] items-center",children:[t.jsxs("h1",{className:"w-auto h-[28px] px-3 rounded-[4px] bg-[rgba(254,242,157,1)] font-inter font-[500] text-[14px] leading-[22px] flex justify-center items-center",children:[ue[w]," ",P]}),t.jsxs("h1",{className:"font-inter font-[500] text-[14px] leading-[22px] text-black",children:["x ",A[w].months," ",a==="uz"?"oy":a==="en"?"month":a==="ru"?"мес.":"oy"]})]})]}),t.jsx("p",{className:"mt-[10px] w-[318px] font-inter font-[400] sm:ml-3 text-[15px] leading-[22px] text-[rgba(0,0,0,0.75)]",children:a=="uz"?"Siz buyurtmani 6 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin.":a=="en"?"You can pay for your order for 6 months to 24 months.":a=="ru"?"Вы можете оплатить заказ на 6 месяца до 24 месяцев.":"Siz buyurtmani 6 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin."}),t.jsxs("div",{className:"payment-options p-[20px] mt-[20px] w-full h-fit rounded-[10px] border-[1px] border-[rgba(213,213,213,1)]",children:[t.jsxs("h1",{className:"font-inter font-[400] text-[15px] leading-[22px] text-[rgba(0,0,0,0.75)]",children:[y.deliveryTitle," ",t.jsx("span",{className:"font-inter font-[700]",children:y.deliveryHighlight1})," ",a=="uz"?"ichida.":"."," ",y.deliveryHighlight2]}),t.jsx("div",{className:"mt-[20px] w-full h-[1px] bg-[rgba(213,213,213,1)]"}),t.jsx("h1",{className:"mt-[20px] font-inter font-[400] text-[15px] leading-[22px] text-[rgba(0,0,0,0.75)]",children:y.installmentText})]}),t.jsxs("div",{className:"relative",children:[t.jsxs("button",{className:`mt-[20px] w-full h-[60px] rounded-[10px] bg-[rgba(220,195,139,1)] cursor-pointer hover:bg-[#e9d8b2] transition-all duration-200 font-inter font-[600] text-[15px] leading-[22px] text-black ${k?"animate-circle":""}`,onClick:xe,children:[t.jsx("h1",{className:"uppercase font-inter font-[600] text-[16px] leading-[22px] text-[#FFDF02] whitespace-nowrap"}),k?"":a=="uz"?"Savatchaga qo'shish":a=="en"?"Add to cart":a=="ru"?"Добавить в корзину":"Savatchaga qo'shish"]}),k&&t.jsx("div",{className:"absolute mt-[20px] inset-0 flex justify-center items-center",children:t.jsx("div",{className:"w-8 h-8 border-4 border-t-4 border-t-[#ffffff] border-transparent rounded-full animate-spin"})})]})]})]})]})]})};export{Ne as default};
