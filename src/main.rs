use bevy::prelude::*;

fn main() {
    App::new()
        .insert_resource(ClearColor(Color::srgb(0.09, 0.11, 0.14)))
        .add_plugins(DefaultPlugins.set(WindowPlugin {
            primary_window: Some(Window {
                title: "Roam".into(),
                // On the web, render into the <canvas id="roam"> in index.html.
                canvas: Some("#roam".into()),
                // Resize the canvas to fill its parent element.
                fit_canvas_to_parent: true,
                // Let the browser keep its shortcuts (F5, Ctrl+R, ...).
                prevent_default_event_handling: false,
                ..default()
            }),
            ..default()
        }))
        .add_systems(Startup, setup)
        .add_systems(Update, spin_tile)
        .run();
}

/// Marks the placeholder tile so we can animate it.
#[derive(Component)]
struct SpinningTile;

fn setup(mut commands: Commands) {
    commands.spawn(Camera2d);

    // An isometric-looking diamond: a square rotated 45 degrees and squashed
    // vertically. A stand-in until real tiles exist.
    commands
        .spawn((
            Transform::from_xyz(0.0, 60.0, 0.0).with_scale(Vec3::new(1.0, 0.5, 1.0)),
            Visibility::default(),
        ))
        .with_children(|parent| {
            parent.spawn((
                Sprite::from_color(Color::srgb(0.36, 0.62, 0.33), Vec2::splat(120.0)),
                Transform::from_rotation(Quat::from_rotation_z(std::f32::consts::FRAC_PI_4)),
                SpinningTile,
            ));
        });

    commands.spawn((
        Text2d::new("Hello, Roam!"),
        TextFont {
            font_size: FontSize::Px(48.0),
            ..default()
        },
        TextColor(Color::WHITE),
        Transform::from_xyz(0.0, -80.0, 0.0),
    ));
}

fn spin_tile(time: Res<Time>, mut tiles: Query<&mut Transform, With<SpinningTile>>) {
    for mut transform in &mut tiles {
        transform.rotate_z(time.delta_secs() * 0.5);
    }
}
