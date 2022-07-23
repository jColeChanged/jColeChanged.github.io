(ns josh.blog.components.topnav)

(def topnav
  [:div {:class "container"}
   [:nav {:class "navbar navbar-expand-lg"}
    [:a {:class "navbar-brand", :href "/"} "Joshua Cole's"]
    [:button {:class "navbar-toggler", :type "button", :data-toggle "collapse", :data-target "#navbarSupportedContent", :aria-controls "navbarSupportedContent", :aria-expanded "false", :aria-label "Toggle navigation"}
     [:span {:class "navbar-toggler-icon"}]]
    [:div {:class "collapse navbar-collapse", :id "navbarSupportedContent"}
     [:ul {:class "navbar-nav"}
      [:li {:class "nav-item"}
       [:a {:class "nav-link", :href "/meta.html"} "Meta"]]
      [:li {:class "nav-item"}
       [:a {:class "nav-link", :href "/status.html"} "Status"]]]]]])