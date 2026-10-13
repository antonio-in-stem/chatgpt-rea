// Local equivalent of the shipped navigate-back / navigate-forward host commands.
// History is session-local; deleted conversations are skipped, not recreated.
impl WorkspaceApp {
    fn location(&self) -> (Route, String) {
        (self.route, if self.route == Route::Chat { self.active.clone() } else { String::new() })
    }
    fn record_location(&mut self) {
        let location = self.location();
        if self.history.get(self.history_index) == Some(&location) { return; }
        if !self.history.is_empty() { self.history.truncate(self.history_index + 1); }
        self.history.push(location);
        self.history_index = self.history.len() - 1;
    }
    fn history_target(&self, forward: bool) -> Option<usize> {
        let valid = |i: &usize| {
            let (route, id) = &self.history[*i];
            *route != Route::Chat || self.workspace.conversation(id).is_ok_and(|c| !c.archived)
        };
        if forward { ((self.history_index + 1)..self.history.len()).find(valid) }
        else { (0..self.history_index).rev().find(valid) }
    }
    fn navigate_history(&mut self, forward: bool, window: &mut Window, cx: &mut Context<Self>) {
        let Some(index) = self.history_target(forward) else { return; };
        let (route, id) = self.history[index].clone();
        if route == Route::Chat { self.switch_chat(id, window, cx); }
        else { self.route = route; self.dialog = None; }
        self.history_index = index;
        cx.notify();
    }
}
