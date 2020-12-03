pipeline {
  agent { docker 'node:12' }
  parameters {
        booleanParam(name: 'publish', defaultValue: false, description: 'Publish npm package')
  }
  environment {
    HOME = "/tmp"
    NPM_EMAIL = "jenkins@oi-services.net"
    NPM_CONFIG_REGISTRY = "https://npm.oi-services.net"
  }
  stages {
    stage("Install dependencies") {
      steps {
        sh "npm install"
      }
    }
    stage('…') {
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
        withCredentials([usernamePassword(credentialsId: 'github-app-oceaninsights', passwordVariable: 'GH_TOKEN', usernameVariable: 'GH_USER'), usernamePassword(credentialsId: 'private-npm', passwordVariable: 'NPM_PASSWORD', usernameVariable: 'NPM_USERNAME')]) {
          sh "semantic-release"
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
