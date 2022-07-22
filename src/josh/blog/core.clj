(ns josh.blog.core
  (:require [toto.core :as toto]
            [clojure.string :as string]))

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

(def footer 
  [:footer.mt-auto.m-1
   [:section.feedback
    [:p
     "\n            If you would like to give anonymous feedback you can do so \n            "
     [:a
      {:href
       "https://docs.google.com/forms/d/e/1FAIpQLScV6zNVngqOdYlG0hjGFCTytVKfG-0mvW4GewxA_yKmHTwnrA/viewform?usp=sf_link"}
      "here."]]]])

(def notification-prompt 
  [:section.notifications
   [:p
    "\n        If you want to be notified when I post new content you can subscribe\n        to the site's\n        "
    [:img.svgIcon
     {:alt "Radio waves; RSS/Atom", :src "/img/subscribe.svg"}]
    " feed\n        "
    [:a.subscribe {:href "/feed.xml"} " in a reader"]
    "\n        or\n        "
    [:a.subscribe
     {:href "https://follow.it/joshua-cole?action=followPub"}
     "via email."]]])


(def share-prompt
  [:section.sharing
   [:p
    "If you think this content might valuable to someone else please 
      consider sharing it with them."]
   [:div.sharethis-inline-share-buttons]])


(defn site-template
  [doc]
  [:<>
   [:link {:rel "stylesheet", :href "/css/bootstrap.min.css"}]
   [:link {:rel "stylesheet", :href "/css/monokai.css"}]
   [:link {:rel "stylesheet", :href "/css/typography.css"}]
   [:script {:type "text/javascript", :src "https://platform-api.sharethis.com/js/sharethis.js#property=6035bcacf860700011e71dd5&product=inline-share-buttons", :async "async"}]
   [:div {:class "container"}
    [:nav {:class "navbar navbar-expand-lg"}
     [:a {:class "navbar-brand", :href "/"} "Joshua Cole&#39;s"]
     [:button {:class "navbar-toggler", :type "button", :data-toggle "collapse", :data-target "#navbarSupportedContent", :aria-controls "navbarSupportedContent", :aria-expanded "false", :aria-label "Toggle navigation"}
      [:span {:class "navbar-toggler-icon"}]]
     [:div {:class "collapse navbar-collapse", :id "navbarSupportedContent"}
      [:ul {:class "navbar-nav"}
       [:li {:class "nav-item"}
        [:a {:class "nav-link", :href "/meta.html"} "Meta"]]
       [:li {:class "nav-item"}
        [:a {:class "nav-link", :href "/status.html"} "Status"]]]]]]
   doc
   footer
   [:script {:type "text/javascript", :src "/js/jquery-3.3.1.slim.min.js"}]
   [:script {:type "text/javascript", :src "/js/popper.min.js"}]
   [:script {:type "text/javascript", :src "/js/bootstrap.min.js"}]
   [:script {:type "text/javascript", :src "/js/d3.5.9.1.min.js"}]
   [:script {:type "text/javascript", :src "/js/underscore.js"}]
   [:script {:type "text/javascript", :src "/js/visualization.js"}]
   [:script {:type "text/javascript", :src "/js/horizon.js"}]
   [:script {:type "text/javascript", :src "/js/popfoots.js"}]])

(defn blog-template
  [doc]
  (let [{:as doc-meta :keys [title published-at tags]} (meta doc)]
    [site-template
     [:article
      [:h1 title]
      [:p.text-muted.text-monospace published-at]
      [:section doc]
      share-prompt
      notification-prompt]]))



(toto/build!
 [{:from "pages"
    :to "build/"
    :template-fn site-template} 
  {:from "assets"
    :to "build/posts"
    :as-assets? true}
  {:from "_posts/"
   :to "build"
   :template-fn blog-template}])