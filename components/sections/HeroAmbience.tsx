/**
 * Hero ambience — two large blurred ambient orbs in opposite corners of
 * the hero, breathing slowly. Replaces the earlier wave + droplet
 * decoration (both rejected as too literal / too busy).
 *
 * Design intent:
 *   - Lives ONLY in whitespace — orbs anchor outside the container
 *     max-width, so the visible portion bleeds into the corner
 *     whitespace, never overlapping headline text or the hero image.
 *   - Reads as "engineered light" not "water imagery" — Uniwater's
 *     brand voice is restrained ("for the homes you don't get to
 *     redo"), so the ambience matches: slow, premium, atmospheric.
 *   - Breathing motion (scale + opacity + tiny translation, ~12–16s
 *     cycle) suggests presence rather than activity.
 *
 * Implementation:
 *   - Pure CSS via two divs with `bg-soft/40` + `blur-3xl`. No SVG,
 *     no images, no JS — cheapest possible render.
 *   - Heavy negative offsets (-top-40, -right-40, etc.) push 50%+
 *     of each orb outside the section's `overflow-hidden` clip, so
 *     only the soft inner edge shows.
 *   - The two orbs use different colours (soft + teal) and offset
 *     phases (3s delay on the second) so the breathing doesn't look
 *     synchronized.
 *
 * Parent requirements:
 *   - `relative` positioning context
 *   - `overflow-hidden` (already on EditorialHero)
 *
 * The decoration is aria-hidden + pointer-events-none — invisible to
 * screen readers and never blocks cursor interaction.
 */
export function HeroAmbience() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Top-left soft orb — brand 'soft' (#87D0CD) tint, scaled large,
          partially clipped off the top-left edge so only the inner glow
          shows. blur-3xl is Tailwind's strongest preset (~64px). */}
      <div
        className="absolute -top-40 -left-32 w-[28rem] h-[28rem] md:w-[36rem] md:h-[36rem] lg:w-[44rem] lg:h-[44rem] rounded-full bg-soft/40 blur-3xl animate-orb-breathe-1"
      />

      {/* Bottom-right deeper orb — brand 'teal' (#1B9BB4) tint, slightly
          larger, offset bottom-right. Breathes on a longer 16s cycle
          with a 3s delay so the two orbs feel like they're moving
          independently rather than in lockstep. */}
      <div
        className="absolute -bottom-48 -right-40 w-[32rem] h-[32rem] md:w-[40rem] md:h-[40rem] lg:w-[48rem] lg:h-[48rem] rounded-full bg-teal/25 blur-3xl animate-orb-breathe-2"
      />
    </div>
  );
}
