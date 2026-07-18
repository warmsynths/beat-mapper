var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=globalThis,u=l.ShadowRoot&&(l.ShadyCSS===void 0||l.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,d=Symbol(),f=new WeakMap,p=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==d)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(u&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=f.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&f.set(t,e))}return e}toString(){return this.cssText}},m=e=>new p(typeof e==`string`?e:e+``,void 0,d),h=(e,...t)=>new p(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,d),g=(e,t)=>{if(u)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=l.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},_=u?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return m(t)})(e):e,{is:ee,defineProperty:v,getOwnPropertyDescriptor:te,getOwnPropertyNames:y,getOwnPropertySymbols:ne,getPrototypeOf:re}=Object,b=globalThis,ie=b.trustedTypes,ae=ie?ie.emptyScript:``,oe=b.reactiveElementPolyfillSupport,S=(e,t)=>e,se={toAttribute(e,t){switch(t){case Boolean:e=e?ae:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ce=(e,t)=>!ee(e,t),le={attribute:!0,type:String,converter:se,reflect:!1,useDefault:!1,hasChanged:ce};Symbol.metadata??=Symbol(`metadata`),b.litPropertyMetadata??=new WeakMap;var C=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=le){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&v(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=te(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??le}static _$Ei(){if(this.hasOwnProperty(S(`elementProperties`)))return;let e=re(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(S(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S(`properties`))){let e=this.properties,t=[...y(e),...ne(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(_(e))}else e!==void 0&&t.push(_(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return g(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?se:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?se:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??ce)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};C.elementStyles=[],C.shadowRootOptions={mode:`open`},C[S(`elementProperties`)]=new Map,C[S(`finalized`)]=new Map,oe?.({ReactiveElement:C}),(b.reactiveElementVersions??=[]).push(`2.1.2`);var ue=globalThis,de=e=>e,fe=ue.trustedTypes,pe=fe?fe.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,me=`$lit$`,w=`lit$${Math.random().toFixed(9).slice(2)}$`,he=`?`+w,ge=`<${he}>`,T=document,E=()=>T.createComment(``),D=e=>e===null||typeof e!=`object`&&typeof e!=`function`,_e=Array.isArray,ve=e=>_e(e)||typeof e?.[Symbol.iterator]==`function`,ye=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,be=/-->/g,xe=/>/g,k=RegExp(`>|${ye}(?:([^\\s"'>=/]+)(${ye}*=${ye}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Se=/'/g,Ce=/"/g,we=/^(?:script|style|textarea|title)$/i,A=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),j=Symbol.for(`lit-noChange`),M=Symbol.for(`lit-nothing`),Te=new WeakMap,N=T.createTreeWalker(T,129);function Ee(e,t){if(!_e(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return pe===void 0?t:pe.createHTML(t)}var De=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=O;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===O?c[1]===`!--`?o=be:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=k):(we.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=k):o=xe:o===k?c[0]===`>`?(o=i??O,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?k:c[3]===`"`?Ce:Se):o===Ce||o===Se?o=k:o===be||o===xe?o=O:(o=k,i=void 0);let d=o===k&&e[t+1].startsWith(`/>`)?` `:``;a+=o===O?n+ge:l>=0?(r.push(s),n.slice(0,l)+me+n.slice(l)+w+d):n+w+(l===-2?t:d)}return[Ee(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Oe=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=De(t,n);if(this.el=e.createElement(l,r),N.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=N.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(me)){let t=u[o++],n=i.getAttribute(e).split(w),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?je:r[1]===`?`?Me:r[1]===`@`?Ne:F}),i.removeAttribute(e)}else e.startsWith(w)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(we.test(i.tagName)){let e=i.textContent.split(w),t=e.length-1;if(t>0){i.textContent=fe?fe.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],E()),N.nextNode(),c.push({type:2,index:++a});i.append(e[t],E())}}}else if(i.nodeType===8)if(i.data===he)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(w,e+1))!==-1;)c.push({type:7,index:a}),e+=w.length-1}a++}}static createElement(e,t){let n=T.createElement(`template`);return n.innerHTML=e,n}};function P(e,t,n=e,r){if(t===j)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=D(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=P(e,i._$AS(e,t.values),i,r)),t}var ke=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??T).importNode(t,!0);N.currentNode=r;let i=N.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Ae(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Pe(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=N.nextNode(),a++)}return N.currentNode=T,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Ae=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),D(e)?e===M||e==null||e===``?(this._$AH!==M&&this._$AR(),this._$AH=M):e!==this._$AH&&e!==j&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ve(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==M&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Oe.createElement(Ee(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new ke(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Te.get(e.strings);return t===void 0&&Te.set(e.strings,t=new Oe(e)),t}k(t){_e(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(E()),this.O(E()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=de(e).nextSibling;de(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},F=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=M,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=M}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=P(this,e,t,0),a=!D(e)||e!==this._$AH&&e!==j,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=P(this,r[n+o],t,o),s===j&&(s=this._$AH[o]),a||=!D(s)||s!==this._$AH[o],s===M?e=M:e!==M&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},je=class extends F{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===M?void 0:e}},Me=class extends F{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==M)}},Ne=class extends F{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??M)===j)return;let n=this._$AH,r=e===M&&n!==M||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==M&&(n===M||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Pe=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}},Fe=ue.litHtmlPolyfillSupport;Fe?.(Oe,Ae),(ue.litHtmlVersions??=[]).push(`3.3.3`);var Ie=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Ae(t.insertBefore(E(),e),e,void 0,n??{})}return i._$AI(e),i},Le=globalThis,I=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ie(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};I._$litElement$=!0,I.finalized=!0,Le.litElementHydrateSupport?.({LitElement:I});var Re=Le.litElementPolyfillSupport;Re?.({LitElement:I}),(Le.litElementVersions??=[]).push(`4.2.2`);var L=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},ze={attribute:!0,type:String,converter:se,reflect:!1,hasChanged:ce},Be=(e=ze,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function R(e){return(t,n)=>typeof n==`object`?Be(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function z(e){return R({...e,state:!0,attribute:!1})}var Ve=class extends Event{constructor(e,t,n,r){super(`context-request`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=n,this.subscribe=r??!1}};function He(e){return e}var Ue=class{constructor(e,t,n,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,t.context!==void 0){let e=t;this.context=e.context,this.callback=e.callback,this.subscribe=e.subscribe??!1}else this.context=t,this.callback=n,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&=(this.unsubscribe(),void 0)}dispatchRequest(){this.host.dispatchEvent(new Ve(this.context,this.host,this.t,this.subscribe))}},We=class{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let n=t||!Object.is(e,this.o);this.o=e,n&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},e!==void 0&&(this.value=e)}addCallback(e,t,n){if(!n)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}},Ge=class extends Event{constructor(e,t){super(`context-provider`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}},Ke=class extends We{constructor(e,t,n){super(t.context===void 0?n:t.initialValue),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:n}]of this.subscriptions)t.has(e)||(t.add(e),n.dispatchEvent(new Ve(this.context,n,e,!0)));e.stopPropagation()},this.host=e,t.context===void 0?this.context=t:this.context=t.context,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener(`context-request`,this.onContextRequest),this.host.addEventListener(`context-provider`,this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new Ge(this.context,this.host))}};function qe({context:e}){return(t,n)=>{let r=new WeakMap;if(typeof n==`object`)return{get(){return t.get.call(this)},set(e){return r.get(this).setValue(e),t.set.call(this,e)},init(t){return r.set(this,new Ke(this,{context:e,initialValue:t})),t}};{t.constructor.addInitializer((t=>{r.set(t,new Ke(t,{context:e}))}));let i=Object.getOwnPropertyDescriptor(t,n),a;if(i===void 0){let e=new WeakMap;a={get(){return e.get(this)},set(t){r.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=i.set;a={...i,set(t){r.get(this).setValue(t),e?.call(this,t)}}}Object.defineProperty(t,n,a);return}}}function Je({context:e,subscribe:t}){return(n,r)=>{typeof r==`object`?r.addInitializer((function(){new Ue(this,{context:e,callback:e=>{n.set.call(this,e)},subscribe:t})})):n.constructor.addInitializer((n=>{new Ue(n,{context:e,callback:e=>{n[r]=e},subscribe:t})}))}}var Ye=c(o(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?t.exports=r():typeof define==`function`&&define.amd?define(r):(n=typeof globalThis<`u`?globalThis:n||self).Meyda=r()})(e,(function(){function e(e,t,n){if(n||arguments.length===2)for(var r,i=0,a=t.length;i<a;i++)!r&&i in t||(r||=Array.prototype.slice.call(t,0,i),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}var t=Object.freeze({__proto__:null,blackman:function(e){for(var t=new Float32Array(e),n=2*Math.PI/(e-1),r=2*n,i=0;i<e/2;i++)t[i]=.42-.5*Math.cos(i*n)+.08*Math.cos(i*r);for(i=Math.ceil(e/2);i>0;i--)t[e-i]=t[i-1];return t},hamming:function(e){for(var t=new Float32Array(e),n=0;n<e;n++)t[n]=.54-.46*Math.cos(2*Math.PI*(n/e-1));return t},hanning:function(e){for(var t=new Float32Array(e),n=0;n<e;n++)t[n]=.5-.5*Math.cos(2*Math.PI*n/(e-1));return t},sine:function(e){for(var t=Math.PI/(e-1),n=new Float32Array(e),r=0;r<e;r++)n[r]=Math.sin(t*r);return n}}),n={};function r(e){for(;e%2==0&&e>1;)e/=2;return e===1}function i(e,r){if(r!==`rect`){if(r!==``&&r||(r=`hanning`),n[r]||(n[r]={}),!n[r][e.length])try{n[r][e.length]=t[r](e.length)}catch{throw Error(`Invalid windowing function`)}e=function(e,t){for(var n=[],r=0;r<Math.min(e.length,t.length);r++)n[r]=e[r]*t[r];return n}(e,n[r][e.length])}return e}function a(e,t,n){for(var r=new Float32Array(e),i=0;i<r.length;i++)r[i]=i*t/n,r[i]=13*Math.atan(r[i]/1315.8)+3.5*Math.atan((r[i]/7518)**2);return r}function o(e){return Float32Array.from(e)}function s(e){return 1125*Math.log(1+e/700)}function c(e,t,n){for(var r,i=new Float32Array(e+2),a=new Float32Array(e+2),o=t/2,c=s(0),l=(s(o)-c)/(e+1),u=Array(e+2),d=0;d<i.length;d++)i[d]=d*l,a[d]=(r=i[d],700*(Math.exp(r/1125)-1)),u[d]=Math.floor((n+1)*a[d]/t);for(var f=Array(e),p=0;p<f.length;p++){for(f[p]=Array(n/2+1).fill(0),d=u[p];d<u[p+1];d++)f[p][d]=(d-u[p])/(u[p+1]-u[p]);for(d=u[p+1];d<u[p+2];d++)f[p][d]=(u[p+2]-d)/(u[p+2]-u[p+1])}return f}function l(t,n,r,i,a,o,s){i===void 0&&(i=5),a===void 0&&(a=2),o===void 0&&(o=!0),s===void 0&&(s=440);var c=Math.floor(r/2)+1,l=Array(r).fill(0).map((function(e,i){return t*function(e,t){return Math.log2(16*e/t)}(n*i/r,s)}));l[0]=l[1]-1.5*t;var u,d,f,p=l.slice(1).map((function(e,t){return Math.max(e-l[t])}),1).concat([1]),m=Math.round(t/2),h=Array(t).fill(0).map((function(e,n){return l.map((function(e){return(10*t+m+e-n)%t-m}))})),g=h.map((function(e,t){return e.map((function(e,n){return Math.exp(-.5*(2*h[t][n]/p[n])**2)}))}));if(d=(u=g)[0].map((function(){return 0})),f=u.reduce((function(e,t){return t.forEach((function(t,n){e[n]+=t**2})),e}),d).map(Math.sqrt),g=u.map((function(e,t){return e.map((function(e,t){return e/(f[t]||1)}))})),a){var _=l.map((function(e){return Math.exp(-.5*((e/t-i)/a)**2)}));g=g.map((function(e){return e.map((function(e,t){return e*_[t]}))}))}return o&&(g=e(e([],g.slice(3),!0),g.slice(0,3),!0)),g.map((function(e){return e.slice(0,c)}))}function u(e,t){for(var n=0,r=0,i=0;i<t.length;i++)n+=i**+e*Math.abs(t[i]),r+=t[i];return n/r}function d(e){var t=e.ampSpectrum,n=e.barkScale,r=e.numberOfBarkBands,i=r===void 0?24:r;if(typeof t!=`object`||typeof n!=`object`)throw TypeError();var a=i,o=new Float32Array(a),s=0,c=t,l=new Int32Array(a+1);l[0]=0;for(var u=n[c.length-1]/a,d=1,f=0;f<c.length;f++)for(;n[f]>u;)l[d++]=f,u=d*n[c.length-1]/a;for(l[a]=c.length-1,f=0;f<a;f++){for(var p=0,m=l[f];m<l[f+1];m++)p+=c[m];o[f]=p**.23}for(f=0;f<o.length;f++)s+=o[f];return{specific:o,total:s}}function f(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();for(var n=new Float32Array(t.length),r=0;r<n.length;r++)n[r]=t[r]**2;return n}function p(e){var t=e.ampSpectrum,n=e.melFilterBank,r=e.bufferSize;if(typeof t!=`object`)throw TypeError(`Valid ampSpectrum is required to generate melBands`);if(typeof n!=`object`)throw TypeError(`Valid melFilterBank is required to generate melBands`);for(var i=f({ampSpectrum:t}),a=n.length,o=Array(a),s=new Float32Array(a),c=0;c<s.length;c++){o[c]=new Float32Array(r/2),s[c]=0;for(var l=0;l<r/2;l++)o[c][l]=n[c][l]*i[l],s[c]+=o[c][l];s[c]=Math.log(s[c]+1)}return Array.prototype.slice.call(s)}function m(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,`default`)?e.default:e}var h=null,g=m((function(e,t){var n=e.length;return t||=2,h&&h[n]||function(e){(h||={})[e]=Array(e*e);for(var t=Math.PI/e,n=0;n<e;n++)for(var r=0;r<e;r++)h[e][r+n*e]=Math.cos(t*(r+.5)*n)}(n),e.map((function(){return 0})).map((function(r,i){return t*e.reduce((function(e,t,r,a){return e+t*h[n][r+i*n]}),0)}))})),_=Object.freeze({__proto__:null,amplitudeSpectrum:function(e){return e.ampSpectrum},buffer:function(e){return e.signal},chroma:function(e){var t=e.ampSpectrum,n=e.chromaFilterBank;if(typeof t!=`object`)throw TypeError(`Valid ampSpectrum is required to generate chroma`);if(typeof n!=`object`)throw TypeError(`Valid chromaFilterBank is required to generate chroma`);var r=n.map((function(e,n){return t.reduce((function(t,n,r){return t+n*e[r]}),0)})),i=Math.max.apply(Math,r);return i?r.map((function(e){return e/i})):r},complexSpectrum:function(e){return e.complexSpectrum},energy:function(e){var t=e.signal;if(typeof t!=`object`)throw TypeError();for(var n=0,r=0;r<t.length;r++)n+=Math.abs(t[r])**2;return n},loudness:d,melBands:p,mfcc:function(e){var t=e.ampSpectrum,n=e.melFilterBank,r=e.numberOfMFCCCoefficients,i=e.bufferSize,a=Math.min(40,Math.max(1,r||13));if(n.length<a)throw Error(`Insufficient filter bank for requested number of coefficients`);return g(p({ampSpectrum:t,melFilterBank:n,bufferSize:i})).slice(0,a)},perceptualSharpness:function(e){for(var t=d({ampSpectrum:e.ampSpectrum,barkScale:e.barkScale}),n=t.specific,r=0,i=0;i<n.length;i++)r+=i<15?(i+1)*n[i+1]:.066*Math.exp(.171*(i+1));return r*=.11/t.total},perceptualSpread:function(e){for(var t=d({ampSpectrum:e.ampSpectrum,barkScale:e.barkScale}),n=0,r=0;r<t.specific.length;r++)t.specific[r]>n&&(n=t.specific[r]);return((t.total-n)/t.total)**2},powerSpectrum:f,rms:function(e){var t=e.signal;if(typeof t!=`object`)throw TypeError();for(var n=0,r=0;r<t.length;r++)n+=t[r]**2;return n/=t.length,n=Math.sqrt(n)},spectralCentroid:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();return u(1,t)},spectralCrest:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();var n=0,r=-1/0;return t.forEach((function(e){n+=e**2,r=e>r?e:r})),n/=t.length,n=Math.sqrt(n),r/n},spectralFlatness:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();for(var n=0,r=0,i=0;i<t.length;i++)n+=Math.log(t[i]),r+=t[i];return Math.exp(n/t.length)*t.length/r},spectralFlux:function(e){var t=e.signal,n=e.previousSignal,r=e.bufferSize;if(typeof t!=`object`||typeof n!=`object`)throw TypeError();for(var i=0,a=-r/2;a<t.length/2-1;a++)x=Math.abs(t[a])-Math.abs(n[a]),i+=(x+Math.abs(x))/2;return i},spectralKurtosis:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();var n=t,r=u(1,n),i=u(2,n),a=u(3,n),o=u(4,n);return(-3*r**4+6*r*i-4*r*a+o)/Math.sqrt(i-r**2)**4},spectralRolloff:function(e){var t=e.ampSpectrum,n=e.sampleRate;if(typeof t!=`object`)throw TypeError();for(var r=t,i=n/(2*(r.length-1)),a=0,o=0;o<r.length;o++)a+=r[o];for(var s=.99*a,c=r.length-1;a>s&&c>=0;)a-=r[c],--c;return(c+1)*i},spectralSkewness:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();var n=u(1,t),r=u(2,t),i=u(3,t);return(2*n**3-3*n*r+i)/Math.sqrt(r-n**2)**3},spectralSlope:function(e){var t=e.ampSpectrum,n=e.sampleRate,r=e.bufferSize;if(typeof t!=`object`)throw TypeError();for(var i=0,a=0,o=new Float32Array(t.length),s=0,c=0,l=0;l<t.length;l++){i+=t[l];var u=l*n/r;o[l]=u,s+=u*u,a+=u,c+=u*t[l]}return(t.length*c-a*i)/(i*(s-a**2))},spectralSpread:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();return Math.sqrt(u(2,t)-u(1,t)**2)},zcr:function(e){var t=e.signal;if(typeof t!=`object`)throw TypeError();for(var n=0,r=1;r<t.length;r++)(t[r-1]>=0&&t[r]<0||t[r-1]<0&&t[r]>=0)&&n++;return n}});function ee(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var v={},te={},y={bitReverseArray:function(e){if(v[e]===void 0){for(var t=(e-1).toString(2).length,n=`0`.repeat(t),r={},i=0;i<e;i++){var a=i.toString(2);a=n.substr(a.length)+a,a=[].concat(ee(a)).reverse().join(``),r[i]=parseInt(a,2)}v[e]=r}return v[e]},multiply:function(e,t){return{real:e.real*t.real-e.imag*t.imag,imag:e.real*t.imag+e.imag*t.real}},add:function(e,t){return{real:e.real+t.real,imag:e.imag+t.imag}},subtract:function(e,t){return{real:e.real-t.real,imag:e.imag-t.imag}},euler:function(e,t){var n=-2*Math.PI*e/t;return{real:Math.cos(n),imag:Math.sin(n)}},conj:function(e){return e.imag*=-1,e},constructComplexArray:function(e){var t={};t.real=e.real===void 0?e.slice():e.real.slice();var n=t.real.length;return te[n]===void 0&&(te[n]=Array.apply(null,Array(n)).map(Number.prototype.valueOf,0)),t.imag=te[n].slice(),t}},ne=function(e){var t={};e.real===void 0||e.imag===void 0?t=y.constructComplexArray(e):(t.real=e.real.slice(),t.imag=e.imag.slice());var n=t.real.length,r=Math.log2(n);if(Math.round(r)!=r)throw Error(`Input size must be a power of 2.`);if(t.real.length!=t.imag.length)throw Error(`Real and imaginary components must have the same length.`);for(var i=y.bitReverseArray(n),a={real:[],imag:[]},o=0;o<n;o++)a.real[i[o]]=t.real[o],a.imag[i[o]]=t.imag[o];for(var s=0;s<n;s++)t.real[s]=a.real[s],t.imag[s]=a.imag[s];for(var c=1;c<=r;c++)for(var l=2**c,u=0;u<l/2;u++)for(var d=y.euler(u,l),f=0;f<n/l;f++){var p=l*f+u,m=l*f+u+l/2,h={real:t.real[p],imag:t.imag[p]},g={real:t.real[m],imag:t.imag[m]},_=y.multiply(d,g),ee=y.subtract(h,_);t.real[m]=ee.real,t.imag[m]=ee.imag;var v=y.add(_,h);t.real[p]=v.real,t.imag[p]=v.imag}return t},re=function(){function e(e,t){var n=this;if(this._m=t,!e.audioContext)throw this._m.errors.noAC;if(e.bufferSize&&!r(e.bufferSize))throw this._m._errors.notPow2;if(!e.source)throw this._m._errors.noSource;this._m.audioContext=e.audioContext,this._m.bufferSize=e.bufferSize||this._m.bufferSize||256,this._m.hopSize=e.hopSize||this._m.hopSize||this._m.bufferSize,this._m.sampleRate=e.sampleRate||this._m.audioContext.sampleRate||44100,this._m.callback=e.callback,this._m.windowingFunction=e.windowingFunction||`hanning`,this._m.featureExtractors=_,this._m.EXTRACTION_STARTED=e.startImmediately||!1,this._m.channel=typeof e.channel==`number`?e.channel:0,this._m.inputs=e.inputs||1,this._m.outputs=e.outputs||1,this._m.numberOfMFCCCoefficients=e.numberOfMFCCCoefficients||this._m.numberOfMFCCCoefficients||13,this._m.numberOfBarkBands=e.numberOfBarkBands||this._m.numberOfBarkBands||24,this._m.spn=this._m.audioContext.createScriptProcessor(this._m.bufferSize,this._m.inputs,this._m.outputs),this._m.spn.connect(this._m.audioContext.destination),this._m._featuresToExtract=e.featureExtractors||[],this._m.barkScale=a(this._m.bufferSize,this._m.sampleRate,this._m.bufferSize),this._m.melFilterBank=c(Math.max(this._m.melBands,this._m.numberOfMFCCCoefficients),this._m.sampleRate,this._m.bufferSize),this._m.inputData=null,this._m.previousInputData=null,this._m.frame=null,this._m.previousFrame=null,this.setSource(e.source),this._m.spn.onaudioprocess=function(e){var t;n._m.inputData!==null&&(n._m.previousInputData=n._m.inputData),n._m.inputData=e.inputBuffer.getChannelData(n._m.channel),n._m.previousInputData?((t=new Float32Array(n._m.previousInputData.length+n._m.inputData.length-n._m.hopSize)).set(n._m.previousInputData.slice(n._m.hopSize)),t.set(n._m.inputData,n._m.previousInputData.length-n._m.hopSize)):t=n._m.inputData,(function(e,t,n){if(e.length<t)throw Error(`Buffer is too short for frame length`);if(n<1)throw Error(`Hop length cannot be less that 1`);if(t<1)throw Error(`Frame length cannot be less that 1`);var r=1+Math.floor((e.length-t)/n);return Array(r).fill(0).map((function(r,i){return e.slice(i*n,i*n+t)}))})(t,n._m.bufferSize,n._m.hopSize).forEach((function(e){n._m.frame=e;var t=n._m.extract(n._m._featuresToExtract,n._m.frame,n._m.previousFrame);typeof n._m.callback==`function`&&n._m.EXTRACTION_STARTED&&n._m.callback(t),n._m.previousFrame=n._m.frame}))}}return e.prototype.start=function(e){this._m._featuresToExtract=e||this._m._featuresToExtract,this._m.EXTRACTION_STARTED=!0},e.prototype.stop=function(){this._m.EXTRACTION_STARTED=!1},e.prototype.setSource=function(e){this._m.source&&this._m.source.disconnect(this._m.spn),this._m.source=e,this._m.source.connect(this._m.spn)},e.prototype.setChannel=function(e){e<=this._m.inputs?this._m.channel=e:console.error(`Channel ${e} does not exist. Make sure you've provided a value for 'inputs' that is greater than ${e} when instantiating the MeydaAnalyzer`)},e.prototype.get=function(e){return this._m.inputData?this._m.extract(e||this._m._featuresToExtract,this._m.inputData,this._m.previousInputData):null},e}(),b={audioContext:null,spn:null,bufferSize:512,sampleRate:44100,melBands:26,chromaBands:12,callback:null,windowingFunction:`hanning`,featureExtractors:_,EXTRACTION_STARTED:!1,numberOfMFCCCoefficients:13,numberOfBarkBands:24,_featuresToExtract:[],windowing:i,_errors:{notPow2:Error(`Meyda: Buffer size must be a power of 2, e.g. 64 or 512`),featureUndef:Error(`Meyda: No features defined.`),invalidFeatureFmt:Error(`Meyda: Invalid feature format`),invalidInput:Error(`Meyda: Invalid input.`),noAC:Error(`Meyda: No AudioContext specified.`),noSource:Error(`Meyda: No source node specified.`)},createMeydaAnalyzer:function(e){return new re(e,Object.assign({},b))},listAvailableFeatureExtractors:function(){return Object.keys(this.featureExtractors)},extract:function(e,t,n){var i=this;if(!t||typeof t!=`object`)throw this._errors.invalidInput;if(!e)throw this._errors.featureUndef;if(!r(t.length))throw this._errors.notPow2;this.barkScale!==void 0&&this.barkScale.length==this.bufferSize||(this.barkScale=a(this.bufferSize,this.sampleRate,this.bufferSize)),this.melFilterBank!==void 0&&this.barkScale.length==this.bufferSize&&this.melFilterBank.length==this.melBands||(this.melFilterBank=c(Math.max(this.melBands,this.numberOfMFCCCoefficients),this.sampleRate,this.bufferSize)),this.chromaFilterBank!==void 0&&this.chromaFilterBank.length==this.chromaBands||(this.chromaFilterBank=l(this.chromaBands,this.sampleRate,this.bufferSize)),`buffer`in t&&t.buffer===void 0?this.signal=o(t):this.signal=t;var s=ie(t,this.windowingFunction,this.bufferSize);if(this.signal=s.windowedSignal,this.complexSpectrum=s.complexSpectrum,this.ampSpectrum=s.ampSpectrum,n){var u=ie(n,this.windowingFunction,this.bufferSize);this.previousSignal=u.windowedSignal,this.previousComplexSpectrum=u.complexSpectrum,this.previousAmpSpectrum=u.ampSpectrum}var d=function(e){return i.featureExtractors[e]({ampSpectrum:i.ampSpectrum,chromaFilterBank:i.chromaFilterBank,complexSpectrum:i.complexSpectrum,signal:i.signal,bufferSize:i.bufferSize,sampleRate:i.sampleRate,barkScale:i.barkScale,melFilterBank:i.melFilterBank,previousSignal:i.previousSignal,previousAmpSpectrum:i.previousAmpSpectrum,previousComplexSpectrum:i.previousComplexSpectrum,numberOfMFCCCoefficients:i.numberOfMFCCCoefficients,numberOfBarkBands:i.numberOfBarkBands})};if(typeof e==`object`)return e.reduce((function(e,t){var n;return Object.assign({},e,((n={})[t]=d(t),n))}),{});if(typeof e==`string`)return d(e);throw this._errors.invalidFeatureFmt}},ie=function(e,t,n){var r={};e.buffer===void 0?r.signal=o(e):r.signal=e,r.windowedSignal=i(r.signal,t),r.complexSpectrum=ne(r.windowedSignal),r.ampSpectrum=new Float32Array(n/2);for(var a=0;a<n/2;a++)r.ampSpectrum[a]=Math.sqrt(r.complexSpectrum.real[a]**2+r.complexSpectrum.imag[a]**2);return r};return typeof window<`u`&&(window.Meyda=b),b}))}))(),1),B={IDLE:`idle`,LISTENING:`listening`,ONSET_HOLD:`onset_hold`,COOLDOWN:`cooldown`},Xe=[`rms`,`spectralCentroid`,`spectralFlatness`,`powerSpectrum`,`zcr`],Ze={fftSize:512,onsetMargin:.025,onsetHoldMs:30,cooldownMs:120},Qe=.05;function $e(e){if(e instanceof DOMException)switch(e.name){case`NotFoundError`:return`No microphone was found. Check that a mic is connected, enabled, and set as the default input device in your OS sound settings.`;case`NotAllowedError`:return`Microphone access was denied. Check your browser's site permissions (the padlock icon in the address bar) and allow microphone access.`;case`NotReadableError`:return`The microphone is in use by another application, or the OS couldn't access it.`;case`OverconstrainedError`:return`No microphone on this system supports the requested audio settings.`;case`SecurityError`:return`Microphone access is blocked — this page must be served over HTTPS or from localhost.`;default:return`Microphone error: ${e.message}`}return e instanceof Error?e.message:`Unknown microphone error.`}var et=class extends EventTarget{constructor(e=Ze){super(),this.ctx=null,this.analyzer=null,this.stream=null,this.source=null,this.state=B.IDLE,this.holdBuffer=[],this.cooldownTimer=null,this.holdTimer=null,this.lastLevelEmitAt=0,this.noiseFloor=0,this.config=e}getState(){return this.state}getSampleRate(){return this.ctx?.sampleRate??null}getFftSize(){return this.config.fftSize}updateConfig(e){this.config={...this.config,...e}}async start(){if(this.state===B.IDLE)try{this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!0}}),this.ctx=new AudioContext,this.source=this.ctx.createMediaStreamSource(this.stream),this.analyzer=Ye.default.createMeydaAnalyzer({audioContext:this.ctx,source:this.source,bufferSize:this.config.fftSize,featureExtractors:Xe,callback:e=>this.onFeatures(e)}),this.analyzer.start(),this.setState(B.LISTENING)}catch(e){this.dispatchEvent(new CustomEvent(`error`,{detail:Error($e(e))})),this.teardown()}}stop(){this.teardown(),this.setState(B.IDLE)}teardown(){this.analyzer?.stop(),this.analyzer=null,this.source?.disconnect(),this.source=null,this.stream?.getTracks().forEach(e=>e.stop()),this.stream=null,this.ctx?.close(),this.ctx=null,this.holdTimer&&clearTimeout(this.holdTimer),this.cooldownTimer&&clearTimeout(this.cooldownTimer),this.holdTimer=null,this.cooldownTimer=null,this.holdBuffer=[],this.noiseFloor=0}onFeatures(e){if(!this.ctx)return;let t={timestamp:this.ctx.currentTime,rms:e.rms??0,spectralCentroid:e.spectralCentroid??0,spectralFlatness:e.spectralFlatness??0,powerSpectrum:e.powerSpectrum??new Float32Array,zcr:e.zcr??0};this.state===B.LISTENING&&(this.noiseFloor+=(t.rms-this.noiseFloor)*Qe);let n=this.noiseFloor+this.config.onsetMargin;switch(this.maybeEmitLevel(t.rms,n),this.state){case B.LISTENING:t.rms>=n&&this.beginOnsetHold(t);break;case B.ONSET_HOLD:this.holdBuffer.push(t);break;default:break}}beginOnsetHold(e){this.holdBuffer=[e],this.setState(B.ONSET_HOLD),this.holdTimer=setTimeout(()=>{let e=this.holdBuffer;this.holdBuffer=[],this.dispatchEvent(new CustomEvent(`transient-detected`,{detail:e})),this.enterCooldown()},this.config.onsetHoldMs)}enterCooldown(){this.setState(B.COOLDOWN),this.cooldownTimer=setTimeout(()=>{this.setState(B.LISTENING)},this.config.cooldownMs)}maybeEmitLevel(e,t){let n=performance.now();n-this.lastLevelEmitAt<33||(this.lastLevelEmitAt=n,this.dispatchEvent(new CustomEvent(`level`,{detail:{level:e,threshold:t}})))}setState(e){this.state=e,this.dispatchEvent(new CustomEvent(`state-change`,{detail:e}))}},tt={centroidKickMax:600,centroidHatMin:4e3,flatnessNoiseMin:.35,lowBandHz:200,midBandHz:2e3};function nt(e,t,n,r){let i=t/n,a=0,o=0,s=0;for(let t=0;t<e.length;t++){let n=t*i,c=e[t];n<=r.lowBandHz?a+=c:n<=r.midBandHz?o+=c:s+=c}let c=a+o+s||1;return{low:a/c,mid:o/c,high:s/c}}function V(e){return e.length===0?0:e.reduce((e,t)=>e+t,0)/e.length}function rt(e,t,n,r=tt){if(e.length===0)return{class:`snare`,confidence:0,features:{centroid:0,flatness:0,lowBandEnergy:0,midBandEnergy:0,highBandEnergy:0}};let i=V(e.map(e=>e.spectralCentroid)),a=V(e.map(e=>e.spectralFlatness)),o=e.map(e=>nt(e.powerSpectrum,t,n,r)),s=V(o.map(e=>e.low)),c=V(o.map(e=>e.mid)),l=V(o.map(e=>e.high)),u={centroid:i,flatness:a,lowBandEnergy:s,midBandEnergy:c,highBandEnergy:l};return i<=r.centroidKickMax&&s>=c?{class:`kick`,confidence:it(1-i/r.centroidKickMax),features:u}:i>=r.centroidHatMin&&l>=c?{class:`hat`,confidence:it((i-r.centroidHatMin)/r.centroidHatMin),features:u}:{class:`snare`,confidence:it(a),features:u}}function it(e){return Math.min(1,Math.max(0,e))}var at=100;function ot(e){if(e.length<2)return at;let t=e.map(e=>e.timeMs).sort((e,t)=>e-t),n=[];for(let e=1;e<t.length;e++){let r=t[e]-t[e-1];r>60&&n.push(r)}if(n.length===0)return at;n.sort((e,t)=>e-t);let r=6e4/(n[Math.floor(n.length/2)]*4);for(;r<60;)r*=2;for(;r>180;)r/=2;return Math.round(r)}function st(e,t){if(e.length===0)return{steps:[],totalSteps:16};let n=6e4/t/4,r=Math.min(...e.map(e=>e.timeMs)),i=e.map(e=>e.timeMs-r),a=Math.max(...i),o=Math.round(a/n)+1,s=Math.max(16,Math.ceil(o/16)*16);return{steps:e.map(e=>({step:Math.min(s-1,Math.round((e.timeMs-r)/n)),class:e.class,controlLabel:e.controlLabel})),totalSteps:s}}function ct(e,t){return e.controls.find(e=>e.id===t)}function lt(e,t){return t.map(t=>ct(e,t)).filter(e=>e!==void 0)}var ut=[[`1`,`2`,`3`,`4`],[`5`,`6`,`7`,`8`],[`9`,`10`,`11`,`12`],[`13`,`14`,`15`,`16`]];function dt(){let e=[],t=36;for(let n=0;n<4;n++)for(let r=0;r<4;r++)e.push({id:`pad-${ut[n][r]}`,label:ut[n][r],shape:`pad`,position:{row:n,col:r},midi:{note:t++,channel:10}});return e}var ft={id:`sp404mkii`,name:`Roland SP-404MKII`,gridDimensions:{rows:4,cols:4},banks:[`A`,`B`,`C`,`D`],controls:dt(),classMapping:{kick:[`pad-1`],snare:[`pad-2`],hat:[`pad-3`]},decorative:[`BUS FX`,`HOLD`,`EXT SOURCE`,`SUB PAD`]};function pt(){let e=[],t=60;for(let n=1;n<=16;n++)e.push({id:`key-${n}`,label:String(n),shape:`key`,position:{row:0,col:n-1},midi:{note:t++,channel:1}});return e}var mt={id:`po33`,name:`Pocket Operator PO-33 K.O!`,gridDimensions:null,controls:pt(),classMapping:{kick:[`key-1`],snare:[`key-2`],hat:[`key-3`]}};function ht(){let e=[],t=48;for(let n=1;n<=16;n++)e.push({id:`key-${n}`,label:String(n),shape:`key`,position:{row:0,col:n-1},midi:{note:t++,channel:1}});return e}var gt={id:`po32`,name:`Pocket Operator PO-32 Tonic`,gridDimensions:null,controls:ht(),classMapping:{kick:[`key-1`],snare:[`key-2`],hat:[`key-3`]}},_t=class extends EventTarget{emit(e){this.dispatchEvent(new CustomEvent(`beat`,{detail:e}))}},vt=He(`device-config`),yt=He(`beat-bus`),H={kick:{fg:`var(--color-kick)`,glow:`var(--color-kick-glow)`,label:`KICK`},snare:{fg:`var(--color-snare)`,glow:`var(--color-snare-glow)`,label:`SNARE`},hat:{fg:`var(--color-hat)`,glow:`var(--color-hat-glow)`,label:`HAT`}},bt=`var(--color-accent)`,U=[`hat`,`snare`,`kick`],xt=/^var\((--[\w-]+)\)$/;function St(e,t){let n=xt.exec(t);return n&&getComputedStyle(e).getPropertyValue(n[1]).trim()||t}function W(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Ct=140,G=class extends I{constructor(...e){super(...e),this.min=0,this.max=1,this.value=0,this.label=``,this.dragStartY=0,this.dragStartValue=0,this.dragging=!1,this.onPointerDown=e=>{this.dragging=!0,this.dragStartY=e.clientY,this.dragStartValue=this.value,e.currentTarget.setPointerCapture(e.pointerId)},this.onPointerMove=e=>{if(!this.dragging)return;let t=this.dragStartY-e.clientY,n=this.max-this.min,r=this.dragStartValue+t/Ct*n;this.value=Math.min(this.max,Math.max(this.min,r)),this.dispatchEvent(new CustomEvent(`value-change`,{detail:this.value,bubbles:!0,composed:!0}))},this.onPointerUp=e=>{this.dragging=!1,e.currentTarget.releasePointerCapture(e.pointerId)}}get ratio(){return(this.value-this.min)/(this.max-this.min)}render(){return A`
      <div class="wrap">
        <div
          class="knob"
          style="--angle: ${-135+this.ratio*270}deg"
          @pointerdown=${this.onPointerDown}
          @pointermove=${this.onPointerMove}
          @pointerup=${this.onPointerUp}
        >
          <div class="indicator"></div>
        </div>
        <span class="label">${this.label}</span>
      </div>
    `}static{this.styles=h`
    :host {
      display: inline-flex;
    }

    .wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-1-5);
      user-select: none;
      touch-action: none;
    }

    .knob {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-full);
      background: radial-gradient(circle at 35% 30%, #4a4a54, var(--color-surface-1) 72%);
      border: 1px solid var(--color-border);
      box-shadow:
        0 2px 5px rgba(0, 0, 0, 0.5),
        inset 0 1px 1px rgba(255, 255, 255, 0.1);
      position: relative;
      cursor: ns-resize;
    }

    .knob:active {
      cursor: grabbing;
    }

    .indicator {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 16px;
      background: var(--color-accent);
      transform-origin: 50% 100%;
      transform: translate(-50%, -100%) rotate(var(--angle));
      border-radius: 1px;
      box-shadow: 0 0 5px var(--color-accent);
      pointer-events: none;
    }

    .label {
      font: var(--weight-bold) var(--text-xs) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wider);
      color: var(--color-text-dim);
    }
  `}};W([R({type:Number})],G.prototype,`min`,void 0),W([R({type:Number})],G.prototype,`max`,void 0),W([R({type:Number})],G.prototype,`value`,void 0),W([R({type:String})],G.prototype,`label`,void 0),G=W([L(`knob-control`)],G);var K=class extends I{constructor(...e){super(...e),this.sensMin=0,this.sensMax=1,this.sensitivity=0,this.toneMin=0,this.toneMax=1,this.tone=1,this.onSensitivityChange=e=>{this.dispatchEvent(new CustomEvent(`sensitivity-change`,{detail:e.detail,bubbles:!0,composed:!0}))},this.onToneChange=e=>{this.dispatchEvent(new CustomEvent(`tone-change`,{detail:e.detail,bubbles:!0,composed:!0}))}}render(){return A`
      <header>
        <div class="wordmark">
          <h1>BEAT // MAPPER</h1>
          <p class="subtitle">voice-to-pattern transcription</p>
        </div>

        <div class="knobs">
          <knob-control
            label="SENS"
            .min=${this.sensMin}
            .max=${this.sensMax}
            .value=${this.sensitivity}
            @value-change=${this.onSensitivityChange}
          ></knob-control>
          <knob-control
            label="TONE"
            .min=${this.toneMin}
            .max=${this.toneMax}
            .value=${this.tone}
            @value-change=${this.onToneChange}
          ></knob-control>
        </div>
      </header>
    `}static{this.styles=h`
    :host {
      display: block;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      position: relative;
    }

    .wordmark h1 {
      font: var(--weight-extrabold) var(--text-3xl) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wide);
      margin: 0;
      color: var(--color-text-bright);
    }

    .subtitle {
      margin: var(--space-1) 0 0;
      font-size: var(--text-base);
      color: var(--color-text-dim);
      letter-spacing: var(--tracking-snug);
    }

    .knobs {
      display: flex;
      gap: var(--space-6);
    }
  `}};W([R({type:Number})],K.prototype,`sensMin`,void 0),W([R({type:Number})],K.prototype,`sensMax`,void 0),W([R({type:Number})],K.prototype,`sensitivity`,void 0),W([R({type:Number})],K.prototype,`toneMin`,void 0),W([R({type:Number})],K.prototype,`toneMax`,void 0),W([R({type:Number})],K.prototype,`tone`,void 0),K=W([L(`app-header`)],K);var wt=6e3,q=U,Tt=.88,Et=class extends I{constructor(...e){super(...e),this.canvas=null,this.ctx2d=null,this.events=[],this.rafId=0,this.dpr=Math.min(window.devicePixelRatio||1,2),this.resizeObserver=null,this.resolvedLaneColors=new Map,this.onBeat=e=>{this.events.push(e.detail)},this.draw=()=>{this.rafId=requestAnimationFrame(this.draw);let e=this.ctx2d,t=this.canvas;if(!e||!t||t.width===0)return;let n=performance.now();this.events=this.events.filter(e=>n-e.timestamp<wt);let r=t.width,i=t.height,a=i/q.length,o=r*Tt;e.fillStyle=`rgba(8, 8, 11, 0.32)`,e.fillRect(0,0,r,i),e.strokeStyle=`rgba(255, 255, 255, 0.05)`,e.lineWidth=this.dpr;for(let t=1;t<q.length;t++){let n=t*a;e.beginPath(),e.moveTo(0,n),e.lineTo(r,n),e.stroke()}e.strokeStyle=`rgba(255, 176, 32, 0.45)`,e.lineWidth=2*this.dpr,e.beginPath(),e.moveTo(o,0),e.lineTo(o,i),e.stroke();for(let t of this.events){let r=(n-t.timestamp)/wt,i=o*(1-r),s=q.indexOf(t.class);if(s===-1)continue;let c=s*a+a/2,l=this.resolvedLaneColors.get(t.class)??H[t.class].fg,u=(4+t.confidence*6)*this.dpr;e.save(),e.globalAlpha=Math.max(0,1-r),e.shadowColor=l,e.shadowBlur=14*this.dpr,e.fillStyle=l,e.beginPath(),e.arc(i,c,u,0,Math.PI*2),e.fill(),e.restore()}}}connectedCallback(){super.connectedCallback(),this.bus.addEventListener(`beat`,this.onBeat)}disconnectedCallback(){super.disconnectedCallback(),this.bus.removeEventListener(`beat`,this.onBeat),this.resizeObserver?.disconnect(),cancelAnimationFrame(this.rafId)}firstUpdated(){this.canvas=this.renderRoot.querySelector(`canvas`),this.ctx2d=this.canvas?.getContext(`2d`)??null,this.resizeObserver=new ResizeObserver(()=>this.resize()),this.canvas&&this.resizeObserver.observe(this.canvas),this.resize();for(let e of q)this.resolvedLaneColors.set(e,St(this,H[e].fg));this.rafId=requestAnimationFrame(this.draw)}resize(){if(!this.canvas)return;let e=this.canvas.getBoundingClientRect();this.canvas.width=Math.max(1,e.width*this.dpr),this.canvas.height=Math.max(1,e.height*this.dpr)}render(){return A`
      <div class="wrap">
        <div class="lane-labels">
          ${q.map(e=>A`<span style="color:${H[e].fg}">${H[e].label}</span>`)}
        </div>
        <canvas></canvas>
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
    }

    .wrap {
      position: relative;
    }

    canvas {
      width: 100%;
      height: 120px;
      display: block;
      border-radius: var(--radius-lg);
      background: var(--color-well);
      border: 1px solid var(--border, var(--color-border-subtle));
    }

    .lane-labels {
      position: absolute;
      left: var(--space-3);
      top: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font: var(--weight-bold) var(--text-xs) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wider);
      pointer-events: none;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
    }
  `}};W([Je({context:yt})],Et.prototype,`bus`,void 0),Et=W([L(`beat-timeline`)],Et);var Dt=26,Ot=16,J=class extends I{constructor(...e){super(...e),this.pattern={steps:[],totalSteps:Ot},this.padLabels={},this.selectedClass=null}onLaneClick(e){this.dispatchEvent(new CustomEvent(`lane-select`,{detail:e,bubbles:!0,composed:!0}))}render(){let e=new Map;for(let t of U)e.set(t,new Set);for(let t of this.pattern.steps)e.get(t.class)?.add(t.step);let t=Array.from({length:this.pattern.totalSteps},(e,t)=>t);return A`
      <div class="pattern">
        <div class="lane-labels">
          ${U.map(e=>A`
              <button
                type="button"
                class="lane-label"
                ?data-selected=${this.selectedClass===e}
                style="color: ${H[e].fg}"
                @click=${()=>this.onLaneClick(e)}
              >
                <span>${H[e].label}</span>
                ${this.padLabels[e]?.length?A`<b>${this.padLabels[e].map(e=>`P${e}`).join(` `)}</b>`:``}
              </button>
            `)}
        </div>
        <div class="scroll">
          <div class="lanes-steps" style="width: ${t.length*Dt}px">
            ${U.map(n=>{let r=e.get(n);return A`
                <div class="step-row">
                  ${t.map(e=>A`
                      <div
                        class="step"
                        ?data-bar-start=${e%Ot===0}
                        ?data-beat-start=${e%4==0}
                        ?data-hit=${r.has(e)}
                        style="--class-fg: ${H[n].fg}; --class-glow: ${H[n].glow}"
                      ></div>
                    `)}
                </div>
              `})}
          </div>
        </div>
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
    }

    .pattern {
      display: flex;
      border: 1px solid var(--border, var(--color-border-subtle));
      border-radius: var(--radius-lg);
      background: var(--color-well);
      overflow: hidden;
    }

    .lane-labels {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      border-right: 1px solid var(--border, var(--color-border-subtle));
    }

    .lane-label {
      height: 32px;
      display: flex;
      align-items: center;
      gap: var(--space-1-5);
      padding: 0 var(--space-3);
      font: var(--weight-bold) var(--text-sm) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wide);
      white-space: nowrap;
      background: none;
      border: none;
      border-left: 2px solid transparent;
      cursor: pointer;
      text-align: left;
    }

    .lane-label:hover {
      background: rgba(255, 255, 255, 0.03);
    }

    .lane-label[data-selected] {
      background: rgba(255, 255, 255, 0.06);
      border-left-color: currentColor;
    }

    .lane-label b {
      opacity: 0.7;
      font-weight: 700;
    }

    .scroll {
      overflow-x: auto;
      overscroll-behavior-x: contain;
      -webkit-overflow-scrolling: touch;
      flex: 1;
      min-width: 0;
    }

    .lanes-steps {
      display: flex;
      flex-direction: column;
    }

    .step-row {
      display: flex;
      height: 32px;
    }

    .step {
      width: ${Dt}px;
      flex-shrink: 0;
      border-right: 1px solid rgba(255, 255, 255, 0.03);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .step::after {
      content: '';
      width: 14px;
      height: 14px;
      border-radius: var(--radius-xs);
      background: rgba(255, 255, 255, 0.04);
      transition:
        background-color var(--duration-fast),
        box-shadow var(--duration-fast);
    }

    .step[data-beat-start] {
      border-right-color: rgba(255, 255, 255, 0.08);
    }

    .step[data-bar-start] {
      border-right-color: rgba(255, 255, 255, 0.18);
    }

    .step[data-hit]::after {
      background: var(--class-fg);
      box-shadow: 0 0 8px var(--class-glow);
    }
  `}};W([R({attribute:!1})],J.prototype,`pattern`,void 0),W([R({attribute:!1})],J.prototype,`padLabels`,void 0),W([R({attribute:!1})],J.prototype,`selectedClass`,void 0),J=W([L(`pattern-grid`)],J);var kt=.3,At=class extends I{constructor(...e){super(...e),this.level=0,this.threshold=0}render(){let e=Math.min(100,this.level/kt*100),t=Math.min(100,this.threshold/kt*100);return A`
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
      height: 6px;
      border-radius: var(--radius-2xs);
      background: var(--color-well-soft);
      border: 1px solid var(--color-border-subtle);
      overflow: hidden;
    }

    .fill {
      height: 100%;
      background: linear-gradient(90deg, var(--color-snare), var(--color-accent));
      transition: width 40ms var(--ease-linear);
    }

    .track[data-hot] .fill {
      background: linear-gradient(90deg, var(--color-accent), var(--color-kick));
    }

    .marker {
      position: absolute;
      top: -2px;
      bottom: -2px;
      width: 2px;
      background: rgba(255, 255, 255, 0.65);
    }
  `}};W([R({type:Number})],At.prototype,`level`,void 0),W([R({type:Number})],At.prototype,`threshold`,void 0),At=W([L(`level-meter`)],At);var jt=220,Y=class extends I{constructor(...e){super(...e),this.sessionPhase=`idle`,this.engineState=B.IDLE,this.lastResult=null,this.level=0,this.levelThreshold=0,this.errorMessage=null,this.infoMessage=null,this.recordedHits=[],this.bpm=100,this.pattern={steps:[],totalSteps:16},this.padLabels={},this.selectedClass=null,this.hitFlash=!1,this.flashTimer=null,this.onRecordClick=()=>{this.dispatchEvent(new CustomEvent(`record-toggle`,{bubbles:!0,composed:!0}))}}disconnectedCallback(){super.disconnectedCallback(),this.flashTimer&&clearTimeout(this.flashTimer)}updated(e){e.has(`lastResult`)&&this.lastResult&&(this.hitFlash=!0,this.flashTimer&&clearTimeout(this.flashTimer),this.flashTimer=setTimeout(()=>{this.hitFlash=!1},jt))}adjustBpm(e){this.dispatchEvent(new CustomEvent(`bpm-adjust`,{detail:e,bubbles:!0,composed:!0}))}render(){let e=this.sessionPhase===`recording`,t=this.lastResult?H[this.lastResult.class].fg:bt,n=this.sessionPhase===`recording`?`recording`:this.sessionPhase===`reviewing`?`complete`:this.engineState.replace(`_`,` `),r=this.sessionPhase===`recording`?`STOP`:this.sessionPhase===`reviewing`?`RECORD AGAIN`:`RECORD`;return A`
      <section class="col col-analysis">
        <h2 class="col-title">Analysis &amp; Recording</h2>

        <div class="record-row">
          <div class="readout" style="--readout-color: ${t}; --level: ${Math.min(1,this.level*6)}" ?data-hit-flash=${this.hitFlash}>
            <div class="readout-ring" ?data-phase-recording=${e}></div>
            <div class="readout-inner">
              <span class="readout-state" data-phase=${this.sessionPhase}>${n}</span>
              <span class="readout-class">${this.lastResult?H[this.lastResult.class].label:`--`}</span>
            </div>
          </div>

          <div class="transport">
            <button type="button" class="rec-button" ?data-active=${e} @click=${this.onRecordClick}>
              <span class="dot"></span>
              ${r}
            </button>
            ${e?A`
                  <div class="level-row">
                    <span class="level-label">MIC</span>
                    <level-meter .level=${this.level} .threshold=${this.levelThreshold}></level-meter>
                  </div>
                `:``}
            ${this.errorMessage?A`<p class="error">${this.errorMessage}</p>`:``}
            ${this.infoMessage?A`<p class="info">${this.infoMessage}</p>`:``}
          </div>
        </div>

        <div class="stream-block">
          <h3 class="block-label">Input Stream</h3>
          <beat-timeline></beat-timeline>
        </div>

        <div class="sequence-block">
          <h3 class="block-label">Detected Sequence</h3>
          ${this.sessionPhase===`reviewing`?A`
                <div class="sequence-content">
                  <div class="pattern-header">
                    <div class="pattern-meta">
                      <span>${this.recordedHits.length} hits</span>
                      <span class="dim">·</span>
                      <span>${(Math.max(...this.recordedHits.map(e=>e.timeMs),0)/1e3).toFixed(1)}s</span>
                    </div>
                    <div class="bpm-control">
                      <button type="button" @click=${()=>this.adjustBpm(-1)}>−</button>
                      <span class="bpm-value">${this.bpm} BPM</span>
                      <button type="button" @click=${()=>this.adjustBpm(1)}>+</button>
                    </div>
                  </div>
                  <pattern-grid .pattern=${this.pattern} .padLabels=${this.padLabels} .selectedClass=${this.selectedClass}></pattern-grid>
                </div>
              `:A`<p class="placeholder">Record a take to see the transcribed sequence here.</p>`}
        </div>
      </section>
    `}static{this.styles=h`
    :host {
      display: block;
      min-width: 0;
    }

    .col-title {
      margin: 0 0 var(--space-5);
      font: var(--weight-bold) var(--text-base) / 1 var(--font-mono);
      letter-spacing: var(--tracking-widest);
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .block-label {
      margin: 0 0 var(--space-2);
      font: var(--weight-bold) var(--text-xs) / 1 var(--font-mono);
      letter-spacing: var(--tracking-widest);
      text-transform: uppercase;
      color: var(--color-text-dim);
    }

    .stream-block {
      margin-top: var(--space-7);
    }

    .sequence-block {
      margin-top: var(--space-7);
    }

    .sequence-content {
      animation: content-enter 320ms var(--ease-standard) both;
    }

    @keyframes content-enter {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .placeholder {
      margin: 0;
      padding: var(--space-4);
      border-radius: var(--radius-lg);
      border: 1px dashed var(--color-border-panel);
      color: var(--color-border-strong);
      font: var(--weight-semibold) var(--text-base) / 1.4 var(--font-mono);
      text-align: center;
    }

    .record-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-7);
      position: relative;
    }

    .readout {
      --level: 0;
      width: 96px;
      height: 96px;
      flex-shrink: 0;
      border-radius: var(--radius-full);
      background: radial-gradient(circle at 40% 30%, var(--color-surface-2), var(--color-canvas) 75%);
      border: 3px solid var(--color-border);
      position: relative;
      display: grid;
      place-items: center;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.6);
    }

    .readout[data-hit-flash] {
      animation: hit-pop var(--duration-moderate) var(--ease-standard);
    }

    @keyframes hit-pop {
      0% {
        transform: scale(1);
      }
      35% {
        transform: scale(1.06);
      }
      100% {
        transform: scale(1);
      }
    }

    .readout-ring {
      position: absolute;
      inset: -3px;
      border-radius: var(--radius-full);
      border: 2px solid var(--readout-color, var(--color-accent));
      opacity: calc(0.25 + var(--level) * 0.6);
      box-shadow: 0 0 calc(6px + var(--level) * 18px) var(--readout-color, var(--color-accent));
      transition: opacity var(--duration-instant) var(--ease-linear);
    }

    .readout-ring[data-phase-recording] {
      animation: rec-pulse var(--duration-slower) var(--ease-in-out) infinite;
    }

    @keyframes rec-pulse {
      0%,
      100% {
        opacity: 0.4;
      }
      50% {
        opacity: 0.9;
      }
    }

    .readout-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-0-5);
    }

    .readout-state {
      font: var(--weight-bold) var(--text-2xs) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wider);
      color: var(--color-text-dim);
      text-transform: uppercase;
      transition: color var(--duration-base);
    }

    .readout-state[data-phase='recording'] {
      color: var(--color-record);
    }

    .readout-state[data-phase='reviewing'] {
      color: var(--color-success);
    }

    .readout-class {
      font: var(--weight-extrabold) var(--text-xl) / 1 var(--font-mono);
      letter-spacing: var(--tracking-normal);
      color: var(--readout-color, var(--color-accent));
      text-shadow: 0 0 10px var(--readout-color, var(--color-accent));
    }

    .transport {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      flex: 1;
      min-width: 160px;
    }

    .rec-button {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      width: fit-content;
      font: var(--weight-bold) var(--text-md) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wider);
      padding: var(--space-2-5) var(--space-5);
      border-radius: var(--radius-pill);
      border: 1px solid var(--color-border);
      background: var(--color-surface-2);
      color: var(--color-text);
      cursor: pointer;
      transition:
        background-color var(--duration-base),
        border-color var(--duration-base),
        transform var(--duration-fast) var(--ease-standard);
    }

    .rec-button:hover {
      border-color: var(--color-border-strong);
      transform: translateY(-1px);
    }

    .rec-button:active {
      transform: translateY(0) scale(0.98);
    }

    .rec-button[data-active]:hover {
      border-color: var(--color-record);
    }

    .rec-button .dot {
      width: var(--space-2-5);
      height: var(--space-2-5);
      border-radius: var(--radius-full);
      background: var(--color-record-dim);
    }

    .rec-button[data-active] {
      background: var(--color-record-bg);
      border-color: var(--color-record);
      color: var(--color-record-fg);
    }

    .rec-button[data-active] .dot {
      background: var(--color-record);
      box-shadow: 0 0 8px var(--color-record);
      animation: pulse var(--duration-slow) var(--ease-in-out) infinite;
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.35;
      }
    }

    .error {
      color: var(--color-error);
      font-size: var(--text-md);
      margin: 0;
    }

    .info {
      color: var(--color-accent);
      font-size: var(--text-md);
      margin: 0;
    }

    .level-row {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .level-label {
      font: var(--weight-bold) var(--text-xs) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wider);
      color: var(--color-text-dim);
      flex-shrink: 0;
    }

    .level-row level-meter {
      flex: 1;
    }

    .pattern-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-3);
    }

    .pattern-meta {
      font: var(--weight-semibold) var(--text-base) / 1 var(--font-mono);
      color: var(--color-text-muted);
      display: flex;
      gap: var(--space-1-5);
    }

    .pattern-meta .dim {
      color: var(--color-text-faint);
    }

    .bpm-control {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .bpm-control button {
      width: 22px;
      height: 22px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border);
      background: var(--color-surface-2);
      color: var(--color-text);
      font: var(--weight-bold) var(--text-lg) / 1 var(--font-mono);
      cursor: pointer;
      transition: border-color var(--duration-base), color var(--duration-base);
    }

    .bpm-control button:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .bpm-value {
      font: var(--weight-bold) var(--text-base) / 1 var(--font-mono);
      color: var(--color-accent);
      min-width: 56px;
      text-align: center;
    }

    @media (prefers-reduced-motion: reduce) {
      .readout-ring[data-phase-recording],
      .readout[data-hit-flash],
      .rec-button[data-active] .dot,
      .sequence-content {
        animation: none;
      }
    }
  `}};W([R({attribute:!1})],Y.prototype,`sessionPhase`,void 0),W([R({attribute:!1})],Y.prototype,`engineState`,void 0),W([R({attribute:!1})],Y.prototype,`lastResult`,void 0),W([R({type:Number})],Y.prototype,`level`,void 0),W([R({type:Number})],Y.prototype,`levelThreshold`,void 0),W([R({attribute:!1})],Y.prototype,`errorMessage`,void 0),W([R({attribute:!1})],Y.prototype,`infoMessage`,void 0),W([R({attribute:!1})],Y.prototype,`recordedHits`,void 0),W([R({type:Number})],Y.prototype,`bpm`,void 0),W([R({attribute:!1})],Y.prototype,`pattern`,void 0),W([R({attribute:!1})],Y.prototype,`padLabels`,void 0),W([R({attribute:!1})],Y.prototype,`selectedClass`,void 0),W([z()],Y.prototype,`hitFlash`,void 0),Y=W([L(`recording-panel`)],Y);var Mt=class extends I{constructor(...e){super(...e),this.banks=[],this.active=``}select(e){this.dispatchEvent(new CustomEvent(`bank-change`,{detail:e,bubbles:!0,composed:!0}))}render(){return this.banks.length===0?M:A`
      <div class="row">
        ${this.banks.map(e=>A`
            <button
              type="button"
              class=${e===this.active?`active`:``}
              @click=${()=>this.select(e)}
            >
              ${e}
            </button>
          `)}
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
    }

    .row {
      display: flex;
      gap: var(--space-1-5);
    }

    button {
      flex: 1;
      padding: 7px var(--space-1);
      font: var(--weight-bold) var(--text-md) / 1 var(--font-mono);
      letter-spacing: var(--tracking-normal);
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border);
      background: linear-gradient(var(--color-surface-3), var(--color-surface-0));
      color: var(--color-text-muted);
      cursor: pointer;
      transition:
        border-color var(--duration-base),
        color var(--duration-base),
        box-shadow var(--duration-base);
    }

    button:hover:not(.active) {
      border-color: var(--color-border-strong);
      color: var(--color-text);
    }

    button.active {
      border-color: var(--color-accent);
      color: var(--color-accent);
      box-shadow: 0 0 8px var(--color-accent-glow);
    }
  `}};W([R({attribute:!1})],Mt.prototype,`banks`,void 0),W([R({type:String})],Mt.prototype,`active`,void 0),Mt=W([L(`bank-selector`)],Mt);var X=class extends I{constructor(...e){super(...e),this.assignedClass=null,this.active=!1,this.hitCount=0,this.selected=!1,this.editable=!1,this.onClick=()=>{this.editable&&this.dispatchEvent(new CustomEvent(`pad-toggle`,{detail:this.control.id,bubbles:!0,composed:!0}))}}render(){let e=this.assignedClass?H[this.assignedClass]:null;return A`
      <button
        type="button"
        class="pad"
        part="pad"
        ?data-hit=${this.hitCount>0}
        ?data-editable=${this.editable}
        style=${e?`--class-fg: ${e.fg}; --class-glow: ${e.glow};`:``}
        @click=${this.onClick}
      >
        ${e?A`<span class="led"></span>`:M}
        ${this.hitCount>0?A`<span class="count">×${this.hitCount}</span>`:M}
        <span class="label">${this.control.label}</span>
        <span class="sub">${e?.label??``}</span>
      </button>
    `}static{this.styles=h`
    :host {
      display: block;
    }

    .pad {
      width: 100%;
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-0-5);
      position: relative;
      border-radius: var(--radius-xl);
      border: 1px solid var(--pad-border, var(--color-border-panel));
      background: linear-gradient(180deg, var(--color-surface-3) 0%, var(--color-surface-1) 100%);
      color: var(--pad-fg, #8b8f9a);
      font: var(--weight-semibold) var(--text-xl) / 1 var(--font-mono);
      cursor: default;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.04),
        0 1px 2px rgba(0, 0, 0, 0.4);
      transition:
        background-color var(--duration-fast) var(--ease-standard),
        border-color var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
    }

    /* Persists for the rest of the session once a pad has been hit at
       least once — the "was this kick actually detected" answer, without
       needing to catch the instant it happened. */
    .pad[data-hit] {
      border-color: var(--class-fg, var(--color-accent));
      box-shadow: 0 0 10px var(--class-glow, var(--color-accent-glow));
    }

    .led {
      position: absolute;
      top: 7px;
      right: 7px;
      width: 6px;
      height: 6px;
      border-radius: var(--radius-full);
      background: var(--class-fg);
      opacity: 0.55;
      box-shadow: 0 0 4px var(--class-fg);
    }

    .pad[data-hit] .led {
      opacity: 1;
    }

    .count {
      position: absolute;
      bottom: 5px;
      right: 6px;
      font: var(--weight-bold) var(--text-2xs) / 1 var(--font-mono);
      color: var(--class-fg, var(--color-accent));
      opacity: 0.9;
    }

    .label {
      font-size: var(--text-2xl);
    }

    .sub {
      font-size: var(--text-2xs);
      letter-spacing: var(--tracking-wider);
      color: var(--class-fg, transparent);
      opacity: 0.75;
      min-height: 8px;
    }

    :host([active]) .pad {
      background: color-mix(in srgb, var(--class-fg, var(--color-accent)) 22%, var(--color-surface-2));
      border-color: var(--class-fg, var(--color-accent));
      box-shadow:
        0 0 16px var(--class-glow, var(--color-accent-glow)),
        inset 0 0 12px var(--class-glow, var(--color-accent-glow));
      transform: scale(0.96);
      color: #fff;
    }

    :host([active]) .led {
      opacity: 1;
    }

    .pad[data-editable] {
      cursor: pointer;
    }

    .pad[data-editable]:hover {
      border-color: var(--color-border-strong);
      transform: translateY(-1px);
    }

    .pad[data-editable]:active {
      transform: scale(0.97);
    }

    /* Currently assigned to the class selected in the pattern grid — the
       "hit exactly this pad on the real device" signal, distinct from the
       momentary [active] flash and the persistent [data-hit] count marker. */
    :host([selected]) .pad {
      border-color: var(--class-fg, var(--color-accent));
      box-shadow: 0 0 0 2px var(--class-fg, var(--color-accent)), 0 0 14px var(--class-glow, var(--color-accent-glow));
      animation: select-pulse var(--duration-slow) var(--ease-in-out) infinite;
    }

    @keyframes select-pulse {
      0%,
      100% {
        box-shadow: 0 0 0 2px var(--class-fg, var(--color-accent)), 0 0 10px var(--class-glow, var(--color-accent-glow));
      }
      50% {
        box-shadow: 0 0 0 2px var(--class-fg, var(--color-accent)), 0 0 18px var(--class-glow, var(--color-accent-glow));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      :host([selected]) .pad {
        animation: none;
      }
    }
  `}};W([R({attribute:!1})],X.prototype,`control`,void 0),W([R({attribute:!1})],X.prototype,`assignedClass`,void 0),W([R({type:Boolean,reflect:!0})],X.prototype,`active`,void 0),W([R({type:Number})],X.prototype,`hitCount`,void 0),W([R({type:Boolean,reflect:!0})],X.prototype,`selected`,void 0),W([R({type:Boolean})],X.prototype,`editable`,void 0),X=W([L(`pad-control`)],X);var Nt=220,Z=class extends I{constructor(...e){super(...e),this.hitCounts={},this.stepHighlights=null,this.stepClass=null,this.activeControlId=null,this.flashTimer=null,this.onBeat=e=>{this.activeControlId=e.detail.controlId,this.flashTimer&&clearTimeout(this.flashTimer),this.flashTimer=setTimeout(()=>{this.activeControlId=null},Nt)}}connectedCallback(){super.connectedCallback(),this.bus.addEventListener(`beat`,this.onBeat)}disconnectedCallback(){super.disconnectedCallback(),this.bus.removeEventListener(`beat`,this.onBeat),this.flashTimer&&clearTimeout(this.flashTimer)}render(){let{gridDimensions:e,controls:t,classMapping:n,decorative:r}=this.deviceConfig,i=new Map;for(let[e,t]of Object.entries(n))for(let n of t)i.set(n,e);let a=this.stepHighlights!==null,o=e?`grid-template-columns: repeat(${e.cols}, minmax(0, 1fr)); grid-template-rows: repeat(${e.rows}, 1fr);`:`grid-template-columns: repeat(auto-fill, minmax(48px, 1fr)); grid-auto-rows: 48px;`;return A`
      <div class="unit">
        <div class="unit-head">
          <div class="unit-screen">${this.deviceConfig.name}</div>
        </div>
        <div class="layout">
          <div class="grid" style=${o}>
            ${t.map((t,n)=>A`
                <pad-control
                  .control=${t}
                  .assignedClass=${a?this.stepHighlights.has(n)?this.stepClass:null:i.get(t.id)??null}
                  ?active=${!a&&this.activeControlId===t.id}
                  .hitCount=${a?0:this.hitCounts[t.id]??0}
                  .selected=${a&&this.stepHighlights.has(n)}
                  .editable=${a}
                  style=${e?`grid-row: ${t.position.row+1}; grid-column: ${t.position.col+1};`:``}
                ></pad-control>
              `)}
          </div>
          ${e&&r?A`
                <div class="accessory-column">
                  ${r.map(e=>A`<div class="accessory">${e}</div>`)}
                </div>
              `:M}
        </div>
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
    }

    .unit {
      padding: var(--space-4);
      border-radius: var(--radius-2xl);
      background: linear-gradient(180deg, var(--color-surface-5) 0%, var(--color-surface-1) 100%);
      border: 1px solid var(--color-border);
      box-shadow: var(--shadow-md), var(--shadow-inset-highlight);
    }

    .unit-head {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      margin-bottom: var(--space-4);
    }

    .unit-screen {
      flex: 1;
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-xs);
      background: var(--color-lcd);
      border: 1px solid var(--color-lcd-border);
      color: var(--color-lcd-fg);
      font: var(--weight-bold) var(--text-sm) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wide);
      text-shadow: 0 0 6px var(--color-lcd-glow);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .layout {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-3);
    }

    .grid {
      display: grid;
      gap: var(--space-3);
      flex: 1;
      min-width: 220px;
      max-width: 420px;
    }

    .accessory-column {
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      gap: var(--space-3);
      width: 84px;
      flex-shrink: 0;
    }

    .accessory {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--space-1);
      border-radius: var(--radius-xl);
      border: 1px dashed var(--color-border-panel);
      background: repeating-linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.015) 0px,
        rgba(255, 255, 255, 0.015) 2px,
        transparent 2px,
        transparent 6px
      );
      color: var(--color-border-strong);
      font: var(--weight-bold) var(--text-2xs) / 1.2 var(--font-mono);
      letter-spacing: var(--tracking-normal);
    }
  `}};W([Je({context:yt})],Z.prototype,`bus`,void 0),W([Je({context:vt,subscribe:!0})],Z.prototype,`deviceConfig`,void 0),W([R({attribute:!1})],Z.prototype,`hitCounts`,void 0),W([R({attribute:!1})],Z.prototype,`stepHighlights`,void 0),W([R({attribute:!1})],Z.prototype,`stepClass`,void 0),W([z()],Z.prototype,`activeControlId`,void 0),Z=W([L(`pad-grid`)],Z);var Pt=[`kick`,`snare`,`hat`],Q=class extends I{constructor(...e){super(...e),this.devices=[],this.activeBank=``,this.sessionPhase=`idle`,this.selectedClass=null,this.viewBar=0,this.pattern={steps:[],totalSteps:16},this.hitCounts={},this.isRecording=!1,this.onDeviceChange=e=>{let t=e.target.value;this.dispatchEvent(new CustomEvent(`device-change`,{detail:t,bubbles:!0,composed:!0}))}}toggleClass(e){this.dispatchEvent(new CustomEvent(`class-toggle`,{detail:e,bubbles:!0,composed:!0}))}goToBar(e){this.dispatchEvent(new CustomEvent(`bar-change`,{detail:e,bubbles:!0,composed:!0}))}render(){let e=this.sessionPhase===`reviewing`&&this.selectedClass!==null,t=Math.max(1,Math.ceil(this.pattern.totalSteps/16)),n=e?new Set(this.pattern.steps.filter(e=>e.class===this.selectedClass&&Math.floor(e.step/16)===this.viewBar).map(e=>e.step%16)):null,r=e=>this.pattern.steps.filter(t=>t.class===e).length;return A`
      <section class="col col-hardware">
        <div class="hardware-head">
          <h2 class="col-title">Hardware Mapping</h2>
          <div class="device-status">
            <span class="device-status-label">Mapping target</span>
            <strong>${this.deviceConfig.name}</strong>
          </div>
        </div>

        ${this.deviceConfig.banks?A`
              <div class="bank-row">
                <span class="bank-label">SET</span>
                <bank-selector .banks=${this.deviceConfig.banks} .active=${this.activeBank}></bank-selector>
              </div>
            `:``}
        ${this.sessionPhase===`reviewing`?A`
              <div class="mapping-content">
                <div class="class-select-row">
                  ${Pt.map(e=>A`
                      <button
                        type="button"
                        class="class-select"
                        ?data-selected=${this.selectedClass===e}
                        style="--class-fg: ${H[e].fg}; --class-glow: ${H[e].glow}"
                        @click=${()=>this.toggleClass(e)}
                      >
                        <span class="class-select-name">${H[e].label}</span>
                        <span class="class-select-pads">${r(e)} steps</span>
                      </button>
                    `)}
                </div>
                <div class="hint-row">
                  <p class="mapping-hint">
                    ${e?`Pads = steps ${this.viewBar*16+1}–${(this.viewBar+1)*16}. Lit pads are ${H[this.selectedClass].label} hits — press these on the device. Tap to fix.`:`Tap a sound to light up the steps to press on the device.`}
                  </p>
                  ${e&&t>1?A`
                        <div class="bar-pager">
                          <button type="button" ?disabled=${this.viewBar===0} @click=${()=>this.goToBar(this.viewBar-1)}>‹</button>
                          <span>BAR ${this.viewBar+1}/${t}</span>
                          <button type="button" ?disabled=${this.viewBar===t-1} @click=${()=>this.goToBar(this.viewBar+1)}>›</button>
                        </div>
                      `:``}
                </div>
              </div>
            `:``}

        <pad-grid .hitCounts=${this.hitCounts} .stepHighlights=${n} .stepClass=${this.selectedClass}></pad-grid>

        <select class="device-select" @change=${this.onDeviceChange} ?disabled=${this.isRecording}>
          ${this.devices.map(e=>A`<option value=${e.id}>${e.name}</option>`)}
        </select>
      </section>
    `}static{this.styles=h`
    :host {
      display: block;
      min-width: 0;
    }

    .col-title {
      margin: 0 0 var(--space-5);
      font: var(--weight-bold) var(--text-base) / 1 var(--font-mono);
      letter-spacing: var(--tracking-widest);
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .hardware-head {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-3);
      margin-bottom: var(--space-5);
    }

    .hardware-head .col-title {
      margin-bottom: 0;
    }

    .device-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--space-0-5);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border-subtle);
      background: var(--color-surface-0);
      font: var(--weight-bold) var(--text-xs) / 1.3 var(--font-mono);
      max-width: 100%;
      min-width: 0;
    }

    .device-status-label {
      color: var(--color-text-dim);
      letter-spacing: var(--tracking-wide);
      text-transform: uppercase;
    }

    .device-status strong {
      color: var(--color-accent);
      font-size: var(--text-sm);
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .device-select {
      margin-top: var(--space-4);
      width: 100%;
      font: var(--weight-semibold) var(--text-lg) var(--font-mono);
      padding: var(--space-2) var(--space-8) var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
      background:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
          no-repeat right var(--space-3) center,
        var(--color-surface-2);
      color: var(--color-text);
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
      transition: border-color var(--duration-base);
    }

    .device-select:hover:not(:disabled) {
      border-color: var(--color-border-strong);
    }

    .device-select:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 1px;
    }

    .device-select:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .bank-row {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-7);
    }

    .bank-label {
      font: var(--weight-bold) var(--text-sm) / 1 var(--font-mono);
      letter-spacing: var(--tracking-widest);
      color: var(--color-text-dim);
      flex-shrink: 0;
    }

    .mapping-content {
      animation: content-enter 320ms var(--ease-standard) both;
    }

    @keyframes content-enter {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .class-select-row {
      display: flex;
      gap: var(--space-2);
      margin-bottom: var(--space-1);
    }

    .class-select {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: var(--space-3) var(--space-1-5);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      background: linear-gradient(var(--color-surface-3), var(--color-surface-0));
      cursor: pointer;
      transition:
        border-color var(--duration-instant),
        box-shadow var(--duration-instant),
        background-color var(--duration-instant),
        transform var(--duration-fast) var(--ease-standard);
    }

    .class-select:hover:not([data-selected]) {
      border-color: var(--color-border-strong);
      transform: translateY(-1px);
    }

    .class-select-name {
      font: var(--weight-extrabold) var(--text-md) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wide);
      color: var(--class-fg);
    }

    .class-select-pads {
      font: var(--weight-bold) var(--text-xs) / 1 var(--font-mono);
      letter-spacing: var(--tracking-normal);
      color: var(--color-text-dim);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    .class-select[data-selected] {
      border-color: var(--class-fg);
      box-shadow:
        0 0 12px var(--class-glow),
        inset 0 0 10px color-mix(in srgb, var(--class-fg) 12%, transparent);
    }

    .class-select[data-selected] .class-select-pads {
      color: var(--class-fg);
    }

    .hint-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2);
      margin: var(--space-1-5) 0 var(--space-4);
    }

    .mapping-hint {
      margin: 0;
      flex: 1;
      min-width: 180px;
      font: var(--weight-semibold) var(--text-base) / 1.4 var(--font-mono);
      color: var(--color-text-dim);
    }

    .bar-pager {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font: var(--weight-bold) var(--text-sm) / 1 var(--font-mono);
      color: var(--color-accent);
      white-space: nowrap;
    }

    .bar-pager button {
      width: 24px;
      height: 24px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border);
      background: var(--color-surface-2);
      color: var(--color-text);
      font: var(--weight-bold) var(--text-lg) / 1 var(--font-mono);
      cursor: pointer;
      transition: border-color var(--duration-base), color var(--duration-base);
    }

    .bar-pager button:hover:not(:disabled) {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .bar-pager button:disabled {
      opacity: 0.35;
      cursor: default;
    }

    @media (prefers-reduced-motion: reduce) {
      .mapping-content {
        animation: none;
      }
    }
  `}};W([R({attribute:!1})],Q.prototype,`deviceConfig`,void 0),W([R({attribute:!1})],Q.prototype,`devices`,void 0),W([R({type:String})],Q.prototype,`activeBank`,void 0),W([R({attribute:!1})],Q.prototype,`sessionPhase`,void 0),W([R({attribute:!1})],Q.prototype,`selectedClass`,void 0),W([R({type:Number})],Q.prototype,`viewBar`,void 0),W([R({attribute:!1})],Q.prototype,`pattern`,void 0),W([R({attribute:!1})],Q.prototype,`hitCounts`,void 0),W([R({type:Boolean})],Q.prototype,`isRecording`,void 0),Q=W([L(`hardware-panel`)],Q);var Ft=[ft,mt,gt],It=.005,Lt=.05,Rt=.5,zt=2,$=class extends I{constructor(...e){super(...e),this.engine=new et,this.bus=new _t,this.deviceConfig=Ft[0],this.engineState=B.IDLE,this.errorMessage=null,this.infoMessage=null,this.activeBank=this.deviceConfig.banks?.[0]??``,this.lastResult=null,this.level=0,this.levelThreshold=Ze.onsetMargin,this.sensitivity=.055-Ze.onsetMargin,this.tone=1,this.sessionPhase=`idle`,this.recordedHits=[],this.hitCounts={},this.bpm=100,this.pattern={steps:[],totalSteps:16},this.selectedClass=null,this.viewBar=0,this.thresholds={...tt},this.recordingStartedAt=0,this.onEngineStateChange=e=>{this.engineState=e.detail,e.detail===B.IDLE&&(this.level=0)},this.onEngineError=e=>{this.errorMessage=e.detail.message,this.sessionPhase=`idle`},this.onLevel=e=>{this.level=e.detail.level,this.levelThreshold=e.detail.threshold},this.onTransient=e=>{let t=this.engine.getSampleRate();if(!t||this.sessionPhase!==`recording`)return;let n=rt(e.detail,t,this.engine.getFftSize(),this.thresholds),[r]=lt(this.deviceConfig,this.deviceConfig.classMapping[n.class]);if(!r)return;this.lastResult={class:n.class,confidence:n.confidence};let i={class:n.class,controlId:r.id,controlLabel:r.label,confidence:n.confidence,timeMs:performance.now()-this.recordingStartedAt};this.recordedHits=[...this.recordedHits,i],this.hitCounts={...this.hitCounts,[r.id]:(this.hitCounts[r.id]??0)+1},this.bus.emit({class:n.class,confidence:n.confidence,controlId:r.id,timestamp:performance.now()})},this.onDeviceChange=e=>{let t=Ft.find(t=>t.id===e);t&&(this.deviceConfig=t,this.activeBank=t.banks?.[0]??``,this.sessionPhase===`recording`&&this.engine.stop(),this.sessionPhase=`idle`,this.recordedHits=[],this.hitCounts={},this.selectedClass=null,this.viewBar=0)},this.onBankChange=e=>{this.activeBank=e.detail},this.onLaneSelect=e=>{this.toggleSelectedClass(e.detail)},this.onPadStepToggle=e=>{let t=this.selectedClass;if(!t||this.sessionPhase!==`reviewing`)return;let n=this.deviceConfig.controls.findIndex(t=>t.id===e.detail);if(n<0||n>=16)return;let r=this.viewBar*16+n;if(r>=this.pattern.totalSteps)return;let i=this.pattern.steps.some(e=>e.class===t&&e.step===r),a=lt(this.deviceConfig,this.deviceConfig.classMapping[t])[0]?.label??``,o=i?this.pattern.steps.filter(e=>!(e.class===t&&e.step===r)):[...this.pattern.steps,{step:r,class:t,controlLabel:a}];this.pattern={...this.pattern,steps:o}},this.onSensitivityChange=e=>{this.sensitivity=e.detail;let t=.055-this.sensitivity;this.engine.updateConfig({onsetMargin:t})},this.onToneChange=e=>{this.tone=e.detail,this.thresholds={...this.thresholds,centroidKickMax:tt.centroidKickMax*this.tone,centroidHatMin:tt.centroidHatMin*this.tone}}}connectedCallback(){super.connectedCallback(),this.engine.addEventListener(`state-change`,this.onEngineStateChange),this.engine.addEventListener(`transient-detected`,this.onTransient),this.engine.addEventListener(`error`,this.onEngineError),this.engine.addEventListener(`level`,this.onLevel)}disconnectedCallback(){super.disconnectedCallback(),this.engine.removeEventListener(`state-change`,this.onEngineStateChange),this.engine.removeEventListener(`transient-detected`,this.onTransient),this.engine.removeEventListener(`error`,this.onEngineError),this.engine.removeEventListener(`level`,this.onLevel),this.engine.stop()}async handleRecordButton(){if(this.errorMessage=null,this.infoMessage=null,this.sessionPhase===`recording`){this.engine.stop(),this.finishRecording();return}this.recordedHits=[],this.hitCounts={},this.pattern={steps:[],totalSteps:16},this.lastResult=null,this.selectedClass=null,this.viewBar=0,this.sessionPhase=`recording`,this.recordingStartedAt=performance.now(),await this.engine.start()}finishRecording(){if(this.recordedHits.length===0){this.sessionPhase=`idle`,this.infoMessage=`No hits detected — try raising SENS (or beatboxing louder/closer to the mic) and record again.`;return}this.bpm=ot(this.recordedHits),this.pattern=st(this.recordedHits,this.bpm),this.viewBar=0,this.sessionPhase=`reviewing`}adjustBpm(e){this.bpm=Math.min(180,Math.max(60,this.bpm+e)),this.pattern=st(this.recordedHits,this.bpm),this.setViewBar(this.viewBar)}toggleSelectedClass(e){this.selectedClass=this.selectedClass===e?null:e}setViewBar(e){let t=Math.max(1,Math.ceil(this.pattern.totalSteps/16));this.viewBar=Math.min(t-1,Math.max(0,e))}render(){let e=this.sessionPhase===`recording`,t={};for(let e of U){let n=lt(this.deviceConfig,this.deviceConfig.classMapping[e]);n.length&&(t[e]=n.map(e=>e.label))}return A`
      <div class="panel">
        <app-header
          .sensMin=${It}
          .sensMax=${Lt}
          .sensitivity=${this.sensitivity}
          .toneMin=${Rt}
          .toneMax=${zt}
          .tone=${this.tone}
          @sensitivity-change=${this.onSensitivityChange}
          @tone-change=${this.onToneChange}
        ></app-header>

        <div class="workspace">
          <recording-panel
            .sessionPhase=${this.sessionPhase}
            .engineState=${this.engineState}
            .lastResult=${this.lastResult}
            .level=${this.level}
            .levelThreshold=${this.levelThreshold}
            .errorMessage=${this.errorMessage}
            .infoMessage=${this.infoMessage}
            .recordedHits=${this.recordedHits}
            .bpm=${this.bpm}
            .pattern=${this.pattern}
            .padLabels=${t}
            .selectedClass=${this.selectedClass}
            @record-toggle=${()=>this.handleRecordButton()}
            @bpm-adjust=${e=>this.adjustBpm(e.detail)}
            @lane-select=${this.onLaneSelect}
          ></recording-panel>

          <hardware-panel
            .deviceConfig=${this.deviceConfig}
            .devices=${Ft}
            .activeBank=${this.activeBank}
            .sessionPhase=${this.sessionPhase}
            .selectedClass=${this.selectedClass}
            .viewBar=${this.viewBar}
            .pattern=${this.pattern}
            .hitCounts=${this.hitCounts}
            .isRecording=${e}
            @bank-change=${this.onBankChange}
            @class-toggle=${e=>this.toggleSelectedClass(e.detail)}
            @bar-change=${e=>this.setViewBar(e.detail)}
            @pad-toggle=${this.onPadStepToggle}
            @device-change=${e=>this.onDeviceChange(e.detail)}
          ></hardware-panel>
        </div>
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
      max-width: 960px;
      width: 100%;
      /* body centers app-root with display:flex — without this, a flex item
         defaults to a min-width equal to its content's min-content size, so
         any oversized descendant (long device names, fixed-width pads, etc.)
         forces the whole app wider than the viewport instead of shrinking
         to fit it. */
      min-width: 0;
      box-sizing: border-box;
      margin: 0 auto;
      padding: var(--space-10) var(--space-7);
      font: var(--text-2xl) / 1.5 var(--font-sans);
      color: var(--color-text-bright);
    }

    .panel {
      position: relative;
      padding: var(--space-9) var(--space-9) var(--space-8);
      border-radius: var(--radius-panel);
      background:
        radial-gradient(circle at 15% -10%, rgba(255, 255, 255, 0.05), transparent 40%),
        linear-gradient(180deg, var(--color-surface-4) 0%, var(--color-surface-1) 100%);
      border: 1px solid var(--color-border-panel);
      box-shadow: var(--shadow-lg), var(--shadow-inset-highlight);
      overflow: hidden;
      animation: panel-enter 560ms var(--ease-standard) both;
    }

    @keyframes panel-enter {
      from {
        opacity: 0;
        transform: translateY(10px) scale(0.99);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .panel,
      .panel::before {
        animation: none;
      }
    }

    .panel::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.035) 50%, transparent 60%);
      background-size: 220% 220%;
      animation: sweep 9s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes sweep {
      0% {
        background-position: 120% 0%;
      }
      50% {
        background-position: -20% 100%;
      }
      100% {
        background-position: 120% 0%;
      }
    }

    app-header {
      display: block;
      margin-bottom: var(--space-7);
    }

    .workspace {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: var(--space-9);
      align-items: start;
    }

    @media (max-width: 720px) {
      .workspace {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `}};W([qe({context:yt})],$.prototype,`bus`,void 0),W([qe({context:vt}),z()],$.prototype,`deviceConfig`,void 0),W([z()],$.prototype,`engineState`,void 0),W([z()],$.prototype,`errorMessage`,void 0),W([z()],$.prototype,`infoMessage`,void 0),W([z()],$.prototype,`activeBank`,void 0),W([z()],$.prototype,`lastResult`,void 0),W([z()],$.prototype,`level`,void 0),W([z()],$.prototype,`levelThreshold`,void 0),W([z()],$.prototype,`sensitivity`,void 0),W([z()],$.prototype,`tone`,void 0),W([z()],$.prototype,`sessionPhase`,void 0),W([z()],$.prototype,`recordedHits`,void 0),W([z()],$.prototype,`hitCounts`,void 0),W([z()],$.prototype,`bpm`,void 0),W([z()],$.prototype,`pattern`,void 0),W([z()],$.prototype,`selectedClass`,void 0),W([z()],$.prototype,`viewBar`,void 0),$=W([L(`app-root`)],$);