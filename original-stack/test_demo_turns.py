import copy
import tempfile
import unittest
from pathlib import Path
from demo_turns import build_turn
from demo_threads import ThreadStore, ThreadError

class RichTextInputTests(unittest.TestCase):
    def input(self):
        return {"type":"text","text":"é 🦀 file","text_elements":[{"byteRange":{"start":3,"end":7},"placeholder":"crab"},{"byteRange":{"start":8,"end":12},"placeholder":None}]}

    def test_utf8_elements_survive_events_without_aliasing(self):
        item=self.input(); expected=copy.deepcopy(item)
        _,completed,events,_=build_turn("thread",{"input":[item]})
        self.assertEqual(completed["items"][0]["content"],[expected])
        messages=[e["params"]["item"] for e in events if e["method"] in ("item/started","item/completed") and e["params"]["item"]["type"]=="userMessage"]
        self.assertTrue(all(m["content"]==[expected] for m in messages))
        item["text_elements"][0]["placeholder"]="changed"
        self.assertEqual(completed["items"][0]["content"],[expected])

    def test_invalid_ranges_and_placeholders_rejected(self):
        for start,end in [(1,2),(3,4),(-1,2),(8,13),(8,7),(False,2),(0,1.0)]:
            item=self.input();item["text_elements"]=[{"byteRange":{"start":start,"end":end},"placeholder":None}]
            with self.subTest(start=start,end=end),self.assertRaises(ValueError):build_turn("t",{"input":[item]})
        for elements in [None,{},[{}],[{"byteRange":{"start":0,"end":2},"placeholder":42}]]:
            item=self.input();item["text_elements"]=elements
            with self.assertRaises(ValueError):build_turn("t",{"input":[item]})

    def test_persist_resume_and_invalid_input_atomicity(self):
        with tempfile.TemporaryDirectory() as directory:
            path=Path(directory)/"threads.json";store=ThreadStore(path)
            started,_=store.handle("thread/start",{});identifier=started["thread"]["id"]
            item=self.input();store.handle("turn/start",{"threadId":identifier,"input":[item]})
            reloaded=ThreadStore(path).handle("thread/read",{"threadId":identifier,"includeTurns":True})[0]["thread"]
            self.assertEqual(reloaded["turns"][0]["items"][0]["content"],[item])
            before=path.read_bytes();item["text_elements"][0]["byteRange"]["end"]=4
            with self.assertRaises(ThreadError):store.handle("turn/start",{"threadId":identifier,"input":[item]})
            self.assertEqual(path.read_bytes(),before)

class ImageInputTests(unittest.TestCase):
    def test_all_image_carriers_preserve_order_and_details(self):
        inputs=[{"type":"text","text":"Inspect","text_elements":[]},{"type":"image","url":"data:image/png;base64,AA==","detail":"low"},{"type":"image","fileId":"demo-file","detail":"original"},{"type":"localImage","path":"C:/demo/image.png","detail":"high"}]
        _,completed,events,preview=build_turn("t",{"input":inputs})
        self.assertEqual(completed["items"][0]["content"],inputs)
        self.assertEqual(preview,"Inspect")
        inputs[1]["url"]="changed"
        self.assertEqual(completed["items"][0]["content"][1]["url"],"data:image/png;base64,AA==")

    def test_image_only_survives_storage_without_file_access(self):
        with tempfile.TemporaryDirectory() as directory:
            path=Path(directory)/"threads.json";store=ThreadStore(path)
            started,_=store.handle("thread/start",{});identifier=started["thread"]["id"]
            inputs=[{"type":"localImage","path":"Z:/does-not-exist/image.png"}]
            store.handle("turn/start",{"threadId":identifier,"input":inputs})
            thread=ThreadStore(path).handle("thread/read",{"threadId":identifier,"includeTurns":True})[0]["thread"]
            self.assertEqual(thread["turns"][0]["items"][0]["content"],inputs)
            self.assertEqual(thread["name"],"Image attachment demo")

    def test_invalid_carriers_are_rejected(self):
        for item in [{"type":"image"},{"type":"image","url":"x","fileId":"y"},{"type":"image","url":False},{"type":"localImage","path":" "},{"type":"image","fileId":"x","detail":"invalid"},{"type":"audio","url":"x"}]:
            with self.subTest(item=item),self.assertRaises(ValueError):build_turn("t",{"input":[item]})

if __name__=="__main__":unittest.main()
