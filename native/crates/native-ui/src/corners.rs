//! Native approximation of CSS corner-shape: superellipse(1.5).
use gpui_kit::{prelude::*, *};

fn corner_point(radius: f32, step: usize) -> (f32, f32) {
    let angle = step as f32 * std::f32::consts::FRAC_PI_2 / 64.;
    // CSS superellipse K uses exponent n=2^K; parametric power is 2/n.
    let power = 2. / 2_f32.powf(1.5);
    (radius * (1. - angle.sin().powf(power)),
     radius * (1. - angle.cos().max(0.).powf(power)))
}

/// Cover only the outside of each corner with its immediate parent's solid
/// background. Attach last to a relative, square control; adds no hitboxes.
pub fn squircle_cutouts(radius: f32, backdrop: Hsla) -> impl IntoElement {
    canvas(|_, _, _| (), move |bounds, _, window, _| {
        let radius = radius.min(f32::from(bounds.size.width) / 2.)
            .min(f32::from(bounds.size.height) / 2.);
        for (right, bottom) in [(false,false),(true,false),(false,true),(true,true)] {
            let origin = point(if right { bounds.right() } else { bounds.left() },
                if bottom { bounds.bottom() } else { bounds.top() });
            let at = |x: f32, y: f32| origin + point(px(if right {-x} else {x}),
                px(if bottom {-y} else {y}));
            let mut path = PathBuilder::fill();
            path.move_to(at(0.,0.));
            path.line_to(at(radius,0.));
            for step in 1..=64 {
                let (x,y) = corner_point(radius,step);
                path.line_to(at(x,y));
            }
            path.close();
            if let Ok(path) = path.build() { window.paint_path(path,backdrop); }
        }
    }).absolute().inset_0()
}

#[cfg(test)]
mod tests {
    use super::corner_point;
    #[test]
    fn superellipse_endpoints_and_implicit_equation() {
        let radius=15.625;
        let n=2_f32.powf(1.5);
        for step in 0..=64 {
            let (x,y)=corner_point(radius,step);
            assert!((0. ..=radius).contains(&x) && (0. ..=radius).contains(&y));
            let value=(1.-x/radius).powf(n)+(1.-y/radius).powf(n);
            assert!((value-1.).abs()<0.00001);
        }
        assert_eq!(corner_point(radius,0),(radius,0.));
        let (x,y)=corner_point(radius,64);
        assert!(x.abs()<0.001 && (y-radius).abs()<0.001);
    }
}

