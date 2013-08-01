I built several things while participating in [Lisp In Summer Projects](http://lispinsummerprojects.org/).

##Find-fns##

The first thing I built was a web interface for a [Clojure](http://clojure.org/) [development tool](https://github.com/Raynes/findfn). Let's say someone knows what a function does, but doesn't remember the name of the function. [My web app](http://find-fn.joshuacol.es/) allows this person to discover the name of the function. All they need to do is type in the input and output of the function and they will be [returned a list of all functions that match the criteria](http://find-fn.joshuacol.es/?input=2+2&output=4).

This project was actually a [continuation of a project](https://github.com/flatland/lazybot/pull/24) I worked on a few years ago that did the same thing. The first time I made it as a plug-in to a [bot](https://github.com/flatland/lazybot). The reason I wanted to make a web version of the program is because on occasion people actually used the bot I had made. I liked that and hope that the web site might prove to be useful as well.

The web site itself is actually pretty simple. The only tricky bit was making the part that finds functions, since I re-wrote it as part of the project. This is how that part works. You give it the input to a function. Then you give it the output. It then tests every function to see if given that input it will return the output. A simple filtering operation and its all done. Naturally, there are some security concerns. So I made sure to leverage [clojail](https://github.com/flatland/clojail) while building the project. Clojail isolates the code given by other people so that attacks won't be so scary. Hopefully.

