// Purpose
//
// This is a program that is meant to illustrate the problems with Occam's Razor.
// My goal in writing this is to show how from a theoretical perspective, Occam's 
// Razor does not have of necessity high utility in matters of deciding between 
// truth and falsehood.
//
// My hope is that people who are using it in this manner will be convinced and 
// convincted of their sloppy reasoning, for their own beneift, so that in the 
// future they do not employ Occam's Razor in deciding between claims of truth. 
//
// I'm doing this for the sake of Jesus Christ and his gospel. If there is any 
// merit or good thing that comes of this, then it his own glory and not mine.
// I know that I don't know as I ought to know, that even what I know I only know 
// in part, and that ignorance and err are part of our human condition. I believe 
// that even atheists can understand that those claims apply to both me and them.
// 
// Jesus Christ is Lord and He loves you. I hope you find the code a pleasure to 
// read. Feel free to discuss it with me or give suggestions with regard to editing 
// or style.

// Evidence
//
// The real world is an interesting thing. It is so very complex. Capturing its 
// fullness in a computer program is a bit beyond the scope of this program and 
// my ability. As a result we are going to be making simplifying assumptions 
// which are hopefully, in part, analogous to reality. I do not say that they hold 
// fully to how reality is. Actually, I believe I'm making many assumptions that 
// are not in keeping with how I believe that reality actually works. Nevertheless, 
// in this program it shall be understod that reality is merely a finite list of 
// integers.
// 
// Behold, our reality simplified:

reality = [73, 110, 32, 116, 104, 101, 32, 98, 101, 103, 105, 110, 110, 105, 110, 103, 32, 71, 111, 100, 32, 99, 114, 101, 97, 116, 101, 100, 32, 116, 104, 101, 32, 104, 101, 97, 118, 101, 110, 32, 97, 110, 100, 32, 116, 104, 101, 32, 101, 97, 114, 116, 104, 46, 32, 65, 110, 100, 32, 116, 104, 101, 32, 101, 97, 114, 116, 104, 32, 119, 97, 115, 32, 119, 105, 116, 104, 111, 117, 116, 32, 102, 111, 114, 109, 44, 32, 97, 110, 100, 32, 118, 111, 105, 100, 59, 32, 97, 110, 100, 32, 100, 97, 114, 107, 110, 101, 115, 115, 32, 119, 97, 115, 32, 117, 112, 111, 110, 32, 116, 104, 101, 32, 102, 97, 99, 101, 32, 111, 102, 32, 116, 104, 101, 32, 100, 101, 101, 112, 46, 32, 65, 110, 100, 32, 116, 104, 101, 32, 83, 112, 105, 114, 105, 116, 32, 111, 102, 32, 71, 111, 100, 32, 109, 111, 118, 101, 100, 32, 117, 112, 111, 110, 32, 116, 104, 101, 32, 102, 97, 99, 101, 32, 111, 102, 32, 116, 104, 101, 32, 119, 97, 116, 101, 114, 115, 46, 32, 65, 110, 100, 32, 71, 111, 100, 32, 115, 97, 105, 100, 44, 32, 76, 101, 116, 32, 116, 104, 101, 114, 101, 32, 98, 101, 32, 108, 105, 103, 104, 116, 58, 32, 97, 110, 100, 32, 116, 104, 101, 114, 101, 32, 119, 97, 115, 32, 108, 105, 103, 104, 116, 46, 32, 65, 110, 100, 32, 71, 111, 100, 32, 115, 97, 119, 32, 116, 104, 101, 32, 108, 105, 103, 104, 116, 44, 32, 116, 104, 97, 116, 32, 105, 116, 32, 119, 97, 115, 32, 103, 111, 111, 100, 58, 32, 97, 110, 100, 32, 71, 111, 100, 32, 100, 105, 118, 105, 100, 101, 100, 32, 116, 104, 101, 32, 108, 105, 103, 104, 116, 32, 102, 114, 111, 109, 32, 116, 104, 101, 32, 100, 97, 114, 107, 110, 101, 115, 115, 46, 32, 65, 110, 100, 32, 71, 111, 100, 32, 99, 97, 108, 108, 101, 100, 32, 116, 104, 101, 32, 108, 105, 103, 104, 116, 32, 68, 97, 121, 44, 32, 97, 110, 100, 32, 116, 104, 101, 32, 100, 97, 114, 107, 110, 101, 115, 115, 32, 104, 101, 32, 99, 97, 108, 108, 101, 100, 32, 78, 105, 103, 104, 116, 46, 32, 65, 110, 100, 32, 116, 104, 101, 32, 101, 118, 101, 110, 105, 110, 103, 32, 97, 110, 100, 32, 116, 104, 101, 32, 109, 111, 114, 110, 105, 110, 103, 32, 119, 101, 114, 101, 32, 116, 104, 101, 32, 102, 105, 114, 115, 116, 32, 100, 97, 121, 46];


