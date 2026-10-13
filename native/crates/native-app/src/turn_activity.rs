fn activity_duration(ms:u64)->String {
    let mut seconds=ms/1000;
    if seconds==0 { return "0s".into(); }
    let mut units=Vec::new();
    for (divisor,suffix) in [(86400,"d"),(3600,"h"),(60,"m"),(1,"s")] {
        let value=seconds/divisor; seconds%=divisor;
        if value>0 { units.push(format!("{value}{suffix}")); }
    }
    units.join(" ")
}
fn activity_heading(activity:&native_core::TurnActivity)->String {
    use native_core::ActivityStatus::*;
    let time=activity_duration(activity.elapsed_ms);
    match activity.status {
        Working if activity.elapsed_ms<1000=>"Working".into(),
        Working=>format!("Working for {time}"), Worked=>format!("Worked for {time}"),
        Stopped=>format!("You stopped after {time}"), Paused=>"Paused".into(),
        Unknown=>"Activity".into(), Loading=>"Loading activity status".into(),
    }
}
impl WorkspaceApp {
    fn turn_activity_view(&self,id:&str,activity:&native_core::TurnActivity,cx:&mut Context<Self>)->AnyElement {
        let colors=cx.theme().colors.clone();
        // mk: cancellation/running turns remain expanded; completed activity auto-collapses.
        let collapsible=activity.status==native_core::ActivityStatus::Worked && !activity.entries.is_empty();
        let expanded=!collapsible || activity.expanded;
        let mut content=div().id(SharedString::from(format!("activity-{id}"))).test_support()
            .w_full().flex().flex_col().gap(px(8.)).text_size(px(13.)).line_height(px(20.));
        if collapsible {
            let message=id.to_owned();
            content=content.child(Button::new(SharedString::from(format!("activity-toggle-{id}"))).ghost()
                .h(px(20.)).p_0().rounded(px(4.)).justify_start().text_size(px(13.))
                .text_color(colors.muted_foreground)
                .accessibility_label(format!("{} {}",if expanded {"Collapse"} else {"Expand"},activity_heading(activity)))
                .child(div().w_full().flex().items_center().gap(px(4.)).text_left()
                    .child(activity_heading(activity))
                    .child(native_ui::icon(if expanded {"chevron-down"} else {"chevron-right"},12.).text_color(colors.muted_foreground)))
                .on_click(cx.listener(move |s,_,w,cx|s.act(Action::ToggleActivity(message.clone()),w,cx))));
        } else { content=content.child(div().text_color(colors.muted_foreground).child(activity_heading(activity))); }
        content=content.child(div().w_full().h(px(1.)).bg(colors.border));
        if expanded {
            let mut details=div().id(SharedString::from(format!("activity-details-{id}"))).test_support().flex().flex_col().gap(px(12.));
            for (index,entry) in activity.entries.iter().enumerate() {
                details=details.child(match entry {
                    native_core::ActivityEntry::Commentary{text}=>div().child(TextView::markdown(("activity-comment",index),text.clone())).into_any_element(),
                    native_core::ActivityEntry::Command{command,output,exit_code}=>div().flex().flex_col().gap(px(6.))
                        .child(div().flex().items_center().gap(px(6.)).text_color(colors.muted_foreground)
                            .child(native_ui::icon("terminal",14.).text_color(colors.muted_foreground)).child("Ran a command"))
                        .child(div().p(px(10.)).rounded(px(8.)).bg(colors.secondary)
                            .child(TextView::markdown(("activity-command",index),format!("```text\n{command}\n\n{output}\nExit code: {exit_code}\n```"))))
                        .into_any_element(),
                });
            }
            content=content.child(details);
        }
        content.into_any_element()
    }
}
