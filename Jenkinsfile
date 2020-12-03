pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        sh 'echo 1'
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}
