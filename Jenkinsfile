pipeline {
    agent { docker { image "ruby" } }
    stages {
        stage('build') {
            steps {
                sh 'ruby --version'
            }
        }
    }

    /*
    stages {

        stage('build') {
            steps {
                sh 'jekyll build'
            }
        }

        stage('test') {
            steps {
                sh 'jekyll doctor'
                sh 'proofread'
            }
        }

        stage('deploy') {
            steps {

            }
        }

        stage('post-deploy') {
            steps {
            }
        }
    }
    */
}