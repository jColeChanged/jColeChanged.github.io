---
layout: post
title: Learning to Program
published: true
---

I've watched several people who are learning to program try to solve programming problems and one of the things I've noticed is that it is the basics, not the complicated things, which really seem to trip people up. This can continue even after a person has taken classes which claims to teach how to program. This post 
is targeted at people learning to program who want to become really good at it. I'm going to lay out some strategies for avoiding common mistakes and pit falls
that tend to trip people up.

## Get Understanding

Someone can be taught about a for loop, understand the idea of what a for loop is, and yet somehow 
putting the for loop into practice can seem mystifying. This shouldn't be the case, because 
programs use the same model every single time they are run. Nothing is supposed to be 
mystifying in a computer program. Don't tolerate this confusion.

If you feel mystified by why a program is doing something or have no idea how to accomplish 
something you expect to be simple, it is possible to dispel that mist by uncovering what you 
are missing. 

A working mental model of program execution is a bit like gaining an understanding 
of phonemes when learning to read. Critical. Foundational. It is the small kernel upon which the 
larger things are built. You don't start with words. You starts with letters and combinations of 
letters. In like manner, you don't start with large programs. You start with single lines of code 
and small functions.

Spend the time to really get the basics down. There is something to 
being able to solve the smallest of problems that is necessary to doing well in a more general 
way. This makes a lot of sense if you think about it, since one way to think about a large 
computer program is just as the composition of many much smaller computer programs.

Building this mental model is an exercise in monotony, but it isn't hard. It just requires 
active learning focused on building up the foundational understanding. The basic idea is to 
type a lot of simple code, predict the results in your head, and then see the results in actuality. 
If you have fun doing it, you'll probably do it for longer, explore more, and end up getting a better 
understanding. 

