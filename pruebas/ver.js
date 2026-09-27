const fs=require('fs'),path=require('path'),vm=require('vm');
const raiz=path.join(__dirname,'..');
['js/paises.js','js/idiomas.js','js/packs/catalogo.js','js/packs/venecia.js','js/packs/roma.js','js/packs/paris.js','js/packs/lisboa.js','js/packs/generico.js','js/motor.js']
 .forEach(f=>{});
const ctx=vm.createContext({console});
['js/paises.js','js/idiomas.js','js/packs/catalogo.js','js/packs/venecia.js','js/packs/roma.js','js/packs/paris.js','js/packs/lisboa.js','js/packs/generico.js','js/motor.js']
 .forEach(f=>vm.runInContext(fs.readFileSync(path.join(raiz,f),'utf8'),ctx,{filename:f}));
const cfg=JSON.parse(fs.readFileSync(path.join(__dirname,'caso.json'),'utf8'));
const v=ctx.generarViaje(cfg);
console.log('== '+v.meta.titulo+' · '+v.meta.subtitulo+' · '+v.meta.fechas);
console.log('   perfiles: '+v.meta.perfiles.join(', ')+' | ritmo '+v.meta.ritmo+' | '+v.meta.personas+' pers.');
v.dias.forEach(d=>{
  console.log('\n### '+d.dia+' — '+d.titulo+(d.km?' ('+d.km+')':''));
  console.log('    '+d.lema);
  if(d.avisoDia) console.log('    OJO: '+d.avisoDia);
  d.bloques.forEach(b=>{
    console.log('  ['+b.franja+']');
    b.paradas.forEach(p=>console.log('    '+p.hora+'  '+p.nombre+(p.tag==='extra'?'  (opcional)':'')+(p.precio?'  — '+p.precio:'')));
  });
});
console.log('\n== PRESUPUESTO');
v.presupuesto.fijos.forEach(f=>console.log('  '+f.concepto+': '+f.importe+' €'));
v.presupuesto.opciones.forEach(o=>{console.log('  · '+o.titulo);o.alts.forEach(a=>console.log('      '+(a.id===o.elegida?'>':' ')+' '+a.label+': '+a.importe+' €'));});
console.log('\n== CHECKLIST');
v.checklist.forEach(g=>{console.log('  '+g.cat);g.items.forEach(i=>console.log('    - '+i));});
