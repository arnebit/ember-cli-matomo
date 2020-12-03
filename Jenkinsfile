pipeline {
  agent { docker 'node:12' }
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
        stage("Build") {
          steps {
            sh "npm run build"
          }
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
