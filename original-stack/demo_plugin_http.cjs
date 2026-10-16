// Synthetic remote catalog reads consumed by the original plugin service UI.
function demoPluginHttp(method,url){
 if(method!=='GET'||url.origin!=='https://chatgpt.com')return null;
 const id='plugin_rea_catalog_demo';
 if(!['/ps/plugins/list','/ps/plugins/installed','/ps/plugins/'+id].includes(url.pathname))return null;
 // Fields consumed by bAo/H2/pQr in the shipped bundles. No capabilities execute.
 const plugin={id,name:'rea-catalog-demo',scope:'USER',workspace_id:null,creator_name:'REA Demo',
  status:'ENABLED',installation_policy:'AVAILABLE',authentication_policy:'ON_USE',discoverability:'PRIVATE',
  is_template:false,canonical_app_id:null,connector_id:null,share_url:null,
  release:{id:'plugin_release_rea_catalog_demo',version:'1.0.0',display_name:'REA Catalog Demo',
   description:'Synthetic remote catalog entry for original frontend navigation.',requires_local_executor:false,
   skills:[],app_ids:[],app_templates:[],mcp_servers:[],keywords:['demo','catalog'],
   interface:{display_name:'REA Catalog Demo',short_description:'Explore the original remote plugin detail.',
    long_description:'A synthetic plugin used to verify the original catalog and detail screens. No executable capabilities.',
    capabilities:[],category:null,logo_url:null,logo_url_dark:null,composer_icon_url:null,
    developer_name:'REA Demo',default_prompts:[],screenshot_urls:[]}}};
 if(url.pathname==='/ps/plugins/'+id)return plugin;
 const installed=url.pathname==='/ps/plugins/installed';
 if(!installed&&url.searchParams.get('scope')!=='USER')throw Error('Only synthetic USER plugin catalog is supported');
 const raw=url.searchParams.get('limit');
 if(raw!==null&&!/^[1-9][0-9]*$/.test(raw))throw Error('Invalid plugin page limit');
 const limit=raw===null?(installed?1000:50):Number(raw);
 if(limit>(installed?1000:100)||url.searchParams.get('pageToken'))throw Error('Unsupported demo plugin page');
 return {plugins:installed?[]:[plugin],pagination:{limit,next_page_token:null}};
}
module.exports={demoPluginHttp};
