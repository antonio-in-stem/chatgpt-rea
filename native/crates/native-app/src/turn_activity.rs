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
                    native_core::ActivityEntry::Command{command,output,exit_code,status}=>
                        self.command_activity_view(id,index,command,output,*exit_code,*status,cx),
                });
            }
            content=content.child(details);
        }
        content.into_any_element()
    }
}

impl WorkspaceApp {
    fn command_activity_view(&self,id:&str,index:usize,command:&str,output:&str,exit_code:Option<i32>,status:native_core::CommandStatus,cx:&mut Context<Self>)->AnyElement {
        let colors=cx.theme().colors.clone();
        let expanded=self.expanded_commands.contains(&(id.to_owned(),index));
        let key=format!("{id}-{index}");
        let message=id.to_owned();
        let verb=match status {native_core::CommandStatus::Running=>"Running",native_core::CommandStatus::Completed=>"Ran",native_core::CommandStatus::Stopped=>"Stopped"};
        let heading=if expanded { format!("{verb} command") } else { format!("{verb} {command}") };
        let mut row=div().w_full().min_w_0().flex().flex_col()
            .child(Button::new(SharedString::from(format!("command-toggle-{key}"))).ghost()
                .w_full().h(px(20.)).p_0().rounded(px(4.)).text_size(px(13.))
                .accessibility_label(format!("{} command details",if expanded {"Collapse"} else {"Expand"}))
                .child(div().w_full().min_w_0().flex().items_center().gap(px(6.)).text_left().text_color(colors.muted_foreground)
                    .child(native_ui::icon("terminal",14.).text_color(colors.muted_foreground))
                    .child(div().min_w_0().truncate().child(heading))
                    .child(native_ui::icon(if expanded {"chevron-down"} else {"chevron-right"},12.).text_color(colors.muted_foreground)))
                .on_click(cx.listener(move |s,_,w,cx|s.act(Action::ToggleCommand(message.clone(),index),w,cx))));
        if expanded {
            let command_copy=command.to_owned();let output_copy=output.to_owned();
            let copy_button=|suffix:&str,label:&'static str,value:String,cx:&mut Context<Self>| {
                Button::new(SharedString::from(format!("command-copy-{suffix}-{key}"))).ghost()
                    .w(px(24.)).h(px(24.)).p_0().rounded(px(4.))
                    .accessibility_label(label).tooltip(label)
                    .child(native_ui::icon("copy",12.).text_color(colors.muted_foreground))
                    .on_click(cx.listener(move |s,_,w,cx|s.act(Action::Copy(value.clone()),w,cx)))
            };
            let success=status==native_core::CommandStatus::Completed && exit_code==Some(0);
            let footer_label=match status {
                native_core::CommandStatus::Running=>String::new(),
                native_core::CommandStatus::Stopped=>"Stopped".into(),
                native_core::CommandStatus::Completed if success=>"Success".into(),
                native_core::CommandStatus::Completed=>format!("Exit code {}",exit_code.map(|v|v.to_string()).unwrap_or("unknown".into())),
            };
            let footer=div().id(SharedString::from(format!("command-footer-{key}"))).test_support().w_full().flex().items_center().justify_end().gap(px(4.))
                .px(px(10.)).pt(px(2.)).pb(px(4.)).text_size(px(13.)).text_color(colors.muted_foreground)
                .when(success,|s|s.child(native_ui::icon("check",12.).text_color(colors.muted_foreground)))
                .child(footer_label);
            row=row.child(div().pt(px(8.)).pb(px(4.)).child(
                div().id(SharedString::from(format!("command-body-{key}"))).test_support()
                    .w_full().min_w_0().rounded(px(8.)).border_1().border_color(colors.border)
                    .bg(colors.secondary).overflow_hidden().flex().flex_col()
                    .child(div().px(px(8.)).pt(px(8.)).flex().items_start().gap(px(4.))
                        .child(div().flex_1().min_w_0().font_family("Consolas").text_size(px(12.)).line_height(px(20.))
                            .child(format!("$ {command}")))
                        .child(copy_button("command","Copy command",command_copy,cx)))
                    .child(div().relative().min_w_0()
                        .child(div().id(SharedString::from(format!("command-output-{key}"))).test_support()
                            .max_h(px(144.)).min_h(px(20.)).overflow_y_scroll().overflow_x_scroll()
                            .p(px(8.)).font_family("Consolas").text_size(px(12.)).line_height(px(20.))
                            .child(output.to_owned()))
                        .child(div().absolute().top_0().right(px(10.)).child(copy_button("output","Copy output",output_copy,cx))))
                    .child(footer)));
        }
        row.into_any_element()
    }
}
