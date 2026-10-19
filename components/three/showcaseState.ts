// Mutable state shared by the DOM (drag, scroll) and the render loop, so neither re-renders React.
export const showcaseState = {
  dragging: false,
  dragVelocity: 0, // radians per frame added by the user's drag
  scroll: 0, // 0..1 progress of the showcase section through the viewport
};
