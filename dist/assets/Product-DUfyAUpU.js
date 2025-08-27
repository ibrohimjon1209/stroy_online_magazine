import{u as ge,r as l,j as e,L as B,C as J,X as ze,a as ye}from"./index-Yr72gUJe.js";const Ne=({lang:s,basket:L,set_basket:Q,userSignIn:W})=>{var H,R,O,F,U,Y;ge();const[t,G]=l.useState(null),[q,p]=l.useState("4x6"),[Z,u]=l.useState(0),[r,h]=l.useState(0),[N,K]=l.useState(3),[D,ee]=l.useState(!1),[S,M]=l.useState(!1),[I,te]=l.useState(""),[_,C]=l.useState(!1),[je,we]=l.useState(0),[$,f]=l.useState(""),[se,v]=l.useState(!1),[b,ae]=l.useState([]),[ie,ne]=l.useState({}),E=s=="uz"?"so'm":s=="en"?"uzs":s=="ru"?"сум":"so'm",re={uz:["6 oy","12 oy","15 oy","18 oy","24 oy"],en:["6 months","12 months","15 months","18 months","24 months"],ru:["6 месяцев","12 месяцев","15 месяцев","18 месяцев","24 месяцев"]};l.useEffect(()=>{if(_&&I){const a=L.findIndex(n=>n.id===t.id&&n.size.en===t.variants[r].size_en&&n.color.en===t.variants[r].color_en),i=[...L];if(a!==-1)i[a].quantity+=1,W&&(async()=>fetch("https://backkk.stroybazan1.uz/api/api/orders/create/",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({user:localStorage.getItem("userId")})}).then(o=>{console.log(o),console.log(localStorage.getItem("userId"))}).catch(o=>{console.log(o)}))();else{const n={img:t.variants[r].image?`https://backkk.stroybazan1.uz${t.variants[r].image}`:`https://backkk.stroybazan1.uz${t.image}`,id:t.id,name:{uz:t.name_uz,en:t.name_en,ru:t.name_ru},variant_id:t.variants[r].id,color:{uz:t.variants[r].color_uz,en:t.variants[r].color_en,ru:t.variants[r].color_ru},size:{uz:t.variants[r].size_uz,en:t.variants[r].size_en,ru:t.variants[r].size_ru},price:t.variants[r].price,quantity:1};i.push(n)}Q(i),localStorage.setItem("basket",JSON.stringify(i))}},[_,I]);const oe=async()=>{try{const i=window.location.href.split("/").pop(),o=await(await fetch(`https://backkk.stroybazan1.uz/api/api/products/${i}/`)).json();G(o),p(o.variants[0][`size_${s}`]);const c=new Map,d={};o.variants.forEach((k,x)=>{const T=k[`size_${s}`];if(T){const m=T.toLowerCase().trim();d[m]||(d[m]=[]),d[m].push(x),c.has(m)||c.set(m,{size:T,variantIndex:x})}else console.warn(`No size available for variant ${x}`)});const w=Array.from(c.values());ae(w),ne(d)}catch(a){console.error("Xatolik yuz berdi:",a)}};l.useEffect(()=>{oe()},[]);const le=()=>{if(!t||!t.variants||t.variants.length===0)return;const a=t.variants.length;if(a<=1)return;const i=r>0?r-1:a-1;f("slide-right"),v(!0),setTimeout(()=>{h(i);const n=t.variants[i][`size_${s}`];p(n);const o=b.findIndex(c=>c.size.toLowerCase()===n.toLowerCase());o!==-1&&u(o),setTimeout(()=>{v(!1),f("")},300)},50)},ce=()=>{if(!t||!t.variants||t.variants.length===0)return;const a=t.variants.length;if(a<=1)return;const i=r<a-1?r+1:0;f("slide-left"),v(!0),setTimeout(()=>{h(i);const n=t.variants[i][`size_${s}`];p(n);const o=b.findIndex(c=>c.size.toLowerCase()===n.toLowerCase());o!==-1&&u(o),setTimeout(()=>{v(!1),f("")},300)},50)},P=a=>{h(a),p(t.variants[a][`size_${s}`]);const i=b.findIndex(n=>n.size.toLowerCase()===t.variants[a][`size_${s}`].toLowerCase());i!==-1&&u(i)},de=(a,i)=>{p(a),u(i);const n=t.variants.findIndex(o=>o[`size_${s}`].toLowerCase()===a.toLowerCase());n!==-1&&h(n)},xe=a=>{K(a)},pe=()=>{M(!0),setTimeout(()=>{ee(!0),M(!1),me(),setTimeout(()=>{},800)},600)},me=()=>{te("Mahsulot savatga qo'shildi"),C(!0),setTimeout(()=>{C(!1)},3e3)},g=a=>{a.target.src=`https://backkk.stroybazan1.uz${t.image}`},ue=a=>{var o,c,d,w,k,x;if(!t||!t.variants||!t.variants[a])return!1;const i=(d=(c=(o=t.variants[r])==null?void 0:o[`size_${s}`])==null?void 0:c.toLowerCase())==null?void 0:d.trim(),n=(x=(k=(w=t.variants[a])==null?void 0:w[`size_${s}`])==null?void 0:k.toLowerCase())==null?void 0:x.trim();return i&&n&&i===n};if(!t)return e.jsx("div",{});const A=[{months:6,percent:26},{months:12,percent:42},{months:15,percent:50},{months:18,percent:56},{months:24,percent:75}],he=A.map(({months:a,percent:i})=>{const n=t.variants[r].price+t.variants[r].price*i/100;return Math.ceil(n/a)}),z=(H=t==null?void 0:t.variants)==null?void 0:H[r],fe=z!=null&&z[`size_${s}`]?z[`size_${s}`].toLowerCase().trim():"";ie[fe];const X=((R=t==null?void 0:t.variants)==null?void 0:R.length)>1;t[`units_${s}`];const V={uz:{deliveryTitle:"Yetkazib berish",deliveryHighlight1:"1 kun",deliveryHighlight2:"5mln so'mdan ortiq mahsulotga buyurtma bersangiz yetkazib berish VODIY bo'ylab be'pul.",installmentText:"Muddatli to'lovni rasmiylashtirayotganingizda bizdan va hamkorlarimizdan eng ma'qul takliflarga ega bo'lishingiz mumkin."},en:{deliveryTitle:"Delivery",deliveryHighlight1:"within 1 day",deliveryHighlight2:"If you order products over 5 million UZS, delivery is free across the valley.",installmentText:"When applying for an installment plan, you may receive the best offers from us and our partners."},ru:{deliveryTitle:"Доставка",deliveryHighlight1:"в течение 1 дня",deliveryHighlight2:"Если вы закажете товары на сумму более 5 миллионов сумов, доставка по долине бесплатна.",installmentText:"Оформляя рассрочку, вы можете получить лучшие предложения от нас и наших партнеров."}},ve={uz:{dona:"dona",litr:"litr"},en:{dona:"piece",litr:"liter"},ru:{dona:"штука",litr:"литр"}},be=a=>{var n;if(!a)return"";const i=a.toLowerCase();return((n=ve[s])==null?void 0:n[i])||a},y=V[s]||V.uz,j=a=>a.image?`https://backkk.stroybazan1.uz${a.image}`:`https://backkk.stroybazan1.uz${t.image}`;return e.jsxs("div",{className:"w-full h-auto mt-[0px] sm:mt-[50px] px-[22px] sm:px-[190px] mb-[111px]",children:[e.jsx("style",{jsx:"true",children:`
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
      `}),e.jsx("div",{className:"mx-[-22px] sticky top-0 z-50 block sm:hidden",children:e.jsx("div",{className:"w-full h-[65px] bg-[#DCC38B]",children:e.jsxs(B,{className:"w-full h-full flex items-center gap-[10px] pl-[13px]",to:"/",children:[e.jsx(J,{className:"scale-110"}),e.jsx("h1",{className:"font-inter font-[500] text-[15px] leading-[22px] text-black",children:t[`name_${s}`]})]})})}),_&&I&&e.jsx("div",{className:"absolute z-50 left-1 scale-70 w-full h-auto flex justify-center items-center notification",children:e.jsxs("div",{className:"bg-[#fefdfd] relative drop-shadow-lg w-[450px] sm:w-[750px] h-[100px] flex items-center rounded-md transition-opacity duration-500 ease-in-out opacity-100",children:[e.jsx("div",{className:"ml-[20px] rounded-[5px] overflow-hidden border-[1px] absolute sm:static w-[80px] sm:w-[120px] h-[80px] flex justify-center items-center",children:e.jsx("img",{src:j(t.variants[r]),onError:g,className:"w-[80px] h-[80px] object-contain"})}),e.jsxs("div",{className:"w-full h-full flex flex-col gap-[5px] mt-[20px] ml-[120px] absolute sm:static sm:ml-[20px]",children:[e.jsx("h1",{className:"font-inter font-[500] text-[16px] leading-[22px] text-black",children:s=="uz"?"Mahsulot savatga qo'shildi":s=="en"?"Product added to cart":s=="ru"?"Товар добавлен в корзину":"Mahsulot savatga qo'shildi"}),e.jsxs("h1",{className:"w-[360px] font-inter font-[400] text-[16px] leading-[22px] text-black",children:[t[`name_${s}`]," ",q]})]}),e.jsxs("div",{className:"w-[500px] sm:w-[250px] flex flex-col items-end gap-[25px] h-full mt-[30px] pr-[20px]",children:[e.jsx(ze,{onClick:()=>C(!1),className:"cursor-pointer"}),e.jsx(B,{to:"/basket",children:e.jsx("h1",{className:"uppercase font-inter font-[600] text-[16px] leading-[22px] text-[#FFDF02] whitespace-nowrap",children:s=="uz"?"Savatga o'tish":s=="en"?"Go to cart":s=="ru"?"Перейти в корзину":"Savatga o'tish"})})]})]})}),e.jsx("h1",{className:"hidden sm:block font-inter font-[600] text-[20px] leading-[22px] text-black",children:t[`name_${s}`]}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-[20px]",children:[e.jsxs("div",{className:"product-div",children:[e.jsxs("div",{className:"mt-[20px] flex gap-[19px]",children:[e.jsx("div",{className:"hidden sm:block overflow-y-scroll h-[500px] image-selection-div space-y-[15px]",children:t.variants.map((a,i)=>e.jsx("div",{className:`border-[3px] ${r===i?"border-[rgba(190,160,134,1)]":"border-transparent"} overflow-hidden w-[158px] h-[156px] bg-[rgba(242,242,241,1)] rounded-[15px] flex justify-center items-center cursor-pointer`,onClick:()=>P(i),children:e.jsx("img",{src:j(a),onError:g,className:"w-[158px] h-[156px] object-fill"})},i))}),e.jsxs("div",{className:"flex justify-center items-center big-selected-image relative w-full sm:w-[504px] h-[330px] sm:h-[504px] overflow-hidden bg-[rgba(242,242,241,1)] rounded-[15px]",children:[e.jsx("div",{className:`nav-button cursor-pointer nav-button-left ${X?"":"disabled-nav"}`,onClick:le,children:e.jsx(J,{size:24})}),e.jsx("div",{className:`nav-button cursor-pointer nav-button-right ${X?"":"disabled-nav"}`,onClick:ce,children:e.jsx(ye,{size:24})}),e.jsx("img",{src:j(t.variants[r]),onError:g,className:`w-[162px] sm:w-[504px] h-[188px] sm:h-[504px] object-fill ${se?$:$?$==="slide-left"?"slide-in-right":"slide-in-left":""}`})]})]}),e.jsx("div",{className:"hidden sm:block",children:e.jsxs("div",{className:"mt-[40px] flex flex-col gap-[15px] w-[681px]",children:[e.jsx("h1",{className:"font-inter font-[600] text-[28px] leading-[22px] text-black",children:s=="uz"?"Tasnif":s=="en"?"Description":s=="ru"?"Описание":"Tasnif"}),e.jsx("p",{className:"font-inter font-[500] text-[16px] leading-[22px] text-black",children:t[`description_${s}`]})]})})]}),e.jsxs("div",{className:"product-details mt-[0px] sm:mt-[20px] max-w-full",children:[e.jsxs("div",{className:"flex flex-col gap-[10px]",children:[e.jsx("h5",{className:"font-inter font-[600] text-[16px] leading-[22px] text-[rgba(66,206,94,1)]",children:t.is_available?s=="uz"?"Mavjud":s=="en"?"Available":s=="ru"?"Доступно":"Mavjud":s=="uz"?"Mavjud emas":s=="en"?"Not available":s=="ru"?"Недоступно":"Mavjud emas"}),e.jsx("h1",{className:"font-inter font-[600] text-[24px] leading-[22px] text-black",children:t[`name_${s}`]})]}),((O=t==null?void 0:t.variants)==null?void 0:O.some(a=>a.color_uz||a.color_ru||a.color_en))&&e.jsxs("div",{className:"color-div mt-[7px] flex flex-col gap-[6px] max-w-full",children:[e.jsxs("h1",{className:"font-inter font-[400] text-[13px] leading-[22px] text-black",children:[s=="uz"?"Rang":s=="en"?"Color":s=="ru"?"Цвет":"Rang"," ",":"," ",e.jsxs("span",{className:"font-[500]",children:[((U=(F=t==null?void 0:t.variants)==null?void 0:F[r])==null?void 0:U[`color_${s}`])||""," "]})]}),e.jsx("div",{className:"select-color flex flex-wrap gap-[10px] max-w-full",children:(Y=t==null?void 0:t.variants)==null?void 0:Y.filter(a=>a.color_uz||a.color_ru||a.color_en).map((a,i)=>{const n=t.variants.findIndex(o=>o.id===a.id);return e.jsx("div",{className:`transition-all duration-200 overflow-hidden min-w-[62px] w-[62px] h-[80px] flex-shrink-0 flex justify-center items-center rounded-[5px] 
                    ${r===n?"border-[1.5px] border-[rgba(190,160,134,1)]":"border-transparent"} 
                    bg-[rgba(247,247,246,1)] cursor-pointer ${ue(n)?"":"dimmed"}`,onClick:()=>P(n),children:e.jsx("img",{src:j(a),onError:g,alt:a.color_uz||t[`name_${s}`],className:"object-contain w-full h-full"})},a.id)})})]}),e.jsxs("div",{className:"size-div mt-[20px] max-w-full",children:[e.jsxs("h1",{className:"font-inter font-[400] text-[13px] leading-[22px] text-black",children:[be(t[`units_${s}`]),":"," ",e.jsx("span",{className:"font-[500]",children:q})]}),e.jsx("div",{className:"sizes flex flex-wrap gap-[10px] mt-[7px] transition-all duration-300 cursor-pointer max-w-full",children:b.map((a,i)=>e.jsx("div",{className:`active:scale-[99%] transition-all duration-200 flex justify-center items-center px-2 min-w-[62px] flex-shrink-0 h-[62px] rounded-[5px] 
        ${Z===i?"border-[rgba(190,160,134,1)] border-[1.5px]":"border-transparent"} 
        bg-[rgba(247,247,246,1)]`,onClick:()=>de(a.size,i),children:e.jsx("span",{className:"font-inter whitespace-nowrap max-w-full font-[400] text-[16px] leading-[22px] text-black",children:a.size})},i))})]}),e.jsx("div",{className:"mt-[20px]",children:e.jsxs("h1",{className:"font-inter font-[700] text-[20px] leading-[22px] text-black",children:[t.variants[r].price," ",E]})}),e.jsxs("div",{className:"term-payment mt-[20px]",children:[e.jsxs("div",{className:"flex flex-col mt-8 justify-between w-full py-[11px] px-[14px] h-[94px] rounded-[8px] border-[1px] border-[rgba(213,213,213,1)] bg-[rgba(242,242,241,1)]",children:[e.jsx("div",{className:"w-full h-[30px] rounded-[5px] flex justify-between gap-[3.75px] bg-[rgba(213,213,213,1)]",children:re[s].map((a,i)=>e.jsx("div",{className:`transition-all duration-100 flex justify-center items-center w-[80px] h-[30px] rounded-[5px] cursor-pointer ${N===i?"bg-white border-[1.5px] border-[rgba(190,160,134,1)]":""}`,onClick:()=>xe(i),children:e.jsx("h1",{className:"font-inter font-[500] text-[14px] text-black",children:a})},i))}),e.jsxs("div",{className:"flex gap-[10px] items-center",children:[e.jsxs("h1",{className:"w-auto h-[28px] px-3 rounded-[4px] bg-[rgba(254,242,157,1)] font-inter font-[500] text-[14px] leading-[22px] flex justify-center items-center",children:[he[N]," ",E]}),e.jsxs("h1",{className:"font-inter font-[500] text-[14px] leading-[22px] text-black",children:["x ",A[N].months," ",s==="uz"?"oy":s==="en"?"month":s==="ru"?"мес.":"oy"]})]})]}),e.jsx("p",{className:"mt-[10px] w-[318px] font-inter font-[400] sm:ml-3 text-[15px] leading-[22px] text-[rgba(0,0,0,0.75)]",children:s=="uz"?"Siz buyurtmani 6 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin.":s=="en"?"You can pay for your order for 6 months to 24 months.":s=="ru"?"Вы можете оплатить заказ на 6 месяца до 24 месяцев.":"Siz buyurtmani 6 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin."}),e.jsxs("div",{className:"payment-options p-[20px] mt-[20px] w-full h-fit rounded-[10px] border-[1px] border-[rgba(213,213,213,1)]",children:[e.jsxs("h1",{className:"font-inter font-[400] text-[15px] leading-[22px] text-[rgba(0,0,0,0.75)]",children:[y.deliveryTitle," ",e.jsx("span",{className:"font-inter font-[700]",children:y.deliveryHighlight1})," ",s=="uz"?"ichida.":"."," ",y.deliveryHighlight2]}),e.jsx("div",{className:"mt-[20px] w-full h-[1px] bg-[rgba(213,213,213,1)]"}),e.jsx("h1",{className:"mt-[20px] font-inter font-[400] text-[15px] leading-[22px] text-[rgba(0,0,0,0.75)]",children:y.installmentText})]}),e.jsxs("div",{className:"relative",children:[e.jsx("button",{className:`mt-[20px] w-full h-[60px] rounded-[10px] bg-[rgba(220,195,139,1)] cursor-pointer hover:bg-[#e9d8b2] transition-all duration-200 font-inter font-[600] text-[15px] leading-[22px] text-black ${S?"animate-circle":""}`,onClick:pe,children:S?"":D?s=="uz"?"Qo'shildi ✅":s=="en"?"Added ✅":s=="ru"?"Добавлено ✅":"Qo'shildi ✅":s=="uz"?"Savatchaga qo'shish":s=="en"?"Add to cart":s=="ru"?"Добавить в корзину":"Savatchaga qo'shish"}),S&&e.jsx("div",{className:"absolute mt-[20px] inset-0 flex justify-center items-center",children:e.jsx("div",{className:"w-8 h-8 border-4 border-t-4 border-t-[#ffffff] border-transparent rounded-full animate-spin"})})]})]})]})]})]})};export{Ne as default};
