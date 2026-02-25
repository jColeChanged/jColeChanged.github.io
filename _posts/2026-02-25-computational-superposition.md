---
layout: post
title: "Computational Superposition"
published: true
author: joshuacole
description: "The omnipotence paradox is a type error. It evaluates God as a child process instead of the parent. Fork, diverge, merge: the rock was both too heavy to lift and was lifted."
tags: [systems-programming, philosophy, information-theory]
---

"Can God make a rock so heavy He can't lift it?" The question is supposed to be a trap. Answer yes: then there's something He can't lift. Answer no: then there's something He can't make. Either way, omnipotence is contradicted. The argument assumes that the answer must resolve within a single history -- that "make" and "lift" must be evaluated against the same linear sequence of events. That assumption is wrong, and I can demonstrate it with a computer.

An agent outside a computation can construct a state in which an event both occurred and did not occur. The mechanism requires three standard operations -- fork, diverge, merge -- each well-understood systems programming. The result is not standard at all: a single address space with a causally valid history of contradictory events. The rock was made so heavy it could not be lifted. The rock was also lifted. Both happened. No contradiction -- unless you insist on a single thread.

## The Game

A room. An item. A command interface. The game state fits in a struct:

```c
typedef struct {
    int item_lifted;
    int tick;
    char log[4096];
} GameState;
```

Each tick, the game reads a command from outside and executes it:

```c
void game_loop(GameState *state, int cmd_fd) {
    char cmd[64];
    while (read(cmd_fd, cmd, sizeof(cmd)) > 0) {
        state->tick++;
        if (strncmp(cmd, "lift", 4) == 0) {
            state->item_lifted = 1;
            append_log(state, "Lifted at tick %d", state->tick);
        } else if (strncmp(cmd, "leave", 5) == 0) {
            state->item_lifted = 0;
            append_log(state, "Left at tick %d", state->tick);
        }
    }
}
```

The program is deterministic. Same input, same output. The command pipe is the only source of variation. Whoever controls the pipe controls the outcome.

## Fork

`fork()` duplicates a process. The child gets an exact copy of the parent's memory -- same state, same code, same program counter. From that instant forward, the two processes diverge.

```c
GameState *world_a = mmap(NULL, sizeof(GameState),
    PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANONYMOUS, -1, 0);
GameState *world_b = mmap(NULL, sizeof(GameState),
    PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANONYMOUS, -1, 0);

*world_a = initial_state;
*world_b = initial_state;

int pipe_a[2], pipe_b[2];
pipe(pipe_a);
pipe(pipe_b);

if (fork() == 0) { game_loop(world_a, pipe_a[0]); exit(0); }
if (fork() == 0) { game_loop(world_b, pipe_b[0]); exit(0); }
```

Two processes. Identical code. Identical starting state. Different command pipes. The parent process -- the agent outside the game -- holds both write ends.

## Diverge

```c
write(pipe_a[1], "lift", 5);
write(pipe_b[1], "leave", 6);

close(pipe_a[1]);
close(pipe_b[1]);
wait(NULL);
wait(NULL);
```

After execution:

- `world_a->item_lifted == 1`, log reads "Lifted at tick 1"
- `world_b->item_lifted == 0`, log reads "Left at tick 1"

Both histories are causally complete. Both ran the same deterministic program. Both produced internally consistent state. The divergence came entirely from outside -- from the agent who controlled the command pipes.

From inside World A, the item was lifted. From inside World B, it was not. Both conclusions are correct. Neither process has enough information to know the other exists.

## The Ship of Theseus

Now consider the two address spaces as raw memory. They share a layout -- same struct, same offsets, same semantics. They differ only in content.

A page-level merge replaces regions of one world's memory with corresponding regions from the other, one page at a time:

```c
GameState merged;
memcpy(&merged, world_a, sizeof(GameState));

// Theseus replacement: B's log into A's frame
memcpy(&merged.log, &world_b->log, sizeof(merged.log));
```

The merged state now contains A's `item_lifted == 1` and B's log reading "Left at tick 1". Or reverse it: B's flag with A's log. Or interleave at finer granularity -- alternate pages, alternate cache lines, alternate bytes.

The gradual replacement is the point. The Ship of Theseus asks: if you replace every plank, is it the same ship? Here the question is sharper. If you replace memory regions one at a time, each drawn from a valid execution, is the resulting state a valid history?

It is. Every field was written by a correct execution of the program. The merged state is locally valid everywhere. It is only globally inconsistent -- and only from the perspective of an observer who assumes a single linear history.

A program examining the merged state would find the flag asserting the item was lifted and the log asserting it was not. Both pieces of evidence derive from real, deterministic, causally complete executions. The contradiction is not in the data. It is in the assumption that one history produced it.

## What This Constructs

The external agent has created a state in which the item was both lifted and not lifted. Not as metaphor. Not as quantum handwaving. As bytes in memory, produced by deterministic programs, merged by a well-defined operation.

Three observations.

**The contradiction is an information boundary.** An observer inside the merged state who lacks knowledge of the fork sees a paradox. The external agent who performed the fork, the divergence, and the merge sees two valid histories combined. The appearance of impossibility is not ontological. It is epistemic. This is the [horizon effect](/2022/07/23/horizon-effects.html) applied to computational history: same evidence, different conclusions, because of different information sets.

**The mechanism is not exotic.** `fork()` is how every Unix process starts. Shared memory is how databases handle concurrent transactions. Log merging is how distributed systems reconcile divergent replicas. Git does this every time you merge branches -- two histories become one, and the merge commit is the Theseus joint. The novelty is not in any individual operation. It is in recognizing what the composition constructs.

**The external agent's power comes entirely from being outside.** Not from special physics. Not from breaking rules. From having a wider address space -- literally -- than any process inside the computation. The agent sees both worlds because it allocated both worlds. The processes inside see only their own memory. The agent doesn't violate the game's rules. It runs the game's rules twice, with different inputs, and then combines the outputs.

## The Rock

Return to the question. Can God make a rock so heavy He can't lift it?

The omnipotence paradox assumes a single-threaded universe. It assumes "make" and "lift" must be evaluated against the same linear history, the same address space, the same process. Under that constraint, yes, the question is a trap. You can't set a flag to 1 and 0 in the same memory location at the same time in the same process.

But an agent outside the process isn't bound to a single thread. Fork the universe. In one branch, make the rock so heavy it cannot be lifted -- and it is not lifted. In the other branch, lift it. Both branches execute the same physical laws. Both produce causally valid histories. Now merge. The resulting state contains a complete, valid causal chain in which the rock was too heavy to lift, and a complete, valid causal chain in which the rock was lifted.

The paradox is a type error. It treats omnipotence as a predicate evaluated within a single execution context. But an omnipotent agent is the parent process, not a child. The parent doesn't run inside the game loop. It controls the game loop. It can instantiate as many game loops as it wants, inject different commands into each, and merge the results.

An observer inside the merged world, examining the evidence, would be forced to conclude that something impossible happened. The rock was both too heavy to lift and was lifted. The observer would be wrong to call it impossible. They would be right to call it inexplicable given their information. The gap is not in reality. It is in their view of it.

The question "Can God make a rock so heavy He can't lift it?" has the same answer as "Can a parent process fork two children with contradictory states and merge their address spaces?" Yes. Obviously. The questioner just didn't expect the answer to be yes to both halves simultaneously.
