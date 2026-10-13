// Playwright browser_run_code input. Navigate to the running example before execution.
async (page) => {
 const check=(condition,message)=>{if(!condition)throw new Error(message);};
 const button=page.getByRole('button',{name:'Focus project search',exact:true});
 try {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.reload();
  for(let i=0;i<12;i++){
   await page.keyboard.press('Tab');
   if(await button.evaluate(element=>element===document.activeElement))break;
  }
  const focusVisible=await button.evaluate(element=>element.matches(':focus-visible'));
  check(focusVisible,'Navigation button was not reached by keyboard');
  await button.locator('svg g').first().waitFor({state:'attached',timeout:3000});
  await page.keyboard.press('Enter');
  const actionFocusedSearch=await page.locator('#project-search').evaluate(element=>element===document.activeElement);
  check(actionFocusedSearch,'Enter did not perform the navigation action');
  await page.emulateMedia({reducedMotion:'reduce'});
  await button.hover();
  await page.waitForTimeout(500);
  const reduced={media:await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),svgCount:await button.locator('svg').count(),animatedGroups:await button.locator('svg g').count()};
  check(reduced.media && reduced.svgCount===1 && reduced.animatedGroups===0,'Reduced motion did not retain the static icon');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.mouse.move(0,0);
  await button.hover();
  await button.locator('svg g').first().waitFor({state:'attached',timeout:3000});
  return {focusVisible,keyboardAnimated:true,actionFocusedSearch,reduced,restoredAnimation:true};
 } finally {
  await page.mouse.move(0,0);
  await page.emulateMedia({reducedMotion:null});
 }
}
