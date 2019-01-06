pipeline {
    agent none
    stages {
        stage('build_cf_email') {
	    agent { docker { image 'node:7-alpine' } }
            environment { HOME = '.' }
            steps {
                sh 'npm install'
                sh 'cd email && ../node_modules/serverless/bin/serverless package'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'email/.serverless/*', fingerprint: true
                }
            }
        }
        stage('test_cf_email') {
            agent { docker { image 'python:3.6.8' } }
            environment {
                HOME = '.'
            }
            steps {
                sh 'python -m pip install pipenv --user'
                sh 'python -m pipenv install'
                sh 'python -m pipenv run python -m cfnlint email/.serverless/cloudformation-template-create-stack.json'
                sh 'python -m pipenv run python -m cfnlint email/.serverless/cloudformation-template-update-stack.json'
            }
        }
        stage('deploy_cf_email') {
            agent { docker {image 'node:7-alpine' } }
            environment {
                HOME = '.'
                AWS_ACCESS_KEY_ID = credentials('jenkins-aws-access-key-id')
                AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
            }
            steps {
                sh 'npm install'
                sh 'cd email && ../node_modules/serverless/bin/serverless deploy --verbose --package'
            }
        }
        stage('build_cf_cert') {
	    agent { docker { image 'node:7-alpine' } }
            environment { HOME = '.' }
            steps {
                sh 'npm install'
                sh 'cd certificate && ../node_modules/serverless/bin/serverless package'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'certificate/.serverless/*', fingerprint: true
                }
            }
        }
        stage('test_cf_cert') {
            agent { docker { image 'python:3.6.8' } }
            environment {
                HOME = '.'
            }
            steps {
                sh 'python -m pip install pipenv --user'
                sh 'python -m pipenv install'
                sh 'python -m pipenv run python -m cfnlint certificate/.serverless/cloudformation-template-create-stack.json'
                sh 'python -m pipenv run python -m cfnlint certificate/.serverless/cloudformation-template-update-stack.json'
            }
        }
        stage('deploy_cf_cert') {
            agent { docker {image 'node:7-alpine' } }
            environment {
                HOME = '.'
                AWS_ACCESS_KEY_ID = credentials('jenkins-aws-access-key-id')
                AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
            }
            steps {
                sh 'npm install'
                sh 'cd certificate && ../node_modules/serverless/bin/serverless deploy --verbose --package'
            }
        }
        stage('build_cf_fs') {
            agent { docker { image 'node:7-alpine' } }
            environment {
                HOME = '.'
            }
            steps {
                sh 'npm install'
                sh 'cd file_storage && ../node_modules/serverless/bin/serverless package'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'file_storage/.serverless/*', fingerprint: true
                }
            }
        }
        stage('test_cf_fs') {
            agent { docker { image 'python:3.6.8' } }
            environment {
                HOME = '.'
            }
            steps {
                sh 'python -m pip install pipenv --user'
                sh 'python -m pipenv install'
                sh 'python -m pipenv run python -m cfnlint file_storage/.serverless/cloudformation-template-create-stack.json'
                sh 'python -m pipenv run python -m cfnlint file_storage/.serverless/cloudformation-template-update-stack.json'
            }
        }
        stage('build_files') {
            agent { docker { image 'ruby' } }
            environment {
                HOME = '.'
            }
            steps {
                sh 'gem install bundler jekyll'
                sh 'bundle install'
                sh 'cd jekyll && bundle exec jekyll build'
                sh 'cd jekyll && bundle exec htmlproofer ./_site --url-ignore "/#.*/"'
            }
            post {
                always {
                    archiveArtifacts artifacts: '_site/**/*.*', fingerprint: true
                }
            }
        }
        stage('deploy_cf_fs') {
            agent { docker { image 'node:7-alpine' } }
            environment {
                HOME = '.'
                AWS_ACCESS_KEY_ID = credentials('jenkins-aws-access-key-id')
                AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
            }
            steps {
                sh 'npm install'
                sh 'cd file_storage && ../node_modules/serverless/bin/serverless deploy --verbose --package'
            }
        }
        stage('build_cf_cdn') {
	    agent { docker { image 'node:7-alpine' } }
            environment {
	        HOME = '.'
		AWS_ACCESS_KEY_ID = credentials('jenkins-aws-access-key-id')
                AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
	    }
            steps {
                sh 'npm install'
                sh 'cd cdn && ../node_modules/serverless/bin/serverless package'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'cdn/.serverless/*', fingerprint: true
                }
            }
        }
        stage('test_cf_cdn') {
            agent { docker { image 'python:3.6.8' } }
            environment {
                HOME = '.'
            }
            steps {
                sh 'python -m pip install pipenv --user'
                sh 'python -m pipenv install'
                sh 'python -m pipenv run python -m cfnlint cdn/.serverless/cloudformation-template-create-stack.json'
                sh 'python -m pipenv run python -m cfnlint cdn/.serverless/cloudformation-template-update-stack.json'
            }
        }
        stage('deploy_cf_cdn') {
            agent { docker {image 'node:7-alpine' } }
            environment {
                HOME = '.'
                AWS_ACCESS_KEY_ID = credentials('jenkins-aws-access-key-id')
                AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
            }
            steps {
                sh 'npm install'
                sh 'cd cdn && ../node_modules/serverless/bin/serverless deploy --verbose --package'
            }
        }

    }
}