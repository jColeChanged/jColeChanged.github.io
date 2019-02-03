pipeline {
    agent {
        dockerfile {
	    // https://stackoverflow.com/questions/44805076/
	    args '-u 0:0' 
	}
    }
    environment {
        HOME = '/home'
        AWS_ACCESS_KEY_ID = credentials('jenkins-aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
        LC_ALL = 'C.UTF-8'
        LANG = 'C.UTF-8'
    }
    stages {
        stage('Install') {
	    steps {
	        sh 'npm install'
	        sh 'pipenv install'
                sh 'gem install bundler'
                sh 'bundle install'
	    }
        }
        stage('build_cf_email') {
            steps {
                sh 'cd email && ../node_modules/serverless/bin/serverless package'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'email/.serverless/*', fingerprint: true
                }
            }
        }
        stage('test_cf_email') {
            steps {
                sh 'python3 -m pipenv run python -m cfnlint email/.serverless/cloudformation-template-create-stack.json'
                sh 'python3 -m pipenv run python -m cfnlint email/.serverless/cloudformation-template-update-stack.json'
            }
        }
        stage('deploy_cf_email') {
            steps {
                sh 'cd email && ../node_modules/serverless/bin/serverless deploy --verbose --package'
            }
        }
        stage('build_cf_cert') {
            steps {
                sh 'cd certificate && ../node_modules/serverless/bin/serverless package'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'certificate/.serverless/*', fingerprint: true
                }
            }
        }
        stage('test_cf_cert') {
            steps {
                sh 'python3 -m pipenv run python -m cfnlint certificate/.serverless/cloudformation-template-create-stack.json'
                sh 'python3 -m pipenv run python -m cfnlint certificate/.serverless/cloudformation-template-update-stack.json'
            }
        }
        stage('deploy_cf_cert') {
            steps {
                sh 'cd certificate && ../node_modules/serverless/bin/serverless deploy --verbose --package'
            }
        }
        stage('build_cf_fs') {
            steps {
                sh 'cd file_storage && ../node_modules/serverless/bin/serverless package'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'file_storage/.serverless/*', fingerprint: true
                }
            }
        }
        stage('test_cf_fs') {
            steps {
                sh 'python3 -m pipenv run python -m cfnlint file_storage/.serverless/cloudformation-template-create-stack.json'
                sh 'python3 -m pipenv run python -m cfnlint file_storage/.serverless/cloudformation-template-update-stack.json'
            }
        }
        stage('build_files') {
            steps {
                sh 'cd jekyll && bundle exec jekyll build'
                sh 'cd jekyll && bundle exec htmlproofer ./_site --url-ignore "/#.*/"'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'jekyll/_site/**/*.*', fingerprint: true
                }
            }
        }
        stage('deploy_cf_fs') {
            steps {
                sh 'cd file_storage && ../node_modules/serverless/bin/serverless deploy --verbose --package'
            }
        }
        stage('build_cf_cdn') {
            steps {
                sh 'cd cdn && ../node_modules/serverless/bin/serverless package'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'cdn/.serverless/*', fingerprint: true
                }
            }
        }
        stage('test_cf_cdn') {
            steps {
                sh 'python3 -m pipenv run python -m cfnlint cdn/.serverless/cloudformation-template-create-stack.json'
                sh 'python3 -m pipenv run python -m cfnlint cdn/.serverless/cloudformation-template-update-stack.json'
            }
        }
        stage('deploy_cf_cdn') {
            steps {
                sh 'cd cdn && ../node_modules/serverless/bin/serverless deploy --verbose --package'
            }
        }
    }
}