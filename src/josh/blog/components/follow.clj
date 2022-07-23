(ns josh.blog.components.follow)

(def rss-icon [:img.svgIcon {:alt "Radio waves; RSS/Atom", :src "/img/subscribe.svg"}])
(def follow-it-link "https://follow.it/joshua-cole?action=followPub")
(def follow 
  [:section.notifications
   [:p "If you want to be notified when I post new content you can subscribe" 
    "to the site's" rss-icon " feed" [:a.subscribe {:href "/feed.xml"} " in a reader"]
    "or" [:a.subscribe {:href follow-it-link} "via email."]]])