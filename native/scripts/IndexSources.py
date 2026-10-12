"""Index every extracted artifact without mistaking filename matches for behavior."""
import argparse, collections, csv, json
from pathlib import Path

p = argparse.ArgumentParser()
p.add_argument('--inventory', type=Path, required=True)
p.add_argument('--catalog', type=Path, required=True)
a = p.parse_args()
rows = json.loads(a.inventory.read_text(encoding='utf-8-sig'))
links = collections.defaultdict(set)
for f in a.catalog.glob('*.json'):
    if f.name in {'source-summary.json', 'implementation-status.json'}:
        continue
    data = json.loads(f.read_text(encoding='utf-8-sig'))
    for family in data.get('families', data.get('features', [])):
        for source in family.get('sources', family.get('evidence', [])):
            path = source['path'] if isinstance(source, dict) else source
            links[path.replace('\\','/').removeprefix('extracted/')].add(family['id'])

def classify(path):
    name=Path(path).name.lower(); ext=Path(path).suffix.lower()
    if path.startswith('node_modules/'):
        return 'packaged_dependency', 'platform_or_dependency_review'
    if path.startswith('.vite/'):
        return 'electron_host', 'native_platform_adapters'
    if path.startswith('native-menu-locales/'):
        return 'native_menu_locale', 'i18n_catalog'
    if ext in {'.woff','.woff2','.ttf'}:
        return 'font', 'theme_font_registry'
    if ext in {'.svg','.png','.jpg','.webp','.avif','.icns'}:
        return 'visual_asset', 'native_asset_registry'
    if name.startswith('lucide-'):
        return 'icon_module', 'controls_icon'
    if ext == '.css':
        return 'stylesheet', 'theme_and_layout_translation'
    if ext in {'.wav','.ogg','.mp4'}:
        return 'media_asset', 'media_fixture_player'
    if ext == '.wasm':
        return 'web_engine_binary', 'engine_or_web_content_boundary'
    if ext in {'.json','.data','.xlsx','.docx','.pptx'}:
        return 'data_or_fixture', 'typed_data_or_artifact_adapter'
    if ext in {'.js','.mjs'}:
        return 'javascript_module', 'requires_semantic_mapping'
    if ext in {'.html'}:
        return 'web_entry', 'native_shell_or_web_content_host'
    return 'other_packaged_resource', 'resource_review'

counts=collections.Counter(); covered=0
with (a.catalog/'source-inventory.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.writer(f)
    w.writerow(['source_path','bytes','sha256','integrity','resource_class','rust_target_area','evidence_families','mapping_basis'])
    for row in rows:
        source=row['path']; kind,target=classify(source); counts[kind]+=1
        families=sorted(links[source]); covered+=bool(families)
        w.writerow([source,row.get('bytes',0),row.get('sha256',''),row['status'],kind,target,';'.join(families),'static_content_reference' if families else 'inventory_classification_only'])
unknown=sorted(set(links)-{r['path'] for r in rows})
if unknown:
    raise SystemExit('Catalog references missing files: '+repr(unknown))
summary={'schema_version':1,'total_source_entries':len(rows),'indexed_entries':sum(counts.values()),'content_referenced_source_files':covered,'resource_classes':dict(counts),'coverage_statement':'Every source entry is indexed. Inventory classification is not a complete semantic migration or native behavior verification.','source_sha256_manifest':str(a.inventory),'missing_evidence_paths':unknown}
(a.catalog/'source-summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary,indent=2))