// Theory
// 
// What caused this chain of numbers that we call reality? What brough it about?
// Obviously, I created it, but what function would produce this list? If we were 
// about half-way through the list, how could we predict that one hundred would be 
// followed by thirty-two? There are so many different functions that could potentially 
// produce a list like this one, but I can assert that I know that there was actually 
// only one function. So its kind of like a mystery: how did this chain of numbers come 
// about? Which rules were used to produce it? What would happen next if I were to add 
// to this finite list in accordance with the method that produced it and without deviation 
// from that method?
// 
// And so we must decide between explanations. But in order to do that we need explanations.
// I'll toss out a few which are useless just to get a sense for some of the possibilities. 
// And since we are looking for discriminating explanations to help us differentiate between 
// possible solutions, we will make testable predictions.
//
// Here is an example of a very simple function which makes predictions and which classifies 
// whether those predictions are true or false.

function numbersGetLargerAtEachStep(evidence) {
    var evidence_for = [];
    var evidence_against = [];
	var steps = stepRange(evidence);
	for (step in steps) {
		if (evidence[step[1]] > evidence[step[0]]) {
		    evidence_for.push(step);
		}
		else {
			evidence_against.push(step);
		}
	}
	return [evidence_for, evidence_against];
}

// But we don't actually want to just have one theory. We want many different theories. So 
// I'm going to abstract this function a little bit.

function createPrediction(situationFn, claimFn) {
	var prediction = function(evidence) {
		var evidence_for = [],
			evidence_against = [],
			situations = situationFn(evidence);

		for (situation in situations) {
			if (claimFn(evidence, situation)) {
				evidence_for.push(situation);
			}
			else {
				evidence_against.push(situation);
			}
		}
		return [evidence_for, evidence_against];
	}
	return prediction;
}

// At this point we can make a whole bunch of predictions. I don't expect any of them to be 
// particulalry good. That is fine though, because its important to remember that the purpose 
// of this model isn't to talk about everything. My goal is to talk about Occam's Razor and 
// its mis-application.

function everyStep(evidence) {
	var numSteps = evidence.length - 1,
		stepPairs = [];

	for (var i=0; i < numSteps; i++) {
		stepPairs.push([i, i+1]);
	}
	return stepPairs;
}

// Another evidence gathering function
function everyMoment(evidence) {
	var moments = [];
	for (var i=0; i < evidence.length; i++) {
		moments.push([i]);
	}
	return moments;
}

function getLarger(situation, evidence) {
	return evidence[situation[1]] > evidence[situation[0]];
}
function getSmaller(situation, evidence) {
	return evidence[situation[1]] < evidence[situation[0]];
}
function stayEqual(situation, evidence) {
	return evidence[situation[0]] === evidence[situation[1]];
}
function neverEqual(situation, evidence) {
	return evidence[situation[0]] !== evidence[situation[1]];
}
function thirtyTwo(situation, evidence) {
	return evidence[situation[0]] === 32;
}

// So now we can create some prediction functions

getLargerAtEveryStep = createPrediction(everyStep, getLarger);
getSmallerAtEveryStep = createPrediction(everyStep, getSmaller);
stayEqualAtEveryStep = createPrediction(everyStep, stayEqual);
neverEqualAtEveryStep = createPrediction(everyStep, neverEqual);
alwaysThirtyTwo = createPrediction(everyMoment, thirtyTwo);

// And we can use them to create Suppositions as to the way our reality is laid out.
// A supposition is fundamentally just a way of tying together claims about the 
// way reality works. Its basically a way for us to have more then just predictions, 
// but also a framework of supporting predictions.
//
// I wouldn't say that these suppositions are particularly good models of how science 
// should be done or anything like that. Actually, this model as it is still has 
// many things which are lacking. But once we have these we will be able to look at 
// something interesting and they will be useful as tools to reason about Occam's 
// Razor as a tool.

var Supposition = function(prediction, assumptions) {
	// A supposition or proposed explanation made on the basis of 
	// limited evidence as a starting point for further investigation.

    // Assumptions are a collection of other suppositions on which the
    // given theory has been built.
	this.assumptions = assumptions;

	// The hypothesis makes predictions. Given evidence it makes predictions 
	// about other evidence.
	this.prediction = prediction;
};

