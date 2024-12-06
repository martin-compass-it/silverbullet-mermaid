var i=e=>{throw new Error("Not initialized yet")},l=typeof window>"u"&&typeof globalThis.WebSocketPair>"u";typeof Deno>"u"&&(self.Deno={args:[],build:{arch:"x86_64"},env:{get(){}}});var c=new Map,d=0;l&&(globalThis.syscall=async(e,...t)=>await new Promise((n,s)=>{d++,c.set(d,{resolve:n,reject:s}),i({type:"sys",id:d,name:e,args:t})}));function g(e,t,n){l&&(i=n,self.addEventListener("message",s=>{(async()=>{let r=s.data;switch(r.type){case"inv":{let a=e[r.name];if(!a)throw new Error(`Function not loaded: ${r.name}`);try{let o=await Promise.resolve(a(...r.args||[]));i({type:"invr",id:r.id,result:o})}catch(o){console.error("An exception was thrown as a result of invoking function",r.name,"error:",o.message),i({type:"invr",id:r.id,error:o.message})}}break;case"sysr":{let a=r.id,o=c.get(a);if(!o)throw Error("Invalid request id");c.delete(a),r.error?o.reject(new Error(r.error)):o.resolve(r.result)}break}})().catch(console.error)}),i({type:"manifest",manifest:t}))}function u(e){let t=atob(e),n=t.length,s=new Uint8Array(n);for(let r=0;r<n;r++)s[r]=t.charCodeAt(r);return s}function m(e){typeof e=="string"&&(e=new TextEncoder().encode(e));let t="",n=e.byteLength;for(let s=0;s<n;s++)t+=String.fromCharCode(e[s]);return btoa(t)}async function f(e,t){if(typeof e!="string"){let n=new Uint8Array(await e.arrayBuffer()),s=n.length>0?m(n):void 0;t={method:e.method,headers:Object.fromEntries(e.headers.entries()),base64Body:s},e=e.url}return syscall("sandboxFetch.fetch",e,t)}globalThis.nativeFetch=globalThis.fetch;function b(){globalThis.fetch=async function(e,t){let n=t&&t.body?m(new Uint8Array(await new Response(t.body).arrayBuffer())):void 0,s=await f(e,t&&{method:t.method,headers:t.headers,base64Body:n});return new Response(s.base64Body?u(s.base64Body):null,{status:s.status,headers:s.headers})}}l&&b();function y(e){return{html:`<pre class="mermaid">${e.replaceAll("<","&lt;")}</pre>`,script:`
    loadJsByUrl("https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js","sha256-a43bc1afd446f9c4cc66ac5dd45d02e8d65e26fc5344ec0ef787f88d6ddb6f9e").then(() => {
      mermaid.init().then(updateHeight);
      mermaid.registerIconPacks([
        {
          name: 'logos',
          loader: () =>
            fetch('https://unpkg.com/@iconify-json/logos@1/icons.json').then((res) => res.json()),
        },
      ]);
    });
    document.addEventListener("click", () => {
      api({type: "blur"});
    });
    `}}var p={mermaidWidget:y},h={name:"mermaid",version:.1,imports:["https://get.silverbullet.md/global.plug.json"],functions:{mermaidWidget:{path:"./mermaid.ts:widget",codeWidget:"mermaid"}},assets:{}},R={manifest:h,functionMapping:p};g(p,h,self.postMessage);export{R as plug};
