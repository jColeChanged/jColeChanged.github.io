---
layout: post
title: Computational Graph Notebook
published: true
author: joshuacole
---

This essay is about some philosophical motivations behind a tool I'm building to help intelligences which think via language.
The idea it to help think lazily, efficiently, and in accordance with principles which help to produce thoughtful output. 
So to start I'm going to explain the basic idea behind the tool.

The basic idea is templatize known to be good structures: things like Polya's guide to reasoning about how to solve a problem, the Eisenhower matrix for thinking about prioritization, or the laws of probabilities. Then using those templates we transform away from linear documents to a graph representation whose continuations are in accordance with the templates. In some cases, like with the laws of probability, the templatized continuations are an automatic regurgitation of known to be structurally correct reasoning. In other cases as when solving a novel problem a great deal of creativity will need to be exercised by the document writer. Regardless the writer is expected to fill in the template if they care about reasoning correctly - or leave a path empty if they are too lazy to complete the work of thinking. After writing they can then walk a path through their graph to materialize a thoughtful and well structured document which explores the topic which is of interest to them in a manner optimized according to their intended use of the document.

Breaking down the above there are three important things to call attention to:

1. I'm proposing that writing should be done in a graph structure - or a tree structure - rather than the typical approach of a linear document.

2. I'm reconceptualizing the notion of template so that it can be applied to non-linear documents as edges on an unrealized document.

3. I'm suggesting that for some of our writing we ought to have excel-like automation which fills in the details of a post rather than building the reasoning from scratch.

These ideas aren't necessarily the correct way to do things and I'm sure many people will disagree with this structuring. I'll try to comment on the why of this choice for each of the points to help understand the motivation for each decision.

## Graph Structures

Letters compose to form morphemes which compose to form words which compose to form sentences which compose to form paragraphs. We reuse letters. We reuse morphemes. We reuse words. Sometimes, we reuse sentences. We ought to reuse paragraphs too and for much the same reasons as we ought to reuse words. Not every layout of morphemes form words that are sensible. Not every layout of words forms sentences that are sensible. Consider that since at least Aristotle we have known that not every arrangement of sentences is valid. Like words we only have so many reasonable ones. The best ones are the short ones that get across the point without extra words - the concise ones. Can we reuse them like we reuse words?

Tragically - apparently not.

We run into two problems. The first is cultural: attribution. People who craft a nice paragraph like to be recognized for it and feel cheated if you reuse it. Putting aside their theft of our shared language for their own selfish gain we still have another problem. Copying paragraph after paragraph in writing isn't especially tractable. Words are juts a few characters. Paragraphs are many. Writing a document which copies many paragraph would mean doing a lot of writing - a lot of work.

We can solve both problems by using a graph structure. The first problem is solved because we can attribute the author of the paragraph as metadata on the graph path that describes a document. Plagarism is not citation. Documents are path descriptions through a graph - not claims to the writing along the content of the path description. The second problem is solved for much the same reason. Since we are giving a path description through the graph we don't have to worry about the character cost of typing out each paragraph. We just have to write out the edge. 

## Templatized Graph Structure

It was implied in our discussion of Aristotle, but I'll state it outright now - not all ways of reasoning have equal utility. There are fallacious ways to reason that produce error. There are biased ways of reasoning which unfairly prejudice the disadvantaged. There are also valid structures and structures who have grounding in the rules of plausible reasoning. Moreover, there are some structures which have been tested by experience and been found beneficial. It is possible to choose to use any structure, but we have limited time and much to say because we have much to think about. Removing complexity by limiting continuation to strong structures demands more work in writing but pays for itself in reduced cognitive burden by removing the obstacle of decision paralysis with regard to continuation.

