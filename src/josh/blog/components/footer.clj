(ns josh.blog.components.footer)

(def feedback-form-url 
  "https://docs.google.com/forms/d/e/1FAIpQLScV6zNVngqOdYlG0hjGFCTytVKfG-0mvW4GewxA_yKmHTwnrA/viewform?usp=sf_link")

(def footer
  [:footer.mt-auto.m-1
   [:section.feedback
    [:p
     "If you would like to give anonymous feedback you can do so "
     [:a {:href feedback-form-url} "here."]]]])