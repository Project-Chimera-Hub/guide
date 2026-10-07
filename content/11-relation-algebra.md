# Relation Algebra notation

Relation Algebra writes every premise, question and explanation in a short code by default, and speaks it in a spoken code with the eyes closed. The code isn't meant to be guessed. Copy this page onto paper, or keep it open next to the trainer, until it reads like words. To have every premise written out instead, set **Text** to *Words* in the trainer's settings.

The trainer itself is described in its [README](https://github.com/Project-Chimera-Hub/ChimeraHub/blob/main/apps/relations/README.md).

## The code

**Objects:** R Red, B Blue, G Green, **O Gold**, V Violet, W White.

**A premise is an equation.** Each side is a *term*: an object, then moves
applied to it. `R6=B4488` says "one east of Red is two west and two north
of Blue".

| Material | A move is written | Example |
| --- | --- | --- |
| Space | one keypad digit per step | `R=B99` Red is two steps north-east of Blue |
| Numbers | a signed step | `R+2=B−7` |
| Notes, days, headings | a signed step that wraps; the first line names the modulus (`mod 12`, `mod 7`, `mod 8`) | `mod 8` / `R=B+3`: a heading three 45° steps clockwise of Blue's |
| Orientations | one letter per operation, applied left to right | `R=Bmq` Red is Blue mirrored, then turned a quarter right |
| Poses | a walk from the other object, in the walker's own frame: `^ v < >` a step ahead, back, left, right; the orientation letters turn or mirror the walker | `R=B^^<q` start at Blue, two ahead, one left, turn a quarter right: that is Red |

**Space digits**, laid out as on a keypad:

```
7 8 9      7 north-west  8 north  9 north-east
4 · 6      4 west                 6 east
1 2 3      1 south-west  2 south  3 south-east
```

**Perspective:** `R=B@2<<` reads "standing at Blue facing 2 (south), Red is
two steps to the left". After `@` and a facing digit:

- `^` ahead
- `v` behind
- `<` left
- `>` right

**Orientation letters:**

- `q` a quarter turn right, `Q` a quarter turn left, `h` a half turn;
- `m` mirror left-right, `M` mirror top-bottom;
- `d` flip on the rising diagonal, `D` on the falling one.

Order matters here: `mq` is not `qm`.

**Poses** put the grid and the orientations together. Each object stands
on a square, faces north, east, south or west, and may be mirrored (its left
and right swapped). A relation is a walk from the other object, read left to
right in the walker's own frame:

- `R=B^^<q`: stand where Blue stands, facing Blue's way; two steps ahead, one
  step left, turn a quarter right. That is where Red stands and how it faces.
- Every turn changes what "ahead" means for the steps after it, so `^q` (a
  step, then a turn) is not `q^` (a turn, then a step).
- `R=B` alone means Red stands exactly where Blue does, facing the same way.

**Either/or** premises come in at level 21: `R=B(6|9)` says Red is either
one east or one north-east of Blue, and only one of them is true. A question
is then answered over every reading of the either/or premises that still
holds together:

- `=` when every such reading gives the asked relation (the either/or is
  off the path, or another route through the premises rules one option out);
- `≠` when none does;
- `?` when some do and some don't.

In *Possible?*, the premises are possible when some choice of readings makes
every loop close.

**Marks** name places, so a long nested term can be built in steps:
`P=R6`, then `B=P88`. Mark letters are P S T U X Y Z A C E F J K L N; after
the fifteenth they double (PP, SS, …). A mark never contains a digit or a
lower-case letter, so it can't be mistaken for a move.

**Questions and answers:**

| Code | Asks | Answers |
| --- | --- | --- |
| `R=B6?` | Is this true? | `=` it must be, `≠` it can't be, `?` not settled (nothing links them, or it depends on how an either/or is read) |
| `∃?` | Can every premise be true at once? | `∃` possible, `∅` impossible |
| `\|R−B\|₁?` | Steps apart along the grid (or by number) | the distance |
| `\|R−B\|∞?` | Steps apart in king's moves | the distance |
| `≡3?` | The same arrangement as 3 back? | `≡` same, `≢` different |
| `≅3?` | The same up to rotation? | `≡` same, `≢` different |
| `⊢1/3` | Hold this: the first of the 3 before scoring starts | `»` go on |

**Explanations** start with ✓ or ✗ and the true relation (`≠ · O=B7`). `⇒`
opens each premise reduced to a single move. The trap the offered answer
belongs to is a symbol:

| Symbol | Trap |
| --- | --- |
| `∅n` | nesting ignored |
| `−L`, `−R` | the left or right side's moves dropped |
| `±` | wrong sign |
| `⇄` | composed in the wrong order |
| `@8` | perspective read as if facing north |
| `±1` | one step off |
| `↻`, `↻↻`, `↺` | turned a quarter, half way, a quarter back |
| `⇋`, `⇅`, `⤡` | mirrored east-west, north-south, on a diagonal |
| `⁻¹` | undone instead of done |
| `m·m` | seen in a mirror |
| `−` | reversed |
| `⇆` | two objects swapped (n-back) |
| `∅q` | (poses) the turn left out |
| `q→` | (poses) turned before stepping instead of after |
| `≠` | a new arrangement (n-back) |

The round summary reads `#3 · 75% · L4→5 · → nback/days · 41m`: round 3,
75% right, level 4 to 5, next round structure n-back in days, 41 minutes
left.

## Eyes closed

Every premise and question is spoken in the spoken code (below), and the
whole screen under the bar becomes the answer pad:

| Answers | Pad | Keys |
| --- | --- | --- |
| 1 (go on) | anywhere | Space |
| 2 | left half, right half | F, J |
| 3 | left, middle, right: yes, can't tell, no | F, K, J |
| 4 | quarters: 1 2 above 3 4 | 1–4 |

- The phone buzzes on every touch, and the screen is kept on while the
  session runs.
- Two soft rising notes mean the question comes next. The answer is timed
  from the end of the question.
- How far? says its choices after the question, smallest first, in pad order.
- Each round opens with its number, task and material ("Round 3. n-back,
  days, 2 back."). It closes with the score, the level and the minutes left,
  then goes straight on.
- Mistakes are explained in a few words: "Wrong. No. Red is Blue nine. Trap:
  one step off." Set Explain to *Always* to hear every answer explained.
  With Feedback sound off and Explain on *After mistakes*, a right answer is
  silent.
- **Speech rate** (0.8× to 1.75×) and **Silence between premises** (none to
  1.5 s) set the pace.
- Escape or Pause stops the voice. Resuming says the interrupted line again.

The voice is the most natural one the device has: voices named Natural or
Neural first, then Premium or Enhanced, then Google's, then the default.
On Windows that means Edge's or Windows' natural voices. On Apple devices,
download an Enhanced or Premium voice in the system's speech settings. On
Android, the Google voices are used. Without any speech engine, the trial
is shown on screen instead.

## The spoken code

The compact code said word for word, with words that are hard to mix up
by ear. Every spoken line stands for exactly one written line; the tests read
each one back.

| Written | Spoken |
| --- | --- |
| `=` | is |
| `R B G O V W` | Red, Blue, Green, Gold, Violet, White |
| space digits | the digit as a word; a run of 2 is *double*, 3 *triple*, 4 *quad*, more "*n* times" |
| `@4` | face four |
| `^ v < >` | front, back, left, right (runs as above; in poses, the steps of the walk) |
| `+n`, `−n` | up *n*, down *n* |
| `q Q h` | clock, counter, half |
| `m M d D` | mirror, flip, rise, fall |
| `mod 12` | mod 12 |
| marks `P S T U X Y Z A C E F J K L N` | Fox, Jar, Key, Lamp, Moon, Nest, Oak, Pond, Rope, Sun, Tent, Cup, Drum, Hat, Kite; a doubled letter adds *big* (`PP` is "big Fox") |
| `R=B(6\|9)` | Red is Blue either six or nine |
| `R=B6?` | Is Red Blue six? |
| `∃?` | Possible? |
| `\|R−B\|₁?`, `\|R−B\|∞?` | Red to Blue, grid? / king? (numbers: "Red to Blue?") |
| `≡2?`, `≅2?` | Same as 2 back? / Same as 2 back, any turn? |
| `⊢1/2` | Hold, 1 of 2 |

Examples:

- `W1166=B666944` is "White double one double six is Blue triple six nine
  double four".
- `V=W@6vvv<<<` is "Violet is White face six triple back triple left".
- `W+5=O+1−5` is "White up 5 is Gold up 1 down 5".
- `R=BQdmm` is "Red is Blue counter rise double mirror".
- `R=B^^<q` is "Red is Blue double front left clock".

## Sessions

- A session lasts from 10 minutes to 5 hours, in rounds of 4 to 100 trials.
- The task and the material can change every round.
- The level moves after every round, from 1 to 30. Either/or premises start at level 21.
- Every trial is saved as it happens, so a closed tab loses nothing: the unfinished session is filed the next time the trainer opens.
