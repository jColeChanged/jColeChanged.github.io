(ns josh.blog.core
  (:require [toto.core :as toto]
            [clojure.string :as string]))



(defn site-template [doc]
  [:html {:max-width 800} doc])

(defn blog-template
  [doc] 
  (let [{:as doc-meta :keys [title published-at tags]} (meta doc)]
    [site-template
     [:div
      [:h1 title]
      [:p "Published at: " published-at]
      [:p "Tags: " (string/join ", " tags)]
      [:br]
      doc]]))


  
  (toto/build! 
 [{
   :from "_posts/"
   :to "build"
   :template-fn blog-template
 }
  :from "_top/"
  ]
   
   )