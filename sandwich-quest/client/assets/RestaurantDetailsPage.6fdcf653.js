import{u,H as c,c as s,a as d,o as p,E as _}from"./vendor.92888ce4.js";import{_ as i,y as m,A as r,a as l,q as v,c as R,P as g}from"./index.b0c97531.js";const y={setup(){const a=u();return c(async()=>{var e;try{await m.getById(a.params.id),((e=r.account)==null?void 0:e.id)&&(await l.getMyQuests(),await v.getMyQuestItems())}catch(t){R.error(t),g.toast(t.message,"error")}}),{homeRestaurant:s(()=>r.activeRestaurant),quests:s(()=>r.quests.sort((e,t)=>e.updatedAt-t.updatedAt)),routeId:s(()=>a.params.id),addToCollection(){}}}};function f(a,e,t,o,h,q){const n=d("HomeRestaurant");return p(),_(n,{homeRestaurant:o.homeRestaurant},null,8,["homeRestaurant"])}var A=i(y,[["render",f],["__scopeId","data-v-87d53b00"]]);export{A as default};
