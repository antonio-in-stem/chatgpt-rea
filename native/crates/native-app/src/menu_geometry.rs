//! Bounds fitting for the native chat context menu and its project submenu.
use gpui_kit::{point, px, Bounds, Pixels, Point, Size};

pub(super) fn fit(origin: Point<Pixels>, desired: Size<Pixels>, viewport: Size<Pixels>) -> Bounds<Pixels> {
    let gutter = px(4.);
    let width = desired.width.min((viewport.width-gutter*2.).max(px(0.)));
    let height = desired.height.min((viewport.height-gutter*2.).max(px(0.)));
    Bounds { origin: point(origin.x.max(gutter).min((viewport.width-gutter-width).max(gutter)),
        origin.y.max(gutter).min((viewport.height-gutter-height).max(gutter))),
        size: gpui_kit::size(width,height) }
}

pub(super) fn submenu(parent: Bounds<Pixels>, row_offset: Pixels, desired: Size<Pixels>, viewport: Size<Pixels>) -> Bounds<Pixels> {
    let right = parent.right();
    let left = parent.left()-desired.width;
    let x = if right+desired.width <= viewport.width-px(4.) { right }
        else if left >= px(4.) { left }
        else { viewport.width-px(4.)-desired.width };
    fit(point(x,parent.top()+row_offset),desired,viewport)
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn nested_menus_fit_edges_and_compact_viewports() {
        for (w,h) in [(1280.,900.),(700.,400.),(320.,240.),(200.,150.)] {
            let viewport=gpui_kit::size(px(w),px(h));
            for (x,y) in [(0.,0.),(w-1.,h-1.),(w/2.,h/2.)] {
                let parent=fit(point(px(x),px(y)),gpui_kit::size(px(248.),px(238.)),viewport);
                let nested=submenu(parent,px(70.),gpui_kit::size(px(248.),px(300.)),viewport);
                for bounds in [parent,nested] {
                    assert!(bounds.left()>=px(4.) && bounds.top()>=px(4.));
                    assert!(bounds.right()<=viewport.width-px(4.));
                    assert!(bounds.bottom()<=viewport.height-px(4.));
                }
            }
        }
    }
}