// Now we will create some suppositions!
neverEqual = new Supposition(neverEqualAtEveryStep, []);
alwaysEqual = new Supposition(stayEqualAtEveryStep, []);
alwaysGrowing = new Supposition(getLargerAtEveryStep, [neverEqual]);
alwaysShrinking = new Supposition(getSmallerAtEveryStep, [neverEqual]);
grandUnifiedTheoryOfThirtyTwo = new Supposition(alwaysThirtyTwo, [alwaysEqual]);
// And now lets create a structure that is understood to be the list of all 
// possible suppositions. Clearly, this list isn't as full as it should be, 
// but again this is my woefully inadequate attempt at getting across an 
// espitomological truth through a metaphor that drastically reduces complexity
// in order to make the idea not only more understandable, but interactively 
// more understandable. :) I'm not about to give an infinite number of 
// suppositions. It is beyond me: I suppose I could make an infinite number 
// through the use of programming, but it won't actually help to get across 
// the ideas I want to get across.

var allSuppositions = [
	neverEqual, 
	alwaysEqual, 
	alwaysGrowing, 
	alwaysShrinking,
	grandUnifiedTheoryOfThirtyTwo
];

// Okay lets start off by implenting a search function. This search function is 
// going to return the best supposition according to a mis-use of Occam's Razor.

// Begin search1
function search(allSuppositions) {
	/* Returns the maximally true supposition according to a 
	misunderstanding of Occam's Razor. 

	This is not how Occam's Razor should be used. 
	*/
	var leastAssumed = allSuppositions[0];
	for (var i=1; i < allSuppositions.length; i++) {
		if (leastAssumed.assumptions.length > allSuppositions[i].assumptions.length) {
			leastAssumed = allSuppositions[i];
		}
	}
	return leastAssumed;
}
// End search1


// Begin search2
function abstractedSearch(fitness, allSuppositions) {
	/* Returns the maximally true supposition according to a
	fitness function run against suppositions.
	*/
	var bestMatch = allSuppositions[0];
	for (var i=1; i < allSuppositions.length; i++) {
		if (fitness(bestMatch) > fitness(allSuppositions[i])) {
			bestMatch = allSuppositions[i];
		}
	}
	return bestMatch;
}


function getNumberOfAssumptions(supposition) {
	/* A fitness function that is built based on a misunderstanding 
	of Occam's Razor. */
	return supposition.assumptions.length;
}
// End search2

// Return the same item!

// Begin search3
function evenMoreAbstractedSearch(fitness, heuristic, allSuppositions) { 
	allSuppositions.sort(heuristic);
	return abstractedSearch(fitness, allSuppositions);
}
// End search3

// Now check out this...
console.log(search(allSuppositions));

// And also...
console.log(abstractedSearch(getNumberOfAssumptions, allSuppositions));

// Here is yet another equivalent form! Same thing. Different underyling reasons!
console.log(evenMoreAbstractedSearch(getNumberOfAssumptions, getNumberOfAssumptions, allSuppositions));

// I'm hoping that people are starting to realize the problem with usign Occam's Razor. 
// It was never intended to be used to help choose the best theories. Instead we should 
// be doing something a little different. We should be doing something more like this:

function accuracy(supposition) {
	var outcomes = supposition.prediction(reality);
	var number_for = outcomes[0].length;
	var number_against = outcomes[1].length;
	return number_for / (number_for + number_against);
}

evenMoreAbstractedSearch(accuracy, getNumberOfAssumptions, allSuppositions);


function extractCode(tokenStart, tokenEnd, str) {
	var startPosition = str.indexOf(tokenStart) + tokenStart.length;
	var endPosition = str.indexOf(tokenEnd);
	return str.substring(startPosition, endPosition);
}

// Alright. Lets see if we've got enough for the most basic point to be made. :)
// God willing, this won't be terrible. I'm doing this in the hope that it will 
// help people to come to you Jesus Christ. I think that people, some that are even 
// fairly wise, are likely to have mis-used the principle in their search for You.
// You know we mess up - find us Lord!

// Now a quine and code insertion! This is being done to avoid the code doesn't run 
// problem and te code differs in the text and in the code which I have seen in 
// programming books.
fetch("/js/theory.js", {
	method: "get"
}).then(function(response) {
	return response.text();
}).then(function(text) {
	var searchOne = extractCode("// Begin search1", "// End search1", text),
	    searchTwo = extractCode("// Begin search2", "// End search2", text),
	    searchThree = extractCode("// Begin search3", "// End search3", text);
	document.getElementById("firstSearch").textContent = searchOne;
	document.getElementById("secondSearch").textContent = searchTwo;
	document.getElementById("thirdSearch").textContent = searchThree;
}).catch(function(err) {
	console.error(err);
});