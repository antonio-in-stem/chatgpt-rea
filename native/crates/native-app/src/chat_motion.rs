//! The shipped motion easeInOut mapping is cubic-bezier(.42,0,.58,1).
//! recovered-frontend/readable/assets/app-shared-737655e1fb23.js:63739,63776.
pub(super) fn hero_ease_in_out(progress: f32) -> f32 {
    let progress = progress.clamp(0., 1.);
    if progress == 0. || progress == 1. {
        return progress;
    }
    let bezier = |t: f32, a: f32, b: f32| {
        let inverse = 1. - t;
        3. * inverse * inverse * t * a + 3. * inverse * t * t * b + t * t * t
    };
    let (mut low, mut high) = (0., 1.);
    for _ in 0..20 {
        let middle = (low + high) * 0.5;
        if bezier(middle, 0.42, 0.58) < progress {
            low = middle;
        } else {
            high = middle;
        }
    }
    bezier((low + high) * 0.5, 0., 1.)
}
#[cfg(test)]
mod tests {
    #[test]
    fn shipped_cubic_easing_matches_reference_samples() {
        for (input, expected) in [
            (0., 0.),
            (0.25, 0.129162),
            (0.5, 0.5),
            (0.75, 0.870838),
            (1., 1.),
        ] {
            assert!((super::hero_ease_in_out(input) - expected).abs() < 0.00001);
        }
    }
}
