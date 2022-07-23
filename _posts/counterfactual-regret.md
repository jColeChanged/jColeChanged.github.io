---
layout: post
title: Counterfactual Regret
published: false
author: joshuacole
---

In this post I'm going to outline how to deal with situations of imperfect 
information so as to make the best possible decision given the information you 
have. I'm going to do this by delving into the realms of game theory including 
some of the frontiers which people are still in the process of exploring. This 
information can be found elsewhere, but mostly in research papers by brilliant 
people like Noam Brown. Not everyone can read those papers and given how little 
people talk about these ideas, not many people are reading these papers. While 
that is a shame, I'm not going to go about explaining the subject like 
they would. I'm going to share it using language that people who enjoy playing 
games competitively will be able to easily grasp.

For most people playing well in a game starts with the realization that you are 
terrible at playing games. Which leads the natural question of how 
do I not suck at the game I'm playing since I'm definitely going to play video 
games all day regardless of what others think I should be doing with my life? 
This question has an obvious answer. Get good. Someone might then ask, Joshua, 
how is it that I get good? The answer is again obvious. Stop sucking. Out of this 
incredibly profound wisdom flows a lot of game theory, which is the mathematics of 
complicating the idea that there is such a thing as the best possible thing for you 
to do when playing games.

We're going to start with tic tac toe. You might ask yourself what tic tac toe 
has to do with imperfect information games. Knock it off with trying to be smart
it is only going to make this incredibly simple concept harder to understand than 
it needs to be. Forget you even know that there is a distinction between perfect 
information games and imperfect information games, because right now it doesn't 
matter.

We're starting with tic toe for two reasons. 

The first reason we're starting with tic tac toe, because you might actually be 
able to play that game pretty well and you're used to playing that game against 
people who can presumably not lose. Most imperfect information games aren't like 
that so you're brain is going to have absolutely garbage intuition about them built 
on top of the fact that a lot of people suck at a lot of things.

The second reason we're starting with tic tac toe is because there is a simple 
concept in multiplayer games that needs to be understood and tic tac toe is actually 
really perfect for teaching the concept entirely because you know how to play the 
game perfectly.

In Tic Tac Toe picture you were busy getting draw after draw, because your opponent 
has open eyes, is breathing, and even though someone is talking to them they are 
still managing to keep one eye on the rather boring game. You're growing frustrated 
and you have this clever idea for a way to win. Your opponent always responds 
perfectly when you make the right move. Maybe you will throw them off by making a 
wrong move!

If you want to not suck the first thing you need to realize is that you shouldn't be 
making decisions under the assumption that your opponent sucks, because if you make 
decisions under that assumption your making mistakes and your opponent can now punish 
you for the mistakes you make. The trick to playing games well is to not make mistakes 
yourself and to punish your opponent for making mistakes without overextending yourself 
in the process.

This is so obvious in the case of Tic Tac Toe, because Tic Tac Toe is a simple game and 
you know how to play it perfectly. It is still true in more complicated games like 
checkers, chess, League of Legends, Hearthstone, and I'm not going to bother listing any 
more games since you are smart enough to get my point. The reason it feels like bad 
plays in these games can be good plays isn't because they are good plays, but because 
you aren't the only one who sucks at playing games. Your opponents suck too.

This leads to one of the big insights in game theory which is probably table stakes 
for anyone who is actually good at games: when playing games you need to play with the 
assumption that your opponents are always going to be making perfect moves. The best 
possible moves. Not the moves where they miss something critical. Not the moves where 
they are caught by suprise. The best possible moves.

This is true even in games where there is hidden information.
So for exaple, you shouldn't expect that your opponent will suicide into the fountain in 
League of Legends just because you don't see them on your screen. You should instead play 
as if he is making the best possible decisions, not the worst. In Tennis, when you blink, 
you are now in a state of imperfect information. You should not assume that your opponent is 
going to stop hitting the ball and start chewing on their racket. This is obvious, but it 
doesn't always feel obvious, because sometime people are just really really bad at games. 

Here is where it gets a bit wild. Imperfect information games are actually basically just 
perfect information games, but with a twist. In a perfect information game you are making 
decisions about what actions you are going to take. In an imperfect information games you 
are making decisions about what strategy will be used to select what actions you are going 
to take.
