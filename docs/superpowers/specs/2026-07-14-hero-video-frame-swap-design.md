# Hero scroll-scrubber: swap in new source video

## Context

The homepage hero (`app/components/HeroScrubber.tsx`) already implements the
required behavior: a sticky full-viewport canvas that scrubs through
preloaded frames in sync with scroll position (via `useLenis`), reversing on
scroll-up, and never auto-playing. It currently reads 151 JPEG frames from
`public/frames/frame_0001.jpg` … `frame_0151.jpg`.

A new source video, `public/kling_20260714_VIDEO_Create_one_1411_0.mp4`
(1916x1080, 24fps, 121 frames, 5.04s), needs to become the hero animation.

## Approach

No new architecture is needed — only the frame source changes.

1. **Extract frames**: use `ffmpeg` to sample the new video at 30fps,
   producing frames at full source resolution (1916x1080), written as
   JPEG at quality ~95, named `frame_0001.jpg`, `frame_0002.jpg`, … to
   match the existing naming convention consumed by `frameSrc()` in
   `HeroScrubber.tsx`.
2. **Replace frame set**: delete the existing 151 frames in
   `public/frames/` and write the new extracted frames into the same
   directory.
3. **Update `FRAME_COUNT`**: in `HeroScrubber.tsx`, set the constant to the
   actual number of frames ffmpeg produced (~151, but must be verified
   against the real output count, not assumed).
4. **Cleanup**: delete `public/kling_20260714_VIDEO_Create_one_1411_0.mp4`
   from the repo once frames are extracted and verified — it's raw
   material, not something the site serves.

## Non-goals

- No changes to scrub logic, Lenis integration, cover-fit drawing,
  overlay fade, or the scroll-down CTA button — all already correct per
  requirements.
- No changes to `page.tsx` — `HeroScrubber` is already the first section
  rendered on the homepage.

## Verification

- Run the dev server, confirm the hero loads the new frames and scrubs
  smoothly forward/backward with scroll, with no autoplay on load.
- Confirm frame count constant matches actual files on disk (off-by-one
  here would freeze on the last frame early or throw on an out-of-range
  index).
