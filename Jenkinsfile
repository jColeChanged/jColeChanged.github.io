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
        XDG_CONFIG_HOME = '.'
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
        stage('Email') {
            steps {
                sh 'cd email && ../node_modules/serverless/bin/serverless package'
                sh 'python3 -m pipenv run python -m cfnlint email/.serverless/cloudformation-template-create-stack.json'
                sh 'python3 -m pipenv run python -m cfnlint email/.serverless/cloudformation-template-update-stack.json'
                sh 'cd email && ../node_modules/serverless/bin/serverless deploy --verbose --package'
            }
        }
        stage('Certificate') {
            steps {
                sh 'cd certificate && ../node_modules/serverless/bin/serverless package'
                sh 'python3 -m pipenv run python -m cfnlint certificate/.serverless/cloudformation-template-create-stack.json'
                sh 'python3 -m pipenv run python -m cfnlint certificate/.serverless/cloudformation-template-update-stack.json'
                sh 'cd certificate && ../node_modules/serverless/bin/serverless deploy --verbose --package'
            }
        }
        stage('S3') {
            steps {
                sh 'cd file_storage && ../node_modules/serverless/bin/serverless package'
                sh 'python3 -m pipenv run python -m cfnlint file_storage/.serverless/cloudformation-template-create-stack.json'
                sh 'python3 -m pipenv run python -m cfnlint file_storage/.serverless/cloudformation-template-update-stack.json'
                sh 'python3 -m pipenv run jupyter nbconvert jekyll/_jupyter/*.ipynb --to markdown --output-dir jekyll/_posts'
                sh 'mdl -r ~MD033 jekyll/_posts'
                sh 'python3 -m pipenv run proselint jekyll/_posts'
                sh 'cd jekyll && bundle exec jekyll build'
                sh 'cd jekyll && bundle exec htmlproofer ./_site --url-ignore "/#.*/"'
                sh 'cd file_storage && ../node_modules/serverless/bin/serverless deploy --verbose --package'
            }
        }
        stage('CDN') {
            steps {
                sh 'cd cdn && ../node_modules/serverless/bin/serverless package'
                sh 'python3 -m pipenv run python -m cfnlint cdn/.serverless/cloudformation-template-create-stack.json'
                sh 'python3 -m pipenv run python -m cfnlint cdn/.serverless/cloudformation-template-update-stack.json'
                sh 'cd cdn && ../node_modules/serverless/bin/serverless deploy --verbose --package'
            }
        }
    }
}
