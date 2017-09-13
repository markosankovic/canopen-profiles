pipeline {
    agent none
    stages {
        stage('Install') {
            agent { docker 'node:boron' }
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            agent { docker 'node:boron' }
            steps {
                sh 'npm run test-single-run'
            }
        }
        stage('Build') {
            agent { docker 'node:boron' }
            steps {
                sh 'npm run build'
            }
        }
        stage('Build and Push Docker Image') {
            agent any
            steps {
                script {
                    def image = docker.build('synapticon/canopen-profiles')
                    docker.withRegistry('https://registry.hub.docker.com', 'synapticon.registry.hub.docker.com') {
                        image.push()
                    }
                }
            }
        }
        stage('Deploy') {
            agent any
            steps {
                dir('/var/jenkins_home/workspace/synapticon-playbooks') {
                    ansiblePlaybook inventory: 'dev', playbook: 'playbook.yml', tags: 'canopen-profiles'
                }
            }
        }
    }
    post {
        unstable {
            mail to: 'msankovic@synapticon.com',
                subject: "Unstable Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}"
        }
        failure {
            mail to: 'msankovic@synapticon.com',
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}
