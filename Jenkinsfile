pipeline {
  agent { docker 'node:12' }
  parameters {
        booleanParam(name: 'publish', defaultValue: false, description: 'Publish npm package')
        booleanParam(name: 'skip_tests', defaultValue: false, description: 'Skip tests')
  }
  environment {
    HOME = "/tmp"
    NPM_EMAIL = "jenkins@oi-services.net"
    NPM_CONFIG_REGISTRY = "https://npm.oi-services.net"
    GITHUB_ACTION = "true"  // Mimic GITHUB_ACTION mode for semantic-release
  }
  stages {
    stage("Install dependencies") {
      steps {
        sh "npm install"
      }
    }
    stage('…') {
      when { expression { !params.skip_tests } }
      parallel {
        stage("Lint") {
          steps {
            sh "npm run lint:js"
          }
        }
        stage("Test") {
          steps {
            sh "npm run test"
          }
        }
      }
    }
    stage("Publish") {
      when { expression { params.publish } }
      steps {
        sh "echo '(1) $GIT_BRANCH $BRANCH_NAME'"
        withCredentials([usernamePassword(credentialsId: 'github-app-oceaninsights', passwordVariable: 'GH_TOKEN', usernameVariable: 'GH_USER'), usernamePassword(credentialsId: 'private-npm', passwordVariable: 'NPM_PASSWORD', usernameVariable: 'NPM_USERNAME')]) {
          sh "echo '(2) $GIT_BRANCH $BRANCH_NAME'"
          sh "npx semantic-release"
        }
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}
