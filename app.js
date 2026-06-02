   // Wrap all DOM access in DOMContentLoaded to avoid issues where elements are not present yet
    document.addEventListener('DOMContentLoaded', ()=>{
      // Basic nav
      document.querySelectorAll('a.nav-link').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=a.getAttribute('href').slice(1);location.hash=t;document.getElementById(t)?.scrollIntoView({behavior:'smooth',block:'start'})})});

      // Theme toggle
      const themeToggle = document.getElementById('themeToggle');
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      const savedTheme = localStorage.getItem('sg_theme');

      function applyTheme(t){
        if(t === 'dark'){
          document.body.classList.add('dark');
          if(themeToggle) themeToggle.checked = true;
          if(metaTheme) metaTheme.setAttribute('content','#0b0f13');
        }else{
          document.body.classList.remove('dark');
          if(themeToggle) themeToggle.checked = false;
          if(metaTheme) metaTheme.setAttribute('content','#ffffff');
        }
      }

      // Apply saved theme (default is light)
      applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

      if(themeToggle){
        themeToggle.addEventListener('change',()=>{
          const newTheme = themeToggle.checked ? 'dark' : 'light';
          applyTheme(newTheme);
          localStorage.setItem('sg_theme', newTheme);
        });
      }

      // Utilities
      function copyToClipboard(text){ if(!text) return alert('Nothing to copy'); if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>alert('Copied to clipboard')).catch(()=>fallbackCopy(text))}else{fallbackCopy(text)} }
      function fallbackCopy(text){const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();alert('Copied (fallback)') }

      // Password generation helpers
      function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}
      function randomDigits(n){let s='';for(let i=0;i<n;i++)s+=Math.floor(Math.random()*10);return s}
      function generatePasswordCustom(len,upper,lower,numbers,symbols){
        const U='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const L='abcdefghijklmnopqrstuvwxyz';
        const N='0123456789';
        const S='!@#$%^&*()-_=+[]{};:,.<>?/~`';
        let pool='';
        if(upper)pool+=U;
        if(lower)pool+=L;
        if(numbers)pool+=N;
        if(symbols)pool+=S;
        if(!pool) return '';
        let pwd='';
        const types=[];
        if(upper)types.push(U);
        if(lower)types.push(L);
        if(numbers)types.push(N);
        if(symbols)types.push(S);
        // Ensure each selected type is represented at least once
        for(let i=0;i<types.length;i++){
          const set = types[i];
          pwd += set[Math.floor(Math.random()*set.length)];
        }
        for(let i=pwd.length;i<len;i++) pwd += pool[Math.floor(Math.random()*pool.length)];
        // Shuffle
        pwd = pwd.split('').sort(()=>Math.random()-0.5).join('');
        return pwd;
      }
      function generatePassword(len,opts){
        if(typeof opts==='string'){
          if(opts==='super') return generatePasswordCustom(len,true,true,true,true);
          if(opts==='gamer') return smartSuggestions('gamer',1)[0].pwd;
          if(opts==='stylish') return smartSuggestions('stylish',1)[0].pwd;
          if(opts==='minimal') return smartSuggestions('minimal',1)[0].pwd;
        }
        const {upper,lower,numbers,symbols} = opts || {upper:true,lower:true,numbers:true,symbols:true};
        return generatePasswordCustom(len,upper,lower,numbers,symbols);
      }

      // Smart suggestions
      function smartSuggestions(category,count){
        const out=[];
        for(let i=0;i<count;i++){
          if(category==='super'){
            const len=20+Math.floor(Math.random()*11);
            out.push({pwd:generatePasswordCustom(len,true,true,true,true),meta:'Super secure — long mixed characters'});
          }else if(category==='gamer'){
            const base=pick(['Nova','Echo','Apex','Vortex','Neon','Zenith','Orion']);
            const suffix=randomDigits(2)+pick(['','_x','_pro','_yt']);
            const add=pick(['!','@','#','$']);
            const pwd=base+suffix+add;
            out.push({pwd,meta:'Gamer style — memorable + symbols'});
          }else if(category==='stylish'){
            const len=12+Math.floor(Math.random()*6);
            let p=generatePasswordCustom(len,true,true,true,true);
            const mid=Math.floor(p.length/2);
            const pretty=p.slice(0,mid)+'-'+p.slice(mid);
            out.push({pwd:pretty,meta:'Stylish — balanced security + look'});
          }else{
            const len=10+Math.floor(Math.random()*3);
            out.push({pwd:generatePasswordCustom(len,true,true,true,false),meta:'Minimal — easy to type, moderate security'});
          }
        }
        return out;
      }

      // Elements (check existence before using)
      const quickGen = document.getElementById('quickGen');
      const quickResult = document.getElementById('quickResult');
      const quickCopy = document.getElementById('quickCopy');
      const quickLength = document.getElementById('quickLength');
      const length = document.getElementById('length');
      const lengthVal = document.getElementById('lengthVal');
      const generateBtn = document.getElementById('generate');
      const copyBtn = document.getElementById('copy');
      const saveBtn = document.getElementById('save');
      const result = document.getElementById('result');
      const strengthBar = document.getElementById('strengthBar');
      const strengthText = document.getElementById('strengthText');
      const genSuggest = document.getElementById('genSuggest');
      const suggestCategory = document.getElementById('suggestCategory');
      const suggestionsEl = document.getElementById('suggestions');
      const genUser = document.getElementById('genUser');
      const userList = document.getElementById('userList');
      const checkBtn = document.getElementById('checkBtn');
      const checkInput = document.getElementById('checkInput');
      const checkResult = document.getElementById('checkResult');

      // Safe event binding helpers
      if(quickGen){
        quickGen.addEventListener('click', ()=>{
          const len = parseInt(quickLength?.value,10) || 16;
          const pwd = generatePassword(len,'super');
          if(quickResult) quickResult.textContent = pwd;
          // attach meta to quickResult panel (if present)
          renderSuggestionMeta(pwd, quickResult);
          // update global strength display
          updateStrength(pwd);
        });
      }
      if(quickCopy) quickCopy.addEventListener('click', ()=>copyToClipboard(quickResult?.textContent));

      if(length && lengthVal) length.addEventListener('input', ()=> lengthVal.textContent = length.value);
      if(generateBtn){
        generateBtn.addEventListener('click', ()=>{
          const opts = {upper:document.getElementById('upper').checked, lower:document.getElementById('lower').checked, numbers:document.getElementById('numbers').checked, symbols:document.getElementById('symbols').checked};
          const pwd = generatePassword(parseInt(length.value,10)||16, opts);
          if(result) result.textContent = pwd;
          updateStrength(pwd);
          renderSuggestionMeta(pwd, result);
        });
      }
      if(copyBtn) copyBtn.addEventListener('click', ()=>copyToClipboard(result?.textContent));
      if(saveBtn){
        saveBtn.addEventListener('click', ()=>{
          const name = prompt('Label for this password (e.g. Gmail, Bank) — saved locally only:');
          if(!name) return alert('Cancelled');
          savePassword(name, result?.textContent);
          renderSaved();
        });
      }

      if(genSuggest){
        genSuggest.addEventListener('click', ()=>{const cat=suggestCategory.value;const arr=smartSuggestions(cat,6);renderSuggestions(arr)});
      }

      function renderSuggestions(list){
        if(!suggestionsEl) return;
        suggestionsEl.innerHTML='';
        list.forEach(item=>{
          const wrap=document.createElement('div');wrap.className='suggestion';
          const left=document.createElement('div');
          const title=document.createElement('div');title.style.fontFamily='ui-monospace,monospace';title.style.fontWeight='700';title.textContent=item.pwd;
          const meta=document.createElement('div');meta.className='meta';meta.textContent=item.meta;
          left.appendChild(title);left.appendChild(meta);
          const right=document.createElement('div');right.style.display='flex';right.style.gap='8px';
          const btnCopy=document.createElement('button');btnCopy.className='btn';btnCopy.textContent='Copy';btnCopy.addEventListener('click',()=>copyToClipboard(item.pwd));
          const btnUse=document.createElement('button');btnUse.className='btn secondary';btnUse.textContent='Use';btnUse.addEventListener('click',()=>{ if(result) result.textContent=item.pwd; updateStrength(item.pwd); renderSuggestionMeta(item.pwd, result) });
          right.appendChild(btnCopy);right.appendChild(btnUse);
          wrap.appendChild(left);wrap.appendChild(right);suggestionsEl.appendChild(wrap);
        });
      }

      // Attach meta info to the correct result panel.
      // If 'hostEl' is provided, attach to hostEl.parentElement; otherwise attach to main generator parent.
      function renderSuggestionMeta(pwd, hostEl){
        const ent = estimateEntropy(pwd);
        const seconds = Math.pow(2,ent/1.5)/1e9;
        const desc = humanDuration(seconds);
        const metaText = 'Entropy: '+Math.round(ent)+' bits · Estimated brute-force: '+desc;
        const hostParent = (hostEl && hostEl.parentElement) || (result && result.parentElement) || document.body;
        let box = hostParent.querySelector('.meta-inline');
        if(box){
          box.textContent = metaText;
        }else{
          const div=document.createElement('div');
          div.className='meta-inline';
          div.style.marginTop='8px';
          div.style.color='#6b7280';
          div.textContent=metaText;
          hostParent.appendChild(div);
        }
      }

      // Strength analysis
      function analyzePassword(pwd){
        let score=0;const advice=[];
        if(pwd.length>=8) score+=Math.min((pwd.length-7)*5,40); else advice.push('Use at least 8 characters');
        const hasLower = /[a-z]/.test(pwd);
        const hasUpper = /[A-Z]/.test(pwd);
        const hasNum = /[0-9]/.test(pwd);
        const hasSym = /[^A-Za-z0-9]/.test(pwd);
        const variety = [hasLower,hasUpper,hasNum,hasSym].filter(Boolean).length;
        score += variety*14;
        if(!hasUpper) advice.push('Add uppercase');
        if(!hasLower) advice.push('Add lowercase');
        if(!hasNum) advice.push('Add numbers');
        if(!hasSym) advice.push('Add symbols');
        score = Math.min(100, Math.floor(score));
        const rating = score<35? 'Poor' : score<65? 'Okay' : score<85? 'Good' : 'Excellent';
        const tag = score<35? 'Weak' : score<65? 'Fair' : score<85? 'Strong' : 'Unbreakable';
        return {score, rating, advice, tag};
      }
      function updateStrength(pwd){ 
        if(!strengthBar || !strengthText) return;
        if(!pwd){ strengthBar.style.width='0%'; strengthText.textContent='No password'; return }
        const a = analyzePassword(pwd);
        strengthBar.style.width = Math.min(100,a.score)+'%';
        strengthText.textContent = a.tag+' · '+a.rating;
      }

      function estimateEntropy(pwd){ let pool=0; if(/[a-z]/.test(pwd)) pool+=26; if(/[A-Z]/.test(pwd)) pool+=26; if(/[0-9]/.test(pwd)) pool+=10; if(/[^A-Za-z0-9]/.test(pwd)) pool+=32; if(pool===0) pool=1; return Math.log2(Math.pow(pool, Math.max(1,pwd.length))) }
      function humanDuration(sec){ if(!isFinite(sec)||sec>3.154e16) return 'More than 1 billion years'; const years = sec/(60*60*24*365); if(years<0.001) return Math.round(sec*1000)/1000+' seconds'; if(years<1) return Math.round(years*365)+' days'; if(years<1000) return Math.round(years)+' years'; if(years<1e6) return Math.round(years/1000)+' thousand years'; return Math.round(years/1e6)+' million years' }

      // Username generator
      if(genUser){
        genUser.addEventListener('click', ()=>{ const style = document.getElementById('unameStyle').value; const arr = generateUsernames(style,8); renderUserList(arr); });
      }
      function generateUsernames(style,count){
        const cool=['Nova','Echo','Apex','Vortex','Neon','Zenith','Orion','Halo','Kairo','Luma'];
        const gamer=['xX','_99','Pro','Killer','_YT','HD','X','Skull','_OP','OG'];
        const pro=['Tech','Dev','Hub','Labs','Works','Studio','Edge','Core','Prime','Net'];
        const out=[];for(let i=0;i<count;i++){ if(style==='cool') out.push(pick(cool)+randomDigits(2)); else if(style==='gamer') out.push(pick(cool)+pick(gamer)+randomDigits(2)); else if(style==='pro') out.push(pick(pro)+randomDigits(3)); else out.push(pick(cool)+pick(pro)+randomDigits(2)); } return out;
      }
      function renderUserList(arr){ if(!userList) return; userList.innerHTML=''; arr.forEach(u=>{ const item=document.createElement('div'); item.className='saved-item'; const l=document.createElement('div'); l.style.display='flex'; l.style.gap='12px'; l.style.alignItems='center'; const badge=document.createElement('div'); badge.className='badge'; badge.textContent='@'; const text=document.createElement('div'); text.textContent=u; l.appendChild(badge); l.appendChild(text); const r=document.createElement('div'); const c=document.createElement('button'); c.className='btn secondary'; c.textContent='Copy'; c.addEventListener('click',()=>copyToClipboard(u)); r.appendChild(c); item.appendChild(l); item.appendChild(r); userList.appendChild(item); }); }

      // Saved passwords (local)
      function getSaved(){ try{ return JSON.parse(localStorage.getItem('sg_saved')||'[]') }catch(e){ return [] } }
      function savePassword(label,pwd){ if(!pwd) return alert('No password to save'); const arr = getSaved(); arr.unshift({id:Date.now(),label,pwd}); localStorage.setItem('sg_saved', JSON.stringify(arr)); alert('Saved locally') }
      function mask(s){ return '•'.repeat(Math.min(12, (s||'').length)) }
      function renderSaved(){ const arr=getSaved(); const el=document.getElementById('savedList'); if(!el) return; el.innerHTML=''; if(arr.length===0){ el.textContent='No saved passwords yet.'; return } arr.forEach(it=>{ const item=document.createElement('div'); item.className='saved-item'; const left=document.createElement('div'); left.style.display='flex'; left.style.gap='12px'; left.style.alignItems='center'; const badge=document.createElement('div'); badge.className='badge'; badge.textContent = it.label? it.label[0] : '#'; const info=document.createElement('div'); info.style.minWidth='160px'; info.style.overflow='hidden'; info.style.textOverflow='ellipsis'; const strong=document.createElement('strong'); strong.textContent = it.label; const tiny=document.createElement('div'); tiny.style.color='#6b7280'; tiny.style.fontSize='13px'; tiny.textContent = mask(it.pwd); info.appendChild(strong); info.appendChild(tiny); left.appendChild(badge); left.appendChild(info); const right=document.createElement('div'); right.style.display='flex'; right.style.gap='8px'; const btnReveal=document.createElement('button'); btnReveal.className='btn'; btnReveal.textContent='Reveal'; btnReveal.addEventListener('click', ()=>{ alert('Label: '+it.label+'\nPassword: '+it.pwd); }); const btnCopy=document.createElement('button'); btnCopy.className='btn secondary'; btnCopy.textContent='Copy'; btnCopy.addEventListener('click', ()=>copyToClipboard(it.pwd)); const btnDel=document.createElement('button'); btnDel.className='btn secondary'; btnDel.textContent='Delete'; btnDel.addEventListener('click', ()=>{ if(!confirm('Delete this saved password?')) return; const remaining=getSaved().filter(x=>x.id!==it.id); localStorage.setItem('sg_saved', JSON.stringify(remaining)); renderSaved(); }); right.appendChild(btnReveal); right.appendChild(btnCopy); right.appendChild(btnDel); item.appendChild(left); item.appendChild(right); el.appendChild(item); }); }
      document.getElementById('exportBtn')?.addEventListener('click', ()=>{ const data = localStorage.getItem('sg_saved')||'[]'; copyToClipboard(data); alert('Saved JSON copied to clipboard') });
      document.getElementById('clearAll')?.addEventListener('click', ()=>{ if(confirm('Clear all saved passwords?')){ localStorage.removeItem('sg_saved'); renderSaved() } });

      // Strength checker
      checkBtn?.addEventListener('click', ()=>{ const pwd = (checkInput.value||'').trim(); if(!pwd) return alert('Please enter a password to check'); const analysis = analyzePassword(pwd); const ent = Math.round(estimateEntropy(pwd)); const sec = Math.pow(2,ent/1.5)/1e9; checkResult.innerHTML = '<strong>Score:</strong> '+analysis.score+'/100 — <em>'+analysis.rating+'</em><br/><strong>Entropy:</strong> '+ent+' bits · <strong>Est. brute-force:</strong> '+humanDuration(sec)+'<br/><strong>Advice:</strong> '+(analysis.advice.length?analysis.advice.join(', '):'None'); });
      document.getElementById('clearCheck')?.addEventListener('click', ()=>{ if(checkInput) checkInput.value=''; if(checkResult) checkResult.textContent='No password checked yet.' });

      // other bindings
      document.getElementById('jump-generator')?.addEventListener('click', ()=>{ location.hash='tools'; document.getElementById('generator')?.scrollIntoView({behavior:'smooth',block:'start'}) });
      document.getElementById('try-tools')?.addEventListener('click', ()=>{ location.hash='tools'; document.getElementById('tools')?.scrollIntoView({behavior:'smooth',block:'start'}) });
      document.getElementById('sendMsg')?.addEventListener('click', ()=>{ alert('This demo does not actually send messages. Configure a serverless endpoint to handle submissions.') });
      document.addEventListener('keydown', e=>{ if(e.ctrlKey&&e.key==='g'){ e.preventDefault(); document.getElementById('generator')?.scrollIntoView({behavior:'smooth',block:'start'}) } });

      // init
      renderSaved();

      // --- Basic tests for critical functions (console + hidden output) ---
      const tests = [];
      try{
        tests.push({name:'entropy small', val: estimateEntropy('a')>0});
        tests.push({name:'entropy mixed', val: estimateEntropy('Aa1!')>estimateEntropy('a')});
        tests.push({name:'analyze short', val: analyzePassword('abc').score<30});
        tests.push({name:'analyze strong', val: analyzePassword('Aq1!zY9@3r').score>60});
        tests.push({name:'generate length', val: generatePassword(12,{upper:true,lower:true,numbers:true,symbols:true}).length===12});
      }catch(e){ tests.push({name:'tests crashed', val:false,err:e.message}) }
      const testOut = document.getElementById('testOutput');
      if(testOut) testOut.style.display='none';
      console.group('SecureGen Tests');
      tests.forEach(t=>{ console.log(t.name, t.val ? 'PASS' : 'FAIL', t.err? t.err : ''); });
      console.groupEnd();

    }); // e
