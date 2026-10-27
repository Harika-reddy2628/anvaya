"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[295],{2295:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p,petalGeometry:()=>l,studioEnvironment:()=>c});var i=n(5155),o=n(2115),s=n(5269),a=n(9625),r=n(9346);function l(e,t,n){let i=e/2,o=new s.ypk;o.moveTo(-i,i),o.lineTo(-i,t-i),o.absarc(0,t-i,i,Math.PI,0,!0),o.lineTo(i,i),o.absarc(0,i,i,0,Math.PI,!0);let a=new s.QCA(o,{depth:n,bevelEnabled:!0,bevelThickness:.07,bevelSize:.06,bevelSegments:8,curveSegments:40});return a.translate(0,0,-n/2),a}function c(e){let t=new s.Z58,n=[],i=(e,i,o,a,r=!1)=>{let l=new s.iNn(...e),c=new s.V9B({color:new s.Q1f(o).multiplyScalar(a),side:r?s.hsX:s.hB5});n.push(l,c);let u=new s.eaF(l,c);u.position.set(...i),t.add(u)};i([30,20,30],[0,0,0],"#dfe7ee",1,!0),i([16,.2,8],[0,9.5,2],"#ffffff",5),i([.2,6,14],[-14,5,2],"#ffffff",3),i([.2,6,10],[14,4,-1],"#7cc2f2",3.5),i([28,2.2,.2],[0,-1.2,-14.5],"#0b2230",1),i([28,2.2,.2],[0,-1.2,14.5],"#0b2230",1),i([.2,2.2,28],[-14.5,-1.2,0],"#0b2230",1),i([.2,2.2,28],[14.5,-1.2,0],"#0b2230",1),i([30,.2,30],[0,-9.5,0],"#1a3a4e",1),i([8,6,.2],[2,4,14],"#ffffff",2);let o=new a.BdL(e),r=o.fromScene(t,.02).texture;return o.dispose(),n.forEach(e=>e.dispose()),r}let u={vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`varying vec2 vUv; uniform vec2 uHub; uniform float uTime; uniform float uAspect; uniform vec4 uRipples[12];
    float caustic(vec2 p, float t){
      vec2 i = p; float c = 1.;
      for (int n = 0; n < 4; n++) {
        float tt = t * (1. - 3.5 / float(n + 1));
        i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
        // Guarded: sin and cos reach zero, which would send infinities through the glass transmission.
        vec2 s = vec2(sin(i.x + tt), cos(i.y + tt));
        s = sign(s) * max(abs(s), 1e-3);
        c += 1. / max(length(p * .005 / s), 1e-3);
      }
      c = 1.17 - pow(c / 4., 1.4);
      return clamp(pow(abs(c), 8.), 0., 1.);
    }
    vec3 light(vec2 uv){
      vec3 col = mix(vec3(.972, .978, .985), vec3(.86, .9, .935), smoothstep(.0, 1.3, (1. - uv.y) * .7 + uv.x * .6));
      vec2 a = uHub + vec2(sin(uTime * .21) * .08, .25 + cos(uTime * .17) * .06), b = vec2(.22 + sin(uTime * .13) * .1, .8 + cos(uTime * .19) * .05);
      col = mix(col, vec3(.74, .86, .95), (1. - smoothstep(.0, .42, length((uv - a) * vec2(uAspect, 1.)))) * .55);
      col = mix(col, vec3(1.), (1. - smoothstep(.0, .3, length((uv - b) * vec2(uAspect, 1.)))) * .6);
      return col;
    }
    void main(){
      vec2 uv = vUv, push = vec2(0.); float ring = 0.;
      for (int i = 0; i < 12; i++) {
        vec4 r = uRipples[i];
        float age = uTime - r.z;
        if (r.w <= 0. || age < 0. || age > 3.) continue;
        vec2 d = (uv - r.xy) * vec2(uAspect, 1.);
        float dist = length(d), front = age * .32;
        float wave = sin((dist - front) * 70.) * exp(-abs(dist - front) * 22.) * exp(-age * 1.4) * r.w;
        push += normalize(d + 1e-5) * wave * .012;
        ring += wave;
      }
      uv += push;
      // Vertical flutes: each rib refracts a slightly shifted slice of the light behind and catches a highlight.
      float ribs = 34. * uAspect, f = fract(uv.x * ribs);
      vec2 behind = uv + vec2((f - .5) * .045, 0.);
      vec3 col = light(behind);
      col *= .965 + .05 * sin(f * 3.1416);
      col += vec3(1.) * pow(1. - abs(f - .18) * 6., 6.) * .05 * step(abs(f - .18), .166);
      col += vec3(.7, .86, 1.) * caustic(behind * vec2(uAspect, 1.) * 5., uTime * .35) * .09;
      col += vec3(.9, .96, 1.) * ring * .05;
      gl_FragColor = vec4(clamp(col, 0., 1.), 1.);
    }`};function p(){let e=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let t,n=e.current;if(!n)return;try{t=new a.JeP({antialias:!0,powerPreference:"high-performance"})}catch{n.dataset.scene="failed";return}t.setPixelRatio(Math.min(devicePixelRatio,1.75)),t.outputColorSpace=s.er$,t.toneMapping=s.aJ8,t.domElement.setAttribute("aria-hidden","true"),n.appendChild(t.domElement);let i=new s.Z58,o=c(t);i.environment=o;let p=new s.ubm(30,1,.1,100);p.position.set(0,0,16);let d=new s.BKk({...u,uniforms:{uHub:{value:new s.I9Y(.75,.05)},uTime:{value:0},uAspect:{value:1.6},uRipples:{value:Array.from({length:12},()=>new s.IUQ)}},depthWrite:!1,toneMapped:!1}),v=new s.eaF(new s.bdM(1,1),d);v.position.z=-10,i.add(v);let f=new s.uSd({color:"#ffffff",metalness:0,roughness:.02,transmission:1,thickness:.55,ior:1.5,dispersion:1.2,attenuationColor:"#8fd0f2",attenuationDistance:1.8,clearcoat:1,clearcoatRoughness:.02,envMapIntensity:1.1,specularIntensity:1});f.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace("#include <opaque_fragment>",`#include <opaque_fragment>
        float edgeTint = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 1.5);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(.03, .19, .29), smoothstep(.06, .5, edgeTint) * .88);`)};let m=new s.YJl,h=new s.YJl;m.add(h),i.add(m);let g=[],w=null,b=!1;function x(){g.forEach(e=>h.remove(e.mesh)),g.length=0,w?.dispose();let e=(b=matchMedia("(max-width: 760px)").matches)?11:15,t=s.cj9.degToRad(b?150:170);w=l(b?.5:.92,b?3.3:5.5,b?.18:.22);for(let n=0;n<e;n++){let i=n/(e-1),o=new s.eaF(w,f);o.position.z=(n-e/2)*.045,h.add(o),g.push({mesh:o,base:(i-.5)*t,order:2*Math.abs(i-.5),turn:-.55+.2*i})}m.position.set(4.1*!b,b?-5.55:-4.9,0),m.rotation.set(-.32,b?0:-.38,.1*!b),d.uniforms.uHub.value.set(b?.5:.74,.05)}x();let y={open:0,scroll:0,px:0,py:0,pointerAngle:9,pointerOn:0},E=0,M=0,T=0,A=!1,z=!1,L=new s.zD7,R=new s.Pq0;function S(){if(z||!E||!M)return;let e=L.getElapsedTime();d.uniforms.uTime.value=e,g.forEach((t,n)=>{let i=r.os.utils.clamp(0,1,(y.open-.45*t.order)/.55),o=1===i?1:1-Math.pow(2,-10*i)*Math.cos(7*i),s=.035*Math.sin(.9*e-.42*n),a=t.base-y.pointerAngle,l=Math.sign(a)*Math.exp(-a*a*14)*.16*y.pointerOn;t.mesh.rotation.set(0,t.turn+.05*Math.sin(.6*e+.3*n),-(t.base*o*(1+.2*y.scroll))+s+l,"ZYX")}),h.rotation.z=.55*y.scroll,m.rotation.y+=((b?0:-.38)+.22*y.px-m.rotation.y)*.05,m.rotation.x+=(-.32-.14*y.py-m.rotation.x)*.05,m.scale.setScalar(1+.18*y.scroll);try{t.render(i,p),n.dataset.scene="ready"}catch{n.dataset.scene="failed",k()}}let C=()=>{T=requestAnimationFrame(C),S()};function k(){A=!1,cancelAnimationFrame(T)}function P(){if(E=n.clientWidth,M=n.clientHeight,!E||!M)return;let e=b;t.setSize(E,M),p.aspect=E/M,p.updateProjectionMatrix();let i=2*Math.tan(s.cj9.degToRad(p.fov/2))*(p.position.z-v.position.z);v.scale.set(i*p.aspect*1.1,1.1*i,1),d.uniforms.uAspect.value=p.aspect,matchMedia("(max-width: 760px)").matches!==e&&x(),S()}let _=n.closest(".hero")??n,F=r.os.to(y,{open:1,duration:3.2,delay:.25,ease:"power1.out"}),I=r.uY.create({trigger:_,start:"top top",end:"bottom top",scrub:!0,onUpdate:e=>{y.scroll=e.progress}}),Y=e=>{y.px=e.clientX/innerWidth-.5,y.py=e.clientY/innerHeight-.5,R.copy(m.position).project(p);let t=n.getBoundingClientRect(),i=t.left+(R.x+1)/2*t.width,o=t.top+(1-R.y)/2*t.height,s=Math.atan2(-(e.clientX-i),o-e.clientY);r.os.to(y,{pointerAngle:s,pointerOn:1,duration:.6,ease:"power3.out",overwrite:"auto"})},B=0,O={x:-1,y:-1,t:0};function j(e,t){let i=n.getBoundingClientRect(),o=.5+((e.clientX-i.left)/i.width-.5)/1.1,s=.5+(1-(e.clientY-i.top)/i.height-.5)/1.1,a=L.getElapsedTime();t<1.5&&(a-O.t<.07||.015>Math.hypot(o-O.x,s-O.y))||(O={x:o,y:s,t:a},d.uniforms.uRipples.value[B].set(o,s,a,t),B=(B+1)%12)}let H=e=>j(e,.55),U=e=>j(e,2);_.addEventListener("pointermove",H,{passive:!0}),_.addEventListener("pointerdown",U);let X=()=>r.os.to(y,{pointerOn:0,duration:1,ease:"power2.out"});_.addEventListener("pointermove",Y,{passive:!0}),_.addEventListener("pointerleave",X);let q=!0,J=()=>{q&&!document.hidden?A||z||(A=!0,L.start(),C()):k()},N=new IntersectionObserver(e=>{q=e[0].isIntersecting,J()});N.observe(n),document.addEventListener("visibilitychange",J);let V=new ResizeObserver(P);V.observe(n);let D=e=>{e.preventDefault(),n.dataset.scene="failed",k()};return t.domElement.addEventListener("webglcontextlost",D),P(),J(),()=>{z=!0,k(),F.kill(),I.kill(),r.os.killTweensOf(y),_.removeEventListener("pointermove",Y),_.removeEventListener("pointerleave",X),_.removeEventListener("pointermove",H),_.removeEventListener("pointerdown",U),document.removeEventListener("visibilitychange",J),N.disconnect(),V.disconnect(),t.domElement.removeEventListener("webglcontextlost",D),w?.dispose(),f.dispose(),v.geometry.dispose(),d.dispose(),o.dispose(),t.dispose(),t.domElement.remove()}},[]),(0,i.jsx)("div",{className:"live-scene",ref:e,"data-scene":"loading"})}}}]);