var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=globalThis,u=l.ShadowRoot&&(l.ShadyCSS===void 0||l.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,d=Symbol(),f=new WeakMap,p=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==d)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(u&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=f.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&f.set(t,e))}return e}toString(){return this.cssText}},m=e=>new p(typeof e==`string`?e:e+``,void 0,d),h=(e,...t)=>new p(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,d),g=(e,t)=>{if(u)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=l.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},_=u?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return m(t)})(e):e,{is:v,defineProperty:y,getOwnPropertyDescriptor:b,getOwnPropertyNames:S,getOwnPropertySymbols:ee,getPrototypeOf:te}=Object,C=globalThis,w=C.trustedTypes,ne=w?w.emptyScript:``,re=C.reactiveElementPolyfillSupport,T=(e,t)=>e,E={toAttribute(e,t){switch(t){case Boolean:e=e?ne:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ie=(e,t)=>!v(e,t),ae={attribute:!0,type:String,converter:E,reflect:!1,useDefault:!1,hasChanged:ie};Symbol.metadata??=Symbol(`metadata`),C.litPropertyMetadata??=new WeakMap;var D=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ae){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&y(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=b(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ae}static _$Ei(){if(this.hasOwnProperty(T(`elementProperties`)))return;let e=te(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(T(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T(`properties`))){let e=this.properties,t=[...S(e),...ee(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(_(e))}else e!==void 0&&t.push(_(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return g(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?E:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?E:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??ie)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};D.elementStyles=[],D.shadowRootOptions={mode:`open`},D[T(`elementProperties`)]=new Map,D[T(`finalized`)]=new Map,re?.({ReactiveElement:D}),(C.reactiveElementVersions??=[]).push(`2.1.2`);var oe=globalThis,se=e=>e,ce=oe.trustedTypes,le=ce?ce.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,ue=`$lit$`,O=`lit$${Math.random().toFixed(9).slice(2)}$`,de=`?`+O,fe=`<${de}>`,k=document,A=()=>k.createComment(``),j=e=>e===null||typeof e!=`object`&&typeof e!=`function`,pe=Array.isArray,me=e=>pe(e)||typeof e?.[Symbol.iterator]==`function`,he=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,_e=/>/g,N=RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ve=/'/g,ye=/"/g,be=/^(?:script|style|textarea|title)$/i,P=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),F=Symbol.for(`lit-noChange`),I=Symbol.for(`lit-nothing`),xe=new WeakMap,L=k.createTreeWalker(k,129);function Se(e,t){if(!pe(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return le===void 0?t:le.createHTML(t)}var Ce=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=M;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===M?c[1]===`!--`?o=ge:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=N):(be.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=N):o=_e:o===N?c[0]===`>`?(o=i??M,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?N:c[3]===`"`?ye:ve):o===ye||o===ve?o=N:o===ge||o===_e?o=M:(o=N,i=void 0);let d=o===N&&e[t+1].startsWith(`/>`)?` `:``;a+=o===M?n+fe:l>=0?(r.push(s),n.slice(0,l)+ue+n.slice(l)+O+d):n+O+(l===-2?t:d)}return[Se(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},we=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Ce(t,n);if(this.el=e.createElement(l,r),L.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=L.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(ue)){let t=u[o++],n=i.getAttribute(e).split(O),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?De:r[1]===`?`?Oe:r[1]===`@`?ke:z}),i.removeAttribute(e)}else e.startsWith(O)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(be.test(i.tagName)){let e=i.textContent.split(O),t=e.length-1;if(t>0){i.textContent=ce?ce.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],A()),L.nextNode(),c.push({type:2,index:++a});i.append(e[t],A())}}}else if(i.nodeType===8)if(i.data===de)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(O,e+1))!==-1;)c.push({type:7,index:a}),e+=O.length-1}a++}}static createElement(e,t){let n=k.createElement(`template`);return n.innerHTML=e,n}};function R(e,t,n=e,r){if(t===F)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=j(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=R(e,i._$AS(e,t.values),i,r)),t}var Te=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??k).importNode(t,!0);L.currentNode=r;let i=L.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Ee(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ae(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=L.nextNode(),a++)}return L.currentNode=k,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Ee=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),j(e)?e===I||e==null||e===``?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==F&&this._(e):e._$litType$===void 0?e.nodeType===void 0?me(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==I&&j(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=we.createElement(Se(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Te(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=xe.get(e.strings);return t===void 0&&xe.set(e.strings,t=new we(e)),t}k(t){pe(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(A()),this.O(A()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=se(e).nextSibling;se(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=I}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=R(this,e,t,0),a=!j(e)||e!==this._$AH&&e!==F,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=R(this,r[n+o],t,o),s===F&&(s=this._$AH[o]),a||=!j(s)||s!==this._$AH[o],s===I?e=I:e!==I&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},De=class extends z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===I?void 0:e}},Oe=class extends z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==I)}},ke=class extends z{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=R(this,e,t,0)??I)===F)return;let n=this._$AH,r=e===I&&n!==I||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==I&&(n===I||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ae=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}},je=oe.litHtmlPolyfillSupport;je?.(we,Ee),(oe.litHtmlVersions??=[]).push(`3.3.3`);var Me=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Ee(t.insertBefore(A(),e),e,void 0,n??{})}return i._$AI(e),i},Ne=globalThis,B=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};B._$litElement$=!0,B.finalized=!0,Ne.litElementHydrateSupport?.({LitElement:B});var Pe=Ne.litElementPolyfillSupport;Pe?.({LitElement:B}),(Ne.litElementVersions??=[]).push(`4.2.2`);var V=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Fe={attribute:!0,type:String,converter:E,reflect:!1,hasChanged:ie},Ie=(e=Fe,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function H(e){return(t,n)=>typeof n==`object`?Ie(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function U(e){return H({...e,state:!0,attribute:!1})}var Le=class extends Event{constructor(e,t,n,r){super(`context-request`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=n,this.subscribe=r??!1}};function Re(e){return e}var ze=class{constructor(e,t,n,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,t.context!==void 0){let e=t;this.context=e.context,this.callback=e.callback,this.subscribe=e.subscribe??!1}else this.context=t,this.callback=n,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&=(this.unsubscribe(),void 0)}dispatchRequest(){this.host.dispatchEvent(new Le(this.context,this.host,this.t,this.subscribe))}},Be=class{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let n=t||!Object.is(e,this.o);this.o=e,n&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},e!==void 0&&(this.value=e)}addCallback(e,t,n){if(!n)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}},Ve=class extends Event{constructor(e,t){super(`context-provider`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}},He=class extends Be{constructor(e,t,n){super(t.context===void 0?n:t.initialValue),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:n}]of this.subscriptions)t.has(e)||(t.add(e),n.dispatchEvent(new Le(this.context,n,e,!0)));e.stopPropagation()},this.host=e,t.context===void 0?this.context=t:this.context=t.context,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener(`context-request`,this.onContextRequest),this.host.addEventListener(`context-provider`,this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new Ve(this.context,this.host))}};function Ue({context:e}){return(t,n)=>{let r=new WeakMap;if(typeof n==`object`)return{get(){return t.get.call(this)},set(e){return r.get(this).setValue(e),t.set.call(this,e)},init(t){return r.set(this,new He(this,{context:e,initialValue:t})),t}};{t.constructor.addInitializer((t=>{r.set(t,new He(t,{context:e}))}));let i=Object.getOwnPropertyDescriptor(t,n),a;if(i===void 0){let e=new WeakMap;a={get(){return e.get(this)},set(t){r.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=i.set;a={...i,set(t){r.get(this).setValue(t),e?.call(this,t)}}}Object.defineProperty(t,n,a);return}}}function We({context:e,subscribe:t}){return(n,r)=>{typeof r==`object`?r.addInitializer((function(){new ze(this,{context:e,callback:e=>{n.set.call(this,e)},subscribe:t})})):n.constructor.addInitializer((n=>{new ze(n,{context:e,callback:e=>{n[r]=e},subscribe:t})}))}}var Ge=c(o(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?t.exports=r():typeof define==`function`&&define.amd?define(r):(n=typeof globalThis<`u`?globalThis:n||self).Meyda=r()})(e,(function(){function e(e,t,n){if(n||arguments.length===2)for(var r,i=0,a=t.length;i<a;i++)!r&&i in t||(r||=Array.prototype.slice.call(t,0,i),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}var t=Object.freeze({__proto__:null,blackman:function(e){for(var t=new Float32Array(e),n=2*Math.PI/(e-1),r=2*n,i=0;i<e/2;i++)t[i]=.42-.5*Math.cos(i*n)+.08*Math.cos(i*r);for(i=Math.ceil(e/2);i>0;i--)t[e-i]=t[i-1];return t},hamming:function(e){for(var t=new Float32Array(e),n=0;n<e;n++)t[n]=.54-.46*Math.cos(2*Math.PI*(n/e-1));return t},hanning:function(e){for(var t=new Float32Array(e),n=0;n<e;n++)t[n]=.5-.5*Math.cos(2*Math.PI*n/(e-1));return t},sine:function(e){for(var t=Math.PI/(e-1),n=new Float32Array(e),r=0;r<e;r++)n[r]=Math.sin(t*r);return n}}),n={};function r(e){for(;e%2==0&&e>1;)e/=2;return e===1}function i(e,r){if(r!==`rect`){if(r!==``&&r||(r=`hanning`),n[r]||(n[r]={}),!n[r][e.length])try{n[r][e.length]=t[r](e.length)}catch{throw Error(`Invalid windowing function`)}e=function(e,t){for(var n=[],r=0;r<Math.min(e.length,t.length);r++)n[r]=e[r]*t[r];return n}(e,n[r][e.length])}return e}function a(e,t,n){for(var r=new Float32Array(e),i=0;i<r.length;i++)r[i]=i*t/n,r[i]=13*Math.atan(r[i]/1315.8)+3.5*Math.atan((r[i]/7518)**2);return r}function o(e){return Float32Array.from(e)}function s(e){return 1125*Math.log(1+e/700)}function c(e,t,n){for(var r,i=new Float32Array(e+2),a=new Float32Array(e+2),o=t/2,c=s(0),l=(s(o)-c)/(e+1),u=Array(e+2),d=0;d<i.length;d++)i[d]=d*l,a[d]=(r=i[d],700*(Math.exp(r/1125)-1)),u[d]=Math.floor((n+1)*a[d]/t);for(var f=Array(e),p=0;p<f.length;p++){for(f[p]=Array(n/2+1).fill(0),d=u[p];d<u[p+1];d++)f[p][d]=(d-u[p])/(u[p+1]-u[p]);for(d=u[p+1];d<u[p+2];d++)f[p][d]=(u[p+2]-d)/(u[p+2]-u[p+1])}return f}function l(t,n,r,i,a,o,s){i===void 0&&(i=5),a===void 0&&(a=2),o===void 0&&(o=!0),s===void 0&&(s=440);var c=Math.floor(r/2)+1,l=Array(r).fill(0).map((function(e,i){return t*function(e,t){return Math.log2(16*e/t)}(n*i/r,s)}));l[0]=l[1]-1.5*t;var u,d,f,p=l.slice(1).map((function(e,t){return Math.max(e-l[t])}),1).concat([1]),m=Math.round(t/2),h=Array(t).fill(0).map((function(e,n){return l.map((function(e){return(10*t+m+e-n)%t-m}))})),g=h.map((function(e,t){return e.map((function(e,n){return Math.exp(-.5*(2*h[t][n]/p[n])**2)}))}));if(d=(u=g)[0].map((function(){return 0})),f=u.reduce((function(e,t){return t.forEach((function(t,n){e[n]+=t**2})),e}),d).map(Math.sqrt),g=u.map((function(e,t){return e.map((function(e,t){return e/(f[t]||1)}))})),a){var _=l.map((function(e){return Math.exp(-.5*((e/t-i)/a)**2)}));g=g.map((function(e){return e.map((function(e,t){return e*_[t]}))}))}return o&&(g=e(e([],g.slice(3),!0),g.slice(0,3),!0)),g.map((function(e){return e.slice(0,c)}))}function u(e,t){for(var n=0,r=0,i=0;i<t.length;i++)n+=i**+e*Math.abs(t[i]),r+=t[i];return n/r}function d(e){var t=e.ampSpectrum,n=e.barkScale,r=e.numberOfBarkBands,i=r===void 0?24:r;if(typeof t!=`object`||typeof n!=`object`)throw TypeError();var a=i,o=new Float32Array(a),s=0,c=t,l=new Int32Array(a+1);l[0]=0;for(var u=n[c.length-1]/a,d=1,f=0;f<c.length;f++)for(;n[f]>u;)l[d++]=f,u=d*n[c.length-1]/a;for(l[a]=c.length-1,f=0;f<a;f++){for(var p=0,m=l[f];m<l[f+1];m++)p+=c[m];o[f]=p**.23}for(f=0;f<o.length;f++)s+=o[f];return{specific:o,total:s}}function f(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();for(var n=new Float32Array(t.length),r=0;r<n.length;r++)n[r]=t[r]**2;return n}function p(e){var t=e.ampSpectrum,n=e.melFilterBank,r=e.bufferSize;if(typeof t!=`object`)throw TypeError(`Valid ampSpectrum is required to generate melBands`);if(typeof n!=`object`)throw TypeError(`Valid melFilterBank is required to generate melBands`);for(var i=f({ampSpectrum:t}),a=n.length,o=Array(a),s=new Float32Array(a),c=0;c<s.length;c++){o[c]=new Float32Array(r/2),s[c]=0;for(var l=0;l<r/2;l++)o[c][l]=n[c][l]*i[l],s[c]+=o[c][l];s[c]=Math.log(s[c]+1)}return Array.prototype.slice.call(s)}function m(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,`default`)?e.default:e}var h=null,g=m((function(e,t){var n=e.length;return t||=2,h&&h[n]||function(e){(h||={})[e]=Array(e*e);for(var t=Math.PI/e,n=0;n<e;n++)for(var r=0;r<e;r++)h[e][r+n*e]=Math.cos(t*(r+.5)*n)}(n),e.map((function(){return 0})).map((function(r,i){return t*e.reduce((function(e,t,r,a){return e+t*h[n][r+i*n]}),0)}))})),_=Object.freeze({__proto__:null,amplitudeSpectrum:function(e){return e.ampSpectrum},buffer:function(e){return e.signal},chroma:function(e){var t=e.ampSpectrum,n=e.chromaFilterBank;if(typeof t!=`object`)throw TypeError(`Valid ampSpectrum is required to generate chroma`);if(typeof n!=`object`)throw TypeError(`Valid chromaFilterBank is required to generate chroma`);var r=n.map((function(e,n){return t.reduce((function(t,n,r){return t+n*e[r]}),0)})),i=Math.max.apply(Math,r);return i?r.map((function(e){return e/i})):r},complexSpectrum:function(e){return e.complexSpectrum},energy:function(e){var t=e.signal;if(typeof t!=`object`)throw TypeError();for(var n=0,r=0;r<t.length;r++)n+=Math.abs(t[r])**2;return n},loudness:d,melBands:p,mfcc:function(e){var t=e.ampSpectrum,n=e.melFilterBank,r=e.numberOfMFCCCoefficients,i=e.bufferSize,a=Math.min(40,Math.max(1,r||13));if(n.length<a)throw Error(`Insufficient filter bank for requested number of coefficients`);return g(p({ampSpectrum:t,melFilterBank:n,bufferSize:i})).slice(0,a)},perceptualSharpness:function(e){for(var t=d({ampSpectrum:e.ampSpectrum,barkScale:e.barkScale}),n=t.specific,r=0,i=0;i<n.length;i++)r+=i<15?(i+1)*n[i+1]:.066*Math.exp(.171*(i+1));return r*=.11/t.total},perceptualSpread:function(e){for(var t=d({ampSpectrum:e.ampSpectrum,barkScale:e.barkScale}),n=0,r=0;r<t.specific.length;r++)t.specific[r]>n&&(n=t.specific[r]);return((t.total-n)/t.total)**2},powerSpectrum:f,rms:function(e){var t=e.signal;if(typeof t!=`object`)throw TypeError();for(var n=0,r=0;r<t.length;r++)n+=t[r]**2;return n/=t.length,n=Math.sqrt(n)},spectralCentroid:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();return u(1,t)},spectralCrest:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();var n=0,r=-1/0;return t.forEach((function(e){n+=e**2,r=e>r?e:r})),n/=t.length,n=Math.sqrt(n),r/n},spectralFlatness:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();for(var n=0,r=0,i=0;i<t.length;i++)n+=Math.log(t[i]),r+=t[i];return Math.exp(n/t.length)*t.length/r},spectralFlux:function(e){var t=e.signal,n=e.previousSignal,r=e.bufferSize;if(typeof t!=`object`||typeof n!=`object`)throw TypeError();for(var i=0,a=-r/2;a<t.length/2-1;a++)x=Math.abs(t[a])-Math.abs(n[a]),i+=(x+Math.abs(x))/2;return i},spectralKurtosis:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();var n=t,r=u(1,n),i=u(2,n),a=u(3,n),o=u(4,n);return(-3*r**4+6*r*i-4*r*a+o)/Math.sqrt(i-r**2)**4},spectralRolloff:function(e){var t=e.ampSpectrum,n=e.sampleRate;if(typeof t!=`object`)throw TypeError();for(var r=t,i=n/(2*(r.length-1)),a=0,o=0;o<r.length;o++)a+=r[o];for(var s=.99*a,c=r.length-1;a>s&&c>=0;)a-=r[c],--c;return(c+1)*i},spectralSkewness:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();var n=u(1,t),r=u(2,t),i=u(3,t);return(2*n**3-3*n*r+i)/Math.sqrt(r-n**2)**3},spectralSlope:function(e){var t=e.ampSpectrum,n=e.sampleRate,r=e.bufferSize;if(typeof t!=`object`)throw TypeError();for(var i=0,a=0,o=new Float32Array(t.length),s=0,c=0,l=0;l<t.length;l++){i+=t[l];var u=l*n/r;o[l]=u,s+=u*u,a+=u,c+=u*t[l]}return(t.length*c-a*i)/(i*(s-a**2))},spectralSpread:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();return Math.sqrt(u(2,t)-u(1,t)**2)},zcr:function(e){var t=e.signal;if(typeof t!=`object`)throw TypeError();for(var n=0,r=1;r<t.length;r++)(t[r-1]>=0&&t[r]<0||t[r-1]<0&&t[r]>=0)&&n++;return n}});function v(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var y={},b={},S={bitReverseArray:function(e){if(y[e]===void 0){for(var t=(e-1).toString(2).length,n=`0`.repeat(t),r={},i=0;i<e;i++){var a=i.toString(2);a=n.substr(a.length)+a,a=[].concat(v(a)).reverse().join(``),r[i]=parseInt(a,2)}y[e]=r}return y[e]},multiply:function(e,t){return{real:e.real*t.real-e.imag*t.imag,imag:e.real*t.imag+e.imag*t.real}},add:function(e,t){return{real:e.real+t.real,imag:e.imag+t.imag}},subtract:function(e,t){return{real:e.real-t.real,imag:e.imag-t.imag}},euler:function(e,t){var n=-2*Math.PI*e/t;return{real:Math.cos(n),imag:Math.sin(n)}},conj:function(e){return e.imag*=-1,e},constructComplexArray:function(e){var t={};t.real=e.real===void 0?e.slice():e.real.slice();var n=t.real.length;return b[n]===void 0&&(b[n]=Array.apply(null,Array(n)).map(Number.prototype.valueOf,0)),t.imag=b[n].slice(),t}},ee=function(e){var t={};e.real===void 0||e.imag===void 0?t=S.constructComplexArray(e):(t.real=e.real.slice(),t.imag=e.imag.slice());var n=t.real.length,r=Math.log2(n);if(Math.round(r)!=r)throw Error(`Input size must be a power of 2.`);if(t.real.length!=t.imag.length)throw Error(`Real and imaginary components must have the same length.`);for(var i=S.bitReverseArray(n),a={real:[],imag:[]},o=0;o<n;o++)a.real[i[o]]=t.real[o],a.imag[i[o]]=t.imag[o];for(var s=0;s<n;s++)t.real[s]=a.real[s],t.imag[s]=a.imag[s];for(var c=1;c<=r;c++)for(var l=2**c,u=0;u<l/2;u++)for(var d=S.euler(u,l),f=0;f<n/l;f++){var p=l*f+u,m=l*f+u+l/2,h={real:t.real[p],imag:t.imag[p]},g={real:t.real[m],imag:t.imag[m]},_=S.multiply(d,g),v=S.subtract(h,_);t.real[m]=v.real,t.imag[m]=v.imag;var y=S.add(_,h);t.real[p]=y.real,t.imag[p]=y.imag}return t},te=function(){function e(e,t){var n=this;if(this._m=t,!e.audioContext)throw this._m.errors.noAC;if(e.bufferSize&&!r(e.bufferSize))throw this._m._errors.notPow2;if(!e.source)throw this._m._errors.noSource;this._m.audioContext=e.audioContext,this._m.bufferSize=e.bufferSize||this._m.bufferSize||256,this._m.hopSize=e.hopSize||this._m.hopSize||this._m.bufferSize,this._m.sampleRate=e.sampleRate||this._m.audioContext.sampleRate||44100,this._m.callback=e.callback,this._m.windowingFunction=e.windowingFunction||`hanning`,this._m.featureExtractors=_,this._m.EXTRACTION_STARTED=e.startImmediately||!1,this._m.channel=typeof e.channel==`number`?e.channel:0,this._m.inputs=e.inputs||1,this._m.outputs=e.outputs||1,this._m.numberOfMFCCCoefficients=e.numberOfMFCCCoefficients||this._m.numberOfMFCCCoefficients||13,this._m.numberOfBarkBands=e.numberOfBarkBands||this._m.numberOfBarkBands||24,this._m.spn=this._m.audioContext.createScriptProcessor(this._m.bufferSize,this._m.inputs,this._m.outputs),this._m.spn.connect(this._m.audioContext.destination),this._m._featuresToExtract=e.featureExtractors||[],this._m.barkScale=a(this._m.bufferSize,this._m.sampleRate,this._m.bufferSize),this._m.melFilterBank=c(Math.max(this._m.melBands,this._m.numberOfMFCCCoefficients),this._m.sampleRate,this._m.bufferSize),this._m.inputData=null,this._m.previousInputData=null,this._m.frame=null,this._m.previousFrame=null,this.setSource(e.source),this._m.spn.onaudioprocess=function(e){var t;n._m.inputData!==null&&(n._m.previousInputData=n._m.inputData),n._m.inputData=e.inputBuffer.getChannelData(n._m.channel),n._m.previousInputData?((t=new Float32Array(n._m.previousInputData.length+n._m.inputData.length-n._m.hopSize)).set(n._m.previousInputData.slice(n._m.hopSize)),t.set(n._m.inputData,n._m.previousInputData.length-n._m.hopSize)):t=n._m.inputData,(function(e,t,n){if(e.length<t)throw Error(`Buffer is too short for frame length`);if(n<1)throw Error(`Hop length cannot be less that 1`);if(t<1)throw Error(`Frame length cannot be less that 1`);var r=1+Math.floor((e.length-t)/n);return Array(r).fill(0).map((function(r,i){return e.slice(i*n,i*n+t)}))})(t,n._m.bufferSize,n._m.hopSize).forEach((function(e){n._m.frame=e;var t=n._m.extract(n._m._featuresToExtract,n._m.frame,n._m.previousFrame);typeof n._m.callback==`function`&&n._m.EXTRACTION_STARTED&&n._m.callback(t),n._m.previousFrame=n._m.frame}))}}return e.prototype.start=function(e){this._m._featuresToExtract=e||this._m._featuresToExtract,this._m.EXTRACTION_STARTED=!0},e.prototype.stop=function(){this._m.EXTRACTION_STARTED=!1},e.prototype.setSource=function(e){this._m.source&&this._m.source.disconnect(this._m.spn),this._m.source=e,this._m.source.connect(this._m.spn)},e.prototype.setChannel=function(e){e<=this._m.inputs?this._m.channel=e:console.error(`Channel ${e} does not exist. Make sure you've provided a value for 'inputs' that is greater than ${e} when instantiating the MeydaAnalyzer`)},e.prototype.get=function(e){return this._m.inputData?this._m.extract(e||this._m._featuresToExtract,this._m.inputData,this._m.previousInputData):null},e}(),C={audioContext:null,spn:null,bufferSize:512,sampleRate:44100,melBands:26,chromaBands:12,callback:null,windowingFunction:`hanning`,featureExtractors:_,EXTRACTION_STARTED:!1,numberOfMFCCCoefficients:13,numberOfBarkBands:24,_featuresToExtract:[],windowing:i,_errors:{notPow2:Error(`Meyda: Buffer size must be a power of 2, e.g. 64 or 512`),featureUndef:Error(`Meyda: No features defined.`),invalidFeatureFmt:Error(`Meyda: Invalid feature format`),invalidInput:Error(`Meyda: Invalid input.`),noAC:Error(`Meyda: No AudioContext specified.`),noSource:Error(`Meyda: No source node specified.`)},createMeydaAnalyzer:function(e){return new te(e,Object.assign({},C))},listAvailableFeatureExtractors:function(){return Object.keys(this.featureExtractors)},extract:function(e,t,n){var i=this;if(!t||typeof t!=`object`)throw this._errors.invalidInput;if(!e)throw this._errors.featureUndef;if(!r(t.length))throw this._errors.notPow2;this.barkScale!==void 0&&this.barkScale.length==this.bufferSize||(this.barkScale=a(this.bufferSize,this.sampleRate,this.bufferSize)),this.melFilterBank!==void 0&&this.barkScale.length==this.bufferSize&&this.melFilterBank.length==this.melBands||(this.melFilterBank=c(Math.max(this.melBands,this.numberOfMFCCCoefficients),this.sampleRate,this.bufferSize)),this.chromaFilterBank!==void 0&&this.chromaFilterBank.length==this.chromaBands||(this.chromaFilterBank=l(this.chromaBands,this.sampleRate,this.bufferSize)),`buffer`in t&&t.buffer===void 0?this.signal=o(t):this.signal=t;var s=w(t,this.windowingFunction,this.bufferSize);if(this.signal=s.windowedSignal,this.complexSpectrum=s.complexSpectrum,this.ampSpectrum=s.ampSpectrum,n){var u=w(n,this.windowingFunction,this.bufferSize);this.previousSignal=u.windowedSignal,this.previousComplexSpectrum=u.complexSpectrum,this.previousAmpSpectrum=u.ampSpectrum}var d=function(e){return i.featureExtractors[e]({ampSpectrum:i.ampSpectrum,chromaFilterBank:i.chromaFilterBank,complexSpectrum:i.complexSpectrum,signal:i.signal,bufferSize:i.bufferSize,sampleRate:i.sampleRate,barkScale:i.barkScale,melFilterBank:i.melFilterBank,previousSignal:i.previousSignal,previousAmpSpectrum:i.previousAmpSpectrum,previousComplexSpectrum:i.previousComplexSpectrum,numberOfMFCCCoefficients:i.numberOfMFCCCoefficients,numberOfBarkBands:i.numberOfBarkBands})};if(typeof e==`object`)return e.reduce((function(e,t){var n;return Object.assign({},e,((n={})[t]=d(t),n))}),{});if(typeof e==`string`)return d(e);throw this._errors.invalidFeatureFmt}},w=function(e,t,n){var r={};e.buffer===void 0?r.signal=o(e):r.signal=e,r.windowedSignal=i(r.signal,t),r.complexSpectrum=ee(r.windowedSignal),r.ampSpectrum=new Float32Array(n/2);for(var a=0;a<n/2;a++)r.ampSpectrum[a]=Math.sqrt(r.complexSpectrum.real[a]**2+r.complexSpectrum.imag[a]**2);return r};return typeof window<`u`&&(window.Meyda=C),C}))}))(),1),W={IDLE:`idle`,LISTENING:`listening`,ONSET_HOLD:`onset_hold`,COOLDOWN:`cooldown`},Ke=[`rms`,`spectralCentroid`,`spectralFlatness`,`powerSpectrum`,`zcr`],qe={fftSize:512,rmsThreshold:.045,onsetHoldMs:30,cooldownMs:120};function Je(e){if(e instanceof DOMException)switch(e.name){case`NotFoundError`:return`No microphone was found. Check that a mic is connected, enabled, and set as the default input device in your OS sound settings.`;case`NotAllowedError`:return`Microphone access was denied. Check your browser's site permissions (the padlock icon in the address bar) and allow microphone access.`;case`NotReadableError`:return`The microphone is in use by another application, or the OS couldn't access it.`;case`OverconstrainedError`:return`No microphone on this system supports the requested audio settings.`;case`SecurityError`:return`Microphone access is blocked — this page must be served over HTTPS or from localhost.`;default:return`Microphone error: ${e.message}`}return e instanceof Error?e.message:`Unknown microphone error.`}var Ye=class extends EventTarget{constructor(e=qe){super(),this.ctx=null,this.analyzer=null,this.stream=null,this.source=null,this.state=W.IDLE,this.holdBuffer=[],this.cooldownTimer=null,this.holdTimer=null,this.lastLevelEmitAt=0,this.config=e}getState(){return this.state}getSampleRate(){return this.ctx?.sampleRate??null}getFftSize(){return this.config.fftSize}updateConfig(e){this.config={...this.config,...e}}async start(){if(this.state===W.IDLE)try{this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!0}}),this.ctx=new AudioContext,this.source=this.ctx.createMediaStreamSource(this.stream),this.analyzer=Ge.default.createMeydaAnalyzer({audioContext:this.ctx,source:this.source,bufferSize:this.config.fftSize,featureExtractors:Ke,callback:e=>this.onFeatures(e)}),this.analyzer.start(),this.setState(W.LISTENING)}catch(e){this.dispatchEvent(new CustomEvent(`error`,{detail:Error(Je(e))})),this.teardown()}}stop(){this.teardown(),this.setState(W.IDLE)}teardown(){this.analyzer?.stop(),this.analyzer=null,this.source?.disconnect(),this.source=null,this.stream?.getTracks().forEach(e=>e.stop()),this.stream=null,this.ctx?.close(),this.ctx=null,this.holdTimer&&clearTimeout(this.holdTimer),this.cooldownTimer&&clearTimeout(this.cooldownTimer),this.holdTimer=null,this.cooldownTimer=null,this.holdBuffer=[]}onFeatures(e){if(!this.ctx)return;let t={timestamp:this.ctx.currentTime,rms:e.rms??0,spectralCentroid:e.spectralCentroid??0,spectralFlatness:e.spectralFlatness??0,powerSpectrum:e.powerSpectrum??new Float32Array,zcr:e.zcr??0};switch(this.maybeEmitLevel(t.rms),this.state){case W.LISTENING:t.rms>=this.config.rmsThreshold&&this.beginOnsetHold(t);break;case W.ONSET_HOLD:this.holdBuffer.push(t);break;default:break}}beginOnsetHold(e){this.holdBuffer=[e],this.setState(W.ONSET_HOLD),this.holdTimer=setTimeout(()=>{let e=this.holdBuffer;this.holdBuffer=[],this.dispatchEvent(new CustomEvent(`transient-detected`,{detail:e})),this.enterCooldown()},this.config.onsetHoldMs)}enterCooldown(){this.setState(W.COOLDOWN),this.cooldownTimer=setTimeout(()=>{this.setState(W.LISTENING)},this.config.cooldownMs)}maybeEmitLevel(e){let t=performance.now();t-this.lastLevelEmitAt<33||(this.lastLevelEmitAt=t,this.dispatchEvent(new CustomEvent(`level`,{detail:e})))}setState(e){this.state=e,this.dispatchEvent(new CustomEvent(`state-change`,{detail:e}))}},Xe={centroidKickMax:400,centroidHatMin:4e3,flatnessNoiseMin:.35,lowBandHz:200,midBandHz:2e3};function Ze(e,t,n,r){let i=t/n,a=0,o=0,s=0;for(let t=0;t<e.length;t++){let n=t*i,c=e[t];n<=r.lowBandHz?a+=c:n<=r.midBandHz?o+=c:s+=c}let c=a+o+s||1;return{low:a/c,mid:o/c,high:s/c}}function G(e){return e.length===0?0:e.reduce((e,t)=>e+t,0)/e.length}function Qe(e,t,n,r=Xe){if(e.length===0)return{class:`snare`,confidence:0,features:{centroid:0,flatness:0,lowBandEnergy:0,midBandEnergy:0,highBandEnergy:0}};let i=G(e.map(e=>e.spectralCentroid)),a=G(e.map(e=>e.spectralFlatness)),o=e.map(e=>Ze(e.powerSpectrum,t,n,r)),s=G(o.map(e=>e.low)),c=G(o.map(e=>e.mid)),l=G(o.map(e=>e.high)),u={centroid:i,flatness:a,lowBandEnergy:s,midBandEnergy:c,highBandEnergy:l},d=a>=r.flatnessNoiseMin;return i<=r.centroidKickMax&&!d&&s>=c?{class:`kick`,confidence:$e(1-i/r.centroidKickMax),features:u}:i>=r.centroidHatMin&&l>=c?{class:`hat`,confidence:$e((i-r.centroidHatMin)/r.centroidHatMin),features:u}:{class:`snare`,confidence:$e(a),features:u}}function $e(e){return Math.min(1,Math.max(0,e))}var et=100;function tt(e){if(e.length<2)return et;let t=e.map(e=>e.timeMs).sort((e,t)=>e-t),n=[];for(let e=1;e<t.length;e++){let r=t[e]-t[e-1];r>60&&n.push(r)}if(n.length===0)return et;n.sort((e,t)=>e-t);let r=6e4/(n[Math.floor(n.length/2)]*4);for(;r<60;)r*=2;for(;r>180;)r/=2;return Math.round(r)}function nt(e,t){if(e.length===0)return{steps:[],totalSteps:16};let n=6e4/t/4,r=Math.max(...e.map(e=>e.timeMs)),i=Math.round(r/n)+1,a=Math.max(16,Math.ceil(i/16)*16);return{steps:e.map(e=>({step:Math.min(a-1,Math.round(e.timeMs/n)),class:e.class,controlLabel:e.controlLabel})),totalSteps:a}}function rt(e,t){return e.controls.find(e=>e.id===t)}var it=[[`1`,`2`,`3`,`4`],[`5`,`6`,`7`,`8`],[`9`,`10`,`11`,`12`],[`13`,`14`,`15`,`16`]];function at(){let e=[],t=36;for(let n=0;n<4;n++)for(let r=0;r<4;r++)e.push({id:`pad-${it[n][r]}`,label:it[n][r],shape:`pad`,position:{row:n,col:r},midi:{note:t++,channel:10}});return e}var ot={id:`sp404mkii`,name:`Roland SP-404MKII`,gridDimensions:{rows:4,cols:4},banks:[`A`,`B`,`C`,`D`],controls:at(),classMapping:{kick:`pad-1`,snare:`pad-2`,hat:`pad-3`},decorative:[`BUS FX`,`HOLD`,`EXT SOURCE`,`SUB PAD`]};function st(){let e=[],t=60;for(let n=1;n<=16;n++)e.push({id:`key-${n}`,label:String(n),shape:`key`,position:{row:0,col:n-1},midi:{note:t++,channel:1}});return e}var ct={id:`po33`,name:`Pocket Operator PO-33 K.O!`,gridDimensions:null,controls:st(),classMapping:{kick:`key-1`,snare:`key-2`,hat:`key-3`}},lt=class extends EventTarget{emit(e){this.dispatchEvent(new CustomEvent(`beat`,{detail:e}))}},ut=Re(`device-config`),dt=Re(`beat-bus`),K={kick:{fg:`#ff5a3c`,glow:`rgba(255, 90, 60, 0.6)`,label:`KICK`},snare:{fg:`#38e1ff`,glow:`rgba(56, 225, 255, 0.6)`,label:`SNARE`},hat:{fg:`#ffd23a`,glow:`rgba(255, 210, 58, 0.6)`,label:`HAT`}},q=[`hat`,`snare`,`kick`];function J(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Y=class extends B{constructor(...e){super(...e),this.assignedClass=null,this.active=!1,this.hitCount=0}render(){let e=this.assignedClass?K[this.assignedClass]:null;return P`
      <button
        type="button"
        class="pad"
        part="pad"
        ?data-hit=${this.hitCount>0}
        style=${e?`--class-fg: ${e.fg}; --class-glow: ${e.glow};`:``}
      >
        ${e?P`<span class="led"></span>`:I}
        ${this.hitCount>0?P`<span class="count">×${this.hitCount}</span>`:I}
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
      gap: 2px;
      position: relative;
      border-radius: 9px;
      border: 1px solid var(--pad-border, #34343c);
      background: linear-gradient(180deg, #232329 0%, #17171b 100%);
      color: var(--pad-fg, #8b8f9a);
      font: 600 15px/1 ui-monospace, monospace;
      cursor: default;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.04),
        0 1px 2px rgba(0, 0, 0, 0.4);
      transition:
        background-color 80ms ease-out,
        border-color 80ms ease-out,
        transform 80ms ease-out,
        box-shadow 80ms ease-out;
    }

    /* Persists for the rest of the session once a pad has been hit at
       least once — the "was this kick actually detected" answer, without
       needing to catch the instant it happened. */
    .pad[data-hit] {
      border-color: var(--class-fg, var(--accent, #ffb020));
      box-shadow: 0 0 10px var(--class-glow, rgba(255, 176, 32, 0.35));
    }

    .led {
      position: absolute;
      top: 7px;
      right: 7px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
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
      font: 700 8px/1 ui-monospace, monospace;
      color: var(--class-fg, #ffb020);
      opacity: 0.9;
    }

    .label {
      font-size: 16px;
    }

    .sub {
      font-size: 8px;
      letter-spacing: 0.08em;
      color: var(--class-fg, transparent);
      opacity: 0.75;
      min-height: 8px;
    }

    :host([active]) .pad {
      background: color-mix(in srgb, var(--class-fg, #ffb020) 22%, #1c1c22);
      border-color: var(--class-fg, #ffb020);
      box-shadow:
        0 0 16px var(--class-glow, rgba(255, 176, 32, 0.6)),
        inset 0 0 12px var(--class-glow, rgba(255, 176, 32, 0.4));
      transform: scale(0.96);
      color: #fff;
    }

    :host([active]) .led {
      opacity: 1;
    }
  `}};J([H({attribute:!1})],Y.prototype,`control`,void 0),J([H({attribute:!1})],Y.prototype,`assignedClass`,void 0),J([H({type:Boolean,reflect:!0})],Y.prototype,`active`,void 0),J([H({type:Number})],Y.prototype,`hitCount`,void 0),Y=J([V(`pad-control`)],Y);var ft=220,X=class extends B{constructor(...e){super(...e),this.hitCounts={},this.activeControlId=null,this.flashTimer=null,this.onBeat=e=>{this.activeControlId=e.detail.controlId,this.flashTimer&&clearTimeout(this.flashTimer),this.flashTimer=setTimeout(()=>{this.activeControlId=null},ft)}}connectedCallback(){super.connectedCallback(),this.bus.addEventListener(`beat`,this.onBeat)}disconnectedCallback(){super.disconnectedCallback(),this.bus.removeEventListener(`beat`,this.onBeat),this.flashTimer&&clearTimeout(this.flashTimer)}render(){let{gridDimensions:e,controls:t,classMapping:n,decorative:r}=this.deviceConfig,i=new Map;for(let[e,t]of Object.entries(n))i.set(t,e);return P`
      <div class="layout">
        <div class="grid" style=${e?`grid-template-columns: repeat(${e.cols}, 1fr); grid-template-rows: repeat(${e.rows}, 1fr);`:`grid-template-columns: repeat(auto-fill, minmax(48px, 1fr)); grid-auto-rows: 48px;`}>
          ${t.map(t=>P`
              <pad-control
                .control=${t}
                .assignedClass=${i.get(t.id)??null}
                ?active=${this.activeControlId===t.id}
                .hitCount=${this.hitCounts[t.id]??0}
                style=${e?`grid-row: ${t.position.row+1}; grid-column: ${t.position.col+1};`:``}
              ></pad-control>
            `)}
        </div>
        ${e&&r?P`
              <div class="accessory-column">
                ${r.map(e=>P`<div class="accessory">${e}</div>`)}
              </div>
            `:I}
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
    }

    .layout {
      display: flex;
      gap: 10px;
    }

    .grid {
      display: grid;
      gap: 10px;
      flex: 1;
      max-width: 420px;
    }

    .accessory-column {
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      gap: 10px;
      width: 84px;
    }

    .accessory {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 4px;
      border-radius: 9px;
      border: 1px dashed #34343c;
      background: repeating-linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.015) 0px,
        rgba(255, 255, 255, 0.015) 2px,
        transparent 2px,
        transparent 6px
      );
      color: #55555f;
      font: 700 8px/1.2 ui-monospace, monospace;
      letter-spacing: 0.05em;
    }
  `}};J([We({context:dt})],X.prototype,`bus`,void 0),J([We({context:ut,subscribe:!0})],X.prototype,`deviceConfig`,void 0),J([H({attribute:!1})],X.prototype,`hitCounts`,void 0),J([U()],X.prototype,`activeControlId`,void 0),X=J([V(`pad-grid`)],X);var pt=6e3,mt=q,ht=.88,gt=class extends B{constructor(...e){super(...e),this.canvas=null,this.ctx2d=null,this.events=[],this.rafId=0,this.dpr=Math.min(window.devicePixelRatio||1,2),this.resizeObserver=null,this.onBeat=e=>{this.events.push(e.detail)},this.draw=()=>{this.rafId=requestAnimationFrame(this.draw);let e=this.ctx2d,t=this.canvas;if(!e||!t||t.width===0)return;let n=performance.now();this.events=this.events.filter(e=>n-e.timestamp<pt);let r=t.width,i=t.height,a=i/mt.length,o=r*ht;e.fillStyle=`rgba(8, 8, 11, 0.32)`,e.fillRect(0,0,r,i),e.strokeStyle=`rgba(255, 255, 255, 0.05)`,e.lineWidth=this.dpr;for(let t=1;t<mt.length;t++){let n=t*a;e.beginPath(),e.moveTo(0,n),e.lineTo(r,n),e.stroke()}e.strokeStyle=`rgba(255, 176, 32, 0.45)`,e.lineWidth=2*this.dpr,e.beginPath(),e.moveTo(o,0),e.lineTo(o,i),e.stroke();for(let t of this.events){let r=(n-t.timestamp)/pt,i=o*(1-r),s=mt.indexOf(t.class);if(s===-1)continue;let c=s*a+a/2,l=K[t.class],u=(4+t.confidence*6)*this.dpr;e.save(),e.globalAlpha=Math.max(0,1-r),e.shadowColor=l.fg,e.shadowBlur=14*this.dpr,e.fillStyle=l.fg,e.beginPath(),e.arc(i,c,u,0,Math.PI*2),e.fill(),e.restore()}}}connectedCallback(){super.connectedCallback(),this.bus.addEventListener(`beat`,this.onBeat)}disconnectedCallback(){super.disconnectedCallback(),this.bus.removeEventListener(`beat`,this.onBeat),this.resizeObserver?.disconnect(),cancelAnimationFrame(this.rafId)}firstUpdated(){this.canvas=this.renderRoot.querySelector(`canvas`),this.ctx2d=this.canvas?.getContext(`2d`)??null,this.resizeObserver=new ResizeObserver(()=>this.resize()),this.canvas&&this.resizeObserver.observe(this.canvas),this.resize(),this.rafId=requestAnimationFrame(this.draw)}resize(){if(!this.canvas)return;let e=this.canvas.getBoundingClientRect();this.canvas.width=Math.max(1,e.width*this.dpr),this.canvas.height=Math.max(1,e.height*this.dpr)}render(){return P`
      <div class="wrap">
        <div class="lane-labels">
          ${mt.map(e=>P`<span style="color:${K[e].fg}">${K[e].label}</span>`)}
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
      border-radius: 8px;
      background: #08080b;
      border: 1px solid var(--border, #2e303a);
    }

    .lane-labels {
      position: absolute;
      left: 10px;
      top: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font: 700 9px/1 ui-monospace, monospace;
      letter-spacing: 0.08em;
      pointer-events: none;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
    }
  `}};J([We({context:dt})],gt.prototype,`bus`,void 0),gt=J([V(`beat-timeline`)],gt);var _t=26,vt=16,yt=class extends B{constructor(...e){super(...e),this.pattern={steps:[],totalSteps:vt},this.padLabels={}}render(){let e=new Map;for(let t of q)e.set(t,new Set);for(let t of this.pattern.steps)e.get(t.class)?.add(t.step);let t=Array.from({length:this.pattern.totalSteps},(e,t)=>t);return P`
      <div class="pattern">
        <div class="lane-labels">
          ${q.map(e=>P`
              <div class="lane-label" style="color: ${K[e].fg}">
                <span>${K[e].label}</span>
                ${this.padLabels[e]?P`<b>P${this.padLabels[e]}</b>`:``}
              </div>
            `)}
        </div>
        <div class="scroll">
          <div class="lanes-steps" style="width: ${t.length*_t}px">
            ${q.map(n=>{let r=e.get(n);return P`
                <div class="step-row">
                  ${t.map(e=>P`
                      <div
                        class="step"
                        ?data-bar-start=${e%vt===0}
                        ?data-beat-start=${e%4==0}
                        ?data-hit=${r.has(e)}
                        style="--class-fg: ${K[n].fg}; --class-glow: ${K[n].glow}"
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
      border: 1px solid var(--border, #2e303a);
      border-radius: 8px;
      background: #08080b;
      overflow: hidden;
    }

    .lane-labels {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      border-right: 1px solid var(--border, #2e303a);
    }

    .lane-label {
      height: 32px;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 10px;
      font: 700 10px/1 ui-monospace, monospace;
      letter-spacing: 0.06em;
      white-space: nowrap;
    }

    .lane-label b {
      opacity: 0.7;
      font-weight: 700;
    }

    .scroll {
      overflow-x: auto;
      flex: 1;
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
      width: ${_t}px;
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
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.04);
      transition:
        background-color 80ms,
        box-shadow 80ms;
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
  `}};J([H({attribute:!1})],yt.prototype,`pattern`,void 0),J([H({attribute:!1})],yt.prototype,`padLabels`,void 0),yt=J([V(`pattern-grid`)],yt);var bt=class extends B{constructor(...e){super(...e),this.banks=[],this.active=``}select(e){this.dispatchEvent(new CustomEvent(`bank-change`,{detail:e,bubbles:!0,composed:!0}))}render(){return this.banks.length===0?I:P`
      <div class="row">
        ${this.banks.map(e=>P`
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
      gap: 6px;
    }

    button {
      flex: 1;
      padding: 7px 4px;
      font: 700 12px/1 ui-monospace, monospace;
      letter-spacing: 0.05em;
      border-radius: 5px;
      border: 1px solid #3a3a44;
      background: linear-gradient(#232329, #16161a);
      color: #9ca3af;
      cursor: pointer;
      transition:
        border-color 100ms,
        color 100ms,
        box-shadow 100ms;
    }

    button.active {
      border-color: var(--accent, #ffb020);
      color: var(--accent, #ffb020);
      box-shadow: 0 0 8px rgba(255, 176, 32, 0.4);
    }
  `}};J([H({attribute:!1})],bt.prototype,`banks`,void 0),J([H({type:String})],bt.prototype,`active`,void 0),bt=J([V(`bank-selector`)],bt);var xt=140,Z=class extends B{constructor(...e){super(...e),this.min=0,this.max=1,this.value=0,this.label=``,this.dragStartY=0,this.dragStartValue=0,this.dragging=!1,this.onPointerDown=e=>{this.dragging=!0,this.dragStartY=e.clientY,this.dragStartValue=this.value,e.currentTarget.setPointerCapture(e.pointerId)},this.onPointerMove=e=>{if(!this.dragging)return;let t=this.dragStartY-e.clientY,n=this.max-this.min,r=this.dragStartValue+t/xt*n;this.value=Math.min(this.max,Math.max(this.min,r)),this.dispatchEvent(new CustomEvent(`value-change`,{detail:this.value,bubbles:!0,composed:!0}))},this.onPointerUp=e=>{this.dragging=!1,e.currentTarget.releasePointerCapture(e.pointerId)}}get ratio(){return(this.value-this.min)/(this.max-this.min)}render(){return P`
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
      gap: 6px;
      user-select: none;
      touch-action: none;
    }

    .knob {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #4a4a54, #1a1a20 72%);
      border: 1px solid #3a3a44;
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
      background: var(--accent, #ffb020);
      transform-origin: 50% 100%;
      transform: translate(-50%, -100%) rotate(var(--angle));
      border-radius: 1px;
      box-shadow: 0 0 5px var(--accent, #ffb020);
      pointer-events: none;
    }

    .label {
      font: 700 9px/1 ui-monospace, monospace;
      letter-spacing: 0.08em;
      color: var(--text-dim, #6b6b78);
    }
  `}};J([H({type:Number})],Z.prototype,`min`,void 0),J([H({type:Number})],Z.prototype,`max`,void 0),J([H({type:Number})],Z.prototype,`value`,void 0),J([H({type:String})],Z.prototype,`label`,void 0),Z=J([V(`knob-control`)],Z);var St=.3,Q=class extends B{constructor(...e){super(...e),this.level=0,this.threshold=0}render(){let e=Math.min(100,this.level/St*100),t=Math.min(100,this.threshold/St*100);return P`
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
      border-radius: 3px;
      background: #101014;
      border: 1px solid #2e2e36;
      overflow: hidden;
    }

    .fill {
      height: 100%;
      background: linear-gradient(90deg, #38e1ff, var(--accent, #ffb020));
      transition: width 40ms linear;
    }

    .track[data-hot] .fill {
      background: linear-gradient(90deg, var(--accent, #ffb020), #ff5a3c);
    }

    .marker {
      position: absolute;
      top: -2px;
      bottom: -2px;
      width: 2px;
      background: rgba(255, 255, 255, 0.65);
    }
  `}};J([H({type:Number})],Q.prototype,`level`,void 0),J([H({type:Number})],Q.prototype,`threshold`,void 0),Q=J([V(`level-meter`)],Q);var Ct=[ot,ct],wt=.02,Tt=.2,Et=.5,Dt=2,$=class extends B{constructor(...e){super(...e),this.engine=new Ye,this.bus=new lt,this.deviceConfig=Ct[0],this.engineState=W.IDLE,this.errorMessage=null,this.infoMessage=null,this.activeBank=this.deviceConfig.banks?.[0]??``,this.lastResult=null,this.level=0,this.sensitivity=qe.rmsThreshold,this.tone=1,this.sessionPhase=`idle`,this.recordedHits=[],this.hitCounts={},this.bpm=100,this.pattern={steps:[],totalSteps:16},this.thresholds={...Xe},this.recordingStartedAt=0,this.onEngineStateChange=e=>{this.engineState=e.detail,e.detail===W.IDLE&&(this.level=0)},this.onEngineError=e=>{this.errorMessage=e.detail.message,this.sessionPhase=`idle`},this.onLevel=e=>{this.level=e.detail},this.onTransient=e=>{let t=this.engine.getSampleRate();if(!t||this.sessionPhase!==`recording`)return;let n=Qe(e.detail,t,this.engine.getFftSize(),this.thresholds),r=rt(this.deviceConfig,this.deviceConfig.classMapping[n.class]);if(!r)return;this.lastResult={class:n.class,confidence:n.confidence};let i={class:n.class,controlId:r.id,controlLabel:r.label,confidence:n.confidence,timeMs:performance.now()-this.recordingStartedAt};this.recordedHits=[...this.recordedHits,i],this.hitCounts={...this.hitCounts,[r.id]:(this.hitCounts[r.id]??0)+1},this.bus.emit({class:n.class,confidence:n.confidence,controlId:r.id,timestamp:performance.now()})},this.onDeviceChange=e=>{let t=e.target.value,n=Ct.find(e=>e.id===t);n&&(this.deviceConfig=n,this.activeBank=n.banks?.[0]??``,this.sessionPhase===`recording`&&this.engine.stop(),this.sessionPhase=`idle`,this.recordedHits=[],this.hitCounts={})},this.onBankChange=e=>{this.activeBank=e.detail},this.onSensitivityChange=e=>{this.sensitivity=e.detail,this.engine.updateConfig({rmsThreshold:this.sensitivity})},this.onToneChange=e=>{this.tone=e.detail,this.thresholds={...this.thresholds,centroidKickMax:Xe.centroidKickMax*this.tone,centroidHatMin:Xe.centroidHatMin*this.tone}}}connectedCallback(){super.connectedCallback(),this.engine.addEventListener(`state-change`,this.onEngineStateChange),this.engine.addEventListener(`transient-detected`,this.onTransient),this.engine.addEventListener(`error`,this.onEngineError),this.engine.addEventListener(`level`,this.onLevel)}disconnectedCallback(){super.disconnectedCallback(),this.engine.removeEventListener(`state-change`,this.onEngineStateChange),this.engine.removeEventListener(`transient-detected`,this.onTransient),this.engine.removeEventListener(`error`,this.onEngineError),this.engine.removeEventListener(`level`,this.onLevel),this.engine.stop()}async handleRecordButton(){if(this.errorMessage=null,this.infoMessage=null,this.sessionPhase===`recording`){this.engine.stop(),this.finishRecording();return}this.recordedHits=[],this.hitCounts={},this.pattern={steps:[],totalSteps:16},this.lastResult=null,this.sessionPhase=`recording`,this.recordingStartedAt=performance.now(),await this.engine.start()}finishRecording(){if(this.recordedHits.length===0){this.sessionPhase=`idle`,this.infoMessage=`No hits detected — try lowering SENS (or beatboxing louder/closer to the mic) and record again.`;return}this.bpm=tt(this.recordedHits),this.pattern=nt(this.recordedHits,this.bpm),this.sessionPhase=`reviewing`}adjustBpm(e){this.bpm=Math.min(180,Math.max(60,this.bpm+e)),this.pattern=nt(this.recordedHits,this.bpm)}render(){let e=this.sessionPhase===`recording`,t=this.lastResult?K[this.lastResult.class].fg:`var(--accent)`,n=this.sessionPhase===`recording`?`recording`:this.sessionPhase===`reviewing`?`complete`:this.engineState.replace(`_`,` `),r=this.sessionPhase===`recording`?`STOP`:this.sessionPhase===`reviewing`?`RECORD AGAIN`:`RECORD`,i={};for(let e of q){let t=rt(this.deviceConfig,this.deviceConfig.classMapping[e]);t&&(i[e]=t.label)}return P`
      <div class="panel">
        <span class="screw tl"></span>
        <span class="screw tr"></span>
        <span class="screw bl"></span>
        <span class="screw br"></span>

        <header>
          <div class="wordmark">
            <h1>BEAT // MAPPER</h1>
            <p class="subtitle">voice-to-pattern transcription</p>
          </div>

          <div class="knobs">
            <knob-control
              label="SENS"
              .min=${wt}
              .max=${Tt}
              .value=${this.sensitivity}
              @value-change=${this.onSensitivityChange}
            ></knob-control>
            <knob-control
              label="TONE"
              .min=${Et}
              .max=${Dt}
              .value=${this.tone}
              @value-change=${this.onToneChange}
            ></knob-control>
          </div>
        </header>

        <div class="display-row">
          <div class="readout" style="--readout-color: ${t}; --level: ${Math.min(1,this.level*6)}">
            <div class="readout-ring" ?data-phase-recording=${e}></div>
            <div class="readout-inner">
              <span class="readout-state" data-phase=${this.sessionPhase}>${n}</span>
              <span class="readout-class">${this.lastResult?K[this.lastResult.class].label:`--`}</span>
            </div>
          </div>

          <div class="transport">
            <select @change=${this.onDeviceChange} ?disabled=${e}>
              ${Ct.map(e=>P`<option value=${e.id}>${e.name}</option>`)}
            </select>
            <button type="button" class="rec-button" ?data-active=${e} @click=${()=>this.handleRecordButton()}>
              <span class="dot"></span>
              ${r}
            </button>
            ${e?P`
                  <div class="level-row">
                    <span class="level-label">MIC</span>
                    <level-meter .level=${this.level} .threshold=${this.sensitivity}></level-meter>
                  </div>
                `:``}
            ${this.errorMessage?P`<p class="error">${this.errorMessage}</p>`:``}
            ${this.infoMessage?P`<p class="info">${this.infoMessage}</p>`:``}
          </div>
        </div>

        ${this.deviceConfig.banks?P`
              <div class="bank-row">
                <span class="bank-label">SET</span>
                <bank-selector
                  .banks=${this.deviceConfig.banks}
                  .active=${this.activeBank}
                  @bank-change=${this.onBankChange}
                ></bank-selector>
              </div>
            `:``}

        <main>
          <pad-grid .hitCounts=${this.hitCounts}></pad-grid>
        </main>

        <footer>
          ${this.sessionPhase===`reviewing`?P`
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
                <pattern-grid .pattern=${this.pattern} .padLabels=${i}></pattern-grid>
              `:P`<beat-timeline></beat-timeline>`}
        </footer>
      </div>
    `}static{this.styles=h`
    :host {
      display: block;
      max-width: 640px;
      margin: 0 auto;
      padding: 32px 20px;
      font: 16px/1.5 system-ui, sans-serif;
      color: var(--text, #e5e7eb);
      --accent: #ffb020;
    }

    .panel {
      position: relative;
      padding: 28px 28px 24px;
      border-radius: 22px;
      background:
        radial-gradient(circle at 15% -10%, rgba(255, 255, 255, 0.05), transparent 40%),
        linear-gradient(180deg, #26262c 0%, #1a1a1f 100%);
      border: 1px solid #34343c;
      box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
      overflow: hidden;
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

    .screw {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #6a6a72, #1a1a1e 70%);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
    }

    .screw.tl {
      top: 12px;
      left: 12px;
    }
    .screw.tr {
      top: 12px;
      right: 12px;
    }
    .screw.bl {
      bottom: 12px;
      left: 12px;
    }
    .screw.br {
      bottom: 12px;
      right: 12px;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
      position: relative;
    }

    .wordmark h1 {
      font: 800 18px/1 ui-monospace, monospace;
      letter-spacing: 0.06em;
      margin: 0;
      color: #f4f4f6;
    }

    .subtitle {
      margin: 4px 0 0;
      font-size: 11px;
      color: #6b6b78;
      letter-spacing: 0.03em;
    }

    .knobs {
      display: flex;
      gap: 18px;
    }

    .display-row {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
      position: relative;
    }

    .readout {
      --level: 0;
      width: 96px;
      height: 96px;
      flex-shrink: 0;
      border-radius: 50%;
      background: radial-gradient(circle at 40% 30%, #1c1c22, #0a0a0d 75%);
      border: 3px solid #303038;
      position: relative;
      display: grid;
      place-items: center;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.6);
    }

    .readout-ring {
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 2px solid var(--readout-color, var(--accent));
      opacity: calc(0.25 + var(--level) * 0.6);
      box-shadow: 0 0 calc(6px + var(--level) * 18px) var(--readout-color, var(--accent));
      transition: opacity 60ms linear;
    }

    .readout-ring[data-phase-recording] {
      animation: rec-pulse 1.4s ease-in-out infinite;
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
      gap: 2px;
    }

    .readout-state {
      font: 700 8px/1 ui-monospace, monospace;
      letter-spacing: 0.08em;
      color: #6b6b78;
      text-transform: uppercase;
      transition: color 120ms;
    }

    .readout-state[data-phase='recording'] {
      color: #ff4444;
    }

    .readout-state[data-phase='reviewing'] {
      color: #4ade80;
    }

    .readout-class {
      font: 800 15px/1 ui-monospace, monospace;
      letter-spacing: 0.05em;
      color: var(--readout-color, var(--accent));
      text-shadow: 0 0 10px var(--readout-color, var(--accent));
    }

    .transport {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }

    select {
      font: 600 13px ui-monospace, monospace;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid #3a3a44;
      background: #1c1c22;
      color: #d1d5db;
    }

    select:disabled {
      opacity: 0.5;
    }

    .rec-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      width: fit-content;
      font: 700 12px/1 ui-monospace, monospace;
      letter-spacing: 0.08em;
      padding: 9px 16px;
      border-radius: 20px;
      border: 1px solid #3a3a44;
      background: #1c1c22;
      color: #d1d5db;
      cursor: pointer;
      transition:
        background-color 120ms,
        border-color 120ms;
    }

    .rec-button .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #6b2c2c;
    }

    .rec-button[data-active] {
      background: #2a1414;
      border-color: #ff4444;
      color: #ffb4b4;
    }

    .rec-button[data-active] .dot {
      background: #ff3b3b;
      box-shadow: 0 0 8px #ff3b3b;
      animation: pulse 1.1s ease-in-out infinite;
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
      color: #f87171;
      font-size: 12px;
      margin: 0;
    }

    .info {
      color: var(--accent);
      font-size: 12px;
      margin: 0;
    }

    .level-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .level-label {
      font: 700 9px/1 ui-monospace, monospace;
      letter-spacing: 0.08em;
      color: #6b6b78;
      flex-shrink: 0;
    }

    .level-row level-meter {
      flex: 1;
    }

    .bank-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    .bank-label {
      font: 700 10px/1 ui-monospace, monospace;
      letter-spacing: 0.1em;
      color: #6b6b78;
      flex-shrink: 0;
    }

    main {
      margin-bottom: 20px;
    }

    footer {
      display: block;
    }

    .pattern-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .pattern-meta {
      font: 600 11px/1 ui-monospace, monospace;
      color: #9ca3af;
      display: flex;
      gap: 6px;
    }

    .pattern-meta .dim {
      color: #4b4b54;
    }

    .bpm-control {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bpm-control button {
      width: 22px;
      height: 22px;
      border-radius: 5px;
      border: 1px solid #3a3a44;
      background: #1c1c22;
      color: #d1d5db;
      font: 700 13px/1 ui-monospace, monospace;
      cursor: pointer;
    }

    .bpm-value {
      font: 700 11px/1 ui-monospace, monospace;
      color: var(--accent);
      min-width: 56px;
      text-align: center;
    }
  `}};J([Ue({context:dt})],$.prototype,`bus`,void 0),J([Ue({context:ut}),U()],$.prototype,`deviceConfig`,void 0),J([U()],$.prototype,`engineState`,void 0),J([U()],$.prototype,`errorMessage`,void 0),J([U()],$.prototype,`infoMessage`,void 0),J([U()],$.prototype,`activeBank`,void 0),J([U()],$.prototype,`lastResult`,void 0),J([U()],$.prototype,`level`,void 0),J([U()],$.prototype,`sensitivity`,void 0),J([U()],$.prototype,`tone`,void 0),J([U()],$.prototype,`sessionPhase`,void 0),J([U()],$.prototype,`recordedHits`,void 0),J([U()],$.prototype,`hitCounts`,void 0),J([U()],$.prototype,`bpm`,void 0),J([U()],$.prototype,`pattern`,void 0),$=J([V(`app-root`)],$);