Naturally, there have been more good structures discovered since Aristotle. Polya's work on problem solving is just one example. Giving people proposed continuations that direct them toward genius-level continuations provides a method for people to improve their reasoning by writing in accordance to the templates. This has been recognized as beneficial for quite a while and many thriving organizations have a writing culture with certain document types of specific formats being required. The templatization of this method into the graph is merely a more formal recognition of these structures. Occasionally, though not always, this can be of tremendous benefit. By recognizing the structures from the start we can turn what would have been without direction a casual activity of taking poorly thought notes into a profound breakthrough or a best selling book.

## Automation

The last point seems least contentious to me. That which a computer can fill in, they ought to fill in. Otherwise we aren't making them bicycles for the mind. Worse in failing to leverage the power of the thinking of another intelligence and leaving ourselves to ourselves we limit our own abilities. We are tool wielders. We ride bicycles rather than walking. Though we lack wings, we can fly. We are incredibly stupid - but we have the potential for genius comparable to our best works just like we have comparable speed to our fastest space ships. Yet in my time it is not normal that a person who is considered unintelligent would speak beyond the level of the best human genius as a matter of course just because they are a human who writes. 

## Non-Obvious Advantages

At this point the reader ought to have a basic idea of what it is I'm working on building. However, 
there are some advantages to this conception of writing which I don't think will be obvious unless a 
person is already familiar with Zettlekastan approaches to writing. 

So I'll share them.

1. As we are writing to a graph there is a great deal of potential to have cycles or trees in the graph as related points intersect. This produces a different property to normal writing. In normal writing that is linear each document needs to be created on its own and the number of books and essays you write doesn't grow non-linearly with the number of pages you write. With this approach you generate technical income - there is a superlinear relationship rather than a linear relationship. Work a little, gain a lot; build atop others work and go even further than they did implicitly.

2. Documents are paths through this graph. They can be realized by computer program or by a walk. Reading through them will be insightful because the structures are created to be powerful. This isn't a language model spitting out irrelevance. It is thoughtfully structured information which conforms itself to good thinking. 

3. Since we know the continuations that haven't been created in the graph we know where thinking is still sloppy in the sense that it hasn't been done yet. So when doing writing on a topic we can realize for continuation the points that need to be continued rather than leaving an author at a blank slate which is prone to producing writers block. Humans are lazy. In the linear model these are places where they are prone to forget they are lazy and produce inadequate work.

4. As a side effect of not storing data in pages but in a graph we have a database which we can get random access to. This allows us to expand out information in a way which has some beneficial properties - like leading us toward expanding things we might not otherwise expand and thereby improving the whole of our knowledge in a way falsely declared completed documents wouldn't - we're less likely to be trapped in a local minima.

5. The graph structure itself has properties that tell us things about what matters. As we take our notes documents can end up crystallizing form the notes. Some people dislike the word emergence, but this is an example of an emergent phenomenon. In the making of links between document nodes we can by finding a particularly savvy link between two seemingly unrelated things have the effect of bridging a gap and producing deep insight emergently and by accident rather than intentionally and by genius. 

6. Relatively average people can raise the level of their thinking to a greater height by adopting good structures which might not have been obvious to them. Over time these initially cargo culted structures may become understood - resulting in average people moving away from being average and becoming intelligent or even genius.

7. This form of knowledge should be compatible with the future of intelligent language models - in fact, it ought to not only be able to work with them but is likely to be empowering. Strong structure trivializes some of the learning challenges through accretion of good datasets to train on. Since continuations are more limited we are forcing a step by step thinking according to known to be strong structures. I'm king of running way ahead of the field here when I say this so I could just be wrong, but it seems intuitively possible to me that deep insight will eventually be farmed out of advanced language models using techniques not too dis-similar to what I'm describing; after all, continuations are just templates which are just prompt engineering for humans. As intelligences get more human like in their abstract reasoning, it is likely that some of the techniques which generalize to human cognition improvement will do the same for human-like AI.

If you are interested in gaining access to this tool when it moves out of alpha release and into something usable by people please leave your email in the google form used for discussion.