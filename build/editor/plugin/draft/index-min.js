/*
Copyright 2012, KISSY UI Library v1.30dev
MIT Licensed
build time: May 28 19:44
*/
KISSY.add("editor/plugin/draft/index",function(e,l,g,r,s){function j(a,b,c){for(a+="";a.length<b;)a=c+a;return a}function m(a){e.isNumber(a)&&(a=new Date(a));return a instanceof Date?[a.getFullYear(),"-",j(a.getMonth()+1,2,"0"),"-",j(a.getDate(),2,"0")," ",j(a.getHours(),2,"0"),":",j(a.getMinutes(),2,"0"),":",j(a.getSeconds(),2,"0")].join(""):a}function n(a){this.editor=a;this._init()}function o(a){var b=new n(a);a.on("destroy",function(){b.destroy()})}var h=e.Node,p=e.Event,q=e.JSON,i=l.Utils.addRes,
t=l.Utils.destroyRes;e.augment(n,{_getSaveKey:function(){var a=this.editor.get("pluginConfig");return a.draft&&a.draft.saveKey||"ke-draft-save20110503"},_getDrafts:function(){if(!this.drafts){var a=g.getItem(this._getSaveKey()),b=[];a&&(b=g==window.localStorage?q.parse(decodeURIComponent(a)):a);this.drafts=b}return this.drafts},_init:function(){var a=this,b=a.editor,c=b.get("statusBarEl"),d=b.get("pluginConfig");d.draft=d.draft||{};a.draftInterval=d.draft.interval=d.draft.interval||5;a.draftLimit=
d.draft.limit=d.draft.limit||5;c=(new h("<div class='ke-draft'><span class='ke-draft-title'>内容正文每"+d.draft.interval+"分钟自动保存一次。</span></div>")).appendTo(c);a.timeTip=(new h("<span class='ke-draft-time'/>")).appendTo(c);var f=(new h("<a href='#' onclick='return false;' class='ke-button ke-draft-save-btn' style='vertical-align:middle;padding:1px 9px;'><span class='ke-draft-mansave'></span><span>立即保存</span></a>")).unselectable().appendTo(c),k=new s({container:c,menuContainer:document.body,doc:b.get("document")[0],
width:"85px",popUpWidth:"225px",align:["r","t"],emptyText:"&nbsp;&nbsp;&nbsp;尚无编辑器历史存在",title:"恢复编辑历史"});a.versions=k;k.on("select",function(){k.detach("select",arguments.callee);a.sync()});f.on("click",function(b){a.save(!1);b.halt()});i.call(a,f);b.get("textarea")[0].form&&function(){function c(){a.save(!0)}var d=b.get("textarea")[0].form;p.on(d,"submit",c);i.call(a,function(){p.remove(d,"submit",c)})}();var g=setInterval(function(){a.save(!0)},6E4*a.draftInterval);i.call(a,function(){clearInterval(g)});
k.on("click",a.recover,a);i.call(a,k);a.holder=c;if(d.draft.helpHtml){var e=(new h('<a tabindex="0" hidefocus="hidefocus" class="ke-draft-help ke-triplebutton-off" title="点击查看帮助" href="javascript:void(\'点击查看帮助 \')">点击查看帮助</a>')).unselectable().appendTo(c);e.on("click",function(){e[0].focus();a.helpPopup&&a.helpPopup.get("visible")?a.helpPopup.hide():a._prepareHelp()});e.on("blur",function(){a.helpPopup&&a.helpPopup.hide()});a.helpBtn=e;i.call(a,e);l.Utils.lazyRun(a,"_prepareHelp","_realHelp")}i.call(a,
c)},_prepareHelp:function(){var a=this.editor.get("pluginConfig").draft,a=new h(a.helpHtml||""),b=new h("<div style='height:0;position:absolute;fontSize:0;width:0;border:8px #000 solid;border-color:#000 transparent transparent transparent;border-style:solid dashed dashed dashed;border-top-color:#CED5E0;'><div style='height:0;position:absolute;fontSize:0;width:0;border:8px #000 solid;border-color:#000 transparent transparent transparent;border-style:solid dashed dashed dashed;left:-8px;top:-10px;border-top-color:white;'></div></div>");
a.append(b);a.css({border:"1px solid #ACB4BE","text-align":"left"});this.helpPopup=new r({content:a,autoRender:!0,width:a.width()+"px",mask:!1});this.helpPopup.get("el").css("border","none");this.helpPopup.arrow=b},_realHelp:function(){var a=this.helpPopup,b=this.helpBtn,c=a.arrow;a.show();b=b.offset();a.get("el").offset({left:b.left-a.get("el").width()+17,top:b.top-a.get("el").height()-7});c.offset({left:b.left-2,top:b.top-8})},disable:function(){this.holder.css("visibility","hidden")},enable:function(){this.holder.css("visibility",
"")},sync:function(){var a=this.draftLimit,b=this.timeTip,c=this.versions,d=this._getDrafts();d.length>a&&d.splice(0,d.length-a);for(var a=[],f,e=0;e<d.length;e++)f=d[e],f=(f.auto?"自动":"手动")+"保存于 : "+m(f.date),a.push({name:f,value:e});c.set("items",a.reverse());b.html(f);g.setItem(this._getSaveKey(),g==window.localStorage?encodeURIComponent(q.stringify(d)):d)},save:function(a){var b=this._getDrafts(),c=this.editor.get("formatData");c&&(b[b.length-1]&&c==b[b.length-1].content&&(b.length-=1),this.drafts=
b.concat({content:c,date:(new Date).getTime(),auto:a}),this.sync())},recover:function(a){var b=this.editor,c=this.versions,d=this._getDrafts(),e=a.newVal;c.reset("value");confirm("确认恢复 "+m(d[e].date)+" 的编辑历史？")&&(b.execCommand("save"),b.set("data",d[e].content),b.execCommand("save"));a.halt()},destroy:function(){t.call(this)}});return{init:function(a){g.ready?g.ready(function(){o(a)}):o(a)}}},{requires:["editor","../localStorage/","overlay","../select/"]});