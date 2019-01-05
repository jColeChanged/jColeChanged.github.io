pipeline {
    agent { docker { image 'ruby' } }
    stages {
        stage('build') {
            steps {
                sh 'gem install bundler jekyll'
                sh 'bundler --version'
                sh 'bundle install'
                sh 'bundle exec jekyll build'
                sh 'bundle exec htmlproofer ./_site --url-ignore "/#.*/"'
            }
        }
    }
}