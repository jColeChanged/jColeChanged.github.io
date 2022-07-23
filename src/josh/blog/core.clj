(ns josh.blog.core
  (:require [toto.core :as toto]
            [clojure.string :as string]
            [josh.blog.components.footer :refer [footer]]
            [josh.blog.components.follow :refer [follow]]
            [josh.blog.components.share :refer [share]]
            [josh.blog.components.topnav :refer [topnav]]))

(def stylesheets 
  [[:link {:rel "stylesheet", :href "/css/bootstrap.min.css"}]
   [:link {:rel "stylesheet", :href "/css/monokai.css"}]
   [:link {:rel "stylesheet", :href "/css/typography.css"}]])

(def scripts
  [[:script {:type "text/javascript", :src "https://platform-api.sharethis.com/js/sharethis.js#property=6035bcacf860700011e71dd5&product=inline-share-buttons", :async "async"}]
   [:script {:type "text/javascript", :src "/js/jquery-3.3.1.slim.min.js"}]
   [:script {:type "text/javascript", :src "/js/popper.min.js"}]
   [:script {:type "text/javascript", :src "/js/bootstrap.min.js"}]
   [:script {:type "text/javascript", :src "/js/d3.5.9.1.min.js"}]
   [:script {:type "text/javascript", :src "/js/underscore.js"}]
   [:script {:type "text/javascript", :src "/js/visualization.js"}]
   [:script {:type "text/javascript", :src "/js/horizon.js"}]
   [:script {:type "text/javascript", :src "/js/popfoots.js"}]])

(defn site-template
  [doc] 
  [:div 
   topnav
   doc
   footer
   (for [script scripts] script)])

(defn blog-template
  [doc]
  (let [{:as doc-meta :keys [title published-at tags]} (meta doc)]
    [site-template
     [:article
      [:h1 title]
      [:p.text-muted.text-monospace published-at]
      [:section doc]
      share
      follow]]))


(defn page-template
  [doc]
  [site-template doc])

(toto/build!
 [{:from "assets"
   :to "build"
   :as-assets? true}
  {:from "_posts/"
   :to "build"
   :template-fn blog-template
   :omit-styles? true
   :head-extras stylesheets}
  {:from "pages"
   :to "build/"
   :omit-styles? true
   :template-fn page-template
   :head-extras stylesheets}])




(def follow-it-verification "DumQfZmfXJN5jtC7tGkt")
(def identities
  {:name "Joshua Cole"
   :github "jcolechanged"
   :fanfiction "toojoshua"
   :spacebattles "toojoshua"
   :patreon "toojoshua"
   :twitch "toojoshua"
   :reddit "jcolechanged"
   :hackernews "JoshCole"})