Good books for this are the one of the ones by Zed Shaw which follows the naming template 
of [Learn X the Hard Way](https://shop.learncodethehardway.org/). Do the exercise. Go through the 
monotony of typing things out. Books written for more expert people tend to skip over the major pain 
point and don't do enough to encourage interaction.

If you don't want to buy a book, you're going to have to find another path to learning what you 
need to know. Personally, I find the code of Peter Norvig to be beautiful. So I would recommend 
finding code written by him and made publically avaialble and trying to get a deep of understanding 
of what is happening.

Regardless the actual procedure you're going to need to use to learn is going to be fairly simple. 
Read through code and try to execute it in your head to figure out what you think should happen. If 
the code is long or complicated you can do this with a pen and paper in hand or 
using some sort of writing app. Once you've used your model of how you think the computation works to 
determine what you think is going to happen you need to test your model. To do this you just need 
to see what actually happened and compare it with what you thought would happen.

The point here is to make the computer tell you about how the program 
executes, since you are still working on your own mental model of program execution. 
Whenever there is divergence between what happened and what you thought would happen, ask why, and 
search for the answer. Then use your answer to form a new mental model that you use to predict the 
execution of the program.

If you do this several times for a small program that you wrote, but can't explain confidently, you can 
expect your grasp of that program to change. You'll eventually be able to run through what the code is 
doing quickly. Doing the exercise will start to feel boring, because you already know what will happen. 
No lines will be a mystery. That is what it feels like when you are gaining the critical mental model.

People reading a post like this and trying to learn probably don't want to just hear the obvious advice. 
They are probably hoping I'll have a secret trick to getting better that will give them a huge advantage.
So I'll tell you the trick for this one: this doesn't have to be boring. I'm not actually asking you to 
do something that is boring or hard to do; I'm asking you to do something until it gets boring. If you 
really don't undestand something and you're learning, you're not going to be bored. It is going to be 
exciting and fun. You are gaining mastery over the thing. You can stop when you get bored and move on to 
other things; things which don't bore you.


## <a id="grace" href="#grace">Recover Gracefully</a>

Staying on the subject of obvious mistakes and easy to correct issues common to new programmers, one thing 
that happens often, but really shouldn't, is that new programmers lose the work that they do. This happens 
outside of programming of course. Writers sometimes lose the drafts of their book. Still, it is one of the 
low hanging fruits of improvement.

<div class="p">
    <div class="marginnote">
        <blockquote>
            <p>
                Remembering that I’ll be dead soon is the most important tool I’ve ever encountered to help me make the big choices in life.
                No one wants to die. Even people who want to go to heaven don’t want to die to get there. And yet, death is the destination we all share. 
                Your time is limited. So don’t waste it living someone else’s life. Don’t let the noise of others’ opinions drown out your own inner voice.
            </p>
            <footer>Steve Jobs commencement address delivered to Stanford University</footer>
        </blockquote>
    </div>
</div>

Don't lose your work. If you invest in an hour of your time into something make sure that you save your progress in a durable way. If your computer dies, you shouldn't lose the work you've done. If a hard drive dies, you shouldn't lose the work you've done. Save your work. Put it on multiple computers rather than just one. You might think nothing will ever happen that will destroy your work. You're statistically incorrect, which is the worst kind of incorrect to be. You'll think yourself wise for saving time by not doing that extra bit of work, right up until your work is destroyed.

Perhaps the easiest way to level up as a software engineer is to use source control to distribute duplicate copies of your work to additional servers. This 
doesn't just give you the opportunity to not lose work. It opens up the opportunity for you to collaborate with others and learn from them.

I recommend learning a distributed version control system. Any system will help you learn, but the good ideas in distributed source control correspond with the good ideas in database design and software engineering. You'll be learning good mental models for building reliable and horizontally scalable programs as you learn to work in a distributed version control system, even though you probably won't recognize that you're learning about that until well into your career if not for me having mentioned it here.

<div class="p">
    <div class="marginnote">
        You can find some resources to begin learning git at <a href="https://try.github.io/">https://try.github.io/</a>.
        In particular I suggest trying <a href="https://learngitbranching.js.org/">https://learngitbranching.js.org/</a> 
        to get the basic ideas down and then to proceed to getting git installed on your own computer and getting a project 
        put online.
    </div>
</div>

Saving your work is so obvious that it might seem strange that I mention it as a way to become a better software engineer. It might especially seem strange when you consider that using source control is something that people doing software engineering routinely do. Despite this there will come a time where you might not feel like sharing your work. For example, you might not be done with something and you might be worried about it being judged. So you might not put it into the source control software. Or maybe you will, but you won't share it up to a server that others can download from. Then your computer hard drive might die.

On reflection, you wouldn't have lost that data because you didn't know how to keep it. You lost it because of ego. You were afraid of showing work that wasn't done and being judged as bad, so you did something that was actually a bad practice - not having backups.

People reading a post like this and trying to learn probably don't want to just hear the obvious advice. They are probably hoping I'll have a secret trick 
to getting better that will give them a huge advantage. The sort of thing you only learn after years and which is truly counterintuitive. So I'll give one 
of those too and chances aren't you won't actually do it.

<div class="p">
    <div class="marginnote">
        <a href="https://github.com/netflix/chaosmonkey">Netflix does it</a>, because it is a good idea.   
    </div>
</div>

This might sound a little tongue in cheek. Tommorrow, grab a hammer. Destroy your laptop. Smash it into little itty bitty pieces.

This time the advice doesn't sound so obviously correct. It sounds wrong. It isn't and that confounds people all the time and they make 
bad decisions as a consequence. I call this the horizon effect and I see people make terrible reasoning errors on account of it all the 
time. People confuse what is actually good with what is good for them in the short term, but what is good in the short term and what is 
good in the long term often differ.

As an example, it can be good to have tasty food in the short term, but over the long term tasty food shouldn't be preferred to healthy 
food.

<div class="p">
    <div class="marginnote">
        <blockquote>
            <p>
                I am the LORD, and there is no other.
                I form the light and create the darkness;
                I bring prosperity and create calamity.
                I, the LORD, do all these things.
                Drip down, O heavens, from above,
                and let the skies pour down righteousness.
                Let the earth open up that salvation may sprout
                and righteousness spring up with it;
                I, the LORD, have created it.
                Woe to him who quarrels with his Maker—
                one clay pot among many.
                Does the clay ask the potter,
                ‘What are you making?’
                Does your work say,
                ‘He has no hands’?
                Woe to him who says to his father,
                ‘What have you begotten?’
                or to his mother,
                ‘What have you brought forth?’ ”
                Thus says the LORD,
                the Holy One of Israel, and its Maker:
                “How dare you question Me about My sons,
                or instruct Me in the work of My hands?
                It is I who made the earth
                and created man upon it.
                It was My hands that stretched out the heavens,
                and I ordained all their host.
                I will raise up Cyrus in righteousness,
                and I will make all his ways straight.
                He will rebuild My city
                and set My exiles free...
            </p>
            <footer>
                The Lord Of Hosts to Cryus his annointed in Isaiah 45
            </footer>
        </blockquote>
    </div>
</div>

Don't be lazy. Just this once I'm asking you to extend your time horizon and think deeply. Your laptop is already going to be smashed to itty bitty pieces 
eventually. Maybe that takes a while. Maybe a meteor has to hit before that happens. It is still going to happen at some point. If you can't recover with 
just a remamant how can you make any guarantees about the reliability of what you are doing? However, if you prove that you can recover from disasters like 
this then you're in a much stronger position to speak about the reliability of your work.

Geometric probability distributions show us that even small chances eventually become certanties, but people tend to be lazy. We discount the future, because 
we have to. We can't always think deeply about something. That would lead to us stalling. 

The point of intentionally destroying your laptop is to solve the problem of laziness. When you know you are going to die, know that a country is going to collapse, know that a laptop is going to be destroyed - it changes priorities. Ideas can't be saved in a centralized manner, because if they are it is going to be destroyed 
when the central system is destroyed. 

Right now, as I write this, one of my laptops is broken. Apple did an update and it didn't play well with the fact that my laptop was encrypted and now I can't get it to boot up. I anticipated these sort of eventualities: nothing was lost when this happened. I was able to recover gracefully.

Geometric probability distributions tell us that these sort of catacylcisms are inevitable. It doesn't feel like that each day: you live, you live, you live, 
therefore it seems like you live forever. Except you are going to die. Creating systems which bring the future closer to the present helps us 
to better reason about the future. If we know that our laptop is about to be destroyed or that we are about to die or any number of other errors in execution we 
shift our priorities to what really matters over the long term rather than what seems to matter when we are thinking about what is near at hand.

What would you do differently if someone sat down and tried to think up the most horrible, evil, cruel thing they could possibly subect your program to and then they did it? I'm not asking you to do this to cause that terrible thing to happen. I'm asking you to do it to prevent these terrible things from happening. But also do it. Take ownership over the bad things that happen so you can use them for good. Break things, so that instead of breaking them, you're ensuring that they are fixed. Create errors so you know that you can solve them. Don't assume the happy path, because you are statistically incorrect when you do so. 


<div class="p">
    <blockquote>
        <p>
            For a successful technology, reality must take precedence over public relations, for Nature cannot be fooled.
        </p>
        <footer>
            Richard P. Feynman, “What Do You Care What Other People Think?”
        </footer>
    </blockquote>
</div>

If you want to be a good software engineer, don't assume everything always goes perfectly. Extend your time horizon as far as necessary until you reach a point where the geometric probability distribution of failure correctly predicts that you are certain to encounter the error that you assume will never happen. Then code so as to successfully overcome the challenge. Software, once written, doesn't have to pay the cost again and again. The time you spend on it is time you save in the future.

