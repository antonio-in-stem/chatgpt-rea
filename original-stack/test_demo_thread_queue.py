import copy
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from demo_threads import ThreadStore, THREAD, ThreadError
from demo_transport import handle_message

class ThreadQueueTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.path = Path(self.temp.name) / 'threads.json'
        self.store = ThreadStore(self.path, streaming=True)
        self.thread_id = THREAD['id']

    def call(self, action, **params):
        return self.store.handle('thread/queue/' + action, {'threadId':self.thread_id, **params})

    def add(self, client='queued-client'):
        return self.call('add',clientUserMessageId=client,input=[{'type':'text','text':'Demo queued message'}])[0]['queuedSubmission']

    def test_start_commits_turn_and_removal_together(self):
        item = self.add()
        commits = []
        original = self.store._commit
        def commit(data):
            commits.append(copy.deepcopy(data))
            original(data)
        with patch.object(self.store,'_commit',side_effect=commit):
            reply, events = self.call('start',queuedSubmissionId=item['id'])
        self.assertEqual(len(commits),1)
        restored = ThreadStore(self.path,streaming=True)
        self.assertEqual(restored.handle('thread/queue/list',{'threadId':self.thread_id})[0]['data'],[])
        turn = restored.data['threads'][self.thread_id]['thread']['turns'][-1]
        self.assertEqual(turn['id'],reply['turn']['id'])
        self.assertEqual(turn['status'],'inProgress')
        self.assertEqual(turn['items'][0]['clientId'],'queued-client')
        self.assertEqual(events[0],{'method':'thread/queue/changed','params':{'threadId':self.thread_id}})

    def test_failure_preserves_queue_and_does_not_emit_success(self):
        item = self.add()
        before = self.path.read_bytes()
        state = copy.deepcopy(self.store.data)
        events=[]
        request=json.dumps({'id':1,'method':'thread/queue/start','params':{'threadId':self.thread_id,'queuedSubmissionId':item['id']}})
        with patch.object(self.store,'_commit',side_effect=OSError('disk failure')):
            reply,_=handle_message(request,threads=self.store,notifications=events)
        self.assertEqual(reply['error']['code'],-32603)
        self.assertEqual(events,[])
        self.assertEqual(self.path.read_bytes(),before)
        self.assertEqual(self.store.data,state)

    def test_active_turn_rejects_start_without_removing_submission(self):
        first = self.add('one')
        second = self.add('two')
        self.call('start',queuedSubmissionId=first['id'])
        before=self.path.read_bytes()
        with self.assertRaises(ThreadError):self.call('start',queuedSubmissionId=second['id'])
        self.assertEqual(self.path.read_bytes(),before)
        self.assertEqual(self.call('list')[0]['data'][0]['id'],second['id'])

    def test_unknown_thread_cannot_create_queue(self):
        with self.assertRaises(ThreadError):
            self.store.handle('thread/queue/add',{'threadId':'missing','clientUserMessageId':'x','input':[{'type':'text','text':'x'}]})
        self.assertFalse(self.path.exists())
