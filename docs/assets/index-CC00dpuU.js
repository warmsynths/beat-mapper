var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=globalThis,u=l.ShadowRoot&&(l.ShadyCSS===void 0||l.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,d=Symbol(),f=new WeakMap,p=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==d)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(u&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=f.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&f.set(t,e))}return e}toString(){return this.cssText}},m=e=>new p(typeof e==`string`?e:e+``,void 0,d),h=(e,...t)=>new p(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,d),g=(e,t)=>{if(u)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=l.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},_=u?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return m(t)})(e):e,{is:ee,defineProperty:v,getOwnPropertyDescriptor:te,getOwnPropertyNames:y,getOwnPropertySymbols:ne,getPrototypeOf:re}=Object,b=globalThis,ie=b.trustedTypes,ae=ie?ie.emptyScript:``,oe=b.reactiveElementPolyfillSupport,S=(e,t)=>e,se={toAttribute(e,t){switch(t){case Boolean:e=e?ae:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ce=(e,t)=>!ee(e,t),le={attribute:!0,type:String,converter:se,reflect:!1,useDefault:!1,hasChanged:ce};Symbol.metadata??=Symbol(`metadata`),b.litPropertyMetadata??=new WeakMap;var C=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=le){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&v(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=te(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??le}static _$Ei(){if(this.hasOwnProperty(S(`elementProperties`)))return;let e=re(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(S(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S(`properties`))){let e=this.properties,t=[...y(e),...ne(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(_(e))}else e!==void 0&&t.push(_(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return g(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?se:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?se:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??ce)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};C.elementStyles=[],C.shadowRootOptions={mode:`open`},C[S(`elementProperties`)]=new Map,C[S(`finalized`)]=new Map,oe?.({ReactiveElement:C}),(b.reactiveElementVersions??=[]).push(`2.1.2`);var ue=globalThis,de=e=>e,fe=ue.trustedTypes,pe=fe?fe.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,me=`$lit$`,w=`lit$${Math.random().toFixed(9).slice(2)}$`,he=`?`+w,ge=`<${he}>`,T=document,E=()=>T.createComment(``),D=e=>e===null||typeof e!=`object`&&typeof e!=`function`,_e=Array.isArray,ve=e=>_e(e)||typeof e?.[Symbol.iterator]==`function`,ye=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,be=/-->/g,xe=/>/g,k=RegExp(`>|${ye}(?:([^\\s"'>=/]+)(${ye}*=${ye}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Se=/'/g,Ce=/"/g,we=/^(?:script|style|textarea|title)$/i,Te=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),A=Te(1),j=Te(2),M=Symbol.for(`lit-noChange`),N=Symbol.for(`lit-nothing`),Ee=new WeakMap,P=T.createTreeWalker(T,129);function De(e,t){if(!_e(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return pe===void 0?t:pe.createHTML(t)}var Oe=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=O;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===O?c[1]===`!--`?o=be:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=k):(we.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=k):o=xe:o===k?c[0]===`>`?(o=i??O,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?k:c[3]===`"`?Ce:Se):o===Ce||o===Se?o=k:o===be||o===xe?o=O:(o=k,i=void 0);let d=o===k&&e[t+1].startsWith(`/>`)?` `:``;a+=o===O?n+ge:l>=0?(r.push(s),n.slice(0,l)+me+n.slice(l)+w+d):n+w+(l===-2?t:d)}return[De(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},ke=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Oe(t,n);if(this.el=e.createElement(l,r),P.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=P.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(me)){let t=u[o++],n=i.getAttribute(e).split(w),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ne:r[1]===`?`?Pe:r[1]===`@`?Fe:Me}),i.removeAttribute(e)}else e.startsWith(w)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(we.test(i.tagName)){let e=i.textContent.split(w),t=e.length-1;if(t>0){i.textContent=fe?fe.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],E()),P.nextNode(),c.push({type:2,index:++a});i.append(e[t],E())}}}else if(i.nodeType===8)if(i.data===he)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(w,e+1))!==-1;)c.push({type:7,index:a}),e+=w.length-1}a++}}static createElement(e,t){let n=T.createElement(`template`);return n.innerHTML=e,n}};function F(e,t,n=e,r){if(t===M)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=D(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=F(e,i._$AS(e,t.values),i,r)),t}var Ae=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??T).importNode(t,!0);P.currentNode=r;let i=P.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new je(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ie(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=P.nextNode(),a++)}return P.currentNode=T,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},je=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=F(this,e,t),D(e)?e===N||e==null||e===``?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==M&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ve(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==N&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=ke.createElement(De(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ae(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Ee.get(e.strings);return t===void 0&&Ee.set(e.strings,t=new ke(e)),t}k(t){_e(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(E()),this.O(E()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=de(e).nextSibling;de(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Me=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=N}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=F(this,e,t,0),a=!D(e)||e!==this._$AH&&e!==M,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=F(this,r[n+o],t,o),s===M&&(s=this._$AH[o]),a||=!D(s)||s!==this._$AH[o],s===N?e=N:e!==N&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ne=class extends Me{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===N?void 0:e}},Pe=class extends Me{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==N)}},Fe=class extends Me{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=F(this,e,t,0)??N)===M)return;let n=this._$AH,r=e===N&&n!==N||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==N&&(n===N||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ie=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){F(this,e)}},Le=ue.litHtmlPolyfillSupport;Le?.(ke,je),(ue.litHtmlVersions??=[]).push(`3.3.3`);var Re=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new je(t.insertBefore(E(),e),e,void 0,n??{})}return i._$AI(e),i},ze=globalThis,I=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Re(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};I._$litElement$=!0,I.finalized=!0,ze.litElementHydrateSupport?.({LitElement:I});var Be=ze.litElementPolyfillSupport;Be?.({LitElement:I}),(ze.litElementVersions??=[]).push(`4.2.2`);var L=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Ve={attribute:!0,type:String,converter:se,reflect:!1,hasChanged:ce},He=(e=Ve,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function R(e){return(t,n)=>typeof n==`object`?He(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function z(e){return R({...e,state:!0,attribute:!1})}var Ue=class extends Event{constructor(e,t,n,r){super(`context-request`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=n,this.subscribe=r??!1}};function We(e){return e}var Ge=class{constructor(e,t,n,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,t.context!==void 0){let e=t;this.context=e.context,this.callback=e.callback,this.subscribe=e.subscribe??!1}else this.context=t,this.callback=n,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&=(this.unsubscribe(),void 0)}dispatchRequest(){this.host.dispatchEvent(new Ue(this.context,this.host,this.t,this.subscribe))}},Ke=class{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let n=t||!Object.is(e,this.o);this.o=e,n&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},e!==void 0&&(this.value=e)}addCallback(e,t,n){if(!n)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}},qe=class extends Event{constructor(e,t){super(`context-provider`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}},Je=class extends Ke{constructor(e,t,n){super(t.context===void 0?n:t.initialValue),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:n}]of this.subscriptions)t.has(e)||(t.add(e),n.dispatchEvent(new Ue(this.context,n,e,!0)));e.stopPropagation()},this.host=e,t.context===void 0?this.context=t:this.context=t.context,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener(`context-request`,this.onContextRequest),this.host.addEventListener(`context-provider`,this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new qe(this.context,this.host))}};function Ye({context:e}){return(t,n)=>{let r=new WeakMap;if(typeof n==`object`)return{get(){return t.get.call(this)},set(e){return r.get(this).setValue(e),t.set.call(this,e)},init(t){return r.set(this,new Je(this,{context:e,initialValue:t})),t}};{t.constructor.addInitializer((t=>{r.set(t,new Je(t,{context:e}))}));let i=Object.getOwnPropertyDescriptor(t,n),a;if(i===void 0){let e=new WeakMap;a={get(){return e.get(this)},set(t){r.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=i.set;a={...i,set(t){r.get(this).setValue(t),e?.call(this,t)}}}Object.defineProperty(t,n,a);return}}}function Xe({context:e,subscribe:t}){return(n,r)=>{typeof r==`object`?r.addInitializer((function(){new Ge(this,{context:e,callback:e=>{n.set.call(this,e)},subscribe:t})})):n.constructor.addInitializer((n=>{new Ge(n,{context:e,callback:e=>{n[r]=e},subscribe:t})}))}}var Ze=c(o(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?t.exports=r():typeof define==`function`&&define.amd?define(r):(n=typeof globalThis<`u`?globalThis:n||self).Meyda=r()})(e,(function(){function e(e,t,n){if(n||arguments.length===2)for(var r,i=0,a=t.length;i<a;i++)!r&&i in t||(r||=Array.prototype.slice.call(t,0,i),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}var t=Object.freeze({__proto__:null,blackman:function(e){for(var t=new Float32Array(e),n=2*Math.PI/(e-1),r=2*n,i=0;i<e/2;i++)t[i]=.42-.5*Math.cos(i*n)+.08*Math.cos(i*r);for(i=Math.ceil(e/2);i>0;i--)t[e-i]=t[i-1];return t},hamming:function(e){for(var t=new Float32Array(e),n=0;n<e;n++)t[n]=.54-.46*Math.cos(2*Math.PI*(n/e-1));return t},hanning:function(e){for(var t=new Float32Array(e),n=0;n<e;n++)t[n]=.5-.5*Math.cos(2*Math.PI*n/(e-1));return t},sine:function(e){for(var t=Math.PI/(e-1),n=new Float32Array(e),r=0;r<e;r++)n[r]=Math.sin(t*r);return n}}),n={};function r(e){for(;e%2==0&&e>1;)e/=2;return e===1}function i(e,r){if(r!==`rect`){if(r!==``&&r||(r=`hanning`),n[r]||(n[r]={}),!n[r][e.length])try{n[r][e.length]=t[r](e.length)}catch{throw Error(`Invalid windowing function`)}e=function(e,t){for(var n=[],r=0;r<Math.min(e.length,t.length);r++)n[r]=e[r]*t[r];return n}(e,n[r][e.length])}return e}function a(e,t,n){for(var r=new Float32Array(e),i=0;i<r.length;i++)r[i]=i*t/n,r[i]=13*Math.atan(r[i]/1315.8)+3.5*Math.atan((r[i]/7518)**2);return r}function o(e){return Float32Array.from(e)}function s(e){return 1125*Math.log(1+e/700)}function c(e,t,n){for(var r,i=new Float32Array(e+2),a=new Float32Array(e+2),o=t/2,c=s(0),l=(s(o)-c)/(e+1),u=Array(e+2),d=0;d<i.length;d++)i[d]=d*l,a[d]=(r=i[d],700*(Math.exp(r/1125)-1)),u[d]=Math.floor((n+1)*a[d]/t);for(var f=Array(e),p=0;p<f.length;p++){for(f[p]=Array(n/2+1).fill(0),d=u[p];d<u[p+1];d++)f[p][d]=(d-u[p])/(u[p+1]-u[p]);for(d=u[p+1];d<u[p+2];d++)f[p][d]=(u[p+2]-d)/(u[p+2]-u[p+1])}return f}function l(t,n,r,i,a,o,s){i===void 0&&(i=5),a===void 0&&(a=2),o===void 0&&(o=!0),s===void 0&&(s=440);var c=Math.floor(r/2)+1,l=Array(r).fill(0).map((function(e,i){return t*function(e,t){return Math.log2(16*e/t)}(n*i/r,s)}));l[0]=l[1]-1.5*t;var u,d,f,p=l.slice(1).map((function(e,t){return Math.max(e-l[t])}),1).concat([1]),m=Math.round(t/2),h=Array(t).fill(0).map((function(e,n){return l.map((function(e){return(10*t+m+e-n)%t-m}))})),g=h.map((function(e,t){return e.map((function(e,n){return Math.exp(-.5*(2*h[t][n]/p[n])**2)}))}));if(d=(u=g)[0].map((function(){return 0})),f=u.reduce((function(e,t){return t.forEach((function(t,n){e[n]+=t**2})),e}),d).map(Math.sqrt),g=u.map((function(e,t){return e.map((function(e,t){return e/(f[t]||1)}))})),a){var _=l.map((function(e){return Math.exp(-.5*((e/t-i)/a)**2)}));g=g.map((function(e){return e.map((function(e,t){return e*_[t]}))}))}return o&&(g=e(e([],g.slice(3),!0),g.slice(0,3),!0)),g.map((function(e){return e.slice(0,c)}))}function u(e,t){for(var n=0,r=0,i=0;i<t.length;i++)n+=i**+e*Math.abs(t[i]),r+=t[i];return n/r}function d(e){var t=e.ampSpectrum,n=e.barkScale,r=e.numberOfBarkBands,i=r===void 0?24:r;if(typeof t!=`object`||typeof n!=`object`)throw TypeError();var a=i,o=new Float32Array(a),s=0,c=t,l=new Int32Array(a+1);l[0]=0;for(var u=n[c.length-1]/a,d=1,f=0;f<c.length;f++)for(;n[f]>u;)l[d++]=f,u=d*n[c.length-1]/a;for(l[a]=c.length-1,f=0;f<a;f++){for(var p=0,m=l[f];m<l[f+1];m++)p+=c[m];o[f]=p**.23}for(f=0;f<o.length;f++)s+=o[f];return{specific:o,total:s}}function f(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();for(var n=new Float32Array(t.length),r=0;r<n.length;r++)n[r]=t[r]**2;return n}function p(e){var t=e.ampSpectrum,n=e.melFilterBank,r=e.bufferSize;if(typeof t!=`object`)throw TypeError(`Valid ampSpectrum is required to generate melBands`);if(typeof n!=`object`)throw TypeError(`Valid melFilterBank is required to generate melBands`);for(var i=f({ampSpectrum:t}),a=n.length,o=Array(a),s=new Float32Array(a),c=0;c<s.length;c++){o[c]=new Float32Array(r/2),s[c]=0;for(var l=0;l<r/2;l++)o[c][l]=n[c][l]*i[l],s[c]+=o[c][l];s[c]=Math.log(s[c]+1)}return Array.prototype.slice.call(s)}function m(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,`default`)?e.default:e}var h=null,g=m((function(e,t){var n=e.length;return t||=2,h&&h[n]||function(e){(h||={})[e]=Array(e*e);for(var t=Math.PI/e,n=0;n<e;n++)for(var r=0;r<e;r++)h[e][r+n*e]=Math.cos(t*(r+.5)*n)}(n),e.map((function(){return 0})).map((function(r,i){return t*e.reduce((function(e,t,r,a){return e+t*h[n][r+i*n]}),0)}))})),_=Object.freeze({__proto__:null,amplitudeSpectrum:function(e){return e.ampSpectrum},buffer:function(e){return e.signal},chroma:function(e){var t=e.ampSpectrum,n=e.chromaFilterBank;if(typeof t!=`object`)throw TypeError(`Valid ampSpectrum is required to generate chroma`);if(typeof n!=`object`)throw TypeError(`Valid chromaFilterBank is required to generate chroma`);var r=n.map((function(e,n){return t.reduce((function(t,n,r){return t+n*e[r]}),0)})),i=Math.max.apply(Math,r);return i?r.map((function(e){return e/i})):r},complexSpectrum:function(e){return e.complexSpectrum},energy:function(e){var t=e.signal;if(typeof t!=`object`)throw TypeError();for(var n=0,r=0;r<t.length;r++)n+=Math.abs(t[r])**2;return n},loudness:d,melBands:p,mfcc:function(e){var t=e.ampSpectrum,n=e.melFilterBank,r=e.numberOfMFCCCoefficients,i=e.bufferSize,a=Math.min(40,Math.max(1,r||13));if(n.length<a)throw Error(`Insufficient filter bank for requested number of coefficients`);return g(p({ampSpectrum:t,melFilterBank:n,bufferSize:i})).slice(0,a)},perceptualSharpness:function(e){for(var t=d({ampSpectrum:e.ampSpectrum,barkScale:e.barkScale}),n=t.specific,r=0,i=0;i<n.length;i++)r+=i<15?(i+1)*n[i+1]:.066*Math.exp(.171*(i+1));return r*=.11/t.total},perceptualSpread:function(e){for(var t=d({ampSpectrum:e.ampSpectrum,barkScale:e.barkScale}),n=0,r=0;r<t.specific.length;r++)t.specific[r]>n&&(n=t.specific[r]);return((t.total-n)/t.total)**2},powerSpectrum:f,rms:function(e){var t=e.signal;if(typeof t!=`object`)throw TypeError();for(var n=0,r=0;r<t.length;r++)n+=t[r]**2;return n/=t.length,n=Math.sqrt(n)},spectralCentroid:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();return u(1,t)},spectralCrest:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();var n=0,r=-1/0;return t.forEach((function(e){n+=e**2,r=e>r?e:r})),n/=t.length,n=Math.sqrt(n),r/n},spectralFlatness:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();for(var n=0,r=0,i=0;i<t.length;i++)n+=Math.log(t[i]),r+=t[i];return Math.exp(n/t.length)*t.length/r},spectralFlux:function(e){var t=e.signal,n=e.previousSignal,r=e.bufferSize;if(typeof t!=`object`||typeof n!=`object`)throw TypeError();for(var i=0,a=-r/2;a<t.length/2-1;a++)x=Math.abs(t[a])-Math.abs(n[a]),i+=(x+Math.abs(x))/2;return i},spectralKurtosis:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();var n=t,r=u(1,n),i=u(2,n),a=u(3,n),o=u(4,n);return(-3*r**4+6*r*i-4*r*a+o)/Math.sqrt(i-r**2)**4},spectralRolloff:function(e){var t=e.ampSpectrum,n=e.sampleRate;if(typeof t!=`object`)throw TypeError();for(var r=t,i=n/(2*(r.length-1)),a=0,o=0;o<r.length;o++)a+=r[o];for(var s=.99*a,c=r.length-1;a>s&&c>=0;)a-=r[c],--c;return(c+1)*i},spectralSkewness:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();var n=u(1,t),r=u(2,t),i=u(3,t);return(2*n**3-3*n*r+i)/Math.sqrt(r-n**2)**3},spectralSlope:function(e){var t=e.ampSpectrum,n=e.sampleRate,r=e.bufferSize;if(typeof t!=`object`)throw TypeError();for(var i=0,a=0,o=new Float32Array(t.length),s=0,c=0,l=0;l<t.length;l++){i+=t[l];var u=l*n/r;o[l]=u,s+=u*u,a+=u,c+=u*t[l]}return(t.length*c-a*i)/(i*(s-a**2))},spectralSpread:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();return Math.sqrt(u(2,t)-u(1,t)**2)},zcr:function(e){var t=e.signal;if(typeof t!=`object`)throw TypeError();for(var n=0,r=1;r<t.length;r++)(t[r-1]>=0&&t[r]<0||t[r-1]<0&&t[r]>=0)&&n++;return n}});function ee(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var v={},te={},y={bitReverseArray:function(e){if(v[e]===void 0){for(var t=(e-1).toString(2).length,n=`0`.repeat(t),r={},i=0;i<e;i++){var a=i.toString(2);a=n.substr(a.length)+a,a=[].concat(ee(a)).reverse().join(``),r[i]=parseInt(a,2)}v[e]=r}return v[e]},multiply:function(e,t){return{real:e.real*t.real-e.imag*t.imag,imag:e.real*t.imag+e.imag*t.real}},add:function(e,t){return{real:e.real+t.real,imag:e.imag+t.imag}},subtract:function(e,t){return{real:e.real-t.real,imag:e.imag-t.imag}},euler:function(e,t){var n=-2*Math.PI*e/t;return{real:Math.cos(n),imag:Math.sin(n)}},conj:function(e){return e.imag*=-1,e},constructComplexArray:function(e){var t={};t.real=e.real===void 0?e.slice():e.real.slice();var n=t.real.length;return te[n]===void 0&&(te[n]=Array.apply(null,Array(n)).map(Number.prototype.valueOf,0)),t.imag=te[n].slice(),t}},ne=function(e){var t={};e.real===void 0||e.imag===void 0?t=y.constructComplexArray(e):(t.real=e.real.slice(),t.imag=e.imag.slice());var n=t.real.length,r=Math.log2(n);if(Math.round(r)!=r)throw Error(`Input size must be a power of 2.`);if(t.real.length!=t.imag.length)throw Error(`Real and imaginary components must have the same length.`);for(var i=y.bitReverseArray(n),a={real:[],imag:[]},o=0;o<n;o++)a.real[i[o]]=t.real[o],a.imag[i[o]]=t.imag[o];for(var s=0;s<n;s++)t.real[s]=a.real[s],t.imag[s]=a.imag[s];for(var c=1;c<=r;c++)for(var l=2**c,u=0;u<l/2;u++)for(var d=y.euler(u,l),f=0;f<n/l;f++){var p=l*f+u,m=l*f+u+l/2,h={real:t.real[p],imag:t.imag[p]},g={real:t.real[m],imag:t.imag[m]},_=y.multiply(d,g),ee=y.subtract(h,_);t.real[m]=ee.real,t.imag[m]=ee.imag;var v=y.add(_,h);t.real[p]=v.real,t.imag[p]=v.imag}return t},re=function(){function e(e,t){var n=this;if(this._m=t,!e.audioContext)throw this._m.errors.noAC;if(e.bufferSize&&!r(e.bufferSize))throw this._m._errors.notPow2;if(!e.source)throw this._m._errors.noSource;this._m.audioContext=e.audioContext,this._m.bufferSize=e.bufferSize||this._m.bufferSize||256,this._m.hopSize=e.hopSize||this._m.hopSize||this._m.bufferSize,this._m.sampleRate=e.sampleRate||this._m.audioContext.sampleRate||44100,this._m.callback=e.callback,this._m.windowingFunction=e.windowingFunction||`hanning`,this._m.featureExtractors=_,this._m.EXTRACTION_STARTED=e.startImmediately||!1,this._m.channel=typeof e.channel==`number`?e.channel:0,this._m.inputs=e.inputs||1,this._m.outputs=e.outputs||1,this._m.numberOfMFCCCoefficients=e.numberOfMFCCCoefficients||this._m.numberOfMFCCCoefficients||13,this._m.numberOfBarkBands=e.numberOfBarkBands||this._m.numberOfBarkBands||24,this._m.spn=this._m.audioContext.createScriptProcessor(this._m.bufferSize,this._m.inputs,this._m.outputs),this._m.spn.connect(this._m.audioContext.destination),this._m._featuresToExtract=e.featureExtractors||[],this._m.barkScale=a(this._m.bufferSize,this._m.sampleRate,this._m.bufferSize),this._m.melFilterBank=c(Math.max(this._m.melBands,this._m.numberOfMFCCCoefficients),this._m.sampleRate,this._m.bufferSize),this._m.inputData=null,this._m.previousInputData=null,this._m.frame=null,this._m.previousFrame=null,this.setSource(e.source),this._m.spn.onaudioprocess=function(e){var t;n._m.inputData!==null&&(n._m.previousInputData=n._m.inputData),n._m.inputData=e.inputBuffer.getChannelData(n._m.channel),n._m.previousInputData?((t=new Float32Array(n._m.previousInputData.length+n._m.inputData.length-n._m.hopSize)).set(n._m.previousInputData.slice(n._m.hopSize)),t.set(n._m.inputData,n._m.previousInputData.length-n._m.hopSize)):t=n._m.inputData,(function(e,t,n){if(e.length<t)throw Error(`Buffer is too short for frame length`);if(n<1)throw Error(`Hop length cannot be less that 1`);if(t<1)throw Error(`Frame length cannot be less that 1`);var r=1+Math.floor((e.length-t)/n);return Array(r).fill(0).map((function(r,i){return e.slice(i*n,i*n+t)}))})(t,n._m.bufferSize,n._m.hopSize).forEach((function(e){n._m.frame=e;var t=n._m.extract(n._m._featuresToExtract,n._m.frame,n._m.previousFrame);typeof n._m.callback==`function`&&n._m.EXTRACTION_STARTED&&n._m.callback(t),n._m.previousFrame=n._m.frame}))}}return e.prototype.start=function(e){this._m._featuresToExtract=e||this._m._featuresToExtract,this._m.EXTRACTION_STARTED=!0},e.prototype.stop=function(){this._m.EXTRACTION_STARTED=!1},e.prototype.setSource=function(e){this._m.source&&this._m.source.disconnect(this._m.spn),this._m.source=e,this._m.source.connect(this._m.spn)},e.prototype.setChannel=function(e){e<=this._m.inputs?this._m.channel=e:console.error(`Channel ${e} does not exist. Make sure you've provided a value for 'inputs' that is greater than ${e} when instantiating the MeydaAnalyzer`)},e.prototype.get=function(e){return this._m.inputData?this._m.extract(e||this._m._featuresToExtract,this._m.inputData,this._m.previousInputData):null},e}(),b={audioContext:null,spn:null,bufferSize:512,sampleRate:44100,melBands:26,chromaBands:12,callback:null,windowingFunction:`hanning`,featureExtractors:_,EXTRACTION_STARTED:!1,numberOfMFCCCoefficients:13,numberOfBarkBands:24,_featuresToExtract:[],windowing:i,_errors:{notPow2:Error(`Meyda: Buffer size must be a power of 2, e.g. 64 or 512`),featureUndef:Error(`Meyda: No features defined.`),invalidFeatureFmt:Error(`Meyda: Invalid feature format`),invalidInput:Error(`Meyda: Invalid input.`),noAC:Error(`Meyda: No AudioContext specified.`),noSource:Error(`Meyda: No source node specified.`)},createMeydaAnalyzer:function(e){return new re(e,Object.assign({},b))},listAvailableFeatureExtractors:function(){return Object.keys(this.featureExtractors)},extract:function(e,t,n){var i=this;if(!t||typeof t!=`object`)throw this._errors.invalidInput;if(!e)throw this._errors.featureUndef;if(!r(t.length))throw this._errors.notPow2;this.barkScale!==void 0&&this.barkScale.length==this.bufferSize||(this.barkScale=a(this.bufferSize,this.sampleRate,this.bufferSize)),this.melFilterBank!==void 0&&this.barkScale.length==this.bufferSize&&this.melFilterBank.length==this.melBands||(this.melFilterBank=c(Math.max(this.melBands,this.numberOfMFCCCoefficients),this.sampleRate,this.bufferSize)),this.chromaFilterBank!==void 0&&this.chromaFilterBank.length==this.chromaBands||(this.chromaFilterBank=l(this.chromaBands,this.sampleRate,this.bufferSize)),`buffer`in t&&t.buffer===void 0?this.signal=o(t):this.signal=t;var s=ie(t,this.windowingFunction,this.bufferSize);if(this.signal=s.windowedSignal,this.complexSpectrum=s.complexSpectrum,this.ampSpectrum=s.ampSpectrum,n){var u=ie(n,this.windowingFunction,this.bufferSize);this.previousSignal=u.windowedSignal,this.previousComplexSpectrum=u.complexSpectrum,this.previousAmpSpectrum=u.ampSpectrum}var d=function(e){return i.featureExtractors[e]({ampSpectrum:i.ampSpectrum,chromaFilterBank:i.chromaFilterBank,complexSpectrum:i.complexSpectrum,signal:i.signal,bufferSize:i.bufferSize,sampleRate:i.sampleRate,barkScale:i.barkScale,melFilterBank:i.melFilterBank,previousSignal:i.previousSignal,previousAmpSpectrum:i.previousAmpSpectrum,previousComplexSpectrum:i.previousComplexSpectrum,numberOfMFCCCoefficients:i.numberOfMFCCCoefficients,numberOfBarkBands:i.numberOfBarkBands})};if(typeof e==`object`)return e.reduce((function(e,t){var n;return Object.assign({},e,((n={})[t]=d(t),n))}),{});if(typeof e==`string`)return d(e);throw this._errors.invalidFeatureFmt}},ie=function(e,t,n){var r={};e.buffer===void 0?r.signal=o(e):r.signal=e,r.windowedSignal=i(r.signal,t),r.complexSpectrum=ne(r.windowedSignal),r.ampSpectrum=new Float32Array(n/2);for(var a=0;a<n/2;a++)r.ampSpectrum[a]=Math.sqrt(r.complexSpectrum.real[a]**2+r.complexSpectrum.imag[a]**2);return r};return typeof window<`u`&&(window.Meyda=b),b}))}))(),1),Qe=class e{static{this.LOOKAHEAD_MS=25}static{this.SCHEDULE_AHEAD_S=.1}static{this.CLICK_GAIN=.05}static{this.ACCENT_GAIN=.09}static{this.CLICK_DURATION_S=.02}constructor(e,t,n){this.nextClickTime=0,this.firstClickTime=0,this.beatIndex=0,this.schedulerTimer=null,this.ctx=e,this.bpm=t,this.audible=n}start(){this.beatIndex=0,this.firstClickTime=this.ctx.currentTime+.05,this.nextClickTime=this.firstClickTime,this.audible&&(this.schedulerTimer=setInterval(()=>this.scheduler(),e.LOOKAHEAD_MS))}stop(){this.schedulerTimer&&clearInterval(this.schedulerTimer),this.schedulerTimer=null}isJustAfterClick(e,t){if(!this.audible||e<this.firstClickTime)return!1;let n=60/this.bpm;return(e-this.firstClickTime)%n<=t}getBeatPhase(e){if(e<this.firstClickTime)return{phase:0,beatIndex:-1};let t=60/this.bpm,n=e-this.firstClickTime;return{phase:n%t/t,beatIndex:Math.floor(n/t)}}scheduler(){let t=60/this.bpm;for(;this.nextClickTime<this.ctx.currentTime+e.SCHEDULE_AHEAD_S;)this.playClick(this.nextClickTime,this.beatIndex%4==0),this.nextClickTime+=t,this.beatIndex++}playClick(t,n){let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.frequency.value=n?1500:1e3,r.connect(i),i.connect(this.ctx.destination);let a=n?e.ACCENT_GAIN:e.CLICK_GAIN;i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(a,t+.002),i.gain.exponentialRampToValueAtTime(1e-4,t+e.CLICK_DURATION_S),r.start(t),r.stop(t+e.CLICK_DURATION_S)}},B={IDLE:`idle`,LISTENING:`listening`,ONSET_HOLD:`onset_hold`,COOLDOWN:`cooldown`},$e=[`rms`,`spectralFlatness`,`powerSpectrum`,`zcr`],et={fftSize:512,onsetRatio:1.3,releaseRatio:.7,maxHoldMs:400,cooldownMs:50,minHoldMs:30},tt=.05,nt=.001,rt=.07;function it(e){if(e instanceof DOMException)switch(e.name){case`NotFoundError`:return`No microphone was found. Check that a mic is connected, enabled, and set as the default input device in your OS sound settings.`;case`NotAllowedError`:return`Microphone access was denied. Check your browser's site permissions (the padlock icon in the address bar) and allow microphone access.`;case`NotReadableError`:return`The microphone is in use by another application, or the OS couldn't access it.`;case`OverconstrainedError`:return`No microphone on this system supports the requested audio settings.`;case`SecurityError`:return`Microphone access is blocked — this page must be served over HTTPS or from localhost.`;default:return`Microphone error: ${e.message}`}return e instanceof Error?e.message:`Unknown microphone error.`}var at=class extends EventTarget{constructor(e=et){super(),this.ctx=null,this.analyzer=null,this.stream=null,this.source=null,this.waveNode=null,this.state=B.IDLE,this.holdBuffer=[],this.cooldownTimer=null,this.lastLevelEmitAt=0,this.noiseFloor=0,this.releaseGate=0,this.holdStartedAt=0,this.metronome=null,this.mediaRecorder=null,this.recordedChunks=[],this.lastRecordingBlob=null,this.recordingStoppedPromise=null,this.config=e}getState(){return this.state}getSampleRate(){return this.ctx?.sampleRate??null}getFftSize(){return this.config.fftSize}getConfig(){return this.config}getWaveform(e){return this.waveNode?(this.waveNode.getFloatTimeDomainData(e),!0):!1}getWaveformSize(){return this.waveNode?.fftSize??2048}getBeatPhase(){return!this.ctx||!this.metronome?null:this.metronome.getBeatPhase(this.ctx.currentTime)}updateConfig(e){this.config={...this.config,...e}}async getRecordingBlob(){return this.recordingStoppedPromise?this.recordingStoppedPromise:this.lastRecordingBlob}async start(e,t){if(this.state===B.IDLE)try{if(this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!0}}),this.ctx=new AudioContext,this.source=this.ctx.createMediaStreamSource(this.stream),this.waveNode=this.ctx.createAnalyser(),this.waveNode.fftSize=2048,this.source.connect(this.waveNode),this.analyzer=Ze.default.createMeydaAnalyzer({audioContext:this.ctx,source:this.source,bufferSize:this.config.fftSize,featureExtractors:$e,callback:e=>this.onFeatures(e)}),this.analyzer.start(),this.metronome=new Qe(this.ctx,e,t),this.metronome.start(),this.recordedChunks=[],this.lastRecordingBlob=null,this.recordingStoppedPromise=null,typeof MediaRecorder<`u`)try{this.mediaRecorder=new MediaRecorder(this.stream),this.mediaRecorder.ondataavailable=e=>{e.data.size>0&&this.recordedChunks.push(e.data)},this.mediaRecorder.start()}catch{this.mediaRecorder=null}this.setState(B.LISTENING)}catch(e){this.dispatchEvent(new CustomEvent(`error`,{detail:Error(it(e))})),this.teardown()}}stop(){this.teardown(),this.setState(B.IDLE)}teardown(){if(this.metronome?.stop(),this.metronome=null,this.analyzer?.stop(),this.analyzer=null,this.waveNode?.disconnect(),this.waveNode=null,this.mediaRecorder&&this.mediaRecorder.state!==`inactive`){let e=this.mediaRecorder,t=this.recordedChunks;this.recordingStoppedPromise=new Promise(n=>{e.addEventListener(`stop`,()=>{let r=t.length?new Blob(t,{type:e.mimeType||`audio/webm`}):null;this.lastRecordingBlob=r,n(r)},{once:!0})}),e.stop()}this.mediaRecorder=null,this.source?.disconnect(),this.source=null,this.stream?.getTracks().forEach(e=>e.stop()),this.stream=null,this.ctx?.close(),this.ctx=null,this.cooldownTimer&&clearTimeout(this.cooldownTimer),this.cooldownTimer=null,this.holdBuffer=[],this.noiseFloor=0}onFeatures(e){if(!this.ctx)return;let t={timestamp:this.ctx.currentTime,rms:e.rms??0,spectralFlatness:e.spectralFlatness??0,powerSpectrum:e.powerSpectrum??new Float32Array,zcr:e.zcr??0},n=this.metronome?.isJustAfterClick(t.timestamp,rt)??!1;this.state===B.LISTENING&&!n&&(this.noiseFloor+=(t.rms-this.noiseFloor)*tt);let r=Math.max(this.noiseFloor,nt)*this.config.onsetRatio;switch(this.maybeEmitLevel(t.rms,r),this.state){case B.LISTENING:!n&&t.rms>=r&&this.beginOnsetHold(t,r);break;case B.ONSET_HOLD:{if(n)break;this.holdBuffer.push(t);let e=(t.timestamp-this.holdStartedAt)*1e3;if(t.rms<=this.releaseGate||e>=this.config.maxHoldMs){let t=this.holdBuffer;this.holdBuffer=[],e>=this.config.minHoldMs&&this.dispatchEvent(new CustomEvent(`transient-detected`,{detail:t})),this.enterCooldown()}break}default:break}}beginOnsetHold(e,t){this.holdBuffer=[e],this.releaseGate=t*this.config.releaseRatio,this.holdStartedAt=e.timestamp,this.setState(B.ONSET_HOLD)}enterCooldown(){this.setState(B.COOLDOWN),this.cooldownTimer=setTimeout(()=>{this.setState(B.LISTENING)},this.config.cooldownMs)}maybeEmitLevel(e,t){let n=performance.now();n-this.lastLevelEmitAt<33||(this.lastLevelEmitAt=n,this.dispatchEvent(new CustomEvent(`level`,{detail:{level:e,threshold:t}})))}setState(e){this.state=e,this.dispatchEvent(new CustomEvent(`state-change`,{detail:e}))}};function ot(e){if(e.numberOfChannels===1)return e.getChannelData(0);let t=Array.from({length:e.numberOfChannels},(t,n)=>e.getChannelData(n)),n=new Float32Array(e.length);for(let r=0;r<e.length;r++){let e=0;for(let n of t)e+=n[r];n[r]=e/t.length}return n}function st(e,t,n){let r=n.fftSize,i=Math.floor(e.length/r),a=`listening`,o=0,s=[],c=0,l=0,u=0,d=[];for(let f=0;f<i;f++){let i=e.subarray(f*r,(f+1)*r),p=f*r/t,m=Ze.default.extract([...$e],i);if(!m)continue;let h={timestamp:p,rms:m.rms??0,spectralFlatness:m.spectralFlatness??0,powerSpectrum:m.powerSpectrum??new Float32Array,zcr:m.zcr??0};a===`listening`&&(o+=(h.rms-o)*tt);let g=Math.max(o,nt)*n.onsetRatio;if(a===`listening`)h.rms>=g&&(s=[h],l=g*n.releaseRatio,c=h.timestamp,a=`hold`);else if(a===`hold`){s.push(h);let e=(h.timestamp-c)*1e3;(h.rms<=l||e>=n.maxHoldMs)&&(e>=n.minHoldMs&&d.push({frames:s,timeMs:c*1e3}),s=[],a=`cooldown`,u=h.timestamp+n.cooldownMs/1e3)}else h.timestamp>=u&&(a=`listening`)}return d}function ct(e){return e instanceof DOMException&&e.name===`EncodingError`?`This browser couldn't decode that audio file's format. Try exporting it as WAV or MP3 and uploading again.`:e instanceof Error?`Couldn't read that file: ${e.message}`:`Couldn't read that file.`}async function lt(e,t=et){let n=await e.arrayBuffer(),r=new AudioContext;try{let e;try{e=await r.decodeAudioData(n)}catch(e){throw Error(ct(e))}return{hits:st(ot(e),e.sampleRate,t),sampleRate:e.sampleRate}}finally{r.close()}}var ut={lowBandHz:200,midBandHz:2e3};function dt(e,t,n,r){let i=t/n,a=0,o=0,s=0;for(let t=0;t<e.length;t++){let n=t*i,c=e[t];n<=r.lowBandHz?a+=c:n<=r.midBandHz?o+=c:s+=c}let c=a+o+s||1;return{low:a/c,mid:o/c,high:s/c}}function ft(e,t){let n=0,r=0;for(let i=0;i<e.length;i++)n+=e[i]*t[i],r+=t[i];return r===0?e.length===0?0:e.reduce((e,t)=>e+t,0)/e.length:n/r}function pt(e){return Math.min(1,Math.max(0,e))}function mt(e,t,n){return t===n?+(e>=t):pt((e-t)/(n-t))}function ht(e,t,n,r=ut){if(e.length===0)return{brightness:0,flatness:0,lowBandEnergy:0,midBandEnergy:0,highBandEnergy:0};let i=e.map(e=>e.rms),a=ft(e.map(e=>e.spectralFlatness),i),o=e.map(e=>dt(e.powerSpectrum,t,n,r)),s=ft(o.map(e=>e.low),i),c=ft(o.map(e=>e.mid),i),l=ft(o.map(e=>e.high),i);return{brightness:c+2*l,flatness:a,lowBandEnergy:s,midBandEnergy:c,highBandEnergy:l}}var gt=.15;function _t(e){let t=e.map((e,t)=>t).sort((t,n)=>e[t]-e[n]),n=t.slice(0,-1).map((n,r)=>({afterPos:r,size:e[t[r+1]]-e[t[r]]})).filter(e=>e.size>=gt).sort((e,t)=>t.size-e.size).slice(0,2).map(e=>e.afterPos).sort((e,t)=>e-t),r=[],i=0;for(let e of n)r.push(t.slice(i,e+1)),i=e+1;return r.push(t.slice(i)),r}var vt=[`kick`,`snare`,`hat`];function yt(e,t){if(e.length===3)return vt;let n=Array(e.length);n[t]=`kick`;let r=[`snare`,`hat`],i=0;for(let a=t+1;a<e.length;a++)n[a]=r[i++]??`hat`;i=0;for(let e=t-1;e>=0;e--)n[e]=r[i++]??`hat`;return n}function bt(e){if(e.length===0)return[];let t=e.map(e=>e.brightness),n=_t(t),r=yt(n,n.findIndex(e=>e.includes(0))),i=Array(e.length);return n.forEach((a,o)=>{let s=r[o],c=Math.min(o>0?mt(t[a[0]]-t[n[o-1].at(-1)],0,gt*2):1,o<n.length-1?mt(t[n[o+1][0]]-t[a.at(-1)],0,gt*2):1);for(let t of a)i[t]={class:s,confidence:pt(c),features:e[t]}}),i}function xt(e,t){if(e.length===0)return{steps:[],totalSteps:16};let n=6e4/t/4,r=Math.min(...e.map(e=>e.timeMs)),i=e.map(e=>e.timeMs-r),a=Math.max(...i),o=Math.round(a/n)+1,s=Math.max(16,Math.ceil(o/16)*16);return{steps:e.map(e=>({step:Math.min(s-1,Math.round((e.timeMs-r)/n)),class:e.class,controlLabel:e.controlLabel})),totalSteps:s}}function St(e,t){return e.controls.find(e=>e.id===t)}function Ct(e,t){return t.map(t=>St(e,t)).filter(e=>e!==void 0)}var wt=[[`1`,`2`,`3`,`4`],[`5`,`6`,`7`,`8`],[`9`,`10`,`11`,`12`],[`13`,`14`,`15`,`16`]];function Tt(){let e=[],t=36;for(let n=0;n<4;n++)for(let r=0;r<4;r++)e.push({id:`pad-${wt[n][r]}`,label:wt[n][r],shape:`pad`,position:{row:n,col:r},midi:{note:t++,channel:10}});return e}var Et={id:`sp404mkii`,name:`Roland SP-404MKII`,gridDimensions:{rows:4,cols:4},banks:[`A`,`B`,`C`,`D`],controls:Tt(),classMapping:{kick:[`pad-1`],snare:[`pad-2`],hat:[`pad-3`]},decorative:[`BUS FX`,`HOLD`,`EXT SOURCE`,`SUB PAD`]};function Dt(){let e=[],t=60;for(let n=1;n<=16;n++)e.push({id:`key-${n}`,label:String(n),shape:`key`,position:{row:0,col:n-1},midi:{note:t++,channel:1}});return e}var Ot={id:`po33`,name:`Pocket Operator PO-33 K.O!`,gridDimensions:null,controls:Dt(),classMapping:{kick:[`key-1`],snare:[`key-2`],hat:[`key-3`]}};function kt(){let e=[],t=48;for(let n=1;n<=16;n++)e.push({id:`key-${n}`,label:String(n),shape:`key`,position:{row:0,col:n-1},midi:{note:t++,channel:1}});return e}var At={id:`po32`,name:`Pocket Operator PO-32 Tonic`,gridDimensions:null,controls:kt(),classMapping:{kick:[`key-1`],snare:[`key-2`],hat:[`key-3`]}},jt=We(`device-config`),Mt=We(`audio-engine`);function V(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Nt=class extends I{constructor(...e){super(...e),this.status=`idle`}render(){return A`
      <div class="eyebrow">Field Manual №01 · Vocal Percussion</div>
      <h1>Beat Mapper</h1>
      <p class="tag">Translating human beatbox to silicon memory.</p>
      <hr class="rule" />
      <div class="meta">
        <span>Edition 2026</span>
        <span class="status">${this.status}</span>
        <span>16-Step · 4/4</span>
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
      text-align: center;
    }

    .eyebrow {
      font-family: var(--mono);
      font-size: var(--text-sm);
      letter-spacing: var(--track-mega);
      text-transform: uppercase;
      color: var(--ink-soft);
      margin-bottom: var(--space-4);
    }

    h1 {
      font-family: var(--serif);
      font-weight: var(--w-black);
      font-size: clamp(40px, 9vw, 68px);
      line-height: 0.94;
      letter-spacing: var(--track-tight);
      text-transform: uppercase;
      margin: 0;
      color: var(--ink);
    }

    .tag {
      font-family: var(--serif);
      font-style: italic;
      font-weight: var(--w-book);
      font-size: clamp(15px, 2.6vw, 19px);
      color: var(--ink);
      margin: var(--space-2) 0 0;
    }

    .rule {
      border: 0;
      border-top: 1px solid var(--ink);
      margin: var(--space-6) 0 var(--space-3);
    }

    .meta {
      display: flex;
      justify-content: space-between;
      font-family: var(--mono);
      font-size: var(--text-sm);
      letter-spacing: var(--track-wider);
      text-transform: uppercase;
      color: var(--ink-soft);
    }

    .meta .status {
      color: var(--ink);
    }

    @media (max-width: 560px) {
      .meta {
        font-size: var(--text-2xs);
        letter-spacing: var(--track-wide);
      }
    }
  `}};V([R({type:String})],Nt.prototype,`status`,void 0),Nt=V([L(`app-header`)],Nt);var Pt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ft=e=>(...t)=>({_$litDirective$:e,values:t}),It=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},Lt=class extends It{constructor(e){if(super(e),this.it=N,e.type!==Pt.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===N||e==null)return this._t=void 0,this.it=e;if(e===M)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Lt.directiveName=`unsafeHTML`,Lt.resultType=1;var H=Ft(Lt),U={kick:{fg:`var(--kick)`,shape:`circle`,label:`KICK`,gloss:`sub-bass`},snare:{fg:`var(--snare)`,shape:`square`,label:`SNARE`,gloss:`mid-transient`},hat:{fg:`var(--hat)`,shape:`triangle`,label:`HAT`,gloss:`high-freq`}},Rt=[`hat`,`snare`,`kick`],zt=/^var\((--[\w-]+)\)$/;function Bt(e,t){let n=zt.exec(t);return n&&getComputedStyle(e).getPropertyValue(n[1]).trim()||t}function W(e,t){let n=`fill="${t}" stroke="var(--ink)" stroke-width="1" stroke-linejoin="round"`;switch(e){case`circle`:return`<svg viewBox="0 0 20 20" width="100%" height="100%"><circle cx="10" cy="10" r="8" ${n}/></svg>`;case`square`:return`<svg viewBox="0 0 20 20" width="100%" height="100%"><rect x="2.5" y="2.5" width="15" height="15" ${n}/></svg>`;case`triangle`:return`<svg viewBox="0 0 20 20" width="100%" height="100%"><path d="M10 2.5 L17.5 17 L2.5 17 Z" ${n}/></svg>`}}var Vt=`https://github.com/warmsynths/beat-mapper`,Ht=`https://ko-fi.com/warmsynths`,Ut=class extends I{render(){return A`
      <p class="note">Nothing is captured until you hit record — every take stays in this browser.</p>
      <div class="links">
        <a class="link" style="--accent: var(--kick)" href=${Vt} target="_blank" rel="noopener noreferrer">
          <span class="mark">${H(W(`circle`,`var(--kick)`))}</span>GitHub
        </a>
        <span class="sep">·</span>
        <span class="brand">
          <span class="mark">${H(W(`square`,`var(--snare)`))}</span>Made with <span class="heart">♥</span> by warmsynths
        </span>
        <span class="sep">·</span>
        <a class="link" style="--accent: var(--hat)" href=${Ht} target="_blank" rel="noopener noreferrer">
          <span class="mark">${H(W(`triangle`,`var(--hat)`))}</span>Support
        </a>
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
      text-align: center;
      border-top: 1px solid var(--hair);
      margin-top: var(--space-7);
      padding-top: var(--space-6);
    }

    .note {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-lg);
      color: var(--ink-soft);
      margin: 0 0 var(--space-4);
    }

    .links {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--space-3);
      font-family: var(--mono);
      font-size: var(--text-sm);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
    }

    .sep {
      color: var(--hair);
    }

    .link,
    .brand {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
    }

    .link {
      color: var(--ink);
      text-decoration: none;
      transition: color var(--dur-fast) var(--ease);
    }
    .link:hover {
      color: var(--accent, var(--ink-soft));
    }

    .heart {
      color: var(--kick);
    }

    .mark {
      width: 10px;
      height: 10px;
      display: block;
      flex-shrink: 0;
      line-height: 0;
    }

    @media (max-width: 560px) {
      .links {
        font-size: var(--text-2xs);
        letter-spacing: var(--track-normal);
      }
    }
  `}};Ut=V([L(`app-footer`)],Ut);var Wt=900,G=4,Gt=.35,Kt=class extends I{constructor(...e){super(...e),this.recording=!1,this.canvas=null,this.ctx2d=null,this.rafId=0,this.dpr=Math.min(window.devicePixelRatio||1,2),this.resizeObserver=null,this.waveBuf=new Float32Array(2048),this.history=[],this.inkColor=`#201e19`,this.draw=()=>{this.rafId=requestAnimationFrame(this.draw);let e=this.ctx2d,t=this.canvas;if(!e||!t||t.width===0)return;this.sample();let n=t.width,r=t.height,i=r/2;e.clearRect(0,0,n,r),e.strokeStyle=`rgba(154, 147, 132, 0.55)`,e.lineWidth=this.dpr,e.beginPath(),e.moveTo(0,i),e.lineTo(n,i),e.stroke();let a=this.history.length,o=n/(a-1);e.strokeStyle=this.inkColor,e.lineWidth=1.1*this.dpr,e.lineJoin=`round`,e.beginPath();for(let t=0;t<a;t++){let n=t*o,a=this.history[t]*(r*.46),s=a>1?0:Math.sin(t*.7)*.6,c=i-a-s;t===0?e.moveTo(n,c):e.lineTo(n,c)}for(let t=a-1;t>=0;t--){let n=t*o,a=this.history[t]*(r*.46),s=a>1?0:Math.sin(t*.7)*.6,c=i+a+s;e.lineTo(n,c)}if(e.stroke(),this.recording){let t=this.engine?.getBeatPhase();t&&t.beatIndex>=0&&this.drawBeatPulse(e,n,t)}}}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),cancelAnimationFrame(this.rafId)}firstUpdated(){this.canvas=this.renderRoot.querySelector(`canvas`),this.ctx2d=this.canvas?.getContext(`2d`)??null,this.resizeObserver=new ResizeObserver(()=>this.resize()),this.canvas&&this.resizeObserver.observe(this.canvas),this.resize(),this.inkColor=Bt(this,`var(--ink)`),this.history=Array(Wt).fill(0),this.engine&&(this.waveBuf=new Float32Array(this.engine.getWaveformSize())),this.rafId=requestAnimationFrame(this.draw)}resize(){if(!this.canvas)return;let e=this.canvas.getBoundingClientRect();this.canvas.width=Math.max(1,Math.round(e.width*this.dpr)),this.canvas.height=Math.max(1,Math.round(e.height*this.dpr))}sample(){let e=0;if(this.recording&&this.engine?.getWaveform(this.waveBuf)){for(let t=0;t<this.waveBuf.length;t++){let n=Math.abs(this.waveBuf[t]);n>e&&(e=n)}e=Math.min(1,e*1.6)}this.history.push(e),this.history.length>Wt&&this.history.shift()}drawBeatPulse(e,t,n){let r=(n.beatIndex%G+G)%G,i=Math.max(0,1-n.phase/Gt),a=8*this.dpr,o=t*.06,s=(t-o*2)/(G-1),c=2.2*this.dpr;for(let t=0;t<G;t++){let n=o+s*t,l=t===r,u=c*(t===0?1.4:1);e.beginPath(),e.arc(n,a,u,0,Math.PI*2),e.fillStyle=l?this.inkColor:`rgba(154, 147, 132, 0.55)`,e.globalAlpha=l?.35+.65*i:1,e.fill()}e.globalAlpha=1}render(){return A`<canvas></canvas>`}static{this.styles=h`
    :host {
      display: block;
    }
    canvas {
      width: 100%;
      height: 116px;
      display: block;
    }
  `}};V([Xe({context:Mt})],Kt.prototype,`engine`,void 0),V([R({type:Boolean})],Kt.prototype,`recording`,void 0),Kt=V([L(`beat-timeline`)],Kt);var qt=16,Jt={kick:`KCK`,snare:`SNR`,hat:`HAT`},Yt=class extends I{constructor(...e){super(...e),this.pattern={steps:[],totalSteps:qt},this.selectedClass=null}onLaneClick(e){this.dispatchEvent(new CustomEvent(`lane-select`,{detail:e,bubbles:!0,composed:!0}))}render(){let e=new Map;for(let t of Rt)e.set(t,new Set);for(let t of this.pattern.steps)e.get(t.class)?.add(t.step);let t=Array.from({length:this.pattern.totalSteps},(e,t)=>t),n=`grid-template-columns: repeat(${this.pattern.totalSteps}, minmax(0, 1fr))`;return A`
      <div class="frame">
        ${Rt.map(r=>{let i=U[r],a=e.get(r),o=W(i.shape,i.fg);return A`
            <div class="lane" ?data-sel=${this.selectedClass===r}>
              <button type="button" class="label" @click=${()=>this.onLaneClick(r)}>
                <span class="sym">${H(o)}</span>
                <span>${Jt[r]}</span>
              </button>
              <div class="cells" style=${n}>
                ${t.map(e=>A`
                    <div class="cell" ?data-bar=${e%qt===0} ?data-beat=${e%4==0}>
                      ${a.has(e)?A`<span class="mark">${H(o)}</span>`:``}
                    </div>
                  `)}
              </div>
            </div>
          `})}
        <div class="ruler">
          <span class="spacer"></span>
          <div class="nums" style=${n}>
            ${t.map(e=>A`<span>${e%4==0?e/4+1:`·`}</span>`)}
          </div>
        </div>
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
    }

    .frame {
      border-top: 1px solid var(--hair);
      /* shrink-to-fit; only scroll when cells would drop below ~16px */
      overflow-x: auto;
      overscroll-behavior-x: contain;
    }

    .lane {
      display: grid;
      grid-template-columns: 60px 1fr;
      align-items: stretch;
      border-bottom: 1px solid var(--hair);
      min-width: 340px;
    }

    .label {
      display: flex;
      align-items: center;
      gap: var(--space-1-5);
      padding: 0 var(--space-2);
      font-family: var(--mono);
      font-size: var(--text-sm);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink);
      background: none;
      border: none;
      border-left: 2px solid transparent;
      cursor: pointer;
      text-align: left;
      min-height: 34px;
    }
    .label:hover {
      background: rgba(0, 0, 0, 0.03);
    }
    .lane[data-sel] .label {
      border-left-color: var(--ink);
      background: rgba(0, 0, 0, 0.04);
    }

    .sym {
      width: 13px;
      height: 13px;
      display: block;
      flex-shrink: 0;
      line-height: 0;
    }

    .cells {
      display: grid;
    }

    .cell {
      aspect-ratio: 1;
      border-left: 1px solid var(--hair-soft);
      display: grid;
      place-items: center;
      padding: 18%;
    }
    .cell[data-beat] {
      border-left-color: var(--hair);
    }
    .cell[data-bar] {
      border-left-color: var(--ink);
    }

    .mark {
      width: 100%;
      height: 100%;
      display: block;
      line-height: 0;
    }

    .ruler {
      display: grid;
      grid-template-columns: 60px 1fr;
      min-width: 340px;
      padding-top: var(--space-1);
    }
    .nums {
      display: grid;
    }
    .nums span {
      font-family: var(--mono);
      font-size: var(--text-2xs);
      color: var(--ink-faint);
      text-align: center;
    }
  `}};V([R({attribute:!1})],Yt.prototype,`pattern`,void 0),V([R({attribute:!1})],Yt.prototype,`selectedClass`,void 0),Yt=V([L(`pattern-grid`)],Yt);var Xt=.3,Zt=class extends I{constructor(...e){super(...e),this.level=0,this.threshold=0}render(){let e=Math.min(100,this.level/Xt*100),t=Math.min(100,this.threshold/Xt*100);return A`
      <div class="track" ?data-hot=${this.level>=this.threshold}>
        <div class="fill" style="width: ${e}%"></div>
        <div class="marker" style="left: ${t}%"></div>
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
    }

    .track {
      position: relative;
      height: 12px;
      border: 1px solid var(--ink);
      background: var(--paper);
      overflow: hidden;
    }

    .fill {
      height: 100%;
      /* tick hatching, like a printed fill pattern */
      background: repeating-linear-gradient(
        90deg,
        var(--ink) 0 1px,
        transparent 1px 4px
      );
      transition: width 60ms var(--ease-linear);
    }

    .track[data-hot] .fill {
      background: repeating-linear-gradient(
        90deg,
        var(--kick) 0 1.5px,
        transparent 1.5px 4px
      );
    }

    .marker {
      position: absolute;
      top: -2px;
      bottom: -2px;
      width: 1px;
      background: var(--ink);
    }
    .marker::after {
      content: '';
      position: absolute;
      top: -3px;
      left: -2.5px;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 4px solid var(--ink);
    }
  `}};V([R({type:Number})],Zt.prototype,`level`,void 0),V([R({type:Number})],Zt.prototype,`threshold`,void 0),Zt=V([L(`level-meter`)],Zt);var K=class extends I{constructor(...e){super(...e),this.sessionPhase=`idle`,this.level=0,this.levelThreshold=0,this.errorMessage=null,this.infoMessage=null,this.recordedHits=[],this.bpm=100,this.targetBpm=100,this.pattern={steps:[],totalSteps:16},this.selectedClass=null,this.headphonesOn=!1,this.isAnalyzingFile=!1,this.hasTakeAudio=!1,this.onRecordClick=()=>{this.dispatchEvent(new CustomEvent(`record-toggle`,{bubbles:!0,composed:!0}))},this.onDownloadAudioClick=()=>{this.dispatchEvent(new CustomEvent(`download-audio`,{bubbles:!0,composed:!0}))},this.onDownloadDiagnosticsClick=()=>{this.dispatchEvent(new CustomEvent(`download-diagnostics`,{bubbles:!0,composed:!0}))},this.onHeadphonesClick=()=>{this.dispatchEvent(new CustomEvent(`headphones-toggle`,{detail:!this.headphonesOn,bubbles:!0,composed:!0}))},this.onFileInputChange=e=>{let t=e.target,n=t.files?.[0];t.value=``,n&&this.dispatchEvent(new CustomEvent(`file-upload`,{detail:n,bubbles:!0,composed:!0}))}}adjustBpm(e){this.dispatchEvent(new CustomEvent(`bpm-adjust`,{detail:e,bubbles:!0,composed:!0}))}adjustTargetBpm(e){this.dispatchEvent(new CustomEvent(`target-bpm-adjust`,{detail:e,bubbles:!0,composed:!0}))}render(){let e=this.sessionPhase===`recording`,t=this.sessionPhase===`reviewing`,n=e?`Stop`:t?`Record again`:`Record`,r=e?`RECORDING`:this.isAnalyzingFile?`ANALYZING`:t?`${this.bpm} BPM`:`STANDBY`,i=(Math.max(...this.recordedHits.map(e=>e.timeMs),0)/1e3).toFixed(1);return A`
      <section>
        <div class="fig">Fig. 01 — Voice Input<span class="line"></span></div>

        <div class="scope">
          <span class="scope-tag">${r}</span>
          <beat-timeline .recording=${e}></beat-timeline>
        </div>
        <p class="caption">Raw transient signal captured from the microphone.</p>

        <div class="transport">
          <button type="button" class="rec" ?data-on=${e} ?disabled=${this.isAnalyzingFile} @click=${this.onRecordClick}>
            <span class="dot"></span>${n}
          </button>
          <label class="upload" ?data-disabled=${e||this.isAnalyzingFile}>
            ${this.isAnalyzingFile?`Analyzing…`:`Upload audio`}
            <input
              type="file"
              accept="audio/*"
              ?disabled=${e||this.isAnalyzingFile}
              @change=${this.onFileInputChange}
            />
          </label>
          ${t?N:A`
                <div class="metro" aria-label="Metronome tempo">
                  <span class="metro-lbl">BPM</span>
                  <button type="button" ?disabled=${e} @click=${()=>this.adjustTargetBpm(-5)}>−</button>
                  <b>${this.targetBpm}</b>
                  <button type="button" ?disabled=${e} @click=${()=>this.adjustTargetBpm(5)}>+</button>
                </div>
                <button
                  type="button"
                  class="phones"
                  ?data-on=${this.headphonesOn}
                  ?disabled=${e}
                  aria-pressed=${this.headphonesOn}
                  @click=${this.onHeadphonesClick}
                >
                  Headphones ${this.headphonesOn?`On`:`Off`}
                </button>
              `}
          <div class="meter">
            <div class="meter-scale"><span>MIC</span><span>0dB</span></div>
            <level-meter .level=${this.level} .threshold=${this.levelThreshold}></level-meter>
          </div>
        </div>
        ${t?N:A`
              <p class="metro-hint">
                ${this.headphonesOn?`Click plays through your headphones, so it never reaches the mic.`:`No click plays through the speakers — follow the pulse on the waveform above instead.`}
              </p>
            `}

        ${this.errorMessage?A`<p class="msg err">${this.errorMessage}</p>`:N}
        ${this.infoMessage?A`<p class="msg info">${this.infoMessage}</p>`:N}

        <div class="legend">
          ${Rt.slice().reverse().map(e=>{let t=U[e];return A`
              <div class="key">
                <span class="sym">${H(W(t.shape,t.fg))}</span>
                <span class="ktext"><b>${t.label.charAt(0)+t.label.slice(1).toLowerCase()}</b><em>${t.gloss}</em></span>
              </div>
            `})}
        </div>

        <div class="fig fig2">Fig. 02 — Transcribed Sequence<span class="line"></span></div>
        ${t?A`
              <div class="seq-head">
                <span class="meta">${this.recordedHits.length} hits · ${i}s</span>
                <span class="bpm">
                  <button type="button" @click=${()=>this.adjustBpm(-1)}>−</button>
                  <b>${this.bpm} BPM</b>
                  <button type="button" @click=${()=>this.adjustBpm(1)}>+</button>
                </span>
              </div>
              <pattern-grid .pattern=${this.pattern} .selectedClass=${this.selectedClass}></pattern-grid>
              <div class="downloads">
                <button type="button" ?disabled=${!this.hasTakeAudio} @click=${this.onDownloadAudioClick}>Download audio</button>
                <button type="button" @click=${this.onDownloadDiagnosticsClick}>Download diagnostics</button>
                <span class="downloads-hint">For sharing a take that transcribed wrong.</span>
              </div>
            `:A`<p class="placeholder">Record a take to see the transcribed sequence here.</p>`}
      </section>
    `}static{this.styles=h`
    :host {
      display: block;
      min-width: 0;
    }

    .fig {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      font-family: var(--grot);
      font-weight: var(--w-bold);
      font-size: var(--text-fig);
      letter-spacing: var(--track-wider);
      text-transform: uppercase;
      color: var(--ink);
      margin-bottom: var(--space-5);
    }
    .fig.fig2 {
      margin-top: var(--space-8);
    }
    .fig .line {
      flex: 1;
      height: 1px;
      background: var(--hair);
    }

    .scope {
      position: relative;
      border: 1px solid var(--ink);
      padding: var(--space-3) var(--space-4);
    }
    .scope-tag {
      position: absolute;
      top: var(--space-2);
      right: var(--space-3);
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      color: var(--ink-soft);
    }
    .caption {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-lg);
      color: var(--ink-soft);
      margin: var(--space-3) 0 0;
    }

    .transport {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-4) var(--space-5);
      margin-top: var(--space-5);
    }
    .rec {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      font-family: var(--grot);
      font-weight: var(--w-bold);
      font-size: var(--text-md);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink);
      background: var(--paper);
      border: 1px solid var(--ink);
      padding: var(--space-3) var(--space-5);
      cursor: pointer;
      min-height: 44px;
      transition: background-color var(--dur-fast) var(--ease);
    }
    .rec:hover {
      background: var(--hair-soft);
    }
    .rec .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--rec);
    }
    .rec[data-on] {
      background: var(--ink);
      color: var(--paper);
    }
    .rec[data-on] .dot {
      background: var(--paper);
      animation: blink var(--dur-slow) steps(2, start) infinite;
    }
    @keyframes blink {
      50% {
        opacity: 0.25;
      }
    }

    .metro {
      display: flex;
      align-items: center;
      gap: var(--space-1-5);
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
      white-space: nowrap;
    }
    .metro b {
      font-size: var(--text-sm);
      color: var(--ink);
      min-width: 26px;
      text-align: center;
    }
    .metro button {
      width: 18px;
      height: 18px;
      border: none;
      background: none;
      color: var(--ink-soft);
      font-family: var(--mono);
      font-size: var(--text-base);
      line-height: 1;
      padding: 0;
      cursor: pointer;
      transition: color var(--dur-fast) var(--ease);
    }
    .metro button:hover:not(:disabled) {
      color: var(--ink);
    }
    .metro button:disabled {
      opacity: 0.35;
      cursor: default;
    }

    .phones {
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
      background: var(--paper);
      border: 1px solid var(--hair);
      padding: var(--space-1-5) var(--space-3);
      cursor: pointer;
      white-space: nowrap;
      transition: background-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease);
    }
    .phones:hover:not(:disabled) {
      border-color: var(--ink);
      color: var(--ink);
    }
    .phones[data-on] {
      background: var(--ink);
      border-color: var(--ink);
      color: var(--paper);
    }
    .phones:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .upload {
      display: inline-flex;
      align-items: center;
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
      background: var(--paper);
      border: 1px solid var(--hair);
      padding: var(--space-1-5) var(--space-3);
      cursor: pointer;
      white-space: nowrap;
      transition: background-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease);
    }
    .upload:hover:not([data-disabled]) {
      border-color: var(--ink);
      color: var(--ink);
    }
    .upload[data-disabled] {
      opacity: 0.5;
      cursor: default;
    }
    .upload input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .metro-hint {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-sm);
      color: var(--ink-soft);
      opacity: 0.75;
      margin: var(--space-2) 0 0;
    }

    .meter {
      flex: 1;
    }
    .meter-scale {
      display: flex;
      justify-content: space-between;
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      color: var(--ink-soft);
      margin-bottom: var(--space-1);
    }

    .msg {
      font-family: var(--mono);
      font-size: var(--text-sm);
      margin: var(--space-3) 0 0;
    }
    .msg.err {
      color: var(--kick);
    }
    .msg.info {
      color: var(--ink-soft);
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-6);
      margin-top: var(--space-6);
    }
    .key {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    .sym {
      width: 24px;
      height: 24px;
      display: block;
      flex-shrink: 0;
      line-height: 0;
    }
    .ktext {
      display: flex;
      flex-direction: column;
      line-height: 1.3;
    }
    .ktext b {
      font-family: var(--grot);
      font-weight: var(--w-bold);
      font-size: var(--text-base);
      color: var(--ink);
    }
    .ktext em {
      font-family: var(--mono);
      font-style: normal;
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
    }

    .placeholder {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-lg);
      color: var(--ink-soft);
      border: 1px dashed var(--hair);
      padding: var(--space-5);
      text-align: center;
      margin: 0;
    }

    .seq-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-3);
    }
    .meta {
      font-family: var(--mono);
      font-size: var(--text-sm);
      color: var(--ink-soft);
      letter-spacing: var(--track-normal);
    }
    .bpm {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    .bpm b {
      font-family: var(--mono);
      font-size: var(--text-sm);
      color: var(--ink);
      min-width: 62px;
      text-align: center;
    }
    .bpm button {
      width: 26px;
      height: 26px;
      border: 1px solid var(--ink);
      background: var(--paper);
      color: var(--ink);
      font-family: var(--mono);
      font-size: var(--text-base);
      cursor: pointer;
    }
    .bpm button:hover {
      background: var(--hair-soft);
    }

    .downloads {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-3);
      margin-top: var(--space-5);
      padding-top: var(--space-4);
      border-top: 1px dashed var(--hair);
    }
    .downloads button {
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
      background: var(--paper);
      border: 1px solid var(--hair);
      padding: var(--space-1-5) var(--space-3);
      cursor: pointer;
      transition: background-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease);
    }
    .downloads button:hover:not(:disabled) {
      border-color: var(--ink);
      color: var(--ink);
    }
    .downloads button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .downloads-hint {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-sm);
      color: var(--ink-soft);
      opacity: 0.75;
    }
  `}};V([R({attribute:!1})],K.prototype,`sessionPhase`,void 0),V([R({type:Number})],K.prototype,`level`,void 0),V([R({type:Number})],K.prototype,`levelThreshold`,void 0),V([R({attribute:!1})],K.prototype,`errorMessage`,void 0),V([R({attribute:!1})],K.prototype,`infoMessage`,void 0),V([R({attribute:!1})],K.prototype,`recordedHits`,void 0),V([R({type:Number})],K.prototype,`bpm`,void 0),V([R({type:Number})],K.prototype,`targetBpm`,void 0),V([R({attribute:!1})],K.prototype,`pattern`,void 0),V([R({attribute:!1})],K.prototype,`selectedClass`,void 0),V([R({type:Boolean})],K.prototype,`headphonesOn`,void 0),V([R({type:Boolean})],K.prototype,`isAnalyzingFile`,void 0),V([R({type:Boolean})],K.prototype,`hasTakeAudio`,void 0),K=V([L(`recording-panel`)],K);var Qt=[44,87,130,173],q=[196,239,282,325],J=36,$t=220,en=[20,67,114,161],tn=[176,223,270,317],nn=18,rn=[`kick`,`snare`,`hat`],Y=class extends I{constructor(...e){super(...e),this.selectedClass=null,this.stepHighlights=null,this.reviewing=!1}togglePad(e){if(!this.stepHighlights)return;let t=this.deviceConfig.controls[e];t&&this.dispatchEvent(new CustomEvent(`pad-toggle`,{detail:t.id,bubbles:!0,composed:!0}))}toggleClass(e){this.reviewing&&this.dispatchEvent(new CustomEvent(`class-toggle`,{detail:e,bubbles:!0,composed:!0}))}mark(e,t,n){let r=U[n].fg;switch(U[n].shape){case`circle`:return j`<circle cx=${e} cy=${t} r=${11} fill=${r} stroke="var(--ink)" stroke-width="1"/>`;case`square`:return j`<rect x=${e-11} y=${t-11} width=${22} height=${22} fill=${r} stroke="var(--ink)" stroke-width="1"/>`;case`triangle`:return j`<path d=${`M${e} ${t-11-1} L${e+11+1} ${t+11} L${e-11-1} ${t+11} Z`} fill=${r} stroke="var(--ink)" stroke-width="1" stroke-linejoin="round"/>`}}render(){return this.deviceConfig?.gridDimensions===null?this.renderPocketDevice():this.renderGridDevice()}renderGridDevice(){let e=this.stepHighlights!==null&&this.selectedClass!==null,t=Array.from({length:16},(t,n)=>{let r=Qt[n%4],i=q[Math.floor(n/4)],a=e&&this.stepHighlights.has(n);return j`
        <g class=${`pad ${e?`live`:``}`} @click=${()=>this.togglePad(n)}>
          <rect x=${r} y=${i} width=${J} height=${J} rx="5" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.2"/>
          ${a?this.mark(r+J/2,i+J/2,this.selectedClass):N}
        </g>`}),n=rn.map((e,t)=>{let n=q[t],r=this.selectedClass===e;return j`
        <g class=${`sel ${this.reviewing?`active`:``}`} @click=${()=>this.toggleClass(e)}>
          <rect x=${$t} y=${n} width=${J} height=${J} rx="5"
                fill=${U[e].fg} stroke="var(--ink)" stroke-width=${r?2.6:1.2}/>
          ${r?j`<rect x=${$t-3} y=${n-3} width=${42} height=${42} rx="7" fill="none" stroke="var(--ink)" stroke-width="1"/>`:N}
        </g>`});return A`
      <svg viewBox="0 0 300 404" fill="none" stroke="var(--ink)" role="img" aria-label=${`${this.deviceLabel} device atlas`}>
        <rect x="6" y="6" width="288" height="392" rx="14" stroke-width="1.4"/>
        <rect x="20" y="20" width="260" height="364" rx="8" stroke-width="1"/>
        <rect x="34" y="30" width="34" height="9" rx="2" stroke-width="1"/>
        <text x="266" y="40" text-anchor="end" font-family="var(--mono)" font-size="13" font-weight="700" fill="var(--ink)" stroke="none" letter-spacing="1">${this.deviceLabel}</text>

        <!-- knobs -->
        <g stroke-width="1.2">
          <circle cx="46" cy="64" r="11"/><line x1="46" y1="64" x2="46" y2="55"/>
          <circle cx="82" cy="64" r="11"/><line x1="82" y1="64" x2="89" y2="58"/>
          <circle cx="118" cy="64" r="11"/><line x1="118" y1="64" x2="125" y2="59"/>
          <circle cx="154" cy="64" r="11"/><line x1="154" y1="64" x2="161" y2="61"/>
        </g>
        <!-- jog wheel -->
        <circle cx="150" cy="118" r="34" stroke-width="1.2"/><circle cx="150" cy="118" r="21" stroke-width="1"/>
        <!-- side buttons -->
        <g stroke-width="1">
          <rect x="34" y="96" width="30" height="12" rx="3"/><rect x="34" y="112" width="30" height="12" rx="3"/><rect x="34" y="128" width="30" height="12" rx="3"/>
          <rect x="236" y="96" width="30" height="12" rx="3"/><rect x="236" y="112" width="30" height="12" rx="3"/><rect x="236" y="128" width="30" height="12" rx="3"/>
        </g>
        <!-- function row -->
        <g stroke-width="1">
          <rect x="34" y="164" width="26" height="12" rx="3"/><rect x="66" y="164" width="26" height="12" rx="3"/>
          <rect x="140" y="164" width="20" height="12" rx="3" fill="var(--hat)"/><rect x="166" y="164" width="20" height="12" rx="3" fill="var(--hat)"/>
          <circle cx="252" cy="170" r="8"/>
        </g>

        <!-- 16 performance pads -->
        ${t}

        <!-- fifth column: utilities. kick/snare/hat selectors + one spare. -->
        ${n}
        <g stroke-width="1.2">
          <rect x=${$t} y=${q[3]} width=${J} height=${J} rx="5"/>
          <line x1=${230} y1=${q[3]+18} x2=${246} y2=${q[3]+18}/>
        </g>
      </svg>
    `}renderPocketDevice(){let e=this.stepHighlights!==null&&this.selectedClass!==null,t=Array.from({length:16},(t,n)=>{let r=en[n%4],i=tn[Math.floor(n/4)],a=r+nn,o=i+nn,s=e&&this.stepHighlights.has(n);return j`
        <g class=${`pad ${e?`live`:``}`} @click=${()=>this.togglePad(n)}>
          <circle cx=${a} cy=${o} r=${nn} fill="var(--paper)" stroke="var(--ink)" stroke-width="1.2"/>
          ${s?this.mark(a,o,this.selectedClass):N}
        </g>`});return A`
      <svg viewBox="0 0 220 390" fill="none" stroke="var(--ink)" role="img" aria-label=${`${this.deviceLabel} device atlas`}>
        <rect x="6" y="6" width="208" height="378" rx="20" stroke-width="1.4"/>

        <!-- speaker/mic notch, flush with the top edge -->
        <path d="M55 6 L165 6 L165 30 Q165 46 149 46 L71 46 Q55 46 55 30 Z" stroke-width="1.2"/>
        <ellipse cx="110" cy="26" rx="24" ry="8" stroke-width="1"/>

        <text x="110" y="70" text-anchor="middle" font-family="var(--mono)" font-size="13" font-weight="700" fill="var(--ink)" stroke="none" letter-spacing="1">${this.deviceLabel}</text>

        <!-- mini display -->
        <rect x="30" y="82" width="160" height="36" rx="4" stroke-width="1"/>
        <line x1="50" y1="100" x2="190" y2="100" stroke-width="1.5"/>

        <!-- knobs -->
        <g stroke-width="1.2">
          <circle cx="33" cy="148" r="13"/>
          <circle cx="187" cy="148" r="13"/>
        </g>

        <!-- 16 pads -->
        ${t}
      </svg>
    `}get deviceLabel(){return(this.deviceConfig?.name??``).replace(/^Roland\s+/i,``).replace(/^Pocket Operator\s+/i,``)}static{this.styles=h`
    :host {
      display: block;
    }
    svg {
      width: 100%;
      max-width: 320px;
      height: auto;
      display: block;
      margin: 0 auto;
    }
    text {
      font-family: var(--mono);
    }
    .pad.live {
      cursor: pointer;
    }
    .pad.live:hover rect,
    .pad.live:hover circle {
      fill: var(--hair-soft);
    }
    .sel.active {
      cursor: pointer;
    }
    .sel.active:hover rect:first-of-type {
      stroke-width: 2;
    }
  `}};V([Xe({context:jt,subscribe:!0})],Y.prototype,`deviceConfig`,void 0),V([R({attribute:!1})],Y.prototype,`selectedClass`,void 0),V([R({attribute:!1})],Y.prototype,`stepHighlights`,void 0),V([R({type:Boolean})],Y.prototype,`reviewing`,void 0),Y=V([L(`device-atlas`)],Y);var X=class extends I{constructor(...e){super(...e),this.banks=[],this.active=``,this.used=[]}select(e){this.dispatchEvent(new CustomEvent(`bank-change`,{detail:e,bubbles:!0,composed:!0}))}render(){return this.banks.length===0?N:A`
      <div class="row">
        ${this.banks.map(e=>A`
            <button
              type="button"
              class=${e===this.active?`on`:``}
              @click=${()=>this.select(e)}
            >
              ${e}
              ${this.used.includes(e)&&e!==this.active?A`<i class="tick"></i>`:N}
            </button>
          `)}
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
    }

    .row {
      display: flex;
      gap: var(--space-2);
    }

    button {
      position: relative;
      flex: 1;
      min-width: 34px;
      height: 32px;
      font-family: var(--mono);
      font-weight: var(--w-bold);
      font-size: var(--text-base);
      border: 1px solid var(--ink);
      background: var(--paper);
      color: var(--ink);
      cursor: pointer;
      transition: background-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease);
    }

    button:hover:not(.on) {
      background: var(--hair-soft);
    }

    button.on {
      background: var(--ink);
      color: var(--paper);
    }

    .tick {
      position: absolute;
      top: 3px;
      right: 3px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--kick);
    }
  `}};V([R({attribute:!1})],X.prototype,`banks`,void 0),V([R({type:String})],X.prototype,`active`,void 0),V([R({attribute:!1})],X.prototype,`used`,void 0),X=V([L(`bank-selector`)],X);var an=140,Z=class extends I{constructor(...e){super(...e),this.min=0,this.max=1,this.value=0,this.label=``,this.dragStartY=0,this.dragStartValue=0,this.dragging=!1,this.onPointerDown=e=>{this.dragging=!0,this.dragStartY=e.clientY,this.dragStartValue=this.value,e.currentTarget.setPointerCapture(e.pointerId)},this.onPointerMove=e=>{if(!this.dragging)return;let t=this.dragStartY-e.clientY,n=this.max-this.min,r=this.dragStartValue+t/an*n;this.value=Math.min(this.max,Math.max(this.min,r)),this.dispatchEvent(new CustomEvent(`value-change`,{detail:this.value,bubbles:!0,composed:!0}))},this.onPointerUp=e=>{this.dragging=!1,e.currentTarget.releasePointerCapture(e.pointerId)}}get ratio(){return(this.value-this.min)/(this.max-this.min)}render(){let e=(-135+this.ratio*270-90)*(Math.PI/180),t=15+Math.cos(e)*10,n=15+Math.sin(e)*10;return A`
      <div class="wrap">
        <svg
          viewBox="0 0 30 30"
          class="dial"
          @pointerdown=${this.onPointerDown}
          @pointermove=${this.onPointerMove}
          @pointerup=${this.onPointerUp}
        >
          <circle cx="15" cy="15" r="12" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.2" />
          <line x1="15" y1="15" x2=${t.toFixed(1)} y2=${n.toFixed(1)} stroke="var(--ink)" stroke-width="1.2" stroke-linecap="round" />
        </svg>
        <span class="label">${this.label}</span>
      </div>
    `}static{this.styles=h`
    :host {
      display: inline-flex;
    }

    .wrap {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      user-select: none;
      touch-action: none;
    }

    .dial {
      width: 34px;
      height: 34px;
      flex-shrink: 0;
      cursor: ns-resize;
      display: block;
    }

    .label {
      font-family: var(--mono);
      font-size: var(--text-xs);
      letter-spacing: var(--track-wider);
      text-transform: uppercase;
      color: var(--ink-soft);
    }
  `}};V([R({type:Number})],Z.prototype,`min`,void 0),V([R({type:Number})],Z.prototype,`max`,void 0),V([R({type:Number})],Z.prototype,`value`,void 0),V([R({type:String})],Z.prototype,`label`,void 0),Z=V([L(`knob-control`)],Z);var on=[`kick`,`snare`,`hat`],Q=class extends I{constructor(...e){super(...e),this.devices=[],this.activeBank=``,this.usedBanks=[],this.sessionPhase=`idle`,this.selectedClass=null,this.viewBar=0,this.pattern={steps:[],totalSteps:16},this.isRecording=!1,this.sensMin=0,this.sensMax=1,this.sensitivity=0,this.onDeviceChange=e=>{let t=e.target.value;this.dispatchEvent(new CustomEvent(`device-change`,{detail:t,bubbles:!0,composed:!0}))},this.onSens=e=>{this.dispatchEvent(new CustomEvent(`sensitivity-change`,{detail:e.detail,bubbles:!0,composed:!0}))}}goToBar(e){this.dispatchEvent(new CustomEvent(`bar-change`,{detail:e,bubbles:!0,composed:!0}))}render(){let e=this.sessionPhase===`reviewing`,t=e&&this.selectedClass!==null,n=Math.max(1,Math.ceil(this.pattern.totalSteps/16)),r=t?new Set(this.pattern.steps.filter(e=>e.class===this.selectedClass&&Math.floor(e.step/16)===this.viewBar).map(e=>e.step%16)):null,i=e=>this.pattern.steps.filter(t=>t.class===e).length,a=this.isRecording?`RECORDING`:e?`REVIEW`:`LIVE INPUT`,o=this.deviceConfig.banks?` · BANK ${this.activeBank}`:``;return A`
      <div class="fig">Fig. 03 — Device Atlas<span class="line"></span></div>

      <device-atlas
        .selectedClass=${this.selectedClass}
        .stepHighlights=${r}
        .reviewing=${e}
      ></device-atlas>

      <div class="data">
        <div><b>TARGET</b> : ${this.deviceConfig.name}${o}</div>
        <div><b>ASSIGN</b> : ${on.map(e=>`${U[e].label}·${i(e)}`).join(` `)}</div>
        <div><b>PADS</b>&nbsp;&nbsp; : 1–16 PERFORMANCE · COL 5 UTIL</div>
        <div><b>STATUS</b> : ${a}</div>
      </div>

      ${e?A`
            <p class="hint">
              ${t?`Bar ${this.viewBar+1}/${n}. Lit pads are ${U[this.selectedClass].label} steps — press these on the device. Tap to fix.`:`Tap a sound in column 5, then tap pads to place its steps.`}
            </p>
            ${t&&n>1?A`
                  <div class="pager">
                    <button ?disabled=${this.viewBar===0} @click=${()=>this.goToBar(this.viewBar-1)}>‹ prev bar</button>
                    <span>bar ${this.viewBar+1} / ${n}</span>
                    <button ?disabled=${this.viewBar===n-1} @click=${()=>this.goToBar(this.viewBar+1)}>next bar ›</button>
                  </div>
                `:N}
          `:N}

      <hr class="rule" />

      <div class="controls">
        ${this.deviceConfig.banks?A`
              <div class="ctl set">
                <span class="ctl-lbl">Set</span>
                <bank-selector .banks=${this.deviceConfig.banks} .active=${this.activeBank} .used=${this.usedBanks}></bank-selector>
              </div>
            `:N}
        <div class="dials">
          <knob-control label="Sens" .min=${this.sensMin} .max=${this.sensMax} .value=${this.sensitivity} @value-change=${this.onSens}></knob-control>
        </div>
      </div>

      <label class="device-pick">
        <span class="ctl-lbl">Device</span>
        <select @change=${this.onDeviceChange} ?disabled=${this.isRecording}>
          ${this.devices.map(e=>A`<option value=${e.id} ?selected=${e.id===this.deviceConfig.id}>${e.name}</option>`)}
        </select>
      </label>
    `}static{this.styles=h`
    :host {
      display: block;
      min-width: 0;
    }

    .fig {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      font-family: var(--grot);
      font-weight: var(--w-bold);
      font-size: var(--text-fig);
      letter-spacing: var(--track-wider);
      text-transform: uppercase;
      color: var(--ink);
      margin-bottom: var(--space-6);
    }
    .fig .line {
      flex: 1;
      height: 1px;
      background: var(--hair);
    }

    device-atlas {
      margin-bottom: var(--space-6);
    }

    .data {
      font-family: var(--mono);
      font-size: var(--text-md);
      line-height: 2;
      letter-spacing: var(--track-normal);
      color: var(--ink);
    }
    .data b {
      color: var(--ink-soft);
      font-weight: var(--w-bold);
    }

    .hint {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-lg);
      color: var(--ink-soft);
      margin: var(--space-4) 0 0;
      line-height: 1.5;
    }

    .pager {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2);
      margin-top: var(--space-3);
      font-family: var(--mono);
      font-size: var(--text-sm);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink);
    }
    .pager button {
      border: 1px solid var(--ink);
      background: var(--paper);
      color: var(--ink);
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      padding: var(--space-1-5) var(--space-2);
      cursor: pointer;
    }
    .pager button:disabled {
      opacity: 0.3;
      cursor: default;
    }

    .rule {
      border: 0;
      border-top: 1px solid var(--hair);
      margin: var(--space-6) 0 var(--space-5);
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-6);
    }
    .ctl {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    .ctl.set {
      flex: 1;
      min-width: 180px;
    }
    .ctl.set bank-selector {
      flex: 1;
    }
    .ctl-lbl {
      font-family: var(--mono);
      font-size: var(--text-xs);
      letter-spacing: var(--track-wider);
      text-transform: uppercase;
      color: var(--ink-soft);
    }
    .dials {
      display: flex;
      gap: var(--space-5);
    }

    .device-pick {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-top: var(--space-5);
    }
    select {
      flex: 1;
      font-family: var(--mono);
      font-size: var(--text-base);
      color: var(--ink);
      background: var(--paper);
      border: 1px solid var(--ink);
      border-radius: 0;
      padding: var(--space-2) var(--space-7) var(--space-2) var(--space-3);
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23201e19' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right var(--space-3) center;
    }
    select:disabled {
      opacity: 0.5;
      cursor: default;
    }
  `}};V([R({attribute:!1})],Q.prototype,`deviceConfig`,void 0),V([R({attribute:!1})],Q.prototype,`devices`,void 0),V([R({type:String})],Q.prototype,`activeBank`,void 0),V([R({attribute:!1})],Q.prototype,`usedBanks`,void 0),V([R({attribute:!1})],Q.prototype,`sessionPhase`,void 0),V([R({attribute:!1})],Q.prototype,`selectedClass`,void 0),V([R({type:Number})],Q.prototype,`viewBar`,void 0),V([R({attribute:!1})],Q.prototype,`pattern`,void 0),V([R({type:Boolean})],Q.prototype,`isRecording`,void 0),V([R({type:Number})],Q.prototype,`sensMin`,void 0),V([R({type:Number})],Q.prototype,`sensMax`,void 0),V([R({type:Number})],Q.prototype,`sensitivity`,void 0),Q=V([L(`hardware-panel`)],Q);var sn=[Et,Ot,At],cn=1.1,ln=3,un=()=>({recordedHits:[],bpm:100,pattern:{steps:[],totalSteps:16},selectedClass:null,viewBar:0,sessionPhase:`idle`}),$=class extends I{constructor(...e){super(...e),this.engine=new at,this.deviceConfig=sn[0],this.errorMessage=null,this.infoMessage=null,this.isAnalyzingFile=!1,this.activeBank=this.deviceConfig.banks?.[0]??``,this.level=0,this.levelThreshold=nt*et.onsetRatio,this.sensitivity=4.1-et.onsetRatio,this.headphonesOn=!1,this.targetBpm=100,this.sessionPhase=`idle`,this.recordedHits=[],this.bpm=100,this.pattern={steps:[],totalSteps:16},this.selectedClass=null,this.viewBar=0,this.hasTakeAudio=!1,this.bankStore={},this.recordingStartedAt=0,this.pendingHits=[],this.lastTakeAudio=null,this.lastTakeDiagnostics=[],this.onEngineStateChange=e=>{e.detail===B.IDLE&&(this.level=0)},this.onEngineError=e=>{this.errorMessage=e.detail.message,this.sessionPhase=`idle`},this.onLevel=e=>{this.level=e.detail.level,this.levelThreshold=e.detail.threshold},this.onTransient=e=>{let t=this.engine.getSampleRate();if(!t||this.sessionPhase!==`recording`)return;let n=ht(e.detail,t,this.engine.getFftSize());this.pendingHits=[...this.pendingHits,{features:n,timeMs:performance.now()-this.recordingStartedAt}]},this.onBankChange=e=>{let t=e.detail;t!==this.activeBank&&(this.sessionPhase===`recording`&&(this.engine.stop(),this.finishRecording()),this.saveActiveBank(),this.activeBank=t,this.loadBank(t),this.lastTakeAudio=null,this.lastTakeDiagnostics=[],this.hasTakeAudio=!1)},this.onDeviceChange=e=>{let t=sn.find(t=>t.id===e);t&&(this.sessionPhase===`recording`&&this.engine.stop(),this.deviceConfig=t,this.bankStore={},this.activeBank=t.banks?.[0]??``,this.recordedHits=[],this.pattern={steps:[],totalSteps:16},this.selectedClass=null,this.viewBar=0,this.sessionPhase=`idle`,this.lastTakeAudio=null,this.lastTakeDiagnostics=[],this.hasTakeAudio=!1)},this.onPadStepToggle=e=>{let t=this.selectedClass;if(!t||this.sessionPhase!==`reviewing`)return;let n=this.deviceConfig.controls.findIndex(t=>t.id===e.detail);if(n<0||n>=16)return;let r=this.viewBar*16+n;if(r>=this.pattern.totalSteps)return;let i=this.pattern.steps.some(e=>e.class===t&&e.step===r),a=Ct(this.deviceConfig,this.deviceConfig.classMapping[t])[0]?.label??``,o=i?this.pattern.steps.filter(e=>!(e.class===t&&e.step===r)):[...this.pattern.steps,{step:r,class:t,controlLabel:a}];this.pattern={...this.pattern,steps:o}},this.onSensitivityChange=e=>{this.sensitivity=e.detail,this.engine.updateConfig({onsetRatio:4.1-this.sensitivity})},this.onHeadphonesToggle=e=>{this.headphonesOn=e.detail}}connectedCallback(){super.connectedCallback(),this.engine.addEventListener(`state-change`,this.onEngineStateChange),this.engine.addEventListener(`transient-detected`,this.onTransient),this.engine.addEventListener(`error`,this.onEngineError),this.engine.addEventListener(`level`,this.onLevel)}disconnectedCallback(){super.disconnectedCallback(),this.engine.removeEventListener(`state-change`,this.onEngineStateChange),this.engine.removeEventListener(`transient-detected`,this.onTransient),this.engine.removeEventListener(`error`,this.onEngineError),this.engine.removeEventListener(`level`,this.onLevel),this.engine.stop()}async handleRecordButton(){if(this.errorMessage=null,this.infoMessage=null,this.sessionPhase===`recording`){this.engine.stop(),this.lastTakeAudio=await this.engine.getRecordingBlob(),this.hasTakeAudio=this.lastTakeAudio!==null,this.finishRecording();return}this.recordedHits=[],this.pendingHits=[],this.pattern={steps:[],totalSteps:16},this.selectedClass=null,this.viewBar=0,this.lastTakeAudio=null,this.lastTakeDiagnostics=[],this.hasTakeAudio=!1,this.sessionPhase=`recording`,this.recordingStartedAt=performance.now(),await this.engine.start(this.targetBpm,this.headphonesOn)}async handleFileUpload(e){this.sessionPhase===`recording`&&this.engine.stop(),this.errorMessage=null,this.infoMessage=null,this.recordedHits=[],this.pendingHits=[],this.pattern={steps:[],totalSteps:16},this.selectedClass=null,this.viewBar=0,this.sessionPhase=`idle`,this.isAnalyzingFile=!0,this.lastTakeAudio=e,this.lastTakeDiagnostics=[],this.hasTakeAudio=!0;try{let{hits:t,sampleRate:n}=await lt(e,this.engine.getConfig());this.pendingHits=t.map(e=>({features:ht(e.frames,n,this.engine.getFftSize()),timeMs:e.timeMs})),this.finishRecording()}catch(e){this.errorMessage=e instanceof Error?e.message:`Couldn't read that file.`}finally{this.isAnalyzingFile=!1}}finishRecording(){if(this.pendingHits.length===0){this.sessionPhase=`idle`,this.infoMessage=`No hits detected — raise SENS (or beatbox louder/closer to the mic) and record again.`;return}let e=bt(this.pendingHits.map(e=>e.features));this.recordedHits=this.pendingHits.reduce((t,{timeMs:n},r)=>{let i=e[r],[a]=Ct(this.deviceConfig,this.deviceConfig.classMapping[i.class]);return a&&t.push({class:i.class,controlId:a.id,controlLabel:a.label,confidence:i.confidence,timeMs:n}),t},[]),this.lastTakeDiagnostics=this.pendingHits.map(({features:t,timeMs:n},r)=>({timeMs:n,class:e[r].class,confidence:e[r].confidence,brightness:t.brightness,lowBandEnergy:t.lowBandEnergy,midBandEnergy:t.midBandEnergy,highBandEnergy:t.highBandEnergy,flatness:t.flatness})),this.bpm=this.targetBpm,this.pattern=xt(this.recordedHits,this.bpm),this.viewBar=0,this.sessionPhase=`reviewing`}triggerDownload(e,t){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,r.click(),URL.revokeObjectURL(n)}downloadAudio(){if(!this.lastTakeAudio)return;let e=this.lastTakeAudio instanceof File,t=e?``:(this.lastTakeAudio.type.split(`/`)[1]??`webm`).split(`;`)[0],n=e?this.lastTakeAudio.name:`beat-mapper-take.${t}`;this.triggerDownload(this.lastTakeAudio,n)}downloadDiagnostics(){if(this.lastTakeDiagnostics.length===0)return;let e={bpm:this.bpm,device:this.deviceConfig.id,hits:this.lastTakeDiagnostics},t=new Blob([JSON.stringify(e,null,2)],{type:`application/json`});this.triggerDownload(t,`beat-mapper-diagnostics.json`)}adjustBpm(e){this.bpm=Math.min(180,Math.max(60,this.bpm+e)),this.pattern=xt(this.recordedHits,this.bpm),this.setViewBar(this.viewBar)}adjustTargetBpm(e){this.targetBpm=Math.min(180,Math.max(60,this.targetBpm+e))}saveActiveBank(){this.activeBank&&(this.bankStore={...this.bankStore,[this.activeBank]:{recordedHits:this.recordedHits,bpm:this.bpm,pattern:this.pattern,selectedClass:this.selectedClass,viewBar:this.viewBar,sessionPhase:this.sessionPhase===`recording`?`reviewing`:this.sessionPhase}})}loadBank(e){let t=this.bankStore[e]??un();this.recordedHits=t.recordedHits,this.bpm=t.bpm,this.pattern=t.pattern,this.selectedClass=t.selectedClass,this.viewBar=t.viewBar,this.sessionPhase=t.sessionPhase,this.errorMessage=null,this.infoMessage=null}get usedBanks(){let e=Object.entries(this.bankStore).filter(([,e])=>e.recordedHits.length>0).map(([e])=>e);return this.recordedHits.length>0&&!e.includes(this.activeBank)&&e.push(this.activeBank),e}toggleSelectedClass(e){this.selectedClass=this.selectedClass===e?null:e}setViewBar(e){let t=Math.max(1,Math.ceil(this.pattern.totalSteps/16));this.viewBar=Math.min(t-1,Math.max(0,e))}render(){let e=this.sessionPhase===`recording`;return A`
      <div class="sheet">
        <span class="crop tl"></span><span class="crop tr"></span>
        <span class="crop bl"></span><span class="crop br"></span>

        <app-header .status=${e?`recording`:this.sessionPhase===`reviewing`?`review`:`standby`}></app-header>

        <div class="spread">
          <div class="leaf leaf-left">
            <recording-panel
              .sessionPhase=${this.sessionPhase}
              .level=${this.level}
              .levelThreshold=${this.levelThreshold}
              .errorMessage=${this.errorMessage}
              .infoMessage=${this.infoMessage}
              .recordedHits=${this.recordedHits}
              .bpm=${this.bpm}
              .targetBpm=${this.targetBpm}
              .pattern=${this.pattern}
              .selectedClass=${this.selectedClass}
              .headphonesOn=${this.headphonesOn}
              .isAnalyzingFile=${this.isAnalyzingFile}
              .hasTakeAudio=${this.hasTakeAudio}
              @record-toggle=${()=>this.handleRecordButton()}
              @bpm-adjust=${e=>this.adjustBpm(e.detail)}
              @target-bpm-adjust=${e=>this.adjustTargetBpm(e.detail)}
              @lane-select=${e=>this.toggleSelectedClass(e.detail)}
              @headphones-toggle=${this.onHeadphonesToggle}
              @file-upload=${e=>this.handleFileUpload(e.detail)}
              @download-audio=${()=>this.downloadAudio()}
              @download-diagnostics=${()=>this.downloadDiagnostics()}
            ></recording-panel>
          </div>

          <div class="leaf leaf-right">
            <hardware-panel
              .deviceConfig=${this.deviceConfig}
              .devices=${sn}
              .activeBank=${this.activeBank}
              .usedBanks=${this.usedBanks}
              .sessionPhase=${this.sessionPhase}
              .selectedClass=${this.selectedClass}
              .viewBar=${this.viewBar}
              .pattern=${this.pattern}
              .isRecording=${e}
              .sensMin=${cn}
              .sensMax=${ln}
              .sensitivity=${this.sensitivity}
              @bank-change=${this.onBankChange}
              @class-toggle=${e=>this.toggleSelectedClass(e.detail)}
              @bar-change=${e=>this.setViewBar(e.detail)}
              @pad-toggle=${this.onPadStepToggle}
              @device-change=${e=>this.onDeviceChange(e.detail)}
              @sensitivity-change=${this.onSensitivityChange}
            ></hardware-panel>
          </div>
        </div>

        <app-footer></app-footer>
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
      padding: var(--space-8) 0;
    }

    .sheet {
      position: relative;
      max-width: 1080px;
      margin: 0 auto;
      background: var(--paper);
      padding: var(--space-9) var(--space-10) var(--space-10);
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.06), 0 30px 70px -30px rgba(0, 0, 0, 0.35);
    }
    /* paper grain */
    .sheet::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.32;
      mix-blend-mode: multiply;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
    }

    .crop {
      position: absolute;
      width: 15px;
      height: 15px;
      z-index: 1;
    }
    .crop::before,
    .crop::after {
      content: '';
      position: absolute;
      background: var(--ink);
    }
    .crop::before {
      width: 15px;
      height: 1px;
    }
    .crop::after {
      width: 1px;
      height: 15px;
    }
    .crop.tl {
      top: 18px;
      left: 22px;
    }
    .crop.tr {
      top: 18px;
      right: 22px;
    }
    .crop.tr::before,
    .crop.tr::after {
      right: 0;
    }
    .crop.bl {
      bottom: 18px;
      left: 22px;
    }
    .crop.bl::before,
    .crop.bl::after {
      bottom: 0;
    }
    .crop.br {
      bottom: 18px;
      right: 22px;
    }
    .crop.br::before,
    .crop.br::after {
      bottom: 0;
      right: 0;
    }

    .spread {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: var(--space-7);
    }
    .leaf {
      min-width: 0;
      padding: var(--space-7) 0;
    }
    .leaf-left {
      padding-right: var(--space-8);
      border-right: 1px solid var(--hair);
    }
    .leaf-right {
      padding-left: var(--space-8);
    }

    /* tablet + mobile: manual collapses to a single column */
    @media (max-width: 820px) {
      .sheet {
        padding: var(--space-8) var(--space-7) var(--space-8);
      }
      .spread {
        grid-template-columns: 1fr;
      }
      .leaf-left {
        padding-right: 0;
        border-right: 0;
        border-bottom: 1px solid var(--hair);
      }
      .leaf-right {
        padding-left: 0;
      }
    }

    @media (max-width: 560px) {
      :host {
        padding: 0;
      }
      .sheet {
        max-width: none;
        min-height: 100svh;
        padding: var(--space-7) var(--space-5) var(--space-8);
        box-shadow: none;
      }
      .crop {
        display: none;
      }
    }
  `}};V([Ye({context:Mt})],$.prototype,`engine`,void 0),V([Ye({context:jt}),z()],$.prototype,`deviceConfig`,void 0),V([z()],$.prototype,`errorMessage`,void 0),V([z()],$.prototype,`infoMessage`,void 0),V([z()],$.prototype,`isAnalyzingFile`,void 0),V([z()],$.prototype,`activeBank`,void 0),V([z()],$.prototype,`level`,void 0),V([z()],$.prototype,`levelThreshold`,void 0),V([z()],$.prototype,`sensitivity`,void 0),V([z()],$.prototype,`headphonesOn`,void 0),V([z()],$.prototype,`targetBpm`,void 0),V([z()],$.prototype,`sessionPhase`,void 0),V([z()],$.prototype,`recordedHits`,void 0),V([z()],$.prototype,`bpm`,void 0),V([z()],$.prototype,`pattern`,void 0),V([z()],$.prototype,`selectedClass`,void 0),V([z()],$.prototype,`viewBar`,void 0),V([z()],$.prototype,`hasTakeAudio`,void 0),V([z()],$.prototype,`bankStore`,void 0),$=V([L(`app-root`)],$);