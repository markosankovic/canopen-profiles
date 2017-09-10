pipeline {
    agent { docker 'node:boron' }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'ng build --prod'
            }
        }
        stage('Build and Push Docker Image') {
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
            steps {
                ansiblePlaybook('/var/jenkins_home/workspace/synapticon-playbooks/playbook.yml') {
                    inventoryPath('/var/jenkins_home/workspace/synapticon-playbooks/dev')
                    tags('canopen-profiles')
                    credentialsId('synapticon-web.pem')
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
