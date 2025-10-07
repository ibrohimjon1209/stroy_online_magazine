import{u as ke,r as x,j as e,L as Se,C as D,a as Ie,M as Ce,T as Z,P as _e}from"./index-B6cYWncL.js";const Pe=({lang:t,basket:k,set_basket:f,userSignIn:G,notify:K})=>{var J,Q,Y,F,U,W;ke();const[s,ee]=x.useState(null),[te,h]=x.useState("4x6"),[se,v]=x.useState(0),[l,y]=x.useState(0),[S,L]=x.useState(3),[$e,re]=x.useState(!1),[I,P]=x.useState(!1),[C,ae]=x.useState(""),[M,E]=x.useState(!1),[Te,qe]=x.useState(0),[_,g]=x.useState(""),[ie,z]=x.useState(!1),[j,ne]=x.useState([]),[oe,le]=x.useState({}),A=t=="uz"?"so'm":t=="en"?"uzs":t=="ru"?"сум":"so'm",ce={uz:["6 oy","12 oy","15 oy","18 oy","24 oy"],en:["6 mth","12 mth","15 mth","18 mth","24 mth"],ru:["6 мес","12 мес","15 мес","18 мес","24 мес"]},de=(r,a,i)=>{f(n=>{const d=n.map(o=>{if(o.id===r&&o.size[t]===a&&o.color[t]===i){const m=o.quantity-1;return m>0?{...o,quantity:m}:null}return o}).filter(Boolean);return localStorage.setItem("basket",JSON.stringify(d)),d})},B=(r,a,i)=>{f(n=>{const d=n.filter(o=>!(o.id===r&&o.size[t]===a&&o.color[t]===i));return localStorage.setItem("basket",JSON.stringify(d)),d})},xe=(r,a,i)=>{f(n=>{const d=n.map(o=>o.id===r&&o.size[t]===a&&o.color[t]===i?{...o,quantity:o.quantity+1}:o);return localStorage.setItem("basket",JSON.stringify(d)),d})},O=(r,a,i,n,d)=>{let o=parseInt(n,10);if(isNaN(o)||o<1)if(d)o=1;else return;f(m=>{const p=m.map(u=>u.id===r&&u.size[t]===a&&u.color[t]===i?{...u,quantity:o}:u);return localStorage.setItem("basket",JSON.stringify(p)),p})};x.useEffect(()=>{if(M&&C){const r=k.findIndex(i=>i.id===s.id&&i.size.en===s.variants[l].size_en&&i.color.en===s.variants[l].color_en),a=[...k];if(r!==-1)a[r].quantity+=1,G&&(async()=>fetch("https://backkk.stroybazan1.uz/api/api/orders/create/",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({user:localStorage.getItem("userId")})}).then(n=>{console.log(n),console.log(localStorage.getItem("userId"))}).catch(n=>{console.log(n)}))();else{const i={img:s.variants[l].image?`https://backkk.stroybazan1.uz${s.variants[l].image}`:`https://backkk.stroybazan1.uz${s.image}`,id:s.id,name:{uz:s.name_uz,en:s.name_en,ru:s.name_ru},variant_id:s.variants[l].id,branch_id:s.branch,color:{uz:s.variants[l].color_uz,en:s.variants[l].color_en,ru:s.variants[l].color_ru},size:{uz:s.variants[l].size_uz,en:s.variants[l].size_en,ru:s.variants[l].size_ru},price:s.variants[l].price,quantity:1};a.push(i)}f(a),K(C,"success"),localStorage.setItem("basket",JSON.stringify(a))}},[M,C]),x.useEffect(()=>{L(Number(localStorage.getItem("selectedPaymentIndex"))||0)},[]);const ue=async()=>{try{const a=window.location.href.split("/").pop(),n=await(await fetch(`https://backkk.stroybazan1.uz/api/api/products/${a}/`)).json();ee(n),h(n.variants[0][`size_${t}`]);const d=new Map,o={};n.variants.forEach((p,u)=>{const q=p[`size_${t}`];if(q){const b=q.toLowerCase().trim();o[b]||(o[b]=[]),o[b].push(u),d.has(b)||d.set(b,{size:q,variantIndex:u})}else console.warn(`No size available for variant ${u}`)});const m=Array.from(d.values());ne(m),le(o)}catch(r){console.error("Xatolik yuz berdi:",r)}};x.useEffect(()=>{ue()},[]);const me=()=>{if(!s||!s.variants||s.variants.length===0)return;const r=s.variants.length;if(r<=1)return;const a=l>0?l-1:r-1;g("slide-right"),z(!0),setTimeout(()=>{y(a);const i=s.variants[a][`size_${t}`];h(i);const n=j.findIndex(d=>d.size.toLowerCase()===i.toLowerCase());n!==-1&&v(n),setTimeout(()=>{z(!1),g("")},300)},50)},pe=()=>{if(!s||!s.variants||s.variants.length===0)return;const r=s.variants.length;if(r<=1)return;const a=l<r-1?l+1:0;g("slide-left"),z(!0),setTimeout(()=>{y(a);const i=s.variants[a][`size_${t}`];h(i);const n=j.findIndex(d=>d.size.toLowerCase()===i.toLowerCase());n!==-1&&v(n),setTimeout(()=>{z(!1),g("")},300)},50)},V=r=>{y(r),h(s.variants[r][`size_${t}`]);const a=j.findIndex(i=>i.size.toLowerCase()===s.variants[r][`size_${t}`].toLowerCase());a!==-1&&v(a)},fe=(r,a)=>{h(r),v(a);const i=s.variants.findIndex(n=>n[`size_${t}`].toLowerCase()===r.toLowerCase());i!==-1&&y(i)},he=r=>{L(r),localStorage.setItem("selectedPaymentIndex",r)},be=()=>{P(!0),setTimeout(()=>{re(!0),P(!1),ve()},600)},ve=()=>{ae("Mahsulot savatga qo'shildi"),E(!0),setTimeout(()=>{E(!1)},300)},$=r=>{r.target.src=`https://backkk.stroybazan1.uz${s.image}`},ye=r=>{var n,d,o,m,p,u;if(!s||!s.variants||!s.variants[r])return!1;const a=(o=(d=(n=s.variants[l])==null?void 0:n[`size_${t}`])==null?void 0:d.toLowerCase())==null?void 0:o.trim(),i=(u=(p=(m=s.variants[r])==null?void 0:m[`size_${t}`])==null?void 0:p.toLowerCase())==null?void 0:u.trim();return a&&i&&a===i};if(!s)return e.jsx("div",{});const c=k.find(r=>r.variant_id===s.variants[l].id),X=[{months:6,percent:26},{months:12,percent:42},{months:15,percent:50},{months:18,percent:56},{months:24,percent:75}],ge=c?c.quantity:1,ze=X.map(({months:r,percent:a})=>{const i=s.variants[l].price*ge,n=i+i*a/100;return Math.ceil(n/r)}),w=(J=s==null?void 0:s.variants)==null?void 0:J[l],je=w!=null&&w[`size_${t}`]?w[`size_${t}`].toLowerCase().trim():"";oe[je];const H=((Q=s==null?void 0:s.variants)==null?void 0:Q.length)>1;s[`units_${t}`];const R={uz:{deliveryTitle:"Yetkazib berish",deliveryHighlight1:"1 kun",deliveryHighlight2:"5mln so'mdan ortiq mahsulotga buyurtma bersangiz yetkazib berish VODIY bo'ylab be'pul.",installmentText:"Muddatli to'lovni rasmiylashtirayotganingizda bizdan va hamkorlarimizdan eng ma'qul takliflarga ega bo'lishingiz mumkin."},en:{deliveryTitle:"Delivery",deliveryHighlight1:"within 1 day",deliveryHighlight2:"If you order products over 5 million UZS, delivery is free across the valley.",installmentText:"When applying for an installment plan, you may receive the best offers from us and our partners."},ru:{deliveryTitle:"Доставка",deliveryHighlight1:"в течение 1 дня",deliveryHighlight2:"Если вы закажете товары на сумму более 5 миллионов сумов, доставка по долине бесплатна.",installmentText:"Оформляя рассрочку, вы можете получить лучшие предложения от нас и наших партнеров."}},we={uz:{dona:"dona",litr:"litr"},en:{dona:"piece",litr:"liter"},ru:{dona:"штука",litr:"литр"}},Ne=r=>{var i;if(!r)return"";const a=r.toLowerCase();return((i=we[t])==null?void 0:i[a])||r},N=R[t]||R.uz,T=r=>r.image?`https://backkk.stroybazan1.uz${r.image}`:`https://backkk.stroybazan1.uz${s.image}`;return e.jsxs("div",{className:"w-full h-auto mt-[0px] sm:mt-[50px] px-[22px] sm:px-[190px] mb-[111px]",children:[e.jsx("style",{jsx:"true",children:`
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
      `}),e.jsx("div",{className:"mx-[-22px] sticky top-0 z-50 block sm:hidden",children:e.jsx("div",{className:"w-full h-[65px] bg-[#DCC38B]",children:e.jsxs(Se,{className:"w-full h-full flex items-center gap-[10px] pl-[13px]",to:"/",children:[e.jsx(D,{className:"scale-110"}),e.jsx("h1",{className:"font-inter font-[500] text-[15px] leading-[22px] text-black",children:s[`name_${t}`]})]})})}),e.jsx("h1",{className:"hidden sm:block font-inter font-[600] text-[20px] leading-[22px] text-black",children:s[`name_${t}`]}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-[20px]",children:[e.jsxs("div",{className:"product-div",children:[e.jsxs("div",{className:"mt-[20px] flex gap-[19px]",children:[e.jsx("div",{className:"hidden sm:block overflow-y-scroll h-[500px] image-selection-div space-y-[15px]",children:s.variants.map((r,a)=>e.jsx("div",{className:`border-[3px] ${l===a?"border-[rgba(190,160,134,1)]":"border-transparent"} overflow-hidden w-[158px] h-[156px] bg-[rgba(242,242,241,1)] rounded-[15px] flex justify-center items-center cursor-pointer`,onClick:()=>V(a),children:e.jsx("img",{src:T(r),onError:$,className:"w-[158px] h-[156px] object-fill"})},a))}),e.jsxs("div",{className:"flex justify-center items-center big-selected-image relative w-full sm:w-[504px] h-[330px] sm:h-[504px] overflow-hidden bg-[rgba(242,242,241,1)] rounded-[15px]",children:[e.jsx("div",{className:`nav-button cursor-pointer nav-button-left ${H?"":"disabled-nav"}`,onClick:me,children:e.jsx(D,{size:24})}),e.jsx("div",{className:`nav-button cursor-pointer nav-button-right ${H?"":"disabled-nav"}`,onClick:pe,children:e.jsx(Ie,{size:24})}),e.jsx("img",{src:T(s.variants[l]),onError:$,className:`w-full sm:w-[504px] h-full sm:h-[504px] object-cover ${ie?_:_?_==="slide-left"?"slide-in-right":"slide-in-left":""}`})]})]}),e.jsx("div",{className:"w-auto",children:e.jsxs("div",{className:"mt-[40px] flex flex-col gap-[15px] sm:w-[681px] w-full",children:[e.jsx("h1",{className:"font-inter font-[600] text-[28px] leading-[22px] text-black",children:t=="uz"?"Tasnif":t=="en"?"Description":t=="ru"?"Описание":"Tasnif"}),e.jsx("p",{className:"font-inter font-[500] text-[13px] sm:text-[16px] leading-[18px] sm:leading-[22px] text-black",children:s[`description_${t}`]})]})})]}),e.jsxs("div",{className:"product-details mt-[0px] sm:mt-[20px] max-w-full",children:[e.jsxs("div",{className:"flex flex-col gap-[10px]",children:[e.jsx("h5",{className:"font-inter font-[600] text-[16px] leading-[22px] text-[rgba(66,206,94,1)]",children:s.is_available?t=="uz"?"Mavjud":t=="en"?"Available":t=="ru"?"Доступно":"Mavjud":t=="uz"?"Mavjud emas":t=="en"?"Not available":t=="ru"?"Недоступно":"Mavjud emas"}),e.jsx("h1",{className:"font-inter font-[600] text-[24px] leading-[22px] text-black",children:s[`name_${t}`]})]}),((Y=s==null?void 0:s.variants)==null?void 0:Y.some(r=>r.color_uz||r.color_ru||r.color_en))&&e.jsxs("div",{className:"color-div mt-[7px] flex flex-col gap-[6px] max-w-full",children:[e.jsxs("h1",{className:"font-inter font-[400] text-[13px] leading-[22px] text-black",children:[t=="uz"?"Rang":t=="en"?"Color":t=="ru"?"Цвет":"Rang"," ",":"," ",e.jsxs("span",{className:"font-[500]",children:[((U=(F=s==null?void 0:s.variants)==null?void 0:F[l])==null?void 0:U[`color_${t}`])||""," "]})]}),e.jsx("div",{className:"select-color flex flex-wrap gap-[10px] max-w-full",children:(W=s==null?void 0:s.variants)==null?void 0:W.filter(r=>r.color_uz||r.color_ru||r.color_en).map((r,a)=>{const i=s.variants.findIndex(n=>n.id===r.id);return e.jsx("div",{className:`transition-all duration-200 overflow-hidden min-w-[62px] w-[62px] h-[80px] flex-shrink-0 flex justify-center items-center rounded-[5px] 
                    ${l===i?"border-[1.5px] border-[rgba(190,160,134,1)]":"border-transparent"} 
                    bg-[rgba(247,247,246,1)] cursor-pointer ${ye(i)?"":"dimmed"}`,onClick:()=>V(i),children:e.jsx("img",{src:T(r),onError:$,alt:r.color_uz||s[`name_${t}`],className:"object-contain w-full h-full"})},r.id)})})]}),e.jsxs("div",{className:"size-div mt-[20px] max-w-full",children:[e.jsxs("h1",{className:"font-inter font-[400] text-[13px] leading-[22px] text-black",children:[Ne(s[`units_${t}`]),":"," ",e.jsx("span",{className:"font-[500]",children:te})]}),e.jsx("div",{className:"sizes flex flex-wrap gap-[10px] mt-[7px] transition-all duration-300 cursor-pointer max-w-full",children:j.map((r,a)=>e.jsx("div",{className:`active:scale-[99%] transition-all duration-200 flex justify-center items-center px-2 min-w-[62px] flex-shrink-0 h-[62px] rounded-[5px] 
        ${se===a?"border-[rgba(190,160,134,1)] border-[1.5px]":"border-transparent"} 
        bg-[rgba(247,247,246,1)]`,onClick:()=>fe(r.size,a),children:e.jsx("span",{className:"font-inter whitespace-nowrap max-w-full font-[400] text-[16px] leading-[22px] text-black",children:r.size})},a))})]}),e.jsx("div",{className:"mt-[20px]",children:e.jsxs("h1",{className:"font-inter font-[700] text-[20px] leading-[22px] text-black",children:[s.variants[l].price," ",A]})}),e.jsxs("div",{className:"term-payment mt-[20px]",children:[e.jsxs("div",{className:"flex flex-col mt-8 justify-between w-full py-[11px] px-[14px] h-[94px] rounded-[8px] border-[1px] border-[rgba(213,213,213,1)] bg-[rgba(242,242,241,1)]",children:[e.jsx("div",{className:"w-full h-[30px] rounded-[5px] flex justify-between gap-[3.75px] bg-[rgba(213,213,213,1)]",children:ce[t].map((r,a)=>e.jsx("div",{className:`transition-all duration-100 flex justify-center items-center w-[80px] h-[30px] rounded-[5px] cursor-pointer ${S===a?"bg-white border-[1.5px] border-[rgba(190,160,134,1)]":""}`,onClick:()=>he(a),children:e.jsx("h1",{className:"font-inter font-[500] text-[14px] text-black",children:r})},a))}),e.jsxs("div",{className:"flex gap-[10px] items-center",children:[e.jsxs("h1",{className:"w-auto h-[28px] px-3 rounded-[4px] bg-[rgba(254,242,157,1)] font-inter font-[500] text-[14px] leading-[22px] flex justify-center items-center",children:[ze[S]," ",A]}),e.jsxs("h1",{className:"font-inter font-[500] text-[14px] leading-[22px] text-black",children:["x ",X[S].months," ",t==="uz"?"oy":t==="en"?"month":t==="ru"?"мес.":"oy"]})]})]}),e.jsx("p",{className:"mt-[10px] w-[318px] font-inter font-[400] sm:ml-3 text-[15px] leading-[22px] text-[rgba(0,0,0,0.75)]",children:t=="uz"?"Siz buyurtmani 6 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin.":t=="en"?"You can pay for your order for 6 months to 24 months.":t=="ru"?"Вы можете оплатить заказ на 6 месяца до 24 месяцев.":"Siz buyurtmani 6 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin."}),e.jsxs("div",{className:"payment-options p-[20px] mt-[20px] w-full h-fit rounded-[10px] border-[1px] border-[rgba(213,213,213,1)]",children:[e.jsxs("h1",{className:"font-inter font-[400] text-[15px] leading-[22px] text-[rgba(0,0,0,0.75)]",children:[N.deliveryTitle," ",e.jsx("span",{className:"font-inter font-[700]",children:N.deliveryHighlight1})," ",t=="uz"?"ichida.":"."," ",N.deliveryHighlight2]}),e.jsx("div",{className:"mt-[20px] w-full h-[1px] bg-[rgba(213,213,213,1)]"}),e.jsx("h1",{className:"mt-[20px] font-inter font-[400] text-[15px] leading-[22px] text-[rgba(0,0,0,0.75)]",children:N.installmentText})]}),e.jsxs("div",{className:"relative",children:[c&&e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("div",{className:"flex items-center mt-4 sm:mt-10",children:[c.quantity>1?e.jsx("button",{onClick:()=>de(c.id,c.size[t],c.color[t]),className:"flex items-center justify-center w-8 h-8 border rounded-md cursor-pointer hover:bg-gray-50",children:e.jsx(Ce,{className:"w-4 h-4 text-gray-600"})}):e.jsx("button",{onClick:()=>B(c.id,c.size[t],c.color[t]),className:"flex items-center justify-center w-8 h-8 text-red-500 border rounded-md cursor-pointer hover:bg-red-50",children:e.jsx(Z,{className:"w-4 h-4"})}),e.jsx("input",{className:"w-16 mx-3 text-center border rounded-md sm:mx-4 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#DCC38B] focus:border-transparent",type:"number",value:c.quantity,onChange:r=>O(c.id,c.size[t],c.color[t],r.target.value,!1),onBlur:r=>O(c.id,c.size[t],c.color[t],r.target.value,!0)}),e.jsx("button",{onClick:()=>xe(c.id,c.size[t],c.color[t]),className:"flex items-center justify-center w-8 h-8 border rounded-md cursor-pointer hover:bg-gray-50",children:e.jsx(_e,{className:"w-4 h-4 text-gray-600"})})]}),e.jsx("div",{className:"flex items-end justify-center",children:e.jsxs("button",{onClick:()=>B(c.id,c.size[t],c.color[t]),className:"sm:w-37 sm:h-8.5 w-9 h-7.5 opacity-70 sm:opacity-50 hover:opacity-100 duration-200 overflow-hidden justify-end gap-[8px] rounded-md flex items-center cursor-pointer sm:mr-0 text-gray-600 hover:text-gray-800",children:[e.jsx(Z,{className:"w-4 h-4"}),e.jsx("h1",{className:"hidden sm:block",children:t=="uz"?"Yo'q qilish":t=="en"?"Delete":"Удалить"})]})})]}),e.jsxs("button",{className:`mt-[20px] w-full h-[60px] rounded-[10px] bg-[rgba(220,195,139,1)] cursor-pointer hover:bg-[#e9d8b2] transition-all duration-200 font-inter font-[600] text-[15px] leading-[22px] text-black ${I?"animate-circle":""}`,onClick:be,children:[e.jsx("h1",{className:"uppercase font-inter font-[600] text-[16px] leading-[22px] text-[#FFDF02] whitespace-nowrap"}),I?"":t=="uz"?"Savatga qo'shish":t=="en"?"Add to cart":t=="ru"?"Добавить в корзину":"Savatga qo'shish"]}),I&&e.jsx("div",{className:"absolute mt-[20px] inset-0 flex justify-center items-center",children:e.jsx("div",{className:"w-8 h-8 border-4 border-t-4 border-t-[#ffffff] border-transparent rounded-full animate-spin"})})]})]})]})]})]})};export{Pe as default};
