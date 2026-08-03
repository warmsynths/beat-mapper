var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=`@font-face{font-family:Fraunces;font-style:normal;font-display:swap;font-weight:600;src:url(`+new URL(`assets/fraunces-vietnamese-600-normal-BjlAJixd.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/fraunces-vietnamese-600-normal-DlAl5EAR.woff`,import.meta.url).href+`)format("woff");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Fraunces;font-style:normal;font-display:swap;font-weight:600;src:url(`+new URL(`assets/fraunces-latin-ext-600-normal-BtzmzP0X.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/fraunces-latin-ext-600-normal-B0Dy4lqi.woff`,import.meta.url).href+`)format("woff");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Fraunces;font-style:normal;font-display:swap;font-weight:600;src:url(`+new URL(`assets/fraunces-latin-600-normal-BFCDtZfi.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/fraunces-latin-600-normal-DL5QCzvS.woff`,import.meta.url).href+`)format("woff");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`,u=`@font-face{font-family:Fraunces;font-style:normal;font-display:swap;font-weight:900;src:url(`+new URL(`assets/fraunces-vietnamese-900-normal-BwLbQoNo.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/fraunces-vietnamese-900-normal-22-IZO0F.woff`,import.meta.url).href+`)format("woff");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Fraunces;font-style:normal;font-display:swap;font-weight:900;src:url(`+new URL(`assets/fraunces-latin-ext-900-normal-B8j5GSzS.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/fraunces-latin-ext-900-normal-B2hmprcz.woff`,import.meta.url).href+`)format("woff");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Fraunces;font-style:normal;font-display:swap;font-weight:900;src:url(`+new URL(`assets/fraunces-latin-900-normal-DmBL83SS.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/fraunces-latin-900-normal-D67OkaMf.woff`,import.meta.url).href+`)format("woff");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`,d=`@font-face{font-family:Fraunces;font-style:italic;font-display:swap;font-weight:400;src:url(`+new URL(`assets/fraunces-vietnamese-400-italic-BTOWH4O7.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/fraunces-vietnamese-400-italic-CO9zBbpA.woff`,import.meta.url).href+`)format("woff");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Fraunces;font-style:italic;font-display:swap;font-weight:400;src:url(`+new URL(`assets/fraunces-latin-ext-400-italic-jodr80a5.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/fraunces-latin-ext-400-italic-CGHg0U1I.woff`,import.meta.url).href+`)format("woff");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Fraunces;font-style:italic;font-display:swap;font-weight:400;src:url(`+new URL(`assets/fraunces-latin-400-italic-ChpO6tcr.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/fraunces-latin-400-italic-B7iDoVhm.woff`,import.meta.url).href+`)format("woff");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`,f=`@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:500;src:url(`+new URL(`assets/inter-cyrillic-ext-500-normal-B0yAr1jD.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-cyrillic-ext-500-normal-BmqWE9Dz.woff`,import.meta.url).href+`)format("woff");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:500;src:url(`+new URL(`assets/inter-cyrillic-500-normal-BasfLYem.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-cyrillic-500-normal-CxZf_p3X.woff`,import.meta.url).href+`)format("woff");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:500;src:url(`+new URL(`assets/inter-greek-ext-500-normal-C4iEst2y.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-greek-ext-500-normal-2j5mBUwD.woff`,import.meta.url).href+`)format("woff");unicode-range:U+1F??}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:500;src:url(`+new URL(`assets/inter-greek-500-normal-BIZE56-Y.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-greek-500-normal-Xzm54t5V.woff`,import.meta.url).href+`)format("woff");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:500;src:url(`+new URL(`assets/inter-vietnamese-500-normal-DOriooB6.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-vietnamese-500-normal-mJboJaSs.woff`,import.meta.url).href+`)format("woff");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:500;src:url(`+new URL(`assets/inter-latin-ext-500-normal-CV4jyFjo.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-latin-ext-500-normal-BxGbmqWO.woff`,import.meta.url).href+`)format("woff");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:500;src:url(`+new URL(`assets/inter-latin-500-normal-Cerq10X2.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-latin-500-normal-BL9OpVg8.woff`,import.meta.url).href+`)format("woff");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`,p=`@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:700;src:url(`+new URL(`assets/inter-cyrillic-ext-700-normal-BjwYoWNd.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-cyrillic-ext-700-normal-LO58E6JB.woff`,import.meta.url).href+`)format("woff");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:700;src:url(`+new URL(`assets/inter-cyrillic-700-normal-CjBOestx.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-cyrillic-700-normal-DrXBdSj3.woff`,import.meta.url).href+`)format("woff");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:700;src:url(`+new URL(`assets/inter-greek-ext-700-normal-qfdV9bQt.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-greek-ext-700-normal-BoQ6DsYi.woff`,import.meta.url).href+`)format("woff");unicode-range:U+1F??}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:700;src:url(`+new URL(`assets/inter-greek-700-normal-C3JjAnD8.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-greek-700-normal-BUv2fZ6O.woff`,import.meta.url).href+`)format("woff");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:700;src:url(`+new URL(`assets/inter-vietnamese-700-normal-DlLaEgI2.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-vietnamese-700-normal-BZaoP0fm.woff`,import.meta.url).href+`)format("woff");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:700;src:url(`+new URL(`assets/inter-latin-ext-700-normal-Ca8adRJv.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-latin-ext-700-normal-TidjK2hL.woff`,import.meta.url).href+`)format("woff");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter;font-style:normal;font-display:swap;font-weight:700;src:url(`+new URL(`assets/inter-latin-700-normal-Yt3aPRUw.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/inter-latin-700-normal-BLAVimhd.woff`,import.meta.url).href+`)format("woff");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`,m=`@font-face{font-family:JetBrains Mono;font-style:normal;font-display:swap;font-weight:500;src:url(data:font/woff2;base64,d09GMgABAAAAAASUABAAAAAACRAAAAQ3AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGhwbHhwoBmA/U1RBVEwAdBEICoRkg3oLIAABNgIkAzoEIAWFHgeBFAwHG3AHKB4HzukrRjyF5Gb4kQ/B873d17mv8TWkoqUUGaHodJCtoqntw7m8tiPWyGkfWDU/IMpzVk4zAs9Czv3c7Os5NvKFG1Ht9vBVXySRZpJc4tTrbM3sTRFcLa3zVboKWRIoAksKSKgqUQWEwlSoqjp44V5J9/kjd0+Fi5xaFjwJArgBAIJgIAgCCAI4CdNMqGuYXYUKdADLAkAAJwl6iX0+bZqEm1AH0Hu9rvrJHwxQG1Q/gFYwWYbgTRWgwEESVzbmtjQAt3DXO7Tu/+9Q/KNKWhTCgZ8fQSWoL0CUUgTBjgL8iEAcce7YHBeA8ZvogieCnxI0BCVeACCAAhBD/oDcAdUPABSgAX4kBPBTwjCAjwYSCneiqF65LUo/qXdYFrRwTujtMrKm07plTbSqLQFAiHBN7E4DG5wkiGXhCYBNETh3K/AciHN69iFfQjFOr9EXQQAAQXRNszs8PR0OH4fDV/dwGe76CHdj1MQa11DXYGcfZ6+B1X0OfwjY+i7KpQ1w9d+1z3/HydCB1f3U8A0fRFv+0bXxPWrZu3d9Nn4UcbLs/QCXLH/j3PCKblKOiZxLOR78W9brPo7eGTLz/F27ZPmePQdCB1YP4nJU91o4gU9cy64L3c3SPu8GfDn6ZXD2cGmllVqSxtD5vCXHm5xaeHlnpffx7DcPvXog5NnjA//cPz2btsz3yf+0MI8ri33tuv7upNbYmW5STbosW8bYItV/SPzxvXC0KnpWnFdC91oojit5Lyo6WcJQ1YzwBYbi52ohJVpcxfcHBqsv0nFz8U74rzS6M7r0RVlXZ3jJC4G92O//7Lm78VOtnUx+aQxAzsqPnrRr1t9zDrezKePvZ027x+fGte4s4NXu7/jEp3G9cM1bICYgACbuETUUD5wmenGXA/IBpAKVrl0AEJ5cqr6Q89tGq+SpqkDfX2DtG+pZ9teuae0AX98c301CX179InyErnSG8WCiABB4HFbVrw/lpTdBIOk82nXbpHKoQGyBpUovAAD4XQA8ZTUCeBJHIpI0v0FRrgcnckV3ANckrwYJKXEihQfdSKPER6XeExmEeEMmSe6QBwWmkZdmSOSthhibgIkBlUYreBKd/0NeVAE9WAyEaQpH6KikDWlUVg43Jy2FOmaYlsZhDEGZXO3mWEyWHI6zuaJkMlcSQ9k4F+KidIiFyZItGDc7r1pUj6wP6zrWB0/fbeeFeHl4YOvETMNiM8Ny+7OO6Qh2wur20YVxFts5dlORdl5Kwd5utR7SRcxqX8RA5Ehacha76hg7c6yzNm/Xf6vOLNrv544lIEkWg7xWo/ItBAeIJEmt0XgBwgM8gTifoiiLJroYYooNTeziEKe4zOoR/wvIKp89hSr+6jFAqw/LaonjmZHSscMNg4iPlWpFrO1RN3zkMU+/xUP+JQ99TbvTl1Vg0gtirT6lbwYAAAA=)format("woff2"),url(data:font/woff;base64,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)format("woff");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:JetBrains Mono;font-style:normal;font-display:swap;font-weight:500;src:url(`+new URL(`assets/jetbrains-mono-cyrillic-500-normal-DmUKJPL_.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/jetbrains-mono-cyrillic-500-normal-DJqRU3vO.woff`,import.meta.url).href+`)format("woff");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:JetBrains Mono;font-style:normal;font-display:swap;font-weight:500;src:url(`+new URL(`assets/jetbrains-mono-greek-500-normal-JpySY46c.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/jetbrains-mono-greek-500-normal-D7SFKleX.woff`,import.meta.url).href+`)format("woff");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:JetBrains Mono;font-style:normal;font-display:swap;font-weight:500;src:url(data:font/woff2;base64,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)format("woff2"),url(`+new URL(`assets/jetbrains-mono-vietnamese-500-normal-DNRqzVM1.woff`,import.meta.url).href+`)format("woff");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:JetBrains Mono;font-style:normal;font-display:swap;font-weight:500;src:url(`+new URL(`assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/jetbrains-mono-latin-ext-500-normal-ckzbgY84.woff`,import.meta.url).href+`)format("woff");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:JetBrains Mono;font-style:normal;font-display:swap;font-weight:500;src:url(`+new URL(`assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/jetbrains-mono-latin-500-normal-CJOVTJB7.woff`,import.meta.url).href+`)format("woff");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`,h=`@font-face{font-family:JetBrains Mono;font-style:normal;font-display:swap;font-weight:700;src:url(data:font/woff2;base64,d09GMgABAAAAAASAABAAAAAACNgAAAQlAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGhwbHhwoBmA/U1RBVEwAdBEICoRkg3gLIAABNgIkAzoEIAWEaAeBFAwHGzgHSJ4DbjN9OmtkIy0becnT/RjJ4uGfw99974/GXrhoTCqLok66NY3jTloEUdrmwCevn/Ls30xSpFlZ6UJMrW+fTNwAEdSuvSzCRANvEgnjUmw8swT+87+w7I/7qb8XlIB7NpGBjXiUjRX0b7ZpJ8+orRLzvGhWYCMdAU3BbRdPuqOeKAXuRKAWEEJJCIEQqNbLD9osq2kBviL8A4Fq4yLgAa+6DNaiAwcYOrqYHfgQcMgL3AFgG4fHHqREEUBSxUtmBfzNWxXADfviy8Kff7dA4QfFBQG6fnoX5Dh+gEEcIVRKtMIYhc/kCgsCDiarQY4QWpEKQoYTAAIJUcaHAHIXIN9BooBWhEAr0j7QzAkh1RnEWOY4wuRW8uX/f5o5W8gXcjriOUb9z/wjACRuWaWrpKIyLMQ/DUDN/TT+ErgHRpPBIRQrKCcZCvxBBCBEkSD4lKMjRblQlCvpQHPsSZE9R6K2o/vpXkGboKWbbltxx2feLT+a6KJb5293n7vTt53uwOzUO4gYc5eedhvS+a1bbdNuIiSA89cuGo25IZh6DXrJJIIUUibFUG0zt+ijO+cvnj8fjVm4cKlvN90DwzrdMmy8H9GjDyv90Xz2W10PVj3oTY7LLfwfmxMHoef+8n33R0duOxF3LPCYFXtymWNdcLBD3VF4S91+GWf8c9k7sZC6fPpnbENnCmayerBNki0ZbFUXiHV/wkxWklGmydCkaR5o0oZnlj3oSVdnZKjTITaXStOyWGYakzUgTSt1gvSs/otJL1FkzE/3e+aXvj7n+TOv9HkZ6evS4e3OXafCx8iqJfNGpQLM7rkt0ppRJ8N3gd1IjHLaROM0cLkhdf2NQjZ4bmjo2mBWKJ4CPA4IZXX9hFlPBnhxWhXzgBGQ88QeRD3j1/AD5a/JxMnL5gK5deaC2H7HvK98gngBbzfWLKD0g2ufeA7nMsQepBwDgpdhy90BzC+8DSCers8O6KKloYn0RCtKo9EM9LsAd7AgNBhFGEAsvl4K1LpCiCIF3IZHFUKvX5AqfUPBgkO+ovHpUNJtOJSN6hDWWxAigkCt9hbEXdaOHLvI6lM5gQA79LRYOpUsWBpKYu2klOQULGlGCwOzHIkSmYmZKBlQrlmCQ0mDv5SeiVyiemVqVJGyEDJhKemY1dLT0YsnpKch0UbKxExJTydIigQpkiUvYA3SVFDqFH2uNggh343VmPs2ycX0DIYwPYTigMak5AjS0ohI8zmoo4EJwypS4iVcDOuDuvRMgytHPa5LTjnoc1YiCcT0tBI3qjXxqqFomJf2PylAOHMDRp1HGBaDQCTiIC7iQSH4iEICRHMZkUlqk/KsOmVSGlOK7NIseRNZFp3NkbNaLateTmKScHGTAyu2WqQf6lD8rMNg1+lKTcpwkfvQ/7eRMwAA)format("woff2"),url(data:font/woff;base64,d09GRgABAAAAAAbAAA8AAAAACLwAAQABAAAAAAAAAAAAAAAAAAAAAAAAAABHREVGAAABWAAAABgAAAAcABQABEdQT1MAAAFwAAAAHgAAAB5EdEx1R1NVQgAAAZAAAAAnAAAAKLj8uOpPUy8yAAABuAAAAFEAAABgGDBcS1NUQVQAAAIMAAAAPgAAAEzrJ8wpY21hcAAAAkwAAABRAAAAdAyHCodnYXNwAAACoAAAAAgAAAAIAAAAEGdseWYAAAKoAAAB6wAAAmCgFyn6aGVhZAAABJQAAAA2AAAANhSU8UNoaGVhAAAEzAAAAB8AAAAkAc0A/2htdHgAAATsAAAAHwAAADoe9gKVbG9jYQAABQwAAAAgAAAAIATdBZ9tYXhwAAAFLAAAABwAAAAgAIcCb25hbWUAAAVIAAABBwAAAmg1nlsfcG9zdAAABlAAAABwAAAAlNdzMTB42mNgZGBg4GGAAEYgZAWTjCAeAAG0ABkAAQAAAAoAHAAcAAFERkxUAAgABAAAAAD//wAAAAAAAHjaY2BkYGDgYlADQiYXN58QBqGcxJI8Bj4GEGABEf//g0gAWkkFVQB42mNgYYpi2sPAysDA1MUUwcDA4A2hGeMYjBgdgKIMDJwMUMDEzoAEvJyAxAIGXpaXzH/+XWFgYP7DqKPAwDj//nWgSjWmW0BZBQZWAB8jDeMAAAB42gXBsQ1AABQFwHufiI5CYQBDaVVIlBLLmckM7kT0CpPCop79uIPz3q4MojUrSFcvtVIfGlEZQfgB9IwGBAAAeNpVyEcBwkAQBdCXHnoVgJU44Y4pFIAFUAOJiS23ZOZ3lKhwVSlkr91xdlQp7dwMnr5FWb/rMQQW26v+h3xT+IRHGEIBCvNr9Wh0OUU7NxUUAAAAAAEAAf//AA942m0QNZQUMfQn2Zt1Gcdhd2Dt/DLJrOLu0OHu7u4uJf3D+odLhUOLu0MLJVQ7S3C4u+S7/w8EJgIgFz8XkgR+ACrH5V5xGaH4RHTSPY7q3KsCH+LnlWQLLrqAi4DBAsBM5HghBkBVqlopy6vSVDKZkiSvdenY5e3p6+k+R+qCMUKioe/Jp08j82bzGEUZ0wTV6s8K5AJOAgIQncPd2rNGBEVgCms/0U1oVCbUNAyTc8ehRP70eNfKsEI8cnjZzsfIj+5VuhVisUK3itvofhX1fmViCTwAQGBo9QuO4Y8QEZ4eADWJJJNtTlsMXdYkKdXCGbN0zSCU2UkrIemobtGGDYsWbcjNGcKd57ncc0c0DqybjfKz166d7d7pP9NZUrYXL7bLaMhkViox0TNTHYkbcVL09P/Tswlk6ATWj55Jxmz+vauh6/+2Tf1tO2huPj930E/KC2+LxbcFzooBNrPfoX4zGJ/+nfEFBdalCyu878DyeQbod2dQAUxGqNoNm6bDHQEqJfrnWzvmeQM+LJ7HXyPN3Xbz3DmcdM/pmR4B8WI9NR2Nqjw/B4DgOsmiM+QCEADVod7rC/euJNnDh4VnK0mgF8ITBkDielQzaAsXTEJ1o6fPyFpW7YzpJDG+fzydjvcfD98ArHSFeAAAAQAAAAI2BCpkDTZfDzz1AAMD6AAAAADb0qaaAAAAANva0PL5PP7UBJID/AABAAYAAgAAAAAAAHjaY2BkYGD+8+8KAwPLhp82f3NYJgFFUAEfAK0mBsoAeNpjimCIAmJlJCwOxR5ArIlEM0AxCBxiqAMA3bsHpgAAAAAaADsARgBRAG4AdgCoALAA5QEKAQoBCgEKARcBMHjaY2BkYGDgZ9zBkMewhYENzEMAZgYmAC0aAfh42oyQA25FUQBET20EtW27DWrbcfVtcx1dzV9V40adpLdmXiZzMnfmCSjlnhyycouATFa14SwaeTScTSEPhnOYJmM4l+7XbR71pA3n08ml4XL12585C0qpNpz/ds+sCuXFhitFcIwPD9d42SIsd+Pglgsscht2ZZIuPyHmGWFEfksQh5KweFhy4Jb7lNp0fsA6u2xjIcyysmsceNXaU8MrDSn14eaOc3WCaI9OaGWcYWlM19d16+u+9XX/1l9gW+nCv55q/NdnrEh+EgRf/4LejlEk0akSi/z3tzwkKHeqc4v2LBGR25UFUZPeL3/WhgM11LthmKclg2NGH4st+nj8qQkARipb8wB42mNgYgCD/6kMRkCKkQEd8AOxCsNJRiYGG0ZmRhZGVkY2RnYGZkYORk5GLkZuNsekotSyVPbSvEwDE0dXCO1qAeW7QfmWrOmJubmJYJ6BowGTcxBfYnJpSWpyfm6SXnJicSoPSMbYwAzMAQCg7RyY)format("woff");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:JetBrains Mono;font-style:normal;font-display:swap;font-weight:700;src:url(`+new URL(`assets/jetbrains-mono-cyrillic-700-normal-BWTpRfYl.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/jetbrains-mono-cyrillic-700-normal-CEoEElIJ.woff`,import.meta.url).href+`)format("woff");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:JetBrains Mono;font-style:normal;font-display:swap;font-weight:700;src:url(`+new URL(`assets/jetbrains-mono-greek-700-normal-C6CZE3T8.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/jetbrains-mono-greek-700-normal-DEigVDxa.woff`,import.meta.url).href+`)format("woff");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:JetBrains Mono;font-style:normal;font-display:swap;font-weight:700;src:url(data:font/woff2;base64,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)format("woff2"),url(`+new URL(`assets/jetbrains-mono-vietnamese-700-normal-BDLVIk2r.woff`,import.meta.url).href+`)format("woff");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:JetBrains Mono;font-style:normal;font-display:swap;font-weight:700;src:url(`+new URL(`assets/jetbrains-mono-latin-ext-700-normal-CZipNAKV.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/jetbrains-mono-latin-ext-700-normal-CxPITLHs.woff`,import.meta.url).href+`)format("woff");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:JetBrains Mono;font-style:normal;font-display:swap;font-weight:700;src:url(`+new URL(`assets/jetbrains-mono-latin-700-normal-BYuf6tUa.woff2`,import.meta.url).href+`)format("woff2"),url(`+new URL(`assets/jetbrains-mono-latin-700-normal-D3wTyLJW.woff`,import.meta.url).href+`)format("woff");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`,g=`:root{--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light;--paper:#f4f0e6;--desk:#e4e0d5;--ink:#201e19;--ink-soft:#6a6357;--ink-faint:#9a9384;--hair:#cec7b6;--hair-soft:#ded8c9;--kick:#bb5b4f;--snare:#7f9cb6;--hat:#cdb15a;--rec:#bb5b4f;--serif:"Fraunces", Georgia, "Times New Roman", serif;--grot:"Inter", system-ui, sans-serif;--mono:"JetBrains Mono", ui-monospace, monospace;--w-book:400;--w-semibold:600;--w-bold:700;--w-black:900;--text-2xs:9px;--text-xs:10px;--text-sm:11px;--text-md:12px;--text-base:13px;--text-lg:14px;--text-xl:16px;--text-2xl:19px;--text-fig:13px;--track-tight:-.01em;--track-normal:.04em;--track-wide:.08em;--track-wider:.14em;--track-widest:.2em;--track-mega:.32em;--space-1:4px;--space-1-5:6px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:20px;--space-6:24px;--space-7:30px;--space-8:40px;--space-9:52px;--space-10:64px;--radius-xs:3px;--radius-sm:5px;--radius-pad:6px;--dur-fast:90ms;--dur-base:.16s;--dur-slow:1.2s;--ease:cubic-bezier(.22, .61, .36, 1);--ease-linear:linear;background-color:#e4e0d5}body{background-color:var(--desk);min-width:320px;min-height:100svh;color:var(--ink);font-family:var(--grot);font-synthesis:none;text-rendering:optimizelegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;margin:0;overflow-x:hidden}`,_=globalThis,v=_.ShadowRoot&&(_.ShadyCSS===void 0||_.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,y=Symbol(),b=new WeakMap,S=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(v&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=b.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&b.set(t,e))}return e}toString(){return this.cssText}},ee=e=>new S(typeof e==`string`?e:e+``,void 0,y),C=(e,...t)=>new S(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,y),te=(e,t)=>{if(v)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=_.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},ne=v?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return ee(t)})(e):e,{is:re,defineProperty:ie,getOwnPropertyDescriptor:ae,getOwnPropertyNames:oe,getOwnPropertySymbols:se,getPrototypeOf:ce}=Object,le=globalThis,ue=le.trustedTypes,de=ue?ue.emptyScript:``,fe=le.reactiveElementPolyfillSupport,w=(e,t)=>e,pe={toAttribute(e,t){switch(t){case Boolean:e=e?de:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},me=(e,t)=>!re(e,t),he={attribute:!0,type:String,converter:pe,reflect:!1,useDefault:!1,hasChanged:me};Symbol.metadata??=Symbol(`metadata`),le.litPropertyMetadata??=new WeakMap;var T=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=he){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&ie(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=ae(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??he}static _$Ei(){if(this.hasOwnProperty(w(`elementProperties`)))return;let e=ce(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(w(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w(`properties`))){let e=this.properties,t=[...oe(e),...se(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(ne(e))}else e!==void 0&&t.push(ne(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return te(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?pe:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?pe:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??me)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};T.elementStyles=[],T.shadowRootOptions={mode:`open`},T[w(`elementProperties`)]=new Map,T[w(`finalized`)]=new Map,fe?.({ReactiveElement:T}),(le.reactiveElementVersions??=[]).push(`2.1.2`);var ge=globalThis,_e=e=>e,ve=ge.trustedTypes,ye=ve?ve.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,be=`$lit$`,E=`lit$${Math.random().toFixed(9).slice(2)}$`,xe=`?`+E,Se=`<${xe}>`,D=document,O=()=>D.createComment(``),k=e=>e===null||typeof e!=`object`&&typeof e!=`function`,Ce=Array.isArray,we=e=>Ce(e)||typeof e?.[Symbol.iterator]==`function`,Te=`[ 	
\f\r]`,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ee=/-->/g,De=/>/g,j=RegExp(`>|${Te}(?:([^\\s"'>=/]+)(${Te}*=${Te}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Oe=/'/g,ke=/"/g,Ae=/^(?:script|style|textarea|title)$/i,je=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),M=je(1),N=je(2),P=Symbol.for(`lit-noChange`),F=Symbol.for(`lit-nothing`),Me=new WeakMap,I=D.createTreeWalker(D,129);function Ne(e,t){if(!Ce(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ye===void 0?t:ye.createHTML(t)}var Pe=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=A;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===A?c[1]===`!--`?o=Ee:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=j):(Ae.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=j):o=De:o===j?c[0]===`>`?(o=i??A,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?j:c[3]===`"`?ke:Oe):o===ke||o===Oe?o=j:o===Ee||o===De?o=A:(o=j,i=void 0);let d=o===j&&e[t+1].startsWith(`/>`)?` `:``;a+=o===A?n+Se:l>=0?(r.push(s),n.slice(0,l)+be+n.slice(l)+E+d):n+E+(l===-2?t:d)}return[Ne(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Fe=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Pe(t,n);if(this.el=e.createElement(l,r),I.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=I.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(be)){let t=u[o++],n=i.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?ze:r[1]===`?`?Be:r[1]===`@`?Ve:Re}),i.removeAttribute(e)}else e.startsWith(E)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Ae.test(i.tagName)){let e=i.textContent.split(E),t=e.length-1;if(t>0){i.textContent=ve?ve.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],O()),I.nextNode(),c.push({type:2,index:++a});i.append(e[t],O())}}}else if(i.nodeType===8)if(i.data===xe)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(E,e+1))!==-1;)c.push({type:7,index:a}),e+=E.length-1}a++}}static createElement(e,t){let n=D.createElement(`template`);return n.innerHTML=e,n}};function L(e,t,n=e,r){if(t===P)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=k(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=L(e,i._$AS(e,t.values),i,r)),t}var Ie=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??D).importNode(t,!0);I.currentNode=r;let i=I.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Le(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new He(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=I.nextNode(),a++)}return I.currentNode=D,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Le=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=L(this,e,t),k(e)?e===F||e==null||e===``?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==P&&this._(e):e._$litType$===void 0?e.nodeType===void 0?we(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&k(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Fe.createElement(Ne(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ie(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Me.get(e.strings);return t===void 0&&Me.set(e.strings,t=new Fe(e)),t}k(t){Ce(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(O()),this.O(O()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=_e(e).nextSibling;_e(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Re=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=F}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=L(this,e,t,0),a=!k(e)||e!==this._$AH&&e!==P,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=L(this,r[n+o],t,o),s===P&&(s=this._$AH[o]),a||=!k(s)||s!==this._$AH[o],s===F?e=F:e!==F&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ze=class extends Re{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}},Be=class extends Re{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}},Ve=class extends Re{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=L(this,e,t,0)??F)===P)return;let n=this._$AH,r=e===F&&n!==F||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==F&&(n===F||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},He=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){L(this,e)}},Ue=ge.litHtmlPolyfillSupport;Ue?.(Fe,Le),(ge.litHtmlVersions??=[]).push(`3.3.3`);var We=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Le(t.insertBefore(O(),e),e,void 0,n??{})}return i._$AI(e),i},Ge=globalThis,R=class extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=We(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P}};R._$litElement$=!0,R.finalized=!0,Ge.litElementHydrateSupport?.({LitElement:R});var Ke=Ge.litElementPolyfillSupport;Ke?.({LitElement:R}),(Ge.litElementVersions??=[]).push(`4.2.2`);var z=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},qe={attribute:!0,type:String,converter:pe,reflect:!1,hasChanged:me},Je=(e=qe,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function B(e){return(t,n)=>typeof n==`object`?Je(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function V(e){return B({...e,state:!0,attribute:!1})}var Ye=class extends Event{constructor(e,t,n,r){super(`context-request`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=n,this.subscribe=r??!1}};function Xe(e){return e}var Ze=class{constructor(e,t,n,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,t.context!==void 0){let e=t;this.context=e.context,this.callback=e.callback,this.subscribe=e.subscribe??!1}else this.context=t,this.callback=n,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&=(this.unsubscribe(),void 0)}dispatchRequest(){this.host.dispatchEvent(new Ye(this.context,this.host,this.t,this.subscribe))}},Qe=class{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let n=t||!Object.is(e,this.o);this.o=e,n&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},e!==void 0&&(this.value=e)}addCallback(e,t,n){if(!n)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}},$e=class extends Event{constructor(e,t){super(`context-provider`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}},et=class extends Qe{constructor(e,t,n){super(t.context===void 0?n:t.initialValue),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:n}]of this.subscriptions)t.has(e)||(t.add(e),n.dispatchEvent(new Ye(this.context,n,e,!0)));e.stopPropagation()},this.host=e,t.context===void 0?this.context=t:this.context=t.context,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener(`context-request`,this.onContextRequest),this.host.addEventListener(`context-provider`,this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new $e(this.context,this.host))}};function tt({context:e}){return(t,n)=>{let r=new WeakMap;if(typeof n==`object`)return{get(){return t.get.call(this)},set(e){return r.get(this).setValue(e),t.set.call(this,e)},init(t){return r.set(this,new et(this,{context:e,initialValue:t})),t}};{t.constructor.addInitializer((t=>{r.set(t,new et(t,{context:e}))}));let i=Object.getOwnPropertyDescriptor(t,n),a;if(i===void 0){let e=new WeakMap;a={get(){return e.get(this)},set(t){r.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=i.set;a={...i,set(t){r.get(this).setValue(t),e?.call(this,t)}}}Object.defineProperty(t,n,a);return}}}function nt({context:e,subscribe:t}){return(n,r)=>{typeof r==`object`?r.addInitializer((function(){new Ze(this,{context:e,callback:e=>{n.set.call(this,e)},subscribe:t})})):n.constructor.addInitializer((n=>{new Ze(n,{context:e,callback:e=>{n[r]=e},subscribe:t})}))}}var rt=c(o(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?t.exports=r():typeof define==`function`&&define.amd?define(r):(n=typeof globalThis<`u`?globalThis:n||self).Meyda=r()})(e,(function(){function e(e,t,n){if(n||arguments.length===2)for(var r,i=0,a=t.length;i<a;i++)!r&&i in t||(r||=Array.prototype.slice.call(t,0,i),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}var t=Object.freeze({__proto__:null,blackman:function(e){for(var t=new Float32Array(e),n=2*Math.PI/(e-1),r=2*n,i=0;i<e/2;i++)t[i]=.42-.5*Math.cos(i*n)+.08*Math.cos(i*r);for(i=Math.ceil(e/2);i>0;i--)t[e-i]=t[i-1];return t},hamming:function(e){for(var t=new Float32Array(e),n=0;n<e;n++)t[n]=.54-.46*Math.cos(2*Math.PI*(n/e-1));return t},hanning:function(e){for(var t=new Float32Array(e),n=0;n<e;n++)t[n]=.5-.5*Math.cos(2*Math.PI*n/(e-1));return t},sine:function(e){for(var t=Math.PI/(e-1),n=new Float32Array(e),r=0;r<e;r++)n[r]=Math.sin(t*r);return n}}),n={};function r(e){for(;e%2==0&&e>1;)e/=2;return e===1}function i(e,r){if(r!==`rect`){if(r!==``&&r||(r=`hanning`),n[r]||(n[r]={}),!n[r][e.length])try{n[r][e.length]=t[r](e.length)}catch{throw Error(`Invalid windowing function`)}e=function(e,t){for(var n=[],r=0;r<Math.min(e.length,t.length);r++)n[r]=e[r]*t[r];return n}(e,n[r][e.length])}return e}function a(e,t,n){for(var r=new Float32Array(e),i=0;i<r.length;i++)r[i]=i*t/n,r[i]=13*Math.atan(r[i]/1315.8)+3.5*Math.atan((r[i]/7518)**2);return r}function o(e){return Float32Array.from(e)}function s(e){return 1125*Math.log(1+e/700)}function c(e,t,n){for(var r,i=new Float32Array(e+2),a=new Float32Array(e+2),o=t/2,c=s(0),l=(s(o)-c)/(e+1),u=Array(e+2),d=0;d<i.length;d++)i[d]=d*l,a[d]=(r=i[d],700*(Math.exp(r/1125)-1)),u[d]=Math.floor((n+1)*a[d]/t);for(var f=Array(e),p=0;p<f.length;p++){for(f[p]=Array(n/2+1).fill(0),d=u[p];d<u[p+1];d++)f[p][d]=(d-u[p])/(u[p+1]-u[p]);for(d=u[p+1];d<u[p+2];d++)f[p][d]=(u[p+2]-d)/(u[p+2]-u[p+1])}return f}function l(t,n,r,i,a,o,s){i===void 0&&(i=5),a===void 0&&(a=2),o===void 0&&(o=!0),s===void 0&&(s=440);var c=Math.floor(r/2)+1,l=Array(r).fill(0).map((function(e,i){return t*function(e,t){return Math.log2(16*e/t)}(n*i/r,s)}));l[0]=l[1]-1.5*t;var u,d,f,p=l.slice(1).map((function(e,t){return Math.max(e-l[t])}),1).concat([1]),m=Math.round(t/2),h=Array(t).fill(0).map((function(e,n){return l.map((function(e){return(10*t+m+e-n)%t-m}))})),g=h.map((function(e,t){return e.map((function(e,n){return Math.exp(-.5*(2*h[t][n]/p[n])**2)}))}));if(d=(u=g)[0].map((function(){return 0})),f=u.reduce((function(e,t){return t.forEach((function(t,n){e[n]+=t**2})),e}),d).map(Math.sqrt),g=u.map((function(e,t){return e.map((function(e,t){return e/(f[t]||1)}))})),a){var _=l.map((function(e){return Math.exp(-.5*((e/t-i)/a)**2)}));g=g.map((function(e){return e.map((function(e,t){return e*_[t]}))}))}return o&&(g=e(e([],g.slice(3),!0),g.slice(0,3),!0)),g.map((function(e){return e.slice(0,c)}))}function u(e,t){for(var n=0,r=0,i=0;i<t.length;i++)n+=i**+e*Math.abs(t[i]),r+=t[i];return n/r}function d(e){var t=e.ampSpectrum,n=e.barkScale,r=e.numberOfBarkBands,i=r===void 0?24:r;if(typeof t!=`object`||typeof n!=`object`)throw TypeError();var a=i,o=new Float32Array(a),s=0,c=t,l=new Int32Array(a+1);l[0]=0;for(var u=n[c.length-1]/a,d=1,f=0;f<c.length;f++)for(;n[f]>u;)l[d++]=f,u=d*n[c.length-1]/a;for(l[a]=c.length-1,f=0;f<a;f++){for(var p=0,m=l[f];m<l[f+1];m++)p+=c[m];o[f]=p**.23}for(f=0;f<o.length;f++)s+=o[f];return{specific:o,total:s}}function f(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();for(var n=new Float32Array(t.length),r=0;r<n.length;r++)n[r]=t[r]**2;return n}function p(e){var t=e.ampSpectrum,n=e.melFilterBank,r=e.bufferSize;if(typeof t!=`object`)throw TypeError(`Valid ampSpectrum is required to generate melBands`);if(typeof n!=`object`)throw TypeError(`Valid melFilterBank is required to generate melBands`);for(var i=f({ampSpectrum:t}),a=n.length,o=Array(a),s=new Float32Array(a),c=0;c<s.length;c++){o[c]=new Float32Array(r/2),s[c]=0;for(var l=0;l<r/2;l++)o[c][l]=n[c][l]*i[l],s[c]+=o[c][l];s[c]=Math.log(s[c]+1)}return Array.prototype.slice.call(s)}function m(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,`default`)?e.default:e}var h=null,g=m((function(e,t){var n=e.length;return t||=2,h&&h[n]||function(e){(h||={})[e]=Array(e*e);for(var t=Math.PI/e,n=0;n<e;n++)for(var r=0;r<e;r++)h[e][r+n*e]=Math.cos(t*(r+.5)*n)}(n),e.map((function(){return 0})).map((function(r,i){return t*e.reduce((function(e,t,r,a){return e+t*h[n][r+i*n]}),0)}))})),_=Object.freeze({__proto__:null,amplitudeSpectrum:function(e){return e.ampSpectrum},buffer:function(e){return e.signal},chroma:function(e){var t=e.ampSpectrum,n=e.chromaFilterBank;if(typeof t!=`object`)throw TypeError(`Valid ampSpectrum is required to generate chroma`);if(typeof n!=`object`)throw TypeError(`Valid chromaFilterBank is required to generate chroma`);var r=n.map((function(e,n){return t.reduce((function(t,n,r){return t+n*e[r]}),0)})),i=Math.max.apply(Math,r);return i?r.map((function(e){return e/i})):r},complexSpectrum:function(e){return e.complexSpectrum},energy:function(e){var t=e.signal;if(typeof t!=`object`)throw TypeError();for(var n=0,r=0;r<t.length;r++)n+=Math.abs(t[r])**2;return n},loudness:d,melBands:p,mfcc:function(e){var t=e.ampSpectrum,n=e.melFilterBank,r=e.numberOfMFCCCoefficients,i=e.bufferSize,a=Math.min(40,Math.max(1,r||13));if(n.length<a)throw Error(`Insufficient filter bank for requested number of coefficients`);return g(p({ampSpectrum:t,melFilterBank:n,bufferSize:i})).slice(0,a)},perceptualSharpness:function(e){for(var t=d({ampSpectrum:e.ampSpectrum,barkScale:e.barkScale}),n=t.specific,r=0,i=0;i<n.length;i++)r+=i<15?(i+1)*n[i+1]:.066*Math.exp(.171*(i+1));return r*=.11/t.total},perceptualSpread:function(e){for(var t=d({ampSpectrum:e.ampSpectrum,barkScale:e.barkScale}),n=0,r=0;r<t.specific.length;r++)t.specific[r]>n&&(n=t.specific[r]);return((t.total-n)/t.total)**2},powerSpectrum:f,rms:function(e){var t=e.signal;if(typeof t!=`object`)throw TypeError();for(var n=0,r=0;r<t.length;r++)n+=t[r]**2;return n/=t.length,n=Math.sqrt(n)},spectralCentroid:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();return u(1,t)},spectralCrest:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();var n=0,r=-1/0;return t.forEach((function(e){n+=e**2,r=e>r?e:r})),n/=t.length,n=Math.sqrt(n),r/n},spectralFlatness:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();for(var n=0,r=0,i=0;i<t.length;i++)n+=Math.log(t[i]),r+=t[i];return Math.exp(n/t.length)*t.length/r},spectralFlux:function(e){var t=e.signal,n=e.previousSignal,r=e.bufferSize;if(typeof t!=`object`||typeof n!=`object`)throw TypeError();for(var i=0,a=-r/2;a<t.length/2-1;a++)x=Math.abs(t[a])-Math.abs(n[a]),i+=(x+Math.abs(x))/2;return i},spectralKurtosis:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();var n=t,r=u(1,n),i=u(2,n),a=u(3,n),o=u(4,n);return(-3*r**4+6*r*i-4*r*a+o)/Math.sqrt(i-r**2)**4},spectralRolloff:function(e){var t=e.ampSpectrum,n=e.sampleRate;if(typeof t!=`object`)throw TypeError();for(var r=t,i=n/(2*(r.length-1)),a=0,o=0;o<r.length;o++)a+=r[o];for(var s=.99*a,c=r.length-1;a>s&&c>=0;)a-=r[c],--c;return(c+1)*i},spectralSkewness:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();var n=u(1,t),r=u(2,t),i=u(3,t);return(2*n**3-3*n*r+i)/Math.sqrt(r-n**2)**3},spectralSlope:function(e){var t=e.ampSpectrum,n=e.sampleRate,r=e.bufferSize;if(typeof t!=`object`)throw TypeError();for(var i=0,a=0,o=new Float32Array(t.length),s=0,c=0,l=0;l<t.length;l++){i+=t[l];var u=l*n/r;o[l]=u,s+=u*u,a+=u,c+=u*t[l]}return(t.length*c-a*i)/(i*(s-a**2))},spectralSpread:function(e){var t=e.ampSpectrum;if(typeof t!=`object`)throw TypeError();return Math.sqrt(u(2,t)-u(1,t)**2)},zcr:function(e){var t=e.signal;if(typeof t!=`object`)throw TypeError();for(var n=0,r=1;r<t.length;r++)(t[r-1]>=0&&t[r]<0||t[r-1]<0&&t[r]>=0)&&n++;return n}});function v(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var y={},b={},S={bitReverseArray:function(e){if(y[e]===void 0){for(var t=(e-1).toString(2).length,n=`0`.repeat(t),r={},i=0;i<e;i++){var a=i.toString(2);a=n.substr(a.length)+a,a=[].concat(v(a)).reverse().join(``),r[i]=parseInt(a,2)}y[e]=r}return y[e]},multiply:function(e,t){return{real:e.real*t.real-e.imag*t.imag,imag:e.real*t.imag+e.imag*t.real}},add:function(e,t){return{real:e.real+t.real,imag:e.imag+t.imag}},subtract:function(e,t){return{real:e.real-t.real,imag:e.imag-t.imag}},euler:function(e,t){var n=-2*Math.PI*e/t;return{real:Math.cos(n),imag:Math.sin(n)}},conj:function(e){return e.imag*=-1,e},constructComplexArray:function(e){var t={};t.real=e.real===void 0?e.slice():e.real.slice();var n=t.real.length;return b[n]===void 0&&(b[n]=Array.apply(null,Array(n)).map(Number.prototype.valueOf,0)),t.imag=b[n].slice(),t}},ee=function(e){var t={};e.real===void 0||e.imag===void 0?t=S.constructComplexArray(e):(t.real=e.real.slice(),t.imag=e.imag.slice());var n=t.real.length,r=Math.log2(n);if(Math.round(r)!=r)throw Error(`Input size must be a power of 2.`);if(t.real.length!=t.imag.length)throw Error(`Real and imaginary components must have the same length.`);for(var i=S.bitReverseArray(n),a={real:[],imag:[]},o=0;o<n;o++)a.real[i[o]]=t.real[o],a.imag[i[o]]=t.imag[o];for(var s=0;s<n;s++)t.real[s]=a.real[s],t.imag[s]=a.imag[s];for(var c=1;c<=r;c++)for(var l=2**c,u=0;u<l/2;u++)for(var d=S.euler(u,l),f=0;f<n/l;f++){var p=l*f+u,m=l*f+u+l/2,h={real:t.real[p],imag:t.imag[p]},g={real:t.real[m],imag:t.imag[m]},_=S.multiply(d,g),v=S.subtract(h,_);t.real[m]=v.real,t.imag[m]=v.imag;var y=S.add(_,h);t.real[p]=y.real,t.imag[p]=y.imag}return t},C=function(){function e(e,t){var n=this;if(this._m=t,!e.audioContext)throw this._m.errors.noAC;if(e.bufferSize&&!r(e.bufferSize))throw this._m._errors.notPow2;if(!e.source)throw this._m._errors.noSource;this._m.audioContext=e.audioContext,this._m.bufferSize=e.bufferSize||this._m.bufferSize||256,this._m.hopSize=e.hopSize||this._m.hopSize||this._m.bufferSize,this._m.sampleRate=e.sampleRate||this._m.audioContext.sampleRate||44100,this._m.callback=e.callback,this._m.windowingFunction=e.windowingFunction||`hanning`,this._m.featureExtractors=_,this._m.EXTRACTION_STARTED=e.startImmediately||!1,this._m.channel=typeof e.channel==`number`?e.channel:0,this._m.inputs=e.inputs||1,this._m.outputs=e.outputs||1,this._m.numberOfMFCCCoefficients=e.numberOfMFCCCoefficients||this._m.numberOfMFCCCoefficients||13,this._m.numberOfBarkBands=e.numberOfBarkBands||this._m.numberOfBarkBands||24,this._m.spn=this._m.audioContext.createScriptProcessor(this._m.bufferSize,this._m.inputs,this._m.outputs),this._m.spn.connect(this._m.audioContext.destination),this._m._featuresToExtract=e.featureExtractors||[],this._m.barkScale=a(this._m.bufferSize,this._m.sampleRate,this._m.bufferSize),this._m.melFilterBank=c(Math.max(this._m.melBands,this._m.numberOfMFCCCoefficients),this._m.sampleRate,this._m.bufferSize),this._m.inputData=null,this._m.previousInputData=null,this._m.frame=null,this._m.previousFrame=null,this.setSource(e.source),this._m.spn.onaudioprocess=function(e){var t;n._m.inputData!==null&&(n._m.previousInputData=n._m.inputData),n._m.inputData=e.inputBuffer.getChannelData(n._m.channel),n._m.previousInputData?((t=new Float32Array(n._m.previousInputData.length+n._m.inputData.length-n._m.hopSize)).set(n._m.previousInputData.slice(n._m.hopSize)),t.set(n._m.inputData,n._m.previousInputData.length-n._m.hopSize)):t=n._m.inputData,(function(e,t,n){if(e.length<t)throw Error(`Buffer is too short for frame length`);if(n<1)throw Error(`Hop length cannot be less that 1`);if(t<1)throw Error(`Frame length cannot be less that 1`);var r=1+Math.floor((e.length-t)/n);return Array(r).fill(0).map((function(r,i){return e.slice(i*n,i*n+t)}))})(t,n._m.bufferSize,n._m.hopSize).forEach((function(e){n._m.frame=e;var t=n._m.extract(n._m._featuresToExtract,n._m.frame,n._m.previousFrame);typeof n._m.callback==`function`&&n._m.EXTRACTION_STARTED&&n._m.callback(t),n._m.previousFrame=n._m.frame}))}}return e.prototype.start=function(e){this._m._featuresToExtract=e||this._m._featuresToExtract,this._m.EXTRACTION_STARTED=!0},e.prototype.stop=function(){this._m.EXTRACTION_STARTED=!1},e.prototype.setSource=function(e){this._m.source&&this._m.source.disconnect(this._m.spn),this._m.source=e,this._m.source.connect(this._m.spn)},e.prototype.setChannel=function(e){e<=this._m.inputs?this._m.channel=e:console.error(`Channel ${e} does not exist. Make sure you've provided a value for 'inputs' that is greater than ${e} when instantiating the MeydaAnalyzer`)},e.prototype.get=function(e){return this._m.inputData?this._m.extract(e||this._m._featuresToExtract,this._m.inputData,this._m.previousInputData):null},e}(),te={audioContext:null,spn:null,bufferSize:512,sampleRate:44100,melBands:26,chromaBands:12,callback:null,windowingFunction:`hanning`,featureExtractors:_,EXTRACTION_STARTED:!1,numberOfMFCCCoefficients:13,numberOfBarkBands:24,_featuresToExtract:[],windowing:i,_errors:{notPow2:Error(`Meyda: Buffer size must be a power of 2, e.g. 64 or 512`),featureUndef:Error(`Meyda: No features defined.`),invalidFeatureFmt:Error(`Meyda: Invalid feature format`),invalidInput:Error(`Meyda: Invalid input.`),noAC:Error(`Meyda: No AudioContext specified.`),noSource:Error(`Meyda: No source node specified.`)},createMeydaAnalyzer:function(e){return new C(e,Object.assign({},te))},listAvailableFeatureExtractors:function(){return Object.keys(this.featureExtractors)},extract:function(e,t,n){var i=this;if(!t||typeof t!=`object`)throw this._errors.invalidInput;if(!e)throw this._errors.featureUndef;if(!r(t.length))throw this._errors.notPow2;this.barkScale!==void 0&&this.barkScale.length==this.bufferSize||(this.barkScale=a(this.bufferSize,this.sampleRate,this.bufferSize)),this.melFilterBank!==void 0&&this.barkScale.length==this.bufferSize&&this.melFilterBank.length==this.melBands||(this.melFilterBank=c(Math.max(this.melBands,this.numberOfMFCCCoefficients),this.sampleRate,this.bufferSize)),this.chromaFilterBank!==void 0&&this.chromaFilterBank.length==this.chromaBands||(this.chromaFilterBank=l(this.chromaBands,this.sampleRate,this.bufferSize)),`buffer`in t&&t.buffer===void 0?this.signal=o(t):this.signal=t;var s=ne(t,this.windowingFunction,this.bufferSize);if(this.signal=s.windowedSignal,this.complexSpectrum=s.complexSpectrum,this.ampSpectrum=s.ampSpectrum,n){var u=ne(n,this.windowingFunction,this.bufferSize);this.previousSignal=u.windowedSignal,this.previousComplexSpectrum=u.complexSpectrum,this.previousAmpSpectrum=u.ampSpectrum}var d=function(e){return i.featureExtractors[e]({ampSpectrum:i.ampSpectrum,chromaFilterBank:i.chromaFilterBank,complexSpectrum:i.complexSpectrum,signal:i.signal,bufferSize:i.bufferSize,sampleRate:i.sampleRate,barkScale:i.barkScale,melFilterBank:i.melFilterBank,previousSignal:i.previousSignal,previousAmpSpectrum:i.previousAmpSpectrum,previousComplexSpectrum:i.previousComplexSpectrum,numberOfMFCCCoefficients:i.numberOfMFCCCoefficients,numberOfBarkBands:i.numberOfBarkBands})};if(typeof e==`object`)return e.reduce((function(e,t){var n;return Object.assign({},e,((n={})[t]=d(t),n))}),{});if(typeof e==`string`)return d(e);throw this._errors.invalidFeatureFmt}},ne=function(e,t,n){var r={};e.buffer===void 0?r.signal=o(e):r.signal=e,r.windowedSignal=i(r.signal,t),r.complexSpectrum=ee(r.windowedSignal),r.ampSpectrum=new Float32Array(n/2);for(var a=0;a<n/2;a++)r.ampSpectrum[a]=Math.sqrt(r.complexSpectrum.real[a]**2+r.complexSpectrum.imag[a]**2);return r};return typeof window<`u`&&(window.Meyda=te),te}))}))(),1),it=class e{static{this.LOOKAHEAD_MS=25}static{this.SCHEDULE_AHEAD_S=.1}static{this.CLICK_GAIN=.05}static{this.ACCENT_GAIN=.09}static{this.CLICK_DURATION_S=.02}constructor(e,t,n){this.nextClickTime=0,this.firstClickTime=0,this.beatIndex=0,this.schedulerTimer=null,this.ctx=e,this.bpm=t,this.audible=n}start(){this.beatIndex=0,this.firstClickTime=this.ctx.currentTime+.05,this.nextClickTime=this.firstClickTime,this.audible&&(this.schedulerTimer=setInterval(()=>this.scheduler(),e.LOOKAHEAD_MS))}stop(){this.schedulerTimer&&clearInterval(this.schedulerTimer),this.schedulerTimer=null}isJustAfterClick(e,t){if(!this.audible||e<this.firstClickTime)return!1;let n=60/this.bpm;return(e-this.firstClickTime)%n<=t}getBeatPhase(e){if(e<this.firstClickTime)return{phase:0,beatIndex:-1};let t=60/this.bpm,n=e-this.firstClickTime;return{phase:n%t/t,beatIndex:Math.floor(n/t)}}scheduler(){let t=60/this.bpm;for(;this.nextClickTime<this.ctx.currentTime+e.SCHEDULE_AHEAD_S;)this.playClick(this.nextClickTime,this.beatIndex%4==0),this.nextClickTime+=t,this.beatIndex++}playClick(t,n){let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.frequency.value=n?1500:1e3,r.connect(i),i.connect(this.ctx.destination);let a=n?e.ACCENT_GAIN:e.CLICK_GAIN;i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(a,t+.002),i.gain.exponentialRampToValueAtTime(1e-4,t+e.CLICK_DURATION_S),r.start(t),r.stop(t+e.CLICK_DURATION_S)}},H={IDLE:`idle`,LISTENING:`listening`,ONSET_HOLD:`onset_hold`,COOLDOWN:`cooldown`},at=[`rms`,`spectralFlatness`,`powerSpectrum`,`zcr`],ot={fftSize:512,onsetRatio:1.3,releaseRatio:.7,maxHoldMs:400,cooldownMs:50,minHoldMs:30},st=.05,ct=.001,lt=.07;function ut(e){if(e instanceof DOMException)switch(e.name){case`NotFoundError`:return`No microphone was found. Check that a mic is connected, enabled, and set as the default input device in your OS sound settings.`;case`NotAllowedError`:return`Microphone access was denied. Check your browser's site permissions (the padlock icon in the address bar) and allow microphone access.`;case`NotReadableError`:return`The microphone is in use by another application, or the OS couldn't access it.`;case`OverconstrainedError`:return`No microphone on this system supports the requested audio settings.`;case`SecurityError`:return`Microphone access is blocked — this page must be served over HTTPS or from localhost.`;default:return`Microphone error: ${e.message}`}return e instanceof Error?e.message:`Unknown microphone error.`}var dt=class extends EventTarget{constructor(e=ot){super(),this.ctx=null,this.analyzer=null,this.stream=null,this.source=null,this.waveNode=null,this.state=H.IDLE,this.holdBuffer=[],this.cooldownTimer=null,this.lastLevelEmitAt=0,this.noiseFloor=0,this.releaseGate=0,this.holdStartedAt=0,this.metronome=null,this.mediaRecorder=null,this.recordedChunks=[],this.lastRecordingBlob=null,this.recordingStoppedPromise=null,this.config=e}getState(){return this.state}getSampleRate(){return this.ctx?.sampleRate??null}getFftSize(){return this.config.fftSize}getConfig(){return this.config}getWaveform(e){return this.waveNode?(this.waveNode.getFloatTimeDomainData(e),!0):!1}getWaveformSize(){return this.waveNode?.fftSize??2048}getBeatPhase(){return!this.ctx||!this.metronome?null:this.metronome.getBeatPhase(this.ctx.currentTime)}updateConfig(e){this.config={...this.config,...e}}async getRecordingBlob(){return this.recordingStoppedPromise?this.recordingStoppedPromise:this.lastRecordingBlob}async start(e,t){if(this.state===H.IDLE)try{if(this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!0}}),this.ctx=new AudioContext,this.source=this.ctx.createMediaStreamSource(this.stream),this.waveNode=this.ctx.createAnalyser(),this.waveNode.fftSize=2048,this.source.connect(this.waveNode),this.analyzer=rt.default.createMeydaAnalyzer({audioContext:this.ctx,source:this.source,bufferSize:this.config.fftSize,featureExtractors:at,callback:e=>this.onFeatures(e)}),this.analyzer.start(),this.metronome=new it(this.ctx,e,t),this.metronome.start(),this.recordedChunks=[],this.lastRecordingBlob=null,this.recordingStoppedPromise=null,typeof MediaRecorder<`u`)try{this.mediaRecorder=new MediaRecorder(this.stream),this.mediaRecorder.ondataavailable=e=>{e.data.size>0&&this.recordedChunks.push(e.data)},this.mediaRecorder.start()}catch{this.mediaRecorder=null}this.setState(H.LISTENING)}catch(e){this.dispatchEvent(new CustomEvent(`error`,{detail:Error(ut(e))})),this.teardown()}}stop(){this.teardown(),this.setState(H.IDLE)}teardown(){if(this.metronome?.stop(),this.metronome=null,this.analyzer?.stop(),this.analyzer=null,this.waveNode?.disconnect(),this.waveNode=null,this.mediaRecorder&&this.mediaRecorder.state!==`inactive`){let e=this.mediaRecorder,t=this.recordedChunks;this.recordingStoppedPromise=new Promise(n=>{e.addEventListener(`stop`,()=>{let r=t.length?new Blob(t,{type:e.mimeType||`audio/webm`}):null;this.lastRecordingBlob=r,n(r)},{once:!0})}),e.stop()}this.mediaRecorder=null,this.source?.disconnect(),this.source=null,this.stream?.getTracks().forEach(e=>e.stop()),this.stream=null,this.ctx?.close(),this.ctx=null,this.cooldownTimer&&clearTimeout(this.cooldownTimer),this.cooldownTimer=null,this.holdBuffer=[],this.noiseFloor=0}onFeatures(e){if(!this.ctx)return;let t={timestamp:this.ctx.currentTime,rms:e.rms??0,spectralFlatness:e.spectralFlatness??0,powerSpectrum:e.powerSpectrum??new Float32Array,zcr:e.zcr??0},n=this.metronome?.isJustAfterClick(t.timestamp,lt)??!1;this.state===H.LISTENING&&!n&&(this.noiseFloor+=(t.rms-this.noiseFloor)*st);let r=Math.max(this.noiseFloor,ct)*this.config.onsetRatio;switch(this.maybeEmitLevel(t.rms,r),this.state){case H.LISTENING:!n&&t.rms>=r&&this.beginOnsetHold(t,r);break;case H.ONSET_HOLD:{if(n)break;this.holdBuffer.push(t);let e=(t.timestamp-this.holdStartedAt)*1e3;if(t.rms<=this.releaseGate||e>=this.config.maxHoldMs){let t=this.holdBuffer;this.holdBuffer=[],e>=this.config.minHoldMs&&this.dispatchEvent(new CustomEvent(`transient-detected`,{detail:t})),this.enterCooldown()}break}default:break}}beginOnsetHold(e,t){this.holdBuffer=[e],this.releaseGate=t*this.config.releaseRatio,this.holdStartedAt=e.timestamp,this.setState(H.ONSET_HOLD)}enterCooldown(){this.setState(H.COOLDOWN),this.cooldownTimer=setTimeout(()=>{this.setState(H.LISTENING)},this.config.cooldownMs)}maybeEmitLevel(e,t){let n=performance.now();n-this.lastLevelEmitAt<33||(this.lastLevelEmitAt=n,this.dispatchEvent(new CustomEvent(`level`,{detail:{level:e,threshold:t}})))}setState(e){this.state=e,this.dispatchEvent(new CustomEvent(`state-change`,{detail:e}))}};function ft(e){if(e.numberOfChannels===1)return e.getChannelData(0);let t=Array.from({length:e.numberOfChannels},(t,n)=>e.getChannelData(n)),n=new Float32Array(e.length);for(let r=0;r<e.length;r++){let e=0;for(let n of t)e+=n[r];n[r]=e/t.length}return n}function pt(e,t,n){let r=n.fftSize,i=Math.floor(e.length/r),a=`listening`,o=0,s=[],c=0,l=0,u=0,d=[];for(let f=0;f<i;f++){let i=e.subarray(f*r,(f+1)*r),p=f*r/t,m=rt.default.extract([...at],i);if(!m)continue;let h={timestamp:p,rms:m.rms??0,spectralFlatness:m.spectralFlatness??0,powerSpectrum:m.powerSpectrum??new Float32Array,zcr:m.zcr??0};a===`listening`&&(o+=(h.rms-o)*st);let g=Math.max(o,ct)*n.onsetRatio;if(a===`listening`)h.rms>=g&&(s=[h],l=g*n.releaseRatio,c=h.timestamp,a=`hold`);else if(a===`hold`){s.push(h);let e=(h.timestamp-c)*1e3;(h.rms<=l||e>=n.maxHoldMs)&&(e>=n.minHoldMs&&d.push({frames:s,timeMs:c*1e3}),s=[],a=`cooldown`,u=h.timestamp+n.cooldownMs/1e3)}else h.timestamp>=u&&(a=`listening`)}return d}function mt(e){return e instanceof DOMException&&e.name===`EncodingError`?`This browser couldn't decode that audio file's format. Try exporting it as WAV or MP3 and uploading again.`:e instanceof Error?`Couldn't read that file: ${e.message}`:`Couldn't read that file.`}async function ht(e,t=ot){let n=await e.arrayBuffer(),r=new AudioContext;try{let e;try{e=await r.decodeAudioData(n)}catch(e){throw Error(mt(e))}return{hits:pt(ft(e),e.sampleRate,t),sampleRate:e.sampleRate}}finally{r.close()}}var gt={lowBandHz:200,midBandHz:2e3};function _t(e,t,n,r){let i=t/n,a=0,o=0,s=0;for(let t=0;t<e.length;t++){let n=t*i,c=e[t];n<=r.lowBandHz?a+=c:n<=r.midBandHz?o+=c:s+=c}let c=a+o+s||1;return{low:a/c,mid:o/c,high:s/c}}function vt(e,t){let n=0,r=0;for(let i=0;i<e.length;i++)n+=e[i]*t[i],r+=t[i];return r===0?e.length===0?0:e.reduce((e,t)=>e+t,0)/e.length:n/r}function yt(e){return Math.min(1,Math.max(0,e))}function bt(e,t,n){return t===n?+(e>=t):yt((e-t)/(n-t))}function xt(e,t,n,r=gt){if(e.length===0)return{brightness:0,flatness:0,lowBandEnergy:0,midBandEnergy:0,highBandEnergy:0};let i=e.map(e=>e.rms),a=vt(e.map(e=>e.spectralFlatness),i),o=e.map(e=>_t(e.powerSpectrum,t,n,r)),s=vt(o.map(e=>e.low),i),c=vt(o.map(e=>e.mid),i),l=vt(o.map(e=>e.high),i);return{brightness:c+2*l,flatness:a,lowBandEnergy:s,midBandEnergy:c,highBandEnergy:l}}var St=.15;function Ct(e,t){let n=e.map((e,t)=>t).sort((t,n)=>e[t]-e[n]),r=n.slice(0,-1).map((t,r)=>({afterPos:r,size:e[n[r+1]]-e[n[r]]})).filter(e=>e.size>=St).sort((e,t)=>t.size-e.size).slice(0,t).map(e=>e.afterPos).sort((e,t)=>e-t),i=[],a=0;for(let e of r)i.push(n.slice(a,e+1)),a=e+1;return i.push(n.slice(a)),i}var wt=[`kick`,`snare`,`hat`];function Tt(e,t,n){if(e.length===n.length)return n;let r=Array(e.length);r[t]=n[0];let i=n.slice(1),a=0;for(let n=t+1;n<e.length;n++)r[n]=i[a++]??i.at(-1);a=0;for(let e=t-1;e>=0;e--)r[e]=i[a++]??i.at(-1);return r}function Et(e,t=wt){if(e.length===0)return[];let n=wt.filter(e=>t.includes(e)),r=e.map(e=>e.brightness),i=Ct(r,n.length-1),a=Tt(i,i.findIndex(e=>e.includes(0)),n),o=Array(e.length);return i.forEach((t,n)=>{let s=a[n],c=Math.min(n>0?bt(r[t[0]]-r[i[n-1].at(-1)],0,St*2):1,n<i.length-1?bt(r[i[n+1][0]]-r[t.at(-1)],0,St*2):1);for(let n of t)o[n]={class:s,confidence:yt(c),features:e[n]}}),o}function Dt(e,t){if(e.length===0)return{steps:[],totalSteps:16};let n=6e4/t/4,r=Math.min(...e.map(e=>e.timeMs)),i=e.map(e=>e.timeMs-r),a=Math.max(...i),o=Math.round(a/n)+1,s=Math.max(16,Math.ceil(o/16)*16);return{steps:e.map(e=>({step:Math.min(s-1,Math.round((e.timeMs-r)/n)),class:e.class,controlLabel:e.controlLabel})),totalSteps:s}}function Ot(e,t){return e.controls.find(e=>e.id===t)}function kt(e,t){return t.map(t=>Ot(e,t)).filter(e=>e!==void 0)}var At=[[`1`,`2`,`3`,`4`],[`5`,`6`,`7`,`8`],[`9`,`10`,`11`,`12`],[`13`,`14`,`15`,`16`]];function jt(){let e=[],t=36;for(let n=0;n<4;n++)for(let r=0;r<4;r++)e.push({id:`pad-${At[n][r]}`,label:At[n][r],shape:`pad`,position:{row:n,col:r},midi:{note:t++,channel:10}});return e}var Mt={id:`sp404mkii`,name:`Roland SP-404MKII`,gridDimensions:{rows:4,cols:4},banks:[`A`,`B`,`C`,`D`],controls:jt(),classMapping:{kick:[`pad-1`],snare:[`pad-2`],hat:[`pad-3`]},decorative:[`BUS FX`,`HOLD`,`EXT SOURCE`,`SUB PAD`]};function Nt(){let e=[],t=60;for(let n=1;n<=16;n++)e.push({id:`key-${n}`,label:String(n),shape:`key`,position:{row:0,col:n-1},midi:{note:t++,channel:1}});return e}var Pt={id:`po33`,name:`Pocket Operator PO-33 K.O!`,gridDimensions:null,controls:Nt(),classMapping:{kick:[`key-1`],snare:[`key-2`],hat:[`key-3`]}};function Ft(){let e=[],t=48;for(let n=1;n<=16;n++)e.push({id:`key-${n}`,label:String(n),shape:`key`,position:{row:0,col:n-1},midi:{note:t++,channel:1}});return e}var It={id:`po32`,name:`Pocket Operator PO-32 Tonic`,gridDimensions:null,controls:Ft(),classMapping:{kick:[`key-1`],snare:[`key-2`],hat:[`key-3`]}},Lt=Xe(`device-config`),Rt=Xe(`audio-engine`);function U(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var zt=class extends R{constructor(...e){super(...e),this.status=`idle`}render(){return M`
      <div class="eyebrow">Field Manual №01 · Vocal Percussion</div>
      <h1>Beat Mapper</h1>
      <p class="tag">Translating human beatbox to silicon memory.</p>
      <hr class="rule" />
      <div class="meta">
        <span>Edition 2026</span>
        <span class="status">${this.status}</span>
        <span>16-Step · 4/4</span>
      </div>
    `}static{this.styles=C`
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
  `}};U([B({type:String})],zt.prototype,`status`,void 0),zt=U([z(`app-header`)],zt);var Bt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Vt=e=>(...t)=>({_$litDirective$:e,values:t}),Ht=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},Ut=class extends Ht{constructor(e){if(super(e),this.it=F,e.type!==Bt.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===F||e==null)return this._t=void 0,this.it=e;if(e===P)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Ut.directiveName=`unsafeHTML`,Ut.resultType=1;var W=Vt(Ut),G={kick:{fg:`var(--kick)`,shape:`circle`,label:`KICK`,gloss:`sub-bass`},snare:{fg:`var(--snare)`,shape:`square`,label:`SNARE`,gloss:`mid-transient`},hat:{fg:`var(--hat)`,shape:`triangle`,label:`HAT`,gloss:`high-freq`}},Wt=[`hat`,`snare`,`kick`],Gt=/^var\((--[\w-]+)\)$/;function Kt(e,t){let n=Gt.exec(t);return n&&getComputedStyle(e).getPropertyValue(n[1]).trim()||t}function K(e,t){let n=`fill="${t}" stroke="var(--ink)" stroke-width="1" stroke-linejoin="round"`;switch(e){case`circle`:return`<svg viewBox="0 0 20 20" width="100%" height="100%"><circle cx="10" cy="10" r="8" ${n}/></svg>`;case`square`:return`<svg viewBox="0 0 20 20" width="100%" height="100%"><rect x="2.5" y="2.5" width="15" height="15" ${n}/></svg>`;case`triangle`:return`<svg viewBox="0 0 20 20" width="100%" height="100%"><path d="M10 2.5 L17.5 17 L2.5 17 Z" ${n}/></svg>`}}var qt=`https://github.com/warmsynths/beat-mapper`,Jt=`https://ko-fi.com/warmsynths`,Yt=class extends R{render(){return M`
      <p class="note">Nothing is captured until you hit record — every take stays in this browser.</p>
      <div class="links">
        <a class="link" style="--accent: var(--kick)" href=${qt} target="_blank" rel="noopener noreferrer">
          <span class="mark">${W(K(`circle`,`var(--kick)`))}</span>GitHub
        </a>
        <span class="sep">·</span>
        <span class="brand">
          <span class="mark">${W(K(`square`,`var(--snare)`))}</span>Made with <span class="heart">♥</span> by warmsynths
        </span>
        <span class="sep">·</span>
        <a class="link" style="--accent: var(--hat)" href=${Jt} target="_blank" rel="noopener noreferrer">
          <span class="mark">${W(K(`triangle`,`var(--hat)`))}</span>Support
        </a>
      </div>
    `}static{this.styles=C`
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
  `}};Yt=U([z(`app-footer`)],Yt);var Xt=900,q=4,Zt=.35,Qt=class extends R{constructor(...e){super(...e),this.recording=!1,this.canvas=null,this.ctx2d=null,this.rafId=0,this.dpr=Math.min(window.devicePixelRatio||1,2),this.resizeObserver=null,this.waveBuf=new Float32Array(2048),this.history=[],this.inkColor=`#201e19`,this.draw=()=>{this.rafId=requestAnimationFrame(this.draw);let e=this.ctx2d,t=this.canvas;if(!e||!t||t.width===0)return;this.sample();let n=t.width,r=t.height,i=r/2;e.clearRect(0,0,n,r),e.strokeStyle=`rgba(154, 147, 132, 0.55)`,e.lineWidth=this.dpr,e.beginPath(),e.moveTo(0,i),e.lineTo(n,i),e.stroke();let a=this.history.length,o=n/(a-1);e.strokeStyle=this.inkColor,e.lineWidth=1.1*this.dpr,e.lineJoin=`round`,e.beginPath();for(let t=0;t<a;t++){let n=t*o,a=this.history[t]*(r*.46),s=a>1?0:Math.sin(t*.7)*.6,c=i-a-s;t===0?e.moveTo(n,c):e.lineTo(n,c)}for(let t=a-1;t>=0;t--){let n=t*o,a=this.history[t]*(r*.46),s=a>1?0:Math.sin(t*.7)*.6,c=i+a+s;e.lineTo(n,c)}if(e.stroke(),this.recording){let t=this.engine?.getBeatPhase();t&&t.beatIndex>=0&&this.drawBeatPulse(e,n,t)}}}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),cancelAnimationFrame(this.rafId)}firstUpdated(){this.canvas=this.renderRoot.querySelector(`canvas`),this.ctx2d=this.canvas?.getContext(`2d`)??null,this.resizeObserver=new ResizeObserver(()=>this.resize()),this.canvas&&this.resizeObserver.observe(this.canvas),this.resize(),this.inkColor=Kt(this,`var(--ink)`),this.history=Array(Xt).fill(0),this.engine&&(this.waveBuf=new Float32Array(this.engine.getWaveformSize())),this.rafId=requestAnimationFrame(this.draw)}resize(){if(!this.canvas)return;let e=this.canvas.getBoundingClientRect();this.canvas.width=Math.max(1,Math.round(e.width*this.dpr)),this.canvas.height=Math.max(1,Math.round(e.height*this.dpr))}sample(){let e=0;if(this.recording&&this.engine?.getWaveform(this.waveBuf)){for(let t=0;t<this.waveBuf.length;t++){let n=Math.abs(this.waveBuf[t]);n>e&&(e=n)}e=Math.min(1,e*1.6)}this.history.push(e),this.history.length>Xt&&this.history.shift()}drawBeatPulse(e,t,n){let r=(n.beatIndex%q+q)%q,i=Math.max(0,1-n.phase/Zt),a=8*this.dpr,o=t*.06,s=(t-o*2)/(q-1),c=2.2*this.dpr;for(let t=0;t<q;t++){let n=o+s*t,l=t===r,u=c*(t===0?1.4:1);e.beginPath(),e.arc(n,a,u,0,Math.PI*2),e.fillStyle=l?this.inkColor:`rgba(154, 147, 132, 0.55)`,e.globalAlpha=l?.35+.65*i:1,e.fill()}e.globalAlpha=1}render(){return M`<canvas></canvas>`}static{this.styles=C`
    :host {
      display: block;
    }
    canvas {
      width: 100%;
      height: 116px;
      display: block;
    }
  `}};U([nt({context:Rt})],Qt.prototype,`engine`,void 0),U([B({type:Boolean})],Qt.prototype,`recording`,void 0),Qt=U([z(`beat-timeline`)],Qt);var $t=16,en={kick:`KCK`,snare:`SNR`,hat:`HAT`},tn=class extends R{constructor(...e){super(...e),this.pattern={steps:[],totalSteps:$t},this.selectedClass=null}onLaneClick(e){this.dispatchEvent(new CustomEvent(`lane-select`,{detail:e,bubbles:!0,composed:!0}))}render(){let e=new Map;for(let t of Wt)e.set(t,new Set);for(let t of this.pattern.steps)e.get(t.class)?.add(t.step);let t=Array.from({length:this.pattern.totalSteps},(e,t)=>t),n=`grid-template-columns: repeat(${this.pattern.totalSteps}, minmax(0, 1fr))`;return M`
      <div class="frame">
        ${Wt.map(r=>{let i=G[r],a=e.get(r),o=K(i.shape,i.fg);return M`
            <div class="lane" ?data-sel=${this.selectedClass===r}>
              <button type="button" class="label" @click=${()=>this.onLaneClick(r)}>
                <span class="sym">${W(o)}</span>
                <span>${en[r]}</span>
              </button>
              <div class="cells" style=${n}>
                ${t.map(e=>M`
                    <div class="cell" ?data-bar=${e%$t===0} ?data-beat=${e%4==0}>
                      ${a.has(e)?M`<span class="mark">${W(o)}</span>`:``}
                    </div>
                  `)}
              </div>
            </div>
          `})}
        <div class="ruler">
          <span class="spacer"></span>
          <div class="nums" style=${n}>
            ${t.map(e=>M`<span>${e%4==0?e/4+1:`·`}</span>`)}
          </div>
        </div>
      </div>
    `}static{this.styles=C`
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
  `}};U([B({attribute:!1})],tn.prototype,`pattern`,void 0),U([B({attribute:!1})],tn.prototype,`selectedClass`,void 0),tn=U([z(`pattern-grid`)],tn);var nn=.3,rn=class extends R{constructor(...e){super(...e),this.level=0,this.threshold=0}render(){let e=Math.min(100,this.level/nn*100),t=Math.min(100,this.threshold/nn*100);return M`
      <div class="track" ?data-hot=${this.level>=this.threshold}>
        <div class="fill" style="width: ${e}%"></div>
        <div class="marker" style="left: ${t}%"></div>
      </div>
    `}static{this.styles=C`
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
  `}};U([B({type:Number})],rn.prototype,`level`,void 0),U([B({type:Number})],rn.prototype,`threshold`,void 0),rn=U([z(`level-meter`)],rn);var J=class extends R{constructor(...e){super(...e),this.sessionPhase=`idle`,this.level=0,this.levelThreshold=0,this.errorMessage=null,this.infoMessage=null,this.recordedHits=[],this.bpm=100,this.targetBpm=100,this.pattern={steps:[],totalSteps:16},this.selectedClass=null,this.headphonesOn=!1,this.isAnalyzingFile=!1,this.hasTakeAudio=!1,this.activeClasses=[`kick`,`snare`,`hat`],this.onRecordClick=()=>{this.dispatchEvent(new CustomEvent(`record-toggle`,{bubbles:!0,composed:!0}))},this.onDownloadAudioClick=()=>{this.dispatchEvent(new CustomEvent(`download-audio`,{bubbles:!0,composed:!0}))},this.onDownloadDiagnosticsClick=()=>{this.dispatchEvent(new CustomEvent(`download-diagnostics`,{bubbles:!0,composed:!0}))},this.onHeadphonesClick=()=>{this.dispatchEvent(new CustomEvent(`headphones-toggle`,{detail:!this.headphonesOn,bubbles:!0,composed:!0}))},this.onFileInputChange=e=>{let t=e.target,n=t.files?.[0];t.value=``,n&&this.dispatchEvent(new CustomEvent(`file-upload`,{detail:n,bubbles:!0,composed:!0}))},this.onActiveClassClick=e=>{this.dispatchEvent(new CustomEvent(`active-class-toggle`,{detail:e,bubbles:!0,composed:!0}))}}adjustBpm(e){this.dispatchEvent(new CustomEvent(`bpm-adjust`,{detail:e,bubbles:!0,composed:!0}))}adjustTargetBpm(e){this.dispatchEvent(new CustomEvent(`target-bpm-adjust`,{detail:e,bubbles:!0,composed:!0}))}render(){let e=this.sessionPhase===`recording`,t=this.sessionPhase===`reviewing`,n=e?`Stop`:t?`Record again`:`Record`,r=e?`RECORDING`:this.isAnalyzingFile?`ANALYZING`:t?`${this.bpm} BPM`:`STANDBY`,i=(Math.max(...this.recordedHits.map(e=>e.timeMs),0)/1e3).toFixed(1);return M`
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
          ${t?F:M`
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
        ${t?F:M`
              <p class="metro-hint">
                ${this.headphonesOn?`Click plays through your headphones, so it never reaches the mic.`:`No click plays through the speakers — follow the pulse on the waveform above instead.`}
              </p>
            `}

        ${this.errorMessage?M`<p class="msg err">${this.errorMessage}</p>`:F}
        ${this.infoMessage?M`<p class="msg info">${this.infoMessage}</p>`:F}

        <div class="legend">
          ${Wt.slice().reverse().map(t=>{let n=G[t];return M`
              <button
                type="button"
                class="key"
                ?data-off=${!this.activeClasses.includes(t)}
                ?disabled=${e}
                @click=${()=>this.onActiveClassClick(t)}
              >
                <span class="sym">${W(K(n.shape,n.fg))}</span>
                <span class="ktext"><b>${n.label.charAt(0)+n.label.slice(1).toLowerCase()}</b><em>${n.gloss}</em></span>
              </button>
            `})}
        </div>
        <p class="legend-hint">Tap a sound you never use to turn it off — the transcription will never reach for it.</p>

        <div class="fig fig2">Fig. 02 — Transcribed Sequence<span class="line"></span></div>
        ${t?M`
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
            `:M`<p class="placeholder">Record a take to see the transcribed sequence here.</p>`}
      </section>
    `}static{this.styles=C`
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
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
      opacity: 1;
      transition: opacity var(--dur-fast) var(--ease);
    }
    .key[data-off] {
      opacity: 0.35;
    }
    .key:hover:not(:disabled) {
      opacity: 0.7;
    }
    .key[data-off]:hover:not(:disabled) {
      opacity: 0.55;
    }
    .key:disabled {
      cursor: default;
    }
    .legend-hint {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-sm);
      color: var(--ink-soft);
      opacity: 0.75;
      margin: var(--space-2) 0 0;
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
  `}};U([B({attribute:!1})],J.prototype,`sessionPhase`,void 0),U([B({type:Number})],J.prototype,`level`,void 0),U([B({type:Number})],J.prototype,`levelThreshold`,void 0),U([B({attribute:!1})],J.prototype,`errorMessage`,void 0),U([B({attribute:!1})],J.prototype,`infoMessage`,void 0),U([B({attribute:!1})],J.prototype,`recordedHits`,void 0),U([B({type:Number})],J.prototype,`bpm`,void 0),U([B({type:Number})],J.prototype,`targetBpm`,void 0),U([B({attribute:!1})],J.prototype,`pattern`,void 0),U([B({attribute:!1})],J.prototype,`selectedClass`,void 0),U([B({type:Boolean})],J.prototype,`headphonesOn`,void 0),U([B({type:Boolean})],J.prototype,`isAnalyzingFile`,void 0),U([B({type:Boolean})],J.prototype,`hasTakeAudio`,void 0),U([B({attribute:!1})],J.prototype,`activeClasses`,void 0),J=U([z(`recording-panel`)],J);var an=[44,87,130,173],on=[196,239,282,325],Y=36,sn=220,cn=[20,67,114,161],ln=[176,223,270,317],un=18,dn=[`kick`,`snare`,`hat`],X=class extends R{constructor(...e){super(...e),this.selectedClass=null,this.stepHighlights=null,this.reviewing=!1}togglePad(e){if(!this.stepHighlights)return;let t=this.deviceConfig.controls[e];t&&this.dispatchEvent(new CustomEvent(`pad-toggle`,{detail:t.id,bubbles:!0,composed:!0}))}toggleClass(e){this.reviewing&&this.dispatchEvent(new CustomEvent(`class-toggle`,{detail:e,bubbles:!0,composed:!0}))}mark(e,t,n){let r=G[n].fg;switch(G[n].shape){case`circle`:return N`<circle cx=${e} cy=${t} r=${11} fill=${r} stroke="var(--ink)" stroke-width="1"/>`;case`square`:return N`<rect x=${e-11} y=${t-11} width=${22} height=${22} fill=${r} stroke="var(--ink)" stroke-width="1"/>`;case`triangle`:return N`<path d=${`M${e} ${t-11-1} L${e+11+1} ${t+11} L${e-11-1} ${t+11} Z`} fill=${r} stroke="var(--ink)" stroke-width="1" stroke-linejoin="round"/>`}}render(){return this.deviceConfig?.gridDimensions===null?this.renderPocketDevice():this.renderGridDevice()}renderGridDevice(){let e=this.stepHighlights!==null&&this.selectedClass!==null,t=Array.from({length:16},(t,n)=>{let r=an[n%4],i=on[Math.floor(n/4)],a=e&&this.stepHighlights.has(n);return N`
        <g class=${`pad ${e?`live`:``}`} @click=${()=>this.togglePad(n)}>
          <rect x=${r} y=${i} width=${Y} height=${Y} rx="5" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.2"/>
          ${a?this.mark(r+Y/2,i+Y/2,this.selectedClass):F}
        </g>`}),n=dn.map((e,t)=>{let n=on[t],r=this.selectedClass===e;return N`
        <g class=${`sel ${this.reviewing?`active`:``}`} @click=${()=>this.toggleClass(e)}>
          <rect x=${sn} y=${n} width=${Y} height=${Y} rx="5"
                fill=${G[e].fg} stroke="var(--ink)" stroke-width=${r?2.6:1.2}/>
          ${r?N`<rect x=${sn-3} y=${n-3} width=${42} height=${42} rx="7" fill="none" stroke="var(--ink)" stroke-width="1"/>`:F}
        </g>`});return M`
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
          <rect x=${sn} y=${on[3]} width=${Y} height=${Y} rx="5"/>
          <line x1=${230} y1=${on[3]+18} x2=${246} y2=${on[3]+18}/>
        </g>
      </svg>
    `}renderPocketDevice(){let e=this.stepHighlights!==null&&this.selectedClass!==null,t=Array.from({length:16},(t,n)=>{let r=cn[n%4],i=ln[Math.floor(n/4)],a=r+un,o=i+un,s=e&&this.stepHighlights.has(n);return N`
        <g class=${`pad ${e?`live`:``}`} @click=${()=>this.togglePad(n)}>
          <circle cx=${a} cy=${o} r=${un} fill="var(--paper)" stroke="var(--ink)" stroke-width="1.2"/>
          ${s?this.mark(a,o,this.selectedClass):F}
        </g>`});return M`
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
    `}get deviceLabel(){return(this.deviceConfig?.name??``).replace(/^Roland\s+/i,``).replace(/^Pocket Operator\s+/i,``)}static{this.styles=C`
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
  `}};U([nt({context:Lt,subscribe:!0})],X.prototype,`deviceConfig`,void 0),U([B({attribute:!1})],X.prototype,`selectedClass`,void 0),U([B({attribute:!1})],X.prototype,`stepHighlights`,void 0),U([B({type:Boolean})],X.prototype,`reviewing`,void 0),X=U([z(`device-atlas`)],X);var fn=class extends R{constructor(...e){super(...e),this.banks=[],this.active=``,this.used=[]}select(e){this.dispatchEvent(new CustomEvent(`bank-change`,{detail:e,bubbles:!0,composed:!0}))}render(){return this.banks.length===0?F:M`
      <div class="row">
        ${this.banks.map(e=>M`
            <button
              type="button"
              class=${e===this.active?`on`:``}
              @click=${()=>this.select(e)}
            >
              ${e}
              ${this.used.includes(e)&&e!==this.active?M`<i class="tick"></i>`:F}
            </button>
          `)}
      </div>
    `}static{this.styles=C`
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
  `}};U([B({attribute:!1})],fn.prototype,`banks`,void 0),U([B({type:String})],fn.prototype,`active`,void 0),U([B({attribute:!1})],fn.prototype,`used`,void 0),fn=U([z(`bank-selector`)],fn);var pn=140,Z=class extends R{constructor(...e){super(...e),this.min=0,this.max=1,this.value=0,this.label=``,this.dragStartY=0,this.dragStartValue=0,this.dragging=!1,this.onPointerDown=e=>{this.dragging=!0,this.dragStartY=e.clientY,this.dragStartValue=this.value,e.currentTarget.setPointerCapture(e.pointerId)},this.onPointerMove=e=>{if(!this.dragging)return;let t=this.dragStartY-e.clientY,n=this.max-this.min,r=this.dragStartValue+t/pn*n;this.value=Math.min(this.max,Math.max(this.min,r)),this.dispatchEvent(new CustomEvent(`value-change`,{detail:this.value,bubbles:!0,composed:!0}))},this.onPointerUp=e=>{this.dragging=!1,e.currentTarget.releasePointerCapture(e.pointerId)}}get ratio(){return(this.value-this.min)/(this.max-this.min)}render(){let e=(-135+this.ratio*270-90)*(Math.PI/180),t=15+Math.cos(e)*10,n=15+Math.sin(e)*10;return M`
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
    `}static{this.styles=C`
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
  `}};U([B({type:Number})],Z.prototype,`min`,void 0),U([B({type:Number})],Z.prototype,`max`,void 0),U([B({type:Number})],Z.prototype,`value`,void 0),U([B({type:String})],Z.prototype,`label`,void 0),Z=U([z(`knob-control`)],Z);var mn=[`kick`,`snare`,`hat`],Q=class extends R{constructor(...e){super(...e),this.devices=[],this.activeBank=``,this.usedBanks=[],this.sessionPhase=`idle`,this.selectedClass=null,this.viewBar=0,this.pattern={steps:[],totalSteps:16},this.isRecording=!1,this.sensMin=0,this.sensMax=1,this.sensitivity=0,this.onDeviceChange=e=>{let t=e.target.value;this.dispatchEvent(new CustomEvent(`device-change`,{detail:t,bubbles:!0,composed:!0}))},this.onSens=e=>{this.dispatchEvent(new CustomEvent(`sensitivity-change`,{detail:e.detail,bubbles:!0,composed:!0}))}}goToBar(e){this.dispatchEvent(new CustomEvent(`bar-change`,{detail:e,bubbles:!0,composed:!0}))}render(){let e=this.sessionPhase===`reviewing`,t=e&&this.selectedClass!==null,n=Math.max(1,Math.ceil(this.pattern.totalSteps/16)),r=t?new Set(this.pattern.steps.filter(e=>e.class===this.selectedClass&&Math.floor(e.step/16)===this.viewBar).map(e=>e.step%16)):null,i=e=>this.pattern.steps.filter(t=>t.class===e).length,a=this.isRecording?`RECORDING`:e?`REVIEW`:`LIVE INPUT`,o=this.deviceConfig.banks?` · BANK ${this.activeBank}`:``;return M`
      <div class="fig">Fig. 03 — Device Atlas<span class="line"></span></div>

      <device-atlas
        .selectedClass=${this.selectedClass}
        .stepHighlights=${r}
        .reviewing=${e}
      ></device-atlas>

      <div class="data">
        <div><b>TARGET</b> : ${this.deviceConfig.name}${o}</div>
        <div><b>ASSIGN</b> : ${mn.map(e=>`${G[e].label}·${i(e)}`).join(` `)}</div>
        <div><b>PADS</b>&nbsp;&nbsp; : 1–16 PERFORMANCE · COL 5 UTIL</div>
        <div><b>STATUS</b> : ${a}</div>
      </div>

      ${e?M`
            <p class="hint">
              ${t?`Bar ${this.viewBar+1}/${n}. Lit pads are ${G[this.selectedClass].label} steps — press these on the device. Tap to fix.`:`Tap a sound in column 5, then tap pads to place its steps.`}
            </p>
            ${t&&n>1?M`
                  <div class="pager">
                    <button ?disabled=${this.viewBar===0} @click=${()=>this.goToBar(this.viewBar-1)}>‹ prev bar</button>
                    <span>bar ${this.viewBar+1} / ${n}</span>
                    <button ?disabled=${this.viewBar===n-1} @click=${()=>this.goToBar(this.viewBar+1)}>next bar ›</button>
                  </div>
                `:F}
          `:F}

      <hr class="rule" />

      <div class="controls">
        ${this.deviceConfig.banks?M`
              <div class="ctl set">
                <span class="ctl-lbl">Set</span>
                <bank-selector .banks=${this.deviceConfig.banks} .active=${this.activeBank} .used=${this.usedBanks}></bank-selector>
              </div>
            `:F}
        <div class="dials">
          <knob-control label="Sens" .min=${this.sensMin} .max=${this.sensMax} .value=${this.sensitivity} @value-change=${this.onSens}></knob-control>
        </div>
      </div>

      <label class="device-pick">
        <span class="ctl-lbl">Device</span>
        <select @change=${this.onDeviceChange} ?disabled=${this.isRecording}>
          ${this.devices.map(e=>M`<option value=${e.id} ?selected=${e.id===this.deviceConfig.id}>${e.name}</option>`)}
        </select>
      </label>
    `}static{this.styles=C`
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
  `}};U([B({attribute:!1})],Q.prototype,`deviceConfig`,void 0),U([B({attribute:!1})],Q.prototype,`devices`,void 0),U([B({type:String})],Q.prototype,`activeBank`,void 0),U([B({attribute:!1})],Q.prototype,`usedBanks`,void 0),U([B({attribute:!1})],Q.prototype,`sessionPhase`,void 0),U([B({attribute:!1})],Q.prototype,`selectedClass`,void 0),U([B({type:Number})],Q.prototype,`viewBar`,void 0),U([B({attribute:!1})],Q.prototype,`pattern`,void 0),U([B({type:Boolean})],Q.prototype,`isRecording`,void 0),U([B({type:Number})],Q.prototype,`sensMin`,void 0),U([B({type:Number})],Q.prototype,`sensMax`,void 0),U([B({type:Number})],Q.prototype,`sensitivity`,void 0),Q=U([z(`hardware-panel`)],Q);var hn=[Mt,Pt,It],gn=1.1,_n=3,vn=()=>({recordedHits:[],bpm:100,pattern:{steps:[],totalSteps:16},selectedClass:null,viewBar:0,sessionPhase:`idle`}),$=class extends R{constructor(...e){super(...e),this.engine=new dt,this.deviceConfig=hn[0],this.errorMessage=null,this.infoMessage=null,this.isAnalyzingFile=!1,this.activeBank=this.deviceConfig.banks?.[0]??``,this.level=0,this.levelThreshold=ct*ot.onsetRatio,this.sensitivity=4.1-ot.onsetRatio,this.headphonesOn=!1,this.targetBpm=100,this.activeClasses=[`kick`,`snare`,`hat`],this.sessionPhase=`idle`,this.recordedHits=[],this.bpm=100,this.pattern={steps:[],totalSteps:16},this.selectedClass=null,this.viewBar=0,this.hasTakeAudio=!1,this.bankStore={},this.recordingStartedAt=0,this.pendingHits=[],this.lastTakeAudio=null,this.lastTakeDiagnostics=[],this.onEngineStateChange=e=>{e.detail===H.IDLE&&(this.level=0)},this.onEngineError=e=>{this.errorMessage=e.detail.message,this.sessionPhase=`idle`},this.onLevel=e=>{this.level=e.detail.level,this.levelThreshold=e.detail.threshold},this.onTransient=e=>{let t=this.engine.getSampleRate();if(!t||this.sessionPhase!==`recording`)return;let n=xt(e.detail,t,this.engine.getFftSize());this.pendingHits=[...this.pendingHits,{features:n,timeMs:performance.now()-this.recordingStartedAt}]},this.onBankChange=e=>{let t=e.detail;t!==this.activeBank&&(this.sessionPhase===`recording`&&(this.engine.stop(),this.finishRecording()),this.saveActiveBank(),this.activeBank=t,this.loadBank(t),this.lastTakeAudio=null,this.lastTakeDiagnostics=[],this.hasTakeAudio=!1)},this.onDeviceChange=e=>{let t=hn.find(t=>t.id===e);t&&(this.sessionPhase===`recording`&&this.engine.stop(),this.deviceConfig=t,this.bankStore={},this.activeBank=t.banks?.[0]??``,this.recordedHits=[],this.pattern={steps:[],totalSteps:16},this.selectedClass=null,this.viewBar=0,this.sessionPhase=`idle`,this.lastTakeAudio=null,this.lastTakeDiagnostics=[],this.hasTakeAudio=!1)},this.onPadStepToggle=e=>{let t=this.selectedClass;if(!t||this.sessionPhase!==`reviewing`)return;let n=this.deviceConfig.controls.findIndex(t=>t.id===e.detail);if(n<0||n>=16)return;let r=this.viewBar*16+n;if(r>=this.pattern.totalSteps)return;let i=this.pattern.steps.some(e=>e.class===t&&e.step===r),a=kt(this.deviceConfig,this.deviceConfig.classMapping[t])[0]?.label??``,o=i?this.pattern.steps.filter(e=>!(e.class===t&&e.step===r)):[...this.pattern.steps,{step:r,class:t,controlLabel:a}];this.pattern={...this.pattern,steps:o}},this.onSensitivityChange=e=>{this.sensitivity=e.detail,this.engine.updateConfig({onsetRatio:4.1-this.sensitivity})},this.onHeadphonesToggle=e=>{this.headphonesOn=e.detail},this.onActiveClassToggle=e=>{let t=e.detail;this.activeClasses.length===1&&this.activeClasses.includes(t)||(this.activeClasses=this.activeClasses.includes(t)?this.activeClasses.filter(e=>e!==t):[...this.activeClasses,t])}}connectedCallback(){super.connectedCallback(),this.engine.addEventListener(`state-change`,this.onEngineStateChange),this.engine.addEventListener(`transient-detected`,this.onTransient),this.engine.addEventListener(`error`,this.onEngineError),this.engine.addEventListener(`level`,this.onLevel)}disconnectedCallback(){super.disconnectedCallback(),this.engine.removeEventListener(`state-change`,this.onEngineStateChange),this.engine.removeEventListener(`transient-detected`,this.onTransient),this.engine.removeEventListener(`error`,this.onEngineError),this.engine.removeEventListener(`level`,this.onLevel),this.engine.stop()}async handleRecordButton(){if(this.errorMessage=null,this.infoMessage=null,this.sessionPhase===`recording`){this.engine.stop(),this.lastTakeAudio=await this.engine.getRecordingBlob(),this.hasTakeAudio=this.lastTakeAudio!==null,this.finishRecording();return}this.recordedHits=[],this.pendingHits=[],this.pattern={steps:[],totalSteps:16},this.selectedClass=null,this.viewBar=0,this.lastTakeAudio=null,this.lastTakeDiagnostics=[],this.hasTakeAudio=!1,this.sessionPhase=`recording`,this.recordingStartedAt=performance.now(),await this.engine.start(this.targetBpm,this.headphonesOn)}async handleFileUpload(e){this.sessionPhase===`recording`&&this.engine.stop(),this.errorMessage=null,this.infoMessage=null,this.recordedHits=[],this.pendingHits=[],this.pattern={steps:[],totalSteps:16},this.selectedClass=null,this.viewBar=0,this.sessionPhase=`idle`,this.isAnalyzingFile=!0,this.lastTakeAudio=e,this.lastTakeDiagnostics=[],this.hasTakeAudio=!0;try{let{hits:t,sampleRate:n}=await ht(e,this.engine.getConfig());this.pendingHits=t.map(e=>({features:xt(e.frames,n,this.engine.getFftSize()),timeMs:e.timeMs})),this.finishRecording()}catch(e){this.errorMessage=e instanceof Error?e.message:`Couldn't read that file.`}finally{this.isAnalyzingFile=!1}}finishRecording(){if(this.pendingHits.length===0){this.sessionPhase=`idle`,this.infoMessage=`No hits detected — raise SENS (or beatbox louder/closer to the mic) and record again.`;return}let e=Et(this.pendingHits.map(e=>e.features),this.activeClasses);this.recordedHits=this.pendingHits.reduce((t,{timeMs:n},r)=>{let i=e[r],[a]=kt(this.deviceConfig,this.deviceConfig.classMapping[i.class]);return a&&t.push({class:i.class,controlId:a.id,controlLabel:a.label,confidence:i.confidence,timeMs:n}),t},[]),this.lastTakeDiagnostics=this.pendingHits.map(({features:t,timeMs:n},r)=>({timeMs:n,class:e[r].class,confidence:e[r].confidence,brightness:t.brightness,lowBandEnergy:t.lowBandEnergy,midBandEnergy:t.midBandEnergy,highBandEnergy:t.highBandEnergy,flatness:t.flatness})),this.bpm=this.targetBpm,this.pattern=Dt(this.recordedHits,this.bpm),this.viewBar=0,this.sessionPhase=`reviewing`}triggerDownload(e,t){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,r.click(),URL.revokeObjectURL(n)}downloadAudio(){if(!this.lastTakeAudio)return;let e=this.lastTakeAudio instanceof File,t=e?``:(this.lastTakeAudio.type.split(`/`)[1]??`webm`).split(`;`)[0],n=e?this.lastTakeAudio.name:`beat-mapper-take.${t}`;this.triggerDownload(this.lastTakeAudio,n)}downloadDiagnostics(){if(this.lastTakeDiagnostics.length===0)return;let e={bpm:this.bpm,device:this.deviceConfig.id,hits:this.lastTakeDiagnostics},t=new Blob([JSON.stringify(e,null,2)],{type:`application/json`});this.triggerDownload(t,`beat-mapper-diagnostics.json`)}adjustBpm(e){this.bpm=Math.min(180,Math.max(60,this.bpm+e)),this.pattern=Dt(this.recordedHits,this.bpm),this.setViewBar(this.viewBar)}adjustTargetBpm(e){this.targetBpm=Math.min(180,Math.max(60,this.targetBpm+e))}saveActiveBank(){this.activeBank&&(this.bankStore={...this.bankStore,[this.activeBank]:{recordedHits:this.recordedHits,bpm:this.bpm,pattern:this.pattern,selectedClass:this.selectedClass,viewBar:this.viewBar,sessionPhase:this.sessionPhase===`recording`?`reviewing`:this.sessionPhase}})}loadBank(e){let t=this.bankStore[e]??vn();this.recordedHits=t.recordedHits,this.bpm=t.bpm,this.pattern=t.pattern,this.selectedClass=t.selectedClass,this.viewBar=t.viewBar,this.sessionPhase=t.sessionPhase,this.errorMessage=null,this.infoMessage=null}get usedBanks(){let e=Object.entries(this.bankStore).filter(([,e])=>e.recordedHits.length>0).map(([e])=>e);return this.recordedHits.length>0&&!e.includes(this.activeBank)&&e.push(this.activeBank),e}toggleSelectedClass(e){this.selectedClass=this.selectedClass===e?null:e}setViewBar(e){let t=Math.max(1,Math.ceil(this.pattern.totalSteps/16));this.viewBar=Math.min(t-1,Math.max(0,e))}render(){let e=this.sessionPhase===`recording`;return M`
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
              .activeClasses=${this.activeClasses}
              @record-toggle=${()=>this.handleRecordButton()}
              @bpm-adjust=${e=>this.adjustBpm(e.detail)}
              @target-bpm-adjust=${e=>this.adjustTargetBpm(e.detail)}
              @lane-select=${e=>this.toggleSelectedClass(e.detail)}
              @headphones-toggle=${this.onHeadphonesToggle}
              @active-class-toggle=${this.onActiveClassToggle}
              @file-upload=${e=>this.handleFileUpload(e.detail)}
              @download-audio=${()=>this.downloadAudio()}
              @download-diagnostics=${()=>this.downloadDiagnostics()}
            ></recording-panel>
          </div>

          <div class="leaf leaf-right">
            <hardware-panel
              .deviceConfig=${this.deviceConfig}
              .devices=${hn}
              .activeBank=${this.activeBank}
              .usedBanks=${this.usedBanks}
              .sessionPhase=${this.sessionPhase}
              .selectedClass=${this.selectedClass}
              .viewBar=${this.viewBar}
              .pattern=${this.pattern}
              .isRecording=${e}
              .sensMin=${gn}
              .sensMax=${_n}
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
    `}static{this.styles=C`
    :host {
      display: block;
      padding: var(--space-4) 0;
      background: var(--paper, #f4f0e6);
      color: var(--ink, #201e19);
      box-sizing: border-box;
    }

    .sheet {
      position: relative;
      max-width: 1080px;
      margin: 0 auto;
      background: var(--paper);
      padding: var(--space-5) var(--space-6) var(--space-6);
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
  `}};if(U([tt({context:Rt})],$.prototype,`engine`,void 0),U([tt({context:Lt}),V()],$.prototype,`deviceConfig`,void 0),U([V()],$.prototype,`errorMessage`,void 0),U([V()],$.prototype,`infoMessage`,void 0),U([V()],$.prototype,`isAnalyzingFile`,void 0),U([V()],$.prototype,`activeBank`,void 0),U([V()],$.prototype,`level`,void 0),U([V()],$.prototype,`levelThreshold`,void 0),U([V()],$.prototype,`sensitivity`,void 0),U([V()],$.prototype,`headphonesOn`,void 0),U([V()],$.prototype,`targetBpm`,void 0),U([V()],$.prototype,`activeClasses`,void 0),U([V()],$.prototype,`sessionPhase`,void 0),U([V()],$.prototype,`recordedHits`,void 0),U([V()],$.prototype,`bpm`,void 0),U([V()],$.prototype,`pattern`,void 0),U([V()],$.prototype,`selectedClass`,void 0),U([V()],$.prototype,`viewBar`,void 0),U([V()],$.prototype,`hasTakeAudio`,void 0),U([V()],$.prototype,`bankStore`,void 0),$=U([z(`app-root`)],$),typeof document<`u`&&!document.getElementById(`beat-mapper-global-styles`)){let e=document.createElement(`style`);e.id=`beat-mapper-global-styles`,e.textContent=[l,u,d,f,p,m,h,g].join(`
`),document.head.appendChild(e)}