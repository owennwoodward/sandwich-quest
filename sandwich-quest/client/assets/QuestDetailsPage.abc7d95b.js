import{u,H as d,c as o,o as t,b as a,d as m,t as p,F as l,i as _}from"./vendor.92888ce4.js";import{_ as f,a as n,P as q,A as c}from"./index.cf45a5b9.js";const g={name:"QuestDetails",setup(){const s=u();return d(async()=>{try{await n.getMyQuests(s.params.id),await n.getQuestItems(s.params.id)}catch(e){q.toast(e,"error"),console.error(e)}}),{questItems:o(()=>c.questitems),quest:o(()=>c.quests.find(e=>e.id==s.params.id))}}},v={class:"component"};function y(s,e,h,r,x,Q){return t(),a("div",v,[m("h2",null,p(r.quest.name),1),(t(!0),a(l,null,_(r.questItems,i=>(t(),a("div",{key:i.id,class:""}))),128))])}var D=f(g,[["render",y]]);export{D as default};
